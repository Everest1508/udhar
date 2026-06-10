/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { getTranslation } from '../utils/translations';
import { LanguageMode } from '../types';
import { User, Phone, X, Sparkles } from 'lucide-react';

interface AddPersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, phone: string) => void;
  lang: LanguageMode;
}

export default function AddPersonModal({ isOpen, onClose, onSave, lang }: AddPersonModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isContactSupported, setIsContactSupported] = useState(false);
  const [error, setError] = useState('');
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    // Check if Contact Picker API is available in browser
    if ('contacts' in navigator && 'select' in (navigator as any).contacts) {
      setIsContactSupported(true);
    }
  }, []);

  const handleImportContact = async () => {
    setError('');
    
    if (!isContactSupported) {
      // Toggle native support visual instructions
      setShowGuide(!showGuide);
      return;
    }

    try {
      const props = ['name', 'tel'];
      const opts = { multiple: false };
      const contacts = await (navigator as any).contacts.select(props, opts);
      if (contacts && contacts.length > 0) {
        const contact = contacts[0];
        const contactName = contact.name && contact.name[0] ? contact.name[0] : '';
        // Extract raw phone number and clean up spaces or hyphens
        let contactPhone = contact.tel && contact.tel[0] ? contact.tel[0] : '';
        contactPhone = contactPhone.replace(/[\s\-()]/g, ''); // Clean spaces and hyphens
        
        if (contactName) {
          setName(contactName);
        }
        if (contactPhone) {
          setPhone(contactPhone);
        }
      }
    } catch (err: any) {
      console.warn('Contact picker cancelled or failed:', err);
      // Don't show annoying errors if cancelled by user
      if (err.name !== 'AbortError') {
        setError('Could not import contact. Please enter manually.');
      }
    }
  };

  const selectSampleContact = (sampleName: string, samplePhone: string) => {
    setName(sampleName);
    setPhone(samplePhone);
    setShowGuide(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(lang === 'marathi' ? 'कृपया नाव दाखल करा!' : 'Please enter a name!');
      return;
    }
    onSave(name.trim(), phone.trim());
    setName('');
    setPhone('');
    setError('');
    setShowGuide(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md rounded-t-2xl bg-white p-6 shadow-xl transition-all sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h2 className="text-xl font-semibold text-gray-800">
            {getTranslation('addPerson', lang)}
          </h2>
          <button 
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-4 space-y-4">
          {error && (
            <div className="rounded-lg bg-red-50 p-2 text-xs text-red-600">
              {error}
            </div>
          )}

          {/* Always display Contact picker button! */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleImportContact}
              className={`flex w-full items-center justify-center gap-2 rounded-xl border border-dashed py-3 text-sm font-semibold transition-all ${
                isContactSupported 
                  ? 'border-indigo-300 bg-indigo-50/50 text-indigo-700 hover:bg-indigo-50' 
                  : 'border-amber-300 bg-amber-50/45 text-amber-800 hover:bg-amber-50'
              }`}
            >
              <Sparkles size={16} className={isContactSupported ? 'text-indigo-600' : 'text-amber-600'} />
              <span>{getTranslation('importContact', lang)}</span>
            </button>

            {/* Informational help panel if browser does not natively expose contacts inside preview frame */}
            {showGuide && (
              <div className="rounded-xl border border-amber-100 bg-amber-50/40 p-4 text-xs text-amber-900 space-y-2.5 shadow-inner">
                <p className="font-bold text-amber-950 flex items-center gap-1">
                  💡 {getTranslation('contactsGuideTitle', lang)}
                </p>
                <p className="leading-relaxed text-amber-900 font-normal">
                  {getTranslation('contactsGuideDesc', lang)}
                </p>
                
                {/* Try Sample contacts option for rich testing experience */}
                <div className="pt-2 border-t border-amber-150 space-y-1">
                  <p className="font-semibold text-amber-950 text-[10px] tracking-wider uppercase mb-1">
                    {lang === 'marathi' ? 'येथे चाचणीसाठी संपर्क निवडा:' : 'Or tap a sample to test importing:'}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => selectSampleContact(lang === 'marathi' ? 'सीमा मावशी' : 'Sima Mavshi', '9876543210')}
                      className="rounded-lg bg-white border border-amber-200/80 px-2.5 py-1.5 hover:bg-amber-50/80 text-amber-950 font-medium whitespace-nowrap active:scale-95 transition"
                    >
                      👤 {lang === 'marathi' ? 'सीमा मावशी' : 'Sima Mavshi'}
                    </button>
                    <button
                      type="button"
                      onClick={() => selectSampleContact(lang === 'marathi' ? 'संतोष किराणा' : 'Santosh Kirana', '9123456780')}
                      className="rounded-lg bg-white border border-amber-200/80 px-2.5 py-1.5 hover:bg-amber-50/80 text-amber-950 font-medium whitespace-nowrap active:scale-95 transition"
                    >
                      🛒 {lang === 'marathi' ? 'संतोष किराणा' : 'Santosh Kirana'}
                    </button>
                    <button
                      type="button"
                      onClick={() => selectSampleContact(lang === 'marathi' ? 'दूधवाले दादा' : 'Milkman', '9004003002')}
                      className="rounded-lg bg-white border border-amber-200/80 px-2.5 py-1.5 hover:bg-amber-50/80 text-amber-950 font-medium whitespace-nowrap active:scale-95 transition"
                    >
                      🥛 {lang === 'marathi' ? 'दूधवाले दादा' : 'Milkman'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              {getTranslation('nameLabel', lang)}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <User size={18} />
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Meena Jain / रीना जैन"
                className="block w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-10 pr-4 text-base text-gray-950 placeholder-gray-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                autoFocus
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              {getTranslation('phoneLabel', lang)}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Phone size={18} />
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 9876543210"
                className="block w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-10 pr-4 text-base text-gray-950 placeholder-gray-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
            >
              {getTranslation('cancel', lang)}
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition"
            >
              {getTranslation('save', lang)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
