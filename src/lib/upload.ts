import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Initialize only if environment variables are present to avoid crashing if they aren't set yet
const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

export async function uploadImage(imageFile: File | null): Promise<string | undefined> {
  if (!imageFile || imageFile.size === 0) return undefined;
  
  if (!supabase) {
    throw new Error("Supabase credentials are not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }
  
  const buffer = Buffer.from(await imageFile.arrayBuffer());
  const filename = `${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;
  
  const { data, error } = await supabase.storage
    .from('images') // Assumes a bucket named "images" exists
    .upload(filename, buffer, {
      contentType: imageFile.type,
      upsert: false
    });

  if (error) {
    console.error('Supabase upload error:', error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }

  const { data: publicUrlData } = supabase.storage
    .from('images')
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}
