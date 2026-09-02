import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-32 md:px-10">
      <p className="font-hand text-2xl text-ink/80">hm</p>
      <h1 className="mt-2 font-display text-[2.3rem]">That page wandered off. Very Flamboyant Gamine of it.</h1>
      <p className="mt-4 text-soft"><Link href="/" className="ul-hand text-ink">Back home</Link></p>
    </div>
  );
}
