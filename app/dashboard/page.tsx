"use client";

import { useState, useEffect } from "react";
import { db } from "../firebase"; // 自分の設定ファイルの場所に合わせる
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";
// 1. データの「型」を定義（TypeScriptのエラーを防ぐためのルール）
interface Message {
  id: string;
  text: string;
}

export default function Dashboard() {
  // 2. メッセージを入れる箱を「Messageという型の配列」として用意
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // 3. Firebaseからデータを「新しい順」に取得する指示書を作成
    const q = query(collection(db, "test-messages"), orderBy("createdAt", "desc"));
    
    // 4. Firebaseの見守り（監視）を開始
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // 届いた生データを、idとtextだけの使いやすい形に変換
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as { text: string }),
      }));
      
      // 箱の中身を更新（これで画面が書き換わる）
      setMessages(data);
    });

    // 5. ページを離れる時にお片付け
    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: "50px" }}>
      <h1>メッセージ一覧</h1>
      <hr />
      <ul>
  {messages.map((msg) => (
    <li key={msg.id} style={{ marginBottom: "10px", display: "flex", gap: "10px", alignItems: "center" }}>
      <span>{msg.text}</span>
      <button 
        onClick={async () => {
          if (confirm("本当に削除しますか？")) {
            await deleteDoc(doc(db, "test-messages", msg.id));
          }
        }}
        style={{ color: "red", cursor: "pointer", fontSize: "12px" }}
      >
        削除
      </button>
    </li>
  ))}
</ul>
      {messages.length === 0 && <p>まだメッセージはありません。</p>}
    </div>
  );
}