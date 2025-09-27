import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl p-6 md:p-10">
      <header className="mb-10">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Million‑Pixel Cube</h1>
        <p className="text-zinc-400 mt-3 max-w-2xl">
          Own a tiny piece of a huge rotating cube. 6 faces × 1,000,000 pixels each.
          Claim tiles, upload your creative, and link to your site.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/cube" className="px-5 py-3 rounded-xl bg-white text-black font-medium">Open the Cube</Link>
          <Link href="/face/4" className="px-5 py-3 rounded-xl border border-zinc-700">Browse Front Face</Link>
        </div>
      </header>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-zinc-800 p-5">
          <h3 className="font-medium mb-2">How it works</h3>
          <ol className="list-decimal list-inside text-zinc-300 space-y-1 text-sm">
            <li>Select tiles on the 3D cube or a flat face.</li>
            <li>Checkout with Stripe and upload your creative.</li>
            <li>We moderate, publish, and your ad goes live.</li>
          </ol>
        </div>
        <div className="rounded-2xl border border-zinc-800 p-5">
          <h3 className="font-medium mb-2">Pricing</h3>
          <ul className="list-disc list-inside text-zinc-300 space-y-1 text-sm">
            <li>Base price per 10×10 px tile</li>
            <li>Front face premium, bulk discounts</li>
            <li>Featured placements available</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-zinc-800 p-5">
          <h3 className="font-medium mb-2">Rules</h3>
          <p className="text-sm text-zinc-300">
            Family‑friendly creative only. No IP violations, hate, or adult content.
            See our full Terms for details.
          </p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Buy tiles</h2>
        <p className="text-zinc-400 text-sm">Open the interactive views to start selecting tiles.</p>
        <div className="mt-4 flex gap-3">
          <Link href="/cube" className="px-4 py-2 rounded-xl border border-zinc-700">3D Cube</Link>
          <Link href="/face/4" className="px-4 py-2 rounded-xl border border-zinc-700">2D Faces</Link>
        </div>
      </section>
    </main>
  );
}
