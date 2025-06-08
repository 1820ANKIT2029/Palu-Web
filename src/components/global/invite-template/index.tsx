export const getInviteEmailOptions = ({
  recipientName,
  senderName,
  workspaceName,
  inviteLink,
  logoUrl = 'https://your-default-logo-url.com/logo.png',
}: {
  recipientName: string | null
  senderName: string
  workspaceName: string
  inviteLink: string
  logoUrl?: string
}) => {
  const subject = `You're invited to join ${workspaceName}!`
  const plainText = `${senderName} invited you to join ${workspaceName}. Click this link to accept: ${inviteLink}`

  const html = `
    <div style="font-family: Arial, sans-serif; padding: 24px; background-color: #f9f9f9; color: #333;">
      <div style="text-align: center; margin-bottom: 24px;">
        <img 
          src="${logoUrl}" 
          alt="Brand Logo" 
          style="height: 60px;" 
        />
      </div>

      <div style="background: #fff; padding: 24px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); max-width: 600px; margin: auto;">
        <h2 style="margin-top: 0; color: #111;">You've Been Invited! 🎉</h2>
        <p style="font-size: 16px; line-height: 1.5;">
          <strong>${senderName}</strong> has invited <strong>${recipientName}</strong> to join the <strong>${workspaceName}</strong> workspace.
        </p>

        <p style="font-size: 16px; margin: 24px 0;">
          Click the button below to accept the invite:
        </p>

        <div style="text-align: center; margin: 32px 0;">
          <a 
            href="${inviteLink}" 
            style="
              display: inline-block;
              background-color: #4f46e5;
              color: white;
              padding: 12px 24px;
              border-radius: 8px;
              text-decoration: none;
              font-size: 16px;
              font-weight: 600;
              transition: background 0.3s;
            "
          >
            Accept Invite
          </a>
        </div>

        <p style="font-size: 14px; color: #666;">
          If you weren’t expecting this invitation, you can ignore this message.
        </p>
      </div>

      <p style="font-size: 12px; color: #aaa; margin-top: 40px; text-align: center;">
        © ${new Date().getFullYear()} Palu. All rights reserved.
      </p>
    </div>
  `

  return { subject, plainText, html }
}

export default getInviteEmailOptions;