export const fileUploader = async (
  file: File,
  uploadUrl: string
): Promise<{ succeed: boolean }> => {
  const uploadRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  })

  if (!uploadRes.ok) {
    throw new Error('Failed to upload to R2')
  }

  return { succeed: true }
}
