import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Save } from "lucide-react";

interface ContentRow {
  id: string;
  section: string;
  key: string;
  value_nl: string;
  value_fr: string;
}

const SECTIONS = ["hero", "intro", "social", "features", "usps", "location", "footer", "navbar"];

const sectionLabels: Record<string, string> = {
  hero: "Hero",
  intro: "Introductie",
  social: "Reviews Sectie",
  features: "Feature Cards",
  usps: "USPs",
  location: "Locatie & Contact",
  footer: "Footer",
  navbar: "Navigatie",
};

export const ContentEditor = () => {
  const [content, setContent] = useState<ContentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase.from("site_content").select("*").order("section").order("key");
      if (error) toast.error("Fout bij laden: " + error.message);
      else setContent(data ?? []);
      setLoading(false);
    };
    fetch();
  }, []);

  const updateField = (id: string, field: "value_nl" | "value_fr", value: string) => {
    setContent((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const saveItem = async (item: ContentRow) => {
    setSaving(item.id);
    const { error } = await supabase
      .from("site_content")
      .update({ value_nl: item.value_nl, value_fr: item.value_fr })
      .eq("id", item.id);
    if (error) toast.error("Opslaan mislukt");
    else toast.success(`"${item.key}" opgeslagen`);
    setSaving(null);
  };

  const sectionItems = content.filter((c) => c.section === activeSection);

  if (loading) return <p className="text-muted-foreground">Laden...</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {SECTIONS.map((s) => (
          <Button
            key={s}
            variant={activeSection === s ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveSection(s)}
          >
            {sectionLabels[s] || s}
          </Button>
        ))}
      </div>

      <div className="space-y-6">
        {sectionItems.map((item) => {
          const isLong = item.value_nl.length > 80 || item.value_fr.length > 80;
          return (
            <div key={item.id} className="p-4 border border-border rounded-md space-y-3 bg-card">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{item.key}</span>
                <Button size="sm" onClick={() => saveItem(item)} disabled={saving === item.id}>
                  <Save className="w-3 h-3 mr-1" />
                  {saving === item.id ? "..." : "Opslaan"}
                </Button>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">🇳🇱 Nederlands</label>
                  {isLong ? (
                    <Textarea value={item.value_nl} onChange={(e) => updateField(item.id, "value_nl", e.target.value)} rows={3} />
                  ) : (
                    <Input value={item.value_nl} onChange={(e) => updateField(item.id, "value_nl", e.target.value)} />
                  )}
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">🇫🇷 Français</label>
                  {isLong ? (
                    <Textarea value={item.value_fr} onChange={(e) => updateField(item.id, "value_fr", e.target.value)} rows={3} />
                  ) : (
                    <Input value={item.value_fr} onChange={(e) => updateField(item.id, "value_fr", e.target.value)} />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
