import React, { useState, useEffect } from "react";
import {
  database,
  initializeInventoryData,
  resetProductQuantity,
} from "../firebase";
import { ref, onValue } from "firebase/database";
import "./Inventory.css";

const Inventory = () => {
  const [stock, setstock] = useState({});

  const handleResetClick = (key) => {
    // 확인 대화 상자를 띄우고, 사용자가 "확인"을 클릭했을 때만 초기화
    if (window.confirm(`${stock[key].name}을 초기화하시겠습니까?`)) {
      resetProductQuantity(key, 46);
    }
  };

  useEffect(() => {
    // 데이터베이스 참조 설정
    const dbRef = ref(database, "inventory");

    // onValue를 사용하여 데이터의 실시간 업데이트
    const unsubscribe = onValue(
      dbRef,
      //데이터 업데이트 될 때마다 실행
      (snapshot) => {
        if (snapshot.exists()) {
          setstock(snapshot.val()); // 상태 업데이트
        }
        //onValue에 초기화 함수를 같이 묶어놔서 파이어베이스 웹 상에서 데이터 삭제 시에도 계속 초기화 함.
        else {
          // 데이터가 없을 경우 초기화 함수 호출
          console.log("값이 존재하지 않습니다. 초기화 합니다.");
          initializeInventoryData();
        }
      },
      (error) => {
        console.error("데이터를 가져오는 중 오류 발생: ", error);
      }
    );

    // 컴포넌트가 언마운트될 때 리스너를 제거
    return () => unsubscribe();
  }, []);

  return (
    <div className="wrap">
      <h1>Inventory</h1>
      <ul>
        {Object.keys(stock).map((key) => (
          <li className="post" key={key} data-key={key}>
            {stock[key].name}: {stock[key].quantity} left
            <button class="reset-btn" onClick={() => handleResetClick(key)}>
              초기화
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;
