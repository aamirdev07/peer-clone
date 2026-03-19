export const TOKENS = [
  { symbol: "USDC", name: "USD Coin", color: "#2775CA", usdPrice: 1.0, logo: "https://coin-images.coingecko.com/coins/images/6319/large/usdc.png" },
  { symbol: "ETH", name: "Ethereum", color: "#627EEA", usdPrice: 3245.67, logo: "https://assets.relay.link/icons/1/light.png" },
  { symbol: "SOL", name: "Solana", color: "#14F195", usdPrice: 142.38, logo: "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png" },
  { symbol: "USDT", name: "Tether", color: "#26A17B", usdPrice: 1.0, logo: "https://coin-images.coingecko.com/coins/images/39963/large/usdt.png" },
  { symbol: "WBTC", name: "Wrapped Bitcoin", color: "#F7931A", usdPrice: 87432.15, logo: "https://assets.relay.link/icons/currencies/btc.png" },
];

export const CURRENCIES = [
  { code: "USD", flag: "🇺🇸", name: "US Dollar", symbol: "$", usdRate: 1.0 },
  { code: "EUR", flag: "🇪🇺", name: "Euro", symbol: "€", usdRate: 0.92 },
  { code: "GBP", flag: "🇬🇧", name: "British Pound", symbol: "£", usdRate: 0.79 },
  { code: "ARS", flag: "🇦🇷", name: "Argentine Peso", symbol: "$", usdRate: 875.0 },
  { code: "BRL", flag: "🇧🇷", name: "Brazilian Real", symbol: "R$", usdRate: 4.97 },
  { code: "INR", flag: "🇮🇳", name: "Indian Rupee", symbol: "₹", usdRate: 83.12 },
  { code: "MXN", flag: "🇲🇽", name: "Mexican Peso", symbol: "$", usdRate: 17.15 },
  { code: "NGN", flag: "🇳🇬", name: "Nigerian Naira", symbol: "₦", usdRate: 1550.0 },
  { code: "TRY", flag: "🇹🇷", name: "Turkish Lira", symbol: "₺", usdRate: 32.15 },
];

export const PAYMENT_METHODS = [
  { id: "venmo", name: "Venmo", letter: "V", color: "#3D95CE", currencies: ["USD"], logo: "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='64'%20height='64'%3e%3cg%20transform='matrix(.124031%200%200%20.124031%20-.000001%2056.062016)'%3e%3crect%20y='-452'%20rx='61'%20height='516'%20width='516'%20fill='%233396cd'/%3e%3cpath%20d='M385.16-347c11.1%2018.3%2016.08%2037.17%2016.08%2061%200%2076-64.87%20174.7-117.52%20244H163.5l-48.2-288.35%20105.3-10%2025.6%20205.17C270-174%20299.43-235%20299.43-276.56c0-22.77-3.9-38.25-10-51z'%20fill='%23fff'/%3e%3c/g%3e%3c/svg%3e" },
  { id: "paypal", name: "PayPal", letter: "P", color: "#003087", currencies: ["USD", "EUR", "GBP"], logo: "data:image/svg+xml,%3c?xml%20version=%271.0%27%20encoding=%27UTF-8%27%20standalone=%27no%27?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width=%27800px%27%20height=%27800px%27%20viewBox=%27-3.5%200%2048%2048%27%20version=%271.1%27%20xmlns=%27http://www.w3.org/2000/svg%27%20xmlns:xlink=%27http://www.w3.org/1999/xlink%27%3e%3ctitle%3ePaypal-color%3c/title%3e%3cdesc%3eCreated%20with%20Sketch.%3c/desc%3e%3cdefs%3e%3c/defs%3e%3cg%20id=%27Icons%27%20stroke=%27none%27%20stroke-width=%271%27%20fill=%27none%27%20fill-rule=%27evenodd%27%3e%3cg%20id=%27Color-%27%20transform=%27translate(-804.000000,%20-660.000000)%27%20fill=%27%23022B87%27%3e%3cpath%20d=%27M838.91167,663.619443%20C836.67088,661.085983%20832.621734,660%20827.440097,660%20L812.404732,660%20C811.344818,660%20810.443663,660.764988%20810.277343,661.801472%20L804.016136,701.193856%20C803.892151,701.970844%20804.498465,702.674333%20805.292267,702.674333%20L814.574458,702.674333%20L816.905967,688.004562%20L816.833391,688.463555%20C816.999712,687.427071%20817.894818,686.662083%20818.95322,686.662083%20L823.363735,686.662083%20C832.030541,686.662083%20838.814901,683.170138%20840.797138,673.069296%20C840.856106,672.7693%20840.951363,672.194809%20840.951363,672.194809%20C841.513828,668.456868%20840.946827,665.920407%20838.91167,663.619443%20Z%20M843.301017,674.10803%20C841.144899,684.052874%20834.27133,689.316292%20823.363735,689.316292%20L819.408334,689.316292%20L816.458414,708%20L822.873846,708%20C823.800704,708%20824.588458,707.33101%20824.733611,706.423525%20L824.809211,706.027531%20L826.284927,696.754676%20L826.380183,696.243184%20C826.523823,695.335698%20827.313089,694.666708%20828.238435,694.666708%20L829.410238,694.666708%20C836.989913,694.666708%20842.92604,691.611256%20844.660308,682.776394%20C845.35583,679.23045%20845.021677,676.257496%20843.301017,674.10803%20Z%27%20id=%27Paypal%27%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/svg%3e" },
  { id: "revolut", name: "Revolut", letter: "R", color: "#0075EB", currencies: ["USD", "EUR", "GBP"], logo: "data:image/png;base64,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" },
  { id: "cashapp", name: "Cash App", letter: "C", color: "#00D64B", currencies: ["USD"], logo: "https://www.peer.xyz/assets/cashapp-Cq2b7MAK.webp" },
  { id: "wise", name: "Wise", letter: "W", color: "#9FE870", currencies: ["USD", "EUR", "GBP", "INR", "BRL"], logo: "data:image/png;base64,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" },
  { id: "zelle", name: "Zelle", letter: "Z", color: "#6D1ED4", currencies: ["USD"], logo: "https://www.peer.xyz/assets/zelle-NxBhBVx4.png" },
  { id: "mercadopago", name: "Mercado Pago", letter: "M", color: "#009EE3", currencies: ["ARS"], logo: "https://www.peer.xyz/assets/mercado-CoQUBF35.png" },
  { id: "monzo", name: "Monzo", letter: "Mo", color: "#FF4B67", currencies: ["GBP"], logo: "data:image/svg+xml,%3csvg%20viewBox='0%200%20108%20107'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='8'%20y='6'%20width='92'%20height='92'%20rx='14.2'%20fill='%23112231'/%3e%3cpath%20d='M82.2%2063.6c0%20.7-.3%201.4-.8%201.9L69.7%2077a1%201%200%200%201-1.8-.7V50.2l14.1-14h.2v27.4Z'%20fill='%23FF4F40'/%3e%3cpath%20d='M25.8%2063.6c0%20.7.3%201.4.8%201.9L38.3%2077a1%201%200%200%200%201.8-.7V50.2L26%2036.2h-.2v27.4Z'%20fill='%230088A6'/%3e%3cpath%20d='M40.1%2060.5%2025.8%2046.6V36.3L40%2050.7v9.8Z'%20fill='url(%23b)'%20style='mix-blend-mode:multiply'/%3e%3cpath%20d='m67.9%2060.1%2014.3-14v-9.8L67.9%2050.7v9.4Z'%20fill='url(%23c)'%20style='mix-blend-mode:multiply'/%3e%3cpath%20d='m82%2035.8-9-9a1%201%200%200%200-.7-.3%201%201%200%200%200-.8.3L54.2%2044.2l-.2.1v20l.6-.3%2013.5-13.5%2014-13.8v-.9Z'%20fill='%23BBF42E'/%3e%3cpath%20d='M53.8%2044.2%2036.4%2026.8a1%201%200%200%200-1.1-.2%201%201%200%200%200-.3.2l-9%209c-.3.3-.3.6%200%20.9l13.9%2013.8L53.4%2064c.1.2.4.3.6.3v-20l-.2-.1Z'%20fill='%2348D3B2'/%3e%3c/svg%3e" },
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
  currency: string;
}

export const LIQUIDITY_DATA: LiquidityRow[] = [
  { price: 0.985, spread: -1.5, amount: 350, total: 350, apr: null, providers: ["paypal"], currency: "USD" },
  { price: 0.992, spread: -0.8, amount: 1200, total: 1550, apr: 12.4, providers: ["venmo"], currency: "USD" },
  { price: 0.995, spread: -0.5, amount: 800, total: 2350, apr: 8.7, providers: ["revolut"], currency: "USD" },
  { price: 0.998, spread: -0.2, amount: 2500, total: 4850, apr: 15.2, providers: ["venmo", "revolut"], currency: "USD" },
  { price: 1.0, spread: 0, amount: 1800, total: 6650, apr: 6.3, providers: ["zelle"], currency: "USD" },
  { price: 1.002, spread: 0.2, amount: 3200, total: 9850, apr: 18.1, providers: ["venmo", "cashapp"], currency: "USD" },
  { price: 1.005, spread: 0.5, amount: 950, total: 10800, apr: 4.2, providers: ["wise"], currency: "USD" },
  { price: 1.008, spread: 0.8, amount: 1500, total: 12300, apr: 9.8, providers: ["paypal", "mercadopago"], currency: "USD" },
  { price: 1.01, spread: 1.0, amount: 600, total: 12900, apr: 3.1, providers: ["revolut"], currency: "USD" },
  { price: 1.015, spread: 1.5, amount: 400, total: 13300, apr: 2.4, providers: ["venmo"], currency: "USD" },
  { price: 1.018, spread: 1.8, amount: 750, total: 14050, apr: 5.6, providers: ["wise", "revolut"], currency: "USD" },
  { price: 1.022, spread: 2.2, amount: 280, total: 14330, apr: 1.9, providers: ["monzo"], currency: "GBP" },
  { price: 0.91, spread: -0.5, amount: 600, total: 600, apr: 7.2, providers: ["revolut"], currency: "EUR" },
  { price: 0.925, spread: 0.3, amount: 1100, total: 1700, apr: 10.5, providers: ["wise", "paypal"], currency: "EUR" },
  { price: 0.78, spread: -0.8, amount: 450, total: 450, apr: 5.1, providers: ["monzo"], currency: "GBP" },
  { price: 0.795, spread: 0.5, amount: 900, total: 1350, apr: 8.9, providers: ["revolut", "wise"], currency: "GBP" },
];

export interface MakerPlatformStat {
  platformId: string;
  fulfillments: number;
  manual: number;
  volume: number;
  profit: number;
}

export interface LeaderboardRow {
  address: string;
  activeDeposits: number;
  totalDeposits: number;
  filledVolume: number;
  realizedProfit: number;
  profitPct: number;
  grossDeposited: number;
  platforms: MakerPlatformStat[];
}

export const LEADERBOARD_DATA: LeaderboardRow[] = [
  {
    address: "0x76bb...ae30", activeDeposits: 3, totalDeposits: 90, filledVolume: 1072110.19, realizedProfit: 14508.05, profitPct: 1.35, grossDeposited: 1659740.98, platforms: [
      { platformId: "revolut", fulfillments: 147, manual: 1, volume: 490977.90, profit: 5187.46 },
      { platformId: "cashapp", fulfillments: 391, manual: 12, volume: 409625.18, profit: 6137.62 },
      { platformId: "venmo", fulfillments: 128, manual: 2, volume: 94079.96, profit: 2108.36 },
      { platformId: "paypal", fulfillments: 24, manual: 4, volume: 28800.42, profit: 361.09 },
      { platformId: "wise", fulfillments: 43, manual: 0, volume: 65072.11, profit: 1148.60 },
      { platformId: "zelle", fulfillments: 18, manual: 0, volume: 17850.20, profit: 234.81 },
    ]
  },
  {
    address: "0xdd8e...fe93", activeDeposits: 1, totalDeposits: 73, filledVolume: 566920.12, realizedProfit: 13386.53, profitPct: 2.36, grossDeposited: 987367.3, platforms: [
      { platformId: "venmo", fulfillments: 210, manual: 5, volume: 312450.33, profit: 7823.12 },
      { platformId: "revolut", fulfillments: 89, manual: 3, volume: 178234.56, profit: 3890.41 },
      { platformId: "wise", fulfillments: 45, manual: 1, volume: 76235.23, profit: 1673.00 },
    ]
  },
  {
    address: "0x1a4c...be8d", activeDeposits: 5, totalDeposits: 176, filledVolume: 719768.82, realizedProfit: 8535.71, profitPct: 1.19, grossDeposited: 842721.7, platforms: [
      { platformId: "cashapp", fulfillments: 312, manual: 8, volume: 389456.12, profit: 4234.56 },
      { platformId: "venmo", fulfillments: 198, manual: 4, volume: 230312.70, profit: 3101.15 },
      { platformId: "zelle", fulfillments: 67, manual: 2, volume: 100000.00, profit: 1200.00 },
    ]
  },
  {
    address: "0xfb74...d6ef", activeDeposits: 2, totalDeposits: 45, filledVolume: 973191.37, realizedProfit: 7096.44, profitPct: 0.73, grossDeposited: 1367876.07, platforms: [
      { platformId: "revolut", fulfillments: 234, manual: 6, volume: 567890.12, profit: 4123.45 },
      { platformId: "paypal", fulfillments: 156, manual: 3, volume: 405301.25, profit: 2972.99 },
    ]
  },
  {
    address: "0x3a91...c2f8", activeDeposits: 4, totalDeposits: 112, filledVolume: 445623.89, realizedProfit: 6234.12, profitPct: 1.4, grossDeposited: 623451.23, platforms: [
      { platformId: "venmo", fulfillments: 178, manual: 3, volume: 267890.45, profit: 3890.12 },
      { platformId: "wise", fulfillments: 89, manual: 1, volume: 177733.44, profit: 2344.00 },
    ]
  },
  {
    address: "0x8d2e...7a1b", activeDeposits: 1, totalDeposits: 34, filledVolume: 312445.67, realizedProfit: 4891.33, profitPct: 1.57, grossDeposited: 478234.56, platforms: [
      { platformId: "zelle", fulfillments: 145, manual: 2, volume: 212445.67, profit: 3456.78 },
      { platformId: "venmo", fulfillments: 56, manual: 0, volume: 100000.00, profit: 1434.55 },
    ]
  },
  {
    address: "0xc5f1...3e9d", activeDeposits: 3, totalDeposits: 67, filledVolume: 287334.21, realizedProfit: 3456.78, profitPct: 1.2, grossDeposited: 389112.45, platforms: [
      { platformId: "revolut", fulfillments: 112, manual: 4, volume: 187334.21, profit: 2234.56 },
      { platformId: "monzo", fulfillments: 34, manual: 1, volume: 100000.00, profit: 1222.22 },
    ]
  },
  {
    address: "0x2b8a...f4c6", activeDeposits: 2, totalDeposits: 28, filledVolume: 198776.54, realizedProfit: 2987.65, profitPct: 1.5, grossDeposited: 267891.23, platforms: [
      { platformId: "paypal", fulfillments: 67, manual: 2, volume: 123456.78, profit: 1890.12 },
      { platformId: "cashapp", fulfillments: 34, manual: 0, volume: 75319.76, profit: 1097.53 },
    ]
  },
  {
    address: "0xe7d3...1b5a", activeDeposits: 1, totalDeposits: 19, filledVolume: 156234.89, realizedProfit: 2145.34, profitPct: 1.37, grossDeposited: 201567.89, platforms: [
      { platformId: "venmo", fulfillments: 89, manual: 1, volume: 156234.89, profit: 2145.34 },
    ]
  },
  {
    address: "0x9f4c...8d2e", activeDeposits: 1, totalDeposits: 11, filledVolume: 123456.78, realizedProfit: 1234.56, profitPct: 1.0, grossDeposited: 156789.01, platforms: [
      { platformId: "wise", fulfillments: 56, manual: 0, volume: 78456.78, profit: 789.12 },
      { platformId: "revolut", fulfillments: 23, manual: 1, volume: 45000.00, profit: 445.44 },
    ]
  },
  {
    address: "0x4e7b...2c1a", activeDeposits: 2, totalDeposits: 43, filledVolume: 98234.56, realizedProfit: 987.23, profitPct: 1.01, grossDeposited: 134567.89, platforms: [
      { platformId: "mercadopago", fulfillments: 78, manual: 3, volume: 98234.56, profit: 987.23 },
    ]
  },
  {
    address: "0xb3d9...5f8e", activeDeposits: 1, totalDeposits: 8, filledVolume: 67891.23, realizedProfit: 543.21, profitPct: 0.8, grossDeposited: 89012.34, platforms: [
      { platformId: "cashapp", fulfillments: 34, manual: 0, volume: 67891.23, profit: 543.21 },
    ]
  },
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
  { id: "dep-009", status: "closed", amount: 1500, remaining: 0, platforms: ["venmo"], spread: 1.0 },
  { id: "dep-010", status: "closed", amount: 2000, remaining: 0, platforms: ["revolut", "paypal"], spread: 0.8 },
  { id: "dep-011", status: "closed", amount: 350, remaining: 0, platforms: ["cashapp"], spread: 1.5 },
  { id: "dep-012", status: "closed", amount: 4200, remaining: 0, platforms: ["wise", "zelle"], spread: 0.3 },
  { id: "dep-013", status: "closed", amount: 900, remaining: 0, platforms: ["monzo"], spread: 2.2 },
];

export const LEADERBOARD_STATS = {
  uniqueMakers: 1366,
  totalGrossDeposited: 22055468.79,
  totalRealizedProfit: 159410.39,
  totalFilledVolume: 14074895.53,
};
