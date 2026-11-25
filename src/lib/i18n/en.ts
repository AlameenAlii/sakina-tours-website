// English dictionary — source of truth for the site's copy shape.
// `Translations = typeof en`, so ar.ts is compile-checked against this file.
// Year interpolation uses the literal token %YEAR%.

const en = {
  nav: {
    home: "Home",
    tours: "Tours & Experiences",
    products: "Our Products",
    plan: "Plan Your Experience",
    cancellation: "Cancellation, Changes and Refunds",
    cancellationShort: "Cancellation & Refunds",
    privacy: "Privacy Policy",
    about: "About Us",
    howItWorks: "How It Works",
    faq: "FAQ",
    contact: "Contact Us",
    language: "Language",
    switchLanguage: "Switch to Arabic",
    toggleMenu: "Open menu",
    closeMenu: "Close menu",
    menu: "Menu",
  },

  brand: {
    name: "Sakina Tours",
    line: "People of Madinah",
    logoAlt: "Sakina Tours — tours and experiences in Madinah",
    tagline: "Tours and experiences in Madinah, arranged personally.",
  },

  common: {
    sendRequest: "Send Your Request on WhatsApp",
    planExperience: "Plan Your Experience",
    requestCustom: "Request a Custom Experience",
    askProducts: "Ask About Our Products on WhatsApp",
    askOnWhatsapp: "Ask on WhatsApp",
    whatsapp: "WhatsApp",
    requestNotice:
      "Sending a request does not confirm a booking. Our team will contact you on WhatsApp to confirm availability, details and pricing.",
    skipToContent: "Skip to content",
    basedIn: "Madinah, Saudi Arabia",
    readMore: "Read more",
    viewAll: "View all",
    required: "Required",
    optional: "Optional",
    backHome: "Back to Home",
    email: "Email",
    instagram: "Instagram",
    tiktok: "TikTok",
    responseHours: "Response hours",
    location: "Location",
    mapTitle: "Map showing Madinah, Saudi Arabia",
    openMap: "Open in maps",
    scrollHint: "Scroll to explore",
    perPerson: "per person",
    from: "From",
    sar: "SAR",
  },

  home: {
    meta: {
      title: "Sakina Tours | Madinah Tours & Experiences",
      description:
        "Explore Madinah tours and experiences with local planning and direct WhatsApp support. Send a request for a visit tailored to your interests.",
    },
    hero: {
      eyebrow: "Madinah · Saudi Arabia",
      title: "Experience Madinah with those who know it best",
      lead: "Discover the history, culture and character of Madinah through thoughtfully arranged tours and experiences, with flexible planning and direct WhatsApp support.",
      ctaPrimary: "Plan Your Experience",
      ctaSecondary: "Send Your Request on WhatsApp",
      imageAlt: "Madinah at golden hour seen through date palms, with basalt hills behind the city",
      badge: "Arabic and English hosts",
    },
    marks: {
      local: "Based in Madinah",
      bilingual: "Arabic & English",
      flexible: "Flexible planning",
      whatsapp: "Direct WhatsApp support",
    },
    about: {
      eyebrow: "About Us",
      title: "A local host for your visit to Madinah",
      body: "Sakina Tours is a locally based Madinah business created to help visitors experience the city in a more personal, welcoming and convenient way. We focus on warm hospitality, clear communication and thoughtful coordination with local service providers according to the needs of each experience.",
      imageAlt: "Arabic coffee poured from a brass dallah beside a plate of Ajwa dates",
      pillars: {
        hospitality: {
          title: "Warm hospitality",
          body: "You are received as a guest of the city, with time taken to understand what matters to you.",
        },
        clarity: {
          title: "Clear communication",
          body: "Details, inclusions and pricing are confirmed in writing on WhatsApp before anything is arranged.",
        },
        coordination: {
          title: "Thoughtful coordination",
          body: "We work with local providers and shape each experience around your interests and pace.",
        },
      },
    },
    how: {
      eyebrow: "How It Works",
      title: "From your first message to a confirmed plan",
      lead: "Three steps, one WhatsApp conversation, nothing agreed before you see the details and the price.",
      steps: {
        one: {
          title: "Tell us about your visit",
          body: "Share your dates, group size, interests and the pace that suits you.",
        },
        two: {
          title: "We review and reply on WhatsApp",
          body: "We review your request and send you an idea and price on WhatsApp.",
        },
        three: {
          title: "Your booking is confirmed",
          body: "Your booking is confirmed after you accept the proposal and complete any required payment.",
        },
      },
      notice: "Sending a request alone does not confirm a booking.",
    },
    why: {
      eyebrow: "Why Sakina Tours",
      title: "Planned around you, not around a fixed schedule",
      lead: "Warm hospitality, clear communication and flexible planning around your time and interests.",
      items: {
        local: {
          title: "Genuinely local",
          body: "We live here. Routes, timings and quiet hours are chosen the way a resident would choose them.",
        },
        bilingual: {
          title: "Arabic and English",
          body: "Request and correspond in either language, and we confirm the language of your experience in the proposal.",
        },
        flexible: {
          title: "Flexible planning",
          body: "Families, small groups and solo visitors are all arranged around the time you actually have.",
        },
        direct: {
          title: "One direct line",
          body: "A single WhatsApp conversation from first question to confirmed details — no call centre.",
        },
      },
    },
    tours: {
      eyebrow: "Tours & Experiences",
      title: "Experiences shaped around your days in Madinah",
      lead: "Heritage mornings, palm groves, crafts and markets, family days and golden-hour viewpoints — each one adjusted to your dates and pace.",
      cta: "View all experiences",
    },
    products: {
      eyebrow: "Our Products",
      title: "Ajwa dates from Madinah",
      lead: "Two Ajwa date selections, offered through a direct WhatsApp enquiry so weight, packaging, availability and price are confirmed with you personally.",
      cta: "See our products",
    },
    testimonials: {
      eyebrow: "Guest notes",
      title: "What guests tell us afterwards",
      items: {
        one: {
          quote:
            "They understood that we had one free afternoon and built the whole route around it. Nothing felt rushed.",
          name: "Yusuf A.",
          origin: "Manchester, United Kingdom",
        },
        two: {
          quote:
            "Everything was agreed on WhatsApp before we arrived — the price, the timing, the car. No surprises at all.",
          name: "Nadia H.",
          origin: "Casablanca, Morocco",
        },
        three: {
          quote:
            "Our host noticed my mother could not walk long distances and quietly adjusted the stops. That mattered to us.",
          name: "Imran S.",
          origin: "Kuala Lumpur, Malaysia",
        },
      },
    },
    custom: {
      eyebrow: "Custom experience",
      title: "Have something specific in mind?",
      lead: "Tell us the places, interests and timing that matter to you, and we will shape the day around them.",
      cta: "Plan Your Experience",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Frequently asked questions",
      lead: "The answers guests ask for most, before sending a request.",
      items: {
        confirm: {
          q: "Does sending a request confirm a booking?",
          a: "No. A booking is confirmed only after you agree to the details, receive written confirmation and complete any required payment.",
        },
        price: {
          q: "When will I receive a price?",
          a: "We will share a price on WhatsApp after reviewing your request, the services needed and availability.",
        },
        private: {
          q: "Can I request a private experience?",
          a: "Yes. Tell us your dates and interests so we can explore suitable options.",
        },
        language: {
          q: "Is the service available in Arabic and English?",
          a: "You can contact us in Arabic or English. We will confirm the available language for your experience in the proposal.",
        },
        transport: {
          q: "Can I request transportation?",
          a: "Yes. Mention it in your request, and we will confirm the option, availability and price before you decide.",
        },
        changes: {
          q: "Can I change the date or guest count?",
          a: "Message us on WhatsApp. Changes depend on availability and may affect pricing.",
        },
        payment: {
          q: "Can I pay on the website?",
          a: "The website does not accept payments at present. We will explain payment arrangements with your proposal.",
        },
        policy: {
          q: "What is the cancellation and refund policy?",
          a: "See the Cancellation, Changes and Refunds page. External services may have additional terms disclosed before payment.",
        },
      },
      policyLink: "Read the full cancellation policy",
    },
    contact: {
      eyebrow: "Contact Us",
      title: "Talk to us directly",
      body: "Tell us when you are visiting Madinah and what you would like to explore. Send your request on WhatsApp, and we will follow up to confirm the details.",
      whatsappLabel: "WhatsApp",
      locationLabel: "Location",
      locationValue: "Madinah, Saudi Arabia",
      emailLabel: "Email",
      socialLabel: "Follow us",
      hoursLabel: "Response hours",
      cta: "Send Your Request on WhatsApp",
      formLink: "Or complete the full request form",
    },
  },

  tours: {
    meta: {
      title: "Madinah Tours & Experiences | Sakina Tours",
      description:
        "Explore upcoming Madinah experiences or request a private Madinah tour tailored to your visit.",
    },
    hero: {
      eyebrow: "Tours & Experiences",
      title: "Tours and experiences in Madinah",
      lead: "We are currently preparing a carefully selected collection of tours and experiences in Madinah. Tell us what you are looking for, and we will help arrange an experience that suits your time and interests.",
      imageAlt: "Old basalt-paved street in Madinah at first light",
    },
    filters: {
      all: "All experiences",
      label: "Filter by theme",
    },
    themes: {
      heritage: "Heritage",
      nature: "Palm groves & nature",
      culture: "Culture & crafts",
      family: "Family friendly",
    },
    labels: {
      duration: "Duration",
      groupSize: "Group size",
      startPoint: "Starting point",
      pickup: "Pickup",
      languages: "Languages",
      includes: "Included",
      excludes: "Not included",
      priceFrom: "Indicative price from",
      highlights: "Highlights",
      details: "Show details",
      detailsHide: "Hide details",
      enquire: "Ask about this experience",
      guests: "guests",
      hours: "hours",
    },
    cta: {
      title: "Nothing here matches your visit?",
      lead: "Tell us your dates, interests and pace, and we will shape an experience around them.",
      button: "Request a Custom Experience",
    },
  },

  products: {
    meta: {
      title: "Ajwa Al-Aliyah & Ajwa Madinah Dates | Sakina Tours",
      description:
        "Explore Ajwa Al-Aliyah Dates and Ajwa Madinah Dates from Sakina Tours. Ask about packaging, availability and pricing on WhatsApp.",
    },
    hero: {
      eyebrow: "Our Products",
      title: "Our Products",
      lead: "We currently offer two Ajwa date products: Ajwa Al-Aliyah and Ajwa Madinah. Message us on WhatsApp to ask about pack sizes, packaging, availability and pricing before placing a request.",
    },
    labels: {
      weight: "Pack sizes",
      packaging: "Packaging",
      availability: "Availability",
      price: "Indicative price",
      enquire: "Ask on WhatsApp",
      specs: "At a glance",
      notes: "Serving & keeping",
    },
    assurance: {
      title: "How product enquiries work",
      items: {
        one: "Send an enquiry and tell us the pack size and quantity you have in mind.",
        two: "We confirm current availability, packaging and price on WhatsApp.",
        three: "Collection in Madinah or delivery is arranged personally after you confirm.",
      },
    },
    cta: {
      title: "Ask us about either selection",
      lead: "We will confirm weight, packaging, availability and price before anything is arranged.",
      button: "Ask About Our Products on WhatsApp",
    },
  },

  plan: {
    meta: {
      title: "Plan a Private Madinah Experience | Sakina Tours",
      description:
        "Request a private Madinah tour or experience suited to your dates, interests and travel needs.",
    },
    hero: {
      eyebrow: "Plan Your Experience",
      title: "Plan Your Experience",
      lead: "Tell us when you are visiting and what interests you. We will review your request and reply on WhatsApp with available options, details and pricing.",
    },
    aside: {
      title: "What happens next",
      steps: {
        one: "Your details open in WhatsApp as a ready-to-send message.",
        two: "We review availability and the services your visit needs.",
        three: "You receive an idea, inclusions and a price in writing.",
      },
      privacyTitle: "Your information",
      privacyBody:
        "We use your details only to answer your request and coordinate the service. Nothing is sold to third parties.",
      privacyLink: "Read our Privacy Policy",
    },
    form: {
      sections: {
        about: "About you",
        visit: "Your visit",
        group: "Your group",
        preferences: "Preferences",
        extra: "Anything else",
      },
      labels: {
        name: "Full name",
        phone: "WhatsApp number",
        countryCode: "Country code",
        email: "Email",
        arrival: "Arrival date",
        departure: "Departure date",
        adults: "Adults",
        children: "Children",
        language: "Preferred language",
        duration: "Preferred duration",
        interests: "Interests",
        places: "Places you would like to visit",
        pickup: "Pickup location",
        transport: "Do you need a car or bus?",
        accessibility: "Mobility or accessibility needs",
        budget: "Approximate budget",
        notes: "Additional notes",
        consent:
          "I agree to the Privacy Policy and to being contacted on WhatsApp about this request.",
      },
      placeholders: {
        name: "e.g. Yusuf Ahmed",
        phone: "50 000 0000",
        email: "you@example.com",
        places: "e.g. Uhud area, old town, palm farms",
        pickup: "Hotel name or district in Madinah",
        accessibility: "Wheelchair, limited walking, pram, anything we should plan for",
        budget: "e.g. 800 SAR total",
        notes: "Anything that would help us plan",
        select: "Select an option",
      },
      hints: {
        phone: "Include your country code so we can reach you on WhatsApp.",
        interests: "Choose as many as you like.",
        children: "Children aged 12 and under.",
      },
      languageOptions: {
        arabic: "Arabic",
        english: "English",
        either: "Arabic or English",
      },
      durationOptions: {
        half: "Half day (up to 4 hours)",
        full: "Full day (6–8 hours)",
        evening: "Evening only",
        multi: "Across several days",
        unsure: "Not sure yet",
      },
      interestOptions: {
        heritage: "Heritage and history",
        nature: "Palm groves and nature",
        culture: "Culture and crafts",
        food: "Food and local produce",
        photography: "Photography",
        shopping: "Dates and gifts",
        family: "Family friendly",
        quiet: "Quiet, unhurried pace",
      },
      transportOptions: {
        car: "Yes — a private car",
        bus: "Yes — a bus or van for a group",
        none: "No — we will arrange our own transport",
        unsure: "Not sure yet",
      },
      submit: "Send Your Request on WhatsApp",
      submitHint: "Your request opens in WhatsApp so you can review it before sending.",
      reset: "Clear the form",
      notice:
        "Sending a request is not a confirmed booking. Our team will confirm availability, services and pricing on WhatsApp before any payment.",
      errorSummary: "Please review the highlighted fields.",
      opened: "WhatsApp should now be open with your request. Send the message to reach us.",
      openManually: "If WhatsApp did not open, tap here.",
    },
    validation: {
      nameRequired: "Please enter your name.",
      nameShort: "Please enter your full name.",
      phoneRequired: "Please enter your WhatsApp number.",
      phoneInvalid: "Enter a valid number, including the country code.",
      emailInvalid: "Enter a valid email address, or leave this field empty.",
      arrivalRequired: "Please choose your arrival date.",
      arrivalPast: "Arrival cannot be in the past.",
      departureRequired: "Please choose your departure date.",
      departureOrder: "Departure must be on or after your arrival date.",
      adultsRequired: "Please enter the number of adults.",
      adultsMin: "At least one adult is required.",
      adultsMax: "For groups above 40, please message us on WhatsApp.",
      childrenInvalid: "Children cannot be a negative number.",
      languageRequired: "Please choose a preferred language.",
      durationRequired: "Please choose a preferred duration.",
      interestsRequired: "Please choose at least one interest.",
      pickupRequired: "Please tell us where to collect you.",
      transportRequired: "Please tell us whether you need transport.",
      consentRequired: "Please accept the Privacy Policy to continue.",
    },
  },

  cancellation: {
    meta: {
      title: "Cancellation, Changes and Refunds | Sakina Tours",
      description:
        "Read how requests, confirmed bookings, changes and refunds are handled at Sakina Tours.",
    },
    hero: {
      eyebrow: "Policy",
      title: "Cancellation, Changes and Refunds",
      intro:
        "These initial terms apply to Sakina Tours services unless we disclose specific terms for an experience before payment.",
    },
    groups: {
      requests: "Requests and confirmation",
      cancelling: "Cancelling and changing",
      thirdParty: "Third-party services and exceptions",
      refunds: "Refunds",
    },
    terms: {
      one: "Sending a request through the website or WhatsApp does not confirm a booking.",
      two: "A booking is confirmed only after we send written confirmation stating the price and included services and receive any required payment.",
      three:
        "You may cancel or request a date change free of charge more than 48 hours before the service begins, except for non-refundable third-party charges disclosed before payment.",
      four: "If you cancel between 24 and 48 hours before the service, 50% of the amount due for Sakina Tours services may be refunded.",
      five: "If you cancel less than 24 hours before the service or do not attend, the amount is non-refundable.",
      six: "Date changes depend on availability and may change the price.",
      seven:
        "Hotels, tickets, transport and other third-party services follow the provider's terms. We will disclose those terms before payment is confirmed.",
      eight:
        "If Sakina Tours cancels a service, you may choose an alternative date or a refund of the amount paid for the cancelled service.",
      nine: "For circumstances beyond our control, such as weather, site closures or official decisions, we will offer an alternative date or route where possible. Amounts will be handled according to services already provided and applicable third-party terms.",
      ten: "Eligible refunds will be returned to the original payment method within 7 to 14 business days.",
      eleven:
        "Any trip-specific terms will be disclosed before payment and included in the booking confirmation.",
    },
    aside: {
      title: "Need to change something?",
      body: "Message us on WhatsApp with your name and dates. We will confirm what is possible and what it affects.",
      cta: "Send Your Request on WhatsApp",
      note: "These terms concern tours and services. They are not a product-returns policy.",
    },
  },

  privacy: {
    meta: {
      title: "Privacy Policy | Sakina Tours",
      description:
        "How we use visitor request information, coordinate services and handle correction or deletion requests.",
    },
    hero: {
      eyebrow: "Policy",
      title: "Privacy Policy",
      lead: "This policy explains what we collect when you send a request, how we use it, and how to ask us to correct or delete it.",
    },
    sections: {
      collect: {
        title: "What we collect",
        body: "We collect the details you share through our request form or WhatsApp, such as your name, contact details, travel dates, guest count, interests, transport or accessibility needs, or details of a product enquiry.",
      },
      use: {
        title: "How we use it",
        body: "We use this information only to respond to your request or enquiry and coordinate the service. We do not sell your information.",
      },
      share: {
        title: "When we share it",
        body: "With your consent, we may share only the details needed to fulfil a confirmed booking with a transport provider, hotel or guide.",
      },
      whatsapp: {
        title: "WhatsApp",
        body: "WhatsApp communications are also subject to WhatsApp's own privacy policies.",
      },
      rights: {
        title: "Correction and deletion",
        body: "You can request a correction or deletion of your information by contacting us through WhatsApp or the email address shown in the Contact section on our Home page. If a legal obligation or an ongoing transaction prevents immediate deletion of some information, we will explain this in our response.",
      },
    },
    aside: {
      title: "Contact us about your data",
      body: "Send us a message and we will confirm what we hold and what you would like changed.",
      cta: "Send Your Request on WhatsApp",
    },
  },

  footer: {
    tagline:
      "Tours, experiences and Ajwa dates from Madinah — arranged personally and confirmed on WhatsApp.",
    pagesTitle: "Pages",
    sectionsTitle: "On this site",
    policiesTitle: "Policies",
    contactTitle: "Contact",
    legalTitle: "Legal",
    legalNameLabel: "Legal name",
    unifiedNumberLabel: "Unified national number",
    crLabel: "Commercial registration",
    tourismLicenceLabel: "Tourism licence",
    rights: "© %YEAR% Sakina Tours. All rights reserved.",
    noBooking: "No online booking or payment is available on this website.",
    whatsappCta: "Send Your Request on WhatsApp",
  },

  root: {
    notFound: {
      code: "404",
      title: "This page could not be found",
      lead: "The page you were looking for may have moved. Try the Home page, or send us a message and we will point you to it.",
      home: "Back to Home",
    },
    error: {
      title: "Something went wrong",
      lead: "Please try again. If the problem continues, message us on WhatsApp and we will help right away.",
      retry: "Try again",
      home: "Back to Home",
    },
  },
} as const;

export type Translations = typeof en;
export default en;
