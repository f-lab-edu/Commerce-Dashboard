import {
  OrderDTO,
  ProductDTO,
  CalendarDayDTO,
  CategoryInsightDTO,
  KPIDTO,
  OrderStatus,
} from '@/types/dto';
import { formatDate, toISOString } from '@/utils/formatDate';

// ==================== 헬퍼 함수 ====================

/**
 * 랜덤 날짜 생성 (2025년 10월)
 */
function generateRandomDate(year: number, month: number): string {
  const day = Math.floor(Math.random() * 28) + 1;
  const hour = Math.floor(Math.random() * 24);
  const minute = Math.floor(Math.random() * 60);
  const date = new Date(year, month - 1, day, hour, minute, 0);
  return toISOString(date);
}

/**
 * 특정 날짜 생성
 */
function generateDate(
  year: number,
  month: number,
  day: number,
  hour = 0,
  minute = 0,
): string {
  const date = new Date(year, month - 1, day, hour, minute, 0);
  return toISOString(date);
}

/**
 * 랜덤 상태 선택
 */
function getRandomStatus(): OrderStatus {
  const statuses: OrderStatus[] = [
    'PENDING',
    'CONFIRMED',
    'SHIPPING',
    'DELIVERED',
    'REFUNDED',
  ];
  const weights = [10, 20, 15, 50, 5]; // 배송완료가 가장 많음

  const random = Math.random() * 100;
  let cumulative = 0;

  for (let i = 0; i < statuses.length; i++) {
    cumulative += weights[i];
    if (random < cumulative) {
      return statuses[i];
    }
  }

  return 'DELIVERED';
}

// ==================== KPI ====================

export const mockKPI: KPIDTO = {
  annualRevenue: 1250000000, // 12.5억
  totalOrders: 8542,
  averageOrderAmount: 146300,
  refundCount: 234,
  refundAmount: 34250000, // 3,425만원
};

// ==================== 카테고리 ====================

export const mockCategories: CategoryInsightDTO[] = [
  { id: 1, name: '전자기기', revenue: 450000000, percentage: 36 },
  { id: 2, name: '의류', revenue: 312500000, percentage: 25 },
  { id: 3, name: '식품', revenue: 250000000, percentage: 20 },
  { id: 4, name: '가구', revenue: 187500000, percentage: 15 },
  { id: 5, name: '도서', revenue: 31250000, percentage: 2.5 },
  { id: 6, name: '스포츠', revenue: 6250000, percentage: 0.5 },
  { id: 7, name: '뷰티', revenue: 6250000, percentage: 0.5 },
  { id: 8, name: '완구', revenue: 3125000, percentage: 0.25 },
  { id: 9, name: '주방용품', revenue: 2187500, percentage: 0.175 },
  { id: 10, name: '기타', revenue: 937500, percentage: 0.075 },
];

// ==================== 상품명 풀 ====================

const productNamesByCategory: Record<string, string[]> = {
  전자기기: [
    '갤럭시 S24 울트라',
    'iPhone 15 Pro',
    'LG 그램 노트북',
    '에어팟 프로 2세대',
    'iPad Air',
    '삼성 갤럭시 워치',
    '소니 WH-1000XM5',
    'PS5 디지털 에디션',
    '닌텐도 스위치 OLED',
    '로지텍 MX Master 3S',
    '맥북 프로 M3',
    '갤럭시 버즈 프로',
    'LG 울트라기어 모니터',
    '샤오미 무선 청소기',
    '다이슨 에어랩',
    '필립스 전동칫솔',
    '샤프 공기청정기',
    'DJI 미니 드론',
    '고프로 Hero 12',
    '소니 알파 카메라',
  ],
  의류: [
    '유니클로 후리스',
    '나이키 에어맥스',
    '아디다스 트랙 재킷',
    '리바이스 511 청바지',
    '노스페이스 패딩',
    '자라 울 코트',
    '구찌 벨트',
    'H&M 기본 티셔츠',
    '뉴발란스 530',
    '콜롬비아 등산화',
    '캘빈클라인 속옷 세트',
    '타미힐피거 폴로',
    '반스 올드스쿨',
    '컨버스 척테일러',
    '파타고니아 플리스',
    '몽클레어 다운',
    '버버리 트렌치코트',
    '폴로 랄프로렌 셔츠',
    '라코스테 폴로',
    '챔피온 후드',
  ],
  식품: [
    '스타벅스 원두 1kg',
    '동원참치 살코기',
    '오뚜기 진라면',
    '농심 신라면',
    '삼양 불닭볶음면',
    '청정원 고추장',
    '곰표 밀가루',
    '백설 설탕',
    '해찬들 된장',
    '청정원 참기름',
    'CJ 비비고 만두',
    '풀무원 두부',
    '매일 우유 2L',
    '서울우유 1L',
    '동원 김치찌개',
    '오뚜기 카레',
    '청정원 쌈장',
    '대상 청국장',
    '샘표 간장',
    '오뚜기 케첩',
  ],
  가구: [
    '이케아 BILLY 책장',
    '한샘 시스템 책상',
    '에이스침대 매트리스',
    '까사미아 소파',
    '일룸 서랍장',
    '리바트 식탁세트',
    '한샘 붙박이장',
    '시디즈 T50',
    '이케아 PAX 옷장',
    '에넥스 스탠딩 책상',
    '한샘 주방장',
    '리바트 거실장',
    '에몬스 침대',
    '퍼시스 의자',
    '데스커 책상',
    '일룸 소파베드',
    '한샘 신발장',
    '이케아 옷걸이',
    '자이글 테이블',
    '리클라이너 소파',
  ],
  도서: [
    '주식투자 무작정 따라하기',
    '아몬드 - 손원평',
    '미드나잇 라이브러리',
    '돈의 속성',
    '데일 카네기 인간관계론',
    '해리포터 시리즈',
    '채식주의자',
    '82년생 김지영',
    '코스모스 - 칼 세이건',
    '사피엔스',
    '총, 균, 쇠',
    '정의란 무엇인가',
    '나미야 잡화점의 기적',
    '데미안',
    '어린왕자',
    '1984',
    '멋진 신세계',
    '동물농장',
    '이방인',
    '변신',
  ],
  스포츠: [
    '요넥스 배드민턴 라켓',
    '나이키 축구공',
    '아디다스 요가매트',
    '윌슨 테니스 라켓',
    '던롭 골프공 세트',
    '푸마 축구화',
    '스팔딩 농구공',
    '미즈노 야구 글러브',
    '데카트론 등산 스틱',
    '블랙야크 등산가방',
    '나이키 런닝화',
    '아디다스 트레이닝복',
    '언더아머 반팔',
    '푸마 트레이닝 팬츠',
    '윌슨 농구공',
    '요넥스 셔틀콕',
    '나이키 골프화',
    '타이틀리스트 골프공',
    '미즈노 런닝화',
    '살로몬 등산화',
  ],
  뷰티: [
    'SK-II 에센스',
    '설화수 자음생 크림',
    '다이슨 에어랩',
    '라네즈 워터뱅크',
    '이니스프리 그린티',
    '에뛰드 디어달링 틴트',
    '클리오 킬 커버 쿠션',
    '메디힐 마스크팩',
    '오휘 프라임 에드바이저',
    '헤라 센슈얼 누드 립스틱',
    '아이오페 에어쿠션',
    '설화수 윤조에센스',
    '후 비첩 자생 에센스',
    '랑콤 제니피끄',
    'VDL 쿠션',
    '에스티로더 세럼',
    '키엘 크림',
    '록시땅 핸드크림',
    '바디샵 버터',
    '러쉬 배쓰밤',
  ],
  완구: [
    '레고 크리에이터',
    '실바니안 패밀리',
    '타요 버스 세트',
    '바비 인형',
    '뽀로로 피규어',
    '플레이도우 점토',
    '토이스토리 액션 피규어',
    '타미야 미니카',
    '콩순이 인형',
    '핑크퐁 아기상어',
    '레고 테크닉',
    '레고 스타워즈',
    '플레이모빌 세트',
    '실바니안 하우스',
    '브리오 기차',
    '듀플로 블럭',
    '메가블럭 세트',
    '퍼즐 1000피스',
    '텐트 놀이집',
    '미니 주방놀이',
  ],
  주방용품: [
    '쿠쿠 압력밥솥',
    '필립스 에어프라이어',
    '브레빌 에스프레소 머신',
    '락앤락 밀폐용기 세트',
    '스타우브 냄비',
    'WMF 후라이팬',
    '브라운 핸드블렌더',
    '테팔 인덕션',
    '쿠진아트 푸드프로세서',
    '비타믹스 블렌더',
    '쿠쿠 전기레인지',
    '쿠첸 밥솥',
    '테팔 프라이팬',
    '락앤락 텀블러',
    '써모스 보온병',
    'OXO 키친툴',
    '조셉조셉 도마',
    '휴롬 착즙기',
    '브라운 믹서기',
    '필립스 토스터',
  ],
  기타: [
    '다이슨 청소기',
    'LG 스타일러',
    '코웨이 공기청정기',
    '샤오미 가습기',
    '필립스 전동칫솔',
    '제습기',
    '서큘레이터',
    '전기장판',
    '온열매트',
    '발마사지기',
    '안마의자',
    'LG 건조기',
    '삼성 무풍 에어컨',
    'LG 냉장고',
    '삼성 세탁기',
    '코웨이 정수기',
    '청호나이스 얼음정수기',
    '쿠쿠 식기세척기',
    '다이슨 선풍기',
    '위닉스 공기청정기',
  ],
};

// ==================== 상품 데이터 (200개) ====================

export const mockProducts: ProductDTO[] = mockCategories.flatMap((category) =>
  Array.from({ length: 20 }, (_, i) => {
    const names = productNamesByCategory[category.name];
    const productName = names[i % names.length];

    // 카테고리별 가격 범위 설정
    let minPrice = 10000;
    let maxPrice = 100000;

    if (category.name === '전자기기') {
      minPrice = 100000;
      maxPrice = 2000000;
    } else if (category.name === '가구') {
      minPrice = 50000;
      maxPrice = 1000000;
    } else if (category.name === '식품') {
      minPrice = 3000;
      maxPrice = 50000;
    }

    const price = Math.floor(Math.random() * (maxPrice - minPrice)) + minPrice;

    return {
      id: `PROD-${category.id}${String(i + 1).padStart(2, '0')}`,
      name: productName,
      price,
      stock: Math.floor(Math.random() * 100),
      category: category.name,
      description: `${productName}의 상세 설명입니다. 고품질의 제품으로 고객 만족도가 높습니다.`,
      createdAt: generateDate(
        2024,
        Math.floor(Math.random() * 12) + 1,
        Math.floor(Math.random() * 28) + 1,
      ),
      updatedAt: generateDate(2025, 10, Math.floor(Math.random() * 12) + 1),
    };
  }),
);

// ==================== 주문 데이터 (500개) ====================

export const mockOrders: OrderDTO[] = Array.from({ length: 500 }, (_, i) => {
  const product = mockProducts[Math.floor(Math.random() * mockProducts.length)];
  const status = getRandomStatus();

  // 가격 변동 (±20%)
  const priceVariation = product.price * (0.8 + Math.random() * 0.4);
  const amount = Math.floor(priceVariation);

  return {
    id: `ORD-${String(i + 1).padStart(6, '0')}`,
    productId: product.id,
    productName: product.name,
    category: product.category,
    amount,
    status,
    orderDate: generateRandomDate(2025, 10),
    customerName: `고객${String(i + 1).padStart(4, '0')}`,
  };
});

// 날짜순 정렬
mockOrders.sort((a, b) => b.orderDate.localeCompare(a.orderDate));

// ==================== 캘린더 데이터 (10월 31일) ====================

export const mockCalendarData: CalendarDayDTO[] = Array.from(
  { length: 31 },
  (_, i) => {
    const day = i + 1;
    const dateStr = `2025-10-${String(day).padStart(2, '0')}`;

    // 해당 날짜의 주문들 필터링
    const dayOrders = mockOrders.filter((order) =>
      order.orderDate.startsWith(dateStr),
    );

    // 매출 계산 (환불 제외)
    const revenue = dayOrders
      .filter((o) => o.status !== 'REFUNDED')
      .reduce((sum, o) => sum + o.amount, 0);

    // 환불 건수
    const refundCount = dayOrders.filter((o) => o.status === 'REFUNDED').length;

    return {
      date: dateStr,
      revenue,
      orderCount: dayOrders.length,
      refundCount,
      memo: day % 7 === 0 ? `${day}일 프로모션 진행중` : null,
    };
  },
);

// ==================== 메모 저장소 (인메모리 DB) ====================

export const memoStorage = new Map<
  string,
  { memo: string; createdAt: string; updatedAt: string }
>();

// 초기 메모 데이터 설정
mockCalendarData.forEach((day) => {
  if (day.memo) {
    memoStorage.set(day.date, {
      memo: day.memo,
      createdAt: generateDate(2025, 10, 1),
      updatedAt: generateDate(2025, 10, 1),
    });
  }
});

// ==================== 통계 (확인용) ====================

console.log('📊 Mock Data Statistics:');
console.log(`- Products: ${mockProducts.length}`);
console.log(`- Orders: ${mockOrders.length}`);
console.log(`- Calendar Days: ${mockCalendarData.length}`);
console.log(
  `- Total Revenue: ${formatDate(new Date())} - ${mockCalendarData.reduce((sum, d) => sum + d.revenue, 0).toLocaleString()}원`,
);
