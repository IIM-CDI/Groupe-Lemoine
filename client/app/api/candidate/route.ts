import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

const DEV_FROM_EMAIL = 'sandbox@resend.dev';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const nom = formData.get('nom') as string;
    const prenom = formData.get('prenom') as string;
    const email = formData.get('email') as string;
    const telephone = formData.get('telephone') as string;
    const message = formData.get('message') as string;
    const jobTitle = formData.get("jobTitle") as string;
    const cv = formData.get('cv') as File | null;
    const motivation = formData.get('motivation') as File | null;

    const attachments = [];

    if (cv) {
      const buffer = await cv.arrayBuffer();
      attachments.push({
        filename: cv.name,
        content: Buffer.from(buffer).toString('base64'),
      });
    }

    if (motivation) {
      const buffer = await motivation.arrayBuffer();
      attachments.push({
        filename: motivation.name,
        content: Buffer.from(buffer).toString('base64'),
      });
    }

    const resendTo = process.env.RESEND_TO_EMAIL ?? 'maxymmelnychuk100@gmail.com';
    const resendFrom = DEV_FROM_EMAIL;

    const { data, error } = await resend.emails.send({
      from: resendFrom,
      to: resendTo,
      subject: `Candidature - ${jobTitle || "Offre inconnue"}`,
      html: `
        <h2>Détails</h2>
        <p><strong>Nom:</strong> ${prenom} ${nom}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Téléphone:</strong> ${telephone}</p>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
      attachments,
    });

    if (error) {
      const errorMessage =
        typeof error === 'string'
          ? error
          : (error as { message?: string }).message ?? 'Resend error';
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}