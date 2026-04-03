const buildAdminLeadNotification = ({ subject, intro, payload }) => ({
  subject,
  html: `
    <div style="font-family: Arial, sans-serif; color: #111;">
      <h2 style="margin-bottom: 12px;">${subject}</h2>
      <p>${intro}</p>
      <div style="border: 1px solid #d6b25e; padding: 16px; border-radius: 10px;">
        ${payload
          .map(
            (item) =>
              `<p style="margin: 0 0 8px;"><strong>${item.label}:</strong> ${item.value}</p>`
          )
          .join('')}
      </div>
    </div>
  `
});

const buildClientConfirmation = ({ name, projectType }) => ({
  subject: 'Faive Global received your request',
  html: `
    <div style="font-family: Arial, sans-serif; color: #111;">
      <h2 style="margin-bottom: 12px;">Thank you, ${name}</h2>
      <p>We received your ${projectType} request and our strategy team will review it shortly.</p>
      <p>You can expect a follow-up from Faive Global with next steps and discovery questions.</p>
    </div>
  `
});

module.exports = {
  buildAdminLeadNotification,
  buildClientConfirmation
};
