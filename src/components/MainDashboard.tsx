/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Person, LanguageMode } from '../types';
import { getTranslation } from '../utils/translations';
import { calculatePersonBalance } from '../utils/localStorage';
import { Search, UserPlus, SlidersHorizontal, Settings, BookOpen, Plus, ArrowUpRight, ArrowDownLeft, Smile } from 'lucide-react';

interface MainDashboardProps {
  people: Person[];
  lang: LanguageMode;
  onSelectPerson: (id: string) => void;
  onAddPersonClick: () => void;
  onOpenSettings: () => void;
}

const AVATAR_COLORS = [
  'bg-indigo-50 text-indigo-700 font-bold',
  'bg-teal-50 text-teal-700 font-bold',
  'bg-amber-50 text-amber-700 font-bold',
  'bg-rose-50 text-rose-700 font-bold',
  'bg-sky-50 text-sky-700 font-bold',
  'bg-emerald-50 text-emerald-700 font-bold',
  'bg-purple-50 text-purple-700 font-bold',
];

export function getAvatarStyle(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (h * 31 + name.charCodeAt(i)) % AVATAR_COLORS.length;
  }
  return AVATAR_COLORS[h];
}

export function getInitials(name: string): string {
  const parts = name.trim().split(' ');
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function MainDashboard({
  people,
  lang,
  onSelectPerson,
  onAddPersonClick,
  onOpenSettings,
}: MainDashboardProps) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'get' | 'give' | 'settled'>('all');

  // Math summary calculation
  let totalGet = 0; // Money others owe mother (person balance > 0)
  let totalGive = 0; // Money mother owes others (person balance < 0)

  people.forEach((p) => {
    const bal = calculatePersonBalance(p);
    if (bal > 0) {
      totalGet += bal;
    } else if (bal < 0) {
      totalGive += Math.abs(bal);
    }
  });

  const netBalance = totalGet - totalGive;

  // Filter & Search logic
  const filteredPeople = people.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
      (p.phone && p.phone.includes(search));
    
    if (!matchesSearch) return false;

    const bal = calculatePersonBalance(p);
    if (activeFilter === 'get') return bal > 0;
    if (activeFilter === 'give') return bal < 0;
    if (activeFilter === 'settled') return bal === 0;
    return true;
  });

  return (
    <div className="mx-auto w-full max-w-md bg-stone-50 min-h-screen flex flex-col relative pb-28">
      {/* Top Header Applet style */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="rounded-xl bg-indigo-600 p-2 text-white">
            <BookOpen size={20} />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-gray-900 tracking-tight leading-none">
              {getTranslation('appName', lang)}
            </h1>
            <p className="text-[10px] text-gray-500 font-semibold tracking-wide uppercase mt-0.5">
              {getTranslation('tagline', lang)}
            </p>
          </div>
        </div>

        <div className="flex gap-1.5">
          <button
            onClick={onOpenSettings}
            className="rounded-full p-2.5 text-gray-500 hover:bg-gray-100 hover:text-indigo-600 transition"
            title="Settings"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="p-4 space-y-4">
        {/* Net Balance Summary strip */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-3.5">
          <div className="flex items-center justify-between border-b border-gray-50 pb-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              {getTranslation('netBalance', lang)}
            </span>
            <span
              className={`text-sm font-extrabold ${
                netBalance > 0
                  ? 'text-emerald-700'
                  : netBalance < 0
                  ? 'text-rose-700'
                  : 'text-gray-500'
              }`}
            >
              {netBalance > 0 ? '+' : ''}₹{netBalance.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            {/* Total you will get (Green Card) */}
            <div className="rounded-xl bg-emerald-50/60 p-4 border border-emerald-100/30">
              <div className="flex items-center gap-1.5 text-emerald-800/80 mb-1">
                <ArrowDownLeft size={15} />
                <span className="text-xs font-semibold leading-none">
                  {lang === 'bilingual' ? 'Will Get ' : ''}{getTranslation('willGetFilter', lang)}
                </span>
              </div>
              <p className="text-base font-extrabold text-emerald-800">
                ₹{totalGet.toLocaleString('en-IN')}
              </p>
            </div>

            {/* Total you must give (Red Card) */}
            <div className="rounded-xl bg-rose-50/60 p-4 border border-rose-100/30">
              <div className="flex items-center gap-1.5 text-rose-800/80 mb-1">
                <ArrowUpRight size={15} />
                <span className="text-xs font-semibold leading-none">
                  {lang === 'bilingual' ? 'Will Give ' : ''}{getTranslation('willGiveFilter', lang)}
                </span>
              </div>
              <p className="text-base font-extrabold text-rose-800">
                ₹{totalGive.toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </div>

        {/* Searching box and Filter section */}
        <div className="space-y-3">
          {/* Search box input */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={getTranslation('searchPlaceholder', lang)}
              className="block w-full rounded-2xl border border-gray-100 bg-white py-3.5 pl-11 pr-4 text-[15px] font-medium text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Quick Filter Sliders */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
            <button
              onClick={() => setActiveFilter('all')}
              className={`rounded-xl px-4 py-2 text-xs font-bold whitespace-nowrap active:scale-95 transition-all ${
                activeFilter === 'all'
                  ? 'bg-indigo-650 text-white shadow-md shadow-indigo-100'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100 shadow-sm'
              }`}
            >
              {getTranslation('all', lang)}
            </button>
            <button
              onClick={() => setActiveFilter('get')}
              className={`rounded-xl px-4 py-2 text-xs font-bold whitespace-nowrap active:scale-95 transition-all ${
                activeFilter === 'get'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-50'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100 shadow-sm'
              }`}
            >
              {getTranslation('willGetFilter', lang)}
            </button>
            <button
              onClick={() => setActiveFilter('give')}
              className={`rounded-xl px-4 py-2 text-xs font-bold whitespace-nowrap active:scale-95 transition-all ${
                activeFilter === 'give'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-50'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100 shadow-sm'
              }`}
            >
              {getTranslation('willGiveFilter', lang)}
            </button>
            <button
              onClick={() => setActiveFilter('settled')}
              className={`rounded-xl px-4 py-2 text-xs font-bold whitespace-nowrap active:scale-95 transition-all ${
                activeFilter === 'settled'
                  ? 'bg-gray-650 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100 shadow-sm'
              }`}
            >
              {getTranslation('settledFilter', lang)}
            </button>
          </div>
        </div>

        {/* Contact list display */}
        <div className="space-y-2">
          {filteredPeople.length === 0 ? (
            <div className="rounded-3xl bg-white border border-gray-100 p-8 text-center space-y-3 shadow-sm">
              <div className="mx-auto w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
                <Smile size={24} />
              </div>
              <p className="text-gray-500 text-xs font-medium">
                {getTranslation('noPeopleYet', lang)}
              </p>
              <button
                onClick={onAddPersonClick}
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-650 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition"
              >
                <Plus size={14} />
                <span>{getTranslation('addPerson', lang)}</span>
              </button>
            </div>
          ) : (
            filteredPeople.map((p) => {
              const bal = calculatePersonBalance(p);
              const absBal = Math.abs(bal);
              const isSettled = bal === 0;
              const isToGet = bal > 0;

              return (
                <div
                  key={p.id}
                  onClick={() => onSelectPerson(p.id)}
                  className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm hover:border-gray-300 active:scale-[0.99] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center text-sm ${getAvatarStyle(p.name)}`}>
                      {getInitials(p.name)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[15px] font-bold text-gray-900 truncate leading-tight">
                        {p.name}
                      </h3>
                      {p.phone && (
                        <p className="text-xs text-gray-400 mt-0.5 tracking-wide">
                          📞 {p.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Ledger Balance visualizer */}
                  <div className="text-right pl-3">
                    <p
                      className={`text-[15px] font-extrabold ${
                        isSettled
                          ? 'text-gray-400'
                          : isToGet
                          ? 'text-emerald-700'
                          : 'text-rose-700'
                      }`}
                    >
                      ₹{absBal.toLocaleString('en-IN')}
                    </p>
                    <p className="text-[10px] text-gray-400 font-medium tracking-wide leading-none mt-0.5">
                      {isSettled
                        ? getTranslation('settledWith', lang)
                        : isToGet
                        ? (lang === 'marathi' ? 'येणे आहे' : 'will get')
                        : (lang === 'marathi' ? 'देणे आहे' : 'will give')}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Primary Float Action Button FAB for adding persons */}
      <button
        onClick={onAddPersonClick}
        className="fixed bottom-6 right-6 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-200 outline-none hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all"
        title="Add name / नाम जोड़ें"
      >
        <UserPlus size={24} />
      </button>
    </div>
  );
}
