import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Save, Upload } from "lucide-react";

interface ImageRow {
  id: string;
  section: string;
  key: string;
  url: string;
  alt_nl: string;
  alt_fr: string;
}

export const ImageEditor = () => {
  const [images, setImages] = useState<ImageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase.from("site_images").select("*").order("section").order("key");
      if (error) toast.error("Fout bij laden");
      else setImages(data ?? []);
      setLoading(false);
    };
    fetch();
  }, []);

  const updateField = (id: string, field: keyof ImageRow, value: string) => {
    setImages((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  const saveItem = async (item: ImageRow) => {
    setSaving(item.id);
    const { error } = await supabase
      .from("site_images")
      .update({ url: item.url, alt_nl: item.alt_nl, alt_fr: item.alt_fr })
      .eq("id", item.id);
    if (error) toast.error("Opslaan mislukt");
    else toast.success("Afbeelding opgeslagen");
    setSaving(null);
  };

  const handleUpload = async (id: string, file: File) => {
    setUploading(id);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("site-images").upload(path, file);
    if (uploadError) {
      toast.error("Upload mislukt: " + uploadError.message);
      setUploading(null);
      return;
    }
    const { data: { publicUrl } } = supabase.storage.from("site-images").getPublicUrl(path);
    updateField(id, "url", publicUrl);
    toast.success("Afbeelding geüpload — vergeet niet op te slaan");
    setUploading(null);
  };

  if (loading) return <p className="text-muted-foreground">Laden...</p>;

  return (
    <div className="space-y-6">
      {images.map((item) => (
        <div key={item.id} className="p-4 border border-border rounded-md space-y-3 bg-card">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">{item.section} / {item.key}</span>
            <Button size="sm" onClick={() => saveItem(item)} disabled={saving === item.id}>
              <Save className="w-3 h-3 mr-1" />
              {saving === item.id ? "..." : "Opslaan"}
            </Button>
          </div>
          <div className="grid sm:grid-cols-[200px_1fr] gap-4">
            <div className="space-y-2">
              <img src={item.url} alt={item.alt_nl} className="w-full h-32 object-cover rounded-md border border-border" />
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(item.id, file);
                  }}
                />
                <Button variant="outline" size="sm" className="w-full" asChild disabled={uploading === item.id}>
                  <span>
                    <Upload className="w-3 h-3 mr-1" />
                    {uploading === item.id ? "Uploaden..." : "Nieuwe afbeelding"}
                  </span>
                </Button>
              </label>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">URL</label>
                <Input value={item.url} onChange={(e) => updateField(item.id, "url", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">🇳🇱 Alt-tekst</label>
                  <Input value={item.alt_nl} onChange={(e) => updateField(item.id, "alt_nl", e.target.value)} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">🇫🇷 Alt-texte</label>
                  <Input value={item.alt_fr} onChange={(e) => updateField(item.id, "alt_fr", e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
