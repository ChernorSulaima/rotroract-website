# Guide for AI: Implementing In-App Monime Deposits

This document provides a step-by-step technical guide for an AI (or developer) to understand, implement, or debug the **Monime Checkout Session** used for in-app deposits in the application.

## 1. High-Level Architecture

The Monime deposit flow uses a **Hosted Checkout** model. Instead of collecting payment credentials directly in the app, the backend creates a checkout session with Monime, and the user is redirected to a Monime-hosted payment URL.

**Flow summary:**
1. Frontend requests a deposit of an amount `X`.
2. Backend creates a local `PENDING` transaction in the database.
3. Backend calls Monime API to create a checkout session.
4. Monime returns a `redirectUrl`.
5. Frontend redirects the user to the `redirectUrl`.
6. User pays on Monime's hosted page.
7. User is redirected back to the frontend (`successUrl` or `cancelUrl`).
8. Backend confirms payment either via Webhook (`checkout_session.completed`) or via frontend status polling.

---

## 2. Setting Up the Backend Call to Monime

When the user submits a deposit form, the backend must make a server-to-server call to Monime.

### Request Details
- **Endpoint:** `POST https://api.monime.io/v1/checkout-sessions` (or corresponding Monime API URL).
- **Headers Needed:**
  - `Authorization: Bearer <MONIME_API_KEY>`
  - `Monime-Space-Id: <MONIME_SPACE_ID>`
  - `Idempotency-Key: <UUID>` (MUST be unique per request to prevent duplicated sessions)
  - `Content-Type: application/json`

### Payload Structure
The checkout session payload must look like this:

```json
{
  "name": "Wallet Deposit",
  "successUrl": "http://yourdomain.com/wallet?payment=success&transactionId=our_internal_tx_id",
  "cancelUrl": "http://yourdomain.com/wallet?payment=cancelled&transactionId=our_internal_tx_id",
  "lineItems": [
    {
      "type": "custom",
      "name": "Account Deposit",
      "price": {
        "currency": "SLE",
        "value": 1000 
      },
      "quantity": 1,
      "description": "Deposit of Le 10",
      "reference": "DEP_userId_timestamp_random"
    }
  ],
  "metadata": {
    "userId": "internal_user_id",
    "amount": "10",
    "type": "deposit"
  }
}
```

**⚠️ CRITICAL RULES FOR AI AGENTS:**
1. **No Extra Fields:** Do NOT include fields like `reference` or `paymentOptions` at the root of the JSON payload. They will cause a `400 Bad Request` from Monime.
2. **Minor Units:** The `price.value` uses **minor units** (cents). `10 SLE` = `1000 minor units`. Make sure to multiply the user's requested amount by 100 before sending it to Monime.
3. **Idempotency Key:** Always generate a fresh `crypto.randomUUID()` for the `Idempotency-Key` header on every new checkout generation.

---

## 3. Handling the Monime Response

A successful call to Monime will return a payload containing the `redirectUrl`.

```json
{
  "result": {
    "redirectUrl": "https://checkout.monime.io/s/..."
  }
}
```

The backend should return this `redirectUrl` to the frontend.

---

## 4. Frontend implementation

1. The frontend initiates the deposit by calling the backend (`POST /api/payments/monime/initiate`).
2. The frontend receives the `redirectUrl`.
3. The frontend redirects the user: `window.location.href = redirectUrl`.
4. After payment, Monime redirects back to the `successUrl` with any configured query parameters.
5. The frontend should poll the backend status endpoint (e.g., `GET /api/payments/monime/status/:id`) to update the UI once the deposit is confirmed.

---

## 5. Webhook Handling and Security

Monime will send a webhook when the deposit succeeds (`checkout_session.completed` or similar).

**Webhook Endpoint Security Checklist for AI:**
1. **Raw Body Verification:** You must capture the raw HTTP body before JSON parsing to verify the signature.
2. **Signature Check:** Verify `HMAC-SHA256` using your `MONIME_WEBHOOK_SECRET`:
   ```javascript
   const hmac = crypto.createHmac('sha256', process.env.MONIME_WEBHOOK_SECRET);
   const digest = hmac.update(rawBody).digest('hex');
   const sigBuffer = Buffer.from(signatureHeader, 'hex'); // Signature is HEX!
   const digestBuffer = Buffer.from(digest, 'hex');
   
   if (sigBuffer.length !== digestBuffer.length || !crypto.timingSafeEqual(sigBuffer, digestBuffer)) {
      throw new Error('Invalid signature');
   }
   ```
3. **Prevent Double Credits:** Ensure the database transaction is updated atomically. Search for `status: 'PENDING'` and update it to `COMPLETED`. If no row was updated (count = 0), discard the request, as it was already processed. Do not blindly increment user balance without this guard.

## Summary Checklist for Agents
- [ ] Are amounts correctly converted to minor units (x100)?
- [ ] Is `Idempotency-Key` sent in headers?
- [ ] Is the checkout payload flat with no unknown root keys?
- [ ] Is atomic, idempotent balance crediting implemented safely?
- [ ] Is the webhook signature verified securely using the raw body?
