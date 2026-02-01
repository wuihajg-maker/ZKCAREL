"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { EnhancedNavigation } from "@/components/enhanced-navigation"
import { QuickStatsSidebar } from "@/components/quick-stats-sidebar"
import { FeaturedCards } from "@/components/featured-cards"
import { TradingInterface } from "@/components/trading-interface"
import { LimitOrder } from "@/components/limit-order"
import { StakeEarn } from "@/components/stake-earn"
import { PortfolioDashboard } from "@/components/portfolio-dashboard"
import { Leaderboard } from "@/components/leaderboard"
import { RewardsHub } from "@/components/rewards-hub"
import { FloatingAIAssistant } from "@/components/floating-ai-assistant"
import { ParticleBackground } from "@/components/particle-background"

export default function ZkCarelApp() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="relative min-h-screen">
        {/* Background Effects */}
        <ParticleBackground />
        
        {/* Navigation */}
        <EnhancedNavigation />

        {/* Main Layout */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Sidebar */}
            <QuickStatsSidebar />

            {/* Main Content */}
            <main className="flex-1 space-y-12">
              {/* Hero Section */}
              <section className="text-center py-8">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 neon-text">
                  Privacy-First Trading
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Trade cryptocurrencies with zero-knowledge privacy. Swap, bridge, and earn rewards on the most advanced DeFi platform.
                </p>
              </section>

              {/* Featured Cards */}
              <FeaturedCards />

              {/* Trading Interface */}
              <section id="trade">
                <TradingInterface />
              </section>

              {/* Limit Order - Coming Soon */}
              <LimitOrder />

              {/* Stake & Earn - Coming Soon */}
              <StakeEarn />

              {/* Portfolio Dashboard */}
              <PortfolioDashboard />

              {/* Leaderboard */}
              <Leaderboard />

              {/* Rewards Hub */}
              <RewardsHub />

              {/* Footer */}
              <footer className="py-8 border-t border-border">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary font-bold">Z</span>
                      </div>
                    </div>
                    <span className="font-bold text-foreground">ZkCarel</span>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <a href="https://x.com/zkcarel" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">X (Twitter)</a>
                    <a href="https://t.me/zkcarel" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Telegram</a>
                    <a href="https://github.com/zkcarel" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>
                    <a href="#docs" className="hover:text-primary transition-colors">Documentation</a>
                    <a href="#terms" className="hover:text-primary transition-colors">Terms</a>
                    <a href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    © 2024 ZkCarel. All rights reserved.
                  </p>
                </div>
              </footer>
            </main>
          </div>
        </div>

        {/* Floating AI Assistant */}
        <FloatingAIAssistant />
      </div>
    </ThemeProvider>
  )
}
