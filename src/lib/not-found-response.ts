import { NextResponse } from 'next/server';

import { defaultLocale } from '@/lib/site';

const notFoundHtml = `<!doctype html>
<html lang="${defaultLocale}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <meta name="theme-color" content="#0a3434">
    <title>Page not found | TealGuard</title>
    <link rel="icon" href="/icon">
    <link rel="manifest" href="/manifest.webmanifest">
    <style>
      :root { color-scheme: dark; --night: #061a1a; --line: #315252; --teal: #5fd8cd; }
      * { box-sizing: border-box; }
      html, body { min-height: 100%; }
      body { margin: 0; background: var(--night); color: #fff; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.55; letter-spacing: 0; }
      a { color: inherit; text-decoration: none; }
      img { display: block; max-width: 100%; }
      :focus-visible { outline: 3px solid #f0b84a; outline-offset: 3px; }
      .funding { min-height: 86px; display: flex; align-items: center; justify-content: space-between; gap: 32px; padding: 9px max(24px, calc((100% - 1360px) / 2)); background: #fff; color: #43565a; border-bottom: 1px solid #dfe7e5; }
      .funding__marks { display: flex; align-items: center; gap: 30px; flex: 0 0 auto; }
      .funding__eu { width: 234px; height: 50px; object-fit: contain; }
      .funding__government { width: 67px; height: 67px; object-fit: contain; }
      .funding__programme { width: 136px; height: 51px; object-fit: contain; }
      .funding p { max-width: 570px; margin: 0; font-size: 14px; line-height: 1.35; text-align: right; }
      .not-found-header { height: 70px; display: flex; align-items: center; justify-content: space-between; padding: 0 max(24px, calc((100% - 1360px) / 2)); background: #081f1f; border-bottom: 1px solid #274747; }
      .brand { display: inline-flex; align-items: center; gap: 10px; font-size: 21px; font-weight: 700; }
      .brand__mark { width: 30px; height: 30px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 3px; padding: 5px; border: 1px solid var(--teal); border-radius: 50%; }
      .brand__mark i { display: block; border: 1px solid #7de6dc; border-radius: 1px; }
      .locale { display: inline-flex; border: 1px solid #456565; border-radius: 5px; overflow: hidden; }
      .locale a { min-width: 36px; padding: 7px 9px; color: #9eb3b1; font-size: 12px; font-weight: 700; text-align: center; }
      .locale a[aria-current="page"] { background: #dff5f2; color: #0b3030; }
      .not-found { min-height: calc(100svh - 156px); display: grid; align-items: center; padding: clamp(32px, 8vw, 96px); background: var(--night); }
      .not-found__message { width: min(100%, 680px); padding-top: 32px; border-top: 1px solid var(--line); }
      .not-found__code { margin: 0 0 12px; color: var(--teal); font-size: 14px; font-weight: 700; }
      h1 { margin: 0 0 16px; font-size: 52px; line-height: 1.08; letter-spacing: 0; }
      .not-found__copy { max-width: 520px; margin: 0 0 28px; color: #c6d7d5; font-size: 18px; }
      .button { min-height: 42px; display: inline-flex; align-items: center; justify-content: center; padding: 10px 15px; border: 1px solid var(--teal); border-radius: 5px; background: var(--teal); color: #062323; font-size: 14px; font-weight: 700; }
      .button:hover { background: #83e6dd; border-color: #83e6dd; }
      @media (max-width: 760px) {
        .funding { min-height: 126px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px 16px; padding: 12px 16px; }
        .funding__marks { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 12px; }
        .funding__eu { grid-column: 1 / -1; width: 178px; height: auto; }
        .funding__government { width: 67px; height: 67px; }
        .funding__programme { width: 101px; height: auto; }
        .funding p { max-width: 180px; font-size: 11px; text-align: left; }
        .not-found-header { height: 64px; padding: 0 16px; }
        .not-found { min-height: calc(100svh - 190px); align-items: start; padding: 32px; }
        h1 { font-size: 40px; }
      }
      @media (max-width: 380px) {
        .funding { grid-template-columns: 1fr; }
        .funding p { max-width: none; }
        .brand { font-size: 19px; }
        .not-found { padding: 28px 20px; }
      }
    </style>
  </head>
  <body>
    <div class="funding" aria-label="European Union co-funding">
      <div class="funding__marks">
        <img class="funding__eu" src="/images/funding/eu-cofunded-ro.png" alt="Co-funded by the European Union">
        <img class="funding__government" src="/images/funding/guvernul-romaniei.png" alt="Government of Romania">
        <img class="funding__programme" src="/images/funding/programul-sanatate.png" alt="Health Programme">
      </div>
      <p>Project co-funded by the European Union through the European Regional Development Fund</p>
    </div>
    <header class="not-found-header">
      <a class="brand" href="/${defaultLocale}" aria-label="TealGuard home">
        <span class="brand__mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
        <span>TealGuard</span>
      </a>
      <nav class="locale" aria-label="Language">
        <a href="/ro" lang="ro">RO</a>
        <a href="/${defaultLocale}" lang="en" aria-current="page">EN</a>
      </nav>
    </header>
    <main class="not-found">
      <div class="not-found__message">
        <p class="not-found__code">404</p>
        <h1>Page not found</h1>
        <p class="not-found__copy">The page may have moved, or the address may be incomplete.</p>
        <a class="button" href="/${defaultLocale}">Return to TealGuard</a>
      </div>
    </main>
  </body>
</html>`;

export const createNotFoundResponse = () =>
  new NextResponse(notFoundHtml, {
    status: 404,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Language': defaultLocale,
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow'
    }
  });
