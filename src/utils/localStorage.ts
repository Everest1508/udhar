/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Person, LanguageMode } from '../types';

const STORAGE_KEY_PEOPLE = 'udhar_book_people_v1';
const STORAGE_KEY_LANG = 'udhar_book_lang_v1';

// Pre-populate with some friendly default examples so it's not looking empty and mother can see how it works instantly!
const INITIAL_MOCK_PEOPLE: Person[] = [
  {
    id: 'mock-1',
    name: 'Ramesh Singh (दूधवाला)',
    phone: '9876543210',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    transactions: [
      {
        id: 'tx-1-1',
        type: 'get', // Mother took money/services, so she owes money (will give)
        amount: 800,
        note: 'Milk / दूध🥛',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
        }),
      },
    ],
  },
  {
    id: 'mock-2',
    name: 'Kamla Bhabhi',
    phone: '9123456789',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    transactions: [
      {
        id: 'tx-2-1',
        type: 'give', // Mother gave money, so she will get it back
        amount: 1500,
        note: 'Emergency Ration / राशन 🛒',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
        }),
      },
      {
        id: 'tx-2-2',
        type: 'get', // She paid back some portion of it
        amount: 500,
        note: 'Cash Returned / नकद 💵',
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
        }),
      },
    ],
  },
];

export function getStoredPeople(): Person[] {
  const stored = localStorage.getItem(STORAGE_KEY_PEOPLE);
  if (!stored) {
    // If empty, save the mock ones, so she immediately sees a beautiful example
    setStoredPeople(INITIAL_MOCK_PEOPLE);
    return INITIAL_MOCK_PEOPLE;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error('Failed to parse stored people', e);
    return [];
  }
}

export function setStoredPeople(people: Person[]): void {
  localStorage.setItem(STORAGE_KEY_PEOPLE, JSON.stringify(people));
}

export function getStoredLanguage(): LanguageMode {
  const stored = localStorage.getItem(STORAGE_KEY_LANG);
  if (!stored) {
    return 'bilingual'; // High usability default
  }
  return stored as LanguageMode;
}

export function setStoredLanguage(lang: LanguageMode): void {
  localStorage.setItem(STORAGE_KEY_LANG, lang);
}

// Balance calculator helper
export function calculatePersonBalance(person: Person): number {
  return person.transactions.reduce((sum, tx) => {
    if (tx.type === 'give') {
      return sum + tx.amount; // She gave money, so they owe her (positive balance -> she will get)
    } else {
      return sum - tx.amount; // She got money/credit, so she owes them (negative balance -> she will give)
    }
  }, 0);
}
