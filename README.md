# 미식플레너 (MisikPlanner)

> **내향인이 혼자 가기 어려운 식당을, 성향에 맞는 사람과 매칭해 함께 갈 수 있게 하는 시스템**

---

## 📁 폴더 구조

```
misikplanner/
├── index.html      ← 메인 HTML (전체 화면 구조)
├── style.css       ← 디자인 시스템 + 모든 스타일
├── app.js          ← 화면 전환 + 인터랙션
├── firebase.js     ← Firebase 연동 (config 넣는 곳)
└── README.md       ← 이 파일
```

**SPA(Single Page Application) 구조** — 하나의 HTML 안에서 JS가 화면을 전환합니다. 안티그래비티에서 진짜 앱처럼 동작합니다.

---

## 🎯 기획 의도

내향적인 사람에게 '함께 식사'는 종종 부담입니다. 특히 오마카세나 파인다이닝처럼 혼자 가기 어려운 식당은 더욱 그렇습니다.

미식플레너는 이런 사람들이 **성향이 맞는 미식가와 매칭**되어, 부담 없이 좋은 식당을 경험할 수 있도록 설계했습니다.

- **침묵 모드**와 **담소 모드**를 분리해 각자의 편안함을 지킴
- **실명 기반 신뢰 시스템**(정가 준수·노쇼 방지)으로 안심하고 만남
- **미각 데이터 기반 매칭**으로 취향이 맞는 사람과 연결

---

## 💎 핵심 차별점 (카카오 오픈채팅 대비)

| 페인 포인트 | 미식플레너의 해결 |
|---|---|
| 호스트의 가격 사기 | **정가 준수 약속 (Price Pact)** + 위반 시 배지 박탈 |
| 노쇼 / 잠수 | **예약 사진 필수 업로드** + 실명 평판 시스템 |
| 분위기 미스매치 | **침묵 / 담소 모드 분리** 매칭 |
| 모르는 사람의 위험 | **호스트 배지 / Clean Index** 가시화 |
| 신고 기능 없음 | **신고 시스템** (정가위반·방폭·불량호스트·노쇼) |

---

## ✨ 주요 기능

### 1. 로딩 스플래시
- 냄비 김 모락모락 SVG 애니메이션
- 미식플레너 로고 우아하게 등장
- 2초 후 메인으로 자동 전환

### 2. 홈 화면 (로그인 전/후)
- **원형 메뉴 버튼 3개** (오픈채팅·미식투어·미식기록)
- **풀카드 자동 슬라이더**:
  - 미쉐린 스타 10곳 (밍글스, 모수, 정식당 등)
  - 혼자 가기 아쉬운 오마카세 5곳
  - 3.5초마다 자동 전환 + 화살표 + 점 인디케이터
- **품격 약속 카드** (정가 준수 안내)

### 3. 회원가입 / 로그인
- 4가지 로그인 방식
  - 이메일/비밀번호 (Firebase Auth)
  - 구글 로그인 (Firebase 내장)
  - 카카오 로그인 (카카오 개발자센터 API)
  - 네이버 로그인 (네이버 개발자센터 API)

### 4. 미식 매칭
- 진행률 원형 게이지 (55% → 92% 애니메이션)
- 침묵 모드 / 담소 모드 선택
- 성향 맞춤 자동 매칭

### 5. 오픈채팅방 리스트
- 호스트 평판 배지 (정가준수 왕, 침묵 마스터 등)
- 정가·정원·이동거리 한눈에
- 마감된 방 회색 처리
- **햄버거 신고 메뉴** (정가위반·방폭·불량호스트)

### 6. 방 들어오기 (노쇼 방지)
- 방장이 올린 예약 사진 확인
- 본인 이름 확인 후 입장

### 7. 방 만들기
- 예약 사진 필수 업로드 (캐치테이블·네이버예약)
- 최대 인원 4단계 선택 (2/3/4/6인)
- 정가 준수 약속 토글

### 8. 채팅방
- 실시간 채팅
- 닉네임 클릭 → 좋아요/신고 팝업
- 햄버거 메뉴 → 노쇼신고/방신고/예약사진 확인/나가기
- 예약 사진 배너 상단 고정

### 9. AI 미식투어
- **Gemini API 기반** 식당 추천
- 미각·분위기·이동거리 종합 분석
- MATCH 점수 (98, 94, 89, 85)
- 골드 그라데이션 차트 + 딥그린 외곽선
- 빠른 질문 칩 (조용한 분위기·1인 좌석 등)

### 10. 미식 기록 (3단계 UX)
- **Step 1**: 음성 녹음 → AI가 텍스트 변환
- **Step 2**: 6가지 미각 선택형 버튼 (없음/약함/보통/강함/매우강함)
  - 단맛 / 짠맛 / 매운맛 / 감칠맛 / 산미 / 쓴맛
- **Step 3**: 정가 준수·키오스크·혼밥 편의성 평가
- **음식 사진 찍기/업로드** 기능

### 11. Gourmet Passport (미식 여권)
- 럭셔리 여권 표지 디자인
- 누적 방문 횟수·Clean Index·배지 갯수
- **육각형 레이더 차트** (6축 미각 시각화)
- **여권 색상 개인화** (테라코타·딥그린·네이비·버건디·블랙)
- 정가 준수율 게이지
- 획득 배지 갤러리
- 미식 키워드 태그
- 최근 미식 기록 리스트

---

## 🔥 Firebase 연동하기

### 1단계 — Firebase 프로젝트 만들기

1. https://console.firebase.google.com 접속
2. **"프로젝트 만들기"** 클릭
3. 프로젝트 이름: `misikplanner` (또는 원하는 이름)
4. Google 애널리틱스: 선택사항

### 2단계 — 웹 앱 등록

1. 프로젝트 메인 → **`</>` 아이콘** 클릭 (웹 앱 추가)
2. 앱 별명: `misikplanner-web`
3. **"앱 등록"** 클릭
4. 화면에 나오는 `firebaseConfig` 객체 **그대로 복사**

```javascript
// 이렇게 생긴 객체가 나옴
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "misikplanner-xxx.firebaseapp.com",
  projectId: "misikplanner-xxx",
  storageBucket: "misikplanner-xxx.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc..."
};
```

### 3단계 — config 붙여넣기

`firebase.js` 파일을 열고, 56번 줄 근처의 `firebaseConfig`를 **본인 값으로 교체**합니다.

```javascript
// firebase.js 안
const firebaseConfig = {
  apiKey: "AIzaSy...",  // ← 본인 값
  // ...
};
```

### 4단계 — 서비스 활성화

Firebase 콘솔에서 사용할 서비스 활성화:

- **Authentication** → 시작하기 → "이메일/비밀번호" + "Google" 활성화
- **Firestore Database** → 데이터베이스 만들기 → 테스트 모드
- **Storage** → 시작하기 → 테스트 모드

### 5단계 — Firestore 보안 규칙 설정 (선택)

Firestore Rules 탭에 아래 규칙 붙여넣기:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /rooms/{roomId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
      match /messages/{msgId} {
        allow read, write: if request.auth != null;
      }
    }
  }
}
```

### 6단계 — 실제 로그인 로직 연결 (선택)

지금은 **데모 모드**라 로그인 버튼 누르면 그냥 다음 화면으로 넘어가요. 실제 로그인을 활성화하려면 `app.js`의 `go('login-success')` 부분을 Firebase 호출로 교체하세요. `firebase.js` 하단에 사용 예시 주석으로 다 있습니다.

---

## 🤖 Gemini API 연동하기 (AI 추천 기능)

### 1단계 — API 키 발급

1. https://aistudio.google.com/apikey 접속
2. **"Create API Key"** 클릭
3. 발급된 키 복사 (`AIzaSy...`로 시작)

### 2단계 — Cloud Functions 만들기

Firebase Functions 폴더에 `functions/index.js` 파일 만들기:

```javascript
const functions = require('firebase-functions');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// ⬇️ 여기에 Gemini API 키 ⬇️
const GEMINI_API_KEY = "여기에_본인_GEMINI_KEY";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// 식당 추천 함수
exports.recommendRestaurants = functions
  .region('asia-northeast3')
  .https.onCall(async (data, context) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `유저 미각 프로필 분석해서 서울 식당 4곳 추천...`;
    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
  });

// 미각 추출 함수
exports.extractTaste = functions
  .region('asia-northeast3')
  .https.onCall(async (data, context) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `다음 후기에서 6축 미각 점수 추출: ${data.transcript}`;
    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
  });
```

### 3단계 — 배포

```bash
firebase deploy --only functions
```

`firebase.js` 하단 주석에 호출 예시 코드 있습니다.

---

## 🎨 디자인 시스템

### 색상 (style.css `:root`에서 변경)

```css
--terracotta: #B8553A;    /* 메인 강조색 */
--deep-green: #2D4A3E;    /* 확정 버튼·CTA */
--gold: #C89B3F;          /* 미쉐린 별·배지 */
--cream: #F7F1E8;         /* 배경 */
--ivory: #FBF7F0;         /* 카드 배경 */
```

### 폰트

- **Noto Serif KR** — 한글 헤드라인 (품격)
- **Cormorant Garamond** — 영문 이탤릭 강조
- **Pretendard** — 본문

### 톤 컨셉

차분, 우아, 정돈 — 내향인 타겟에 맞춤. 위협적 카피 없이 **"품격있는 안내"** 위주.

---

## 🚀 실행 방법

### 안티그래비티 (구글 AI Studio)
1. 폴더 전체를 안티그래비티에 업로드
2. `index.html`을 메인으로 지정
3. 실행 → 진짜 앱처럼 화면 전환됨

### 로컬 (브라우저)
1. VSCode + Live Server 플러그인
2. `index.html` 우클릭 → "Open with Live Server"

### 로컬 (서버 없이)
- `index.html` 더블클릭 → 작동은 하지만 Firebase 모듈 로딩이 막힐 수 있음
- 가능하면 Live Server 권장

---

## 📈 향후 확장 방향

### B2B2C 모델
- 식당 입점 → 1인 손님 단체 매칭 채널
- 노쇼 방지·정가 시스템으로 식당에 매력적
- 수익: 식당 제휴 수수료

### 데이터 서비스
- 유저의 미각 프로필을 식당에 전달
- 식당은 맞춤 서비스(좌석·코스·응대)로 차별화
- 내향인 응대 매뉴얼 진화

### 게이미피케이션
- 여권 색상 잠금 해제 (10회 방문 = 골드 여권)
- 미쉐린 스타 방문 컬렉션
- 시즌별 한정 배지

---

## 📝 시연용 데이터 안내

- **식당 사진**: 현재 placeholder 상태 → 무료 스톡 이미지(Unsplash) 또는 식당 제휴 사진으로 교체
- **미쉐린 등급**: 2026 가이드 기준
- **유저 데이터**: 더미 데이터 (김서연·박지윤 등) → Firebase 연결 시 실제 데이터로 자동 교체

---

## 🛡️ 관리자(Admin) 페이지 안내

### 🔑 접속 방법
앱 메인 화면에서 로그인(이메일 로그인)을 선택하고 아래의 관리자 전용 테스트 계정으로 로그인하면, 일반 홈 화면 대신 **관리자 대시보드**로 즉시 이동합니다.
- **이메일:** `wlsgns1996@naver.com`
- **비밀번호:** `jinhun0364`

### 📋 관리자 페이지 기능 및 확인 가능한 내역
관리자 페이지(`ADMIN DASHBOARD`)에서는 서비스 신뢰도를 해치는 악성 유저 신고 및 고객 문의 사항을 한눈에 모니터링할 수 있습니다. 현재 데모 버전에서는 아래의 3가지 주요 신고/문의 내역(더미 데이터)을 확인할 수 있습니다.

1. **노쇼(No-Show) 신고 내역**
   - 오픈채팅 예약방의 방장(호스트)이 일방적으로 나타나지 않거나 잠수한 경우, 참가자들이 신고한 내역을 확인합니다.
2. **고객센터 문의 내역**
   - 미각 분석 AI 추천 시스템의 필터링 추가 요청 등, 사용자들이 고객센터로 접수한 건의 사항을 확인합니다.
3. **정가 위반 신고 내역**
   - 앱에 공지된 정가 외에 현장에서 추가 요금(콜키지 강제 등)을 요구한 호스트의 신고 내역을 확인하여 '품격 약속(Price Pact)' 위반자를 제재할 수 있습니다.

---

## License

포트폴리오 / 학습 목적 프로젝트

* 본 프로젝트에 사용된 일부 에셋 및 사진은 **Magnific AI**와 **Unsplash**의 무료 이미지를 활용하여 제작되었습니다.

---

## 🤖 AI 기능 구현 방식 (현재 데모 → 추후 API 연결)

### 현재 상태 (데모)
현재는 **API 미연결 상태**입니다. 화면 흐름과 UX만 보여주는 시연용입니다.
- 음성 녹음 → 텍스트 변환 시뮬레이션 (실제 STT 미연결)
- AI 식당 추천 → 더미 데이터 표시
- 미각 분석 → 샘플 키워드 표시

### 추후 API 연결 시 구현 방식

**1. 음성 → 텍스트 변환 (STT)**
```
Web Speech API (무료) 또는 Google Cloud Speech-to-Text
→ 음성 녹음 → 실시간 텍스트 변환
→ 변환된 텍스트를 Gemini로 전달
```

**2. 미각 분석 (Gemini API)**
```
텍스트 후기 입력
→ Gemini가 6축 미각 점수 추출 (단맛/짠맛/매운맛/감칠맛/산미/쓴맛)
→ Gourmet Passport 레이더 차트에 자동 반영
→ Firebase Firestore에 누적 저장
```

**3. 식당 추천 (Gemini API)**
```
유저의 누적 미각 프로필 (Firestore에서 가져옴)
→ Gemini가 성향 분석
→ 서울 미쉐린 레스토랑 중 MATCH 점수 계산
→ 상위 4곳 추천
```

**4. 매칭 알고리즘 (Firebase Functions)**
```
유저 미각 프로필 + 선택한 모드(고독한채팅/미식대화)
→ 비슷한 성향의 유저가 개설한 방 필터링
→ MATCH 점수 높은 방 상단 노출
```

---

## 📋 실제 배포 시 수정할 사항

### 필수 수정
- [ ] `firebase.js` — Firebase config 실제 값으로 교체
- [ ] `functions/index.js` — Gemini API 키 입력
- [ ] 카카오 로그인 — 카카오 개발자센터 앱 등록 + REST API 키
- [ ] 네이버 로그인 — 네이버 개발자센터 앱 등록 + Client ID
- [ ] 식당 사진 — 언스플래시 무료 이미지 또는 식당 제휴 사진으로 교체

### 기능 고도화
- [ ] 실시간 채팅 — Firebase Firestore onSnapshot 연결
- [ ] 음성 입력 — Web Speech API 또는 Google STT 연결
- [ ] AI 추천 — Gemini Cloud Function 실제 호출
- [ ] 매칭 알고리즘 — 미각 유사도 계산 로직 구현
- [ ] 정가 위반 신고 — 누적 시 배지 박탈 시스템
- [ ] 노쇼 신고 — 누적 시 계정 제한 시스템
- [ ] 여권 색상 잠금 해제 — 방문 횟수 기반 해금

### 추가 화면
- [ ] 마이페이지 — 계정 설정, 프로필 수정
- [ ] 알림 — 새 채팅, 매칭 완료 푸시 알림
- [ ] 결제 — 더치페이 정산 기능
