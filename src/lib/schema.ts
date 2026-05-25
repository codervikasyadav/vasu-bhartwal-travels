import type { Tour, FAQ, BlogPost } from '@/types';
import { SITE_CONFIG } from '@/lib/constants';

/**
 * Generates JSON-LD schema for the travel agency (Organization / TravelAgency).
 */
export function generateTravelAgencySchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Vasu Barthwal Street',
      addressLocality: 'Noida',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.0869,
      longitude: 78.2676,
    },
    image: `${SITE_CONFIG.url}/images/og-image.png`,
    logo: `${SITE_CONFIG.url}/images/logo.png`,
    foundingDate: SITE_CONFIG.founded,
    sameAs: [
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.youtube,
      SITE_CONFIG.social.twitter,
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: SITE_CONFIG.stats.rating,
      reviewCount: SITE_CONFIG.stats.travelers.replace(/[^0-9]/g, ''),
      bestRating: '5',
      worstRating: '1',
    },
    priceRange: '₹₹-₹₹₹',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '06:00',
      closes: '22:00',
    },
  };
}

/**
 * Generates JSON-LD schema for a tour package (TouristTrip).
 */
export function generateTourSchema(tour: Tour) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.title,
    description: tour.description,
    url: `${SITE_CONFIG.url}/packages/${tour.slug}`,
    image: `${SITE_CONFIG.url}${tour.image}`,
    touristType: tour.category,
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: tour.itinerary.length,
      itemListElement: tour.itinerary.map((day) => ({
        '@type': 'ListItem',
        position: day.day,
        name: day.title,
        description: day.description,
      })),
    },
    offers: {
      '@type': 'Offer',
      price: tour.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString().split('T')[0],
      seller: {
        '@type': 'TravelAgency',
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tour.rating,
      reviewCount: tour.reviewCount,
      bestRating: '5',
      worstRating: '1',
    },
    provider: {
      '@type': 'TravelAgency',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      telephone: SITE_CONFIG.phone,
    },
    subjectOf: {
      '@type': 'CreativeWork',
      abstract: tour.shortDescription,
    },
    maximumAttendeeCapacity: tour.maxGroupSize,
    duration: tour.duration,
  };
}

/**
 * Generates JSON-LD schema for a FAQ page (FAQPage).
 */
export function generateFAQSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generates JSON-LD schema for a blog post (BlogPosting).
 */
export function generateBlogSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_CONFIG.url}${post.image}`,
    url: `${SITE_CONFIG.url}/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
      url: SITE_CONFIG.url,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}/blog/${post.slug}`,
    },
    articleSection: post.category,
    keywords: post.tags.join(', '),
    wordCount: post.content.split(/\s+/).length,
    timeRequired: post.readTime,
  };
}

/**
 * Generates JSON-LD schema for breadcrumb navigation (BreadcrumbList).
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http')
        ? item.url
        : `${SITE_CONFIG.url}${item.url}`,
    })),
  };
}
