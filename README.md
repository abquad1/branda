# Branda

A storefront for branding services: logos, merch, packaging, studio shoots and print. It runs in four markets (Nigeria, US, UK and Canada), and prices, tax and featured services change depending on which one you're in.

## What you can do

- Switch between four markets: Nigeria (NGN), US (USD), UK (GBP) and Canada (CAD)
- Browse services, search them, filter by category or use case, sort, and page through results
- Open a service, pick a package and quantity, and add it to your cart
- Check out your cart with local currency and tax applied (it's saved in your browser, so it survives a refresh)

Each market gets its own page metadata and `hreflang` tags for SEO. The cart page is `noindex`.

> **Heads up:** this is a demo. The catalog lives in memory (`lib/data.ts`), images come from [Picsum](https://picsum.photos), and exchange rates are mock values based on USD.

## Built with

Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4 and `react-icons`.

## Run it locally

You'll need Node.js 20+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you'll be redirected to `/ng`.

Other scripts: `npm run build`, `npm start` (serves the production build) and `npm run lint`.

**Optional:** to set the site's base URL for metadata, for example in production, add this to `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## How the URLs work

- `/` redirects to `/ng`
- `/{market}` is the home page, where `{market}` is `ng`, `us`, `uk` or `ca`
- `/{market}/services` is the catalog. It reads `q`, `category`, `useCase`, `urgency`, `sort` and `page` from the URL
- `/{market}/services/{slug}` is a single service
- `/{market}/cart` is the cart

There's also a small JSON API that takes the same filters as the catalog page:

```
GET /api/services?category=digital&sort=price-asc&page=1
```

Results are 9 per page and cached for 5 minutes. The logic is in `lib/query.ts`.

## Where things live

```
app/          pages, layouts and the API route
components/   navbar, cards, cart, purchase panel, etc.
lib/          markets, catalog data, filters, formatting, SEO helpers
```

Two things worth knowing:

- The cart is client-side only, in `components/cart-provider.tsx`, saved under `branda-cart-v1`.
- Prices are stored in USD and converted for display in `lib/format.ts`.
