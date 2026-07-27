import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, Ruler, Info, ShieldCheck, ChevronRight } from 'lucide-react';
import { SizeGuideModal } from '@/components/SizeGuideModal';

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await prisma.product.findUnique({
    where: { slug: resolvedParams.slug },
    include: { category: true, variants: true },
  });

  if (!product) {
    notFound();
  }

  // Extract unique sizes, colors, and materials
  const sizes = Array.from(new Set(product.variants.map(v => v.size).filter(Boolean)));
  const colors = Array.from(new Set(product.variants.map(v => v.color).filter(Boolean)));
  const materials = Array.from(new Set(product.variants.map(v => v.material).filter(Boolean)));

  return (
    <div className="bg-brand-offwhite min-h-screen pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumbs */}
        <nav className="flex flex-wrap items-center gap-2 text-xs font-bold tracking-widest uppercase text-brand-charcoal/50 mb-8 md:mb-12">
          <Link href="/" className="hover:text-brand-pink-500 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-brand-pink-500 transition-colors">Collection</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/shop?category=${product.category.slug}`} className="hover:text-brand-pink-500 transition-colors">{product.category.name}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-brand-charcoal">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Product Image Gallery */}
          <div className="space-y-6">
            <div className="bg-white rounded-[2rem] aspect-[3/4] shadow-sm border border-brand-pink-100 flex items-center justify-center relative overflow-hidden group cursor-crosshair">
              {product.imageUrl ? (
                <>
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-150 transform-origin-center" 
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </>
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-pink-50 to-brand-cream opacity-50"></div>
                  <p className="relative z-10 font-heading text-3xl text-brand-pink-200 tracking-widest uppercase rotate-[-45deg] opacity-50 group-hover:scale-110 transition-transform duration-700">
                    20-July
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col py-4">
            <span className="text-[10px] font-bold tracking-[0.3em] text-brand-pink-500 uppercase mb-4 block">
              {product.category.name}
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl text-brand-charcoal mb-4 md:mb-6 leading-[1.1] tracking-tight">
              {product.name}
            </h1>
            
            <div className="prose prose-pink text-brand-charcoal/70 mb-12 font-light leading-relaxed text-lg">
              <p>{product.description || "An elegant piece curated for the modern wardrobe. Carefully crafted with premium materials for a timeless look."}</p>
            </div>

            {/* Variants */}
            <div className="space-y-8 mb-12 border-y border-brand-pink-100 py-8">
              {sizes.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-bold tracking-widest text-brand-charcoal uppercase">Select Size</h3>
                    <SizeGuideModal defaultCategory={product.category.slug} />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {sizes.map(size => (
                      <label key={String(size)} className="cursor-pointer relative">
                        <input type="radio" name="size" className="peer sr-only" value={String(size)} />
                        <span className="px-5 py-2.5 rounded-full text-sm font-medium border border-brand-pink-200 text-brand-charcoal bg-white flex items-center justify-center peer-checked:bg-brand-charcoal peer-checked:text-white peer-checked:border-brand-charcoal transition-all duration-300 hover:border-brand-charcoal">
                          {String(size)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {colors.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold tracking-widest text-brand-charcoal uppercase mb-4">Select Color</h3>
                  <div className="flex flex-wrap gap-3">
                    {colors.map(color => (
                      <label key={String(color)} className="cursor-pointer relative group">
                        <input type="radio" name="color" className="peer sr-only" value={String(color)} />
                        <span className="px-5 py-2.5 rounded-full text-sm font-medium border border-brand-pink-200 text-brand-charcoal bg-white flex items-center justify-center peer-checked:bg-brand-pink-500 peer-checked:text-white peer-checked:border-brand-pink-500 transition-all duration-300 hover:border-brand-pink-500 hover:text-brand-pink-500">
                          {String(color)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {materials.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold tracking-widest text-brand-charcoal uppercase mb-4">Material</h3>
                  <div className="flex flex-wrap gap-3">
                    {materials.map(material => (
                      <span key={material} className="px-5 py-2.5 border border-brand-pink-100 rounded-full text-sm font-medium text-brand-charcoal/60 bg-brand-pink-50/50">
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-pink-100 shadow-xl shadow-brand-pink-50/50 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-pink-100 rounded-full blur-3xl opacity-50"></div>
              <h3 className="font-heading text-2xl text-brand-charcoal mb-3 relative z-10">Interested in this piece?</h3>
              <p className="text-brand-charcoal/60 mb-8 font-light relative z-10">
                Have questions about fit, availability, or want to place an order? Contact us directly and we'll be happy to assist you.
              </p>
              <Link 
                href="/contact" 
                className="w-full relative z-10 inline-flex items-center justify-center gap-2 sm:gap-3 px-6 py-4 sm:px-8 sm:py-5 bg-brand-charcoal text-white rounded-full font-medium tracking-widest uppercase hover:bg-black transition-all duration-300 shadow-xl shadow-brand-charcoal/20 hover:shadow-brand-charcoal/40 hover:-translate-y-1 text-sm sm:text-base"
              >
                <MessageCircle className="w-5 h-5" /> Inquire Now
              </Link>
            </div>

            {/* Accordions / Info Blocks */}
            <div className="mt-12 space-y-4">
              <details className="group bg-white rounded-2xl border border-brand-pink-50 p-6 cursor-pointer">
                <summary className="flex items-center justify-between font-heading text-lg text-brand-charcoal list-none">
                  <span className="flex items-center gap-3"><Info className="w-5 h-5 text-brand-pink-400" /> Shipping & Returns</span>
                  <ChevronRight className="w-5 h-5 text-brand-charcoal/40 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="mt-4 text-brand-charcoal/60 font-light text-sm leading-relaxed pl-8">
                  Shipping rates and delivery times are calculated at checkout. We accept returns within 3 days of delivery for unworn items in their original condition with all tags attached.
                </div>
              </details>
              
              <details className="group bg-white rounded-2xl border border-brand-pink-50 p-6 cursor-pointer">
                <summary className="flex items-center justify-between font-heading text-lg text-brand-charcoal list-none">
                  <span className="flex items-center gap-3"><ShieldCheck className="w-5 h-5 text-brand-pink-400" /> Care Instructions</span>
                  <ChevronRight className="w-5 h-5 text-brand-charcoal/40 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="mt-4 text-brand-charcoal/60 font-light text-sm leading-relaxed pl-8">
                  Please refer to the care label on your item for specific instructions. For most pieces, we recommend gentle washing in cold water and air drying to maintain the fabric's quality and fit.
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
