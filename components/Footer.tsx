export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[color:var(--border)]">
      <div className="section py-10 text-sm text-[color:var(--muted)] flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} ООО «Кул Дил» (CoolDeal)</p>
        <a href="mailto:nekrylov.ln@phystech.edu" className="underline-offset-4 hover:underline">
          nekrylov.ln@phystech.edu
        </a>
      </div>
    </footer>
  );
}
