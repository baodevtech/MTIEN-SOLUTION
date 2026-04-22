import ContactHeader from '@/components/contact/ContactHeader';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactForm from '@/components/contact/ContactForm';
import { ThemedSection } from '@/components/theme/ThemedPage';

export default function ContactPage() {
  return (
    <div className="bg-[#f8f9fa] text-zinc-900 overflow-hidden font-sans selection:bg-rose-200 selection:text-zinc-900 min-h-screen pt-20">
      <ThemedSection pageId="contact" sectionId="header">
        <ContactHeader />
      </ThemedSection>

      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 flex-col">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <ThemedSection pageId="contact" sectionId="info">
                <ContactInfo />
              </ThemedSection>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <ThemedSection pageId="contact" sectionId="form">
                <ContactForm />
              </ThemedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
