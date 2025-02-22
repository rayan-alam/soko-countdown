// netlify/functions/server.js
import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

// Create both express app and router
const app = express();
const router = express.Router(); // 👈 Initialize router

// Middleware (apply to main app)
app.use(cors());
app.use(bodyParser.json());

// Environment variables
const SHOP = process.env.SHOP;
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;

// Define routes on the router 👇
router.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  try {
    const response = await fetch(`${SHOP}/admin/api/2023-01/customers.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        customer: { email, accepts_marketing: true },
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json(data);
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Wildcard GET route
router.get('/', (req, res) => {
    console.log(
        'Registered routes:',
        app._router.stack
          .filter((layer) => layer.route)
          .map((layer) => `${layer.route.stack[0].method.toUpperCase()} ${layer.route.path}`)
      );
  res.send('<h2>Hello from Netlify + Express!</h2>');
});

// Mount the router under the Netlify function path 👇
app.use('/.netlify/functions/server', router);

// Export handler
export const handler = serverless(app);