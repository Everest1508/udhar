/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Person, Transaction, LanguageMode } from '../types';
import { getTranslation, TRANSLATIONS } from '../utils/translations';
import { calculatePersonBalance } from '../utils/localStorage';
import { getInitials, getAvatarStyle } from './MainDashboard';
import { ArrowLeft, Trash2, Calendar, MessageSquare, ArrowUpRight, ArrowDownLeft, X, Edit2 } from 'lucide-react';

interface PersonDetailProps {
  person: Person;
  lang: LanguageMode;
  onBack: () => void;
  onDeletePerson: (id: string) => void;
  onDeleteTransaction: (personId: string, txnId: string) => void;
  onOpenAddTxn: (type: 'give' | 'get') => void;
  onEditPhone: (id: string, phone: string) => void;
}

export default function PersonDetail({
  person,
  lang,
  onBack,
  onDeletePerson,
  onDeleteTransaction,
  onOpenAddTxn,
  onEditPhone,
}: PersonDetailProps) {
  const balance = calculatePersonBalance(person);
  const absBalance = Math.abs(balance);
  const isSettled = balance === 0;
  const isToGet = balance > 0; // Mother gave money, so she gets back

  // WhatsApp Message Generator
  const handleSendReminder = () => {
    if (!person.phone) {
      alert(lang === 'marathi' ? 'कृपया आठवण मेसेज पाठवण्यापूर्वी मोबाईल नंबर खेळा/जोडा!' : 'Please add a phone number first!');
      return;
    }

    const template = isToGet
      ? TRANSLATIONS.whatsappMessageGive[lang]
      : TRANSLATIONS.whatsappMessageGet[lang];

    const filledMsg = template
      .replace('*NAME*', person.name)
      .replace('*AMOUNT*', `₹${absBalance}`);

    const cleanPhone = person.phone.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanPhone.startsWith('91') || cleanPhone.length < 10 ? cleanPhone : '91' + cleanPhone}?text=${encodeURIComponent(filledMsg)}`;
    window.open(waUrl, '_blank');
  };

  const handlePromptPhoneEdit = () => {
    const currentPhone = person.phone || '';
    const nextPhone = prompt(
      lang === 'marathi' ? 'येथे मोबाईल नंबर प्रविष्ट करा:' : 'Enter Phone Number here:',
      currentPhone
    );
    if (nextPhone !== null) {
      onEditPhone(person.id, nextPhone.trim());
    }
  };

  const handleDeleteClick = () => {
    const cfm = window.confirm(getTranslation('deleteConfirm', lang));
    if (cfm) {
      onDeletePerson(person.id);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md bg-stone-50 min-h-screen flex flex-col">
      {/* Top sticky app header */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-105 bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 transition"
            aria-label="Go Back"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900 truncate max-w-[180px] leading-tight">
              {person.name}
            </h1>
            <p className="text-[10px] text-gray-500 font-semibold tracking-wide uppercase mt-0.5">
              {person.phone ? `📞 ${person.phone}` : (lang === 'marathi' ? 'मोबाईल नंबर जोडा' : 'No Phone')}
            </p>
          </div>
        </div>

        <div className="flex gap-1.5">
          <button
            onClick={handlePromptPhoneEdit}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-indigo-600 transition"
            title="Edit Phone"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={handleDeleteClick}
            className="rounded-full p-2 text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition"
            title="Delete Person"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Main Container details content */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {/* Person details header profile box */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm text-center space-y-4">
          <div className="flex justify-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl ${getAvatarStyle(person.name)}`}>
              {getInitials(person.name)}
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-lg font-bold text-gray-800 leading-tight">
              {person.name}
            </h2>
            <div className="flex items-center justify-center gap-2">
              <span className="text-xs font-semibold text-gray-400">
                {person.phone ? `Mobile: ${person.phone}` : (lang === 'marathi' ? 'मोबाईल नंबर जोडलेला नाही' : 'No mobile number added')}
              </span>
              <button
                onClick={handlePromptPhoneEdit}
                className="text-[10px] text-indigo-700 font-bold hover:underline"
              >
                ({lang === 'marathi' ? 'बदला' : 'Change'})
              </button>
            </div>
          </div>

          {/* Large Ledger banner strip */}
          <div
            className={`rounded-2xl p-4 text-center ${
              isSettled
                ? 'bg-gray-50 border border-gray-100'
                : isToGet
                ? 'bg-emerald-50 border border-emerald-100/30'
                : 'bg-rose-50 border border-rose-100/30'
            }`}
          >
            <span
              className={`text-[11px] font-bold tracking-wider uppercase ${
                isSettled ? 'text-gray-400' : isToGet ? 'text-emerald-800' : 'text-rose-800'
              }`}
            >
              {isSettled
                ? getTranslation('settledWith', lang)
                : isToGet
                ? getTranslation('sheHeWillGiveYou', lang)
                : getTranslation('youOweHerHim', lang)}
            </span>
            <div
              className={`text-3xl font-extrabold mt-1 ${
                isSettled ? 'text-gray-500' : isToGet ? 'text-emerald-700' : 'text-rose-700'
              }`}
            >
              ₹{absBalance.toLocaleString('en-IN')}
            </div>
          </div>

          {/* Send Reminder button if not settled */}
          {!isSettled && (
            <button
              onClick={handleSendReminder}
              disabled={!person.phone}
              className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-bold text-white transition-all shadow-md ${
                person.phone
                  ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100 active:scale-[0.99]'
                  : 'bg-gray-300 cursor-not-allowed shadow-none'
              }`}
            >
              <MessageSquare size={16} />
              <span>{getTranslation('shareOnWhatsApp', lang)}</span>
            </button>
          )}
        </div>

        {/* Ledger Transaction History block */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">
            {getTranslation('transactions', lang)}
          </h3>

          <div className="space-y-2">
            {person.transactions.length === 0 ? (
              <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-xs text-gray-500 font-medium">
                {getTranslation('noTransactionsYet', lang)}
              </div>
            ) : (
              [...person.transactions].reverse().map((tx) => {
                const txIsGive = tx.type === 'give'; // Mother gave money

                return (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-3.5 shadow-sm relative group"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center ${
                          txIsGive
                            ? 'bg-rose-50 text-rose-750'
                            : 'bg-emerald-50 text-emerald-750'
                        }`}
                      >
                        {txIsGive ? <ArrowUpRight size={16} /> : <ArrowDownLeft size={16} />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">
                          {tx.note || (txIsGive ? (lang === 'marathi' ? 'तुम्ही उधार दिले' : 'You Lent') : (lang === 'marathi' ? 'तुम्हाला परत मिळाले' : 'You Received'))}
                        </p>
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-semibold tracking-wide uppercase mt-0.5">
                          <Calendar size={10} />
                          <span>{tx.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p
                          className={`text-sm font-extrabold ${
                            txIsGive ? 'text-rose-700' : 'text-emerald-700'
                          }`}
                        >
                          {txIsGive ? '-' : '+'}₹{tx.amount.toLocaleString('en-IN')}
                        </p>
                        <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider">
                          {txIsGive
                            ? (lang === 'marathi' ? 'दिले (-) / Out' : 'Gave')
                            : (lang === 'marathi' ? 'मिळाले (+) / In' : 'Got')}
                        </p>
                      </div>

                      {/* Explicit clean Delete transaction item button */}
                      <button
                        onClick={() => onDeleteTransaction(person.id, tx.id)}
                        className="rounded-full p-1 text-gray-300 hover:bg-gray-100 hover:text-rose-600 transition"
                        title="Delete Txn"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Primary Action bar for Add Entries (Sticky Bottom buttons) */}
      <div className="grid grid-cols-2 gap-3.5 bg-white border-t border-gray-100 p-4 shadow-xl">
        {/* red button GAVE CREDIT (उधार दिया) */}
        <button
          onClick={() => onOpenAddTxn('give')}
          className="flex items-center justify-center gap-1.5 rounded-2xl bg-rose-600 py-3.5 font-bold text-white shadow-md shadow-rose-100 hover:bg-rose-700 active:scale-95 transition-all text-[15px]"
        >
          <ArrowUpRight size={18} />
          <span>{getTranslation('gaveMoney', lang)}</span>
        </button>

        {/* green button RECEIVED CREDIT (वापस मिला) */}
        <button
          onClick={() => onOpenAddTxn('get')}
          className="flex items-center justify-center gap-1.5 rounded-2xl bg-emerald-600 py-3.5 font-bold text-white shadow-md shadow-emerald-100 hover:bg-emerald-700 active:scale-95 transition-all text-[15px]"
        >
          <ArrowDownLeft size={18} />
          <span>{getTranslation('receivedMoney', lang)}</span>
        </button>
      </div>
    </div>
  );
}
