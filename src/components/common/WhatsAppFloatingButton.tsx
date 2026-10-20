import React from 'react';
import { MessageSquareText } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/8801711000111?text=Hello%20BD-Industrial%20Sourcing%20Desk,%20I%20have%20an%20inquiry%20regarding%20factory%20manufacturing"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-xl shadow-emerald-950/20 flex items-center gap-2 group transition-all hover:scale-105 cursor-pointer"
      title="Contact Factory Liaison via WhatsApp"
      aria-label="Contact Factory Liaison via WhatsApp"
    >
      <MessageSquareText className="w-5 h-5 text-white" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 text-xs font-bold whitespace-nowrap pl-0 group-hover:pl-1">
        WhatsApp Desk (+880)
      </span>
    </a>
  );
};
