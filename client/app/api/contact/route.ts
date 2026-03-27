import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, sujet, message } = await req.json();

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', 
      to: 'claire.lentete@outlook.com', 
      subject: `Vous avez été contacté via le formulaire de contacte.`,
      html: `
        <h2>Détails du message</h2>
        <h3>Sujet: ${sujet}</h3>
        <p><strong>Nom: </strong> ${name}</p>
        <p><strong>Email: </strong> ${email}</p>
        <p><strong>Message: </strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}