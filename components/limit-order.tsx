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
import { ChevronDown, TrendingUp, TrendingDown, Clock, Info } from "lucide-react"

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
  const [receiveAddress, setReceiveAddress] = React.useState("0x8f...4e2d (Your Wallet)")

  const handlePricePreset = (percentage: number) => {
    const marketPrice = selectedToken.price
    const newPrice = marketPrice * (1 + percentage / 100)
    setPrice(newPrice.toFixed(2))
  }

  const marketPrice = selectedToken.price
  const currentPrice = Number.parseFloat(price) || 0
  const priceChange = marketPrice ? ((currentPrice - marketPrice) / marketPrice * 100).toFixed(2) : "0"

  return (
    <section id="limit-order" className="py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Limit Order</h2>
          <p className="text-muted-foreground">Set your price and execute trades automatically</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <div className="lg:col-span-2 p-6 rounded-2xl glass-strong border border-border">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2 bg-transparent">
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

              <div className="flex gap-2">
                {["1H", "24H", "7D", "30D"].map((period) => (
                  <button
                    key={period}
                    className={cn(
                      "px-3 py-1 text-xs font-medium rounded-md transition-colors",
                      period === "24H"
                        ? "bg-primary/20 text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            {/* Simplified Chart Visualization */}
            <div className="h-64 rounded-xl bg-surface/30 relative overflow-hidden">
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

          {/* Order Form */}
          <div className="p-6 rounded-2xl glass-strong border border-border">
            <Tabs value={orderType} onValueChange={(value) => setOrderType(value as "buy" | "sell")}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="buy" className="data-[state=active]:bg-success/20 data-[state=active]:text-success">
                  Buy
                </TabsTrigger>
                <TabsTrigger value="sell" className="data-[state=active]:bg-destructive/20 data-[state=active]:text-destructive">
                  Sell
                </TabsTrigger>
              </TabsList>

              <TabsContent value="buy" className="space-y-4">
                {/* Token Selection */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Token</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between bg-transparent">
                        <div className="flex items-center gap-2">
                          <span>{selectedToken.icon}</span>
                          <span>{selectedToken.symbol}</span>
                        </div>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full glass-strong border-border">
                      {tokens.map((token) => (
                        <DropdownMenuItem key={token.symbol} onClick={() => setSelectedToken(token)}>
                          <span className="mr-2">{token.icon}</span>
                          {token.symbol}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
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
                    className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                  />
                  <div className="flex gap-2 mt-2">
                    {pricePresets.map((preset) => (
                      <button
                        key={preset.label}
                        onClick={() => handlePricePreset(preset.value)}
                        className="flex-1 px-2 py-1 text-xs rounded-md bg-surface hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
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
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between bg-transparent">
                        <span>{payToken.symbol}</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full glass-strong border-border">
                      {tokens.map((token) => (
                        <DropdownMenuItem key={token.symbol} onClick={() => setPayToken(token)}>
                          {token.symbol}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
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
                    className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                  />
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

                {/* Expiry */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Expires in</label>
                  <div className="grid grid-cols-3 gap-2">
                    {expiryOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setExpiry(option.value)}
                        className={cn(
                          "px-3 py-2 text-xs font-medium rounded-lg transition-all",
                          expiry === option.value
                            ? "bg-primary/20 text-primary border border-primary"
                            : "bg-surface text-muted-foreground border border-border hover:border-primary/50"
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
                    onChange={(e) => setReceiveAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-foreground text-sm focus:outline-none focus:border-primary"
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

                {/* Submit Button */}
                <Button className="w-full py-6 bg-success hover:bg-success/90 text-success-foreground font-bold">
                  Place Buy Order
                </Button>
              </TabsContent>

              <TabsContent value="sell" className="space-y-4">
                {/* Similar structure for Sell */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Token</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between bg-transparent">
                        <div className="flex items-center gap-2">
                          <span>{selectedToken.icon}</span>
                          <span>{selectedToken.symbol}</span>
                        </div>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full glass-strong border-border">
                      {tokens.map((token) => (
                        <DropdownMenuItem key={token.symbol} onClick={() => setSelectedToken(token)}>
                          <span className="mr-2">{token.icon}</span>
                          {token.symbol}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
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
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                  />
                  <div className="flex gap-2 mt-2">
                    {["+5%", "+10%", "+25%", "+50%"].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => handlePricePreset(Number.parseInt(preset.replace('%', '')))}
                        className="flex-1 px-2 py-1 text-xs rounded-md bg-surface hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Receive in</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between bg-transparent">
                        <span>{receiveToken.symbol}</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full glass-strong border-border">
                      {tokens.map((token) => (
                        <DropdownMenuItem key={token.symbol} onClick={() => setReceiveToken(token)}>
                          {token.symbol}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Amount</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Expires in</label>
                  <div className="grid grid-cols-3 gap-2">
                    {expiryOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setExpiry(option.value)}
                        className={cn(
                          "px-3 py-2 text-xs font-medium rounded-lg transition-all",
                          expiry === option.value
                            ? "bg-primary/20 text-primary border border-primary"
                            : "bg-surface text-muted-foreground border border-border hover:border-primary/50"
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
                    onChange={(e) => setReceiveAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-foreground text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-foreground">
                      Your tokens will be sold when the market reaches your target price
                    </p>
                  </div>
                </div>

                <Button className="w-full py-6 bg-destructive hover:bg-destructive/90 text-destructive-foreground font-bold">
                  Place Sell Order
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Active Orders */}
        <div className="mt-8 p-6 rounded-2xl glass-strong border border-border">
          <h3 className="text-lg font-bold text-foreground mb-4">Active Orders</h3>
          <div className="space-y-3">
            {[
              { type: "buy", token: "BTC", amount: "0.1", price: "$62,000", expiry: "2h 15m", status: "active" },
              { type: "sell", token: "ETH", amount: "2.5", price: "$2,600", expiry: "1d 5h", status: "active" },
            ].map((order, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-surface/50 border border-border">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    order.type === "buy" ? "bg-success/20" : "bg-destructive/20"
                  )}>
                    {order.type === "buy" ? (
                      <TrendingUp className={cn("h-5 w-5", "text-success")} />
                    ) : (
                      <TrendingDown className={cn("h-5 w-5", "text-destructive")} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground capitalize">{order.type} {order.token}</p>
                    <p className="text-sm text-muted-foreground">{order.amount} at {order.price}</p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                      <Clock className="h-3 w-3" />
                      <span>{order.expiry}</span>
                    </div>
                    <span className="text-xs px-2 py-1 rounded bg-secondary/20 text-secondary">Active</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
                    Cancel
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
