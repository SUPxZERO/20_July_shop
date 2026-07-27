'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ComboboxProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function Combobox({ label, options, value, onChange, placeholder = "Select..." }: ComboboxProps) {
  const t = useTranslations('Combobox');
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const filteredOptions = query === '' 
    ? options 
    : options.filter(option => option.label.toLowerCase().includes(query.toLowerCase()));

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="flex flex-col gap-1 sm:gap-1.5 min-w-[120px] sm:min-w-[200px] shrink-0 relative" ref={containerRef}>
      <label className="text-xs font-bold tracking-widest text-brand-charcoal uppercase">{label}</label>
      
      <div 
        className="relative cursor-pointer w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-brand-pink-200 bg-brand-offwhite text-brand-charcoal focus-within:ring-2 focus-within:ring-brand-pink-300 text-xs sm:text-sm flex items-center justify-between shadow-sm transition-all hover:bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedOption ? 'text-brand-charcoal font-medium' : 'text-brand-charcoal/50'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-brand-charcoal/50 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute top-[100%] left-0 w-full mt-2 bg-white border border-brand-pink-100 shadow-2xl rounded-xl z-50 overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center px-3 py-2.5 border-b border-brand-pink-50 bg-brand-offwhite/50">
            <Search className="w-4 h-4 text-brand-charcoal/40 mr-2 shrink-0" />
            <input 
              type="text" 
              className="w-full bg-transparent outline-none text-sm text-brand-charcoal placeholder:text-brand-charcoal/40"
              placeholder="Type to search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
          </div>
          
          <ul className="max-h-64 overflow-y-auto py-1">
            <li 
              className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-brand-pink-50 transition-colors ${!value ? 'bg-brand-pink-50/50 font-semibold text-brand-pink-600' : 'text-brand-charcoal/70'}`}
              onClick={() => {
                onChange('');
                setIsOpen(false);
                setQuery('');
              }}
            >
              <span>{t('Any', { label })}</span>
            </li>
            {filteredOptions.length === 0 ? (
              <li className="px-4 py-4 text-sm text-brand-charcoal/40 text-center"><span>{t('NoMatchesFound')}</span></li>
            ) : (
              filteredOptions.map((option) => (
                <li 
                  key={option.value}
                  className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-brand-pink-50 transition-colors flex items-center justify-between ${value === option.value ? 'bg-brand-pink-50 font-medium text-brand-charcoal' : 'text-brand-charcoal'}`}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                    setQuery('');
                  }}
                >
                  <span>{option.label}</span>
                  {value === option.value && <Check className="w-4 h-4 text-brand-pink-500" />}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
