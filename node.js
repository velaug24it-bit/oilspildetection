// WhatsApp Business API - Send Message
// -------------------------------------
// Using your actual credentials

const axios = require('axios');

// ✅ Your Configuration
const CONFIG = {
  phoneNumberId: '730119290192591',
  accessToken: 'EAAPGmz8tqWoBPhB7HicnAfKLcaMM00YuH1iFWXQV3npJXXY0CkafxZAGQpTS2JF72FcHr04onhhO5GZB1yrATOhpaO09aoeXGkMZCZBArTk31QKXsaThZCNfFeD0zHwKOQLV2eWZCgsHhWpqsZAIkCZBNbCGCQpJpSn6OZA7GbponNAHBHbjfygGOY40AFm78PP7zWqXXdJZCNnxgL4kzOZCTMph1nXczVl8ZC710ZBGvWq9MAFRpm0fjDmR53YMF1IZACQwZDZD',
  apiVersion: 'v22.0',
  recipientPhone: '917092796084' // recipient number (with country code, no +)
};

// ✅ Base URL for WhatsApp API
const BASE_URL = `https://graph.facebook.com/${CONFIG.apiVersion}/${CONFIG.phoneNumberId}/messages`;

// -------------------------------
// 📤 Send Text Message
// -------------------------------
async function sendTextMessage(to, message) {
  try {
    const response = await axios.post(
      BASE_URL,
      {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: to,
        type: 'text',
        text: { preview_url: false, body: message }
      },
      {
        headers: {
          Authorization: `Bearer ${CONFIG.accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Message sent successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error sending message:', error.response?.data || error.message);
  }
}

// -------------------------------
// 📄 Send Template Message
// -------------------------------
async function sendTemplateMessage(to, templateName = 'hello_world', languageCode = 'en_US') {
  try {
    const response = await axios.post(
      BASE_URL,
      {
        messaging_product: 'whatsapp',
        to: to,
        type: 'template',
        template: {
          name: templateName,
          language: { code: languageCode }
        }
      },
      {
        headers: {
          Authorization: `Bearer ${CONFIG.accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Template message sent:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error sending template:', error.response?.data || error.message);
  }
}

// -------------------------------
// 🚀 Main Execution
// -------------------------------
async function main() {
  const recipient = CONFIG.recipientPhone;

  try {
    console.log('📤 Sending hello_world template...');
    await sendTemplateMessage(recipient);

    // Uncomment below to test custom text message
    // await sendTextMessage(recipient, 'Hello from WhatsApp API!');
  } catch (error) {
    console.error('❌ Failed to send message:', error);
  }
}

// Run the script
main();
