import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { LinkAsButton, Hero, Icon, Typography } from '@/ui'

export const metadata: Metadata = {
  title: 'Homepage | Expense Tracker',
}

const HomePage = () => {
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-surface-border bg-surface-card py-2 shadow-md">
        <div className="container flex items-center justify-between gap-2">
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="Expense Tracker — Home"
          >
            <Image
              src="/logo.webp"
              width={32}
              height={24}
              alt="Expense Tracker"
            />
            <b className="text-sm leading-4 max-md:hidden">
              Expense
              <br />
              Tracker
            </b>
          </Link>
          <nav className="flex gap-4">
            <LinkAsButton
              href="#features"
              variant="ghost"
            >
              Features
            </LinkAsButton>
            <LinkAsButton
              href="#how-it-works"
              variant="ghost"
            >
              How it works
            </LinkAsButton>
          </nav>
          <div className="flex gap-2">
            <LinkAsButton
              href="/login"
              variant="outline"
            >
              Login
            </LinkAsButton>
            <LinkAsButton
              href="/register"
              variant="primary"
            >
              Register
            </LinkAsButton>
          </div>
        </div>
      </header>
      <main className="flex min-h-screen flex-col">
        <section className="flex min-h-[calc(100vh-128px)] bg-brand-800 text-white">
          <Hero className="container" />
        </section>
        <section
          id="features"
          className="container py-24"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col rounded-3xl border border-surface-border bg-surface-card p-8 shadow-sm">
              <div className="mb-8 flex size-16 items-center justify-center rounded-2xl bg-brand-100 text-brand-800">
                <Icon
                  name="cube"
                  size={32}
                />
              </div>
              <Typography
                variant="h3"
                as="h3"
                className="text-foreground mb-4"
              >
                Product-Level Detail
              </Typography>
              <Typography
                variant="p"
                className="text-foreground-muted leading-relaxed"
              >
                Analyze price dynamics, scan receipts, and plan your family
                budget effortlessly.
              </Typography>
            </div>

            <div className="flex flex-col rounded-3xl border border-surface-border bg-surface-card p-8 shadow-sm">
              <div className="mb-8 flex size-16 items-center justify-center rounded-2xl bg-brand-100 text-brand-800">
                <Icon
                  name="chart-linear"
                  size={32}
                />
              </div>
              <Typography
                variant="h3"
                as="h3"
                className="text-foreground mb-4"
              >
                Price Dynamics Graphs
              </Typography>
              <Typography
                variant="p"
                className="text-foreground-muted leading-relaxed"
              >
                Track how prices for your favorite products change over time
                with beautiful, easy-to-read charts.
              </Typography>
            </div>

            <div className="flex flex-col rounded-3xl border border-surface-border bg-surface-card p-8 shadow-sm">
              <div className="mb-8 flex size-16 items-center justify-center rounded-2xl bg-brand-100 text-brand-800">
                <Icon
                  name="chart-pie"
                  size={32}
                />
              </div>
              <Typography
                variant="h3"
                as="h3"
                className="text-foreground mb-4"
              >
                Smart Budgets
              </Typography>
              <Typography
                variant="p"
                className="text-foreground-muted leading-relaxed"
              >
                Set limits for different categories. Smart budgets adapt to your
                family&apos;s needs and alert you before you overspend.
              </Typography>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="container pb-24"
        >
          <div className="mb-16 text-center">
            <Typography
              variant="h1"
              as="h2"
              className="text-foreground mb-4 tracking-tight"
            >
              How it Works
            </Typography>
            <Typography
              variant="lead"
              className="text-foreground-muted mx-auto max-w-2xl"
            >
              Get started in minutes and take full control of your personal
              finances.
            </Typography>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-brand-800 text-2xl font-bold text-white shadow-lg">
                1
              </div>
              <Typography
                variant="h4"
                as="h3"
                className="text-foreground mb-3"
              >
                Scan & Upload
              </Typography>
              <Typography
                variant="p"
                className="text-foreground-muted"
              >
                Snap a photo of your receipt or upload a PDF, and our algorithm
                will instantly extract all items and prices.
              </Typography>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-brand-800 text-2xl font-bold text-white shadow-lg">
                2
              </div>
              <Typography
                variant="h4"
                as="h3"
                className="text-foreground mb-3"
              >
                Review & Categorize
              </Typography>
              <Typography
                variant="p"
                className="text-foreground-muted"
              >
                The system automatically categorizes your spending, leaving you
                with full control for quick adjustments.
              </Typography>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-brand-800 text-2xl font-bold text-white shadow-lg">
                3
              </div>
              <Typography
                variant="h4"
                as="h3"
                className="text-foreground mb-3"
              >
                Gain Insights
              </Typography>
              <Typography
                variant="p"
                className="text-foreground-muted"
              >
                Track expenses on a detailed dashboard, find ways to save, and
                easily manage your family budget.
              </Typography>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-surface-border bg-surface-card py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.webp"
              width={24}
              height={18}
              alt="Expense Tracker"
            />
            <span className="font-semibold text-slate-700">Expense Tracker</span>
          </div>
          <Typography variant="small" className="text-slate-500">
            &copy; {new Date().getFullYear()} Expense Tracker. All rights reserved.
          </Typography>
        </div>
      </footer>
    </>
  )
}

export default HomePage
