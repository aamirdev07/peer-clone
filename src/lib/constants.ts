export const TOKENS = [
  { symbol: "USDC", name: "USD Coin", color: "#2775CA" },
  { symbol: "ETH", name: "Ethereum", color: "#627EEA" },
  { symbol: "SOL", name: "Solana", color: "#14F195" },
  { symbol: "USDT", name: "Tether", color: "#26A17B" },
  { symbol: "WBTC", name: "Wrapped Bitcoin", color: "#F7931A" },
];

export const CURRENCIES = [
  { code: "USD", flag: "🇺🇸", name: "US Dollar", symbol: "$" },
  { code: "EUR", flag: "🇪🇺", name: "Euro", symbol: "€" },
  { code: "GBP", flag: "🇬🇧", name: "British Pound", symbol: "£" },
  { code: "ARS", flag: "🇦🇷", name: "Argentine Peso", symbol: "$" },
  { code: "BRL", flag: "🇧🇷", name: "Brazilian Real", symbol: "R$" },
  { code: "INR", flag: "🇮🇳", name: "Indian Rupee", symbol: "₹" },
  { code: "MXN", flag: "🇲🇽", name: "Mexican Peso", symbol: "$" },
  { code: "NGN", flag: "🇳🇬", name: "Nigerian Naira", symbol: "₦" },
  { code: "TRY", flag: "🇹🇷", name: "Turkish Lira", symbol: "₺" },
];

export const PAYMENT_METHODS = [
  { id: "venmo", name: "Venmo", letter: "V", color: "#3D95CE", currencies: ["USD"] },
  { id: "paypal", name: "PayPal", letter: "P", color: "#003087", currencies: ["USD", "EUR", "GBP"] },
  { id: "revolut", name: "Revolut", letter: "R", color: "#0075EB", currencies: ["USD", "EUR", "GBP"] },
  { id: "cashapp", name: "Cash App", letter: "C", color: "#00D64B", currencies: ["USD"] },
  { id: "wise", name: "Wise", letter: "W", color: "#9FE870", currencies: ["USD", "EUR", "GBP", "INR", "BRL"] },
  { id: "zelle", name: "Zelle", letter: "Z", color: "#6D1ED4", currencies: ["USD"] },
  { id: "mercadopago", name: "Mercado Pago", letter: "M", color: "#009EE3", currencies: ["ARS"] },
  { id: "monzo", name: "Monzo", letter: "Mo", color: "#FF4B67", currencies: ["GBP"] },
];

export const CHAINS = [
  { name: "Base", color: "#0052FF" },
  { name: "Arbitrum", color: "#28A0F0" },
  { name: "HyperCore", color: "#00FF88" },
  { name: "HyperEVM", color: "#00CC6A" },
  { name: "Mainnet", color: "#627EEA" },
  { name: "Plasma", color: "#8247E5" },
  { name: "Solana", color: "#14F195" },
];

export interface LiquidityRow {
  price: number;
  spread: number;
  amount: number;
  total: number;
  apr: number | null;
  providers: string[];
}

export const LIQUIDITY_DATA: LiquidityRow[] = [
  { price: 0.985, spread: -1.5, amount: 350, total: 350, apr: null, providers: ["paypal"] },
  { price: 0.992, spread: -0.8, amount: 1200, total: 1550, apr: 12.4, providers: ["venmo"] },
  { price: 0.995, spread: -0.5, amount: 800, total: 2350, apr: 8.7, providers: ["revolut"] },
  { price: 0.998, spread: -0.2, amount: 2500, total: 4850, apr: 15.2, providers: ["venmo", "revolut"] },
  { price: 1.0, spread: 0, amount: 1800, total: 6650, apr: 6.3, providers: ["zelle"] },
  { price: 1.002, spread: 0.2, amount: 3200, total: 9850, apr: 18.1, providers: ["venmo", "cashapp"] },
  { price: 1.005, spread: 0.5, amount: 950, total: 10800, apr: 4.2, providers: ["wise"] },
  { price: 1.008, spread: 0.8, amount: 1500, total: 12300, apr: 9.8, providers: ["paypal", "mercadopago"] },
  { price: 1.01, spread: 1.0, amount: 600, total: 12900, apr: 3.1, providers: ["revolut"] },
  { price: 1.015, spread: 1.5, amount: 400, total: 13300, apr: 2.4, providers: ["venmo"] },
  { price: 1.018, spread: 1.8, amount: 750, total: 14050, apr: 5.6, providers: ["wise", "revolut"] },
  { price: 1.022, spread: 2.2, amount: 280, total: 14330, apr: 1.9, providers: ["monzo"] },
];

export interface LeaderboardRow {
  address: string;
  activeDeposits: number;
  totalDeposits: number;
  filledVolume: number;
  realizedProfit: number;
  profitPct: number;
  grossDeposited: number;
}

export const LEADERBOARD_DATA: LeaderboardRow[] = [
  { address: "0x76bb...ae30", activeDeposits: 3, totalDeposits: 90, filledVolume: 1072110.19, realizedProfit: 14508.05, profitPct: 1.35, grossDeposited: 1659740.98 },
  { address: "0xdd8e...fe93", activeDeposits: 1, totalDeposits: 73, filledVolume: 566920.12, realizedProfit: 13386.53, profitPct: 2.36, grossDeposited: 987367.3 },
  { address: "0x1a4c...be8d", activeDeposits: 5, totalDeposits: 176, filledVolume: 719768.82, realizedProfit: 8535.71, profitPct: 1.19, grossDeposited: 842721.7 },
  { address: "0xfb74...d6ef", activeDeposits: 2, totalDeposits: 45, filledVolume: 973191.37, realizedProfit: 7096.44, profitPct: 0.73, grossDeposited: 1367876.07 },
  { address: "0x3a91...c2f8", activeDeposits: 4, totalDeposits: 112, filledVolume: 445623.89, realizedProfit: 6234.12, profitPct: 1.4, grossDeposited: 623451.23 },
  { address: "0x8d2e...7a1b", activeDeposits: 1, totalDeposits: 34, filledVolume: 312445.67, realizedProfit: 4891.33, profitPct: 1.57, grossDeposited: 478234.56 },
  { address: "0xc5f1...3e9d", activeDeposits: 3, totalDeposits: 67, filledVolume: 287334.21, realizedProfit: 3456.78, profitPct: 1.2, grossDeposited: 389112.45 },
  { address: "0x2b8a...f4c6", activeDeposits: 2, totalDeposits: 28, filledVolume: 198776.54, realizedProfit: 2987.65, profitPct: 1.5, grossDeposited: 267891.23 },
  { address: "0xe7d3...1b5a", activeDeposits: 1, totalDeposits: 19, filledVolume: 156234.89, realizedProfit: 2145.34, profitPct: 1.37, grossDeposited: 201567.89 },
  { address: "0x9f4c...8d2e", activeDeposits: 1, totalDeposits: 11, filledVolume: 123456.78, realizedProfit: 1234.56, profitPct: 1.0, grossDeposited: 156789.01 },
  { address: "0x4e7b...2c1a", activeDeposits: 2, totalDeposits: 43, filledVolume: 98234.56, realizedProfit: 987.23, profitPct: 1.01, grossDeposited: 134567.89 },
  { address: "0xb3d9...5f8e", activeDeposits: 1, totalDeposits: 8, filledVolume: 67891.23, realizedProfit: 543.21, profitPct: 0.8, grossDeposited: 89012.34 },
];

export const LIQUIDITY_CHART_DATA = [
  { month: "Jan 25", value: 45000 },
  { month: "Feb 25", value: 62000 },
  { month: "Mar 25", value: 78000 },
  { month: "Apr 25", value: 95000 },
  { month: "May 25", value: 110000 },
  { month: "Jun 25", value: 128000 },
  { month: "Jul 25", value: 155000 },
  { month: "Aug 25", value: 175000 },
  { month: "Sep 25", value: 198000 },
  { month: "Oct 25", value: 220000 },
  { month: "Nov 25", value: 245000 },
  { month: "Dec 25", value: 260000 },
  { month: "Jan 26", value: 285000 },
  { month: "Feb 26", value: 270000 },
  { month: "Mar 26", value: 295000 },
];

export const VOLUME_CHART_DATA = [
  { month: "Jan 25", venmo: 120000, paypal: 45000, revolut: 30000, cashapp: 25000, wise: 15000, zelle: 35000, mercadopago: 10000, monzo: 8000, other: 12000 },
  { month: "Feb 25", venmo: 135000, paypal: 52000, revolut: 38000, cashapp: 28000, wise: 18000, zelle: 40000, mercadopago: 12000, monzo: 9000, other: 15000 },
  { month: "Mar 25", venmo: 180000, paypal: 65000, revolut: 48000, cashapp: 35000, wise: 22000, zelle: 55000, mercadopago: 15000, monzo: 12000, other: 18000 },
  { month: "Apr 25", venmo: 210000, paypal: 78000, revolut: 55000, cashapp: 42000, wise: 28000, zelle: 62000, mercadopago: 18000, monzo: 14000, other: 22000 },
  { month: "May 25", venmo: 195000, paypal: 70000, revolut: 50000, cashapp: 38000, wise: 25000, zelle: 58000, mercadopago: 16000, monzo: 11000, other: 20000 },
  { month: "Jun 25", venmo: 250000, paypal: 88000, revolut: 62000, cashapp: 48000, wise: 32000, zelle: 72000, mercadopago: 22000, monzo: 16000, other: 25000 },
  { month: "Jul 25", venmo: 280000, paypal: 95000, revolut: 70000, cashapp: 55000, wise: 38000, zelle: 80000, mercadopago: 25000, monzo: 18000, other: 28000 },
  { month: "Aug 25", venmo: 260000, paypal: 85000, revolut: 65000, cashapp: 50000, wise: 35000, zelle: 75000, mercadopago: 20000, monzo: 15000, other: 24000 },
  { month: "Sep 25", venmo: 300000, paypal: 102000, revolut: 75000, cashapp: 58000, wise: 40000, zelle: 85000, mercadopago: 28000, monzo: 20000, other: 30000 },
  { month: "Oct 25", venmo: 320000, paypal: 110000, revolut: 82000, cashapp: 62000, wise: 45000, zelle: 92000, mercadopago: 30000, monzo: 22000, other: 32000 },
  { month: "Nov 25", venmo: 290000, paypal: 98000, revolut: 72000, cashapp: 55000, wise: 38000, zelle: 82000, mercadopago: 24000, monzo: 17000, other: 27000 },
  { month: "Dec 25", venmo: 340000, paypal: 115000, revolut: 88000, cashapp: 65000, wise: 48000, zelle: 98000, mercadopago: 32000, monzo: 24000, other: 35000 },
];

export const VOLUME_PLATFORMS = [
  { key: "venmo", label: "Venmo", color: "#3D95CE" },
  { key: "paypal", label: "PayPal", color: "#003087" },
  { key: "revolut", label: "Revolut", color: "#0075EB" },
  { key: "cashapp", label: "Cash App", color: "#00D64B" },
  { key: "wise", label: "Wise", color: "#9FE870" },
  { key: "zelle", label: "Zelle", color: "#6D1ED4" },
  { key: "mercadopago", label: "Mercado Pago", color: "#009EE3" },
  { key: "monzo", label: "Monzo", color: "#FF4B67" },
  { key: "other", label: "Other", color: "#4A4A64" },
];

export interface DepositRow {
  id: string;
  status: "active" | "paused" | "closed";
  amount: number;
  remaining: number;
  platforms: string[];
  spread: number;
}

export const DEPOSITS_DATA: DepositRow[] = [
  { id: "dep-001", status: "active", amount: 2500, remaining: 1820, platforms: ["venmo", "revolut"], spread: 1.2 },
  { id: "dep-002", status: "active", amount: 1000, remaining: 1000, platforms: ["cashapp"], spread: 0.8 },
  { id: "dep-003", status: "active", amount: 750, remaining: 430, platforms: ["paypal", "wise"], spread: 1.0 },
  { id: "dep-004", status: "paused", amount: 500, remaining: 500, platforms: ["zelle"], spread: 1.5 },
  { id: "dep-005", status: "active", amount: 3000, remaining: 2100, platforms: ["venmo"], spread: 0.5 },
  { id: "dep-006", status: "active", amount: 1200, remaining: 680, platforms: ["revolut", "monzo"], spread: 1.8 },
  { id: "dep-007", status: "paused", amount: 400, remaining: 400, platforms: ["mercadopago"], spread: 2.0 },
  { id: "dep-008", status: "active", amount: 800, remaining: 150, platforms: ["wise", "paypal"], spread: 0.6 },
];

export const LEADERBOARD_STATS = {
  uniqueMakers: 1366,
  totalGrossDeposited: 22055468.79,
  totalRealizedProfit: 159410.39,
  totalFilledVolume: 14074895.53,
};
