import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import VendorLayout from "@/layouts/vendor-layout";
import { AlertTriangle, DollarSign, Package, ShoppingCart, Star, TrendingDown, TrendingUp } from "lucide-react";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

// Mock data for vendor dashboard
const vendorStats = [
  {
    title: "Total Revenue",
    value: "$12,450",
    change: "+15.2%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Total Products",
    value: "45",
    change: "+3",
    trend: "up",
    icon: Package,
  },
  {
    title: "Total Orders",
    value: "234",
    change: "+12%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Average Rating",
    value: "4.8",
    change: "+0.2",
    trend: "up",
    icon: Star,
  },
];

const revenueData = [
  { month: "Jan", revenue: 2400, orders: 24 },
  { month: "Feb", revenue: 1398, orders: 18 },
  { month: "Mar", revenue: 9800, orders: 45 },
  { month: "Apr", revenue: 3908, orders: 32 },
  { month: "May", revenue: 4800, orders: 38 },
  { month: "Jun", revenue: 3800, orders: 29 },
];

const categoryData = [
  { name: "Electronics", value: 400, color: "#0088FE" },
  { name: "Accessories", value: 300, color: "#00C49F" },
  { name: "Gadgets", value: 200, color: "#FFBB28" },
  { name: "Others", value: 100, color: "#FF8042" },
];

const recentOrders = [
  {
    id: "#VND-3210",
    customer: "John Smith",
    product: "Wireless Headphones",
    status: "Processing",
    amount: "$99.99",
    date: "2024-03-15",
  },
  {
    id: "#VND-3209",
    customer: "Sarah Johnson",
    product: "Smart Watch",
    status: "Shipped",
    amount: "$199.99",
    date: "2024-03-14",
  },
  {
    id: "#VND-3208",
    customer: "Mike Wilson",
    product: "USB-C Cable",
    status: "Delivered",
    amount: "$24.99",
    date: "2024-03-13",
  },
  {
    id: "#VND-3207",
    customer: "Emma Davis",
    product: "Phone Case",
    status: "Cancelled",
    amount: "$19.99",
    date: "2024-03-12",
  },
];

const lowStockProducts = [
  {
    name: "Wireless Mouse",
    sku: "WM-001",
    stock: 3,
    threshold: 10,
    price: "$29.99",
  },
  {
    name: "Bluetooth Speaker",
    sku: "BS-002",
    stock: 1,
    threshold: 5,
    price: "$79.99",
  },
  {
    name: "Phone Charger",
    sku: "PC-003",
    stock: 2,
    threshold: 15,
    price: "$19.99",
  },
];

export default function VendorDashboard() {
  return (
    <VendorLayout title="Vendor Dashboard">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your store today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {vendorStats.map((stat) => (
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

        {/* Charts Row */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue and orders for the last 6 months</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
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
                  <BarChart data={revenueData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="revenue" fill="var(--color-revenue)" />
                    <Bar dataKey="orders" fill="var(--color-orders)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
              <CardDescription>Distribution of sales across product categories</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  electronics: { label: "Electronics", color: "#0088FE" },
                  accessories: { label: "Accessories", color: "#00C49F" },
                  gadgets: { label: "Gadgets", color: "#FFBB28" },
                  others: { label: "Others", color: "#FF8042" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                      {categoryData.map((entry, index) => (
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

        {/* Tables Row */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest orders from your customers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.id}</div>
                          <div className="text-sm text-muted-foreground">{order.product}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{order.customer}</div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === "Delivered"
                              ? "default"
                              : order.status === "Processing"
                                ? "secondary"
                                : order.status === "Shipped"
                                  ? "outline"
                                  : "destructive"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{order.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Low Stock Alert
              </CardTitle>
              <CardDescription>Products running low on inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockProducts.map((product) => (
                  <div key={product.sku} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">SKU: {product.sku}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{product.price}</div>
                      <div className="text-sm text-red-600">{product.stock} left</div>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="mt-4 w-full" variant="outline">
                <Package className="mr-2 h-4 w-4" />
                Manage Inventory
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </VendorLayout>
  );
}
