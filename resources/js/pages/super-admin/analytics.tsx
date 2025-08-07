import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import AdminLayout from "@/layouts/admin-layout";
import { DollarSign, Eye, ShoppingCart, TrendingDown, TrendingUp, Users } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

// Mock analytics data
const revenueData = [
  { month: "Jan", revenue: 45000, orders: 320, customers: 280 },
  { month: "Feb", revenue: 52000, orders: 380, customers: 320 },
  { month: "Mar", revenue: 48000, orders: 350, customers: 310 },
  { month: "Apr", revenue: 61000, orders: 420, customers: 380 },
  { month: "May", revenue: 58000, orders: 390, customers: 360 },
  { month: "Jun", revenue: 67000, orders: 450, customers: 410 },
];

const trafficData = [
  { source: "Organic Search", visitors: 12500, percentage: 35 },
  { source: "Direct", visitors: 8900, percentage: 25 },
  { source: "Social Media", visitors: 6400, percentage: 18 },
  { source: "Email", visitors: 4300, percentage: 12 },
  { source: "Paid Ads", visitors: 3600, percentage: 10 },
];

const topProducts = [
  { name: "Wireless Headphones", sales: 1234, revenue: 98720 },
  { name: "Smart Watch", sales: 987, revenue: 197400 },
  { name: "Laptop Stand", sales: 756, revenue: 37800 },
  { name: "USB-C Cable", sales: 654, revenue: 19620 },
  { name: "Phone Case", sales: 543, revenue: 16290 },
];

const conversionData = [
  { day: "Mon", rate: 2.4 },
  { day: "Tue", rate: 3.1 },
  { day: "Wed", rate: 2.8 },
  { day: "Thu", rate: 3.5 },
  { day: "Fri", rate: 4.2 },
  { day: "Sat", rate: 3.8 },
  { day: "Sun", rate: 2.9 },
];

const analyticsStats = [
  {
    title: "Total Revenue",
    value: "$342,000",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Total Orders",
    value: "2,310",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Website Visitors",
    value: "35,700",
    change: "+15.3%",
    trend: "up",
    icon: Eye,
  },
  {
    title: "New Customers",
    value: "2,060",
    change: "+6.8%",
    trend: "up",
    icon: Users,
  },
];

export default function Analytics() {
  return (
    <AdminLayout title="Analytics">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Comprehensive analytics and insights for your ecommerce business</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {analyticsStats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="flex items-center text-xs text-muted-foreground">
                  {stat.trend === "up" ? (
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                  )}
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Revenue and Orders Chart */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  revenue: {
                    label: "Revenue",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="var(--color-revenue)"
                      fill="var(--color-revenue)"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Orders & Customers</CardTitle>
              <CardDescription>Monthly orders and new customers</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  orders: {
                    label: "Orders",
                    color: "hsl(var(--chart-1))",
                  },
                  customers: {
                    label: "Customers",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="orders" fill="var(--color-orders)" />
                    <Bar dataKey="customers" fill="var(--color-customers)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Traffic Sources and Conversion Rate */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where your visitors are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficData.map((source, index) => (
                  <div key={source.source} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: `hsl(${index * 60}, 70%, 50%)` }}
                      />
                      <span className="text-sm font-medium">{source.source}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{source.visitors.toLocaleString()}</span>
                      <Badge variant="outline">{source.percentage}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conversion Rate</CardTitle>
              <CardDescription>Daily conversion rate over the last week</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  rate: {
                    label: "Conversion Rate",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[200px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={conversionData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="rate" stroke="var(--color-rate)" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
            <CardDescription>Best selling products by revenue and quantity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">{product.sales} sales</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">${product.revenue.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Revenue</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
