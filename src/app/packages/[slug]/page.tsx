import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { tours } from '@/data/tours';
import { formatPrice, calculateDiscount, getWhatsAppUrl } from '@/lib/utils';
import { SITE_CONFIG } from '@/lib/constants';
import { Check, X, Thermometer, CalendarDays, TrendingUp, Phone, MessageCircle } from 'lucide-react';
import BookingForm from '@/components/destination/BookingForm';
import ItineraryTimeline from '@/components/destination/ItineraryTimeline';
import DestinationGallery from '@/components/destination/DestinationGallery';
import TourDetailHero from '@/components/destination/TourDetailHero';
import TourSectionBlock from '@/components/destination/TourSectionBlock';
import TechGrid from '@/components/effects/TechGrid';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tour = tours.find((t) => t.slug === slug);
  if (!tour) return { title: 'Tour Not Found' };
  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: `${tour.title} | ${tour.duration} | ${formatPrice(tour.price)}`,
    description: tour.shortDescription,
    openGraph: {
      title: tour.title,
      description: tour.shortDescription,
      images: [{ url: tour.image, width: 1200, height: 630 }],
    },
  };
}

export default async function TourDetailPage({ params }: Props) {
  const { slug } = await params;
  const tour = tours.find((t) => t.slug === slug);
  if (!tour) notFound();

  const discount = calculateDiscount(tour.originalPrice, tour.price);

  const tourSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.title,
    description: tour.description,
    image: tour.images,
    offers: {
      '@type': 'Offer',
      price: tour.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    touristType: tour.difficulty,
    itinerary: {
      '@type': 'ItemList',
      itemListElement: tour.itinerary.map((day, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: day.title,
        description: day.description,
      })),
    },
    provider: {
      '@type': 'TravelAgency',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tourSchema).replace(/</g, '\\u003c') }}
      />

      <TourDetailHero
        tour={{
          title: tour.title,
          slug: tour.slug,
          image: tour.image,
          duration: tour.duration,
          startLocation: tour.startLocation,
          maxGroupSize: tour.maxGroupSize,
          altitude: tour.altitude,
          rating: tour.rating,
          reviewCount: tour.reviewCount,
          difficulty: tour.difficulty,
          price: tour.price,
          originalPrice: tour.originalPrice,
          dayCount: tour.itinerary.length,
        }}
        discount={discount}
      />

      {/* Content */}
      <section className="section relative bg-snow overflow-hidden">
        <TechGrid variant="light" animated={false} />
        <div className="container-main relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-14">
            <TourSectionBlock code="Brief_01" title="Mission Overview">
              <p className="text-muted leading-relaxed text-base border-l-2 border-cyan-500/30 pl-5">
                {tour.description}
              </p>
            </TourSectionBlock>

            <TourSectionBlock code="Brief_02" title="Route Highlights" id="highlights">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tour.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 tech-card hover:!transform-none group"
                  >
                    <span className="font-mono text-[10px] text-cyan-600 shrink-0 pt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <TrendingUp className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-charcoal text-sm font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </TourSectionBlock>

            <TourSectionBlock code="Brief_03" title="Day-wise Itinerary" id="itinerary">
              <p className="font-mono text-xs text-muted mb-6 -mt-2">
                {tour.itinerary.length} operational days · full route breakdown below
              </p>
              <ItineraryTimeline itinerary={tour.itinerary} />
            </TourSectionBlock>

            <TourSectionBlock code="Brief_04" title="Package Details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="tech-card p-6">
                  <h3 className="font-mono text-xs text-mountain tracking-widest uppercase mb-4 flex items-center gap-2">
                    <Check className="w-4 h-4" /> Inclusions
                  </h3>
                  <ul className="space-y-2.5">
                    {tour.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-muted">
                        <Check className="w-4 h-4 text-mountain flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="tech-card p-6">
                  <h3 className="font-mono text-xs text-red-500 tracking-widest uppercase mb-4 flex items-center gap-2">
                    <X className="w-4 h-4" /> Exclusions
                  </h3>
                  <ul className="space-y-2.5">
                    {tour.exclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-muted">
                        <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TourSectionBlock>

            <TourSectionBlock code="Brief_05" title="Environmental Intel" id="weather">
              <div className="tech-card p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Thermometer className="w-5 h-5 text-cyan-500" />
                  <span className="font-mono text-xs text-cyan-600 tracking-widest uppercase">Weather_Data</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {[
                    { label: 'OPTIMAL', value: tour.weatherInfo.bestMonths.join(', ') },
                    { label: 'MIN_TEMP', value: tour.weatherInfo.temperature.min },
                    { label: 'MAX_TEMP', value: tour.weatherInfo.temperature.max },
                    { label: 'RAINFALL', value: tour.weatherInfo.rainfall },
                  ].map((item) => (
                    <div key={item.label} className="p-4 rounded-lg bg-cyan-500/5 border border-cyan-500/15 text-center">
                      <p className="font-mono text-[9px] text-cyan-600/70 tracking-widest mb-1">{item.label}</p>
                      <p className="font-semibold text-sm text-charcoal">{item.value}</p>
                    </div>
                  ))}
                </div>
                <p className="text-muted text-sm border-l-2 border-cyan-500/20 pl-4">{tour.weatherInfo.tips}</p>
              </div>
            </TourSectionBlock>

            <TourSectionBlock code="Brief_06" title="Field Protocols" id="tips">
              <ul className="space-y-3">
                {tour.travelTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-4 tech-card p-4 hover:!transform-none">
                    <span className="w-8 h-8 rounded-md bg-gradient-to-br from-cyan-500 to-primary flex items-center justify-center text-white font-mono text-xs font-bold shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm text-muted leading-relaxed pt-1">{tip}</span>
                  </li>
                ))}
              </ul>
            </TourSectionBlock>

            <TourSectionBlock code="Brief_07" title="Visual Reconnaissance" id="gallery">
              <DestinationGallery images={tour.images} title={tour.title} />
            </TourSectionBlock>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <div className="tech-card p-6 corner-accent">
                <p className="font-mono text-[10px] text-cyan-600 tracking-widest uppercase mb-3">Book_Route</p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-heading font-bold text-charcoal">{formatPrice(tour.price)}</span>
                  {tour.originalPrice > tour.price && (
                    <span className="text-muted line-through text-sm">{formatPrice(tour.originalPrice)}</span>
                  )}
                </div>
                <p className="font-mono text-xs text-muted mb-5">per person · {tour.duration}</p>

                <div className="flex items-center gap-2 mb-6 p-3 rounded-md bg-cyan-500/5 border border-cyan-500/15">
                  <CalendarDays className="w-4 h-4 text-cyan-500 shrink-0" />
                  <span className="text-sm text-muted">
                    <span className="font-mono text-[10px] text-cyan-600 block">SEASON</span>
                    {tour.bestSeason}
                  </span>
                </div>

                <Link
                  href={`/contact?tour=${tour.slug}`}
                  className="btn btn-primary w-full !rounded-md !py-3 mb-3"
                >
                  Book This Tour
                </Link>

                <a
                  href={getWhatsAppUrl(SITE_CONFIG.whatsapp, `Hi! I'm interested in the "${tour.title}" package (${formatPrice(tour.price)}). Can you share more details?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#25D366] text-white font-semibold rounded-md hover:bg-[#20b358] transition-colors text-sm border-2 border-[#1fb855]"
                >
                  <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                </a>

                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 mt-3 border-2 border-border text-charcoal font-medium rounded-md hover:border-cyan-500 hover:text-cyan-700 transition-all text-sm"
                >
                  <Phone className="w-4 h-4" /> Call Us Now
                </a>
              </div>

              <BookingForm
                tour={{
                  title: tour.title,
                  slug: tour.slug,
                  price: tour.price,
                  duration: tour.duration,
                }}
              />

              {/* Quick nav */}
              <div className="tech-card p-5">
                <p className="font-mono text-[10px] text-cyan-600 tracking-widest uppercase mb-3">Quick_Nav</p>
                <nav className="flex flex-col gap-1">
                  {[
                    { href: '#itinerary', label: 'Itinerary' },
                    { href: '#highlights', label: 'Highlights' },
                    { href: '#weather', label: 'Weather' },
                    { href: '#tips', label: 'Field Tips' },
                    { href: '#gallery', label: 'Gallery' },
                  ].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="font-mono text-xs text-muted hover:text-cyan-600 py-1.5 px-2 rounded hover:bg-cyan-500/5 transition-colors"
                    >
                      → {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
