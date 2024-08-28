import React, { useState, useEffect } from "react";
import { database, ref, onValue, initializestockData } from "../firebase";

const stock = () => {
  const [stock, setstock] = useState({});

  useEffect(() => {
    // 초기 데이터가 없을 경우에만 초기화 함수 호출
    const stockRef = ref(database, "stock");

    onValue(stockRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        initializestockData();
      } else {
        setstock(data);
      }
    });
  }, []);

  return (
    <div>
      <h1>stock</h1>
      <ul>
        {Object.keys(stock).map((key) => (
          <li key={key}>
            {stock[key].name}: {stock[key].quantity} left
          </li>
        ))}
      </ul>
    </div>
  );  
};

export default stock;