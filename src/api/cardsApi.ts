import { MMKV } from 'react-native-mmkv';

let storage: MMKV | null = null;

function getStorage() {
  if (!storage) {
    storage = new MMKV();
  }
  return storage;
}

const STORAGE_KEY = 'CARDS';

function randomDigits(length: number) {
  let str = '';
  for (let i = 0; i < length; i++) {str += Math.floor(Math.random() * 10);}
  return str;
}

function generateCardMeta() {
  return {
    cardNumber: randomDigits(16).trim(),
    cvv: randomDigits(3),
    expiry: `${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')} / ${String(new Date().getFullYear() + 4).slice(-2)}`,
  };
}

async function getAllCards() {
  await new Promise(res => setTimeout(res, 400));
  const data = getStorage().getString(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

async function saveCards(cards: any[]) {
  getStorage().set(STORAGE_KEY, JSON.stringify(cards));
}

async function topUpBalance(cardId: string, amount: number) {
  const cards = await getAllCards();
  const updated = cards.map((c: any) => c.id === cardId ? { ...c, cardBalance: c.cardBalance + amount } : c);
  await saveCards(updated);
  return updated.find((c: any) => c.id === cardId);
}

async function freezeCard(cardId: string, freeze: boolean) {
  console.log('API: Freezing card with ID:', cardId, 'Freeze status:', freeze);
  const cards = await getAllCards();
  const updated = cards.map((c: any) => c.id === cardId ? { ...c, isCardFrozen: freeze } : c);
  await saveCards(updated);
  return updated.find((c: any) => c.id === cardId);
}

async function addDailyLimit(cardId: string, limit: number) {
  const cards = await getAllCards();
  const updated = cards.map((c: any) => c.id === cardId ? { ...c, isWeeklyLimitEnabled: true, weeklyLimit: limit } : c);
  await saveCards(updated);
  return updated.find((c: any) => c.id === cardId);
}

async function removeDailyLimit(cardId: string) {
  const cards = await getAllCards();
  const updated = cards.map((c: any) => c.id === cardId ? { ...c, isWeeklyLimitEnabled: false, weeklyLimit: undefined } : c);
  await saveCards(updated);
  return updated.find((c: any) => c.id === cardId);
}

async function addNewCard(cardName: string) {
  const meta = generateCardMeta();
  // Harcoded new card values
  const newCard = {
    id: Date.now().toString(),
    metaData: {
      cardName,
      ...meta,
      cardType: 'VISA',
      cardBrand: 'VISA',
      cardIssuer: 'Aspire',
      cardIssuerLogo: 'aspire',
      cardIssuerColor: '#01D167',
      cardIssuerTextColor: '#FFFFFF',
    },
    cardBalance: 5000,
    isWeeklyLimitEnabled: false,
    isCardFrozen: false,
    spentBalance: 0,
    weeklyLimit: undefined,
  };
  const cards = await getAllCards();
  const updated = [...cards, newCard];
  await saveCards(updated);
  return newCard;
}

export default {
  getAllCards,
  topUpBalance,
  freezeCard,
  addDailyLimit,
  removeDailyLimit,
  addNewCard,
  saveCards,
};
