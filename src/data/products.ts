// Product image imports
// Product image imports
import photobookA4Premium from '@/assets/photobook-a4-premium.jpg';
import photobookA4Classic from '@/assets/photobook-a4-classic.jpg';
import calendarDeskA5 from '@/assets/calendar-desk-a5.jpg';
import calendarWallA3 from '@/assets/calendar-wall-a3.jpg';
import wallartAcrylic from '@/assets/wallart-acrylic.jpg';
import wallartDibond from '@/assets/wallart-dibond.jpg';
import frameBasic from '@/assets/frame-basic.jpg';
import framePremium from '@/assets/frame-premium.jpg';
import bannerLfBasic from '@/assets/banner-lf-basic.jpg';
import bannerLfPremium from '@/assets/banner-lf-premium.jpg';
import backlitDaynight from '@/assets/backlit-daynight.jpg';
import windowDecals from '@/assets/window-decals.jpg';

// Mockup imports
import mockupPhotobookOpen from '@/assets/mockup-photobook-open.jpg';
import mockupCalendarDesk from '@/assets/mockup-calendar-desk.jpg';
import mockupCalendarWall from '@/assets/mockup-calendar-wall.jpg';
import mockupWallartAcrylic from '@/assets/mockup-wallart-acrylic.jpg';
import mockupWallartDibond from '@/assets/mockup-wallart-dibond.jpg';
import mockupFramePremium from '@/assets/mockup-frame-premium.jpg';
import mockupBannerLarge from '@/assets/mockup-banner-large.jpg';
import mockupWindowDecals from '@/assets/mockup-window-decals.jpg';
import mockupMagnets from '@/assets/mockup-magnets.jpg';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  category: string;
  features: string[];
  image: string;
  gallery?: string[];
  mockup?: string;
  mockups?: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  rating?: number;
  reviewCount?: number;
  specifications?: {
    [key: string]: string | number;
  };
  detailedDescription?: string;
  useCases?: string[];
  advantages?: string[];
}

export const products = {
  cs: [
    // Fotoknihy
    {
      id: 'photobook-a4-classic',
      name: 'Fotokniha A4 Classic',
      description: 'Klasická fotokniha s matným papírem a měkkou vazbou',
      price: '890 Kč',
      originalPrice: '1190 Kč',
      category: 'photobooks',
      features: ['20-100 stran', 'Matný papír 170g', 'Měkká vazba', 'AI Smart-Fill'],
      image: photobookA4Classic,
      gallery: [photobookA4Classic, mockupPhotobookOpen],
      mockup: mockupPhotobookOpen,
      isNew: true,
      isBestseller: true,
      rating: 4.8,
      reviewCount: 234,
      specifications: {
        format: 'A4 (210×297 mm)',
        pages: '20-100',
        paper: 'Matný 170g/m²',
        binding: 'Měkká vazba'
      },
      detailedDescription: 'Perfektní volba pro uchovávání vzpomínek. Vysoce kvalitní matný papír zajišťuje skvělou reprodukci barev a odolnost proti otisku prstů.',
      useCases: ['Rodinné fotky', 'Cestování', 'Svatební fotografie', 'Dětské vzpomínky'],
      advantages: ['Dostupná cena', 'Rychlé dodání', 'AI automatické rozmístění', 'Ekologický papír']
    },
    {
      id: 'photobook-a4-premium',
      name: 'Fotokniha A4 Premium',
      description: 'Prémiová fotokniha s lesklým papírem a tvrdou vazbou',
      price: '1490 Kč',
      category: 'photobooks',
      features: ['20-100 stran', 'Lesklý papír 200g', 'Tvrdá vazba', 'AI Smart-Fill', 'Ochranný obal'],
      image: photobookA4Premium,
      gallery: [photobookA4Premium, mockupPhotobookOpen],
      mockup: mockupPhotobookOpen,
      rating: 4.9,
      reviewCount: 156,
      specifications: {
        format: 'A4 (210×297 mm)',
        pages: '20-100',
        paper: 'Lesklý 200g/m²',
        binding: 'Tvrdá vazba'
      },
      detailedDescription: 'Luxusní fotokniha pro ty nejdůležitější vzpomínky. Tvrdá vazba a prémiový lesklý papír zajišťují dlouhodobou trvanlivost a skvělé barvy.',
      useCases: ['Svatební album', 'Profesionální portfolio', 'Prestižní dárky', 'Výroční alba'],
      advantages: ['Prémiová kvalita', 'Ochranný obal zdarma', 'Dlouhá životnost', 'Profesionální vzhled']
    },
    
    // Kalendáře
    {
      id: 'calendar-desk-a5',
      name: 'Stolní kalendář A5',
      description: 'Praktický stolní kalendář se spirálovou vazbou',
      price: '450 Kč',
      category: 'calendars',
      features: ['13 listů', 'Spirálová vazba', 'Matný papír', 'Vlastní fotky'],
      image: calendarDeskA5,
      gallery: [calendarDeskA5, mockupCalendarDesk],
      mockup: mockupCalendarDesk,
      rating: 4.7,
      reviewCount: 189,
      specifications: {
        format: 'A5 (148×210 mm)',
        sheets: 13,
        binding: 'Spirálová vazba',
        paper: 'Matný 250g/m²'
      },
      detailedDescription: 'Praktický stolní kalendář, který vám zpříjemní každý den. Vysoká kvalita tisku a praktická spirálová vazba pro snadné listování.',
      useCases: ['Kancelářský stůl', 'Domácí pracovna', 'Dárek pro kolegy', 'Plánování úkolů'],
      advantages: ['Kompaktní velikost', 'Vysoká kvalita tisku', 'Vlastní fotografie', 'Rychlé dodání']
    },
    {
      id: 'calendar-wall-a3',
      name: 'Nástěnný kalendář A3',
      description: 'Velký nástěnný kalendář s očky pro zavěšení',
      price: '690 Kč',
      category: 'calendars',
      features: ['13 listů', 'Závěsná očka', 'Lesklý papír', 'UV lak'],
      image: calendarWallA3,
      gallery: [calendarWallA3, mockupCalendarWall],
      mockup: mockupCalendarWall,
      isBestseller: true,
      rating: 4.9,
      reviewCount: 267,
      specifications: {
        format: 'A3 (297×420 mm)',
        sheets: 13,
        finishing: 'Závěsná očka + UV lak',
        paper: 'Lesklý 300g/m²'
      },
      detailedDescription: 'Velký nástěnný kalendář pro maximální přehled. UV lak zajišťuje dlouhodobou odolnost barev a ochránný povrch.',
      useCases: ['Obývací pokoj', 'Kancelář', 'Kuchyň', 'Chodba'],
      advantages: ['Velká velikost', 'UV ochrana', 'Silný papír', 'Profesionální závěs']
    },
    
    // Wall-Art
    {
      id: 'wallart-acrylic',
      name: 'Wall Art Akryl',
      description: 'Prémiový tisk na akrylové sklo s magnetickými držáky',
      price: '1990 Kč/m²',
      category: 'wallart',
      features: ['10mm akryl', 'UV tisk', 'Magnetické držáky', 'WHITE podklad'],
      image: wallartAcrylic,
      gallery: [wallartAcrylic, mockupWallartAcrylic],
      mockup: mockupWallartAcrylic,
      isNew: true,
      rating: 4.8,
      reviewCount: 145,
      specifications: {
        material: 'Akrylové sklo 10mm',
        print: 'UV + WHITE podklad',
        mounting: 'Magnetické držáky',
        'min_size': '200×200 mm'
      },
      detailedDescription: 'Luxusní Wall Art tisk na křišťálově čisté akrylové sklo. Magnetický systém umožňuje elegantní instalaci bez vrtání.',
      useCases: ['Moderní interiéry', 'Galerie', 'Kanceláře', 'Showroomy'],
      advantages: ['Bez vrtání', 'Křišťálová čistota', 'Luxusní vzhled', 'Snadná montáž']
    },
    {
      id: 'wallart-dibond',
      name: 'Wall Art Dibond',
      description: 'Odolný tisk na hliníkové desce s WHITE podkladem',
      price: '1490 Kč/m²',
      category: 'wallart',
      features: ['3mm Dibond', 'UV tisk', 'WHITE podklad', 'Lehký a odolný'],
      image: wallartDibond,
      gallery: [wallartDibond, mockupWallartDibond],
      mockup: mockupWallartDibond,
      isBestseller: true,
      rating: 4.9,
      reviewCount: 298,
      specifications: {
        material: 'Dibond 3mm',
        print: 'UV + WHITE podklad',
        mounting: 'Závěsný systém',
        'weather_resistant': true
      },
      detailedDescription: 'Profesionální tisk na kompozitní hliníkové desce. Ideální kombinace kvality, odolnosti a dostupné ceny.',
      useCases: ['Exteriéry', 'Interiéry', 'Výstavy', 'Reklamní plochy'],
      advantages: ['Odolnost proti povětrnosti', 'Lehká váha', 'Dlouhá životnost', 'Profesionální kvalita']
    },
    
    // Frame Builder
    {
      id: 'frame-basic',
      name: 'Frame Builder Basic',
      description: 'Základní rámování s výběrem z 15 profilů',
      price: '290 Kč/LM',
      category: 'frames',
      features: ['15 profilů', 'Sklo 2mm', 'Zadní stěna', 'Zavěšení'],
      image: frameBasic,
      gallery: [frameBasic, mockupFramePremium],
      mockup: mockupFramePremium,
      rating: 4.6,
      reviewCount: 167,
      specifications: {
        profiles: 15,
        glass: 'Základní sklo 2mm',
        backing: 'Karton 3mm',
        'max_size': '1000×1400 mm'
      },
      detailedDescription: 'Dostupné profesionální rámování pro každodenní potřeby. Výběr z 15 kvalitních profilů pokryje většinu požadavků.',
      useCases: ['Fotografie', 'Dokumenty', 'Certifikáty', 'Plakáty'],
      advantages: ['Dostupná cena', 'Rychlé zpracování', 'Kvalitní sklo', 'Spolehlivé zavěšení']
    },
    {
      id: 'frame-premium',
      name: 'Frame Builder Premium',
      description: 'Premium rámování s paspartou a muzejním sklem',
      price: '590 Kč/LM',
      category: 'frames',
      features: ['30+ profilů', 'Muzejní sklo', 'Pasparty', 'Profesionální zavěšení'],
      image: framePremium,
      gallery: [framePremium, mockupFramePremium],
      mockup: mockupFramePremium,
      isBestseller: true,
      rating: 4.9,
      reviewCount: 234,
      specifications: {
        profiles: '30+',
        glass: 'Muzejní sklo UV',
        matting: 'Pasparty různé barvy',
        'max_size': '1200×1600 mm'
      },
      detailedDescription: 'Profesionální rámování muzejní kvality. Muzejní sklo s UV ochranou a pasparty v různých barvách pro perfektní prezentaci.',
      useCases: ['Umělecká díla', 'Cenné fotografie', 'Výstavy', 'Prezentace'],
      advantages: ['Muzejní kvalita', 'UV ochrana', 'Velký výběr profilů', 'Pasparty v ceně']
    },
    
    // Bannery
    {
      id: 'banner-lf-basic',
      name: 'Banner LF Basic',
      description: 'Základní velkoformátový banner s lemy',
      price: '150 Kč/m²',
      category: 'banners',
      features: ['Lemy 2cm', 'Očka co 50cm', 'Latex tisk', 'Venkovní použití'],
      image: bannerLfBasic,
      gallery: [bannerLfBasic, mockupBannerLarge],
      mockup: mockupBannerLarge,
      rating: 4.5,
      reviewCount: 145,
      specifications: {
        material: 'Banner 510g/m²',
        finishing: 'Lemy + očka',
        print: 'Latex UV odolný',
        'max_width': '3200 mm'
      },
      detailedDescription: 'Spolehlivý banner pro venkovní i vnitřní použití. Odolný latex tisk a kvalitní lemování zajišťují dlouhou životnost.',
      useCases: ['Reklama', 'Akce', 'Výstavy', 'Sportovní události'],
      advantages: ['Odolnost', 'Rychlé dodání', 'Velké formáty', 'Dobrá cena']
    },
    {
      id: 'banner-lf-premium',
      name: 'Banner LF Premium',
      description: 'Premium banner s tunýlky a rohovými výztuhami',
      price: '250 Kč/m²',
      category: 'banners',
      features: ['Tunýlky', 'Rohové výztuhy', 'Latex tisk', 'B1 certifikát'],
      image: bannerLfPremium,
      gallery: [bannerLfPremium, mockupBannerLarge],
      mockup: mockupBannerLarge,
      isNew: true,
      rating: 4.8,
      reviewCount: 89,
      specifications: {
        material: 'Banner 680g/m² B1',
        finishing: 'Tunýlky + výztuhy',
        print: 'Latex UV odolný',
        certification: 'B1 ohnivzdorný'
      },
      detailedDescription: 'Prémiový ohnivzdorný banner s tunýlky pro tyče a rohovými výztuhami. Ideální pro dlouhodobé venkovní instalace.',
      useCases: ['Dlouhodobá reklama', 'Fasády', 'Velkoplošné bannery', 'Bezpečnostní zóny'],
      advantages: ['B1 certifikát', 'Tunýlky pro tyče', 'Rohové výztuhy', 'Maximální odolnost']
    },
    
    // Backlit
    {
      id: 'backlit-daynight',
      name: 'Backlit Day&Night',
      description: 'Speciální tisk pro podsvícení CL+WHITE+CL',
      price: '890 Kč/m²',
      category: 'backlit',
      features: ['Triple vrstva', 'LED kompatibilní', 'Day&Night efekt', 'Weather proof'],
      image: backlitDaynight,
      gallery: [backlitDaynight],
      isNew: true,
      rating: 4.7,
      reviewCount: 67,
      specifications: {
        layers: 'CL + WHITE + CL',
        'led_compatible': true,
        'weather_resistant': true,
        'max_width': '3200 mm'
      },
      detailedDescription: 'Inovativní technologie trojité vrstvy pro dokonalý Day&Night efekt. LED kompatibilní pro rovnoměrné podsvícení.',
      useCases: ['Lightboxy', 'Reklamní panely', 'Podsvícené vitríny', 'LED instalace'],
      advantages: ['Day&Night efekt', 'LED optimalizace', 'Odolnost', 'Rovnoměrné osvětlení']
    },
    
    // Window Decals
    {
      id: 'window-decals',
      name: 'Window Decals',
      description: 'Okenní polepy s oboustranným tiskem a ořezem',
      price: '690 Kč/m²',
      category: 'decals',
      features: ['Front/White/Back', 'Precizní ořez', 'UV odolné', 'Snadno odlepitelné'],
      image: windowDecals,
      gallery: [windowDecals, mockupWindowDecals],
      mockup: mockupWindowDecals,
      rating: 4.6,
      reviewCount: 123,
      specifications: {
        print: 'Oboustranný + WHITE',
        cutting: 'CNC ořez',
        adhesive: 'Snadno odlepitelné',
        'uv_resistant': true
      },
      detailedDescription: 'Profesionální okenní polepy s oboustranným tiskem a precizním CNC ořezem. Snadno aplikovatelné a odlepitelné.',
      useCases: ['Výlohy obchodů', 'Kancelářské okna', 'Reklamní akce', 'Soukromí'],
      advantages: ['Oboustranný tisk', 'Precizní ořez', 'Snadná aplikace', 'Bez lepkavých zbytků']
    },
    
    // Magnets - přidám nový produkt
    {
      id: 'magnets-custom',
      name: 'Custom Magnety',
      description: 'Reklamní magnety s vlastním designem',
      price: '290 Kč/m²',
      category: 'magnets',
      features: ['Silný magnet', 'UV tisk', 'Libovolný tvar', 'Rychlé dodání'],
      image: mockupMagnets,
      gallery: [mockupMagnets],
      mockup: mockupMagnets,
      rating: 4.4,
      reviewCount: 156,
      specifications: {
        material: 'Magnetická fólie',
        thickness: '0.8mm',
        print: 'UV odolný',
        cutting: 'Libovolný tvar'
      },
      detailedDescription: 'Praktické reklamní magnety s vysokou přilnavostí a UV odolným tiskem. Možnost výroby v libovolných tvarech.',
      useCases: ['Reklama', 'Suvenýry', 'Informační magnety', 'Firemní prezenty'],
      advantages: ['Silná přilnavost', 'UV odolnost', 'Vlastní tvar', 'Dlouhá životnost']
    }
  ] as Product[],
  
  en: [
    // Photobooks
    {
      id: 'photobook-a4-classic',
      name: 'Photobook A4 Classic',
      description: 'Classic photobook with matte paper and soft cover',
      price: '€36',
      originalPrice: '€48',
      category: 'photobooks',
      features: ['20-100 pages', 'Matte paper 170g', 'Soft cover', 'AI Smart-Fill'],
      image: photobookA4Classic,
      gallery: [photobookA4Classic, mockupPhotobookOpen],
      mockup: mockupPhotobookOpen,
      isNew: true,
      isBestseller: true,
      rating: 4.8,
      reviewCount: 234,
      specifications: {
        format: 'A4 (210×297 mm)',
        pages: '20-100',
        paper: 'Matte 170g/m²',
        binding: 'Soft cover'
      },
      detailedDescription: 'Perfect choice for preserving memories. High-quality matte paper ensures excellent color reproduction and fingerprint resistance.',
      useCases: ['Family photos', 'Travel memories', 'Wedding photography', 'Children\'s memories'],
      advantages: ['Affordable price', 'Quick delivery', 'AI automatic layout', 'Eco-friendly paper']
    },
    {
      id: 'photobook-a4-premium',
      name: 'Photobook A4 Premium', 
      description: 'Premium photobook with glossy paper and hardcover',
      price: '€60',
      category: 'photobooks',
      features: ['20-100 pages', 'Glossy paper 200g', 'Hardcover', 'AI Smart-Fill', 'Protective case'],
      image: photobookA4Premium,
      gallery: [photobookA4Premium, mockupPhotobookOpen],
      mockup: mockupPhotobookOpen,
      rating: 4.9,
      reviewCount: 156,
      specifications: {
        format: 'A4 (210×297 mm)',
        pages: '20-100',
        paper: 'Glossy 200g/m²',
        binding: 'Hardcover'
      },
      detailedDescription: 'Luxury photobook for your most important memories. Hardcover and premium glossy paper ensure long-term durability and great colors.',
      useCases: ['Wedding albums', 'Professional portfolios', 'Prestigious gifts', 'Anniversary albums'],
      advantages: ['Premium quality', 'Free protective case', 'Long lifespan', 'Professional appearance']
    },
    
    // Calendars
    {
      id: 'calendar-desk-a5',
      name: 'Desktop Calendar A5',
      description: 'Practical desktop calendar with spiral binding',
      price: '€18',
      category: 'calendars',
      features: ['13 sheets', 'Spiral binding', 'Matte paper', 'Custom photos'],
      image: calendarDeskA5,
      gallery: [calendarDeskA5, mockupCalendarDesk],
      mockup: mockupCalendarDesk,
      rating: 4.7,
      reviewCount: 189,
      specifications: {
        format: 'A5 (148×210 mm)',
        sheets: 13,
        binding: 'Spiral binding',
        paper: 'Matte 250g/m²'
      },
      detailedDescription: 'Practical desktop calendar that will brighten up your day. High print quality and practical spiral binding for easy page turning.',
      useCases: ['Office desk', 'Home office', 'Gifts for colleagues', 'Task planning'],
      advantages: ['Compact size', 'High print quality', 'Custom photos', 'Quick delivery']
    },
    {
      id: 'calendar-wall-a3',
      name: 'Wall Calendar A3',
      description: 'Large wall calendar with hanging eyelets',
      price: '€28',
      category: 'calendars',
      features: ['13 sheets', 'Hanging eyelets', 'Glossy paper', 'UV coating'],
      image: calendarWallA3,
      gallery: [calendarWallA3, mockupCalendarWall],
      mockup: mockupCalendarWall,
      isBestseller: true,
      rating: 4.9,
      reviewCount: 267,
      specifications: {
        format: 'A3 (297×420 mm)',
        sheets: 13,
        finishing: 'Hanging eyelets + UV coating',
        paper: 'Glossy 300g/m²'
      },
      detailedDescription: 'Large wall calendar for maximum overview. UV coating ensures long-term color durability and protective surface.',
      useCases: ['Living room', 'Office', 'Kitchen', 'Hallway'],
      advantages: ['Large size', 'UV protection', 'Heavy paper', 'Professional hanging']
    }
  ] as Product[]
};