"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/contexts/language-context"
import { Globe } from "lucide-react"

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <Select value={language} onValueChange={setLanguage}>
      <SelectTrigger className="w-32">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">{t("english")}</SelectItem>
        <SelectItem value="hi">{t("hindi")}</SelectItem>
        <SelectItem value="es">{t("spanish")}</SelectItem>
      </SelectContent>
    </Select>
  )
}
