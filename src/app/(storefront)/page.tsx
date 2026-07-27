import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Star } from 'lucide-react';

export default async function HomePage() {
  const [featuredProducts, categories] = await prisma.$transaction([
    prisma.product.findMany({
      where: { featured: true },
      include: { category: true },
      take: 6,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.category.findMany({
      take: 4,
    })
  ]);

  return (
    <div className="overflow-hidden">
      <section className="relative min-h-[90vh] pt-32 pb-16 lg:pt-0 lg:pb-0 flex items-center bg-brand-cream overflow-hidden">
        {/* Subtle noise texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col items-start text-left max-w-xl">
            <div className="inline-flex items-center gap-3 py-2 px-5 mb-8 rounded-full bg-white/60 border border-brand-pink-200 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-pink-500 animate-pulse"></span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-brand-pink-600 uppercase">
                Timeless Elegance
              </span>
            </div>
            
            <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl text-brand-charcoal mb-6 leading-[1.05] tracking-tight">
              Elegance in <br />
              <span className="text-brand-pink-500 italic relative inline-block mt-2">
                Every Thread
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,10 Q50,20 100,10" fill="none" stroke="currentColor" strokeWidth="4" className="text-brand-pink-200"/>
                </svg>
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-brand-charcoal/70 mb-10 font-light leading-relaxed">
              Discover a curated collection of premium women's fashion designed to elevate your everyday style with effortless sophistication.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link 
                href="/shop" 
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-charcoal text-white rounded-full font-medium tracking-wide hover:bg-black transition-all duration-500 shadow-2xl shadow-brand-charcoal/20 hover:shadow-brand-charcoal/40 hover:-translate-y-1"
              >
                Explore Collection 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/shop?category=dresses" 
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/50 backdrop-blur-md border border-brand-pink-200 text-brand-charcoal rounded-full font-medium tracking-wide hover:bg-white hover:border-brand-pink-300 transition-all duration-300"
              >
                Shop Dresses
              </Link>
            </div>
          </div>

          {/* Right Column: Stylized Image Component */}
          <div className="relative w-full h-[600px] lg:h-[700px] flex items-center justify-center">
            {/* Background Blob decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-pink-200/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob pointer-events-none"></div>
            
            {/* Main Cover Image inside an elegant arch shape */}
            <div className="relative w-[90%] max-w-[450px] h-[90%] rounded-t-[10rem] rounded-b-[2rem] overflow-hidden shadow-2xl shadow-brand-pink-200/50 border-8 border-white/50 bg-white">
              <img 
                src="/brand/covers/hero_no_text.png" 
                alt="Latest Collection" 
                className="w-full h-full object-cover object-center scale-105 hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
            </div>

            {/* Floating Glassmorphism Element extracted from the "vibe" */}
            <div className="absolute bottom-16 -left-8 lg:-left-16 bg-white/80 backdrop-blur-xl border border-white p-6 rounded-3xl shadow-2xl animate-bounce" style={{ animationDuration: '4s' }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-cream flex items-center justify-center shrink-0 border border-brand-pink-100">
                  <Star className="w-6 h-6 text-brand-pink-500 fill-brand-pink-500" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest text-brand-charcoal uppercase mb-1">Featured</p>
                  <p className="font-heading text-xl text-brand-charcoal">Signature Collection</p>
                </div>
              </div>
            </div>
            
            {/* Decorative Logo Overlay */}
            <div className="absolute top-10 right-0 lg:-right-8 opacity-20 w-32 h-32 pointer-events-none mix-blend-overlay">
               <img src="/brand/logos/logo-hollow.svg" alt="" className="w-full h-full object-contain rotate-12" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 lg:hidden">
          <span className="text-[10px] uppercase tracking-[0.2em] text-brand-charcoal/40">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-brand-charcoal/40 to-transparent"></div>
        </div>
      </section>

      {/* Brand Story / Why Choose Us */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden group shadow-2xl shadow-brand-pink-100/50">
              <img 
                src="/images/philosophy.jpg" 
                alt="Brand Story" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>
            
            <div className="flex flex-col justify-center">
              <span className="text-xs font-bold tracking-[0.2em] text-brand-pink-500 uppercase mb-4 block">
                The Philosophy
              </span>
              <h2 className="font-heading text-4xl md:text-5xl text-brand-charcoal mb-6 leading-tight">
                Crafted for the Modern Woman
              </h2>
              <p className="text-lg text-brand-charcoal/70 mb-8 font-light leading-relaxed">
                At 20-July, we believe that true elegance lies in the details. Every piece in our collection is thoughtfully designed with premium materials to ensure you not only look beautiful but feel empowered.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Premium Materials", desc: "Ethically sourced fabrics that feel luxurious against your skin." },
                  { title: "Timeless Design", desc: "Silhouettes designed to outlast passing trends." },
                  { title: "Impeccable Fit", desc: "Tailored to celebrate your natural shape with comfort in mind." }
                ].map((feature, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-full bg-brand-pink-50 flex items-center justify-center shrink-0 border border-brand-pink-100">
                      <Star className="w-5 h-5 text-brand-pink-500" />
                    </div>
                    <div>
                      <h4 className="font-heading text-xl text-brand-charcoal mb-1">{feature.title}</h4>
                      <p className="text-sm text-brand-charcoal/60 font-light">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      {categories.length > 0 && (
        <section className="py-24 bg-brand-offwhite">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="font-heading text-4xl md:text-5xl text-brand-charcoal mb-4">Curated Categories</h2>
                <p className="text-brand-charcoal/60 max-w-xl text-lg font-light">Find exactly what you're looking for by browsing our carefully organized collections.</p>
              </div>
              <Link href="/shop" className="group inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-brand-charcoal hover:text-brand-pink-500 transition-colors">
                View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, idx) => (
                <Link href={`/shop?category=${category.slug}`} key={category.id} className="group relative h-[400px] rounded-3xl overflow-hidden block shadow-lg shadow-brand-charcoal/5">
                  <div className="absolute inset-0 bg-black/10 z-10 group-hover:bg-black/20 transition-colors duration-500"></div>
                  <img 
                    src={category.imageUrl || '/images/philosophy.jpg'}
                    alt={category.name} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20"></div>
                  <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 z-30">
                    <h3 className="font-heading text-3xl text-white mb-2">{category.name}</h3>
                    <div className="w-0 h-px bg-white group-hover:w-12 transition-all duration-500"></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-brand-pink-500 uppercase mb-4 block">
              Trending Now
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-brand-charcoal mb-4">Featured Highlights</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-pink-300 to-brand-purple-300 mx-auto rounded-full"></div>
          </div>

          {featuredProducts.length === 0 ? (
            <div className="text-center py-20 bg-brand-offwhite rounded-3xl border border-brand-pink-100 border-dashed">
              <p className="text-brand-charcoal/50 italic text-lg">New collections arriving soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {featuredProducts.map((product, idx) => (
                <div 
                  key={product.id} 
                  className="group flex flex-col relative animate-fade-in-up"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <Link href={`/shop/${product.slug}`} className="block relative bg-brand-offwhite rounded-[2rem] p-6 h-[400px] mb-6 overflow-hidden border border-brand-pink-50 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-pink-100/60 hover:border-brand-pink-200">
                    {product.imageUrl && (
                      <div className="absolute inset-0 z-0">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
                      </div>
                    )}
                    {/* Glassmorphism Category Badge */}
                    <div className="absolute top-6 left-6 z-10 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/40 shadow-sm">
                      <span className="text-[10px] font-bold tracking-widest text-brand-charcoal uppercase">
                        {product.category.name}
                      </span>
                    </div>
                    {/* Dark gradient at bottom for text visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Link>

                  {/* Quick Action Button (Decorative here, would normally add to cart) */}
                  <button className="absolute bottom-32 right-8 z-20 w-12 h-12 rounded-full bg-white text-brand-charcoal shadow-xl flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-brand-charcoal hover:text-white">
                    <ShoppingBag className="w-5 h-5" />
                  </button>

                  <div className="text-center px-4">
                    <h3 className="font-heading text-2xl text-brand-charcoal mb-2 hover:text-brand-pink-600 transition-colors">
                      <Link href={`/shop/${product.slug}`}>{product.name}</Link>
                    </h3>
                    <div className="w-8 h-px bg-brand-pink-200 mx-auto mb-3"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-20">
            <Link 
              href="/shop" 
              className="inline-flex items-center justify-center px-10 py-4 border border-brand-charcoal text-brand-charcoal rounded-full font-medium tracking-wide hover:bg-brand-charcoal hover:text-white transition-all duration-300 group"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
