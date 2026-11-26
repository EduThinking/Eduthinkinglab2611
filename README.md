# 에듀씽킹연구소 웹사이트 (EDUTHINKING LAB)

에듀씽킹연구소 소개용 **단일 페이지 정적 사이트**입니다. 빌드 도구 없이 `index.html`을 열면 바로 동작하며, GitHub Pages에 그대로 올릴 수 있습니다.

- 라이브: https://eduthinking.github.io/Eduthinkinglab2611/
- 저장소: https://github.com/EduThinking/Eduthinkinglab2611

## 파일 구성

```
eduthinking-site/
├── index.html                  # 페이지 본문 (섹션 6개 + 헤더/푸터)
├── styles.css                  # 디자인 토큰·레이아웃·반응형·모션
├── script.js                   # 모바일 메뉴, 스크롤 상태, 등장 애니메이션, 메일 복사
├── assets/
│   ├── hero-design-thinking.png / .webp   # 히어로 일러스트
│   ├── problem-gap.png / .webp            # 문제 대비 일러스트
│   ├── bm-framework.png / .webp           # 4단계 프레임워크 일러스트
│   └── og-image.jpg                       # SNS 공유 미리보기(1200×630)
├── preview-top.png             # 상단 미리보기
└── preview-full.png            # 전체 스크롤 미리보기
```

`.webp`는 용량 절감용으로 페이지가 실제로 불러오는 파일이고, `.png`는 원본입니다(구형 브라우저 대체용).

## 연락처 · 채널 바꾸기

`script.js` 맨 위의 객체만 수정하면 페이지 전체에 반영됩니다.

```js
const SITE_CONTACT = {
  email: 'joeun0926@gmail.com',
  channels: [
    // { label: '인스타그램', url: 'https://instagram.com/...' }
  ]
};
```

채널을 추가하면 문의 섹션 버튼 아래에 링크 목록이 자동으로 나타납니다.

## 로컬에서 보기

```bash
cd eduthinking-site
python3 -m http.server 8000
# 브라우저에서 http://localhost:8000
```

## GitHub Pages 배포

`main`과 `gh-pages` 브랜치에 같은 내용이 올라가 있고, Pages는 `gh-pages` 브랜치 루트를 바라봅니다.

```bash
git push origin main
git push origin main:gh-pages
```

수정 뒤 위처럼 두 브랜치를 함께 밀면 1~2분 안에 `https://eduthinking.github.io/Eduthinkinglab2611/` 에 반영됩니다.

## 디자인 메모

- **컬러**: 딥 네이비 `#16213E`, 오프화이트 `#F8FAFC` / `#F1F5F9`, 포인트 에메랄드 `#0D9488` · 코랄 `#F97316`
- **타이포**: Pretendard(CDN) → Noto Sans KR → 시스템 폰트 순으로 대체
- **일러스트**: AI 생성 이미지 3장, 동물 캐릭터 없이 플랫/아이소메트릭 톤 통일
- **모션**: `prefers-reduced-motion`에서 애니메이션 비활성화
- **접근성**: 건너뛰기 링크, 키보드 포커스 표시, 모바일 메뉴 `aria-expanded`, 이미지 대체 텍스트
