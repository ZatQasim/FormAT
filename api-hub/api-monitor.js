// apiLogger.js
// Sends API callback/route logs to a webhook safely (no user private data)

const fetch = require("node-fetch"); // If using Node.js <18, install node-fetch

// Replace with your webhook URL
const WEBHOOK_URL = process.env.WEBHOOK_URL || "YOUR_WEBHOOK_URL_HERE";

/**
 * Logs API activity
 * @param {string} endpoint - API route called
 * @param {number} status - HTTP status code
 * @param {string} message - Optional description
 */
async function logApi(endpoint, status, message = "") {
  try {
    // Only send non-sensitive info
    const payload = {
      timestamp: new Date().toISOString(),
      endpoint,
      status,
      message,
    };

    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log(`[API LOG] ${endpoint} | ${status} | ${message}`);
  } catch (err) {
    console.error("Failed to send API log:", err);
  }
}

module.exports = { logApi };