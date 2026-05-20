import Map from "../ui/Map";
import ContactForm from "./ContactFrom";

const MapAndForm = () => {
    return (
        <section className="section">
            <div className="container mx-auto px-4 grid gap-8 lg:grid-cols-[minmax(300px,1fr)_minmax(340px,1fr)]">
                <Map className="min-h-[420px]" />
                <ContactForm />
            </div>
        </section>
    );
};

export default MapAndForm