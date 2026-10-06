import SectionTitle from "@/components/common/SectionTitle"
import ShippingRates from "@/components/ui/forms/ShippingRates";

function Page() {
  return (
    <section className="section min-h-svh">
      <div className="container mx-auto px-4 flex justify-center">
        <SectionTitle>Shipping Rates</SectionTitle>
      </div>
      <ShippingRates />
    </section>
  )
}

export default Page