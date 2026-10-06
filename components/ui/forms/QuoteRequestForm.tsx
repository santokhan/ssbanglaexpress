"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Package, Plane, Shirt, Sparkles } from "lucide-react";
import { submitQuote } from "@/app/actions/requests";

type RequestType = "shipping" | "sourcing" | "manufacturing";
type QuoteValues = Record<string, string>;

const inputClass = "mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#b81e46] focus:ring-4 focus:ring-[#b81e46]/10";
const labelClass = "block text-sm font-semibold text-slate-700";
const serviceOptions: { value: RequestType; title: string; text: string; icon: typeof Plane }[] = [
  { value: "shipping", title: "Ship a package", text: "Send goods from Bangladesh", icon: Plane },
  { value: "sourcing", title: "Source products", text: "Find the right products for you", icon: Package },
  { value: "manufacturing", title: "Make a product", text: "Develop or manufacture a design", icon: Shirt },
];

export default function QuoteRequestForm() {
  const [step, setStep] = useState(0);
  const [type, setType] = useState<RequestType>("shipping");
  const [values, setValues] = useState<QuoteValues>({ origin: "Bangladesh" });
  const [consent, setConsent] = useState(false);
  const [requestId, setRequestId] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const panels = useRef<(HTMLDivElement | null)[]>([]);

  function update(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function next() {
    const panel = panels.current[step];
    if (!panel) return;
    const invalid = panel.querySelector<HTMLElement>(":invalid");
    if (invalid) {
      (invalid as HTMLInputElement).reportValidity();
      return;
    }
    setError("");
    setStep((current) => Math.min(current + 1, 2));
  }

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent) {
      setError("Please agree to the privacy notice before sending your request.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const result = await submitQuote({ type, ...values, consent });
      if (!result.ok) throw new Error(result.error);
      setRequestId(result.id);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "We couldn't save your request. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const field = (name: string, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <label className={labelClass}>{label}<input className={inputClass} name={name} value={values[name] ?? ""} onChange={update} {...props} /></label>
  );

  if (requestId) return (
    <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
      <div className="px-6 py-14 text-center sm:px-12">
        <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-emerald-50 text-emerald-600"><CheckCircle2 size={34} /></div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[.2em] text-emerald-700">Request received</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Thanks, {values.fullName}.</h2>
        <p className="mx-auto mt-3 max-w-md leading-7 text-slate-600">Your request is saved. Our team will review the details and get back to you using the contact information you provided.</p>
        <div className="mx-auto mt-8 max-w-sm rounded-2xl bg-slate-50 p-5"><p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Your reference</p><p className="mt-2 text-xl font-bold tracking-wide text-[#a61940]">{requestId}</p></div>
      </div>
    </div>
  );

  const steps = ["Your request", "Details", "Review"];
  return (
    <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_24px_80px_-35px_rgba(15,23,42,.28)]">
      <div className="border-b border-slate-100 bg-gradient-to-r from-[#fff7f8] via-white to-[#fffaf5] px-6 py-7 sm:px-10">
        <div className="flex items-center justify-between gap-3">
          {steps.map((label, index) => <div key={label} className="flex flex-1 items-center gap-3">
            <div className={`grid size-9 shrink-0 place-items-center rounded-full text-sm font-bold ${index <= step ? "bg-[#b81e46] text-white" : "bg-slate-100 text-slate-400"}`}>{index < step ? <Check size={16} /> : `0${index + 1}`}</div>
            <span className={`hidden text-sm font-semibold sm:block ${index === step ? "text-slate-900" : "text-slate-400"}`}>{label}</span>
            {index < steps.length - 1 && <div className={`h-px flex-1 ${index < step ? "bg-[#b81e46]/50" : "bg-slate-200"}`} />}
          </div>)}
        </div>
        <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[#a61940]"><Sparkles size={14} /> Usually takes about 2 minutes</div>
      </div>

      <form onSubmit={submitRequest}>
        <div className="px-6 py-8 sm:px-10 sm:py-10">
          <div ref={(el) => { panels.current[0] = el; }} hidden={step !== 0}>
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">What can we help you with?</h2><p className="mt-2 text-sm leading-6 text-slate-500">Choose a service, then tell us how to reach you.</p>
            <fieldset className="mt-6 grid gap-3 md:grid-cols-3"><legend className="sr-only">Choose a service</legend>{serviceOptions.map(({ value, title, text, icon: Icon }) => <button type="button" key={value} onClick={() => setType(value)} className={`rounded-2xl border p-4 text-left transition ${type === value ? "border-[#b81e46] bg-[#fff7f8] ring-2 ring-[#b81e46]/10" : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"}`}><span className={`grid size-10 place-items-center rounded-xl ${type === value ? "bg-[#b81e46] text-white" : "bg-slate-100 text-slate-600"}`}><Icon size={19} /></span><span className="mt-4 block text-sm font-bold text-slate-900">{title}</span><span className="mt-1 block text-xs leading-5 text-slate-500">{text}</span></button>)}</fieldset>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">{field("fullName", "Your name", { autoComplete: "name", required: true, maxLength: 100, placeholder: "e.g. Ayesha Rahman" })}{field("email", "Email address", { type: "email", autoComplete: "email", required: true, maxLength: 254, placeholder: "you@example.com" })}{field("phone", "Phone / WhatsApp", { type: "tel", autoComplete: "tel", required: true, maxLength: 30, placeholder: "+880 1XXX-XXXXXX" })}</div>
          </div>

          <div ref={(el) => { panels.current[1] = el; }} hidden={step !== 1}>
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">A few more details</h2><p className="mt-2 text-sm leading-6 text-slate-500">This helps our team prepare a useful, accurate response.</p>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">{field("origin", "Origin country", { required: true, maxLength: 80, placeholder: "Bangladesh" })}{field("destination", "Destination country", { required: true, maxLength: 80, placeholder: "United Kingdom" })}
              {field("itemType", type === "shipping" ? "What are you sending?" : "Product / design details", { required: true, maxLength: 300, placeholder: "Briefly describe the goods or product" })}
              {type === "shipping" ? <>{field("weight", "Approximate total weight (kg)", { type: "number", min: "0.1", step: "0.1", required: true, placeholder: "e.g. 25" })}{field("cartons", "Number of cartons", { type: "number", min: "1", step: "1", required: true, placeholder: "e.g. 3" })}{field("dimensions", "Carton dimensions (L × W × H cm)", { maxLength: 80, placeholder: "e.g. 40 × 30 × 25" })}</> : <>{field("quantity", "Estimated quantity", { type: "number", min: "1", required: true, placeholder: "e.g. 500" })}{field("sizeRange", "Size range (optional)", { maxLength: 120, placeholder: "e.g. S–XL" })}{field("material", "Fabric / material (optional)", { maxLength: 160, placeholder: "e.g. 100% cotton" })}{field("targetPrice", "Target price and currency (optional)", { maxLength: 80, placeholder: "e.g. USD 8 per piece" })}</>}
              <label className={`${labelClass} sm:col-span-2`}>Anything else we should know? <textarea className={`${inputClass} resize-y`} name="details" rows={3} maxLength={1500} value={values.details ?? ""} onChange={update} placeholder="Timeline, service preference, or other requirements" /></label>
            </div>
          </div>

          <div ref={(el) => { panels.current[2] = el; }} hidden={step !== 2}>
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">Review your request</h2><p className="mt-2 text-sm leading-6 text-slate-500">Check your details. Our team will follow up directly.</p>
            <div className="mt-6 divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-slate-50/70 px-5">{[["Service", serviceOptions.find((item) => item.value === type)?.title], ["Name", values.fullName], ["Email", values.email], ["Phone / WhatsApp", values.phone], ["Route", `${values.origin} → ${values.destination}`], ["Request details", values.itemType], [type === "shipping" ? "Weight / cartons" : "Estimated quantity", type === "shipping" ? `${values.weight} kg / ${values.cartons} cartons` : values.quantity], ["Additional notes", values.details]].filter(([, value]) => value).map(([label, value]) => <div key={label} className="grid gap-1 py-3 sm:grid-cols-[155px_1fr]"><span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</span><span className="break-words text-sm font-medium text-slate-800">{value}</span></div>)}</div>
            <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 p-4 text-sm leading-6 text-slate-600"><input className="mt-1 size-4 shrink-0 accent-[#b81e46]" type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} /><span>I agree that SS Bangla Group may use these details to respond to my request. See our <a className="font-semibold text-[#a61940] underline underline-offset-2" href="/privacy">Privacy notice</a>.</span></label>
          </div>

          {error && <p className="mt-5 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700" role="alert">{error}</p>}
        </div>
        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          {step > 0 ? <button type="button" onClick={() => { setError(""); setStep((current) => current - 1); }} className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-white hover:text-slate-900"><ArrowLeft size={16} /> Back</button> : <p className="text-xs text-slate-500">Your details are only used to respond to this request.</p>}
          {step < 2 ? <button type="button" onClick={next} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#b81e46] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#b81e46]/20 transition hover:-translate-y-0.5 hover:bg-[#94183a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b81e46]">Continue <ArrowRight size={16} /></button> : <button type="submit" disabled={saving} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#b81e46] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#b81e46]/20 transition hover:-translate-y-0.5 hover:bg-[#94183a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b81e46] disabled:cursor-wait disabled:opacity-60">{saving ? "Saving request…" : "Send quote request"} <ArrowRight size={16} /></button>}
        </div>
      </form>
    </div>
  );
}
