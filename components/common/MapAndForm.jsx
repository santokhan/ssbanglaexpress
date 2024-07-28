import Map from "../ui/Map";
import ContactForm from "./ContactFrom";

const MapAndForm = () => {
    return (
        <section className="section">
            <div className="container mx-auto px-4 flex flex-row flex-wrap">
                <Map className="basis-96 flex-grow" />
                <ContactForm className="basis-96 flex-grow" />
            </div>
        </section>
    );
};

export default MapAndForm