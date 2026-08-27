import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="not-found">
      <p>404</p>
      <h1>Page not found</h1>
      <Link className="button button--primary" href="/ro">TealGuard</Link>
    </main>
  );
}
