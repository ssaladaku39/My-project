"use client";
import { db } from "./firebase"; // 作成した設定ファイルを読み込む
import { collection, addDoc } from "firebase/firestore";

export default function Home() {
  const testSave = async () => {
    try {
      // "test-messages" という名前のコレクション（箱）にデータを保存
      await addDoc(collection(db, "test-messages"), {
        text: "初めてのFirebase保存に成功！",
        timestamp: new Date(),
      });
      alert("Firebaseへの保存に成功しました！");
    } catch (e) {
      console.error("保存エラー: ", e);
      alert("エラーが発生しました。コンソールを確認してください。");
    }
  };

  return (
    <main style={{ padding: "100px", textAlign: "center" }}>
      <h1>Next.js + Firebase 連携テスト</h1>
      <button 
        onClick={testSave}
        style={{ 
          padding: "10px 20px", 
          fontSize: "18px", 
          cursor: "pointer",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}
      >
        Firebaseにデータを送る
      </button>
    </main>
  );
}