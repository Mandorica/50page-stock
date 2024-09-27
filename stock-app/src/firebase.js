import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { CAPCITY } from "./constants/Common";
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
  measurementId: "G-EVC3L5CG6S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

// 초기 재고 데이터 설정 함수
export const initializeInventoryData = async () => {
  const db = getDatabase(); // 데이터베이스 초기화
  const initialInventory = {
    kiosk_1: {
      name: "kiosk 1",
      quantity: CAPCITY,
    },
    kiosk_2: {
      name: "kiosk 2",
      quantity: CAPCITY,
    },
  };

  // Firebase에 데이터 설정
  await set(ref(db, "inventory"), initialInventory);
};

// 재고 초기화 함수
export const resetProductQuantity = async (kioskName, newQuantity) => {
  //kioskName 에 공백이 들어가는 경우 "_"으로 치환해줘야함.
  //다만 이 부분은 예외케이스 발생 여지가 있기 때문에 논의가 필요.
  await set(ref(database, `inventory/${kioskName}/quantity`), newQuantity);
};
