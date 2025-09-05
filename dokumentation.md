Dokumentation for Landrup Dans
<img src="./public/Rectangle.png" width="320" />
Sådan kommer du i gang

npm install
npm install --prefix server/landrup-dans-api
npm run dev:all

Web: http://localhost:3000

Jeg har lavet valgfri opgave C.

## Tech-stack

Next.js — App Router, server/klient-komponenter.

React — komponenter og hooks.

Tailwind CSS — hurtig, ensartet styling.

Express + Sequelize + SQLite — REST-API og data.

JWT + cookies — login og “Husk mig”.

concurrently + wait-on — starter API og web samtidig.

## Kode-eksempel
```jsx
// /login – springer siden over hvis "Husk mig" er gyldig
export default async function LoginPage({ searchParams }) {
  const store = await cookies();
  const raw = store.get("ld_user")?.value;
  const sp = await searchParams;
  const next = typeof sp?.get === "function" ? sp.get("next") : sp?.next;

  if (raw) {
    const p = JSON.parse(decodeURIComponent(raw));
    const ok = p?.user?.token && (!p.validUntil || +p.validUntil > Date.now());
    if (ok) redirect(typeof next === "string" && next.startsWith("/") ? next : "/calendar");
  }
  return <LoginClient />;
}
```

## Kort fortalt: læser cookie på serveren; hvis gyldig → redirect, ellers vis login.

## Ting, jeg har lavet om og hvorfor

## Valgfri C:
 auto-redirect fra /login ved “Husk mig” for hurtigere flow.

## Tilmeld/Forlad: 
pending tilmelding før login + auto-tilmelding efter login.

## Søg:
 alle kort først, lokal filtrering, tom-tilstand ved 0 resultater.

## Kalender/hold-oversigt: 
 brugerens tilmeldinger 