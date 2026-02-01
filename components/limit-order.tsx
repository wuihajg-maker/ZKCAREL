"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ChevronDown, TrendingUp, Clock, Info, Lock, Expand } from "lucide-react"

const tokens = [
  { symbol: "BTC", name: "Bitcoin", icon: "₿", price: 65000 },
  { symbol: "ETH", name: "Ethereum", icon: "Ξ", price: 2450 },
  { symbol: "STRK", name: "StarkNet", icon: "◈", price: 1.25 },
  { symbol: "CAREL", name: "ZkCarel", icon: "◐", price: 0.85 },
  { symbol: "USDT", name: "Tether", icon: "₮", price: 1 },
]

const expiryOptions = [
  { label: "10 minutes", value: "10m" },
  { label: "1 hour", value: "1h" },
  { label: "1 day", value: "1d" },
  { label: "3 days", value: "3d" },
  { label: "7 days", value: "7d" },
]

const pricePresets = [
  { label: "-5%", value: -5 },
  { label: "-10%", value: -10 },
  { label: "-25%", value: -25 },
  { label: "-50%", value: -50 },
]

export function LimitOrder() {
  const [selectedToken, setSelectedToken] = React.useState(tokens[0])
  const [payToken, setPayToken] = React.useState(tokens[4])
  const [receiveToken, setReceiveToken] = React.useState(tokens[4])
  const [orderType, setOrderType] = React.useState<"buy" | "sell">("buy")
  const [amount, setAmount] = React.useState("")
  const [price, setPrice] = React.useState("")
  const [expiry, setExpiry] = React.useState(expiryOptions[2].value)
  const [receiveAddress] = React.useState("0x8f...4e2d (Your Wallet)")
  const [chartModalOpen, setChartModalOpen] = React.useState(false)

  const handlePricePreset = (percentage: number) => {
    const marketPrice = selectedToken.price
    const newPrice = marketPrice * (1 + percentage / 100)
    setPrice(newPrice.toFixed(2))
  }

  const marketPrice = selectedToken.price
  const currentPrice = Number.parseFloat(price) || 0
  const priceChange = marketPrice ? ((currentPrice - marketPrice) / marketPrice * 100).toFixed(2) : "0"

  return (
    <>
      <section id="limit-order" className="py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header with Coming Soon Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 mb-4">
              <Lock className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Coming Soon - Testnet Mode</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Limit Order</h2>
            <p className="text-muted-foreground">Set your price and execute trades automatically</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Chart Section - With Full Chart Modal */}
            <div className="lg:col-span-2 p-6 rounded-2xl glass-strong border border-border relative">
              {/* Coming Soon Overlay */}
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm rounded-2xl z-10 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                    <Lock className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Live Trading Coming Soon</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Limit order functionality will be available in the mainnet release.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6 opacity-50">
                <div className="flex items-center gap-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild disabled>
                      <Button variant="outline" className="gap-2 bg-transparent cursor-not-allowed">
                        <span className="text-xl">{selectedToken.icon}</span>
                        <span className="font-bold">{selectedToken.symbol}</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="glass-strong border-border">
                      {tokens.map((token) => (
                        <DropdownMenuItem
                          key={token.symbol}
                          onClick={() => setSelectedToken(token)}
                          className="flex items-center gap-2"
                        >
                          <span className="text-lg">{token.icon}</span>
                          <div>
                            <p className="font-medium">{token.symbol}</p>
                            <p className="text-xs text-muted-foreground">{token.name}</p>
                          </div>
                          <span className="ml-auto">${token.price.toLocaleString()}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <div>
                    <p className="text-2xl font-bold text-foreground">${selectedToken.price.toLocaleString()}</p>
                    <p className="text-sm text-success flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      +2.4%
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex gap-2">
                    {["1H", "24H", "7D", "30D"].map((period) => (
                      <button
                        key={period}
                        disabled
                        className={cn(
                          "px-3 py-1 text-xs font-medium rounded-md cursor-not-allowed",
                          period === "24H"
                            ? "bg-primary/20 text-primary"
                            : "text-muted-foreground"
                        )}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    disabled
                    className="cursor-not-allowed"
                    onClick={() => setChartModalOpen(true)}
                  >
                    <Expand className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Simplified Chart Visualization */}
              <div className="h-64 rounded-xl bg-surface/30 relative overflow-hidden opacity-50">
                <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgb(var(--color-primary))" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="rgb(var(--color-primary))" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 150 Q 100 120, 200 130 T 400 100 T 600 80 T 800 70"
                    fill="url(#chartGradient)"
                    stroke="rgb(var(--color-primary))"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Live Price Chart</p>
                </div>
              </div>
            </div>

            {/* Order Form - All Disabled */}
            <div className="p-6 rounded-2xl glass-strong border border-border relative">
              {/* Coming Soon Overlay for Form */}
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm rounded-2xl z-10 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-6 w-6 text-secondary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Available in Mainnet</p>
                </div>
              </div>

              <Tabs value={orderType} onValueChange={(value) => setOrderType(value as "buy" | "sell")}>
                <TabsList className="grid w-full grid-cols-2 mb-6 opacity-50">
                  <TabsTrigger value="buy" disabled className="data-[state=active]:bg-success/20 data-[state=active]:text-success cursor-not-allowed">
                    Buy
                  </TabsTrigger>
                  <TabsTrigger value="sell" disabled className="data-[state=active]:bg-destructive/20 data-[state=active]:text-destructive cursor-not-allowed">
                    Sell
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="buy" className="space-y-4 opacity-50">
                  {/* Token Selection */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Token</label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild disabled>
                        <Button variant="outline" className="w-full justify-between bg-transparent cursor-not-allowed">
                          <div className="flex items-center gap-2">
                            <span>{selectedToken.icon}</span>
                            <span>{selectedToken.symbol}</span>
                          </div>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                    </DropdownMenu>
                  </div>

                  {/* Buy Price */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-foreground">Buy Price</label>
                      <span className="text-xs text-muted-foreground">Market: ${marketPrice.toLocaleString()}</span>
                    </div>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0.00"
                      disabled
                      className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted-foreground focus:outline-none cursor-not-allowed"
                    />
                    <div className="flex gap-2 mt-2">
                      {pricePresets.map((preset) => (
                        <button
                          key={preset.label}
                          onClick={() => handlePricePreset(preset.value)}
                          disabled
                          className="flex-1 px-2 py-1 text-xs rounded-md bg-surface text-muted-foreground cursor-not-allowed"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                    {currentPrice > 0 && (
                      <p className={cn(
                        "text-xs mt-2",
                        Number.parseFloat(priceChange) < 0 ? "text-success" : "text-muted-foreground"
                      )}>
                        {Number.parseFloat(priceChange) < 0 ? priceChange : `+${priceChange}`}% from market
                      </p>
                    )}
                  </div>

                  {/* Pay With */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Pay with</label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild disabled>
                        <Button variant="outline" className="w-full justify-between bg-transparent cursor-not-allowed">
                          <span>{payToken.symbol}</span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                    </DropdownMenu>
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Amount</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      disabled
                      className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted-foreground focus:outline-none cursor-not-allowed"
                    />
                    <div className="flex gap-2 mt-2">
                      {["25%", "50%", "75%", "100%"].map((percent) => (
                        <button
                          key={percent}
                          disabled
                          className="flex-1 px-2 py-1 text-xs rounded-md bg-surface text-muted-foreground cursor-not-allowed"
                        >
                          {percent}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Expiry */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Expires in</label>
                    <div className="grid grid-cols-3 gap-2">
                      {expiryOptions.map((option) => (
                        <button
                          key={option.value}
                          disabled
                          className={cn(
                            "px-3 py-2 text-xs font-medium rounded-lg cursor-not-allowed",
                            expiry === option.value
                              ? "bg-primary/20 text-primary border border-primary"
                              : "bg-surface text-muted-foreground border border-border"
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Receive Address */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Receive address</label>
                    <input
                      type="text"
                      value={receiveAddress}
                      disabled
                      className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-foreground text-sm cursor-not-allowed"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-3 rounded-lg bg-secondary/10 border border-secondary/20">
                    <div className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-foreground">
                        Your order will be executed automatically when the market reaches your target price
                      </p>
                    </div>
                  </div>

                  {/* Submit Button - Disabled */}
                  <Button 
                    disabled 
                    className="w-full py-6 bg-success/50 text-success-foreground font-bold cursor-not-allowed"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Coming Soon
                  </Button>
                </TabsContent>

                <TabsContent value="sell" className="space-y-4 opacity-50">
                  {/* Similar structure for Sell - All Disabled */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Token</label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild disabled>
                        <Button variant="outline" className="w-full justify-between bg-transparent cursor-not-allowed">
                          <div className="flex items-center gap-2">
                            <span>{selectedToken.icon}</span>
                            <span>{selectedToken.symbol}</span>
                          </div>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                    </DropdownMenu>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-foreground">Sell Price</label>
                      <span className="text-xs text-muted-foreground">Market: ${marketPrice.toLocaleString()}</span>
                    </div>
                    <input
                      type="number"
                      value={price}
                      placeholder="0.00"
                      disabled
                      className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted-foreground cursor-not-allowed"
                    />
                    <div className="flex gap-2 mt-2">
                      {["+5%", "+10%", "+25%", "+50%"].map((preset) => (
                        <button
                          key={preset}
                          disabled
                          className="flex-1 px-2 py-1 text-xs rounded-md bg-surface text-muted-foreground cursor-not-allowed"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Receive in</label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild disabled>
                        <Button variant="outline" className="w-full justify-between bg-transparent cursor-not-allowed">
                          <span>{receiveToken.symbol}</span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                    </DropdownMenu>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Amount</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      disabled
                      className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted-foreground cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Expires in</label>
                    <div className="grid grid-cols-3 gap-2">
                      {expiryOptions.map((option) => (
                        <button
                          key={option.value}
                          disabled
                          className={cn(
                            "px-3 py-2 text-xs font-medium rounded-lg cursor-not-allowed",
                            expiry === option.value
                              ? "bg-primary/20 text-primary border border-primary"
                              : "bg-surface text-muted-foreground border border-border"
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Receive address</label>
                    <input
                      type="text"
                      value={receiveAddress}
                      disabled
                      className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-foreground text-sm cursor-not-allowed"
                    />
                  </div>

                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <div className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-foreground">
                        Your tokens will be sold automatically when the market reaches your target price
                      </p>
                    </div>
                  </div>

                  <Button 
                    disabled 
                    className="w-full py-6 bg-destructive/50 text-destructive-foreground font-bold cursor-not-allowed"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Coming Soon
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Open Orders Section - Display Only */}
          <div className="mt-8 p-6 rounded-2xl glass-strong border border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">Open Orders</h3>
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">No open orders</p>
              <p className="text-sm text-muted-foreground mt-2">
                Limit orders will appear here once available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Full Chart Modal */}
      <Dialog open={chartModalOpen} onOpenChange={setChartModalOpen}>
        <DialogContent className="glass-strong border-border max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-2xl">{selectedToken.icon}</span>
              {selectedToken.symbol}/USD Chart
            </DialogTitle>
          </DialogHeader>
          <div className="h-96 rounded-xl bg-surface/30 relative overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="none">
              <defs>
                <linearGradient id="fullChartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgb(var(--color-primary))" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="rgb(var(--color-primary))" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 250 Q 50 230, 100 240 T 200 200 T 300 180 T 400 150 T 500 130 T 600 100 T 700 80 T 800 70"
                fill="url(#fullChartGradient)"
                stroke="rgb(var(--color-primary))"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Lock className="h-8 w-8 text-secondary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Full chart available in mainnet</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
