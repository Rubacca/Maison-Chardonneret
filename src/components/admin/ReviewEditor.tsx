import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Save, Plus, Trash2 } from "lucide-react";

interface ReviewRow {
  id: string;
  text_nl: string;
  text_fr: string;
  author: string;
  country: string;
  sort_order: number;
  visible: boolean;
}

export const ReviewEditor = () => {
  const [reviews, setReviews] = useState<ReviewRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  const fetchReviews = async () => {
    const { data, error } = await supabase.from("reviews").select("*").order("sort_order");
    if (error) toast.error("Fout bij laden");
    else setReviews(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchReviews(); }, []);

  const updateField = (id: string, field: keyof ReviewRow, value: any) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const saveItem = async (item: ReviewRow) => {
    setSaving(item.id);
    const { error } = await supabase
      .from("reviews")
      .update({
        text_nl: item.text_nl,
        text_fr: item.text_fr,
        author: item.author,
        country: item.country,
        sort_order: item.sort_order,
        visible: item.visible,
      })
      .eq("id", item.id);
    if (error) toast.error("Opslaan mislukt");
    else toast.success(`Review van ${item.author} opgeslagen`);
    setSaving(null);
  };

  const addReview = async () => {
    const maxOrder = reviews.length > 0 ? Math.max(...reviews.map((r) => r.sort_order)) : 0;
    const { error } = await supabase.from("reviews").insert({
      text_nl: "Nieuwe review",
      text_fr: "Nouvel avis",
      author: "Naam",
      country: "NL",
      sort_order: maxOrder + 1,
      visible: false,
    });
    if (error) toast.error("Toevoegen mislukt");
    else {
      toast.success("Review toegevoegd");
      fetchReviews();
    }
  };

  const deleteReview = async (id: string) => {
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) toast.error("Verwijderen mislukt");
    else {
      toast.success("Review verwijderd");
      setReviews((prev) => prev.filter((r) => r.id !== id));
    }
  };

  if (loading) return <p className="text-muted-foreground">Laden...</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={addReview} size="sm">
          <Plus className="w-3 h-3 mr-1" /> Review toevoegen
        </Button>
      </div>

      {reviews.map((item) => (
        <div key={item.id} className={`p-4 border rounded-md space-y-3 bg-card ${item.visible ? "border-border" : "border-destructive/30 opacity-70"}`}>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <Switch checked={item.visible} onCheckedChange={(v) => updateField(item.id, "visible", v)} />
              <span className="text-xs text-muted-foreground">{item.visible ? "Zichtbaar" : "Verborgen"}</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => saveItem(item)} disabled={saving === item.id}>
                <Save className="w-3 h-3 mr-1" />
                {saving === item.id ? "..." : "Opslaan"}
              </Button>
              <Button size="sm" variant="destructive" onClick={() => deleteReview(item.id)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">🇳🇱 Tekst</label>
              <Textarea value={item.text_nl} onChange={(e) => updateField(item.id, "text_nl", e.target.value)} rows={2} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">🇫🇷 Texte</label>
              <Textarea value={item.text_fr} onChange={(e) => updateField(item.id, "text_fr", e.target.value)} rows={2} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Auteur</label>
              <Input value={item.author} onChange={(e) => updateField(item.id, "author", e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Land</label>
              <Input value={item.country} onChange={(e) => updateField(item.id, "country", e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Volgorde</label>
              <Input type="number" value={item.sort_order} onChange={(e) => updateField(item.id, "sort_order", parseInt(e.target.value) || 0)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
