/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { getTranslation, TRANSLATIONS } from '../utils/translations';
import { LanguageMode } from '../types';
import { X, Delete, ChevronRight } from 'lucide-react';

interface AddTxnModalProps {
  isOpen: boolean;
  type: 'give' | 'get'; // 'give' (You gave credit), 'get' (They returned or gave you credit)
  onClose: () => void;
  onSave: (amount: number, note: string) => void;
  lang: LanguageMode;
  personName: string;
}

const QUICK_AMOUNTS = [50, 100, 500, 1000, 2000, 5000];

export default function AddTxnModal({
  isOpen,
  type,
  onClose,
  onSave,
  lang,
  personName,
}: AddTxnModalProps) {
  const [amountStr, setAmountStr] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const isGive = type === 'give';

  const handleQuickAmount = (val: number) => {
    const current = parseFloat(amountStr) || 0;
    setAmountStr((current + val).toString());
    setError('');
  };

  const handleQuickNote = (val: string) => {
    setNote(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amountStr);
    if (isNaN(amt) || amt <= 0) {
      setError(
        lang === 'marathi'
          ? 'कृपया योग्य रक्कम प्रविष्ट करा (० पेक्षा मोठी)!'
          : 'Please enter a valid amount (greater than 0)!'
      );
      return;
    }
    onSave(amt, note.trim());
    setAmountStr('');
    setNote('');
    setError('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-3xl bg-white p-6 shadow-2xl transition-all sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <span
              className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                isGive
                  ? 'bg-rose-50 text-rose-700 border border-rose-100'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
              }`}
            >
              {isGive ? 'You Gave / दिले (-)' : 'You Received / मिळाले (+)'}
            </span>
            <h2 className="text-lg font-bold text-gray-800 mt-1">
              {isGive ? `Lending to ${personName}` : `Received from ${personName}`}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {error && (
            <div className="rounded-xl bg-red-50 p-2.5 text-xs text-red-600 font-medium">
              {error}
            </div>
          )}

          {/* Amount Entry Display */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              {getTranslation('amountLabel', lang)}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-2xl font-bold text-gray-400">
                ₹
              </span>
              <input
                type="number"
                inputMode="decimal"
                value={amountStr}
                onChange={(e) => {
                  setAmountStr(e.target.value);
                  setError('');
                }}
                placeholder="0"
                className="block w-full rounded-2xl border-2 border-gray-100 bg-gray-50 py-4 pl-10 pr-4 text-3xl font-extrabold text-gray-900 placeholder-gray-300 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-0"
                autoFocus
              />
              {amountStr && (
                <button
                  type="button"
                  onClick={() => setAmountStr('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
                >
                  <Delete size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Quick Amount Pills */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
              {getTranslation('quickAmounts', lang)}
            </span>
            <div className="flex flex-wrap gap-2">
              {QUICK_AMOUNTS.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleQuickAmount(val)}
                  className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:border-gray-300 hover:bg-gray-50 active:scale-95 transition-all"
                >
                  +₹{val}
                </button>
              ))}
            </div>
          </div>

          {/* Details Entry field */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              {getTranslation('noteLabel', lang)}
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={lang === 'marathi' ? 'उदा. दूध, ५ किलो किराणा' : 'e.g. Milk, grocery'}
              className="block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:bg-white focus:outline-none"
            />
          </div>

          {/* Quick Note Tags */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
              {getTranslation('quickNotes', lang)}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {TRANSLATIONS.quickNoteItems.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => handleQuickNote(item.value)}
                  className={`rounded-full border border-gray-100 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-indigo-50 hover:text-indigo-700 ${
                    note === item.value ? 'bg-indigo-100 text-indigo-800 border-indigo-200' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-200 py-3.5 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
            >
              {getTranslation('cancel', lang)}
            </button>
            <button
              type="submit"
              className={`flex-1 rounded-xl py-3.5 text-sm font-bold text-white shadow-md shadow-indigo-100 transition-all hover:scale-[1.01] active:scale-95 ${
                isGive
                  ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-100'
                  : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100'
              }`}
            >
              {getTranslation('save', lang)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
