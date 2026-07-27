'use server';

export async function subscribeNewsletter(formData: FormData) {
  const email = formData.get('email') as string;

  if (!email) {
    return { success: false, error: 'Email is required.' };
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return { success: false, error: 'Newsletter service unavailable.' };
  }

  const escapeHtml = (unsafe: string) => {
    return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  };

  const safeEmail = escapeHtml(email);

  const text = `<b>🎉 NEW NEWSLETTER SUBSCRIBER 🎉</b>\n\n` +
    `<b>Email:</b> ${safeEmail}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      return { success: false, error: 'Failed to subscribe.' };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
