/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { getTranslation } from '../utils/translations';
import { LanguageMode } from '../types';
import { Download, Upload, Globe, Check, ShieldAlert, ArrowLeft } from 'lucide-react';

interface SettingsPanelProps {
  currentLang: LanguageMode;
  onLanguageChange: (lang: LanguageMode) => void;
  onRestore: (restoredData: any) => boolean;
  onBack: () => void;
  onExport: () => void;
}

export default function SettingsPanel({
  currentLang,
  onLanguageChange,
  onRestore,
  onBack,
  onExport,
}: SettingsPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('');
    setSuccessMsg('');
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        
        // Basic validation of backup structure
        if (Array.isArray(parsed)) {
          const isValid = onRestore(parsed);
          if (isValid) {
            setSuccessMsg(getTranslation('restoreSuccess', currentLang));
            if (fileInputRef.current) fileInputRef.current.value = '';
          } else {
            setErrorMsg(getTranslation('restoreError', currentLang));
          }
        } else {
          setErrorMsg(getTranslation('restoreError', currentLang));
        }
      } catch (err) {
        setErrorMsg(getTranslation('restoreError', currentLang));
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="mx-auto w-full max-w-md bg-stone-50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-gray-100 bg-white px-4 py-4 shadow-sm">
        <button
          onClick={onBack}
          className="rounded-full p-2 text-gray-500 hover:bg-gray-100 transition"
          aria-label="Go Back"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">
            {getTranslation('settings', currentLang)}
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            {getTranslation('tagline', currentLang)}
          </p>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-5 overflow-y-auto">
        {/* Language Selection */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 border-b border-gray-50 pb-3">
            <Globe size={20} className="text-indigo-600" />
            <h2 className="font-semibold text-gray-800 text-base">
              {getTranslation('languageSelection', currentLang)}
            </h2>
          </div>

          <div className="space-y-2">
            {/* Bilingual (Default recommendation for mother) */}
            <button
              onClick={() => onLanguageChange('bilingual')}
              className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all ${
                currentLang === 'bilingual'
                  ? 'border-indigo-600 bg-indigo-50/40 text-indigo-950 font-semibold'
                  : 'border-gray-100 bg-gray-50/50 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="space-y-0.5">
                <span className="block text-sm">Bilingual / दोन्ही (English + मराठी)</span>
                <span className="block text-xs font-normal text-gray-500">
                  Easy side-by-side translation (आईसाठी सोपे)
                </span>
              </div>
              {currentLang === 'bilingual' && (
                <span className="rounded-full bg-indigo-600 p-1 text-white">
                  <Check size={14} />
                </span>
              )}
            </button>

            {/* English */}
            <button
              onClick={() => onLanguageChange('english')}
              className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all ${
                currentLang === 'english'
                  ? 'border-indigo-600 bg-indigo-50/40 text-indigo-950 font-semibold'
                  : 'border-gray-100 bg-gray-50/50 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-sm">English / इंग्रजी</span>
              {currentLang === 'english' && (
                <span className="rounded-full bg-indigo-600 p-1 text-white">
                  <Check size={14} />
                </span>
              )}
            </button>

            {/* Marathi */}
            <button
              onClick={() => onLanguageChange('marathi')}
              className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all ${
                currentLang === 'marathi'
                  ? 'border-indigo-600 bg-indigo-50/40 text-indigo-950 font-semibold'
                  : 'border-gray-100 bg-gray-50/50 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-sm">Marathi / मराठी</span>
              {currentLang === 'marathi' && (
                <span className="rounded-full bg-indigo-600 p-1 text-white">
                  <Check size={14} />
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Backup & Restore */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-50 pb-3">
            <Download size={20} className="text-amber-600" />
            <h2 className="font-semibold text-gray-800 text-base">
              {getTranslation('backupSection', currentLang)}
            </h2>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed font-normal">
            {getTranslation('backupDesc', currentLang)}
          </p>

          {successMsg && (
            <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-semibold text-emerald-800">
              <Check size={16} className="text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="flex items-center gap-2 rounded-xl bg-rose-50 p-3 text-xs font-semibold text-rose-800">
              <ShieldAlert size={16} className="text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2">
            <button
              onClick={onExport}
              className="flex items-center justify-center gap-2.5 rounded-xl bg-amber-600 py-3.5 px-4 text-sm font-semibold text-white shadow-sm hover:bg-amber-700 transition"
            >
              <Download size={16} />
              <span>{getTranslation('downloadBackup', currentLang)}</span>
            </button>

            <button
              onClick={triggerFileInput}
              className="flex items-center justify-center gap-2.5 rounded-xl border border-dashed border-gray-300 bg-gray-50/50 py-3.5 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition"
            >
              <Upload size={16} className="text-gray-500" />
              <span>{getTranslation('restoreBackup', currentLang)}</span>
            </button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".json"
            className="hidden"
          />
        </div>

        {/* Safe Usage Disclaimer */}
        <div className="rounded-2xl bg-indigo-50/30 border border-indigo-50/50 p-4 text-center">
          <p className="text-[11px] font-medium text-indigo-900 leading-relaxed">
            🌿 100% Secure &amp; Private. Your ledger book data is stored ONLY on your local phone / browser memory.
          </p>
        </div>
      </div>
    </div>
  );
}
