import { Button } from "@/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-5">
      <div className="max-w-xl w-full text-left space-y-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-forest">
          Error 404
        </span>

        <h1 className="font-display font-medium text-navy text-4xl sm:text-5xl leading-tight">
          Page not found
        </h1>

        <p className="text-slate text-base sm:text-lg leading-relaxed max-w-[50ch]">
          The page you requested may have moved, been renamed, or does not exist. Choose one of the
          options below to continue navigating.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <Button href="/" variant="primary">
            Go home
          </Button>
          <Button href="/programmes" variant="secondary">
            Browse programmes
          </Button>
        </div>
      </div>
    </div>
  );
}
