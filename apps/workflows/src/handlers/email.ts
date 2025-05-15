import { z } from 'zod';
import { Resend } from 'resend';
import { parseEnv } from '../utils';

// Define and validate environment variables
const env = parseEnv(
  z.object({
    RESEND_API_KEY: z.string().min(1).optional().default('re_development_key'),
  }),
  process.env
);

// Initialize Resend client
const resend = new Resend(env.RESEND_API_KEY);

// Define email payload schema
const EmailPayloadSchema = z.object({
  to: z.union([z.string().email(), z.array(z.string().email())]),
  from: z.string().optional(),
  subject: z.string(),
  text: z.string().optional(),
  html: z.string().optional(),
  cc: z.union([z.string().email(), z.array(z.string().email())]).optional(),
  bcc: z.union([z.string().email(), z.array(z.string().email())]).optional(),
  replyTo: z.string().email().optional(),
  attachments: z.array(
    z.object({
      filename: z.string(),
      content: z.string(),
    })
  ).optional(),
  tags: z.array(
    z.object({
      name: z.string(),
      value: z.string(),
    })
  ).optional(),
});

// Type is inferred from the schema, no need for explicit type declaration

/**
 * Handler for sending emails via Resend
 * @param payload Email payload
 * @returns Result of the email sending operation
 */
export async function emailHandler(payload: unknown): Promise<{ id: string }> {
  try {
    // Validate payload
    const emailPayload = EmailPayloadSchema.parse(payload);
    
    // Set default from address if not provided
    const from = emailPayload.from || 'no-reply@yourdomain.com';
    
    // Check if we're using the development API key
    const isDevelopmentMode = env.RESEND_API_KEY === 're_development_key';
    
    // In development mode, just log the email details instead of sending
    if (isDevelopmentMode) {
      console.log('🧪 DEVELOPMENT MODE: Email would be sent with the following details:');
      console.log(`From: ${from}`);
      console.log(`To: ${typeof emailPayload.to === 'string' ? emailPayload.to : emailPayload.to.join(', ')}`);
      console.log(`Subject: ${emailPayload.subject}`);
      console.log(`Text: ${emailPayload.text || '[No text content]'}`);
      console.log(`HTML: ${emailPayload.html ? '[HTML content available]' : '[No HTML content]'}`);
      
      // Return a mock ID for development
      return { id: `dev_${Date.now()}_${Math.random().toString(36).substring(2, 15)}` };
    }
    
    // Send email in production mode
    try {
      // The Resend API types are not fully compatible with our schema
      // We need to cast the response to any to handle the type mismatch
      const result = await resend.emails.send({
        from,
        to: emailPayload.to,
        subject: emailPayload.subject,
        text: emailPayload.text || '',
        html: emailPayload.html || '',
        cc: emailPayload.cc,
        bcc: emailPayload.bcc,
        reply_to: emailPayload.replyTo,
        attachments: emailPayload.attachments,
        tags: emailPayload.tags,
      } as any);
      
      // Handle the response
      if ('error' in result && result.error) {
        console.error('Error sending email:', result.error);
        throw new Error(`Failed to send email: ${String(result.error)}`);
      }
      
      // Safely extract the ID from the response
      const responseData = 'data' in result ? result.data : null;
      const id = responseData && typeof responseData === 'object' && 'id' in responseData ? String(responseData.id) : '';
      return { id };
    } catch (emailError) {
      console.error('Error sending email via Resend:', emailError);
      throw new Error(`Failed to send email: ${emailError instanceof Error ? emailError.message : String(emailError)}`);
    }
  } catch (error) {
    console.error('Error in email handler:', error);
    throw error;
  }
}
