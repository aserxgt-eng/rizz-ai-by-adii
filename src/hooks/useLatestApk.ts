import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Release = {
  name: string;
  url: string;
  size: number;
  updatedAt: string;
};

export const useLatestApk = () => {
  const [latest, setLatest] = useState<Release | null>(null);
  const [all, setAll] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    const { data, error } = await supabase.storage
      .from("app-releases")
      .list("", { limit: 50, sortBy: { column: "created_at", order: "desc" } });
    if (error || !data) {
      setLoading(false);
      return;
    }
    const files = data
      .filter((f) => f.name && !f.name.startsWith("."))
      .map((f) => {
        const { data: pub } = supabase.storage.from("app-releases").getPublicUrl(f.name);
        return {
          name: f.name,
          url: pub.publicUrl,
          size: (f.metadata as any)?.size ?? 0,
          updatedAt: f.updated_at ?? f.created_at ?? "",
        };
      });
    setAll(files);
    setLatest(files[0] ?? null);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  return { latest, all, loading, refresh };
};
