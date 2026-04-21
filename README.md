# QuoteRotor

QuoteRotor is a React web app for drone operators to quickly create professional client estimates and pressure-test whether a job is actually profitable.

It includes two primary workflows:

- Builder: create a detailed quote with line items, travel costs, and terms, then export a clean PDF.
- Profit Check: estimate your true hourly take-home after travel time, editing time, and taxes.

## What It Does

- Builds client-ready drone estimates without manual document formatting.
- Calculates travel using IRS mileage rate (currently $0.67/mile) or a custom flat travel fee.
- Generates a live PDF preview and downloadable quote document.
- Provides a profitability calculator with red/green underpricing signal.
- Persists form data locally in browser storage so work is not lost on refresh.

## Pages

- `/builder`: quote creation form plus live PDF preview/download.
- `/profit-check`: quick financial reality check for quoting decisions.

## Tech Stack

- React 19
- Vite 8
- React Router 7
- Zustand (with persisted local storage state)
- @react-pdf/renderer (PDF generation and in-app preview)
- Tailwind CSS 4 (via Vite plugin)

## Local Development

### Prerequisites

- Node.js 18+ (recommended)
- npm

### Install

```bash
npm install
```

### Run Dev Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## How Pricing Is Calculated

Quote total combines:

- Flight/Shooting fee
- Editing fee
- Licensing/Usage fee
- Add-ons
- Revision buffer
- Travel (IRS mileage or custom flat fee)

Profit Check computes:

- Gross hourly = quote / (travel + on-site + editing hours)
- Net take-home = quote * (1 - tax rate)
- Take-home hourly = net take-home / total hours

Jobs are flagged as potentially underpriced when take-home hourly is below $30/hour.

## Notes

- This app is currently front-end only (no backend auth or database).
- Premium behavior in the UI is demo-mode unlock for styling options.

## License

No license file is currently included. Add a LICENSE if you plan to open-source with explicit terms.
