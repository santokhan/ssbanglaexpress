"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";

const dimensions = [
  { name: "length", label: "Length", placeholder: "Length in cm" },
  { name: "width", label: "Width", placeholder: "Width in cm" },
  { name: "height", label: "Height", placeholder: "Height in cm" },
] as const;

export default function VolumetricWeightCalculator() {
  const [values, setValues] = useState({ length: "", width: "", height: "" });
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const length = Number(values.length);
    const width = Number(values.width);
    const height = Number(values.height);
    if (![length, width, height].every((value) => Number.isFinite(value) && value > 0)) {
      setError("Enter a valid measurement for length, width, and height.");
      setResult(null);
      return;
    }
    setError("");
    setResult((length * width * height) / 5000);
  }

  return (
    <section aria-labelledby="volumetric-heading" className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-8 lg:p-10" id="components-ui-forms-volumetricweightcalculator-section-1">
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-12">
        <div className="mx-auto w-full max-w-xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#b81e46]">Quick estimate</p>
              <h2 id="volumetric-heading" className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Volumetric weight</h2>
            </div>
            <span className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-semibold text-[#a7193d] ring-1 ring-inset ring-rose-100">All measurements in cm</span>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-500">Enter your parcel dimensions to estimate its volumetric weight.</p>
          <form onSubmit={calculate} className="mt-7 space-y-4">
            {dimensions.map(({ name, label, placeholder }) => (
              <label key={name} className="block">
                <span className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</span>
                <span className="flex items-center rounded-xl border border-slate-200 bg-slate-50/70 transition focus-within:border-[#b81e46] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#b81e46]/10">
                  <input
                    aria-label={`${label} in centimeters`}
                    className="min-w-0 flex-1 rounded-xl bg-transparent px-4 py-3 text-base font-medium text-slate-900 outline-none placeholder:font-normal placeholder:text-slate-400"
                    type="number"
                    min="0.1"
                    step="any"
                    inputMode="decimal"
                    placeholder={placeholder}
                    value={values[name]}
                    onChange={(event) => setValues((current) => ({ ...current, [name]: event.target.value }))}
                    required
                  />
                  <span className="mr-3 rounded-lg bg-white px-2.5 py-1 text-xs font-semibold text-slate-500 shadow-sm">cm</span>
                </span>
              </label>
            ))}
            <button className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#c51e46] to-[#df3449] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-rose-900/15 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-rose-900/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b81e46]" type="submit">
              Calculate volumetric weight
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
            </button>
          </form>
          <div className="mt-5 rounded-2xl border border-rose-100 bg-gradient-to-r from-rose-50 to-white px-5 py-4" aria-live="polite">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Estimated volumetric weight</p>
            <p className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950">
              {result !== null ? <><span className="text-[#b81e46]">{result.toFixed(2)}</span> <span className="text-base font-bold text-slate-600">kg</span></> : <span className="text-slate-300">— <span className="text-base font-bold">kg</span></span>}
            </p>
            {error && <p role="alert" className="mt-2 text-sm font-medium text-rose-700">{error}</p>}
          </div>
        </div>
        <div className="mx-auto w-full max-w-lg rounded-3xl bg-[#fffaf8] p-2 sm:p-4">
          <Image
            src="/images/volumetric-weight.png"
            alt="Volumetric weight guide showing parcel length, width, and height in centimeters, multiplied together and divided by 5000."
            width={1254}
            height={1254}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="h-auto w-full rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
