/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Person, Transaction, LanguageMode } from './types';
import {
  getStoredPeople,
  setStoredPeople,
  getStoredLanguage,
  setStoredLanguage,
} from './utils/localStorage';
import MainDashboard from './components/MainDashboard';
import PersonDetail from './components/PersonDetail';
import SettingsPanel from './components/SettingsPanel';
import AddPersonModal from './components/AddPersonModal';
import AddTxnModal from './components/AddTxnModal';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [people, setPeople] = useState<Person[]>([]);
  const [language, setLanguage] = useState<LanguageMode>('bilingual');
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'detail' | 'settings'>('dashboard');

  // Modal controls
  const [isAddPersonOpen, setIsAddPersonOpen] = useState(false);
  const [isAddTxnOpen, setIsAddTxnOpen] = useState(false);
  const [addTxnType, setAddTxnType] = useState<'give' | 'get'>('give');

  // Load from local storage
  useEffect(() => {
    setPeople(getStoredPeople());
    setLanguage(getStoredLanguage());
  }, []);

  // Update localStorage when people changes
  const savePeopleData = (updatedPeople: Person[]) => {
    setPeople(updatedPeople);
    setStoredPeople(updatedPeople);
  };

  const handleLanguageChange = (lang: LanguageMode) => {
    setLanguage(lang);
    setStoredLanguage(lang);
  };

  // Add person action handler
  const handleAddPerson = (name: string, phone: string) => {
    const newPerson: Person = {
      id: 'person_' + Date.now(),
      name,
      phone: phone || undefined,
      transactions: [],
      createdAt: new Date().toISOString(),
    };
    savePeopleData([newPerson, ...people]);
    setIsAddPersonOpen(false);
  };

  const handleEditPhone = (personId: string, phone: string) => {
    const updated = people.map((p) => {
      if (p.id === personId) {
        return { ...p, phone: phone || undefined };
      }
      return p;
    });
    savePeopleData(updated);
  };

  const handleDeletePerson = (personId: string) => {
    const updated = people.filter((p) => p.id !== personId);
    savePeopleData(updated);
    setSelectedPersonId(null);
    setCurrentView('dashboard');
  };

  // Add transaction action handler
  const handleSaveTransaction = (amount: number, note: string) => {
    if (!selectedPersonId) return;

    const newTxn: Transaction = {
      id: 'tx_' + Date.now(),
      type: addTxnType,
      amount,
      note,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
      }),
    };

    const updated = people.map((p) => {
      if (p.id === selectedPersonId) {
        return {
          ...p,
          transactions: [...p.transactions, newTxn],
        };
      }
      return p;
    });

    savePeopleData(updated);
    setIsAddTxnOpen(false);
  };

  // Delete transaction action handler
  const handleDeleteTransaction = (personId: string, txnId: string) => {
    const updated = people.map((p) => {
      if (p.id === personId) {
        return {
          ...p,
          transactions: p.transactions.filter((tx) => tx.id !== txnId),
        };
      }
      return p;
    });
    savePeopleData(updated);
  };

  // Backup restore action handler
  const handleRestoreData = (restoredArray: any): boolean => {
    try {
      // Validate that it looks like a valid list of persons
      const isValid = restoredArray.every((itm: any) => {
        return (
          typeof itm.id === 'string' &&
          typeof itm.name === 'string' &&
          Array.isArray(itm.transactions)
        );
      });
      if (isValid) {
        savePeopleData(restoredArray);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // Backup export action handler
  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(people, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'udhar_book_backup.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const selectedPerson = people.find((p) => p.id === selectedPersonId);

  return (
    <div id="pwa-app-root" className="min-h-screen bg-stone-100 sm:py-6">
      <div className="mx-auto max-w-md bg-white shadow-2xl sm:rounded-3xl overflow-hidden min-h-screen sm:min-h-[85vh] relative flex flex-col">
        
        <AnimatePresence mode="wait">
          {currentView === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="flex-1 flex flex-col"
            >
              <MainDashboard
                people={people}
                lang={language}
                onSelectPerson={(id) => {
                  setSelectedPersonId(id);
                  setCurrentView('detail');
                }}
                onAddPersonClick={() => setIsAddPersonOpen(true)}
                onOpenSettings={() => setCurrentView('settings')}
              />
            </motion.div>
          )}

          {currentView === 'detail' && selectedPerson && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.15 }}
              className="flex-1 flex flex-col"
            >
              <PersonDetail
                person={selectedPerson}
                lang={language}
                onBack={() => setCurrentView('dashboard')}
                onDeletePerson={handleDeletePerson}
                onDeleteTransaction={handleDeleteTransaction}
                onEditPhone={handleEditPhone}
                onOpenAddTxn={(type) => {
                  setAddTxnType(type);
                  setIsAddTxnOpen(true);
                }}
              />
            </motion.div>
          )}

          {currentView === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="flex-1 flex flex-col"
            >
              <SettingsPanel
                currentLang={language}
                onLanguageChange={handleLanguageChange}
                onRestore={handleRestoreData}
                onExport={handleExportData}
                onBack={() => setCurrentView('dashboard')}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal overlays */}
        <AddPersonModal
          isOpen={isAddPersonOpen}
          onClose={() => setIsAddPersonOpen(false)}
          onSave={handleAddPerson}
          lang={language}
        />

        {isAddTxnOpen && selectedPerson && (
          <AddTxnModal
            isOpen={isAddTxnOpen}
            type={addTxnType}
            personName={selectedPerson.name}
            onClose={() => setIsAddTxnOpen(false)}
            onSave={handleSaveTransaction}
            lang={language}
          />
        )}
      </div>
    </div>
  );
}
