"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sprout, Cloud, Bug, TrendingUp, MessageCircle, Leaf, Users, Shield } from "lucide-react"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

export default function LandingPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Sprout className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">{t("smartAgriCopilot")}</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("features")}
            </Link>
            <Link href="/market" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("marketPrices")}
            </Link>
            <Link href="/alerts" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("alerts")}
            </Link>
            <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("about")}
            </Link>
            <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("contact")}
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <Button asChild>
              <Link href="/chat">{t("getStarted")}</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            {t("aiPoweredAssistant")}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">{t("smartAgriCopilot")}</h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">{t("heroDescription")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/chat" className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                {t("startChatting")}
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">{t("learnMore")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("comprehensiveFarmManagement")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("farmManagementDescription")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{t("soilHealthAnalysis")}</CardTitle>
                <CardDescription>{t("soilHealthDescription")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Cloud className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{t("weatherAlerts")}</CardTitle>
                <CardDescription>{t("weatherAlertsDescription")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Bug className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{t("pestDetection")}</CardTitle>
                <CardDescription>{t("pestDetectionDescription")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{t("marketPricesFeature")}</CardTitle>
                <CardDescription>{t("marketPricesDescription")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{t("expertConsultation")}</CardTitle>
                <CardDescription>{t("expertConsultationDescription")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{t("cropProtection")}</CardTitle>
                <CardDescription>{t("cropProtectionDescription")}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Card className="max-w-2xl mx-auto border-primary/20 bg-primary/5">
            <CardContent className="pt-8">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{t("readyToTransform")}</h3>
              <p className="text-muted-foreground mb-6">{t("ctaDescription")}</p>
              <Button size="lg" asChild>
                <Link href="/chat" className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  {t("startYourJourney")}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sprout className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">{t("smartAgriCopilot")}</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 {t("smartAgriCopilot")}. {t("empoweringFarmers")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
