import Image from 'next/image'
import Link from 'next/link'
import LinkAsButton from '@/ui/Link/LinkAsButton'
import Hero from '@/ui/Hero/Hero'

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
              height={32}
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
              href="/auth?tab=login"
              variant="outline"
            >
              Login
            </LinkAsButton>
            <LinkAsButton
              href="/auth?tab=register"
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
          className="h-75"
        >
          {/* TODO: replace with real Features content */}
          Lorem ipsum
        </section>
        <section
          id="how-it-works"
          className="h-75"
        >
          {/* TODO: replace with real Features content */}
          Lorem ipsum
        </section>
      </main>
    </>
  )
}

export default HomePage
