import { useEffect, useState } from "react";
import { Bell, MessageSquare, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";

type Item = { id: string; title: string; sub: string; date: string };

const VIEWS: { key: string; label: string }[] = [
  ["dashboard", "Dashboard"], ["properties", "Properties"], ["categories", "Categories"], ["locations", "Locations"],
  ["amenities", "Amenities"], ["careers", "Careers"], ["leads", "Leads"], ["inquiries", "Inquiries"], ["clients", "Clients"],
  ["blog", "Blog Posts"], ["media", "Media Library"], ["pages", "Pages"], ["users", "Users"], ["roles", "Roles & Permissions"], ["settings", "Settings"],
].map(([key, label]) => ({ key: key!, label: label! }));

export function TopbarTools({ onSelect }: { onSelect: (view: string) => void }) {
  const [q, setQ] = useState("");
  const [leads, setLeads] = useState<Item[]>([]);
  const [msgs, setMsgs] = useState<Item[]>([]);
  const [seenLeads, setSeenLeads] = useState(false);
  const [seenMsgs, setSeenMsgs] = useState(false);

  useEffect(() => {
    supabase.from("admin_leads").select("id,name,requirement,created_at").order("created_at", { ascending: false }).limit(5)
      .then(({ data }) => setLeads((data ?? []).map((r) => ({ id: r.id, title: `New lead: ${r.name}`, sub: r.requirement, date: r.created_at }))));
    supabase.from("admin_inquiries").select("id,sender_name,subject,created_at").order("created_at", { ascending: false }).limit(5)
      .then(({ data }) => setMsgs((data ?? []).map((r) => ({ id: r.id, title: r.sender_name, sub: r.subject, date: r.created_at }))));
  }, []);

  const matches = q.trim() ? VIEWS.filter((v) => v.label.toLowerCase().includes(q.trim().toLowerCase())) : [];

  const list = (items: Item[], view: string, empty: string) => (
    <div className="flex flex-col">
      {items.length === 0 && <p className="p-3 text-sm text-muted-foreground">{empty}</p>}
      {items.map((i) => (
        <button key={i.id} onClick={() => onSelect(view)} className="rounded-md p-2 text-left hover:bg-muted">
          <p className="text-sm font-semibold text-foreground">{i.title}</p>
          <p className="truncate text-xs text-muted-foreground">{i.sub}</p>
          <p className="text-[11px] text-muted-foreground">{new Date(i.date).toLocaleDateString()}</p>
        </button>
      ))}
      <Button variant="link" size="sm" onClick={() => onSelect(view)}>View all</Button>
    </div>
  );

  return (
    <>
      <div className="relative">
        <label className="ib-admin-search-box">
          <Search />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && matches[0]) { onSelect(matches[0].key); setQ(""); } }}
            placeholder="Search anything..." aria-label="Search anything" />
        </label>
        {matches.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-md border bg-popover p-1 shadow-md">
            {matches.map((m) => (
              <button key={m.key} onClick={() => { onSelect(m.key); setQ(""); }} className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-muted">{m.label}</button>
            ))}
          </div>
        )}
      </div>
      <Popover onOpenChange={(o) => o && setSeenLeads(true)}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Notifications" className="ib-admin-icon-button"><Bell />{!seenLeads && leads.length > 0 && <span className="ib-admin-badge">{leads.length}</span>}</Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80 p-2"><p className="px-2 pb-1 text-sm font-bold">Notifications</p>{list(leads, "leads", "No notifications")}</PopoverContent>
      </Popover>
      <Popover onOpenChange={(o) => o && setSeenMsgs(true)}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Messages" className="ib-admin-icon-button"><MessageSquare />{!seenMsgs && msgs.length > 0 && <span className="ib-admin-badge">{msgs.length}</span>}</Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80 p-2"><p className="px-2 pb-1 text-sm font-bold">Messages</p>{list(msgs, "inquiries", "No messages")}</PopoverContent>
      </Popover>
    </>
  );
}
