import { config } from './config.mjs';
import { HttpError } from './http.mjs';

const STRIPE_API = 'https://api.stripe.com/v1';

async function stripeRequest(path, body) {
  if (!config.stripeSecretKey) throw new HttpError(503, 'payments_not_configured', 'To‘lov tizimi hali sozlanmagan.');
  const response = await fetch(`${STRIPE_API}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.stripeSecretKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      ...(config.stripeApiVersion ? { 'Stripe-Version': config.stripeApiVersion } : {}),
    },
    body: new URLSearchParams(body),
  });
  const payload = await response.json();
  if (!response.ok) {
    const message = payload?.error?.message || 'To‘lov provayderi so‘rovni qabul qilmadi.';
    throw new HttpError(502, 'payment_provider_error', message);
  }
  return payload;
}

export async function createCheckoutSession({ user, plan }) {
  const priceId = plan === 'mentor' ? config.stripePriceMentor : config.stripePricePro;
  if (!priceId) throw new HttpError(503, 'price_not_configured', 'Tanlangan tarif narxi hali sozlanmagan.');
  return stripeRequest('/checkout/sessions', {
    mode: 'subscription',
    'line_items[0][price]': priceId,
    'line_items[0][quantity]': '1',
    customer_email: user.email,
    client_reference_id: user.id,
    'metadata[user_id]': user.id,
    'metadata[plan]': plan,
    'subscription_data[metadata][user_id]': user.id,
    'subscription_data[metadata][plan]': plan,
    success_url: `${config.appOrigins[0]}/platform.html?payment=success#/premium`,
    cancel_url: `${config.appOrigins[0]}/platform.html?payment=cancelled#/premium`,
    allow_promotion_codes: 'true',
  });
}
