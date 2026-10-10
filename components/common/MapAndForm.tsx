import Map from "../ui/Map";
import ContactForm from "./ContactFrom";

const MapAndForm = () => {
    return (
        <section className="section" id="components-common-mapandform-section-1">
            <div className="container mx-auto space-y-8 px-4 lg:space-y-10">
                <ContactForm />
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-[0_18px_55px_-30px_rgba(15,23,42,0.3)]">
                    <Map className="min-h-[300px] max-h-[380px]" />
                </div>
            </div>
        </section>
    );
};

export default MapAndForm
