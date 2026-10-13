import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Building2, CalendarDays, ChevronUp, Image, Info, Lightbulb, ListChecks, MapPin, Plus, Send, Settings2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import "@/styles/property-editor.css";

const tabs = [
  { label: "Basic Information", icon: Building2 },
  { label: "Details & Features", icon: ListChecks },
  { label: "Media", icon: Image },
  { label: "Location", icon: MapPin },
  { label: "SEO & Additional", icon: Settings2 },
];
const defaultHighlights = ["24/7 Security", "CCTV Surveillance", "Fire Sprinkler System", "Dock Levelers", "High Ceiling", "Ample Parking"];

export function PropertyEditor() {
  const queryClient = useQueryClient();
  const [tab, setTab] = useState(0);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [availability, setAvailability] = useState("Available");
  const [publishStatus, setPublishStatus] = useState("Draft");
  const [visibility, setVisibility] = useState("Public");
  const [featured, setFeatured] = useState(false);
  const [highlights, setHighlights] = useState(defaultHighlights);
  const [selectedHighlights, setSelectedHighlights] = useState<string[]>([]);
  const [addingHighlight, setAddingHighlight] = useState(false);
  const [newHighlight, setNewHighlight] = useState("");
  const [propertyType, setPropertyType] = useState("Warehouse");
  const [category, setCategory] = useState("");
  const [code, setCode] = useState("");
  const [offer, setOffer] = useState("For Lease");
  const [period, setPeriod] = useState("/ per month");
  const [locations, setLocations] = useState<Tables<"admin_locations">[]>([]);
  const [categories, setCategories] = useState<Tables<"admin_categories">[]>([]);
  const [properties, setProperties] = useState<Tables<"admin_properties">[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showListings, setShowListings] = useState(false);
  const [statusOpen, setStatusOpen] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    void Promise.all([
      supabase.from("admin_locations").select("*"),
      supabase.from("admin_categories").select("*"),
      supabase.from("admin_properties").select("*").order("created_at", { ascending: false }),
    ]).then(([locs, cats, listings]) => {
      setLocations(locs.data ?? []);
      setCategories(cats.data ?? []);
      setProperties(listings.data ?? []);
      if (locs.error || cats.error || listings.error) setError("Some property information could not be loaded. Please try again.");
    });
  }, []);

  async function save(draft: boolean) {
    if (!name.trim() || !location.trim()) {
      setTab(0);
      setError("Enter a property title and location before saving.");
      return;
    }
    setSaving(true);
    setError("");
    const payload = {
      name: name.trim(), location: location.trim(), size: size.trim(),
      price: price.trim() ? `${price.trim()} ${period}` : "On request",
      description: description.trim(),
      status: draft || visibility === "Private" ? "Hidden" : availability,
    };
    const request = editingId
      ? supabase.from("admin_properties").update(payload).eq("id", editingId)
      : supabase.from("admin_properties").insert(payload);
    const { data, error: saveError } = await request.select().single();
    setSaving(false);
    if (saveError) { setError(saveError.message); return; }
    if (data) {
      setEditingId(data.id);
      setProperties((rows) => [data, ...rows.filter((row) => row.id !== data.id)]);
    }
    setPublishStatus(draft ? "Draft" : "Published");
    setNotice(draft ? "Property saved as a draft." : visibility === "Private" ? "Private property saved." : "Property published to the website.");
    await queryClient.invalidateQueries({ queryKey: ["site", "properties"] });
  }

  function edit(row: Tables<"admin_properties">) {
    setEditingId(row.id); setName(row.name); setLocation(row.location); setSize(row.size);
    setPrice(row.price.replace(/\s*\/ per (month|sqm|year)$/, "").replace(/^On request$/, ""));
    setDescription(row.description); setAvailability(row.status === "Hidden" ? "Available" : row.status);
    setPublishStatus(row.status === "Hidden" || row.status === "Draft" ? "Draft" : "Published");
    setShowListings(false); setTab(0); setNotice(""); setError("");
  }

  async function remove(row: Tables<"admin_properties">) {
    if (!window.confirm(`Delete ${row.name}? This cannot be undone.`)) return;
    const { error: deleteError } = await supabase.from("admin_properties").delete().eq("id", row.id);
    if (deleteError) { setError(deleteError.message); return; }
    setProperties((rows) => rows.filter((item) => item.id !== row.id));
    setNotice("Property deleted.");
    await queryClient.invalidateQueries({ queryKey: ["site", "properties"] });
  }

  function toggleHighlight(label: string) {
    setSelectedHighlights((items) => items.includes(label) ? items.filter((item) => item !== label) : [...items, label]);
  }

  return (
    <div className="ib-property-editor">
      <div className="ib-property-heading">
        <div><h1>{showListings ? "Properties" : editingId ? "Edit Property" : "Add New Property"}</h1><p>{showListings ? "Your industrial property listings." : "Add a new industrial property to your listings."}</p></div>
        <div className="ib-property-heading-actions">
          <Button variant="ghost" size="sm" onClick={() => { setShowListings(!showListings); setNotice(""); }}>{showListings ? "Back to property form" : "View Properties"}</Button>
          {!showListings && <><Button variant="outline" disabled={saving} onClick={() => void save(true)}>Save as Draft</Button><Button disabled={saving} onClick={() => void save(false)}><Send /> {saving ? "Saving…" : "Publish Property"}</Button></>}
        </div>
      </div>
      {error && <div className="ib-property-error" role="alert">{error}</div>}
      {notice && <div className="ib-admin-notice" role="status">{notice}</div>}
      {showListings ? (
        <div className="ib-admin-table-wrap"><table className="ib-admin-data-table"><thead><tr><th>Property</th><th>Location</th><th>Status</th><th>Actions</th></tr></thead><tbody>{properties.map((row) => <tr key={row.id}><td>{row.name}</td><td>{row.location}</td><td>{row.status === "Hidden" ? "Draft / Private" : row.status}</td><td><div className="ib-admin-row-actions"><Button variant="outline" size="sm" onClick={() => edit(row)}>Edit</Button><Button variant="ghost" size="icon" aria-label={`Delete ${row.name}`} onClick={() => void remove(row)}><Trash2 /></Button></div></td></tr>)}</tbody></table>{properties.length === 0 && <div className="ib-admin-empty">No properties yet.</div>}</div>
      ) : <>
        <div className="ib-property-tabs" role="tablist" aria-label="Property information">
          {tabs.map(({ label, icon: Icon }, index) => <Button key={label} variant="ghost" role="tab" aria-selected={tab === index} aria-controls={`property-panel-${index}`} id={`property-tab-${index}`} className={tab === index ? "ib-property-tab active" : "ib-property-tab"} onClick={() => setTab(index)}><Icon />{index + 1}. {label}</Button>)}
        </div>
        <div className="ib-property-layout">
          <section className="ib-property-content" role="tabpanel" id={`property-panel-${tab}`} aria-labelledby={`property-tab-${tab}`}>
            {tab === 0 && <>
              <h2>Basic Information</h2>
              <div className="ib-property-fields">
                <label>Property Title <span>*</span><input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Maai Mahiu Logistics Park – Warehouse A" /></label>
                <label>Property Code / ID<input value={code} onChange={(e) => setCode(e.target.value)} placeholder="e.g. IBG-WH-001" /></label>
                <label>Property Type <span>*</span><select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>{["Warehouse", "Industrial Godown", "Logistics Hub", "Cold Storage", "Light Industrial Unit"].map((item) => <option key={item}>{item}</option>)}</select></label>
                <label>Location <span>*</span><input list="ib-property-locations" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Select or enter a location" /><datalist id="ib-property-locations">{locations.map((item) => <option key={item.id} value={item.name} />)}</datalist></label>
                <label>Category <span>*</span><select value={category} onChange={(e) => setCategory(e.target.value)}><option value="">Select category</option>{categories.map((item) => <option key={item.id}>{item.name}</option>)}</select></label>
                <label>Availability <span>*</span><select value={availability} onChange={(e) => setAvailability(e.target.value)}>{["Available", "Under Offer", "Leased"].map((item) => <option key={item}>{item}</option>)}</select></label>
                <label>Status <span>*</span><select value={offer} onChange={(e) => setOffer(e.target.value)}><option>For Lease</option><option>For Sale</option></select></label>
                <label>Price (KES) <span>*</span><div className="ib-property-price"><input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 850,000" /><select aria-label="Price period" value={period} onChange={(e) => setPeriod(e.target.value)}><option>/ per month</option><option>/ per sqm</option><option>/ per year</option></select></div></label>
              </div>
              <div className="ib-property-section"><h3>Short Description</h3><p>A short summary of the property that will appear on listing cards.</p><textarea aria-label="Short Description" rows={4} maxLength={300} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your industrial space…" /><div className="ib-property-counter">{description.length} / 300</div></div>
              <div className="ib-property-section"><h3>Property Highlights</h3><p>Add key highlights about this property.</p><div className="ib-property-highlights">{highlights.map((item) => <label key={item}><input type="checkbox" checked={selectedHighlights.includes(item)} onChange={() => toggleHighlight(item)} />{item}</label>)}<Button variant="outline" size="sm" onClick={() => setAddingHighlight(!addingHighlight)}><Plus /> Add Highlight</Button></div>{addingHighlight && <form className="ib-property-add-highlight" onSubmit={(e) => { e.preventDefault(); const label = newHighlight.trim(); if (!label) return; setHighlights((items) => items.includes(label) ? items : [...items, label]); setSelectedHighlights((items) => items.includes(label) ? items : [...items, label]); setNewHighlight(""); setAddingHighlight(false); }}><input aria-label="New highlight" placeholder="Highlight name" value={newHighlight} onChange={(e) => setNewHighlight(e.target.value)} /><Button type="submit" size="sm">Add</Button></form>}</div>
            </>}
            {tab === 1 && <><h2>Details & Features</h2><div className="ib-property-fields"><label>Property Size<input value={size} onChange={(e) => setSize(e.target.value)} placeholder="e.g. 12,000 sqm" /></label><label>Availability<select value={availability} onChange={(e) => setAvailability(e.target.value)}><option>Available</option><option>Under Offer</option><option>Leased</option></select></label></div><div className="ib-property-section"><h3>Property Highlights</h3><div className="ib-property-highlights">{highlights.map((item) => <label key={item}><input type="checkbox" checked={selectedHighlights.includes(item)} onChange={() => toggleHighlight(item)} />{item}</label>)}</div></div></>}
            {tab === 2 && <><h2>Media</h2><div className="ib-property-media-empty"><Image /><p>Property images are managed in Media Library.</p><p>Listings currently use the shared warehouse illustration.</p></div></>}
            {tab === 3 && <><h2>Location</h2><div className="ib-property-fields"><label>Property Location<input list="ib-editor-location-list" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Select or enter a location" /><datalist id="ib-editor-location-list">{locations.map((item) => <option key={item.id} value={item.name} />)}</datalist></label></div>{locations.filter((item) => item.name === location).map((item) => <div key={item.id} className="ib-property-location"><MapPin /><div><h3>{item.name}</h3><p>{item.region}</p><p>{Number(item.lat)}, {Number(item.lng)}</p></div></div>)}</>}
            {tab === 4 && <><h2>SEO & Additional</h2><div className="ib-property-fields"><label>Page Title<input value={name} onChange={(e) => setName(e.target.value)} /></label></div><div className="ib-property-section"><h3>Description</h3><textarea aria-label="Page description" value={description} maxLength={300} rows={4} onChange={(e) => setDescription(e.target.value)} /></div></>}
          </section>
          <aside className="ib-property-side">
            <section className="ib-property-side-section"><Button variant="ghost" className="ib-property-side-title" onClick={() => setStatusOpen(!statusOpen)} aria-expanded={statusOpen}>Property Status<ChevronUp className={statusOpen ? "" : "rotate-180"} /></Button>{statusOpen && <div className="ib-property-status-fields"><label>Publish Status<select value={publishStatus} onChange={(e) => setPublishStatus(e.target.value)}><option>Draft</option><option>Published</option></select></label><label>Visibility<select value={visibility} onChange={(e) => setVisibility(e.target.value)}><option>Public</option><option>Private</option></select></label><label>Publish Date<div className="ib-property-date"><CalendarDays /><input type="text" value="On publish" readOnly aria-label="Publish Date" /></div></label></div>}</section>
            <section className="ib-property-side-section"><div className="ib-property-featured-heading"><h3>Featured Property</h3><input type="checkbox" role="switch" aria-label="Featured Property" checked={featured} onChange={(e) => setFeatured(e.target.checked)} /></div><p>Mark as featured to highlight this property on the homepage.</p><div className="ib-property-info"><Info /><span>Featured properties appear in the featured carousel on homepage.</span></div></section>
            <section className="ib-property-side-section ib-property-tips"><h3><Lightbulb />Quick Tips</h3><ul><li>Use high quality images (minimum 1200px width)</li><li>Provide accurate size and pricing</li><li>Add as many amenities as possible</li><li>Make sure location is correct on the map</li><li>Featured properties get more visibility</li></ul></section>
          </aside>
        </div>
      </>}
    </div>
  );
}