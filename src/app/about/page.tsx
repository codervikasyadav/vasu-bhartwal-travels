import Image from 'next/image';
import { Metadata } from 'next';
import { Shield, Award, Users, Heart, CheckCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import PageHero from '@/components/ui/PageHero';
import SectionHeader from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  title: 'About Us',
  description: `Learn about ${SITE_CONFIG.name} — your trusted partner for sacred Himalayan pilgrimages and adventure tours.`,
};

const values = [
  { icon: Shield, title: 'Safety First', description: 'Every journey is backed by certified guides, emergency protocols, and comprehensive safety measures.' },
  { icon: Heart, title: 'Passion for Himalayas', description: 'Born and raised in the mountains, our love for the Himalayas drives everything we do.' },
  { icon: Users, title: 'Community Focus', description: 'We support local communities, hire local guides, and promote sustainable tourism practices.' },
  { icon: Award, title: 'Excellence', description: 'Rated 4.8/5 by 10,000+ travelers. We don\'t compromise on quality, comfort, or experience.' },
];

const team = [
  { name: 'Vikas Yadav', role: 'Founder & CEO', bio: '15+ years in Himalayan tourism. Born in Rishikesh, he founded Travel Wale Bhai Ji to share the sacred beauty of Uttarakhand with the world.' },
  { name: 'Priya Sharma', role: 'Head of Operations', bio: 'Expert in logistics and planning with 10+ years of experience managing complex mountain expeditions and pilgrimage tours.' },
  { name: 'Vikram Negi', role: 'Lead Trek Guide', bio: 'Certified mountaineer with 500+ successful treks. Trained in wilderness first aid and high-altitude rescue operations.' },
  { name: 'Meera Joshi', role: 'Travel Consultant', bio: 'Passionate traveler who has explored every corner of Uttarakhand. She helps craft personalized itineraries for every guest.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero title="Our Story" subtitle="A decade of creating unforgettable Himalayan experiences" image="/images/hero/hero-bg.png" />

      <section className="section bg-snow">
        <div className="container-main max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="text-center md:text-left">
              <h2 className="font-heading text-3xl md:text-4xl text-charcoal mb-6 leading-tight text-center md:text-left">
                Born in the <span className="text-saffron italic">Mountains</span>
              </h2>
              <div className="space-y-4 text-muted leading-relaxed text-center md:text-left">
                <p>Travel Wale Bhai Ji was founded in 2026 by Vikas Yadav, a native of Rishikesh who grew up with the Himalayas as his backyard. What started as a passion for sharing sacred pilgrimages has grown into one of Uttarakhand&apos;s most trusted travel companies.</p>
                <p>We&apos;ve guided over 10,000 travelers across the most revered corners of the Indian Himalayas — from the sacred Char Dham temples to the mystical Adi Kailash and the blooming Valley of Flowers.</p>
                <p>Our mission is simple: to make the transformative power of Himalayan travel accessible, safe, and deeply meaningful for every traveler who trusts us.</p>
              </div>
            </div>
            <div className="relative h-72 md:h-96 rounded-xl overflow-hidden">
              <Image src="/images/destinations/char-dham.png" alt="Himalayan landscape" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-main">
          <SectionHeader
            eyebrow="Values"
            title="Our Values"
            subtitle="The principles that guide every journey we create"
            align="center"
            className="w-full"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div key={v.title} className="card p-6 text-center hover:!transform-none">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-primary to-mountain rounded-lg flex items-center justify-center">
                  <v.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-charcoal mb-2">{v.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-gradient-to-br from-primary via-primary-dark to-charcoal">
        <div className="container-main max-w-4xl text-center">
          <Shield className="w-12 h-12 text-saffron mx-auto mb-6" />
          <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">Your Safety is Our Priority</h2>
          <p className="text-white/60 mb-10 max-w-2xl mx-auto">Every journey with us is backed by comprehensive safety measures</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {[
              'Certified mountain guides with wilderness first-aid training',
              'Emergency oxygen cylinders and first-aid kits on every trip',
              'Real-time weather monitoring and contingency planning',
              'Maximum 1:8 guide-to-traveler ratio on treks',
              'Comprehensive travel insurance included',
              'Satellite phone communication in remote areas',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 bg-white/8 rounded-lg p-4">
                <CheckCircle className="w-5 h-5 text-saffron shrink-0 mt-0.5" />
                <span className="text-white/85 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-main">
          <SectionHeader
            eyebrow="Team"
            title="Meet Our Team"
            subtitle="The passionate people behind your Himalayan journey"
            align="center"
            className="w-full"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member) => (
              <div key={member.name} className="card p-6 text-center hover:!transform-none">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-saffron to-primary rounded-full flex items-center justify-center text-white font-heading text-xl">
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <h3 className="font-semibold text-charcoal">{member.name}</h3>
                <p className="text-saffron text-sm font-medium mb-3">{member.role}</p>
                <p className="text-muted text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
