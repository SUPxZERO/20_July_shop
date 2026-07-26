'use client';

import { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';

const COMMON_COLORS = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Red', hex: '#ef4444' },
  { name: 'Blue', hex: '#3b82f6' },
  { name: 'Navy', hex: '#1e3a8a' },
  { name: 'Pink', hex: '#ec4899' },
  { name: 'Blush', hex: '#fbcfe8' },
  { name: 'Beige', hex: '#f5f5dc' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Purple', hex: '#a855f7' },
];

export default function ColorInput({ 
  defaultValue, 
  name 
}: { 
  defaultValue?: string, 
  name: string 
}) {
  const [value, setValue] = useState(defaultValue || '');
  const [showSwatches, setShowSwatches] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSwatches(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative">
        <input
          type="text"
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full px-4 py-2.5 pr-10 rounded-xl border border-brand-pink-100 bg-white focus:ring-2 focus:ring-brand-pink-300 outline-none text-sm transition-all"
          placeholder="e.g., Blush Pink"
          onFocus={() => setShowSwatches(true)}
        />
        <button 
          type="button"
          onClick={() => setShowSwatches(!showSwatches)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-brand-charcoal/40 hover:text-brand-pink-500 transition-colors rounded-md hover:bg-brand-pink-50"
          title="Pick a color"
        >
          <Palette className="w-4 h-4" />
        </button>
      </div>

      {showSwatches && (
        <div className="absolute z-20 top-full left-0 mt-2 p-4 bg-white/95 backdrop-blur-md border border-brand-pink-100 rounded-2xl shadow-xl w-64 animate-in fade-in zoom-in-95 duration-200">
          <div className="text-xs font-semibold text-brand-charcoal/60 mb-3 uppercase tracking-wider flex justify-between items-center">
            <span>Quick Select</span>
            {value && <span className="text-brand-pink-500 text-[10px] normal-case bg-brand-pink-50 px-2 py-0.5 rounded-full">{value}</span>}
          </div>
          <div className="grid grid-cols-5 gap-2.5">
            {COMMON_COLORS.map((color) => {
              const isSelected = value.toLowerCase() === color.name.toLowerCase();
              return (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => {
                    setValue(color.name);
                    setShowSwatches(false);
                  }}
                  className={`relative w-8 h-8 rounded-full border shadow-sm transition-all flex items-center justify-center
                             hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-pink-300
                             ${isSelected ? 'ring-2 ring-offset-2 ring-brand-pink-400 border-transparent' : 'border-gray-200'}`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {isSelected && (
                    <Check className={`w-4 h-4 ${color.name === 'White' || color.name === 'Beige' ? 'text-black' : 'text-white'}`} strokeWidth={3} />
                  )}
                </button>
              );
            })}
          </div>
          <div className="mt-4 pt-3 border-t border-brand-pink-50 flex items-center gap-2">
             <div className="w-full">
                <label className="text-[10px] text-brand-charcoal/50 uppercase tracking-widest font-semibold mb-1 block">Custom Hex</label>
                <div className="flex rounded-lg overflow-hidden border border-brand-pink-100">
                  <input 
                    type="color" 
                    className="w-8 h-8 p-0 border-0 bg-white shrink-0 cursor-pointer"
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <div className="flex-1 px-2 flex items-center bg-gray-50 text-xs text-brand-charcoal/60 font-mono">
                    Color Picker
                  </div>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
