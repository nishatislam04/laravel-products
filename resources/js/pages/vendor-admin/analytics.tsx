import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import VendorLayout from "@/layouts/vendor-layout";
import { DollarSign, Eye, ShoppingCart, Star, TrendingDown, TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

// Mock analytics data for vendor
const vendorAnalytics = [
  {
    title: "Total Revenue",
    value: "$12,450",
    change: "+15.2%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Total Orders",
    value: "234",
    change: "+12.8%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Product Views",
    value: "8,945",
    change: "+23.1%",
    trend: "up",
    icon: Eye,
  },
  {
    title: "Average Rating",
    value: "4.8",
    change: "+0.3",
    trend: "up",
    icon: Star,
  },
];

const revenueData = [
  { month: "Jan", revenue: 2400, orders: 24, views: 1200 },
  { month: "Feb", revenue: 1398, orders: 18, views: 980 },
  { month: "Mar", revenue: 9800, orders: 45, views: 2100 },
  { month: "Apr", revenue: 3908, orders: 32, views: 1800 },
  { month: "May", revenue: 4800, orders: 38, views: 2200 },
  { month: "Jun", revenue: 3800, orders: 29, views: 1900 },
];

const categoryPerformance = [
  { name: "Electronics", revenue: 8500, orders: 120, color: "#0088FE" },
  { name: "Accessories", revenue: 2800, orders: 85, color: "#00C49F" },
  { name: "Gadgets", revenue: 1150, orders: 29, color: "#FFBB28" },
];

const topProducts = [
  {
    name: "Wireless Headphones",
    revenue: "$4,680",
    orders: 78,
    views: 2340,
    conversion: "3.3%",
  },
  {
    name: "Smart Watch",
    revenue: "$3,198",
    orders: 16,
    views: 1890,
    conversion: "0.8%",
  },
  {
    name: "USB-C Cable",
    revenue: "$1,224",
    orders: 49,
    views: 890,
    conversion: "5.5%",
  },
  {
    name: "Wireless Mouse",
    revenue: "$1,160",
    orders: 29,
    views: 1200,
    conversion: "2.4%",
  },
];

const conversionData = [
  { day: "Mon", rate: 2.4, visitors: 320 },
  { day: "Tue", rate: 3.1, visitors: 280 },
  { day: "Wed", rate: 2.8, visitors: 390 },
  { day: "Thu", rate: 3.5, visitors: 420 },
  { day: "Fri", rate: 4.2, visitors: 380 },
  { day: "Sat", rate: 3.8, visitors: 290 },
  { day: "Sun", rate: 2.9, visitors: 250 },
];

export default function VendorAnalytics() {
  return (
    <VendorLayout title="Analytics">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights and performance metrics for your store</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {vendorAnalytics.map((stat) => (
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

        {/* Revenue and Performance Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue and order trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  revenue: {
                    label: "Revenue",
                    color: "hsl(var(--chart-1))",
                  },
                  orders: {
                    label: "Orders",
                    color: "hsl(var(--chart-2))",
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
                    <Area
                      type="monotone"
                      dataKey="orders"
                      stroke="var(--color-orders)"
                      fill="var(--color-orders)"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category Performance</CardTitle>
              <CardDescription>Revenue distribution by product category</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  electronics: { label: "Electronics", color: "#0088FE" },
                  accessories: { label: "Accessories", color: "#00C49F" },
                  gadgets: { label: "Gadgets", color: "#FFBB28" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryPerformance}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="revenue"
                      label={({ name, value }) => `${name}: $${value}`}
                    >
                      {categoryPerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Conversion Rate and Views */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Daily Conversion Rate</CardTitle>
              <CardDescription>Conversion rate and visitor trends over the week</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  rate: {
                    label: "Conversion Rate (%)",
                    color: "hsl(var(--chart-3))",
                  },
                  visitors: {
                    label: "Visitors",
                    color: "hsl(var(--chart-4))",
                  },
                }}
                className="h-[250px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={conversionData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="rate" stroke="var(--color-rate)" strokeWidth={3} />
                    <Line type="monotone" dataKey="visitors" stroke="var(--color-visitors)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Views Trend</CardTitle>
              <CardDescription>Monthly product page views</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  views: {
                    label: "Views",
                    color: "hsl(var(--chart-5))",
                  },
                }}
                className="h-[250px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="views" fill="var(--color-views)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Products Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
            <CardDescription>Your best performing products by revenue and conversion</CardDescription>
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
                      <div className="text-sm text-muted-foreground">
                        {product.orders} orders • {product.views} views
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1 text-right">
                    <div className="font-bold text-green-600">{product.revenue}</div>
                    <Badge variant="outline">{product.conversion} conversion</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  );
}
