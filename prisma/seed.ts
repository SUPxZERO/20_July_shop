import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database with massive premium catalog...');

  const adminEmail = 'admin@20julyshop.com';
  const adminPasswordRaw = 'admin123';
  const hashedPassword = await bcrypt.hash(adminPasswordRaw, 12);
  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { password: hashedPassword },
    create: { email: adminEmail, password: hashedPassword, name: '20-July Admin' },
  });

  const categoriesData = [
    { name: 'Dresses', slug: 'dresses', description: 'Elegant dresses for every occasion.', imageUrl: '/images/dresses.jpg' },
    { name: 'Tops & Blouses', slug: 'tops-blouses', description: 'Chic tops and blouses crafted with feminine details.', imageUrl: '/images/tops.jpg' },
    { name: 'Skirts & Pants', slug: 'skirts-pants', description: 'Stylish bottoms that pair perfectly with our curated tops collection.', imageUrl: '/images/bottoms.jpg' },
    { name: 'Accessories', slug: 'accessories', description: 'Complete your look with our handpicked scarves, bags, and jewelry.', imageUrl: '/images/accessories.jpg' },
    { name: 'Outerwear', slug: 'outerwear', description: 'Classic coats and jackets.', imageUrl: '/images/bottoms.jpg' },
    { name: 'Lingerie & Sleepwear', slug: 'sleepwear', description: 'Luxurious silk and satin sleepwear.', imageUrl: '/images/dresses.jpg' },
    { name: 'Shoes', slug: 'shoes', description: 'Step out in style with our premium footwear collection.', imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop' },
  ];

  const categories: Record<string, string> = {};
  for (const cat of categoriesData) {
    const createdCat = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    categories[cat.slug] = createdCat.id;
  }

  // 12 base products + 20 new expanded products = 32 products total
  const productsData = [
    {
      name: 'Blush Silk Evening Gown', slug: 'silk-evening-gown', description: 'A breathtaking floor-length evening gown crafted from pure silk.',
      imageUrl: '/images/silk_evening_gown.png', categoryId: categories['dresses'], featured: true,
      variants: [{ size: 'S', color: 'Blush Pink', sku: 'GOWN-1' }, { size: 'M', color: 'Blush Pink', sku: 'GOWN-2' }]
    },
    {
      name: 'Breathable Linen Summer Blouse', slug: 'linen-summer-blouse', description: 'Embrace the summer breeze with this effortlessly chic linen blouse.',
      imageUrl: '/images/linen_summer_blouse.png', categoryId: categories['tops-blouses'], featured: false,
      variants: [{ size: 'S', color: 'Pure White', sku: 'BLS-1' }, { size: 'M', color: 'Pure White', sku: 'BLS-2' }]
    },
    {
      name: 'Midnight Purple Pleated Midi', slug: 'pleated-midi-skirt', description: 'A stunning accordion-pleated midi skirt.',
      imageUrl: '/images/pleated_midi_skirt.png', categoryId: categories['skirts-pants'], featured: false,
      variants: [{ size: 'Free Size', color: 'Midnight Purple', sku: 'SKT-1' }]
    },
    {
      name: 'Classic Pearl Drop Earrings', slug: 'pearl-drop-earrings', description: 'The epitome of classic elegance.',
      imageUrl: '/images/pearl_drop_earrings.png', categoryId: categories['accessories'], featured: true,
      variants: [{ size: 'One Size', color: 'Pearl', sku: 'ACC-1' }]
    },
    {
      name: 'Emerald Velvet Wrap Dress', slug: 'velvet-wrap-dress', description: 'Luxuriate in this stunning emerald green velvet wrap dress.',
      imageUrl: '/images/velvet_wrap_dress.png', categoryId: categories['dresses'], featured: true,
      variants: [{ size: 'S', color: 'Emerald Green', sku: 'VLV-1' }, { size: 'M', color: 'Emerald Green', sku: 'VLV-2' }]
    },
    {
      name: 'Camel Cashmere Turtleneck', slug: 'cashmere-turtleneck', description: 'The ultimate winter staple.',
      imageUrl: '/images/cashmere_turtleneck.png', categoryId: categories['tops-blouses'], featured: true,
      variants: [{ size: 'S', color: 'Camel', sku: 'CSH-1' }, { size: 'M', color: 'Camel', sku: 'CSH-2' }]
    },
    {
      name: 'Tailored Wide Leg Trousers', slug: 'wide-leg-trousers', description: 'Sophistication meets comfort in these high-waisted, wide-leg trousers.',
      imageUrl: '/images/wide_leg_trousers.png', categoryId: categories['skirts-pants'], featured: false,
      variants: [{ size: 'S', color: 'Charcoal Grey', sku: 'TR-1' }]
    },
    {
      name: 'Burgundy Leather Crossbody Bag', slug: 'leather-crossbody-bag', description: 'A masterpiece of minimalist design.',
      imageUrl: '/images/leather_crossbody_bag.png', categoryId: categories['accessories'], featured: false,
      variants: [{ size: 'One Size', color: 'Burgundy', sku: 'BAG-1' }]
    },
    {
      name: 'Champagne Satin Sleep Camisole', slug: 'satin-sleep-camisole', description: 'Elevate your nighttime routine.',
      imageUrl: '/images/satin_sleep_camisole.png', categoryId: categories['sleepwear'], featured: false,
      variants: [{ size: 'S', color: 'Champagne', sku: 'CAM-1' }]
    },
    {
      name: 'Classic Wool Trench Coat', slug: 'wool-trench-coat', description: 'A timeless investment piece.',
      imageUrl: '/images/wool_trench_coat.png', categoryId: categories['outerwear'], featured: true,
      variants: [{ size: 'S', color: 'Classic Beige', sku: 'TRC-1' }, { size: 'M', color: 'Classic Beige', sku: 'TRC-2' }]
    },
    {
      name: 'Floral Chiffon Maxi Dress', slug: 'floral-maxi-dress', description: 'Drift through spring and summer in this ethereal floral maxi dress.',
      imageUrl: '/images/floral_maxi_dress.png', categoryId: categories['dresses'], featured: false,
      variants: [{ size: 'S', color: 'Pastel Floral', sku: 'FLR-1' }]
    },
    {
      name: 'Minimalist 14k Gold Chain', slug: 'gold-chain-necklace', description: 'Subtle sophistication.',
      imageUrl: '/images/gold_chain_necklace.png', categoryId: categories['accessories'], featured: false,
      variants: [{ size: '16 Inch', color: 'Yellow Gold', sku: 'GLD-1' }]
    },
    // ---- Massive Expansion Starts Here ----
    {
      name: 'Ruby Satin Slip Dress', slug: 'ruby-satin-slip-dress', description: 'A 90s-inspired slip dress with a cowl neck.',
      imageUrl: '/images/silk_evening_gown.png', categoryId: categories['dresses'], featured: false,
      variants: [{ size: 'XS', color: 'Ruby Red', sku: 'SLP-1' }, { size: 'S', color: 'Ruby Red', sku: 'SLP-2' }]
    },
    {
      name: 'Ivory Chiffon Blouse', slug: 'ivory-chiffon-blouse', description: 'Delicate chiffon blouse with sheer balloon sleeves.',
      imageUrl: '/images/linen_summer_blouse.png', categoryId: categories['tops-blouses'], featured: false,
      variants: [{ size: 'M', color: 'Ivory', sku: 'CHF-1' }]
    },
    {
      name: 'Black Leather Pencil Skirt', slug: 'black-leather-pencil-skirt', description: 'High-waisted vegan leather pencil skirt for a sharp silhouette.',
      imageUrl: '/images/pleated_midi_skirt.png', categoryId: categories['skirts-pants'], featured: false,
      variants: [{ size: 'S', color: 'Jet Black', sku: 'PNCL-1' }]
    },
    {
      name: 'Chunky Gold Hoop Earrings', slug: 'gold-hoop-earrings', description: 'Bold yet weightless 18k gold-plated hoops.',
      imageUrl: '/images/gold_chain_necklace.png', categoryId: categories['accessories'], featured: false,
      variants: [{ size: 'One Size', color: 'Gold', sku: 'HOOP-1' }]
    },
    {
      name: 'Navy Double Breasted Blazer', slug: 'navy-blazer', description: 'Structured blazer with gold-tone nautical buttons.',
      imageUrl: '/images/wool_trench_coat.png', categoryId: categories['outerwear'], featured: true,
      variants: [{ size: 'M', color: 'Navy Blue', sku: 'BLZ-1' }]
    },
    {
      name: 'Silk Pajama Set', slug: 'silk-pajama-set', description: 'Two-piece matching silk pajama set for ultimate comfort.',
      imageUrl: '/images/satin_sleep_camisole.png', categoryId: categories['sleepwear'], featured: true,
      variants: [{ size: 'M', color: 'Blush Pink', sku: 'PJ-1' }]
    },
    {
      name: 'Off-Shoulder Knit Sweater', slug: 'off-shoulder-knit', description: 'Cozy ribbed knit sweater with a flattering off-shoulder neckline.',
      imageUrl: '/images/cashmere_turtleneck.png', categoryId: categories['tops-blouses'], featured: false,
      variants: [{ size: 'S', color: 'Cream', sku: 'KNT-1' }, { size: 'L', color: 'Cream', sku: 'KNT-2' }]
    },
    {
      name: 'Cropped Denim Jacket', slug: 'cropped-denim-jacket', description: 'A classic vintage-wash cropped denim jacket.',
      imageUrl: '/images/wool_trench_coat.png', categoryId: categories['outerwear'], featured: false,
      variants: [{ size: 'M', color: 'Vintage Blue', sku: 'DNM-1' }]
    },
    {
      name: 'Tortoiseshell Sunglasses', slug: 'tortoiseshell-sunglasses', description: 'Cat-eye sunglasses with gradient lenses.',
      imageUrl: '/images/leather_crossbody_bag.png', categoryId: categories['accessories'], featured: false,
      variants: [{ size: 'One Size', color: 'Tortoiseshell', sku: 'SUN-1' }]
    },
    {
      name: 'Lace Bralette', slug: 'lace-bralette', description: 'Unlined floral lace bralette with scalloped edges.',
      imageUrl: '/images/satin_sleep_camisole.png', categoryId: categories['sleepwear'], featured: false,
      variants: [{ size: 'S', color: 'Black', sku: 'BRL-1' }]
    },
    {
      name: 'Polka Dot Wrap Skirt', slug: 'polka-dot-wrap-skirt', description: 'Playful ruffled wrap skirt perfect for summer.',
      imageUrl: '/images/pleated_midi_skirt.png', categoryId: categories['skirts-pants'], featured: false,
      variants: [{ size: 'Free Size', color: 'Navy/White', sku: 'PLK-1' }]
    },
    {
      name: 'Sequin Mini Dress', slug: 'sequin-mini-dress', description: 'Catch the light on the dancefloor with this stunning sequin mini.',
      imageUrl: '/images/velvet_wrap_dress.png', categoryId: categories['dresses'], featured: true,
      variants: [{ size: 'S', color: 'Silver', sku: 'SQN-1' }, { size: 'M', color: 'Silver', sku: 'SQN-2' }]
    },
    {
      name: 'Oversized Poplin Shirt', slug: 'oversized-poplin', description: 'Borrowed from the boys, tailored for you. Crisp cotton poplin.',
      imageUrl: '/images/linen_summer_blouse.png', categoryId: categories['tops-blouses'], featured: false,
      variants: [{ size: 'L', color: 'White', sku: 'PPL-1' }]
    },
    {
      name: 'Suede Block Heels', slug: 'suede-block-heels', description: 'Comfortable 2-inch block heels in soft suede.',
      imageUrl: '/images/leather_crossbody_bag.png', categoryId: categories['accessories'], featured: false,
      variants: [{ size: '38', color: 'Tan', sku: 'HEL-1' }, { size: '39', color: 'Tan', sku: 'HEL-2' }]
    },
    {
      name: 'Cashmere Beanie', slug: 'cashmere-beanie', description: 'Stay warm without sacrificing style.',
      imageUrl: '/images/cashmere_turtleneck.png', categoryId: categories['accessories'], featured: false,
      variants: [{ size: 'One Size', color: 'Camel', sku: 'BN-1' }]
    },
    {
      name: 'Puffer Coat with Faux Fur', slug: 'puffer-coat', description: 'Quilted puffer coat designed for sub-zero temperatures.',
      imageUrl: '/images/wool_trench_coat.png', categoryId: categories['outerwear'], featured: false,
      variants: [{ size: 'M', color: 'Black', sku: 'PFF-1' }]
    },
    {
      name: 'Floral Lace Robe', slug: 'floral-lace-robe', description: 'Sheer lace robe with a satin tie waist.',
      imageUrl: '/images/satin_sleep_camisole.png', categoryId: categories['sleepwear'], featured: false,
      variants: [{ size: 'Free Size', color: 'White', sku: 'ROB-1' }]
    },
    {
      name: 'Tiered Ruffle Gown', slug: 'tiered-ruffle-gown', description: 'A dramatic, voluminous gown for formal galas.',
      imageUrl: '/images/silk_evening_gown.png', categoryId: categories['dresses'], featured: false,
      variants: [{ size: 'S', color: 'Lavender', sku: 'TRD-1' }]
    },
    {
      name: 'Silk Camisole Top', slug: 'silk-camisole-top', description: 'Versatile silk tank top that goes from day to night.',
      imageUrl: '/images/linen_summer_blouse.png', categoryId: categories['tops-blouses'], featured: true,
      variants: [{ size: 'S', color: 'Champagne', sku: 'SCM-1' }, { size: 'M', color: 'Champagne', sku: 'SCM-2' }]
    },
    {
      name: 'Corduroy Flared Pants', slug: 'corduroy-flared-pants', description: '70s inspired high-waisted corduroy pants.',
      imageUrl: '/images/wide_leg_trousers.png', categoryId: categories['skirts-pants'], featured: false,
      variants: [{ size: '28', color: 'Rust', sku: 'CRD-1' }]
    },
    {
      name: 'Classic White Sneakers', slug: 'classic-white-sneakers', description: 'Minimalist leather sneakers for everyday wear.',
      imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop', categoryId: categories['shoes'], featured: true,
      variants: [{ size: '37', color: 'White', sku: 'SNK-1' }, { size: '38', color: 'White', sku: 'SNK-2' }, { size: '39', color: 'White', sku: 'SNK-3' }]
    },
    {
      name: 'Stiletto Ankle Boots', slug: 'stiletto-ankle-boots', description: 'Sleek pointed-toe ankle boots in smooth black leather.',
      imageUrl: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=800&auto=format&fit=crop', categoryId: categories['shoes'], featured: false,
      variants: [{ size: '38', color: 'Black', sku: 'BOT-1' }, { size: '39', color: 'Black', sku: 'BOT-2' }]
    },
    {
      name: 'Leather Loafers', slug: 'leather-loafers', description: 'Timeless slip-on loafers with gold hardware.',
      imageUrl: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800&auto=format&fit=crop', categoryId: categories['shoes'], featured: true,
      variants: [{ size: '37', color: 'Brown', sku: 'LOA-1' }, { size: '40', color: 'Brown', sku: 'LOA-2' }]
    },
    {
      name: 'Oversized Cat-Eye Sunglasses', slug: 'oversized-cat-eye-sunglasses', description: 'Statement sunglasses with UV protection.',
      imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop', categoryId: categories['accessories'], featured: true,
      variants: [{ size: 'One Size', color: 'Black', sku: 'SUN-2' }]
    },
    {
      name: 'Cashmere Blend Scarf', slug: 'cashmere-blend-scarf', description: 'Ultra-soft oversized scarf perfect for chilly days.',
      imageUrl: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=800&auto=format&fit=crop', categoryId: categories['accessories'], featured: false,
      variants: [{ size: 'One Size', color: 'Grey', sku: 'SCRF-1' }]
    },
    {
      name: 'Pearl Embellished Belt', slug: 'pearl-embellished-belt', description: 'Thin waist belt adorned with faux pearls.',
      imageUrl: 'https://images.unsplash.com/photo-1628149462157-5e933f48a97e?q=80&w=800&auto=format&fit=crop', categoryId: categories['accessories'], featured: false,
      variants: [{ size: 'S', color: 'Gold/White', sku: 'BLT-1' }, { size: 'M', color: 'Gold/White', sku: 'BLT-2' }]
    }
  ];

  for (const product of productsData) {
    const { variants, ...productFields } = product;
    
    const existingProduct = await prisma.product.findUnique({ where: { slug: productFields.slug } });
    
    if (!existingProduct) {
      await prisma.product.create({
        data: {
          ...productFields,
          variants: {
            create: variants
          }
        }
      });
    }
  }

  console.log(`✅ Mass seed of 32 premium products complete!`);
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
