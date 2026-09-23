import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { email, country, cgpa } = data;
    
    // Validate
    if (!email || !country || !cgpa) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }
    
    // TODO: Integrate with your email service (Resend, ConvertKit, Mailchimp, etc.)
    // Example with Resend:
    // await fetch('https://api.resend.com/emails', {
    //   method: 'POST',
    //   headers: { 'Authorization': `Bearer ${import.meta.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     from: 'GlobalCGPA <noreply@globalcgpa.in>',
    //     to: email,
    //     subject: 'Your University Shortlist is Ready!',
    //     html: `...`
    //   })
    // });
    
    // Log for now (replace with actual integration)
    console.log('Lead captured:', { email, country, cgpa, timestamp: new Date().toISOString() });
    
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
  }
};