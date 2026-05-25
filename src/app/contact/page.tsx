import { Suspense } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { getWhatsAppUrl } from '@/lib/utils';
import { InstagramIcon, FacebookIcon, YoutubeIcon, TwitterIcon } from '@/components/icons/SocialIcons';
import PageHero from '@/components/ui/PageHero';
import ContactForm from '@/components/contact/ContactForm';

const socialLinks = [
  { icon: InstagramIcon, href: SITE_CONFIG.social.instagram, label: 'Instagram', color: 'hover:bg-pink-500' },
  { icon: FacebookIcon, href: SITE_CONFIG.social.facebook, label: 'Facebook', color: 'hover:bg-blue-600' },
  { icon: YoutubeIcon, href: SITE_CONFIG.social.youtube, label: 'YouTube', color: 'hover:bg-red-600' },
  { icon: TwitterIcon, href: SITE_CONFIG.social.twitter, label: 'Twitter', color: 'hover:bg-sky-500' },
];

function ContactFormFallback() {
  return <div className="card p-6 md:p-8 h-[420px] animate-pulse bg-cream/50 w-full" />;
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Get In Touch"
        subtitle="Reach our travel team by form, phone, or WhatsApp — we respond within 2 hours"
        code="CONTACT"
        gradient
      />

      <section className="section bg-snow">
        <div className="container-main grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="w-full">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal mb-6 text-left">
              Send Us a Message
            </h2>
            <Suspense fallback={<ContactFormFallback />}>
              <ContactForm />
            </Suspense>
          </div>

          <div className="w-full space-y-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal mb-2 text-left">
              Contact Information
            </h2>
            <div className="space-y-4">
              {[
                { icon: MapPin, title: 'Office Address', content: SITE_CONFIG.address },
                { icon: Phone, title: 'Phone', content: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone}` },
                { icon: Mail, title: 'Email', content: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
                { icon: Clock, title: 'Office Hours', content: 'Mon – Sat: 9AM – 7PM · Sun: 10AM – 4PM' },
              ].map((item) => (
                <div
                  key={item.title}
                  className="card p-5 flex items-start gap-4 hover:!transform-none border-2 text-left"
                >
                  <div className="w-10 h-10 bg-saffron/10 rounded-lg flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-saffron" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal text-sm">{item.title}</h3>
                    {item.href ? (
                      <a href={item.href} className="text-muted text-sm mt-0.5 hover:text-saffron transition-colors block">
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-muted text-sm mt-0.5 leading-relaxed">{item.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <a
              href={getWhatsAppUrl(SITE_CONFIG.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-[#25D366] text-white p-5 rounded-xl border-2 border-[#1fb855] hover:bg-[#20b358] transition-colors text-left"
            >
              <MessageCircle className="w-7 h-7 shrink-0" />
              <div>
                <h3 className="font-semibold">Chat on WhatsApp</h3>
                <p className="text-white/80 text-sm">Quick responses, instant booking</p>
              </div>
            </a>

            <div>
              <h3 className="font-semibold text-charcoal mb-3 text-sm text-left">Follow Us</h3>
              <div className="flex gap-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-lg bg-cream border-2 border-border flex items-center justify-center text-muted ${s.color} hover:text-white transition-all`}
                  >
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="card overflow-hidden h-56 hover:!transform-none p-0 border-2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.789!2d78.2676!3d30.0869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMall+Road+Rishikesh!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
