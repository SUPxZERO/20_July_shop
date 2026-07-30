import { prisma } from '@/lib/prisma';
import { Link } from '@/i18n/routing';
import { ArrowRight, ShoppingBag, Star } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function HomePage() {
  let featuredProducts: any[] = [];
  let categories: any[] = [];
  let dbError = null;

  try {
    const result = await prisma.$transaction([
      prisma.product.findMany({
        where: { featured: true },
        include: { category: true },
        take: 6,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.category.findMany({
        take: 4,
        orderBy: { createdAt: 'asc' },
      }),
    ]);
    featuredProducts = result[0];
    categories = result[1];
  } catch (error: any) {
    console.error("Database connection error:", error);
    dbError = error.message || error.toString();
  }

  if (dbError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 text-red-900 p-8">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold mb-4">Database Connection Failed</h1>
          <p className="mb-4">We are having trouble connecting to the database on Vercel.</p>
          <pre className="bg-red-100 p-4 rounded overflow-auto text-sm">{dbError}</pre>
        </div>
      </div>
    );
  }

  const t = await getTranslations('HomePage');

  return (
    <div className="overflow-hidden">
      <section className="relative min-h-[90vh] pt-32 pb-16 flex items-center bg-brand-cream overflow-hidden">
        {/* Subtle noise texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">

          {/* Left Column: Text Content */}
          <div className="flex flex-col items-start text-left max-w-xl">
            <div className="inline-flex items-center gap-2 sm:gap-3 py-2 px-4 sm:py-2.5 sm:px-5 mb-6 sm:mb-8 rounded-full bg-white/60 border border-brand-pink-200 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-pink-500 animate-pulse"></span>
              <span className="text-[10px] sm:text-xs leading-normal font-bold tracking-[0.2em] text-brand-pink-600 uppercase pb-0.5">
                {t('TimelessElegance')}
              </span>
            </div>

            <h1 className="font-heading font-normal text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-brand-charcoal mb-4 sm:mb-6 leading-[1.3] md:leading-[1.4] tracking-tight">
              {t('EleganceIn')} <br />
              <span className="text-brand-pink-500 italic relative inline-block mt-4 lg:mt-6 pb-2">
                <span>{t('EveryThread')}</span>
                <svg className="absolute -bottom-4 md:-bottom-8 left-0 w-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,10 Q50,20 100,10" fill="none" stroke="currentColor" strokeWidth="4" className="text-brand-pink-200" />
                </svg>
              </span>
            </h1>

            <p className="text-sm sm:text-lg md:text-xl text-brand-charcoal/70 mb-6 sm:mb-10 font-light leading-relaxed">
              {t('HeroDesc')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <Link
                href="/shop"
                className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-brand-charcoal text-white rounded-full text-sm sm:text-base font-medium tracking-wide hover:bg-black transition-all duration-500 shadow-xl sm:shadow-2xl shadow-brand-charcoal/20 hover:shadow-brand-charcoal/40 hover:-translate-y-1"
              >
                <span>{t('ExploreCollection')}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/shop?category=dresses"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-white/50 backdrop-blur-md border border-brand-pink-200 text-brand-charcoal rounded-full text-sm sm:text-base font-medium tracking-wide hover:bg-white hover:border-brand-pink-300 transition-all duration-300"
              >
                <span>{t('ShopDresses')}</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Stylized Image Component */}
          <div className="relative w-full h-[320px] sm:h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center mt-6 lg:mt-0">
            {/* Background Blob decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-pink-200/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob pointer-events-none"></div>

            {/* Main Cover Image inside an elegant arch shape */}
            <div className="relative w-[90%] max-w-[450px] h-[90%] rounded-t-[10rem] rounded-b-[2rem] overflow-hidden shadow-2xl shadow-brand-pink-200/50 border-8 border-white/50 bg-white">
              <img
                src="/brand/covers/hero_no_text.png"
                alt={t('AltLatestCollection')}
                className="w-full h-full object-cover object-center scale-105 hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
            </div>

            {/* Floating Glassmorphism Element extracted from the "vibe" */}
            <div className="absolute bottom-2 sm:bottom-16 left-2 sm:-left-8 lg:-left-16 bg-white/80 backdrop-blur-xl border border-white p-3 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl animate-bounce" style={{ animationDuration: '4s' }}>
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-brand-cream flex items-center justify-center shrink-0 border border-brand-pink-100">
                  <Star className="w-4 h-4 sm:w-6 sm:h-6 text-brand-pink-500 fill-brand-pink-500" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs font-bold tracking-widest text-brand-charcoal uppercase mb-0.5 sm:mb-1"><span>{t('Featured')}</span></p>
                  <p className="font-heading text-sm sm:text-xl text-brand-charcoal"><span>{t('SignatureCollection')}</span></p>
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
          <span className="text-[10px] uppercase tracking-[0.2em] text-brand-charcoal/40"><span>{t('Scroll')}</span></span>
          <div className="w-px h-8 bg-gradient-to-b from-brand-charcoal/40 to-transparent"></div>
        </div>
      </section>

      {/* Brand Story / Why Choose Us */}
      <section className="py-16 lg:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
            <div className="relative w-full max-w-xs sm:max-w-md mx-auto lg:max-w-none aspect-[4/5] rounded-3xl sm:rounded-[3rem] overflow-hidden group shadow-xl sm:shadow-2xl shadow-brand-pink-100/50">
              <img
                src="/images/philosophy.jpg"
                alt={t('AltBrandStory')}
                className="w-full h-full object-cover object-center scale-105 hover:scale-110 transition-transform duration-1000"
              />
            </div>

            <div className="flex flex-col justify-center">
              <span className="text-xs font-bold tracking-[0.2em] text-brand-pink-500 uppercase mb-4 block">
                {t('ThePhilosophy')}
              </span>
              <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl text-brand-charcoal mb-4 sm:mb-6 leading-tight">
                {t('CraftedForModernWoman')}
              </h2>
              <p className="text-sm sm:text-lg text-brand-charcoal/70 mb-6 sm:mb-8 font-light leading-relaxed">
                {t('BrandStoryDesc')}
              </p>

              <div className="space-y-6">
                {[
                  { title: t('PremiumMaterials'), desc: t('PremiumMaterialsDesc') },
                  { title: t('TimelessDesign'), desc: t('TimelessDesignDesc') },
                  { title: t('ImpeccableFit'), desc: t('ImpeccableFitDesc') }
                ].map((feature, idx) => (
                  <div key={idx} className="flex gap-3 sm:gap-4 items-start">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-pink-50 flex items-center justify-center shrink-0 border border-brand-pink-100">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-brand-pink-500" />
                    </div>
                    <div>
                      <h4 className="font-heading text-lg sm:text-xl text-brand-charcoal mb-1">{feature.title}</h4>
                      <p className="text-xs sm:text-sm text-brand-charcoal/60 font-light">{feature.desc}</p>
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
        <section className="py-16 lg:py-24 bg-brand-offwhite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-brand-charcoal mb-4">{t('CuratedCategories')}</h2>
                <p className="text-brand-charcoal/60 max-w-xl text-lg font-light">{t('CategoriesDesc')}</p>
              </div>
              <Link href="/shop" className="group inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-brand-charcoal hover:text-brand-pink-500 transition-colors">
                <span>{t('ViewAll')}</span> <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="flex overflow-x-auto gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory">
              {categories.map((category, idx) => (
                <Link href={`/shop?category=${category.slug}`} key={category.id} className="group relative h-[250px] sm:h-[300px] md:h-[400px] min-w-[200px] sm:min-w-[240px] md:min-w-0 rounded-2xl sm:rounded-3xl overflow-hidden block shadow-lg shadow-brand-charcoal/5 shrink-0 snap-start">
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
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-brand-pink-500 uppercase mb-4 block">
              {t('TrendingNow')}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-brand-charcoal mb-4">{t('FeaturedHighlights')}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-pink-300 to-brand-purple-300 mx-auto rounded-full"></div>
          </div>

          {featuredProducts.length === 0 ? (
            <div className="text-center py-20 bg-brand-offwhite rounded-3xl border border-brand-pink-100 border-dashed">
              <p className="text-brand-charcoal/50 italic text-lg">{t('NoProducts')}</p>
            </div>
          ) : (
            <div className="flex overflow-x-auto gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-10 pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory">
              {featuredProducts.map((product, idx) => (
                <div
                  key={product.id}
                  className="group flex flex-col relative animate-fade-in-up min-w-[240px] sm:min-w-[280px] md:min-w-0 shrink-0 snap-start"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <Link href={`/shop/${product.slug}`} className="block relative bg-brand-offwhite rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 h-[280px] sm:h-[300px] md:h-[400px] mb-4 sm:mb-6 overflow-hidden border border-brand-pink-50 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-pink-100/60 hover:border-brand-pink-200">
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

                  <div className="text-center px-2 sm:px-4">
                    <h3 className="font-heading text-lg sm:text-2xl text-brand-charcoal mb-2 hover:text-brand-pink-600 transition-colors">
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
              className="inline-flex items-center justify-center px-8 py-3 sm:px-10 sm:py-4 border border-brand-charcoal text-brand-charcoal rounded-full text-sm sm:text-base font-medium tracking-wide hover:bg-brand-charcoal hover:text-white transition-all duration-300 group"
            >
              <span>{t('ViewAllProducts')}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
