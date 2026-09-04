import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] flex-col justify-end px-5 pt-[120px] pb-16 md:px-12">
      <p className="meta mb-6">404</p>
      <h1 className="display max-w-[10ch] text-[18vw] leading-[0.82] md:text-[9vw]">
        Page not found.
      </h1>
      <Link
        href="/"
        className="mt-10 inline-flex w-fit border border-ink px-6 py-3 text-[12px] tracking-[0.18em] uppercase"
      >
        Back home
      </Link>
    </section>
  );
}
