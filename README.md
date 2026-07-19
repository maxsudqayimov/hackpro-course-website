# HackPro

HackPro is a modern React + Vite educational course website for three technology directions:
Cybersecurity, IoT and Artificial Intelligence.

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Platform backend

The `backend/` service adds durable accounts, server-side progress, Stripe Checkout,
an isolated Docker code judge, and time-limited Docker labs. It uses Node.js 24 and
SQLite, so the API itself has no third-party runtime dependency.

```bash
npm run api
npm run worker
npm run backend:test
```

The API can run without Docker. Code submissions and labs require Docker and the
lab image described in `backend/README.md`.

## Project Structure

```text
src/
  components/      Reusable page sections and icons
  data/            Website navigation, courses, advantages and stats
  App.jsx          Page composition
  main.jsx         React entrypoint
  styles.css       Responsive premium dark theme
backend/
  src/             API, database, security and isolated worker
  labs/            Allowlisted lab images
  tests/           Security and persistence tests
```
