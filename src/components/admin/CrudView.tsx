/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export type CrudField = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "select" | "number" | "email";
  options?: string[];
  placeholder?: string;
  required?: boolean;
  inTable?: boolean;
  status?: boolean;
};

export type CrudViewProps = {
  table: string;
  title: string;
  subtitle: string;
  singular: string;
  fields: CrudField[];
  orderBy?: string;
};

type Row = Record<string, any>;

export function CrudView({ table, title, subtitle, singular, fields, orderBy = "created_at" }: CrudViewProps) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Row | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Row>({});
  const [query, setQuery] = useState("");

  const emptyForm = useMemo(() => {
    const base: Row = {};
    for (const field of fields) {
      base[field.key] = field.type === "select" ? (field.options?.[0] ?? "") : field.type === "number" ? 0 : "";
    }
    return base;
  }, [fields]);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: loadError } = await (supabase.from(table as any) as any)
      .select("*")
      .order(orderBy, { ascending: false });
    if (loadError) setError(loadError.message);
    else {
      setError(null);
      setRows((data as Row[]) ?? []);
    }
    setLoading(false);
  }, [table, orderBy]);

  useEffect(() => {
    void load();
  }, [load]);

  function openAdd() {
    setEditing(null);
    setForm(emptyForm);
    setNotice(null);
    setOpen(true);
  }

  function openEdit(row: Row) {
    const next: Row = {};
    for (const field of fields) next[field.key] = row[field.key] ?? "";
    setEditing(row);
    setForm(next);
    setNotice(null);
    setOpen(true);
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    const payload: Row = { ...form };
    for (const field of fields) {
      if (field.type === "number") payload[field.key] = Number(payload[field.key] ?? 0);
    }
    const request = editing
      ? (supabase.from(table as any) as any).update(payload).eq("id", editing["id"])
      : (supabase.from(table as any) as any).insert(payload);
    const { error: saveError } = await request;
    setSaving(false);
    if (saveError) {
      setError(saveError.message);
      return;
    }
    setError(null);
    setOpen(false);
    setNotice(editing ? `${singular} updated.` : `${singular} added.`);
    await load();
  }

  async function remove(row: Row) {
    if (!window.confirm(`Delete this ${singular.toLowerCase()}? This cannot be undone.`)) return;
    const { error: deleteError } = await (supabase.from(table as any) as any).delete().eq("id", row["id"]);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    setError(null);
    setNotice(`${singular} deleted.`);
    await load();
  }

  const tableFields = fields.filter((field) => field.inTable !== false);
  const visibleRows = query.trim()
    ? rows.filter((row) =>
        tableFields.some((field) => String(row[field.key] ?? "").toLowerCase().includes(query.trim().toLowerCase())),
      )
    : rows;

  return (
    <>
      <div className="ib-admin-page-header">
        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <Button onClick={openAdd}>
          <Plus /> Add {singular}
        </Button>
      </div>

      {notice && (
        <div className="ib-admin-notice" role="status">
          {notice}
        </div>
      )}
      {error && (
        <div className="ib-admin-notice" role="alert">
          {error}
        </div>
      )}

      <section className="ib-admin-card">
        <div className="ib-admin-card-header">
          <div>
            <h3>{title}</h3>
            <p className="ib-admin-card-subtitle">
              {rows.length} record{rows.length === 1 ? "" : "s"} — add, edit or delete below.
            </p>
          </div>
          <div className="ib-admin-row-actions">
            <input
              className="ib-admin-inline-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${title.toLowerCase()}…`}
              aria-label={`Search ${title}`}
            />
            <Button variant="outline" size="sm" onClick={openAdd}>
              <Plus /> Add {singular}
            </Button>
          </div>
        </div>
        <div className="ib-admin-table-wrap">
          {loading ? (
            <div className="ib-admin-empty">Loading…</div>
          ) : visibleRows.length === 0 ? (
            <div className="ib-admin-empty">Nothing here yet. Add your first {singular.toLowerCase()}.</div>
          ) : (
            <table className="ib-admin-data-table">
              <thead>
                <tr>
                  {tableFields.map((field) => (
                    <th key={field.key}>{field.label}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((row) => (
                  <tr key={String(row["id"])}>
                    {tableFields.map((field) => (
                      <td key={field.key}>
                        {field.status ? (
                          <span className={`ib-admin-status ${String(row[field.key] ?? "").toLowerCase().replace(/\s+/g, "-")}`}>
                            {String(row[field.key] ?? "")}
                          </span>
                        ) : (
                          String(row[field.key] ?? "")
                        )}
                      </td>
                    ))}
                    <td>
                      <div className="ib-admin-row-actions">
                        <Button variant="ghost" size="icon" aria-label={`Edit ${singular}`} onClick={() => openEdit(row)}>
                          <Pencil />
                        </Button>
                        <Button variant="ghost" size="icon" aria-label={`Delete ${singular}`} onClick={() => remove(row)}>
                          <Trash2 />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {open && (
        <div
          className="ib-admin-dialog-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <section className="ib-admin-dialog" role="dialog" aria-modal="true" aria-label={`${editing ? "Edit" : "Add"} ${singular}`}>
            <div className="ib-admin-dialog-header">
              <div>
                <h2>
                  {editing ? "Edit" : "Add New"} {singular}
                </h2>
                <p>{subtitle}</p>
              </div>
              <Button variant="ghost" size="icon" aria-label="Close form" onClick={() => setOpen(false)}>
                <X />
              </Button>
            </div>
            <form className="ib-admin-form" onSubmit={save}>
              <div className="ib-admin-form-grid">
                {fields
                  .filter((field) => field.type !== "textarea")
                  .map((field) => (
                    <label key={field.key}>
                      {field.label}
                      {field.type === "select" ? (
                        <select
                          value={String(form[field.key] ?? "")}
                          onChange={(event) => setForm({ ...form, [field.key]: event.target.value })}
                        >
                          {(field.options ?? []).map((option) => (
                            <option key={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type === "number" ? "number" : field.type === "email" ? "email" : "text"}
                          step={field.type === "number" ? "any" : undefined}
                          required={field.required !== false}
                          value={String(form[field.key] ?? "")}
                          placeholder={field.placeholder}
                          onChange={(event) => setForm({ ...form, [field.key]: event.target.value })}
                        />
                      )}
                    </label>
                  ))}
              </div>
              {fields
                .filter((field) => field.type === "textarea")
                .map((field) => (
                  <label key={field.key}>
                    {field.label}
                    <textarea
                      rows={4}
                      value={String(form[field.key] ?? "")}
                      placeholder={field.placeholder}
                      onChange={(event) => setForm({ ...form, [field.key]: event.target.value })}
                    />
                  </label>
                ))}
              <div className="ib-admin-dialog-actions">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving…" : editing ? "Save Changes" : `Add ${singular}`}
                </Button>
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
