import ContactHeader from '@/components/contact/ContactHeader';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactForm from '@/components/contact/ContactForm';

/**
 * Contact Page - Trang lien he
 *
 * Cau truc sections:
 * 1. ContactHeader - Hero banner voi tieu de va mo ta
 * 2. ContactInfo - Thong tin lien he (dia chi, SDT, email, gio lam viec, ban do)
 * 3. ContactForm - Form gui tin nhan voi trang thai thanh cong
 */
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* 1. Header */}
      <ContactHeader />

      {/* 2. Noi dung chinh: Thong tin lien he + Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Thong tin lien he */}
            <ContactInfo />

            {/* Form lien he */}
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
