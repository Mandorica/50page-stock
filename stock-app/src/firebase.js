// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwD8DbcPoIbLRPpTgbfRtOHaxT8zL4__g",
  authDomain: "fifty-page.firebaseapp.com",
  databaseURL: "https://fifty-page-default-rtdb.firebaseio.com",
  projectId: "fifty-page",
  storageBucket: "fifty-page.appspot.com",
  messagingSenderId: "1090594085393",
  appId: "1:1090594085393:web:7d696ac2c00095fe862fb0",
  measurementId: "G-EVC3L5CG6S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 초기 재고 데이터 설정 함수
export const initializeInventoryData = async () => {
  const initialInventory = {
    kiosk_1: {
      name: "kiosk 1",
      quantity: 46,
    },
    kiosk_2: {
      name: "kiosk 2",
      quantity: 46,
    },
  };

  // Firebase에 데이터 설정
  await set(ref(database, "inventory"), initialInventory);
};

// 재고 초기화 함수
export const resetProductQuantity = async (kioskId, newQuantity) => {
    const db = getDatabase();
    await set(ref(db, `inventory/${kioskId}/quantity`), newQuantity);
  };