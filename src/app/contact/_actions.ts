'use server'
import { z } from 'zod'
import type { ZodIssue } from 'zod'

const FormData = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  subject: z.string().optional(),
  message: z.string().min(5),
})

type ContactFormData = z.infer<typeof FormData>

type sendMessageResponse = {
  message: string
  fields?: ContactFormData
  errors?: ZodIssue[]
  issues?: string[]
}

export async function sendMessage(prevState: any, data: FormData): Promise<sendMessageResponse> {
  console.log('sendMessage Action called')
  try {
    const formData = Object.fromEntries(data)
    const parsed = FormData.safeParse(formData)

    if (!parsed.success) {
      const formattedErrors = parsed.error.issues

      return {
        message: 'Failed to send message',
        errors: formattedErrors,
        fields: formData as ContactFormData,
      }
    }

    if (parsed.data.email.includes('z')) {
      return {
        message: 'Invalid email',
        fields: parsed.data,
      }
    }

    console.log('success uploading message')
    return {
      message: 'success',
    }
  } catch (err) {
    console.log(err)
    return {
      message: 'Failed to send Message',
    }
  }
}
