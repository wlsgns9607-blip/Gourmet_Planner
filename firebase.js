/* ============================================================
   미식플레너 — Firebase 연동 파일
   ============================================================

   ⬇️⬇️⬇️ 여기에 본인 Firebase config 붙여넣으세요 ⬇️⬇️⬇️

   ▶ 어디서 가져오나?
     1. https://console.firebase.google.com 접속
     2. 프로젝트 만들기 (이미 있으면 선택)
     3. 톱니바퀴(설정) → 프로젝트 설정 → 일반
     4. "내 앱" 섹션 → 웹 앱 등록 (</> 아이콘)
     5. "SDK 설정 및 구성" → firebaseConfig 객체 복사
     6. 아래 firebaseConfig 부분에 붙여넣기

   ============================================================ */

// Firebase SDK 라이브러리 import (CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";
import {
  getFunctions,
  httpsCallable
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-functions.js";


// ============================================================
// ⬇️⬇️⬇️ 여기 본인 Firebase config 붙여넣기 ⬇️⬇️⬇️
// ============================================================
const firebaseConfig = {
  apiKey: "여기에_본인_API_KEY",
  authDomain: "여기에_본인_도메인.firebaseapp.com",
  projectId: "여기에_본인_프로젝트_ID",
  storageBucket: "여기에_본인_프로젝트.appspot.com",
  messagingSenderId: "여기에_본인_숫자_ID",
  appId: "여기에_본인_앱_ID"
};
// ============================================================
// ⬆️⬆️⬆️ Firebase 콘솔에서 복사한 값으로 교체 ⬆️⬆️⬆️
// ============================================================


// Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app, 'asia-northeast3'); // 서울 리전

// 전역으로 노출 (app.js에서 사용)
window.MP_FB = {
  auth, db, storage, functions,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  collection, addDoc, getDocs, query, where, orderBy, onSnapshot,
  doc, getDoc, updateDoc, serverTimestamp,
  ref, uploadBytes, getDownloadURL,
  httpsCallable
};

console.log("✓ Firebase 연결 완료");


/* ============================================================
   ▼ 아래는 사용 예시 (참고용 주석)
   실제 호출은 app.js에서 window.MP_FB로 접근
   ============================================================ */

/* ---------- 1. 이메일 로그인 ----------
import { signInWithEmailAndPassword } from "firebase/auth";

window.MP_FB.signInWithEmailAndPassword(window.MP_FB.auth, email, password)
  .then(() => go('login-success'))
  .catch(err => toast('로그인 실패: ' + err.message));
*/

/* ---------- 2. 회원가입 ----------
window.MP_FB.createUserWithEmailAndPassword(window.MP_FB.auth, email, password)
  .then(async (userCred) => {
    // Firestore에 유저 정보 추가
    await window.MP_FB.addDoc(
      window.MP_FB.collection(window.MP_FB.db, 'users'),
      {
        uid: userCred.user.uid,
        name: name,
        nickname: nickname,
        phone: phone,
        createdAt: window.MP_FB.serverTimestamp()
      }
    );
    go('login-success');
  });
*/

/* ---------- 3. 구글 로그인 ----------
const provider = new window.MP_FB.GoogleAuthProvider();
window.MP_FB.signInWithPopup(window.MP_FB.auth, provider)
  .then(() => go('login-success'));
*/

/* ---------- 4. 로그아웃 ----------
window.MP_FB.signOut(window.MP_FB.auth).then(() => go('home'));
*/

/* ---------- 5. 방 만들기 + 예약 사진 업로드 ----------
async function createRoom(roomData, photoFile) {
  // 1) 사진 업로드
  const photoRef = window.MP_FB.ref(
    window.MP_FB.storage,
    `reservations/${Date.now()}_${photoFile.name}`
  );
  await window.MP_FB.uploadBytes(photoRef, photoFile);
  const photoURL = await window.MP_FB.getDownloadURL(photoRef);

  // 2) Firestore에 방 추가
  await window.MP_FB.addDoc(
    window.MP_FB.collection(window.MP_FB.db, 'rooms'),
    {
      ...roomData,
      photoURL,
      hostUid: window.MP_FB.auth.currentUser.uid,
      status: 'open',
      createdAt: window.MP_FB.serverTimestamp()
    }
  );
}
*/

/* ---------- 6. 방 리스트 실시간 구독 ----------
const q = window.MP_FB.query(
  window.MP_FB.collection(window.MP_FB.db, 'rooms'),
  window.MP_FB.where('status', '==', 'open'),
  window.MP_FB.orderBy('createdAt', 'desc')
);
window.MP_FB.onSnapshot(q, snapshot => {
  snapshot.docs.forEach(doc => renderRoomCard(doc.data()));
});
*/

/* ---------- 7. 채팅 메시지 보내기 ----------
async function sendMessage(roomId, text) {
  await window.MP_FB.addDoc(
    window.MP_FB.collection(window.MP_FB.db, 'rooms', roomId, 'messages'),
    {
      senderUid: window.MP_FB.auth.currentUser.uid,
      senderName: '박지윤',
      text: text,
      createdAt: window.MP_FB.serverTimestamp()
    }
  );
}
*/

/* ---------- 8. AI 식당 추천 (Gemini Cloud Function 호출) ----------
const recommend = window.MP_FB.httpsCallable(window.MP_FB.functions, 'recommendRestaurants');
recommend({
  sweet: 2, salty: 3, spicy: 1, umami: 5, sour: 3, bitter: 2,
  preference: '조용한 분위기, 1인 좌석 가능'
}).then(result => {
  console.log(result.data); // [{name, reason, matchScore}, ...]
});
*/

/* ---------- 9. 음성 후기 → 미각 분석 (Gemini Cloud Function) ----------
const extract = window.MP_FB.httpsCallable(window.MP_FB.functions, 'extractTaste');
extract({ transcript: '오늘 밍글스에서...' })
  .then(result => {
    // result.data: { sweet, salty, spicy, umami, sour, bitter, keywords: [...] }
  });
*/

/* ---------- 10. 미식 기록 저장 ----------
async function saveRecord(recordData) {
  const uid = window.MP_FB.auth.currentUser.uid;
  await window.MP_FB.addDoc(
    window.MP_FB.collection(window.MP_FB.db, 'users', uid, 'records'),
    {
      ...recordData,
      createdAt: window.MP_FB.serverTimestamp()
    }
  );
}
*/

/* ---------- 11. 로그인 상태 감지 ----------
window.MP_FB.onAuthStateChanged(window.MP_FB.auth, user => {
  if (user) {
    // 로그인됨 → 메인으로
    go('home-loggedin');
  } else {
    // 로그아웃 상태 → 진입 화면
    go('home');
  }
});
*/
