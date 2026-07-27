'use server';

export async function sendTelegramMessage(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { success: false, error: 'Name, email, and message are required.' };
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Telegram bot credentials are not configured.');
    return { success: false, error: 'Messaging is temporarily unavailable. Please try again later.' };
  }

  // Simple HTML escaping to prevent Telegram API parsing errors
  const escapeHtml = (unsafe: string) => {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject || 'General Inquiry');
  const safeMessage = escapeHtml(message);

  const text = `<b>🌟 NEW INQUIRY | 20-JULY SHOP 🌟</b>\n\n` +
    `<b>👤 Contact details:</b>\n` +
    `• <b>Name:</b> ${safeName}\n` +
    `• <b>Email:</b> ${safeEmail}\n` +
    `• <b>Subject:</b> ${safeSubject}\n\n` +
    `<b>💬 Message:</b>\n` +
    `<i>"${safeMessage}"</i>`;

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
        disable_web_page_preview: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Telegram API Error:', errorData);
      return { success: false, error: 'Failed to send the message. Please try again later.' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending message:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
