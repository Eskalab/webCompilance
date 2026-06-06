'use client';

import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/language';
import type { TrainingAccordionItem } from '@/lib/home-data';

interface Props {
  item: TrainingAccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}

export default function CapacitacionesAccordion({ item, isOpen, onToggle }: Props) {
  const { locale } = useLanguage();

  return (
    <div className="border-b border-white/20">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-white text-left hover:text-white/80 transition-colors"
      >
        <span className="font-medium text-lg">{item.title[locale]}</span>
        <ChevronRight
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-90' : ''}`}
        />
      </button>
      {isOpen && (
        <p className="pb-4 text-white/85 text-sm leading-relaxed">
          {item.body[locale]}
        </p>
      )}
    </div>
  );
}
