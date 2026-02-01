"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { TrendingUp, Lock, Coins, Info, Clock } from "lucide-react"

const stakingPools = [
  {
    symbol: "USDT",
    name: "Tether",
    icon: "₮",
    type: "Stablecoin",
    apy: "8.5",
    tvl: "2.4M",
    minStake: "100",
    lockPeriod: "Flexible",
    reward: "USDT",
    gradient: "from-green-400 to-emerald-600",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    icon: "⭕",
    type: "Stablecoin",
    apy: "8.2",
    tvl: "1.8M",
    minStake: "100",
    lockPeriod: "Flexible",
    reward: "USDC",
    gradient: "from-blue-400 to-cyan-600",
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    icon: "₿",
    type: "Crypto",
    apy: "5.5",
    tvl: "4.2M",
    minStake: "0.001",
    lockPeriod: "30 days",
    reward: "BTC",
    gradient: "from-orange-400 to-amber-600",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    icon: "Ξ",
    type: "Crypto",
    apy: "6.8",
    tvl: "3.1M",
    minStake: "0.01",
    lockPeriod: "30 days",
    reward: "ETH",
    gradient: "from-purple-400 to-indigo-600",
  },
  {
    symbol: "STRK",
    name: "StarkNet",
    icon: "◈",
    type: "Crypto",
    apy: "12.5",
    tvl: "820K",
    minStake: "10",
    lockPeriod: "60 days",
    reward: "STRK",
    gradient: "from-pink-400 to-rose-600",
  },
  {
    symbol: "CAREL",
    name: "ZkCarel",
    icon: "◐",
    type: "Crypto",
    apy: "15.0",
    tvl: "650K",
    minStake: "100",
    lockPeriod: "90 days",
    reward: "CAREL",
    gradient: "from-violet-400 to-purple-600",
  },
]

interface StakingPool {
  symbol: string
  name: string
  icon: string
  type: string
  apy: string
  tvl: string
  minStake: string
  lockPeriod: string
  reward: string
  gradient: string
}

export function StakeEarn() {
  return (
    <section id="stake" className="py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header with Coming Soon Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 mb-4">
            <Lock className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Testnet Mode - Display Only</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Stake & Earn</h2>
          <p className="text-muted-foreground">Earn passive income on your crypto assets</p>
        </div>

        {/* Stats - Display Only */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-xl glass border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Total Value Locked</p>
            </div>
            <p className="text-2xl font-bold text-foreground">$13.0M</p>
            <p className="text-xs text-success mt-1">+12.4% this month</p>
          </div>

          <div className="p-6 rounded-xl glass border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                <Coins className="h-5 w-5 text-secondary" />
              </div>
              <p className="text-sm text-muted-foreground">Active Stakers</p>
            </div>
            <p className="text-2xl font-bold text-foreground">4,238</p>
            <p className="text-xs text-success mt-1">+8.2% this week</p>
          </div>

          <div className="p-6 rounded-xl glass border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Lock className="h-5 w-5 text-accent" />
              </div>
              <p className="text-sm text-muted-foreground">Avg. APY</p>
            </div>
            <p className="text-2xl font-bold text-foreground">9.4%</p>
            <p className="text-xs text-muted-foreground mt-1">Across all pools</p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mb-8 p-4 rounded-xl bg-secondary/10 border border-secondary/20">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Staking Coming Soon</p>
              <p className="text-xs text-muted-foreground mt-1">
                This is a preview of available staking pools. Staking functionality will be enabled in the mainnet release.
                Token selection and staking actions are currently disabled.
              </p>
            </div>
          </div>
        </div>

        {/* Staking Pools - Display Only */}
        <div className="space-y-6">
          {/* Stablecoins Section */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Stablecoins</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {stakingPools
                .filter((pool) => pool.type === "Stablecoin")
                .map((pool) => (
                  <StakingCard key={pool.symbol} pool={pool} />
                ))}
            </div>
          </div>

          {/* Cryptocurrencies Section */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Cryptocurrencies</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {stakingPools
                .filter((pool) => pool.type === "Crypto")
                .map((pool) => (
                  <StakingCard key={pool.symbol} pool={pool} />
                ))}
            </div>
          </div>
        </div>

        {/* Your Staking Positions - Coming Soon */}
        <div className="mt-12 p-6 rounded-2xl glass-strong border border-border">
          <h3 className="text-lg font-bold text-foreground mb-4">Your Staking Positions</h3>
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No staking positions yet</p>
            <p className="text-sm text-muted-foreground mt-2">
              Your staking positions will appear here once staking is enabled
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function StakingCard({ pool }: { pool: StakingPool }) {
  return (
    <div className="p-6 rounded-xl glass border border-border hover:border-border transition-all group relative overflow-hidden">
      {/* Coming Soon Overlay */}
      <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] z-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <div className="bg-surface/90 px-4 py-2 rounded-lg border border-border">
          <span className="text-sm font-medium text-foreground flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Coming Soon
          </span>
        </div>
      </div>

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn("w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center", pool.gradient)}>
            <span className="text-2xl text-white">{pool.icon}</span>
          </div>
          <div>
            <h4 className="font-bold text-foreground">{pool.symbol}</h4>
            <p className="text-sm text-muted-foreground">{pool.name}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">APY</p>
          <p className="text-2xl font-bold text-success">{pool.apy}%</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <p className="text-xs text-muted-foreground">TVL</p>
          <p className="text-sm font-medium text-foreground">${pool.tvl}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Min. Stake</p>
          <p className="text-sm font-medium text-foreground">
            {pool.minStake} {pool.symbol}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Lock Period</p>
          <p className="text-sm font-medium text-foreground">{pool.lockPeriod}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Reward</p>
          <p className="text-sm font-medium text-foreground">{pool.reward}</p>
        </div>
      </div>

      {/* Disabled Stake Button */}
      <Button
        disabled
        className="w-full bg-muted/50 text-muted-foreground cursor-not-allowed"
      >
        <Lock className="h-4 w-4 mr-2" />
        Coming Soon
      </Button>
    </div>
  )
}
