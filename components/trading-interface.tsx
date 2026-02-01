"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ArrowDownUp, ChevronDown, Clock, Zap, Shield, ExternalLink, Settings2, Check, Loader2, X } from "lucide-react"

const tokens = [
  { symbol: "BTC", name: "Bitcoin", icon: "₿", balance: 2.5, price: 65000 },
  { symbol: "ETH", name: "Ethereum", icon: "Ξ", balance: 15.2, price: 2000 },
  { symbol: "STRK", name: "StarkNet", icon: "◈", balance: 5000, price: 1.25 },
  { symbol: "CAREL", name: "ZkCarel", icon: "◇", balance: 245, price: 0.85 },
  { symbol: "USDC", name: "USD Coin", icon: "$", balance: 10000, price: 1.0 },
  { symbol: "USDT", name: "Tether", icon: "₮", balance: 5000, price: 1.0 },
]

interface TokenSelectorProps {
  selectedToken: typeof tokens[0]
  onSelect: (token: typeof tokens[0]) => void
  label: string
  amount: string
  onAmountChange: (value: string) => void
  readOnly?: boolean
}

function TokenSelector({ selectedToken, onSelect, label, amount, onAmountChange, readOnly }: TokenSelectorProps) {
  const usdValue = Number.parseFloat(amount || "0") * selectedToken.price
  
  return (
    <div className="p-4 rounded-xl glass border border-border hover:border-primary/50 transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-xs text-muted-foreground">
          Balance: {selectedToken.balance.toLocaleString()} {selectedToken.symbol}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="gap-2 border-primary/30 hover:border-primary/60 bg-surface/50 text-foreground"
            >
              <span className="text-xl">{selectedToken.icon}</span>
              <span className="font-bold">{selectedToken.symbol}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 glass-strong border-border">
            {tokens.map((token) => (
              <DropdownMenuItem
                key={token.symbol}
                onClick={() => onSelect(token)}
                className={cn(
                  "flex items-center gap-3 cursor-pointer",
                  token.symbol === selectedToken.symbol && "bg-primary/20"
                )}
              >
                <span className="text-lg">{token.icon}</span>
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">{token.symbol}</span>
                  <span className="text-xs text-muted-foreground">{token.name}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex-1 text-right">
          <input
            type="text"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            readOnly={readOnly}
            placeholder="0.0"
            className={cn(
              "w-full bg-transparent text-right text-2xl font-bold text-foreground outline-none placeholder:text-muted-foreground/50",
              readOnly && "cursor-default"
            )}
          />
          <p className="text-sm text-muted-foreground mt-1">
            ≈ ${usdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>
      {!readOnly && (
        <div className="flex gap-2 mt-3">
          {[25, 50, 75, 100].map((pct) => (
            <button
              key={pct}
              onClick={() => onAmountChange(String((selectedToken.balance * pct / 100).toFixed(6)))}
              className="flex-1 py-1 text-xs font-medium text-muted-foreground hover:text-primary border border-border hover:border-primary/50 rounded-md transition-colors"
            >
              {pct}%
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function RouteVisualization({ fromToken, toToken, mode }: { fromToken: string, toToken: string, mode: string }) {
  return (
    <div className="p-4 rounded-xl glass border border-border">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="h-4 w-4 text-secondary" />
        <span className="text-sm font-medium text-foreground">Route Visualization</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 rounded-md bg-primary/20 text-primary font-medium">{fromToken}</span>
          <span className="text-muted-foreground">→</span>
          <span className="text-xs text-muted-foreground">(Swap via AVNU)</span>
          <span className="text-muted-foreground">→</span>
          <span className="px-2 py-1 rounded-md bg-secondary/20 text-secondary font-medium">w{fromToken}</span>
          <span className="text-muted-foreground">→</span>
          <span className="text-xs text-muted-foreground">(Bridge via StarkGate)</span>
          <span className="text-muted-foreground">→</span>
          <span className="px-2 py-1 rounded-md bg-accent/20 text-accent font-medium">{toToken}</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
        <div>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" /> Est. Time
          </p>
          <p className="font-medium text-foreground">~3 min</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Zap className="h-3 w-3" /> Points Earned
          </p>
          <p className="font-medium text-success">+650</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Shield className="h-3 w-3" /> Fee ({mode === "private" ? "0.5%" : "0.3%"})
          </p>
          <p className="font-medium text-foreground">$165.75 <span className="text-success text-xs">-15%</span></p>
        </div>
      </div>
    </div>
  )
}

export function TradingInterface() {
  const { mode, toggleMode } = useTheme()
  const [fromToken, setFromToken] = React.useState(tokens[0])
  const [toToken, setToToken] = React.useState(tokens[1])
  const [fromAmount, setFromAmount] = React.useState("1.0")
  const [toAmount, setToAmount] = React.useState("")
  const [settingsOpen, setSettingsOpen] = React.useState(false)
  const [swapState, setSwapState] = React.useState<"idle" | "confirming" | "processing" | "success" | "error">("idle")
  const [slippage, setSlippage] = React.useState("0.5")
  const [deadline, setDeadline] = React.useState("30")

  React.useEffect(() => {
    if (fromAmount && fromToken && toToken) {
      const fromValue = Number.parseFloat(fromAmount) * fromToken.price
      const toValue = fromValue / toToken.price
      setToAmount(toValue.toFixed(6))
    }
  }, [fromAmount, fromToken, toToken])

  const handleSwapTokens = () => {
    const tempToken = fromToken
    const tempAmount = fromAmount
    setFromToken(toToken)
    setToToken(tempToken)
    setFromAmount(toAmount)
    setToAmount(tempAmount)
  }

  const handleExecuteTrade = async () => {
    if (!fromAmount || Number.parseFloat(fromAmount) === 0) return
    
    setSwapState("confirming")
    
    // Simulate confirmation delay
    await new Promise(r => setTimeout(r, 1000))
    setSwapState("processing")
    
    // Simulate transaction processing
    await new Promise(r => setTimeout(r, 2500))
    
    // Random success/fail for demo (90% success rate)
    if (Math.random() > 0.1) {
      setSwapState("success")
    } else {
      setSwapState("error")
    }
    
    // Reset after showing result
    setTimeout(() => {
      setSwapState("idle")
    }, 3000)
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="p-6 rounded-2xl glass-strong border border-border neon-border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Unified Trade</h2>
          <button 
            onClick={() => setSettingsOpen(true)}
            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
          >
            <Settings2 className="h-4 w-4" />
            Settings
          </button>
        </div>

        <div className="space-y-2">
          <TokenSelector
            selectedToken={fromToken}
            onSelect={setFromToken}
            label="From"
            amount={fromAmount}
            onAmountChange={setFromAmount}
          />

          <div className="flex justify-center -my-2 relative z-10">
            <button
              onClick={handleSwapTokens}
              className="p-2 rounded-full bg-surface border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 group"
            >
              <ArrowDownUp className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          </div>

          <TokenSelector
            selectedToken={toToken}
            onSelect={setToToken}
            label="To"
            amount={toAmount}
            onAmountChange={setToAmount}
            readOnly
          />
        </div>

        {/* Mode Toggle */}
        <div className="mt-6 p-4 rounded-xl bg-surface/30 backdrop-blur-sm border border-border/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Trading Mode</span>
            <span className="text-xs text-muted-foreground">
              Fee: {mode === "private" ? "0.5%" : "0.3%"}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => mode !== "transparent" && toggleMode()}
              className={cn(
                "flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm",
                mode === "transparent"
                  ? "bg-secondary/15 text-secondary border-2 border-secondary/70"
                  : "bg-surface/40 text-muted-foreground border border-border/50 hover:border-secondary/50"
              )}
            >
              <span className={cn(
                "h-2 w-2 rounded-full",
                mode === "transparent" ? "bg-secondary animate-pulse" : "bg-muted-foreground"
              )} />
              Transparent
            </button>
            <button
              onClick={() => mode !== "private" && toggleMode()}
              className={cn(
                "flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm",
                mode === "private"
                  ? "bg-primary/15 text-primary border-2 border-primary/70"
                  : "bg-surface/40 text-muted-foreground border border-border/50 hover:border-primary/50"
              )}
            >
              <Shield className={cn(
                "h-4 w-4",
                mode === "private" && "animate-pulse"
              )} />
              Private
            </button>
          </div>
        </div>

        {/* Route Visualization */}
        <div className="mt-4">
          <RouteVisualization 
            fromToken={fromToken.symbol} 
            toToken={toToken.symbol}
            mode={mode}
          />
        </div>

        {/* Execute Button */}
        <Button 
          onClick={handleExecuteTrade}
          disabled={swapState !== "idle" || !fromAmount || Number.parseFloat(fromAmount) === 0}
          className={cn(
            "w-full mt-6 py-6 text-lg font-bold transition-all text-primary-foreground",
            swapState === "idle" && "bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient hover:opacity-90",
            swapState === "confirming" && "bg-primary/80",
            swapState === "processing" && "bg-secondary/80",
            swapState === "success" && "bg-success",
            swapState === "error" && "bg-destructive"
          )}
        >
          {swapState === "idle" && "Execute Trade"}
          {swapState === "confirming" && (
            <span className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Confirming...
            </span>
          )}
          {swapState === "processing" && (
            <span className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Processing Swap...
            </span>
          )}
          {swapState === "success" && (
            <span className="flex items-center gap-2">
              <Check className="h-5 w-5" />
              Swap Successful!
            </span>
          )}
          {swapState === "error" && (
            <span className="flex items-center gap-2">
              <X className="h-5 w-5" />
              Transaction Failed
            </span>
          )}
        </Button>

        <p className="text-center text-xs text-muted-foreground mt-4">
          By trading, you agree to our Terms of Service
        </p>
      </div>

      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="glass-strong border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground">Trade Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Slippage Tolerance */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">Slippage Tolerance</label>
              <div className="flex gap-2">
                {["0.1", "0.5", "1.0"].map((val) => (
                  <button
                    key={val}
                    onClick={() => setSlippage(val)}
                    className={cn(
                      "flex-1 py-2 rounded-lg text-sm font-medium transition-all",
                      slippage === val
                        ? "bg-primary/20 text-primary border border-primary"
                        : "bg-surface text-muted-foreground border border-border hover:border-primary/50"
                    )}
                  >
                    {val}%
                  </button>
                ))}
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={slippage}
                    onChange={(e) => setSlippage(e.target.value)}
                    className="w-full py-2 px-3 rounded-lg text-sm font-medium bg-surface text-foreground border border-border focus:border-primary outline-none text-center"
                    placeholder="Custom"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span>
                </div>
              </div>
            </div>
            
            {/* Transaction Deadline */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">Transaction Deadline</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="flex-1 py-2 px-3 rounded-lg text-sm font-medium bg-surface text-foreground border border-border focus:border-primary outline-none"
                />
                <span className="text-muted-foreground text-sm">minutes</span>
              </div>
            </div>

            {/* Expert Mode Toggle */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-surface/50 border border-border">
              <div>
                <p className="text-sm font-medium text-foreground">Expert Mode</p>
                <p className="text-xs text-muted-foreground">Bypass confirmation modals</p>
              </div>
              <button className="w-12 h-6 rounded-full bg-surface border border-border relative transition-colors">
                <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-muted-foreground transition-transform" />
              </button>
            </div>
          </div>
          <Button onClick={() => setSettingsOpen(false)} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Save Settings
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
