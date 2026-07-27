"use client";

import { useState, useEffect } from "react";
import { Ruler, X, Shirt, Footprints, Watch } from "lucide-react";
import Link from "next/link";

type Tab = 'clothing' | 'shoes' | 'accessories';

export function SizeGuideModal({ defaultCategory = 'clothing' }: { defaultCategory?: string }) {
  const getInitialTab = (): Tab => {
    if (defaultCategory === 'shoes') return 'shoes';
    if (defaultCategory === 'accessories') return 'accessories';
    return 'clothing';
  };

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>(getInitialTab());

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="text-xs text-brand-pink-500 hover:text-brand-pink-600 transition-colors flex items-center gap-1 font-medium"
      >
        <Ruler className="w-3 h-3" /> Size Guide
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/60 backdrop-blur-sm transition-all">
          {/* Backdrop click handler */}
          <div className="absolute inset-0" onClick={() => setIsOpen(false)}></div>
          
          <div className="bg-white rounded-[2rem] w-full max-w-2xl overflow-hidden shadow-2xl relative z-10 transform transition-all flex flex-col max-h-[90vh]">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-brand-charcoal/40 hover:text-brand-charcoal hover:bg-brand-pink-50 p-2 rounded-full transition-all z-20"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-8 md:p-12 pb-6 overflow-y-auto">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-brand-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3">
                  <Ruler className="w-8 h-8 text-brand-pink-500 -rotate-3" />
                </div>
                <h2 className="font-heading text-3xl text-brand-charcoal mb-3">Size Guide</h2>
                <p className="text-brand-charcoal/60 text-sm font-light">
                  Find your perfect fit across all our collections.
                </p>
              </div>

              {/* Tabs */}
              <div className="flex justify-center gap-2 mb-8 bg-brand-pink-50/50 p-1 rounded-full w-fit mx-auto">
                <button 
                  onClick={() => setActiveTab('clothing')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${activeTab === 'clothing' ? 'bg-white text-brand-charcoal shadow-sm' : 'text-brand-charcoal/50 hover:text-brand-charcoal hover:bg-brand-pink-50'}`}
                >
                  <Shirt className="w-4 h-4" /> Clothing
                </button>
                <button 
                  onClick={() => setActiveTab('shoes')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${activeTab === 'shoes' ? 'bg-white text-brand-charcoal shadow-sm' : 'text-brand-charcoal/50 hover:text-brand-charcoal hover:bg-brand-pink-50'}`}
                >
                  <Footprints className="w-4 h-4" /> Shoes
                </button>
                <button 
                  onClick={() => setActiveTab('accessories')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${activeTab === 'accessories' ? 'bg-white text-brand-charcoal shadow-sm' : 'text-brand-charcoal/50 hover:text-brand-charcoal hover:bg-brand-pink-50'}`}
                >
                  <Watch className="w-4 h-4" /> Accessories
                </button>
              </div>

              {/* Clothing Chart */}
              {activeTab === 'clothing' && (
                <div className="overflow-x-auto rounded-2xl border border-brand-pink-50 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-brand-pink-50/50 text-brand-charcoal uppercase text-xs font-bold tracking-widest">
                      <tr>
                        <th className="px-6 py-5 font-bold">Size</th>
                        <th className="px-6 py-5 font-bold">Bust (cm)</th>
                        <th className="px-6 py-5 font-bold">Waist (cm)</th>
                        <th className="px-6 py-5 font-bold">Hips (cm)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-pink-50">
                      <tr className="hover:bg-brand-pink-50/30 transition-colors">
                        <td className="px-6 py-4 font-bold text-brand-charcoal">XS</td>
                        <td className="px-6 py-4 text-brand-charcoal/70">82 - 86</td>
                        <td className="px-6 py-4 text-brand-charcoal/70">62 - 66</td>
                        <td className="px-6 py-4 text-brand-charcoal/70">88 - 92</td>
                      </tr>
                      <tr className="hover:bg-brand-pink-50/30 transition-colors bg-white">
                        <td className="px-6 py-4 font-bold text-brand-charcoal">S</td>
                        <td className="px-6 py-4 text-brand-charcoal/70">86 - 90</td>
                        <td className="px-6 py-4 text-brand-charcoal/70">66 - 70</td>
                        <td className="px-6 py-4 text-brand-charcoal/70">92 - 96</td>
                      </tr>
                      <tr className="hover:bg-brand-pink-50/30 transition-colors bg-brand-pink-50/10">
                        <td className="px-6 py-4 font-bold text-brand-charcoal">M</td>
                        <td className="px-6 py-4 text-brand-charcoal/70">90 - 94</td>
                        <td className="px-6 py-4 text-brand-charcoal/70">70 - 74</td>
                        <td className="px-6 py-4 text-brand-charcoal/70">96 - 100</td>
                      </tr>
                      <tr className="hover:bg-brand-pink-50/30 transition-colors bg-white">
                        <td className="px-6 py-4 font-bold text-brand-charcoal">L</td>
                        <td className="px-6 py-4 text-brand-charcoal/70">94 - 100</td>
                        <td className="px-6 py-4 text-brand-charcoal/70">74 - 80</td>
                        <td className="px-6 py-4 text-brand-charcoal/70">100 - 106</td>
                      </tr>
                      <tr className="hover:bg-brand-pink-50/30 transition-colors bg-brand-pink-50/10">
                        <td className="px-6 py-4 font-bold text-brand-charcoal">XL</td>
                        <td className="px-6 py-4 text-brand-charcoal/70">100 - 106</td>
                        <td className="px-6 py-4 text-brand-charcoal/70">80 - 86</td>
                        <td className="px-6 py-4 text-brand-charcoal/70">106 - 112</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Shoes Chart */}
              {activeTab === 'shoes' && (
                <div className="overflow-x-auto rounded-2xl border border-brand-pink-50 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-brand-pink-50/50 text-brand-charcoal uppercase text-xs font-bold tracking-widest">
                      <tr>
                        <th className="px-6 py-5 font-bold">EU</th>
                        <th className="px-6 py-5 font-bold">US (Women)</th>
                        <th className="px-6 py-5 font-bold">UK</th>
                        <th className="px-6 py-5 font-bold">Length (cm)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-pink-50">
                      <tr className="hover:bg-brand-pink-50/30 transition-colors">
                        <td className="px-6 py-4 font-bold text-brand-charcoal">36</td>
                        <td className="px-6 py-4 text-brand-charcoal/70">5.5</td>
                        <td className="px-6 py-4 text-brand-charcoal/70">3</td>
                        <td className="px-6 py-4 text-brand-charcoal/70">22.5</td>
                      </tr>
                      <tr className="hover:bg-brand-pink-50/30 transition-colors bg-white">
                        <td className="px-6 py-4 font-bold text-brand-charcoal">37</td>
                        <td className="px-6 py-4 text-brand-charcoal/70">6.5</td>
                        <td className="px-6 py-4 text-brand-charcoal/70">4</td>
                        <td className="px-6 py-4 text-brand-charcoal/70">23.5</td>
                      </tr>
                      <tr className="hover:bg-brand-pink-50/30 transition-colors bg-brand-pink-50/10">
                        <td className="px-6 py-4 font-bold text-brand-charcoal">38</td>
                        <td className="px-6 py-4 text-brand-charcoal/70">7.5</td>
                        <td className="px-6 py-4 text-brand-charcoal/70">5</td>
                        <td className="px-6 py-4 text-brand-charcoal/70">24.5</td>
                      </tr>
                      <tr className="hover:bg-brand-pink-50/30 transition-colors bg-white">
                        <td className="px-6 py-4 font-bold text-brand-charcoal">39</td>
                        <td className="px-6 py-4 text-brand-charcoal/70">8.5</td>
                        <td className="px-6 py-4 text-brand-charcoal/70">6</td>
                        <td className="px-6 py-4 text-brand-charcoal/70">25.5</td>
                      </tr>
                      <tr className="hover:bg-brand-pink-50/30 transition-colors bg-brand-pink-50/10">
                        <td className="px-6 py-4 font-bold text-brand-charcoal">40</td>
                        <td className="px-6 py-4 text-brand-charcoal/70">9.5</td>
                        <td className="px-6 py-4 text-brand-charcoal/70">7</td>
                        <td className="px-6 py-4 text-brand-charcoal/70">26.5</td>
                      </tr>
                      <tr className="hover:bg-brand-pink-50/30 transition-colors bg-white">
                        <td className="px-6 py-4 font-bold text-brand-charcoal">41</td>
                        <td className="px-6 py-4 text-brand-charcoal/70">10.5</td>
                        <td className="px-6 py-4 text-brand-charcoal/70">8</td>
                        <td className="px-6 py-4 text-brand-charcoal/70">27.5</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Accessories Note */}
              {activeTab === 'accessories' && (
                <div className="bg-brand-pink-50/30 rounded-2xl border border-brand-pink-50 p-8 text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-brand-pink-50">
                    <Watch className="w-5 h-5 text-brand-pink-500" />
                  </div>
                  <h3 className="font-heading text-xl text-brand-charcoal mb-2">Accessories Sizing</h3>
                  <p className="text-brand-charcoal/70 font-light text-sm max-w-md mx-auto leading-relaxed">
                    Most of our accessories (such as bags, scarves, and sunglasses) are <strong>One Size Fits All</strong>. 
                    <br/><br/>
                    For specific measurements of an accessory, please refer to the product description details on the item's page.
                  </p>
                </div>
              )}
              
              <div className="mt-8 text-center text-sm text-brand-charcoal/60 font-light py-4">
                Need more help finding your size?{' '}
                <Link href="/contact" className="text-brand-pink-500 font-medium hover:text-brand-pink-600 transition-colors underline underline-offset-4">
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
