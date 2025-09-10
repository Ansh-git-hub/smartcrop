"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sprout, ArrowLeft, X, AlertTriangle, Cloud, Bug, TrendingUp, Droplets, Bell, CheckCircle } from "lucide-react"
import Link from "next/link"

interface AlertItem {
  id: string
  title: string
  description: string
  type: "weather" | "pest" | "market" | "irrigation" | "general"
  severity: "low" | "medium" | "high" | "critical"
  timestamp: Date
  location?: string
  dismissed: boolean
}

const initialAlerts: AlertItem[] = [
  {
    id: "1",
    title: "Heavy Rainfall Warning",
    description:
      "Heavy rainfall expected in the next 24-48 hours. Consider protecting crops and ensuring proper drainage.",
    type: "weather",
    severity: "high",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    location: "Punjab, Haryana",
    dismissed: false,
  },
  {
    id: "2",
    title: "Aphid Infestation Alert",
    description:
      "Increased aphid activity reported in nearby farms. Monitor your crops closely and consider preventive measures.",
    type: "pest",
    severity: "medium",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    location: "Local Area",
    dismissed: false,
  },
  {
    id: "3",
    title: "Wheat Price Surge",
    description: "Wheat prices have increased by 8% in the last week. Good time to consider selling if you have stock.",
    type: "market",
    severity: "low",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    dismissed: false,
  },
  {
    id: "4",
    title: "Irrigation System Maintenance",
    description:
      "Scheduled maintenance for the community irrigation system this weekend. Plan your watering accordingly.",
    type: "irrigation",
    severity: "medium",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    dismissed: false,
  },
  {
    id: "5",
    title: "Temperature Drop Warning",
    description:
      "Unexpected temperature drop forecasted for tonight. Protect sensitive crops from potential frost damage.",
    type: "weather",
    severity: "critical",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    location: "Northern Regions",
    dismissed: false,
  },
  {
    id: "6",
    title: "Fertilizer Subsidy Available",
    description:
      "New government subsidy program for organic fertilizers is now open for applications. Apply before the deadline.",
    type: "general",
    severity: "low",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    dismissed: false,
  },
]

const alertTypes = [
  { value: "all", label: "All Alerts" },
  { value: "weather", label: "Weather" },
  { value: "pest", label: "Pest & Disease" },
  { value: "market", label: "Market" },
  { value: "irrigation", label: "Irrigation" },
  { value: "general", label: "General" },
]

const severityConfig = {
  low: { color: "bg-blue-500/10 text-blue-700 border-blue-200", icon: Bell },
  medium: { color: "bg-yellow-500/10 text-yellow-700 border-yellow-200", icon: AlertTriangle },
  high: { color: "bg-orange-500/10 text-orange-700 border-orange-200", icon: AlertTriangle },
  critical: { color: "bg-red-500/10 text-red-700 border-red-200", icon: AlertTriangle },
}

const typeIcons = {
  weather: Cloud,
  pest: Bug,
  market: TrendingUp,
  irrigation: Droplets,
  general: Bell,
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts)
  const [filterType, setFilterType] = useState("all")
  const [showDismissed, setShowDismissed] = useState(false)

  const filteredAlerts = alerts.filter((alert) => {
    const matchesType = filterType === "all" || alert.type === filterType
    const matchesDismissed = showDismissed || !alert.dismissed
    return matchesType && matchesDismissed
  })

  const dismissAlert = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, dismissed: true } : alert)))
  }

  const undismissAlert = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, dismissed: false } : alert)))
  }

  const dismissAllAlerts = () => {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, dismissed: true })))
  }

  const activeAlertsCount = alerts.filter((alert) => !alert.dismissed).length
  const criticalAlertsCount = alerts.filter((alert) => !alert.dismissed && alert.severity === "critical").length

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
                  <h1 className="text-xl font-bold text-foreground">Farm Alerts</h1>
                  <p className="text-sm text-muted-foreground">Stay informed about important updates</p>
                </div>
              </div>
            </div>
            {activeAlertsCount > 0 && (
              <Button onClick={dismissAllAlerts} variant="outline" size="sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                Dismiss All
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Alert Summary */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Alerts</CardTitle>
              <div className="text-2xl font-bold text-foreground">{activeAlertsCount}</div>
            </CardHeader>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Critical Alerts</CardTitle>
              <div className="text-2xl font-bold text-destructive">{criticalAlertsCount}</div>
            </CardHeader>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Alerts</CardTitle>
              <div className="text-2xl font-bold text-foreground">{alerts.length}</div>
            </CardHeader>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              {alertTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant={showDismissed ? "default" : "outline"}
            onClick={() => setShowDismissed(!showDismissed)}
            size="sm"
          >
            {showDismissed ? "Hide" : "Show"} Dismissed
          </Button>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <Card className="border-border">
              <CardContent className="pt-8 pb-8 text-center">
                <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No alerts to show</h3>
                <p className="text-muted-foreground">
                  {filterType === "all" ? "All alerts have been dismissed" : `No ${filterType} alerts found`}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredAlerts.map((alert) => {
              const SeverityIcon = severityConfig[alert.severity].icon
              const TypeIcon = typeIcons[alert.type]

              return (
                <Alert
                  key={alert.id}
                  className={`${severityConfig[alert.severity].color} ${alert.dismissed ? "opacity-60" : ""} relative`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <TypeIcon className="w-4 h-4" />
                      <SeverityIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <AlertTitle className="flex items-center gap-2 mb-2">
                            {alert.title}
                            <Badge variant="outline" className="text-xs capitalize">
                              {alert.severity}
                            </Badge>
                            {alert.dismissed && (
                              <Badge variant="secondary" className="text-xs">
                                Dismissed
                              </Badge>
                            )}
                          </AlertTitle>
                          <AlertDescription className="mb-3">{alert.description}</AlertDescription>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{alert.timestamp.toLocaleString()}</span>
                            {alert.location && <span>📍 {alert.location}</span>}
                            <Badge variant="outline" className="text-xs capitalize">
                              {alert.type.replace("-", " ")}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {alert.dismissed ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => undismissAlert(alert.id)}
                              className="h-8 w-8 p-0"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => dismissAlert(alert.id)}
                              className="h-8 w-8 p-0"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Alert>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
