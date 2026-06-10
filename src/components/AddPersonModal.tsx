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

  useEffect(() => {
    // Check if Contact Picker API is available in browser
    if ('contacts' in navigator && 'select' in (navigator as any).contacts) {
      setIsContactSupported(true);
    }
  }, []);

  const handleImportContact = async () => {
    setError('');
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

          {isContactSupported && (
            <button
              type="button"
              onClick={handleImportContact}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-indigo-200 bg-indigo-50/50 py-3.5 text-sm font-medium text-indigo-700 hover:bg-indigo-50 transition-colors"
            >
              <Sparkles size={16} />
              <span>{getTranslation('importContact', lang)}</span>
            </button>
          )}

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
