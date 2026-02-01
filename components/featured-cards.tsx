"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ArrowRightLeft, TrendingUp, Coins, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    id: "swap-bridge",
    title: "Swap & Bridge",
    description: "Trade tokens seamlessly across chains with zero-knowledge privacy",
    icon: ArrowRightLeft,
    gradient: "from-primary via-accent to-secondary",
    href: "#trade",
    stats: [
      { label: "Volume 24H", value: "$2.4M" },
      { label: "Transactions", value: "12.5K" },
    ],
  },
  {
    id: "limit-order",
    title: "Limit Order",
    description: "Set your price and let the market come to you with advanced order types",
    icon: TrendingUp,
    gradient: "from-secondary via-primary to-accent",
    href: "#limit-order",
    stats: [
      { label: "Active Orders", value: "3,420" },
      { label: "Success Rate", value: "94%" },
    ],
  },
  {
    id: "stake-earn",
    title: "Stake & Earn",
    description: "Earn passive income by staking your crypto assets with competitive APY",
    icon: Coins,
    gradient: "from-accent via-secondary to-primary",
    href: "#stake",
    stats: [
      { label: "TVL", value: "$8.2M" },
      { label: "APY", value: "Up to 12%" },
    ],
  },
  {
    id: "coming-soon",
    title: "Coming Soon",
    description: "More exciting DeFi features are on the way. Stay tuned for updates!",
    icon: Sparkles,
    gradient: "from-muted-foreground via-muted to-muted-foreground",
    href: "#",
    stats: [
      { label: "Status", value: "In Development" },
      { label: "ETA", value: "Q2 2024" },
    ],
    comingSoon: true,
  },
]

export function FeaturedCards() {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(true)

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  React.useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Featured DeFi Services</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={cn(
              "h-8 w-8 rounded-full bg-transparent border-border",
              !canScrollLeft && "opacity-50 cursor-not-allowed"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={cn(
              "h-8 w-8 rounded-full bg-transparent border-border",
              !canScrollRight && "opacity-50 cursor-not-allowed"
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {features.map((feature) => (
          <Link
            key={feature.id}
            href={feature.href}
            className={cn(
              "group flex-shrink-0 w-[350px] snap-start",
              feature.comingSoon && "pointer-events-none"
            )}
          >
            <div className={cn(
              "relative h-full p-6 rounded-2xl border border-border glass overflow-hidden transition-all duration-300",
              !feature.comingSoon && "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1"
            )}>
              {/* Background Gradient */}
              <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br",
                feature.gradient
              )} />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300",
                  !feature.comingSoon && "group-hover:scale-110",
                  feature.comingSoon ? "bg-muted/20" : "bg-gradient-to-br " + feature.gradient
                )}>
                  <feature.icon className={cn(
                    "h-7 w-7",
                    feature.comingSoon ? "text-muted-foreground" : "text-white"
                  )} />
                </div>

                {/* Title & Description */}
                <h3 className={cn(
                  "text-xl font-bold mb-2 transition-colors",
                  feature.comingSoon ? "text-muted-foreground" : "text-foreground group-hover:text-primary"
                )}>
                  {feature.title}
                  {feature.comingSoon && (
                    <span className="ml-2 text-xs font-medium px-2 py-1 rounded-full bg-muted/20 text-muted-foreground">
                      Soon
                    </span>
                  )}
                </h3>
                <p className={cn(
                  "text-sm mb-6",
                  feature.comingSoon ? "text-muted-foreground/60" : "text-muted-foreground"
                )}>
                  {feature.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {feature.stats.map((stat) => (
                    <div key={stat.label} className={cn(
                      "p-3 rounded-lg transition-colors",
                      feature.comingSoon ? "bg-surface/20" : "bg-surface/50 group-hover:bg-surface"
                    )}>
                      <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                      <p className={cn(
                        "text-sm font-bold",
                        feature.comingSoon ? "text-muted-foreground" : "text-foreground"
                      )}>
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Hover Indicator */}
                {!feature.comingSoon && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Explore</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                )}
              </div>

              {/* Decorative Elements */}
              <div className={cn(
                "absolute -right-8 -bottom-8 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500",
                feature.comingSoon ? "bg-muted" : "bg-primary"
              )} />
            </div>
          </Link>
        ))}
      </div>

      {/* Gradient Overlays for scroll indication */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      )}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      )}
    </section>
  )
}
