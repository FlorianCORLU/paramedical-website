import fetch from "node-fetch";

// Async function to validate Turnstile token
async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // Send POST request to Turnstile
  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secret}&response=${token}&remoteip=${ip}`,
    },
  );

  const data = await res.json();

  // Returns true if success
  return data.success;
}

export default verifyTurnstile;
