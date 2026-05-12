import { supabase } from './supabase'

export async function uploadAvatar(
  file: File,
  userId: string
) {
  const fileExt =
    file.name.split('.').pop()

  const fileName =
    `${userId}.${fileExt}`

  const filePath =
    `avatars/${fileName}`

  const { error } =
    await supabase.storage
      .from('avatars')
      .upload(filePath, file, {
        upsert: true,
      })

  if (error) {
    return {
      error,
      publicUrl: null,
    }
  }

  const { data } =
    supabase.storage
      .from('avatars')
      .getPublicUrl(filePath)

  return {
    error: null,
    publicUrl:
      data.publicUrl,
  }
}