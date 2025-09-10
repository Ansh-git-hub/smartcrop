"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sprout, TrendingUp, TrendingDown, Search, RefreshCw, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface CommodityPrice {
  id: string
  name: string
  price: number
  unit: string
  change: number
  changePercent: number
  lastUpdated: string
  category: string
}

const commodityData: CommodityPrice[] = [
  {
    id: "wheat",
    name: "Wheat",
    price: 245.5,
    unit: "per quintal",
    change: 12.3,
    changePercent: 5.27,
    lastUpdated: "2 hours ago",
    category: "grains",
  },
  {
    id: "rice",
    name: "Rice (Basmati)",
    price: 4200.0,
    unit: "per quintal",
    change: -85.0,
    changePercent: -1.98,
    lastUpdated: "1 hour ago",
    category: "grains",
  },
  {
    id: "corn",
    name: "Corn",
    price: 189.75,
    unit: "per quintal",
    change: 7.25,
    changePercent: 3.97,
    lastUpdated: "3 hours ago",
    category: "grains",
  },
  {
    id: "soybeans",
    name: "Soybeans",
    price: 3850.0,
    unit: "per quintal",
    change: 125.0,
    changePercent: 3.35,
    lastUpdated: "1 hour ago",
    category: "oilseeds",
  },
  {
    id: "cotton",
    name: "Cotton",
    price: 5675.0,
    unit: "per quintal",
    change: -45.0,
    changePercent: -0.79,
    lastUpdated: "4 hours ago",
    category: "fiber",
  },
  {
    id: "sugarcane",
    name: "Sugarcane",
    price: 285.0,
    unit: "per quintal",
    change: 15.0,
    changePercent: 5.56,
    lastUpdated: "2 hours ago",
    category: "cash-crops",
  },
  {
    id: "onions",
    name: "Onions",
    price: 1250.0,
    unit: "per quintal",
    change: 75.0,
    changePercent: 6.38,
    lastUpdated: "30 minutes ago",
    category: "vegetables",
  },
  {
    id: "tomatoes",
    name: "Tomatoes",
    price: 890.0,
    unit: "per quintal",
    change: -120.0,
    changePercent: -11.88,
    lastUpdated: "1 hour ago",
    category: "vegetables",
  },
  {
    id: "potatoes",
    name: "Potatoes",
    price: 675.0,
    unit: "per quintal",
    change: 25.0,
    changePercent: 3.85,
    lastUpdated: "2 hours ago",
    category: "vegetables",
  },
]

const categories = [
  { value: "all", label: "All Categories" },
  { value: "grains", label: "Grains" },
  { value: "vegetables", label: "Vegetables" },
  { value: "oilseeds", label: "Oilseeds" },
  { value: "fiber", label: "Fiber Crops" },
  { value: "cash-crops", label: "Cash Crops" },
]

export default function MarketPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const filteredCommodities = commodityData.filter((commodity) => {
    const matchesSearch = commodity.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || commodity.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Sprout className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Market Prices</h1>
                  <p className="text-sm text-muted-foreground">Real-time commodity prices</p>
                </div>
              </div>
            </div>
            <Button onClick={handleRefresh} disabled={isRefreshing} variant="outline">
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search commodities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Market Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Commodities</CardTitle>
              <div className="text-2xl font-bold text-foreground">{filteredCommodities.length}</div>
            </CardHeader>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Trending Up</CardTitle>
              <div className="text-2xl font-bold text-primary">
                {filteredCommodities.filter((c) => c.change > 0).length}
              </div>
            </CardHeader>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Trending Down</CardTitle>
              <div className="text-2xl font-bold text-destructive">
                {filteredCommodities.filter((c) => c.change < 0).length}
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Commodity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommodities.map((commodity) => (
            <Card key={commodity.id} className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-foreground">{commodity.name}</CardTitle>
                    <CardDescription className="capitalize">{commodity.category.replace("-", " ")}</CardDescription>
                  </div>
                  <Badge variant={commodity.change >= 0 ? "default" : "destructive"} className="ml-2">
                    {commodity.change >= 0 ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {commodity.changePercent >= 0 ? "+" : ""}
                    {commodity.changePercent.toFixed(2)}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="text-2xl font-bold text-foreground">₹{commodity.price.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">{commodity.unit}</div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className={`font-medium ${commodity.change >= 0 ? "text-primary" : "text-destructive"}`}>
                      {commodity.change >= 0 ? "+" : ""}₹{commodity.change.toFixed(2)}
                    </span>
                    <span className="text-muted-foreground">Updated {commodity.lastUpdated}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCommodities.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">No commodities found matching your criteria</div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Footer Note */}
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-muted/30 border-border">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Prices are indicative and may vary by location and market conditions.
              </p>
              <p className="text-xs text-muted-foreground">
                Data sourced from major agricultural markets across India. Last updated: {new Date().toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
