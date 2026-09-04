import type { Metadata } from "next";
import { ContactDetails, ContactForm } from "@/components/sections/ContactForm";
import { PageHero } from "@/components/ui/PageHero";
import { images } from "@/data/images";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a campaign with ASA.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk."
        description="Tell us about the brand, the board, or the digital flight you need. We reply within two working days."
        image={images.contact}
      />
      <section className="site-shell grid gap-16 pb-28 md:grid-cols-12">
        <div className="md:col-span-7">
          <ContactForm />
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <ContactDetails />
        </div>
      </section>
    </>
  );
}
