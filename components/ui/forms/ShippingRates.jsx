'use client';

import SectionTitle from "@/components/common/SectionTitle"
import countries from "@/lib/countries"
import { useState } from "react";

function ShippingRates() {
    const [form, setForm] = useState({
        from: '',
        to: '',
        weight: '',
        unit: 'kg',
        type: 'parcel',
    })

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    async function calculateShipping(e) {
        e.preventDefault()

        try {
            const response = await fetch('/api/shipping', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            })

            const data = await response.json()
            console.log(data)

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="max-w-4xl mx-auto p-4 border border-gray-300 rounded-2xl lg:p-6">
            <form className="space-y-6" onSubmit={calculateShipping}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">From</label>
                        <select className="default" required name="from" onChange={handleChange} value={form.from}>
                            <option>Country</option>
                            {countries.map((country) => (
                                <option key={country.code}>{country.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">To</label>
                        <select className="default" required name="to" onChange={handleChange} value={form.to}>
                            <option>Country</option>
                            {countries.map((country) => (
                                <option key={country.code}>{country.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Weight</label>
                        <input
                            type="number"
                            placeholder="e.g. 2.5"
                            className="default"
                            required
                            name="weight"
                            onChange={handleChange}
                            value={form.weight}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Unit</label>
                        <select className="default" name="unit" required onChange={handleChange}>
                            <option value="kg">Kilograms (kg)</option>
                            <option value="lb">Pounds (lb)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Shipment Type</label>
                        <select className="default" name="type" required onChange={handleChange} value={form.type}>
                            <option value="documents">Documents</option>
                            <option value="parcel">Parcel</option>
                        </select>
                    </div>
                </div>

                <div className="pt-4">
                    <button className="default">Calculate Shipping</button>
                </div>
            </form>
        </div>
    )
}

export default ShippingRates