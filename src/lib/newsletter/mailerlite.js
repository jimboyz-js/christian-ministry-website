const BASE_URL = (
  process.env.MAILERLITE_API_END_POINT || "https://connect.mailerlite.com/api"
).replace(/\/$/, "");
const API_KEY =
  process.env.MAILERLITE_API_KEY || process.env.MAILERLITE_API_TOKEN;

function getHeaders() {
  if (!API_KEY) {
    throw new Error("MailerLite API key is missing.");
  }

  return {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  };
}

async function handleResponse(response) {
  const text = await response.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    throw new Error(
      typeof data === "string" ? data : JSON.stringify(data, null, 2),
    );
  }

  return data;
}

export async function createCampaign({
  name,
  subject,
  fromName,
  fromEmail,
  groupId,
  html,
}) {
  const response = await fetch(`${BASE_URL}/campaigns`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      name,
      type: "regular",
      groups: [groupId],
      emails: [
        { subject, from_name: fromName, from: fromEmail, content: html },
      ],
    }),
  });

  const data = await handleResponse(response);
  return data?.data ?? data;
}

export async function updateCampaign({
  campaignId,
  name,
  subject,
  fromName,
  fromEmail,
  html,
}) {
  const response = await fetch(`${BASE_URL}/campaigns/${campaignId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({
      name,
      emails: [
        { subject, from_name: fromName, from: fromEmail, content: html },
      ],
    }),
  });

  const data = await handleResponse(response);
  return data?.data ?? data;
}

export async function scheduleCampaign({ campaignId, delivery = "instant" }) {
  const response = await fetch(`${BASE_URL}/campaigns/${campaignId}/schedule`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ delivery }),
  });

  const data = await handleResponse(response);
  return data?.data ?? data;
}

export async function deleteCampaign(campaignId) {
  const response = await fetch(`${BASE_URL}/campaigns/${campaignId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  const data = await handleResponse(response);
  return data?.data ?? data;
}

export async function getCampaign(campaignId) {
  const response = await fetch(`${BASE_URL}/campaigns/${campaignId}`, {
    method: "GET",
    headers: getHeaders(),
  });
  const data = await handleResponse(response);
  return data?.data ?? data;
}

export default null;
