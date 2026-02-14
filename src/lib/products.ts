export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  category: string;
  badge?: string;
  inStock: boolean;
};

export const products: Product[] = [
  {
    id: "1",
    slug: "portable-blender-pro",
    name: "Portable Blender Pro",
    description: "USB rechargeable mini blender for shakes and smoothies on the go.",
    price: 2499,
    compareAtPrice: 3199,
    image: "https://images.unsplash.com/photo-1627483262769-90716e80405c?auto=format&fit=crop&w=1200&q=80",
    category: "Kitchen",
    badge: "Best Seller",
    inStock: true
  },
  {
    id: "2",
    slug: "smart-posture-corrector",
    name: "Smart Posture Corrector",
    description: "Lightweight posture trainer with gentle vibration reminders.",
    price: 1999,
    compareAtPrice: 2799,
    image: "https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&w=1200&q=80",
    category: "Wellness",
    badge: "Trending",
    inStock: true
  },
  {
    id: "3",
    slug: "pet-grooming-vacuum-brush",
    name: "Pet Grooming Vacuum Brush",
    description: "Low-noise grooming brush that collects loose fur while grooming.",
    price: 3499,
    image: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=1200&q=80",
    category: "Pets",
    inStock: true
  },
  {
    id: "4",
    slug: "led-ambient-lamp",
    name: "LED Ambient Lamp",
    description: "Modern bedside lamp with warm and cool lighting modes.",
    price: 1499,
    compareAtPrice: 2199,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80",
    category: "Home",
    inStock: false
  }
];

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
