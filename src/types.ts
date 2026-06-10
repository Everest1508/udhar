/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Transaction {
  id: string;
  type: 'give' | 'get'; // 'give' (Mother gave money - she will get it back), 'get' (Mother took money - she has to give it back)
  amount: number;
  note: string;
  date: string; // ISO string or local date string
}

export interface Person {
  id: string;
  name: string;
  phone?: string;
  transactions: Transaction[];
  createdAt: string;
}

export type LanguageMode = 'bilingual' | 'english' | 'marathi';

export interface AppState {
  people: Person[];
  language: LanguageMode;
}
