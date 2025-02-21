// netlify/functions/server.js
const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// If you need node-fetch on Node <18, do a dynamic import:
const fetchWrapper = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

require('dotenv').config(); // For local .env usage (optional)

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Example environment variables
const SHOP = process.env.SHOP;                   // e.g., "your-shop.myshopify.com"
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN; // e.g., "shpat_xxx"

// Simple test route
app.get('/', (req, res) => {
  res.send('<h2>Hello from Netlify Serverless Express!</h2>');
});

// Subscribe route
app.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Example: sending request to Shopify or any external service
    const response = await fetchWrapper(`https://${SHOP}/admin/api/2023-01/customers.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        customer: {
          email,
          accepts_marketing: true,
        },
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    // Success
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Export Express app as a serverless function
module.exports.handler = serverless(app);
