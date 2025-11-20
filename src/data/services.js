const servicesCatalog = [
  {
    id: 1,
    title: 'Professional House Cleaning',
    description: 'Thorough and reliable cleaning services',
    provider: 'Renad Elsafi',
    rating: 4.9,
    reviews: 127,
    price: 40,
    unit: 'hour',
    location: 'Dhahran, Saudi Arabia',
    category: 'Home Services',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    title: 'Expert Plumbing Services',
    description: 'Fast and professional plumbing solutions',
    provider: 'Shatha Alharbi',
    rating: 4.8,
    reviews: 94,
    price: 60,
    unit: 'hour',
    location: 'Dhahran, Saudi Arabia',
    category: 'Home Services',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    title: 'Personal Training Sessions',
    description: 'Customized fitness and wellness programs',
    provider: 'Arwa Aldawoud',
    rating: 5.0,
    reviews: 203,
    price: 50,
    unit: 'session',
    location: 'Riyadh, Saudi Arabia',
    category: 'Health & Wellness',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    title: 'Web Development Services',
    description: 'Modern and responsive web solutions',
    provider: 'Adel Hassan',
    rating: 4.9,
    reviews: 156,
    price: 80,
    unit: 'hour',
    location: 'Riyadh, Saudi Arabia',
    category: 'Professional Services',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 5,
    title: 'Professional Photography',
    description: 'Capture your special moments',
    provider: 'Mohammed Ali',
    rating: 4.7,
    reviews: 89,
    price: 150,
    unit: 'session',
    location: 'Riyadh, Saudi Arabia',
    category: 'Creative Services',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 6,
    title: 'Yoga & Meditation Classes',
    description: 'Find your inner peace and balance',
    provider: 'Renad Elsafi',
    rating: 4.9,
    reviews: 178,
    price: 30,
    unit: 'session',
    location: 'Riyadh, Saudi Arabia',
    category: 'Health & Wellness',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 7,
    title: 'Graphic Design Services',
    description: 'Creative designs for your brand',
    provider: 'Shatha Alharbi',
    rating: 4.8,
    reviews: 142,
    price: 65,
    unit: 'hour',
    location: 'Riyadh, Saudi Arabia',
    category: 'Creative Services',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 8,
    title: 'Home Renovation Consulting',
    description: 'Expert advice for your home projects',
    provider: 'Arwa Aldawoud',
    rating: 4.6,
    reviews: 76,
    price: 55,
    unit: 'hour',
    location: 'Dhahran, Saudi Arabia',
    category: 'Home Services',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 9,
    title: 'Business Consulting',
    description: 'Strategic guidance for your business',
    provider: 'Adel Hassan',
    rating: 5.0,
    reviews: 234,
    price: 120,
    unit: 'hour',
    location: 'Riyadh, Saudi Arabia',
    category: 'Professional Services',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80'
  }
];

export const getServiceById = (id) => {
  const numericId = Number(id);
  if (Number.isNaN(numericId)) return undefined;
  return servicesCatalog.find((service) => service.id === numericId);
};

export default servicesCatalog;

