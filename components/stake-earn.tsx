"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TrendingUp, Lock, Coins, Info, ChevronRight } from "lucide-react"

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

const providers = [
  { name: "Lido Finance", logo: "🔷" },
  { name: "Aave", logo: "👻" },
  { name: "Compound", logo: "🏛️" },
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
  const [stakeDialogOpen, setStakeDialogOpen] = React.useState(false)
  const [selectedPool, setSelectedPool] = React.useState<StakingPool | null>(null)
  const [stakeAmount, setStakeAmount] = React.useState("")
  const [selectedProvider, setSelectedProvider] = React.useState(providers[0])

  const handleStake = (pool: StakingPool) => {
    setSelectedPool(pool)
    setStakeDialogOpen(true)
  }

  const calculateRewards = () => {
    if (!selectedPool || !stakeAmount) return "0.00"
    const amount = Number.parseFloat(stakeAmount)
    const apy = Number.parseFloat(selectedPool.apy)
    const yearlyReward = (amount * apy) / 100
    return yearlyReward.toFixed(2)
  }

  return (
    <>
      <section id="stake" className="py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Stake & Earn</h2>
            <p className="text-muted-foreground">Earn passive income on your crypto assets</p>
          </div>

          {/* Stats */}
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

          {/* Staking Pools */}
          <div className="space-y-6">
            {/* Stablecoins Section */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">Stablecoins</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {stakingPools
                  .filter((pool) => pool.type === "Stablecoin")
                  .map((pool) => (
                    <StakingCard key={pool.symbol} pool={pool} onStake={handleStake} />
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
                    <StakingCard key={pool.symbol} pool={pool} onStake={handleStake} />
                  ))}
              </div>
            </div>
          </div>

          {/* Your Staking Positions */}
          <div className="mt-12 p-6 rounded-2xl glass-strong border border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">Your Staking Positions</h3>
            <div className="space-y-3">
              {[
                { token: "USDT", amount: "1,000", apy: "8.5%", earned: "23.42", days: "45" },
                { token: "CAREL", amount: "5,000", apy: "15.0%", earned: "342.47", days: "30" },
              ].map((position, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-surface/50 border border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Coins className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{position.token} Staking</p>
                      <p className="text-sm text-muted-foreground">
                        {position.amount} {position.token} at {position.apy} APY
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Earned</p>
                    <p className="text-lg font-bold text-success">+{position.earned} {position.token}</p>
                    <p className="text-xs text-muted-foreground mt-1">{position.days} days staked</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Claim
                    </Button>
                    <Button variant="outline" size="sm" className="bg-transparent text-destructive">
                      Unstake
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stake Dialog */}
      <Dialog open={stakeDialogOpen} onOpenChange={setStakeDialogOpen}>
        <DialogContent className="glass-strong border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-2xl">{selectedPool?.icon}</span>
              Stake {selectedPool?.symbol}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Pool Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-surface/50">
                <p className="text-xs text-muted-foreground">APY</p>
                <p className="text-lg font-bold text-success">{selectedPool?.apy}%</p>
              </div>
              <div className="p-3 rounded-lg bg-surface/50">
                <p className="text-xs text-muted-foreground">Lock Period</p>
                <p className="text-lg font-bold text-foreground">{selectedPool?.lockPeriod}</p>
              </div>
              <div className="p-3 rounded-lg bg-surface/50">
                <p className="text-xs text-muted-foreground">Min. Stake</p>
                <p className="text-sm font-medium text-foreground">
                  {selectedPool?.minStake} {selectedPool?.symbol}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-surface/50">
                <p className="text-xs text-muted-foreground">Reward Token</p>
                <p className="text-sm font-medium text-foreground">{selectedPool?.reward}</p>
              </div>
            </div>

            {/* Amount Input */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Amount to Stake</label>
              <div className="relative">
                <input
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  placeholder={`Min. ${selectedPool?.minStake}`}
                  className="w-full px-3 py-3 pr-20 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                  {selectedPool?.symbol}
                </span>
              </div>
              <div className="flex gap-2 mt-2">
                {["25%", "50%", "75%", "100%"].map((percent) => (
                  <button
                    key={percent}
                    className="flex-1 px-2 py-1 text-xs rounded-md bg-surface hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {percent}
                  </button>
                ))}
              </div>
            </div>

            {/* Provider Selection */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Staking Provider</label>
              <div className="space-y-2">
                {providers.map((provider) => (
                  <button
                    key={provider.name}
                    onClick={() => setSelectedProvider(provider)}
                    className={cn(
                      "w-full flex items-center justify-between p-3 rounded-lg border transition-all",
                      selectedProvider.name === provider.name
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{provider.logo}</span>
                      <span className="font-medium">{provider.name}</span>
                    </div>
                    {selectedProvider.name === provider.name && (
                      <ChevronRight className="h-4 w-4 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Estimated Rewards */}
            {stakeAmount && (
              <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Estimated Yearly Reward</span>
                  <span className="text-sm font-bold text-success">
                    {calculateRewards()} {selectedPool?.symbol}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Info className="h-3 w-3" />
                  <span>Based on current APY of {selectedPool?.apy}%</span>
                </div>
              </div>
            )}

            {/* Info Notice */}
            <div className="p-3 rounded-lg bg-surface/50 border border-border">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  {selectedPool?.lockPeriod === "Flexible"
                    ? "You can unstake your tokens at any time without penalty."
                    : `Your tokens will be locked for ${selectedPool?.lockPeriod}. Early unstaking may result in penalty.`}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => setStakeDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90">
                Confirm Stake
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

function StakingCard({ pool, onStake }: { pool: StakingPool; onStake: (pool: StakingPool) => void }) {
  return (
    <div className="p-6 rounded-xl glass border border-border hover:border-primary/50 transition-all group">
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

      <Button
        onClick={() => onStake(pool)}
        className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all"
      >
        Stake {pool.symbol}
      </Button>
    </div>
  )
}
