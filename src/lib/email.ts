import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendSubscriberWelcomeEmail(to: string) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to,
    subject: "You're on the TrueFoundMovies list",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0d0d0d; color: #ffffff; padding: 40px; border-radius: 8px;">
        <div style="background: #ffffff; display: inline-block; padding: 10px 20px; border-radius: 4px; margin-bottom: 4px;">
          <img src="https://www.truefoundmovies.com/TrueFound-logo-1.jpg" alt="TrueFoundMovies" width="180" style="width: 180px; height: auto; display: block;" />
        </div>
        <hr style="border-color: #333; margin: 20px 0;" />
        <p style="color: #aaa; margin: 12px 0; font-size: 16px;">
          You&rsquo;re on the list. We&rsquo;ll let you know when new creature, paranormal, and alien films are added.
        </p>
        <a href="https://www.truefoundmovies.com/films" style="display: inline-block; margin-top: 24px; background: #f5c800; color: #0d0d0d; padding: 14px 32px; border-radius: 4px; text-decoration: none; font-weight: 700; font-size: 16px;">
          Browse Films &raquo;
        </a>
        <p style="margin-top: 32px; color: #555; font-size: 13px;">
          You received this because you signed up at TrueFoundMovies.com.
        </p>
      </div>
    `,
  })
}

export async function sendRentalFollowUpEmail({
  to,
  filmTitle,
  discountCode,
}: {
  to: string
  filmTitle: string
  discountCode: string
}) {
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to,
    subject: `Hope you enjoyed ${filmTitle} — here's $1.00 off your next rental`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0d0d0d; color: #ffffff; padding: 40px; border-radius: 8px;">
        <div style="background: #ffffff; display: inline-block; padding: 10px 20px; border-radius: 4px; margin-bottom: 4px;">
          <img src="https://www.truefoundmovies.com/TrueFound-logo-1.jpg" alt="TrueFoundMovies" width="180" style="width: 180px; height: auto; display: block;" />
        </div>
        <hr style="border-color: #333; margin: 20px 0;" />
        <p style="color: #aaa; margin: 12px 0; font-size: 16px;">
          Hope you enjoyed <strong style="color: #fff;">${filmTitle}</strong>.
        </p>
        <p style="color: #aaa; margin: 12px 0; font-size: 16px;">
          As a thank you, here&rsquo;s <strong style="color: #f5c800;">$1.00 off</strong> your next rental — good for any film on TrueFoundMovies, for the next 7 days.
        </p>
        <div style="background: #111; border: 1px solid #333; border-radius: 6px; padding: 20px; margin: 24px 0; text-align: center;">
          <p style="color: #888; font-size: 12px; uppercase: true; letter-spacing: 0.15em; margin: 0 0 8px 0;">YOUR DISCOUNT CODE</p>
          <p style="font-family: monospace; font-size: 28px; font-weight: 700; color: #f5c800; letter-spacing: 0.2em; margin: 0;">${discountCode}</p>
          <p style="color: #555; font-size: 11px; margin: 8px 0 0 0;">Single use · Expires in 7 days · Any rental</p>
        </div>
        <a href="https://www.truefoundmovies.com/films" style="display: inline-block; margin-top: 8px; background: #f5c800; color: #0d0d0d; padding: 14px 32px; border-radius: 4px; text-decoration: none; font-weight: 700; font-size: 16px;">
          Browse Films &raquo;
        </a>
        <p style="margin-top: 32px; color: #555; font-size: 13px;">
          Enter the code in the &ldquo;Have a code?&rdquo; section on any film page at checkout.
        </p>
      </div>
    `,
  })
}

export async function sendWatchEmail({
  to,
  filmTitle,
  orderType,
  watchUrl,
  expiresAt,
}: {
  to: string
  filmTitle: string
  orderType: "RENTAL" | "PURCHASE"
  watchUrl: string
  expiresAt: Date | null
}) {
  const expiryText =
    orderType === "RENTAL" && expiresAt
      ? `Your rental expires on ${expiresAt.toLocaleString("en-US", {
          dateStyle: "full",
          timeStyle: "short",
        })}.`
      : "You have lifetime access to this film."

  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to,
    subject: `Your ${orderType === "RENTAL" ? "rental" : "purchase"}: ${filmTitle}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0d0d0d; color: #ffffff; padding: 40px; border-radius: 8px;">
        <div style="background: #ffffff; display: inline-block; padding: 10px 20px; border-radius: 4px; margin-bottom: 4px;">
          <img src="https://www.truefoundmovies.com/TrueFound-logo-1.jpg" alt="TrueFoundMovies" width="180" style="width: 180px; height: auto; display: block;" />
        </div>
        <hr style="border-color: #333; margin: 20px 0;" />
        <h2 style="font-size: 20px; font-weight: 600;">${filmTitle}</h2>
        <p style="color: #aaa; margin: 12px 0;">
          ${orderType === "RENTAL" ? "Your 48-hour rental is ready." : "Thank you for your purchase."}
          ${expiryText}
        </p>
        <a href="${watchUrl}" style="display: inline-block; margin-top: 24px; background: #ffffff; color: #0d0d0d; padding: 14px 32px; border-radius: 4px; text-decoration: none; font-weight: 700; font-size: 16px;">
          Watch Now &raquo;
        </a>
        <p style="margin-top: 32px; color: #555; font-size: 13px;">
          Keep this email — it's your key to watch. If you have questions, reply here.
        </p>
      </div>
    `,
  })
}
