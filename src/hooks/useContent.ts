import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type Lang = "nl" | "fr";

interface ContentItem {
  section: string;
  key: string;
  value_nl: string;
  value_fr: string;
}

interface ImageItem {
  section: string;
  key: string;
  url: string;
  alt_nl: string;
  alt_fr: string;
}

export interface ReviewItem {
  id: string;
  text_nl: string;
  text_fr: string;
  author: string;
  country: string;
  sort_order: number;
  visible: boolean;
}

export const useContent = (lang: Lang) => {
  const { data: contentData } = useQuery({
    queryKey: ["site_content"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_content").select("*");
      if (error) throw error;
      return data as ContentItem[];
    },
    staleTime: 5 * 60 * 1000,
  });

  const { data: imageData } = useQuery({
    queryKey: ["site_images"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_images").select("*");
      if (error) throw error;
      return data as ImageItem[];
    },
    staleTime: 5 * 60 * 1000,
  });

  const { data: reviewsData } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as ReviewItem[];
    },
    staleTime: 5 * 60 * 1000,
  });

  const getT = (section: string, key: string, fallback = ""): string => {
    if (!contentData) return fallback;
    const item = contentData.find((c) => c.section === section && c.key === key);
    if (!item) return fallback;
    return lang === "fr" ? item.value_fr : item.value_nl;
  };

  const getImage = (section: string, key: string, fallbackUrl = "", fallbackAlt = "") => {
    if (!imageData) return { url: fallbackUrl, alt: fallbackAlt };
    const item = imageData.find((i) => i.section === section && i.key === key);
    if (!item) return { url: fallbackUrl, alt: fallbackAlt };
    return {
      url: item.url,
      alt: lang === "fr" ? item.alt_fr : item.alt_nl,
    };
  };

  const reviews = (reviewsData ?? []).map((r) => ({
    ...r,
    text: lang === "fr" ? r.text_fr : r.text_nl,
  }));

  return { getT, getImage, reviews, isLoaded: !!contentData };
};
