import ContactHeader from '@/components/contact/ContactHeader';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactForm from '@/components/contact/ContactForm';
import { ThemedSection } from '@/components/theme/ThemedPage';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <ThemedSection pageId="contact" sectionId="header">
        <ContactHeader />
      </ThemedSection>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ThemedSection pageId="contact" sectionId="info">
              <ContactInfo />
            </ThemedSection>
            <ThemedSection pageId="contact" sectionId="form">
              <ContactForm />
            </ThemedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
