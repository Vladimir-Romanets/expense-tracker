import Image from 'next/image'
import Typography from '../Typography/Typography'
import LinkAsButton from '../Link/LinkAsButton'
import { cn } from '@/lib/cn'

type Props = {
  className?: string
}

const Hero = ({ className }: Props) => (
  <div
    className={cn(
      'my-auto grid w-full gap-5 md:grid-cols-2 md:grid-rows-[repeat(3,minmax(0,auto))] md:gap-8',
      className
    )}
  >
    <Typography
      as="h1"
      variant="h1"
    >
      Expense Tracker:
      <br />
      Detailed Budget & Price Dynamic
    </Typography>
    <div className="relative w-full max-md:h-64 md:row-span-3">
      <Image
        src="/hero.webp"
        alt="Expense tracker"
        fill
        priority
        sizes="(max-width: 768px) 320px, 480px"
        className="object-scale-down"
      />
    </div>
    <Typography variant="lead">
      Track every detail, analyze price history and plan smart budgets.
    </Typography>
    <LinkAsButton
      href="/registration"
      shape="pill"
      size="lg"
      className="w-max bg-brand-500"
    >
      Start for Free
    </LinkAsButton>
  </div>
)

export default Hero
