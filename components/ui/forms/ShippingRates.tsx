import Link from "next/link";

function ShippingRates() {
    return (
        <div className="mx-auto max-w-4xl rounded-2xl border border-gray-300 p-6 lg:p-8">
            <div className="max-w-2xl">
                <h2 className="text-xl font-semibold text-slate-900">Request a route-specific quote</h2>
                <p className="mt-3 leading-7 text-slate-600">
                    Shipping prices depend on the destination, dimensions, service, and current carrier rates. Contact our team for a confirmed quote; this site does not publish unapproved estimates.
                </p>
                <Link href="/quote" className="default mt-6">Request a shipping quote</Link>
            </div>
        </div>
    )
}

export default ShippingRates
