"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Sprout, Leaf, Cloud, Bug, TrendingUp, MessageSquare, Send, Mic, ImageIcon, Menu, X } from "lucide-react"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  type?: "text" | "image"
}

export default function ChatPage() {
  const { t } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your Smart Agri Copilot. How can I help you with your farming needs today?",
      sender: "ai",
      timestamp: new Date(),
      type: "text",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [activeFeature, setActiveFeature] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const features = [
    {
      id: "soil-health",
      name: t("soilHealth"),
      icon: Leaf,
      description: t("soilHealthChatDesc"),
    },
    {
      id: "weather-alerts",
      name: t("weatherAlerts"),
      icon: Cloud,
      description: t("weatherAlertsChatDesc"),
    },
    {
      id: "pest-detection",
      name: t("pestDetection"),
      icon: Bug,
      description: t("pestDetectionChatDesc"),
    },
    {
      id: "market-prices",
      name: t("marketPricesFeature"),
      icon: TrendingUp,
      description: t("marketPricesChatDesc"),
    },
    {
      id: "feedback",
      name: t("feedback"),
      icon: MessageSquare,
      description: t("feedbackDesc"),
    },
  ]

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, newMessage])
    setInputMessage("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputMessage, activeFeature),
        sender: "ai",
        timestamp: new Date(),
        type: "text",
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const getAIResponse = (message: string, feature: string | null): string => {
    const responses = {
      "soil-health":
        "I can help you analyze your soil health. Please describe your soil conditions or upload a soil sample image for detailed analysis.",
      "weather-alerts":
        "I'll provide you with weather updates for your location. What's your farm location so I can give you accurate weather forecasts?",
      "pest-detection":
        "Upload an image of your crops showing any signs of pests or diseases, and I'll help identify the issue and suggest treatments.",
      "market-prices":
        "I can provide current market prices for various commodities. Which crops are you interested in checking prices for?",
      feedback:
        "Thank you for wanting to share feedback! Please tell me about your experience using Smart Agri Copilot.",
      default:
        "I'm here to help with all your agricultural needs. You can ask me about soil health, weather conditions, pest identification, market prices, or any other farming questions!",
    }

    return responses[feature as keyof typeof responses] || responses.default
  }

  const handleFeatureClick = (featureId: string) => {
    setActiveFeature(featureId)
    const feature = features.find((f) => f.id === featureId)
    if (feature) {
      const featureMessage: Message = {
        id: Date.now().toString(),
        content: `I'd like help with ${feature.name}`,
        sender: "user",
        timestamp: new Date(),
        type: "text",
      }
      setMessages((prev) => [...prev, featureMessage])

      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: getAIResponse("", featureId),
          sender: "ai",
          timestamp: new Date(),
          type: "text",
        }
        setMessages((prev) => [...prev, aiResponse])
      }, 500)
    }
    setSidebarOpen(false)
  }

  return (
    <div className="h-screen flex bg-background">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:relative inset-y-0 left-0 z-50 w-80 bg-sidebar border-r border-sidebar-border
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-sidebar-border">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
                  <Sprout className="w-5 h-5 text-sidebar-primary-foreground" />
                </div>
                <span className="font-semibold text-sidebar-foreground">{t("smartAgriCopilot")}</span>
              </Link>
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Features List */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-sidebar-foreground mb-4">{t("features")}</h3>
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <Card
                    key={feature.id}
                    className={`cursor-pointer transition-colors hover:bg-sidebar-accent/50 ${
                      activeFeature === feature.id
                        ? "bg-sidebar-accent border-sidebar-primary"
                        : "border-sidebar-border"
                    }`}
                    onClick={() => handleFeatureClick(feature.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-sidebar-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-sidebar-primary" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-medium text-sidebar-foreground text-sm">{feature.name}</h4>
                          <p className="text-xs text-sidebar-foreground/70 mt-1">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-4 h-4" />
            </Button>
            <div className="flex-1">
              <h1 className="font-semibold text-foreground">{t("aiAssistant")}</h1>
              <p className="text-sm text-muted-foreground">
                {activeFeature
                  ? `${t("helpingWith")} ${features.find((f) => f.id === activeFeature)?.name}`
                  : t("readyToHelp")}
              </p>
            </div>
            <LanguageSelector />
            {activeFeature && (
              <Badge variant="secondary" className="ml-2">
                {features.find((f) => f.id === activeFeature)?.name}
              </Badge>
            )}
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 opacity-70`}>
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-card/50">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end gap-2">
              <div className="flex-1 relative">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={t("askAnything")}
                  className="pr-20"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                    <ImageIcon className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                    <Mic className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">{t("uploadImages")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
