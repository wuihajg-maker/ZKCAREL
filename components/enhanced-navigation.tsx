"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"
import { useWallet, type WalletProvider } from "@/hooks/use-wallet"
import { useNotifications } from "@/hooks/use-notifications"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { 
  Shield, Wallet, Bell, User, Menu, X, ArrowRightLeft, PieChart, Trophy, Gift, Bot, 
  History, Users, Settings, Droplets, CreditCard, ChevronDown, HelpCircle, Zap,
  Copy, Check, ExternalLink, TrendingUp, Coins, DollarSign, QrCode, Building2,
  Smartphone, ChevronRight, Clock, XCircle, CheckCircle, Loader2
} from "lucide-react"

const walletProviders: { id: WalletProvider; name: string; icon: string }[] = [
  { id: 'metamask', name: 'MetaMask', icon: '🦊' },
  { id: 'okx', name: 'OKX Wallet', icon: '⭕' },
  { id: 'walletconnect', name: 'WalletConnect', icon: '🔗' },
  { id: 'coinbase', name: 'Coinbase Wallet', icon: '💙' },
  { id: 'trust', name: 'Trust Wallet', icon: '🛡️' },
]

const faucetTokens = [
  { symbol: "BTC", name: "Bitcoin", amount: "0.001" },
  { symbol: "ETH", name: "Ethereum", amount: "0.01" },
  { symbol: "STRK", name: "StarkNet", amount: "10" },
  { symbol: "CAREL", name: "ZkCarel", amount: "100" },
]

export function EnhancedNavigation() {
  const { mode, toggleMode } = useTheme()
  const wallet = useWallet()
  const notifications = useNotifications()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [walletDialogOpen, setWalletDialogOpen] = React.useState(false)
  const [notificationsOpen, setNotificationsOpen] = React.useState(false)
  const [txHistoryOpen, setTxHistoryOpen] = React.useState(false)
  const [helpOpen, setHelpOpen] = React.useState(false)
  const [claimedFaucet, setClaimedFaucet] = React.useState<string[]>([])
  const [copiedAddress, setCopiedAddress] = React.useState(false)

  const handleWalletConnect = async (provider: WalletProvider) => {
    await wallet.connect(provider)
    setWalletDialogOpen(false)
  }

  const handleClaimFaucet = (symbol: string, amount: string) => {
    if (claimedFaucet.includes(symbol)) return
    setClaimedFaucet([...claimedFaucet, symbol])
    
    notifications.addNotification({
      type: 'success',
      title: 'Faucet Claimed',
      message: `Successfully claimed ${amount} ${symbol}`,
    })

    if (symbol === "CAREL") {
      wallet.updateBalance("CAREL", wallet.balance.CAREL + Number.parseFloat(amount))
    }
  }

  const copyAddress = () => {
    if (wallet.address) {
      navigator.clipboard.writeText(wallet.address)
      setCopiedAddress(true)
      setTimeout(() => setCopiedAddress(false), 2000)
    }
  }

  const txHistory = [
    { id: '1', type: 'swap', status: 'completed', from: 'ETH', to: 'CAREL', amount: '1.0', value: '$2,450', time: '2 hours ago' },
    { id: '2', type: 'bridge', status: 'pending', from: 'BTC', to: 'wBTC', amount: '0.1', value: '$6,500', time: '5 hours ago' },
    { id: '3', type: 'stake', status: 'completed', from: 'USDT', to: 'sUSDT', amount: '1000', value: '$1,000', time: '1 day ago' },
    { id: '4', type: 'swap', status: 'failed', from: 'STRK', to: 'ETH', amount: '500', value: '$250', time: '2 days ago' },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 glass-strong">
        <div className="container flex h-16 items-center justify-between px-4 mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Shield className="h-8 w-8 text-primary animate-pulse-glow" />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-primary-foreground">
                Z
              </span>
            </div>
            <span className="font-sans text-xl font-bold tracking-wider text-foreground group-hover:text-primary transition-colors">
              ZkCarel
            </span>
          </Link>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Faucet */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1.5 text-success hover:bg-success/10">
                  <Droplets className="h-4 w-4" />
                  Faucet
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60 glass-strong border-border">
                <DropdownMenuLabel>
                  <div>
                    <p className="text-sm font-medium text-foreground">Testnet Faucet</p>
                    <p className="text-xs text-muted-foreground">Claim free testnet tokens</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {faucetTokens.map((token) => (
                  <DropdownMenuItem 
                    key={token.symbol}
                    className={cn(
                      "flex items-center justify-between cursor-pointer py-3",
                      claimedFaucet.includes(token.symbol) && "opacity-50"
                    )}
                    onClick={() => handleClaimFaucet(token.symbol, token.amount)}
                    disabled={claimedFaucet.includes(token.symbol)}
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{token.symbol}</p>
                      <p className="text-xs text-muted-foreground">{token.name}</p>
                    </div>
                    <span className={cn(
                      "text-xs font-medium px-2 py-1 rounded",
                      claimedFaucet.includes(token.symbol) 
                        ? "bg-muted text-muted-foreground" 
                        : "bg-success/20 text-success"
                    )}>
                      {claimedFaucet.includes(token.symbol) ? "Claimed" : `+${token.amount}`}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Network Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  Testnet
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 glass-strong border-border">
                <DropdownMenuItem className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-success" />
                    <span>Testnet</span>
                  </div>
                  <Check className="h-4 w-4 text-success" />
                </DropdownMenuItem>
                <DropdownMenuItem disabled className="flex items-center justify-between opacity-50">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-muted-foreground" />
                    <span>Mainnet</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Soon</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Connect Wallet / Wallet Info */}
            {wallet.isConnected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 border-primary/50 hover:bg-primary/10 bg-transparent">
                    <Wallet className="h-4 w-4 text-primary" />
                    <span className="font-mono text-xs">{wallet.address}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 glass-strong border-border">
                  <div className="p-3 space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Wallet Address</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="font-mono text-sm text-foreground">{wallet.address}</p>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={copyAddress}
                        >
                          {copiedAddress ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
                        </Button>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <div>
                      <p className="text-xs text-muted-foreground">Total Balance</p>
                      <p className="text-2xl font-bold text-foreground">${wallet.totalValueUSD.toLocaleString()}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 rounded-lg bg-surface/50">
                        <p className="text-xs text-muted-foreground">BTC</p>
                        <p className="text-sm font-medium">{wallet.balance.BTC}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-surface/50">
                        <p className="text-xs text-muted-foreground">ETH</p>
                        <p className="text-sm font-medium">{wallet.balance.ETH}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-surface/50">
                        <p className="text-xs text-muted-foreground">STRK</p>
                        <p className="text-sm font-medium">{wallet.balance.STRK}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-surface/50">
                        <p className="text-xs text-muted-foreground">CAREL</p>
                        <p className="text-sm font-medium">{wallet.balance.CAREL}</p>
                      </div>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive cursor-pointer" onClick={wallet.disconnect}>
                    Disconnect Wallet
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={() => setWalletDialogOpen(true)}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground animate-pulse-glow"
              >
                <Wallet className="h-4 w-4 mr-2" />
                Connect Wallet
              </Button>
            )}

            {/* Notifications */}
            <DropdownMenu open={notificationsOpen} onOpenChange={setNotificationsOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notifications.unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-[10px] font-bold flex items-center justify-center text-accent-foreground animate-pulse">
                      {notifications.unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 glass-strong border-border p-0">
                <div className="p-3 border-b border-border flex items-center justify-between">
                  <h3 className="font-medium text-foreground">Notifications</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 text-xs"
                    onClick={notifications.markAllAsRead}
                  >
                    Mark all read
                  </Button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.notifications.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                      <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No notifications</p>
                    </div>
                  ) : (
                    notifications.notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={cn(
                          "p-3 border-b border-border/50 hover:bg-surface/50 cursor-pointer transition-colors",
                          !notif.read && "bg-primary/5"
                        )}
                        onClick={() => notifications.markAsRead(notif.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                            notif.type === 'success' && "bg-success/20",
                            notif.type === 'error' && "bg-destructive/20",
                            notif.type === 'info' && "bg-secondary/20",
                            notif.type === 'warning' && "bg-accent/20"
                          )}>
                            {notif.type === 'success' && <CheckCircle className="h-4 w-4 text-success" />}
                            {notif.type === 'error' && <XCircle className="h-4 w-4 text-destructive" />}
                            {notif.type === 'info' && <Bell className="h-4 w-4 text-secondary" />}
                            {notif.type === 'warning' && <Zap className="h-4 w-4 text-accent" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{notif.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notif.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notif.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                          {!notif.read && (
                            <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile / Airdrop */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 glass-strong border-border">
                <DropdownMenuLabel>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Profile</p>
                      {wallet.isConnected && (
                        <p className="text-xs text-muted-foreground font-mono">{wallet.address?.slice(0, 8)}...</p>
                      )}
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="#portfolio" className="flex items-center gap-2">
                    <PieChart className="h-4 w-4" />
                    Portfolio
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="#leaderboard" className="flex items-center gap-2">
                    <Trophy className="h-4 w-4" />
                    Leaderboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="#rewards" className="flex items-center gap-2">
                    <Gift className="h-4 w-4" />
                    Rewards
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="#airdrop" className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-accent" />
                    <span>Airdrop</span>
                    <span className="ml-auto text-xs bg-accent/20 text-accent px-1.5 py-0.5 rounded">New</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="#settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* More Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 glass-strong border-border">
                <DropdownMenuLabel>DeFi</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link href="#trade" className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ArrowRightLeft className="h-4 w-4" />
                      Swap & Bridge
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="#limit-order" className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Limit Order
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="#stake" className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Coins className="h-4 w-4" />
                      Stake & Earn
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Top Up</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link href="#receive" className="flex items-center gap-2">
                    <QrCode className="h-4 w-4" />
                    Receive Crypto
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="#topup-local" className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    Local Currency
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="#topup-cex" className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Top Up CEX
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="#p2p" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    P2P
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setHelpOpen(true)}>
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Help Center
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTxHistoryOpen(true)}>
                  <History className="h-4 w-4 mr-2" />
                  Transaction History
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mode Toggle */}
            <button
              onClick={toggleMode}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                mode === "private"
                  ? "bg-primary/20 text-primary border border-primary/50"
                  : "bg-secondary/20 text-secondary border border-secondary/50"
              )}
            >
              <span className={cn(
                "h-2 w-2 rounded-full",
                mode === "private" ? "bg-primary" : "bg-secondary"
              )} />
              {mode === "private" ? "Private" : "Transparent"}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border glass-strong p-4">
            <div className="space-y-2">
              {!wallet.isConnected && (
                <Button 
                  onClick={() => {
                    setWalletDialogOpen(true)
                    setMobileMenuOpen(false)
                  }}
                  className="w-full bg-gradient-to-r from-primary to-accent"
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect Wallet
                </Button>
              )}
              <Link href="#trade" className="block px-4 py-3 rounded-lg hover:bg-surface transition-colors">
                <div className="flex items-center gap-2">
                  <ArrowRightLeft className="h-5 w-5 text-primary" />
                  <span className="font-medium">Swap & Bridge</span>
                </div>
              </Link>
              <Link href="#portfolio" className="block px-4 py-3 rounded-lg hover:bg-surface transition-colors">
                <div className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  <span className="font-medium">Portfolio</span>
                </div>
              </Link>
              <Link href="#leaderboard" className="block px-4 py-3 rounded-lg hover:bg-surface transition-colors">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  <span className="font-medium">Leaderboard</span>
                </div>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Wallet Connection Dialog */}
      <Dialog open={walletDialogOpen} onOpenChange={setWalletDialogOpen}>
        <DialogContent className="glass-strong border-border">
          <DialogHeader>
            <DialogTitle>Connect Wallet</DialogTitle>
            <DialogDescription>Choose your preferred wallet to connect</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-4">
            {walletProviders.map((provider) => (
              <button
                key={provider.id}
                onClick={() => handleWalletConnect(provider.id)}
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                <span className="text-2xl">{provider.icon}</span>
                <span className="font-medium text-foreground">{provider.name}</span>
                <ChevronRight className="h-5 w-5 ml-auto text-muted-foreground" />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Transaction History Dialog */}
      <Dialog open={txHistoryOpen} onOpenChange={setTxHistoryOpen}>
        <DialogContent className="glass-strong border-border max-w-2xl">
          <DialogHeader>
            <DialogTitle>Transaction History</DialogTitle>
            <DialogDescription>View all your recent transactions</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {txHistory.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-surface/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    tx.status === 'completed' && "bg-success/20",
                    tx.status === 'pending' && "bg-secondary/20",
                    tx.status === 'failed' && "bg-destructive/20"
                  )}>
                    {tx.status === 'completed' && <CheckCircle className="h-5 w-5 text-success" />}
                    {tx.status === 'pending' && <Loader2 className="h-5 w-5 text-secondary animate-spin" />}
                    {tx.status === 'failed' && <XCircle className="h-5 w-5 text-destructive" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium capitalize">{tx.type} {tx.from} → {tx.to}</p>
                    <p className="text-xs text-muted-foreground">{tx.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{tx.value}</p>
                  <p className="text-xs text-muted-foreground">{tx.amount} {tx.from}</p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Help Center Dialog */}
      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent className="glass-strong border-border max-w-2xl">
          <DialogHeader>
            <DialogTitle>Help Center</DialogTitle>
            <DialogDescription>Get help with ZkCarel platform</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Link href="#tutorial-wallet" className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-surface/50 transition-all">
              <h4 className="font-medium text-foreground mb-1">Connect Wallet Tutorial</h4>
              <p className="text-sm text-muted-foreground">Learn how to connect various wallets</p>
            </Link>
            <Link href="#tutorial-swap" className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-surface/50 transition-all">
              <h4 className="font-medium text-foreground mb-1">First Swap Guide</h4>
              <p className="text-sm text-muted-foreground">Complete your first token swap</p>
            </Link>
            <Link href="#tutorial-points" className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-surface/50 transition-all">
              <h4 className="font-medium text-foreground mb-1">Points & Tier System</h4>
              <p className="text-sm text-muted-foreground">Understand the royalty hub</p>
            </Link>
            <Link href="#tutorial-referral" className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-surface/50 transition-all">
              <h4 className="font-medium text-foreground mb-1">Referral Program</h4>
              <p className="text-sm text-muted-foreground">Invite friends and earn rewards</p>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
