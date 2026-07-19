# HackPro Platform backend

This service is the production-oriented backend for HackPro Platform. It keeps
the public Vite site separate from sensitive account, payment and execution
workloads.

## Included

- Email/password accounts with scrypt password hashing.
- Opaque, hashed server sessions in HttpOnly + SameSite cookies.
- SQLite persistence in WAL mode for users, progress, XP, submissions, labs,
  Stripe payments, drafts and audit events.
- Stripe Checkout sessions and signed webhook processing.
- A database-backed worker queue.
- JavaScript and Python submissions executed in disposable, networkless,
  non-root Docker containers with CPU, memory, process, time and output limits.
- Time-limited labs on an internal Docker network, with a read-only root file
  system and all Linux capabilities removed.
- Six original auto-graded lab rooms: Web Security, Forensics, Linux, Docker,
  CI/CD and Kubernetes. Terminal commands are deliberately simulated inside the
  lab image; no submitted command is passed to a host shell.

## Local startup

1. Copy the backend keys from `.env.example` into the existing `.env` file.
   Keep the current Telegram token and admin ID unchanged.
2. Start the website with `npm run dev`.
3. Start the API with `npm run api`.
4. Install and start Docker Desktop before starting `npm run worker`.
5. Start the signed lab gateway with `npm run gateway`.
6. Build the allowlisted lab image:

   `docker build -t hackpro/lab-station:local backend/labs/web-basics`

The API listens on `http://127.0.0.1:8787` by default. Existing anonymous lesson
progress is copied to the first account used on the device, then removed from
browser storage after the copy succeeds.

## Production startup

Use one dedicated Linux server with Docker Engine. Build the backend and lab
images, then run `docker compose -f docker-compose.backend.yml up -d api worker lab-gateway`.
Place a TLS reverse proxy in front of the API as `https://api.hackpro.uz`, set
`APP_ORIGIN=https://hackpro.uz`, `API_PUBLIC_URL=https://api.hackpro.uz`,
`COOKIE_SECURE=true`, and build the frontend with
`VITE_PLATFORM_API_URL=https://api.hackpro.uz`.

Route `https://labs.hackpro.uz` to port `8790`, set
`LAB_PUBLIC_BASE_URL=https://labs.hackpro.uz`, and use the same strong
`LAB_ACCESS_SECRET` value for API and lab gateway. Lab links are short-lived and
HMAC-signed; the random Docker ports stay bound to host loopback only.

Before enabling payments, add Stripe secret keys and Price IDs. Configure the
Stripe webhook endpoint as:

`https://api.hackpro.uz/api/v1/payments/webhook`

Subscribe it to `checkout.session.completed` and
`customer.subscription.deleted` events. Never commit live keys to Git.

## Data safety

The named `hackpro-data` Docker volume contains `hackpro.sqlite` plus its WAL
files. Back up the whole volume on a schedule and test restore procedures on a
separate server. Stop both API and worker before making a manual file-level
copy. Never replace or delete the live volume during deployment.

For higher write concurrency or multiple API servers, migrate the small database
adapter in `src/db.mjs` to managed PostgreSQL before horizontally scaling. The
current SQLite design intentionally targets one API/worker server.

## Security boundary

The worker is the only service with access to the Docker socket. The public API
container runs as an unprivileged user and never executes submitted source code.
Only allowlisted images and languages are accepted. Keep Docker Engine, runner
images and the host operating system patched.
