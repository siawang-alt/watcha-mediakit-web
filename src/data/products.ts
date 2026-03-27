export interface Product {
  name: string;
  description: string;
  image: string;
  impressions: string;
  ctr: string;
  location: string;
  slots: string;
  device: string;
  material: string;
  tag: string;
}

export const watchaProducts: Product[] = [
  {
    name: '스플래시',
    description: '앱 실행 시 진입 화면에 단독 노출되어 유저 주목도가 높으며, 브랜드 인지도를 높이는 데 적합합니다.',
    image: '/images/watcha_splash.png',
    impressions: '약 50만',
    ctr: '-',
    location: '앱 진입 시 전체화면(풀) 또는 하단(파셜)',
    slots: '1구좌, 1주일 단독 노출',
    device: 'APP (iOS, Android)',
    material: '이미지 소재만 가능',
    tag: '브랜딩',
  },
  {
    name: '보드 배너',
    description: '앱, 웹 총 4개 지면 내 First View에 보드 형태로 노출되어 우수한 노출량을 기록합니다.',
    image: '/images/watcha_board.png',
    impressions: '약 200만',
    ctr: '약 0.21%',
    location: '홈 / 개봉관 / 웹툰 / 콘텐츠 상세',
    slots: '1구좌, 1주일 단독 노출',
    device: 'APP + WEB',
    material: '이미지 소재, 외부 랜딩 가능',
    tag: '높은 노출',
  },
  {
    name: '전면 팝업 배너',
    description: '앱, 웹 진입 시 팝업 형태로 노출되며 높은 유저 주목도를 바탕으로 클릭 효과를 극대화합니다.',
    image: '/images/watcha_popup.png',
    impressions: '약 45만',
    ctr: '약 2.1%',
    location: '앱, 웹 진입 시 전면 팝업',
    slots: '2구좌, 1주일 50% 랜덤 노출',
    device: 'APP + WEB',
    material: '이미지 소재, 외부 랜딩 가능',
    tag: '클릭 유도',
  },
];

export const pediaProducts: Product[] = [
  {
    name: '전면 팝업 배너',
    description: '앱, 웹 진입 시 팝업 형태로 노출. 높은 유저 주목도를 바탕으로 클릭 효과를 극대화.',
    image: '/images/pedia_popup.png',
    impressions: '약 60만',
    ctr: '약 2.9%',
    location: '앱, 웹 진입 시 전면 팝업',
    slots: '2구좌, 1주일 50% 랜덤 노출',
    device: 'APP + WEB',
    material: '이미지 소재, 외부 랜딩 가능',
    tag: '클릭 유도',
  },
  {
    name: '빅배너',
    description: '홈 화면 및 왓챠피디아 세상 페이지에 위치. 가장 유입이 많은 페이지에 노출.',
    image: '/images/pedia_big.png',
    impressions: '약 150만',
    ctr: '약 0.24%',
    location: '메인 홈 / 왓챠피디아 세상',
    slots: '2구좌, 1주일 50% 랜덤 노출',
    device: 'APP + WEB',
    material: '이미지 및 동영상 소재 가능',
    tag: '높은 노출',
  },
  {
    name: '롤링 배너',
    description: '홈 롤링 1지면에 노출되며 3초 뒤 다른 구좌로 전환. 주목도가 높은 영역.',
    image: '/images/pedia_rolling.png',
    impressions: '약 70만',
    ctr: '약 0.6%',
    location: '메인 홈 화면 롤링 배너 1지면',
    slots: '2구좌, 1주일 50% 랜덤 노출',
    device: 'APP + WEB',
    material: '이미지 소재, 외부 랜딩 가능',
    tag: '클릭 유도',
  },
  {
    name: '보드 배너',
    description: '앱, 웹 총 6개 지면 내 First View에 보드 형태로 노출되어 우수한 노출량을 기록.',
    image: '/images/pedia_board.png',
    impressions: '약 500만',
    ctr: '약 0.12%',
    location: '홈 외 6개 지면',
    slots: '2구좌, 1주일 50% 랜덤 노출',
    device: 'APP + WEB',
    material: '이미지 소재, 외부 랜딩 가능',
    tag: '높은 노출',
  },
  {
    name: '랭킹 HOT 배너',
    description: '왓챠피디아 HOT 랭킹 탭 2순위 위치에 노출. 포스터 클릭 시 아웃랜딩 유도.',
    image: '/images/pedia_ranking.png',
    impressions: '약 45만',
    ctr: '약 1%',
    location: 'HOT 랭킹 2순위 위치',
    slots: '2구좌, 1주일 50% 랜덤 노출',
    device: 'APP + WEB',
    material: '영화/콘텐츠 관련만 가능',
    tag: '클릭 유도',
  },
  {
    name: '스플래시',
    description: '앱 실행 시 진입 화면에 단독 노출. 브랜드 인지도를 높이는 데 적합.',
    image: '/images/pedia_splash.png',
    impressions: '약 50만',
    ctr: '-',
    location: '앱 진입 시 전체화면 또는 하단',
    slots: '1구좌, 1주일 단독 노출',
    device: 'APP',
    material: '이미지 소재만 가능',
    tag: '브랜딩',
  },
  {
    name: '유저 참여 이벤트',
    description: '유저 참여 이벤트 집행 가능. 전면 팝업 배너 3일 포함으로 인지도 극대화.',
    image: '/images/pedia_event.png',
    impressions: '약 20만',
    ctr: '약 5,000명 참여',
    location: '이벤트 탭 1주 + 전면 팝업 3일',
    slots: '이벤트 전용 구좌',
    device: 'APP + WEB',
    material: '추가 광고 집행 시 할인 적용',
    tag: '참여형',
  },
  {
    name: '전용관 페이지',
    description: '메인 홈 핫 아이템에 노출. 클릭 시 왓챠피디아에서 구축한 전용관 페이지로 랜딩.',
    image: '/images/pedia_exclusive.png',
    impressions: '-',
    ctr: '-',
    location: '홈 핫 아이템 → 전용관 페이지',
    slots: '광고 구좌 / 핫 아이템 / 전용 페이지',
    device: 'APP + WEB',
    material: '커스텀 브랜드 페이지 제작',
    tag: '커스텀',
  },
];

export const faqItems = [
  {
    q: '광고 집행 최소 기간은 얼마인가요?',
    a: '모든 광고 상품은 1주일 단위로 집행됩니다. 최소 집행 기간은 1주일이며, 연장을 원하시면 추가 구매가 가능합니다.',
  },
  {
    q: '광고 소재는 어떤 형식으로 준비해야 하나요?',
    a: '대부분의 상품은 이미지 소재를 사용하며, 일부 상품(빅배너 등)은 동영상 소재도 가능합니다. 소재 제작 가이드는 계약 후 별도로 전달드립니다.',
  },
  {
    q: '광고 성과는 어떻게 확인하나요?',
    a: '캠페인 종료 후 노출수, 클릭수, CTR 등 성과 리포트를 제공합니다. 집행 중에도 중간 리포트를 요청하실 수 있습니다.',
  },
  {
    q: '계약 후 취소하면 위약금이 발생하나요?',
    a: '왓챠 광고는 기간보장 상품으로, 양 사 날인 이후 변경/취소 시 위약금이 발생합니다. 집행일 13~7영업일 전은 50%, 6영업일 전~라이브 이후는 100%입니다.',
  },
  {
    q: '왓챠와 왓챠피디아에 동시에 광고할 수 있나요?',
    a: '네, 가능합니다! 두 플랫폼을 묶은 패키지 상품도 구성 가능합니다. 문의 시 관심 상품을 여러 개 선택해주시면, 최적의 조합을 제안드리겠습니다.',
  },
  {
    q: '어떤 업종의 광고를 집행할 수 있나요?',
    a: '영화, 드라마, 뷰티, 식음료, 가전, 도서 등 다양한 업종의 광고 집행이 가능합니다. 단, 일부 상품(랭킹 HOT 배너 등)은 영화/콘텐츠 관련 업종만 가능합니다.',
  },
  {
    q: '광고 집행까지 얼마나 걸리나요?',
    a: '문의 접수 후 1영업일 이내 담당자가 연락드리며, 미팅/계약/소재 전달 과정을 거쳐 보통 2~3주 내 라이브 가능합니다.',
  },
  {
    q: '문의는 어떻게 하나요?',
    a: '이 페이지 하단의 문의 폼을 작성하시거나, ad_sales@watcha.com 또는 010-5033-9698로 직접 연락해주세요.',
  },
];
