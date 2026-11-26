# 에듀씽킹연구소 웹사이트 (EDUTHINKING LAB)

에듀씽킹연구소 소개용 **단일 페이지 정적 사이트**입니다. 빌드 도구 없이 `index.html`을 열면 바로 동작하며, GitHub Pages에 그대로 올릴 수 있습니다.

- 라이브: https://eduthinking.github.io/Eduthinkinglab2611/
- 저장소: https://github.com/EduThinking/Eduthinkinglab2611

## 파일 구성

```
eduthinking-site/
├── index.html                  # 페이지 본문 (Hero · About · Service(TOCfE 5개 워크숍) · Process · Audience · Contact)
├── styles.css                  # 디자인 토큰·레이아웃·반응형·모션
├── script.js                   # 모바일 메뉴, 섹션 하이라이트, 등장 애니메이션, 메일 복사, 맨 위로
├── assets/
│   ├── photo-hero.png / .webp      # 히어로 전경 — 유리벽 회의실 협업 장면(풀와이드 배경)
│   ├── photo-workshop.png / .webp  # 오버헤드로 본 고객 여정 지도·포스트잇 워크숍 테이블
│   ├── photo-bm.png / .webp        # 비즈니스 모델 캔버스·데이터 리포트 검토 데스크
│   ├── photo-lecture.png / .webp   # 세미나실 뒤에서 본 강연 전경
│   └── og-image.jpg                # SNS 공유 미리보기(1200×630, 히어로 사진 기반)
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

- **컨셉**: 아임웹 *Benuity* 템플릿을 참고한 화이트 · 소프트 쿨그레이 · 딥 차콜 중심의 미니멀 컨설팅 펌 스타일
- **컬러**: 화이트 `#FFFFFF`, 페이퍼 `#F7F9FA`, 미스트 `#EAF0F2`(히어로 `#EBF0F3`), 딥 차콜 `#111827` / `#0B1118`
- **타이포**: Pretendard Variable(CDN) → 시스템 폰트 순으로 대체, 큰 제목은 600 굵기·타이트한 자간
- **사진**: AI 생성 실사 이미지 4장(회의실 전경·오버헤드 워크숍 테이블·BM 데스크·강연장 뒷모습) — 정면 얼굴 클로즈업 없이 손·문서·전경 중심, `<picture>`로 WebP 우선 로딩
- **히어로**: 풀블리드 배경 사진 + 차콜 그라데이션 오버레이 + 흰색 타이포·버튼(문제해결파트너스·디자인씽킹연구소 사이트 톤 참고)- **TOCfE 워크숍**: 핵심 영역 카드 아래에 5개 과정(갈등관리 및 설득 프로세스 · 목표수립 · 청소년의 문제해결능력 함양 · 에세이 쓰기 · 조직의 문제해결)을 번호 목록으로 정리하고, 주요 대상 카드마다 관련 과정을 한 줄로 연결
- **모션**: 스크롤 등장(IntersectionObserver)만 사용, `prefers-reduced-motion`에서 비활성화
- **접근성**: 건너뛰기 링크, 키보드 포커스 표시, 모바일 메뉴 `aria-expanded`, 이미지 대체 텍스트, 비교표 `role=table`
