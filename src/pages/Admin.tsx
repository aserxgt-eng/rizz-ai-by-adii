import { ScreenShell } from "@/components/Shell";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLatestApk } from "@/hooks/useLatestApk";
import { Upload, Trash2, Download, Lock, Loader2, CheckCircle2, FileArchive } from "lucide-react";
import { toast } from "sonner";

// Change this passcode any time; it only gates the admin UI on the client.
const ADMIN_PASSCODE = "rizz2026";
const KEY = "rizz.admin.ok";

const fmtSize = (b: number) => {
  if (!b) return "—";
  const mb = b / 1024 / 1024;
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(b / 1024).toFixed(0)} KB`;
};

const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const { all, latest, loading, refresh } = useLatestApk();

  useEffect(() => {
    setAuthed(sessionStorage.getItem(KEY) === "1");
  }, []);

  const unlock = () => {
    if (pass.trim() === ADMIN_PASSCODE) {
      sessionStorage.setItem(KEY, "1");
      setAuthed(true);
      toast.success("Welcome back, admin.");
    } else toast.error("Wrong passcode");
  };

  const onPick = () => fileRef.current?.click();

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const name = file.name.toLowerCase();
    if (!name.endsWith(".apk") && !name.endsWith(".zip")) {
      toast.error("Only .apk or .zip allowed");
      return;
    }
    setUploading(true);
    setProgress(10);
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${Date.now()}-${safeName}`;
    setProgress(40);
    const { error } = await supabase.storage.from("app-releases").upload(path, file, {
      contentType: "application/vnd.android.package-archive",
      upsert: false,
    });
    setProgress(100);
    setUploading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("APK uploaded — users can download now.");
    if (fileRef.current) fileRef.current.value = "";
    refresh();
  };

  const remove = async (name: string) => {
    if (!confirm(`Delete ${name}?`)) return;
    const { error } = await supabase.storage.from("app-releases").remove([name]);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    refresh();
  };

  if (!authed) {
    return (
      <ScreenShell title="Admin" subtitle="restricted.">
        <div className="surface p-6 flex flex-col items-center text-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "hsl(var(--surface-2))", border: "1px solid hsl(var(--border))" }}>
            <Lock className="w-6 h-6 text-primary-glow" />
          </div>
          <div>
            <p className="font-display text-lg font-semibold">Admin access</p>
            <p className="text-xs text-muted-foreground mt-1">Enter the passcode to upload APK files.</p>
          </div>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && unlock()}
            placeholder="••••••••"
            className="w-full bg-transparent border border-border rounded-xl px-4 py-3 text-center font-mono tracking-widest focus:outline-none focus:border-primary"
          />
          <button onClick={unlock} className="w-full rounded-xl py-3 font-semibold text-primary-foreground" style={{ background: "var(--gradient-rizz)" }}>
            Unlock
          </button>
        </div>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell title="Admin" subtitle="upload APK releases.">
      <div className="surface p-5 mb-4">
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground/70 mb-3">Upload new release</p>
        <input ref={fileRef} type="file" accept=".apk,application/vnd.android.package-archive,.zip" className="hidden" onChange={onFile} />
        <button
          onClick={onPick}
          disabled={uploading}
          className="w-full rounded-2xl py-5 flex flex-col items-center gap-2 border-2 border-dashed transition-colors"
          style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--surface-2))" }}
        >
          {uploading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin text-primary-glow" />
              <p className="text-sm font-medium">Uploading… {progress}%</p>
            </>
          ) : (
            <>
              <Upload className="w-6 h-6 text-primary-glow" />
              <p className="text-sm font-medium">Tap to choose APK</p>
              <p className="text-[11px] text-muted-foreground">.apk · up to 500 MB</p>
            </>
          )}
        </button>
      </div>

      <div className="surface overflow-hidden">
        <div className="px-4 pt-4 pb-2 flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground/70">Releases</p>
          {latest && (
            <span className="text-[10px] uppercase tracking-wider text-primary-glow flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> latest live
            </span>
          )}
        </div>
        {loading ? (
          <div className="p-6 text-center text-sm text-muted-foreground">Loading…</div>
        ) : all.length === 0 ? (
          <div className="p-6 text-center text-sm text-muted-foreground">No releases yet. Upload your first APK.</div>
        ) : (
          all.map((r, i) => (
            <div key={r.name} className={`flex items-center gap-3 px-4 py-3 ${i > 0 ? "border-t border-border" : ""}`}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "hsl(var(--surface-2))" }}>
                <FileArchive className="w-4 h-4 text-primary-glow" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium truncate">{r.name}</p>
                <p className="text-[11px] text-muted-foreground">{fmtSize(r.size)} · {new Date(r.updatedAt).toLocaleString()}</p>
              </div>
              <a href={r.url} target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-white/5">
                <Download className="w-4 h-4 text-muted-foreground" />
              </a>
              <button onClick={() => remove(r.name)} className="p-2 rounded-lg hover:bg-white/5">
                <Trash2 className="w-4 h-4 text-destructive" />
              </button>
            </div>
          ))
        )}
      </div>
    </ScreenShell>
  );
};

export default Admin;
