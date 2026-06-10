/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LanguageMode } from '../types';

export const TRANSLATIONS = {
  appName: {
    bilingual: 'Udhar Book / उधार खाते',
    english: 'Udhar Book',
    marathi: 'उधार खाते',
  },
  tagline: {
    bilingual: 'Easy and secure personal ledger notebook',
    english: 'Simple offline digital ledger',
    marathi: 'सोपे आणि सुरक्षित डिजिटल बहीखाते',
  },
  youWillGet: {
    bilingual: 'You will get / येणे आहे',
    english: 'You will get',
    marathi: 'येणे आहे (मला मिळतील)',
  },
  youWillGive: {
    bilingual: 'You will give / देणे आहे',
    english: 'You will give',
    marathi: 'देणे आहे (मला द्यायचे आहेत)',
  },
  netBalance: {
    bilingual: 'Net Balance / एकूण शिल्लक',
    english: 'Net Balance',
    marathi: 'एकूण हिशोब',
  },
  searchPlaceholder: {
    bilingual: 'Search name / नाव शोधा...',
    english: 'Search name...',
    marathi: 'नाव शोधा...',
  },
  all: {
    bilingual: 'All / सर्व',
    english: 'All',
    marathi: 'सर्व लोक',
  },
  willGetFilter: {
    bilingual: 'Will Get / येणे आहे',
    english: 'Will Get',
    marathi: 'येणे आहे',
  },
  willGiveFilter: {
    bilingual: 'Will Give / देणे आहे',
    english: 'Will Give',
    marathi: 'देणे आहे',
  },
  settledFilter: {
    bilingual: 'Settled / पूर्ण झाले',
    english: 'Settled',
    marathi: 'हिशोब पूर्ण',
  },
  noPeopleYet: {
    bilingual: 'No people added yet. Add someone to start!',
    english: 'No people added yet. Add someone to start!',
    marathi: 'कोणतेही नाव जोडलेले नाही. सुरु करण्यासाठी नवीन नाव जोडा!',
  },
  addPerson: {
    bilingual: 'Add Person / नवीन नाव जोडा',
    english: 'Add Person',
    marathi: 'नवीन नाव जोडा',
  },
  editPerson: {
    bilingual: 'Edit Name / नाव बदला',
    english: 'Edit Person',
    marathi: 'नाव दुरुस्त करा',
  },
  nameLabel: {
    bilingual: 'Full Name / पूर्ण नाव *',
    english: 'Full Name *',
    marathi: 'पूर्ण नाव *',
  },
  phoneLabel: {
    bilingual: 'Phone Number (Optional) / मोबाईल नंबर *',
    english: 'Phone Number (Optional)',
    marathi: 'मोबाईल नंबर (पर्यायी)',
  },
  importContact: {
    bilingual: 'Import Contact / संपर्क यादीतून निवडा 📞',
    english: 'Import Contact 📞',
    marathi: 'काँटॅक्ट लिस्टमधून निवडा 📞',
  },
  cancel: {
    bilingual: 'Cancel / रद्द करा',
    english: 'Cancel',
    marathi: 'रद्ध करा',
  },
  save: {
    bilingual: 'Save / जतन करा',
    english: 'Save',
    marathi: 'जतन करा (Save)',
  },
  delete: {
    bilingual: 'Delete / काढून टाका',
    english: 'Delete',
    marathi: 'काढून टाका (Delete)',
  },
  deleteConfirm: {
    bilingual: 'Are you sure you want to delete? This will erase all history.',
    english: 'Are you sure you want to delete this person and all their history?',
    marathi: 'तुम्हाला नक्की हे नाव काढून टाकायचे आहे का? सर्व जुना हिशोब पुसला जाईल.',
  },
  transactions: {
    bilingual: 'Transaction History / जुना हिशोब',
    english: 'Transaction History',
    marathi: 'हिशोबाचा इतिहास',
  },
  gaveMoney: {
    bilingual: 'You Gave / उधार दिले (-)',
    english: 'You Gave (-)',
    marathi: 'तुम्ही उधार दिले (-)',
  },
  receivedMoney: {
    bilingual: 'You Got / परत मिळाले (+)',
    english: 'You Got (+)',
    marathi: 'परत मिळाले (+)',
  },
  settledWith: {
    bilingual: 'Settled / हिशोब नील झाला',
    english: 'Settled',
    marathi: 'हिशोब बरोबर (नील)',
  },
  youGaveHerHim: {
    bilingual: 'You gave her/him / तुम्ही दिले',
    english: 'You gave',
    marathi: 'तुम्ही दिले',
  },
  sheHeWillGiveYou: {
    bilingual: 'She/He will give you / येणे आहे',
    english: 'They will give you',
    marathi: 'त्यांच्याकडून येणे आहे',
  },
  sheHeGaveYou: {
    bilingual: 'She/He gave you / तुम्हाला मिळाले',
    english: 'They gave you',
    marathi: 'तुम्हाला मिळाले / जमा झाले',
  },
  youOweHerHim: {
    bilingual: 'You owe / देणे आहे',
    english: 'You owe them',
    marathi: 'तुम्हाला देणे आहे',
  },
  addTransaction: {
    bilingual: 'Add Entry / नवीन नोंद करा',
    english: 'Add Transaction',
    marathi: 'हिशोब जोडा',
  },
  amountLabel: {
    bilingual: 'Amount / रक्कम (₹) *',
    english: 'Amount (₹) *',
    marathi: 'रक्कम (₹) *',
  },
  noteLabel: {
    bilingual: 'Details / कशासाठी? (उदा. दूध, किराणा, रोख) *',
    english: 'Details (e.g. groceries, cash)',
    marathi: 'कशासाठी? (उदा. दूध, किराणा, रोख राशि) *',
  },
  quickAmounts: {
    bilingual: 'Quick Rupees / पटकन रक्कम निवडा ₹',
    english: 'Quick Amounts',
    marathi: 'पटकन रक्कम निवडा ₹',
  },
  quickNotes: {
    bilingual: 'Quick Details / पटकन तपशील निवडा',
    english: 'Quick Details',
    marathi: 'पटकन तपशील निवडा',
  },
  shareOnWhatsApp: {
    bilingual: 'Send WhatsApp Reminder / व्हॉट्सॲपवर आठवण करा',
    english: 'Send WhatsApp Reminder',
    marathi: 'व्हॉट्सॲपवर संदेश पाठवा 📱',
  },
  settings: {
    bilingual: 'Settings / सेटिंग्ज',
    english: 'Settings',
    marathi: 'सेटिंग्ज',
  },
  backupSection: {
    bilingual: 'Backup & Restore / बॅकअप आणि सुरक्षा',
    english: 'Backup & Restore',
    marathi: 'डेटा सुरक्षित ठेवा (बॅकअप)',
  },
  backupDesc: {
    bilingual: 'Keep your data safe by downloading a copy. You can restore it anytime.',
    english: 'Download a backup file to keep your data safe. You can restore it if you change phones.',
    marathi: 'तुमचा हिशोब सुरक्षित ठेवण्यासाठी बॅकअप फाईल डाऊनलोड करा. मोबाईल बदलल्यास तुम्ही हा हिशोब परत आणू शकता.',
  },
  downloadBackup: {
    bilingual: 'Download Backup / बॅकअप फाईल डाऊनलोड करा 📥',
    english: 'Download Backup 📥',
    marathi: 'बॅकअप फाईल डाऊनलोड करा 📥',
  },
  restoreBackup: {
    bilingual: 'Upload Backup / जुना बॅकअप परत आणा 📤',
    english: 'Upload Backup 📤',
    marathi: 'जुनी बॅकअप फाईल निवडा 📤',
  },
  restoreSuccess: {
    bilingual: 'Data restored successfully! / हिशोब यशस्वीरित्या परत आला!',
    english: 'Backup restored successfully!',
    marathi: 'हिशोब यशस्वीरित्या लोड झाला!',
  },
  restoreError: {
    bilingual: 'Invalid backup file! / चुकीची बॅकअप फाईल!',
    english: 'Could not restore backup. Invalid file format.',
    marathi: 'ही फाईल बरोबर नाही! कृपया योग्य बॅकअप फाईल निवडा.',
  },
  languageSelection: {
    bilingual: 'Language / भाषा बदला',
    english: 'Language Selection',
    marathi: 'भाषा निवडा',
  },
  bilingualLabel: {
    bilingual: 'Bilingual / दोन्ही (English + मराठी) - आईसाठी सोपे',
    english: 'Bilingual (English + मराठी)',
    marathi: 'दोन्ही (English + मराठी)',
  },
  activeLanguage: {
    bilingual: 'Selected / चालू',
    english: 'Active',
    marathi: 'सक्रिय (चालू)',
  },
  noTransactionsYet: {
    bilingual: 'No history yet. Tap buttons below to add entries.',
    english: 'No history yet. Tap buttons below to add entries.',
    marathi: 'अद्याप कोणताही हिशोब नाही. खालील बटण दाबून नोंद करा.',
  },
  whatsappMessageGive: {
    english: 'Dear *NAME*, a friendly reminder that you have a pending balance of *AMOUNT* with me on Udhar Book. Thank you!',
    marathi: 'नमस्कार *NAME*, आपल्या हिशोबानुसार आपल्याकडे ₹*AMOUNT* येणे बाकी आहे. धन्यवाद!',
    bilingual: 'नमस्कार *NAME*, Udhar Book हिशोबानुसार आपले ₹*AMOUNT* येणे शिल्लक आहे. धन्यवाद!',
  },
  whatsappMessageGet: {
    english: 'Dear *NAME*, just to note that I have a balance of *AMOUNT* to give you on Udhar Book. Thank you!',
    marathi: 'नमस्कार *NAME*, आपल्या हिशोबानुसार मला आपल्याला ₹*AMOUNT* देणे बाकी आहे. धन्यवाद!',
    bilingual: 'नमस्कार *NAME*, Udhar Book हिशोबानुसार मला आपल्याला ₹*AMOUNT* देणे बाकी आहे. धन्यवाद!',
  },
  quickNoteItems: [
    { label: 'Milk / दूध 🥛', value: 'Milk / दूध' },
    { label: 'Ration / किराणा 🛒', value: 'Ration / किराणा' },
    { label: 'Cash / रोख 💵', value: 'Cash / रोख' },
    { label: 'Vegetables / भाजीपाला 🥦', value: 'Vegetables / भाजी' },
    { label: 'Loan / उसने 🤝', value: 'Loan / उसने' },
    { label: 'Rent / भाडे 🏠', value: 'Rent / भाडे' },
    { label: 'Gas / गॅस 🔥', value: 'Gas / गॅस' },
    { label: 'Other / इतर 📝', value: 'Other' },
  ],
};

export function getTranslation(key: keyof typeof TRANSLATIONS, mode: LanguageMode): any {
  const item = TRANSLATIONS[key];
  if (!item) return '';
  return (item as any)[mode] || (item as any)['bilingual'] || '';
}
