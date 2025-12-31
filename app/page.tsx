"use client";

import { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import Link from "next/link";

export default function Home() {
  const [inputText, setInputText] = useState(""); // 入力した文字を覚える箱

  const handleSave = async () => {
    if (!inputText) return alert("文字を入力してね");
    await addDoc(collection(db, "test-messages"), {
      text: inputText,
      createdAt: new Date(),
    });
    alert("保存しました！");
    setInputText(""); // 箱を空にする
  };

  return (
    <div style={{ padding: "50px" }}>
      <h1>メッセージを送る</h1>
      
      <input 
        type="text" 
        value={inputText} 
        onChange={(e) => setInputText(e.target.value)} 
        placeholder="ここに入力"
      />

      <button onClick={handleSave}>Firebaseに保存</button>

      <hr />
      <Link href="/dashboard">保存されたデータを見る →</Link>
    </div>
  );
}