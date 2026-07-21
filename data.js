// Static in-memory data — no database/backend required.

const destinations = [
  { id: 1, name: "Bali, Indonesia", category: "beach", price: 650, img: "https://picsum.photos/seed/bali/400/300", desc: "Tropical beaches, rice terraces, and vibrant temples." },
  { id: 2, name: "Swiss Alps", category: "mountain", price: 1200, img: "https://picsum.photos/seed/alps/400/300", desc: "Snow-capped peaks and world-class skiing." },
  { id: 3, name: "Kyoto, Japan", category: "cultural", price: 900, img: "https://picsum.photos/seed/kyoto/400/300", desc: "Ancient temples, gardens, and traditional tea houses." },
  { id: 4, name: "Paris, France", category: "city", price: 800, img: "https://picsum.photos/seed/paris/400/300", desc: "Iconic landmarks, art, and world-renowned cuisine." },
  { id: 5, name: "Maldives", category: "beach", price: 1500, img: "https://picsum.photos/seed/maldives/400/300", desc: "Crystal-clear waters and overwater bungalows." },
  { id: 6, name: "Machu Picchu, Peru", category: "mountain", price: 700, img: "https://picsum.photos/seed/machupicchu/400/300", desc: "Ancient Incan ruins high in the Andes mountains." },
  { id: 7, name: "New York City, USA", category: "city", price: 1000, img: "https://picsum.photos/seed/newyork/400/300", desc: "The city that never sleeps — culture, food, and lights." },
  { id: 8, name: "Marrakech, Morocco", category: "cultural", price: 550, img: "https://picsum.photos/seed/marrakech/400/300", desc: "Bustling souks, palaces, and desert adventures." }
];

const hotels = [
  { id: 101, name: "Sunset Beach Resort", location: "Bali, Indonesia", price: 120, rating: 4.6, img: "https://picsum.photos/seed/hotel101/400/300" },
  { id: 102, name: "Alpine Lodge", location: "Swiss Alps", price: 210, rating: 4.8, img: "https://picsum.photos/seed/hotel102/400/300" },
  { id: 103, name: "Kyoto Ryokan Inn", location: "Kyoto, Japan", price: 150, rating: 4.7, img: "https://picsum.photos/seed/hotel103/400/300" },
  { id: 104, name: "Le Petit Hotel", location: "Paris, France", price: 180, rating: 4.5, img: "https://picsum.photos/seed/hotel104/400/300" },
  { id: 105, name: "Overwater Villas", location: "Maldives", price: 350, rating: 4.9, img: "https://picsum.photos/seed/hotel105/400/300" },
  { id: 106, name: "Andes Basecamp Hotel", location: "Machu Picchu, Peru", price: 95, rating: 4.4, img: "https://picsum.photos/seed/hotel106/400/300" }
];

const blogPosts = [
  { id: 201, title: "5 Days in Bali: A Complete Guide", date: "June 12, 2026", excerpt: "From hidden waterfalls to bustling markets, here's how to make the most of five days in Bali without rushing." },
  { id: 202, title: "Hiking the Swiss Alps: What I Wish I Knew", date: "May 28, 2026", excerpt: "Altitude, gear, and timing tips for first-time alpine hikers, based on a two-week trek through the Bernese Oberland." },
  { id: 203, title: "Kyoto's Best Kept Secrets", date: "April 15, 2026", excerpt: "Skip the crowds at Fushimi Inari and discover quieter shrines that locals actually visit." },
  { id: 204, title: "A Budget Traveler's Paris", date: "March 3, 2026", excerpt: "Yes, Paris can be done on a budget. Here's exactly how much I spent over 6 days." },
  { id: 205, title: "Why Marrakech Should Be Your Next Trip", date: "February 20, 2026", excerpt: "The souks, the food, the desert — a first-timer's honest take on Morocco's most vibrant city." }
];
