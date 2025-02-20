// server.js
const express = require('express');
const cors = require('cors');
// Remove the standard require for node-fetch and use a dynamic import workaround
// const fetch = require('node-fetch');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Configure CORS to allow only a single domain
const corsOptions = {
  origin: process.env.CLIENT_URL, // Allowed domain
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

const SHOP = process.env.SHOP; // e.g., your-shop-name.myshopify.com
// Use the provided API key instead of an access token
const API_KEY = process.env.SHOPIFY_ACCESS_TOKEN;
const PORT = process.env.PORT || 3000;

// Dynamic import wrapper for node-fetch
const fetchWrapper = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

app.get('/',async(req,res)=>{
  res.send("<html><body><h1>Hello World</h1></body></html>")
})

app.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const customerData = {
    customer: {
      email: email,
      accepts_marketing: true,
      tags: 'Newsletter',
    },
  };

  const response = await fetch(`${SHOP}/admin/api/2023-01/customers.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': API_KEY,
    },
    body: JSON.stringify(customerData),
  });

  const data = await response.json();
  if (response.ok) {
    return res.status(200).json(data);
  } else {
    return res.status(response.status).json(data);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
