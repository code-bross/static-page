/**
 * Travel Dashboard Data Store
 * Destination itineraries and estimated budgets
 */

const TRAVEL_DATA = {
  destinations: {
    finland_paris_asiana: {
      "id": "finland_paris_asiana",
      "name": "핀란드·파리 (아시아나 귀국)",
      "country": "핀란드 🇫🇮 & 프랑스 🇫🇷",
      "title": "북극 오로라와 빛의 도시 파리 · 핀란드&파리 7박 9일",
      "subtitle": "로바니에미 산타마을·오로라 투어 & 파리 에펠탑·루브르 미식 기행 · 60대 어머니 맞춤 동선 (아시아나 귀국 직항)",
      "heroImage": "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1200&auto=format&fit=crop",
      "heroImageCaption": "핀란드 라플란드의 환상적인 오로라(Aurora Borealis)와 설원 숲",
      "heroImageSource": "https://unsplash.com/photos/aurora-borealis-during-night-time-C9qF1V55b2g",
      "status": "active",
      "dates": {
            "departure": "2027.02.05 (금)",
            "return": "2027.02.13 (토)",
            "duration": "7박 9일 · 현지 6박 + 기내 2박"
      },
      "travelers": {
            "total": 4,
            "composition": "30대 부부 2명 + 30대 딸 1명 + 60대 어머니 1명 (총 성인 4인)",
            "style": "어머니 체력 배려 · 공항 전용차량 4회 · 오로라 전용밴 투어 · 파리 16구 안심 숙소 & 우버 동선"
      },
      "estimateInfo": {
            "pdfFile": "0205 강영길님 가족 유럽 여행 - 핀란드&파리 - 핀에어&아시아나항공.pdf",
            "agency": "웹투어㈜ (Webtour)",
            "issuedDate": "2026.10.02",
            "packagePriceTotal": 21436000,
            "packagePricePerPerson": 5359000,
            "account": "KEB하나은행 145-890020-67004 웹투어㈜",
            "deposit": "계약금 1인 300,000원 (4인 총 1,200,000원) · 10/6(화)까지 입금",
            "airDeposit": "항공 중도금 1인 3,000,000원 (4인 총 12,000,000원) · 10/6(화) 16:00 발권",
            "balanceDeadline": "출발 3주 전 1월 15일(금)까지 잔금 결제",
            "highlight": "귀국편이 파리→인천 아시아나항공 직항(OZ502)으로, 60대 어머니 모시기에 환승 피로가 전혀 없는 최상의 여정입니다.",
            "included": [
                  "국제선 왕복 항공권 (인천-헬싱키-로바니에미 / 파리-인천 아시아나 직항)",
                  "유류할증료 & 제세공과금 포함 (1인 519,000원 확정)",
                  "로바니에미-파리 구간 항공권 (에어프랑스 AF1525 직항)",
                  "로바니에미 Forenom 레지던스 4인실 (2박) + 파리 16구 Elysees Union 2실 (4박 조식 포함)",
                  "로바니에미 공항 픽업/샌딩 전용 밴 차량 2회",
                  "파리 샤를드골 공항 픽업/샌딩 전용 밴 차량 2회 (소매치기·환승계단 완벽 차단)",
                  "로바니에미 오로라 헌팅 전용 밴 투어 (모닥불 BBQ & 소시지/베리티 포함)",
                  "해외 여행자 보험 (1억원 보장)"
            ],
            "excluded": [
                  "현지 자유식비 (중식 & 석식 - 일정표 내 엄선된 추천 맛집 이용)",
                  "파리 시내 우버/택시비 및 메트로 교통비",
                  "루브르 박물관, 오르세 미술관 등 개인 입장료",
                  "호텔 시티택스 (체크인 시 1인 1박 3~5유로 직불)",
                  "개인 쇼핑 경비 및 물값"
            ]
      },
      "flight": {
            "airline": "핀에어 & 아시아나항공 (Finnair & Asiana)",
            "airlineCode": "AY/OZ",
            "type": "다구간 (파리→인천 직항)",
            "outbound": {
                  "flightNo": "AY042 / AY555",
                  "depTime": "23:00 (2/5 금)",
                  "depAirport": "인천 (ICN T1)",
                  "arrTime": "10:50 (2/6 토)",
                  "arrAirport": "로바니에미 (RVN)",
                  "duration": "총 17시간 50분 (헬싱키 환승 3h45m 포함)",
                  "note": "2/5(금) 밤 23:00 출발로 기내 숙면 후 헬싱키(05:40 도착) 경유하여 로바니에미에 2/6(토) 오전 10:50 도착합니다."
            },
            "inbound": {
                  "flightNo": "OZ502",
                  "depTime": "18:25 (2/12 금)",
                  "depAirport": "파리 샤를드골 (CDG T1)",
                  "arrTime": "14:40 (2/13 토)",
                  "arrAirport": "인천 (ICN T1)",
                  "duration": "12시간 15분 (직항)",
                  "note": "파리에서 여유로운 오후 출발! 국적기 아시아나 직항으로 환승 없이 편안하게 귀국합니다. (2/13 토 14:40 도착)"
            },
            "segments": [
                  {
                        "type": "outbound",
                        "label": "🛫 [1구간 국제선] 인천 → 헬싱키 (AY 42)",
                        "depDate": "2027.02.05 (금)",
                        "depTime": "23:00",
                        "depAirport": "인천 (ICN T1)",
                        "arrTime": "05:40 (+1일)",
                        "arrAirport": "헬싱키 (HEL)",
                        "duration": "13시간 40분",
                        "airline": "핀에어 (Finnair A350)",
                        "note": "야간 출발로 어머니 기내 수면 유도. 헬싱키 공항 환승 대기 3시간 45분 (따뜻한 라운지 & 북유럽 디자인 샵 휴식)"
                  },
                  {
                        "type": "outbound",
                        "label": "🛫 [2구간 국내선] 헬싱키 → 로바니에미 (AY 555)",
                        "depDate": "2027.02.06 (토)",
                        "depTime": "09:25",
                        "depAirport": "헬싱키 (HEL)",
                        "arrTime": "10:50",
                        "arrAirport": "로바니에미 (RVN)",
                        "duration": "1시간 25분",
                        "airline": "핀에어 (Finnair)",
                        "note": "북극권 관문 로바니에미 도착. 도착 후 [포함사항] 공항 전용 픽업 차량으로 숙소(Forenom) 직행"
                  },
                  {
                        "type": "intercity",
                        "label": "✈️ [3구간 이동] 로바니에미 → 파리 CDG (AF 1525)",
                        "depDate": "2027.02.08 (월)",
                        "depTime": "15:25",
                        "depAirport": "로바니에미 (RVN)",
                        "arrTime": "18:15",
                        "arrAirport": "파리 샤를드골 (CDG T2F)",
                        "duration": "3시간 50분",
                        "airline": "에어프랑스 (Air France)",
                        "note": "[포함] 로바니에미 숙소→공항 샌딩 차량 & 파리 CDG 공항→16구 호텔 픽업 차량 모두 제공"
                  },
                  {
                        "type": "inbound",
                        "label": "🛬 [4구간 귀국직항] 파리 CDG → 인천 (OZ 502)",
                        "depDate": "2027.02.12 (금)",
                        "depTime": "18:25",
                        "depAirport": "파리 샤를드골 (CDG T1)",
                        "arrTime": "14:40 (+1일)",
                        "arrAirport": "인천 (ICN T1)",
                        "duration": "12시간 15분 (직항)",
                        "airline": "아시아나항공 (Asiana Airlines)",
                        "note": "어머니 환승 피로 제로! 15:00 호텔 픽업 전용차량으로 공항 이동 후 오후 18:25 편안한 직항 탑승"
                  }
            ],
            "pricing": {
                  "perPerson": 5359000,
                  "total": 21436000,
                  "priceLabel": "성인 1인 / 항공+호텔 6박+오로라투어+전용차량 4회 포함",
                  "discountNote": "성인 상품가 4,840,000원 + 유류할증료·제세공과금 519,000원 (웹투어 견적서 확정 금액)"
            }
      },
      "budget": {
            "total": 24236000,
            "perPerson": 6059000,
            "currency": "원 (KRW)",
            "note": "웹투어 정식 견적 21,436,000원(항공+호텔 조식포함 6박+로바니에미 오로라투어+공항 전용차량 4회+구간항공+여행자보험)에 현지 4인 식비, 파리 시내 우버/교통비, 박물관 입장료, 시티택스 약 280만원을 합산한 4인 가족 현실 총 예산입니다.",
            "categories": [
                  {
                        "id": "package",
                        "name": "웹투어 확정 견적 (항공+호텔+투어)",
                        "icon": "✈️",
                        "amount": 21436000,
                        "perPerson": 5359000,
                        "percentage": 88.4,
                        "desc": "국제선 왕복(AY/OZ)+구간항공(AF)+유류세+Forenom 4인실(2박)+파리 Elysees Union 2실(4박)+오로라 밴 투어+전용차량 4회+보험"
                  },
                  {
                        "id": "food",
                        "name": "현지 식비 & 유명 카페 (4인)",
                        "icon": "🍽️",
                        "amount": 1800000,
                        "perPerson": 450000,
                        "percentage": 7.4,
                        "desc": "로바니에미 Nili 정통 순록요리, 산타마을 직화 통연어, 파리 미슐랭 비스트로(Le Petit Rétro, Bistrot des Fables), 안젤리나 티타임 등"
                  },
                  {
                        "id": "transport",
                        "name": "파리 시내 우버/택시 & 대중교통",
                        "icon": "🚕",
                        "amount": 360000,
                        "perPerson": 90000,
                        "percentage": 1.5,
                        "desc": "60대 어머니의 지하철 환승 계단 피로를 줄이기 위한 루브르/오르세/생제르맹 구간 우버 및 택시 탑승 예산"
                  },
                  {
                        "id": "tours",
                        "name": "박물관 입장료 & 센강 유람선",
                        "icon": "🏛️",
                        "amount": 380000,
                        "perPerson": 95000,
                        "percentage": 1.6,
                        "desc": "루브르 박물관 시간예약 티켓, 오르세 미술관, 바토 파리지앵 센강 크루즈, 산타마을 순록 썰매 등"
                  },
                  {
                        "id": "misc",
                        "name": "호텔 시티택스 & 예비비",
                        "icon": "💶",
                        "amount": 260000,
                        "perPerson": 65000,
                        "percentage": 1.1,
                        "desc": "프랑스/핀란드 숙박세(Tourist Tax, 1인 1박당 약 5~8유로) 및 현지 통신(eSIM)·비상 예비비"
                  }
            ]
      },
      "itinerary": [
            {
                  "day": 1,
                  "date": "2월 5일(금) ~ 2월 6일(토)",
                  "title": "인천 출발 → 헬싱키 경유 → 북극 로바니에미 도착 & 아늑한 첫날",
                  "badge": "북극 첫걸음",
                  "summary": "2/5(금) 밤 23:00 인천 출발 후 헬싱키를 거쳐 2/6(토) 오전 10:50 로바니에미에 도착합니다. 전용 픽업차량으로 숙소 이동 후 따뜻한 실내 관람과 정통 라플란드 만찬으로 시차에 적응합니다.",
                  "seniorTip": "💡 로바니에미 2월 기온은 영하 10도~15도 안팎입니다. 방한부츠와 핫팩, 보온내의를 착용하시고 실내는 난방이 매우 잘 되어 있으므로 얇은 옷을 여러 겹 겹쳐 입으세요.",
                  "dayMapUrl": "https://www.google.com/maps/search/?api=1&query=Forenom+Serviced+Apartments+Rovaniemi",
                  "activities": [
                        {
                              "time": "20:00 (2/5 금)",
                              "title": "인천공항 제1터미널 집결 & 핀에어 수속",
                              "desc": "출발 3시간 전 도착. 웹투어 전자항공권으로 수하물 위탁 및 출국 심사. 기내 숙면을 위해 간단한 한식 식사와 온수 음용.",
                              "icon": "🧳",
                              "tag": "출국",
                              "image": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop",
                              "imageCaption": "인천공항 국제선 출발 로비",
                              "imageSource": "https://unsplash.com/photos/airplane-wing-during-flight-bvA3D06Om0o",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Incheon+International+Airport+Terminal+1",
                              "seniorNote": "출국장 패스트트랙(교통약자/우대출구) 이용 가능 여부 확인"
                        },
                        {
                              "time": "23:00~05:40",
                              "title": "핀에어 AY 42편 인천 → 헬싱키 야간 비행",
                              "desc": "비행시간 13시간 40분. 핀에어 최신 A350 기종으로 기내 공기 순환 및 소음이 적습니다. 기내 숙면 후 아침 05:40 헬싱키 도착.",
                              "icon": "✈️",
                              "tag": "항공",
                              "seniorNote": "수면 안대, 기내 압박 스타킹 및 목베개 챙기기"
                        },
                        {
                              "time": "09:25~10:50 (2/6 토)",
                              "title": "헬싱키 환승 → 로바니에미 공항 도착",
                              "desc": "헬싱키 공항 환승(3시간 45분 여유) 후 국내선 AY 555 탑승. 1시간 25분 만에 은빛 설원의 북극 로바니에미 공항 도착!",
                              "icon": "🛬",
                              "tag": "도착",
                              "image": "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?q=80&w=1200&auto=format&fit=crop",
                              "imageCaption": "눈 덮인 핀란드 북극 라플란드 숲과 설원",
                              "imageSource": "https://unsplash.com/photos/snow-covered-trees-during-daytime-O453M2Liufs",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Rovaniemi+Airport",
                              "seniorNote": "비행기 트랩에서 공항 건물까지 짧은 도보 시 바닥 미끄럼 주의"
                        },
                        {
                              "time": "11:30",
                              "title": "[포함] 공항 전용차량 픽업 → 숙소 이동 & 짐 보관",
                              "desc": "견적 포함사항인 단독 전용 밴으로 15분 만에 로바니에미 시내 Forenom Serviced Apartments 도착. 캐리어를 맡기고 가볍게 출발.",
                              "icon": "🚐",
                              "tag": "숙소",
                              "image": "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200&auto=format&fit=crop",
                              "imageCaption": "Forenom Serviced Apartments Rovaniemi 스튜디오 4인실 객실",
                              "imageSource": "https://unsplash.com/photos/brown-wooden-bed-frame-with-white-bed-sheet-178j8tJrNlc",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Forenom+Serviced+Apartments+Rovaniemi",
                              "rating": "⭐ 4.2 (구글 리뷰 450+)",
                              "seniorNote": "시내 중심 Koskikatu 위치, 주방 및 사우나 완비, 엘리베이터 직결"
                        },
                        {
                              "time": "12:30~13:40",
                              "title": "점심: Cafe & Bar 21 (로바니에미 1등 브런치 카페)",
                              "desc": "숙소에서 도보 3분. 현지인과 여행자 모두에게 인기 높은 따뜻한 카페에서 핀란드식 와플과 부드러운 수프로 첫 끼를 즐깁니다.",
                              "icon": "🍽️",
                              "tag": "식사",
                              "image": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200&auto=format&fit=crop",
                              "imageCaption": "따뜻하고 아늑한 로바니에미 현지 카페 분위기",
                              "imageSource": "https://unsplash.com/photos/people-sitting-on-chair-beside-table-inside-building-wuw4zC45nLw",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Cafe+%26+Bar+21+Rovaniemi",
                              "rating": "⭐ 4.5 (구글 리뷰 1,850+)",
                              "signatureMenu": "훈제 연어 와플(Smoked Salmon Waffle), 따뜻한 치킨 크림 수프, 홈메이드 젤라또",
                              "seniorNote": "숙소에서 200m 평지 도보, 자극적이지 않고 부드러운 음식"
                        },
                        {
                              "time": "14:00~16:00",
                              "title": "아르크티쿰 과학센터 & 박물관 (Arktikum)",
                              "desc": "추위를 피해 따뜻한 실내 유리 터널 박물관 관람. 북극광(오로라)의 생성 원리와 라플란드 원주민 사미족의 문화를 감상합니다.",
                              "icon": "🏛️",
                              "tag": "관광",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Arktikum+Science+Museum+Rovaniemi",
                              "rating": "⭐ 4.4 (구글 리뷰 4,800+)",
                              "seniorNote": "전 구역 휠체어/유모차 평지 및 엘리베이터 동선, 실내 벤치 풍부"
                        },
                        {
                              "time": "16:30~18:00",
                              "title": "숙소 체크인 & 휴식 & K-마트 장보기",
                              "desc": "스튜디오 4인실 입실. 아파트 바로 앞 대형 마트(K-Supermarket Rinteenkulma)에서 과일, 온수용 생수, 간식 구입 후 따뜻하게 휴식.",
                              "icon": "🏨",
                              "tag": "숙소",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=K-Supermarket+Rinteenkulma+Rovaniemi",
                              "seniorNote": "도보 2분 거리 마트, 아파트 주방에서 한국 컵라면/차 끓이기 가능"
                        },
                        {
                              "time": "18:30~20:00",
                              "title": "저녁: Ravintola Nili (정통 라플란드 미식 레스토랑)",
                              "desc": "숙소 도보 4분. 순록 뿔과 자작나무로 장식된 아늑한 분위기에서 북극 최고의 만찬. 부드러운 순록 안심 스테이크와 진한 연어 크림 수프.",
                              "icon": "🍽️",
                              "tag": "식사",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Ravintola+Nili+Rovaniemi",
                              "rating": "⭐ 4.6 (구글 리뷰 2,450+)",
                              "signatureMenu": "부드러운 순록 안심 스테이크, 전통 북극해 연어 크림 수프(Lohikeitto), 클라우드베리 디저트",
                              "seniorNote": "한국인 입맛에도 잘 맞는 고소한 연어 크림 스프 강력 추천 (예약 필수)"
                        }
                  ]
            },
            {
                  "day": 2,
                  "date": "2월 7일(일)",
                  "title": "산타클로스 마을 방문 & 밤의 신비로운 오로라 투어",
                  "badge": "산타마을 & 오로라",
                  "summary": "오전에는 진짜 산타를 만나는 산타마을에서 직화 통연어구이 점심과 순록 썰매를 즐기고, 숙소에서 충분히 쉰 뒤 밤 19:30에 포함된 오로라 투어 전용 밴에 탑승합니다.",
                  "seniorTip": "💡 밤 19:30~23:30 오로라 투어는 전용 밴을 타고 이동하며 투어사에서 전문 방한 슈트와 부츠, 장갑을 제공합니다. 어머니 발에 핫팩을 붙이고 출발하세요.",
                  "dayMapUrl": "https://www.google.com/maps/search/?api=1&query=Santa+Claus+Village+Rovaniemi",
                  "activities": [
                        {
                              "time": "09:00~10:00",
                              "title": "아늑한 조식 & 오전 준비",
                              "desc": "숙소 조식 또는 아파트 주방에서 따뜻한 식사. 방한 외투와 모자 챙기기.",
                              "icon": "☕",
                              "tag": "식사",
                              "seniorNote": "어머니 관절 부담 없도록 충분한 스트레칭 후 출발"
                        },
                        {
                              "time": "10:30~12:30",
                              "title": "산타클로스 마을 (Santa Claus Village)",
                              "desc": "시내에서 차량 12분. 산타 집무실에서 공식 산타클로스와 직접 대화하고 가족 기념사진 촬영! 북극권선(Arctic Circle 66°33′45.9″) 통과 인증서 발급.",
                              "icon": "🎅",
                              "tag": "관광",
                              "image": "https://images.unsplash.com/photo-1579033461380-adb47c3eb938?q=80&w=1200&auto=format&fit=crop",
                              "imageCaption": "산타클로스 마을의 눈 덮인 통나무집과 순록 썰매",
                              "imageSource": "https://unsplash.com/photos/reindeer-on-snow-covered-ground-during-daytime-XmYg252K63g",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Santa+Claus+Village+Rovaniemi",
                              "rating": "⭐ 4.4 (구글 리뷰 28,000+)",
                              "seniorNote": "실내 통로가 잘 갖추어져 있어 춥지 않게 산타 오피스와 상점 관람 가능"
                        },
                        {
                              "time": "12:30~13:30",
                              "title": "점심: Santa's Salmon Place (산타마을 직화 통연어)",
                              "desc": "전통 원뿔형 사미 텐트(Kota) 안에서 장작불에 직접 구워주는 두툼한 생연어 스테이크. 불향 가득하고 입에서 살살 녹는 인생 연어!",
                              "icon": "🔥",
                              "tag": "식사",
                              "image": "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=1200&auto=format&fit=crop",
                              "imageCaption": "장작불 모닥불에서 훈제 직화로 구워내는 라플란드 통연어",
                              "imageSource": "https://unsplash.com/photos/bonfire-during-winter-time-E9SZ8N2b8mU",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Santa%27s+Salmon+Place+Rovaniemi",
                              "rating": "⭐ 4.8 (구글 리뷰 4,100+)",
                              "signatureMenu": "직화 훈제 통연어 단일 메뉴(Fresh Grilled Salmon with Potato Salad & Bread)",
                              "seniorNote": "텐트 중앙 모닥불 덕분에 훈훈하며, 생선 살이 연해 어르신 식사로 최고"
                        },
                        {
                              "time": "13:40~15:00",
                              "title": "순록 썰매 짧은 체험 & 산타 중앙 우체국",
                              "desc": "400m 짧은 순록 썰매 코스(썰매에 두꺼운 순록 모피 담요를 덮고 편안히 앉아 눈 숲길 산책). 산타 중앙 우체국에서 크리스마스 특별 직인이 찍히는 엽서 발송.",
                              "icon": "🦌",
                              "tag": "체험",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Santa+Claus+Main+Post+Office",
                              "rating": "⭐ 4.6 (구글 리뷰 5,200+)",
                              "seniorNote": "스노모빌처럼 흔들림이나 소음이 전혀 없고, 썰매에 기대어 앉아 매우 안전"
                        },
                        {
                              "time": "15:30~18:00",
                              "title": "숙소 복귀 & 온수 목욕 / 사우나 & 낮잠 충전",
                              "desc": "오후에는 무리하지 않고 아파트로 복귀하여 프라이빗 사우나 또는 온수 목욕 후 2시간 이상 낮잠. 밤 오로라 투어를 위한 체력 비축.",
                              "icon": "🛏️",
                              "tag": "휴식",
                              "seniorNote": "어머니 밤 일정 전 체력 안배 필수 시간"
                        },
                        {
                              "time": "18:00~19:15",
                              "title": "이른 저녁: Restaurant Monte Rosa",
                              "desc": "숙소 도보 2분. 그릴 요리와 따뜻한 수프로 든든하게 속을 채우고 출발 준비.",
                              "icon": "🍽️",
                              "tag": "식사",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Restaurant+Monte+Rosa+Rovaniemi",
                              "rating": "⭐ 4.4 (구글 리뷰 980+)",
                              "signatureMenu": "북극 차르 생선구이, 핀란드 소고기 안심 구이, 버섯 크림 파스타",
                              "seniorNote": "호텔 City Hotel 1층에 위치하여 출입이 매우 편리"
                        },
                        {
                              "time": "19:30~23:30",
                              "title": "[포함 투어] 로바니에미 오로라 헌팅 투어 (Aurora Hunting)",
                              "desc": "웹투어 견적 포함 공식 오로라 투어. 전문 가이드와 함께 따뜻한 전용 밴을 타고 구름을 피해 최적의 관측지로 이동. 모닥불 주변에서 따뜻한 베리 티와 소시지를 먹으며 밤하늘의 초록빛 오로라 댄스를 감상합니다.",
                              "icon": "🌌",
                              "tag": "투어",
                              "image": "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1200&auto=format&fit=crop",
                              "imageCaption": "로바니에미 인근 숲 호숫가에서 촬영된 오로라와 모닥불",
                              "imageSource": "https://unsplash.com/photos/aurora-borealis-during-night-time-C9qF1V55b2g",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Rovaniemi+Northern+Lights+Tour",
                              "rating": "⭐ 4.8 (포함 투어 예정)",
                              "seniorNote": "전용 밴 내부 히터 가동으로 춥지 않게 대기 가능. 가이드가 고화질 가족 사진 촬영 지원"
                        }
                  ]
            },
            {
                  "day": 3,
                  "date": "2월 8일(월)",
                  "title": "로바니에미 출발 → 에어프랑스 탑승 → 파리 도착 & 16구 안착",
                  "badge": "파리 입성",
                  "summary": "오전 로바니에미 시내에서 늦은 조식 후 전용차량으로 공항 이동, 15:25 에어프랑스를 타고 파리 샤를드골에 18:15 도착합니다. 전용차량으로 16구 안전지대 호텔에 체크인하고 따뜻한 비스트로 만찬을 즐깁니다.",
                  "seniorTip": "💡 파리 공항에서 지하철(RER B)은 소매치기와 계단 환승이 악명 높습니다. 웹투어 견적에 'CDG 공항→파리 호텔 전용차량 픽업'이 포함되어 있어 짐을 싣고 문 앞까지 안락하게 이동합니다.",
                  "dayMapUrl": "https://www.google.com/maps/search/?api=1&query=Elysees+Union+Hotel+Paris",
                  "activities": [
                        {
                              "time": "10:00~11:30",
                              "title": "여유로운 늦은 아침 & 아파트 체크아웃",
                              "desc": "전날 오로라 투어의 피로를 풀고 느긋하게 기상. 짐을 정리하고 11:30 체크아웃.",
                              "icon": "☕",
                              "tag": "체크아웃",
                              "seniorNote": "캐리어 정리 시 파리에서 입을 봄/가을 겉옷을 위쪽으로 배치"
                        },
                        {
                              "time": "12:00~13:15",
                              "title": "점심: 로바니에미 로컬 브런치 & 카페",
                              "desc": "숙소 근처 아늑한 카페에서 따뜻한 샌드위치와 커피를 마신 후 공항 차량 대기.",
                              "icon": "🥪",
                              "tag": "식사",
                              "seniorNote": "공항 출발 전 따뜻한 화장실 이용"
                        },
                        {
                              "time": "13:30",
                              "title": "[포함] 전용차량 샌딩 숙소 픽업 → 로바니에미 공항",
                              "desc": "13:30 예약된 전용 밴 도착. 15분 만에 공항 도착하여 에어프랑스 수속.",
                              "icon": "🚐",
                              "tag": "공항이동",
                              "seniorNote": "기사님이 무거운 캐리어 상하차 대행"
                        },
                        {
                              "time": "15:25~18:15",
                              "title": "에어프랑스 AF 1525 로바니에미 → 파리 CDG",
                              "desc": "비행시간 3시간 50분. 핀란드 설원에서 빛의 예술 도시 프랑스 파리 샤를드골 공항 제2터미널(T2F) 도착.",
                              "icon": "✈️",
                              "tag": "항공",
                              "seniorNote": "기내 음료 및 스낵 서비스 제공"
                        },
                        {
                              "time": "19:15",
                              "title": "[포함] 파리 CDG 공항 전용차량 픽업 → 호텔 이동",
                              "desc": "입국장 출구에서 네임보드를 든 전용차량 기사 미팅. 편안한 밴을 타고 파리 16구 Elysees Union Hotel로 직행 (차량 약 45분).",
                              "icon": "🚐",
                              "tag": "픽업",
                              "image": "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1200&auto=format&fit=crop",
                              "imageCaption": "파리 16구 Elysees Union Hotel의 클래식하고 우아한 객실",
                              "imageSource": "https://unsplash.com/photos/white-bed-linen-on-bed-M7EwCGn2怖",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Elysees+Union+Hotel+Paris",
                              "rating": "⭐ 4.1 (구글 리뷰 1,150+)",
                              "seniorNote": "파리 16구는 대사관 밀집 지역으로 치안이 가장 안전하고 밤에도 조용함"
                        },
                        {
                              "time": "20:30~21:45",
                              "title": "첫 파리 저녁: Le Petit Rétro (1904년 전통 16구 비스트로)",
                              "desc": "호텔 인근. 미슐랭 가이드에 등재된 120년 전통의 아르누보 비스트로. 부드러운 송아지 고기 블랑케트와 따뜻한 수프로 파리의 첫 만찬.",
                              "icon": "🍽️",
                              "tag": "식사",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Le+Petit+Retro+Paris",
                              "rating": "⭐ 4.6 (구글 리뷰 700+)",
                              "signatureMenu": "천천히 조리한 송아지 고기 스튜(Blanquette de veau), 부드러운 매시드 포테이토, 쇼콜라 프로피테롤",
                              "seniorNote": "호텔과 가까워 식사 후 바로 휴식 가능, 클래식하고 품격 있는 분위기"
                        }
                  ]
            },
            {
                  "day": 4,
                  "date": "2월 9일(화)",
                  "title": "파리의 상징 · 에펠탑 마르스 광장 & 생제르맹 & 센강 바토무슈 야경",
                  "badge": "에펠탑 & 센강",
                  "summary": "숙소에서 가까운 트로카데로 광장에서 에펠탑 인생 사진을 남기고, 현지인 단골 비스트로에서 오리 콩피 점심 후 생제르맹 카페 거리와 저녁 센강 유람선 야경을 감상합니다.",
                  "seniorTip": "💡 센강 유람선(바토무슈/바토 파리지앵)은 야외 데크 외에도 유리 통창의 따뜻한 실내 좌석이 완비되어 있어 어머니가 춥지 않게 파리의 야경을 감상하실 수 있습니다.",
                  "dayMapUrl": "https://www.google.com/maps/search/?api=1&query=Eiffel+Tower+Paris",
                  "activities": [
                        {
                              "time": "09:30~10:15",
                              "title": "트로카데로 광장(샤이오 궁) 에펠탑 포토존",
                              "desc": "호텔에서 도보 8분(완벽한 평지). 샤이오 궁 테라스에서 에펠탑 전체가 정면으로 내려다보이는 파리 최고의 가족 사진 명소.",
                              "icon": "📸",
                              "tag": "관광",
                              "image": "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1200&auto=format&fit=crop",
                              "imageCaption": "트로카데로 광장에서 바라본 웅장한 파리 에펠탑",
                              "imageSource": "https://unsplash.com/photos/low-angle-photography-of-eiffel-tower-ePpaQC2c10Q",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Trocad%C3%A9ro+Paris",
                              "rating": "⭐ 4.7 (구글 리뷰 110,000+)",
                              "seniorNote": "숙소에서 평지 도보 8분, 아침 채광이 좋아 사진이 가장 예쁘게 나옴"
                        },
                        {
                              "time": "10:30~12:00",
                              "title": "이에나 다리 건너 에펠탑 마르스 광장 산책",
                              "desc": "센강을 건너 에펠탑 바로 아래를 지나 푸른 잔디밭 마르스 광장(Champ de Mars) 벤치에서 에펠탑을 올려다보며 여유로운 산책.",
                              "icon": "🗼",
                              "tag": "산책",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Champ+de+Mars+Paris",
                              "seniorNote": "에펠탑 정상 계단 등반 대신 지상 잔디밭 산책과 벤치 휴식 중심"
                        },
                        {
                              "time": "12:30~14:00",
                              "title": "점심: Bistrot des Fables (구 Cafe Constant)",
                              "desc": "에펠탑 도보 7분, 세인트 도미니크 거리의 명소. 미슐랭 셰프 크리스티앙 콩스탕의 정통 파리지앵 비스트로. 진한 양파 그라탕 스프와 부드러운 오리 다리 콩피.",
                              "icon": "🍽️",
                              "tag": "식사",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Bistrot+des+Fables+Paris",
                              "rating": "⭐ 4.5 (구글 리뷰 2,850+)",
                              "signatureMenu": "프랑스 정통 양파 그라탕 수프(Soupe à l'oignon), 겉바속촉 오리 콩피(Confit de Canard), 바닐라 밀푀유",
                              "seniorNote": "양파 스프가 따끈하고 깊은 감칠맛을 내어 어르신 피로를 확 풀어줌"
                        },
                        {
                              "time": "14:30~16:30",
                              "title": "우버 이동 → 생제르맹 데 프레(Saint-Germain) 카페 휴식",
                              "desc": "식당 앞에서 우버 호출하여 센강 좌안 생제르맹 이동. 1천년 역사의 생제르맹 데 프레 성당 내부 관람 및 전설적인 카페 레 뒤 마고(Les Deux Magots) 테라스 티타임.",
                              "icon": "☕",
                              "tag": "카페",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Les+Deux+Magots+Paris",
                              "rating": "⭐ 4.3 (구글 리뷰 13,000+)",
                              "signatureMenu": "에스프레소, 전통 핫초콜릿, 딸기 타르트, 마카롱",
                              "seniorNote": "택시/우버 탑승으로 어머니 걷기 거리 대폭 단축 (약 10분 소요)"
                        },
                        {
                              "time": "17:30~19:00",
                              "title": "센강 바토 파리지앵 유람선 탑승 (석양 & 일루미네이션)",
                              "desc": "에펠탑 선착장에서 탑승하는 센강 유람선. 루브르, 오르세, 시테섬 노트르담 대성당의 황금빛 조명을 물 위에서 앉아서 편안하게 70분간 감상.",
                              "icon": "🚢",
                              "tag": "크루즈",
                              "image": "https://images.unsplash.com/photo-1524396309943-e03f5249f002?q=80&w=1200&auto=format&fit=crop",
                              "imageCaption": "센강을 따라 유람선에서 바라본 파리의 낭만적인 다리와 야경",
                              "imageSource": "https://unsplash.com/photos/seine-river-paris-france-5OUMs2OyvGQ",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Bateaux+Parisiens+Eiffel+Tower",
                              "rating": "⭐ 4.6 (구글 리뷰 35,000+)",
                              "seniorNote": "온열 난방이 되는 1층 실내 좌석에 착석하여 춥지 않게 관람"
                        },
                        {
                              "time": "19:30~21:00",
                              "title": "저녁: Les Cocottes Tour Eiffel (주물냄비 프렌치)",
                              "desc": "스타 셰프의 감각적인 스타우브 주물 냄비 스튜 요리 전문점. 부드럽고 따뜻한 냄비 요리로 든든한 저녁.",
                              "icon": "🍽️",
                              "tag": "식사",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Les+Cocottes+Tour+Eiffel+Paris",
                              "rating": "⭐ 4.4 (구글 리뷰 2,100+)",
                              "signatureMenu": "트러플 감자 라비올리, 뵈프 부르기뇽 주물냄비 스튜, 초콜릿 무스",
                              "seniorNote": "선착장에서 도보 6분, 호텔까지 우버로 5분 거리"
                        }
                  ]
            },
            {
                  "day": 5,
                  "date": "2월 10일(수)",
                  "title": "루브르 박물관 핵심 하이라이트 & 안젤리나 티타임 & 튈르리 정원",
                  "badge": "루브르 & 예술",
                  "summary": "우버로 루브르 박물관에 도착하여 엘리베이터 동선 중심 2시간 핵심 명작 투어(모나리자, 비너스, 니케)를 진행하고, 1903년 왕실 살롱 드 떼 안젤리나에서 몽블랑 디저트를 즐깁니다.",
                  "seniorTip": "💡 루브르 박물관은 세계에서 가장 크기 때문에 전체를 다 걸으면 10km가 넘습니다. 어머니 체력을 위해 엘리베이터가 있는 드농(Denon)관 중심 3대 걸작 위주로 2시간 이내로 한정합니다.",
                  "dayMapUrl": "https://www.google.com/maps/search/?api=1&query=Louvre+Museum+Paris",
                  "activities": [
                        {
                              "time": "09:30~10:00",
                              "title": "우버로 루브르 박물관 피라미드 이동",
                              "desc": "호텔 앞에서 우버 호출하여 루브르 지하 카루젤 뒤 루브르(Carrousel du Louvre) 입구 바로 앞 하차. 비바람이나 계단 없이 엘리베이터로 박물관 진입.",
                              "icon": "🚕",
                              "tag": "이동",
                              "seniorNote": "카루젤 입구는 지상 피라미드보다 대기 줄이 훨씬 짧고 실내라 따뜻함"
                        },
                        {
                              "time": "10:00~12:15",
                              "title": "루브르 박물관 핵심 3대 걸작 투어",
                              "desc": "사전 시간예약 패스트트랙 입장. 레오나르도 다빈치의 '모나리자', '밀로의 비너스', '사모트라케의 니케', '나폴레옹 대관식' 등 인류 최고의 명작 감상.",
                              "icon": "🎨",
                              "tag": "박물관",
                              "image": "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1200&auto=format&fit=crop",
                              "imageCaption": "루브르 박물관의 상징 유리 피라미드와 고전 회랑",
                              "imageSource": "https://unsplash.com/photos/louvre-museum-paris-france-8oxvhs6FfBM",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Louvre+Museum+Paris",
                              "rating": "⭐ 4.7 (구글 리뷰 280,000+)",
                              "seniorNote": "드농관 1층에 엘리베이터와 휠체어 리프트 완비, 복도 곳곳 푹신한 소파 휴식"
                        },
                        {
                              "time": "12:30~13:45",
                              "title": "점심: Le Café Marly (루브르 유리 피라미드 전망)",
                              "desc": "루브르 리슐리외관 아케이드 테라스에 위치. 통유리 피라미드를 정면으로 바라보며 즐기는 우아한 프렌치 런치.",
                              "icon": "🍽️",
                              "tag": "식사",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Le+Cafe+Marly+Paris",
                              "rating": "⭐ 4.2 (구글 리뷰 3,600+)",
                              "signatureMenu": "클럽 샌드위치, 트러플 파스타, 연어 필레 구이, 프렌치 와인",
                              "seniorNote": "루브르 출구에서 바로 연결되어 걷지 않고 바로 착석"
                        },
                        {
                              "time": "14:00~15:30",
                              "title": "티타임: Angelina Paris (리볼리 본점 1903년 살롱)",
                              "desc": "튈르리 정원 맞은편. 코코 샤넬과 오드리 헵번이 사랑한 명품 살롱 드 떼. 시그니처 몽블랑(밤 크림 케이크)과 진하고 달콤한 쇼콜라 쇼(L'Africain).",
                              "icon": "☕",
                              "tag": "디저트",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Angelina+Paris+Rivoli",
                              "rating": "⭐ 4.4 (구글 리뷰 14,500+)",
                              "signatureMenu": "전설적인 몽블랑(Mont-Blanc), 쇼콜라 쇼(Chocolat Chaud l'Africain), 에스프레소",
                              "seniorNote": "화려한 황금빛 거울과 샹들리에 인테리어로 어머니 사진 명소"
                        },
                        {
                              "time": "16:00~18:00",
                              "title": "방돔 광장 산책 후 숙소 복귀 & 오후 휴식",
                              "desc": "방돔 광장(Place Vendôme)의 고즈넉한 광장 풍경을 둘러본 후 우버로 16구 숙소 복귀. 저녁 전까지 여유롭게 휴식.",
                              "icon": "🏨",
                              "tag": "휴식",
                              "seniorNote": "무리한 쇼핑 대신 호텔에서 다리 찜질과 휴식"
                        },
                        {
                              "time": "18:30~20:00",
                              "title": "저녁: Chez Gladines Saint-Germain 또는 16구 로컬 만찬",
                              "desc": "숙소 인근의 아늑한 비스트로에서 신선한 샐러드와 그릴 스테이크로 편안한 저녁.",
                              "icon": "🍽️",
                              "tag": "식사",
                              "seniorNote": "소화가 잘 되는 담백한 조리법 요청 가능"
                        }
                  ]
            },
            {
                  "day": 6,
                  "date": "2월 11일(목)",
                  "title": "오르세 미술관(인상파 명작) & 몽마르트르 언덕(케이블카) & 파리 마지막 밤",
                  "badge": "오르세 & 몽마르트르",
                  "summary": "옛 기차역을 개조해 동선이 평탄한 오르세 미술관에서 고흐와 모네의 그림을 감상하고, 몽마르트르 언덕은 푸니쿨라(케이블카)로 편안히 올라간 뒤 파리 정통 브라세리에서 송별 만찬을 가집니다.",
                  "seniorTip": "💡 몽마르트르 언덕은 계단이 222개나 되지만, 지하철 티켓으로 탑승 가능한 '푸니쿨라(Funiculaire de Montmartre)' 케이블카를 타면 1분 만에 정상 사크레쾨르 성당 앞에 도착합니다.",
                  "dayMapUrl": "https://www.google.com/maps/search/?api=1&query=Orsay+Museum+Paris",
                  "activities": [
                        {
                              "time": "09:30~10:00",
                              "title": "우버로 오르세 미술관(Musée d'Orsay) 이동",
                              "desc": "호텔에서 센강변을 따라 우버로 12분 이동. 오르세 정문 시간예약 전용 출입구로 신속 입장.",
                              "icon": "🚕",
                              "tag": "이동",
                              "seniorNote": "계단 환승 없이 문 앞 직행"
                        },
                        {
                              "time": "10:00~12:15",
                              "title": "오르세 미술관 인상파 명작 관람",
                              "desc": "빈센트 반 고흐의 '자화상'과 '아를의 별이 빛나는 밤', 클로드 모네의 '수련'과 '양산을 든 여인', 르누아르의 '물랭 드 라 갈레트의 무도회'. 5층 대형 시계창 포토존.",
                              "icon": "🖼️",
                              "tag": "미술관",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Orsay+Museum+Paris",
                              "rating": "⭐ 4.7 (구글 리뷰 115,000+)",
                              "seniorNote": "기차역 개조 건물이라 층고가 높고 바닥이 완만하며 엘리베이터가 곳곳에 잘 되어 있어 루브르보다 관람이 훨씬 쾌적함"
                        },
                        {
                              "time": "12:30~13:45",
                              "title": "점심: Restaurant du Musée d'Orsay",
                              "desc": "오르세 미술관 2층. 1900년 옛 오르세 호텔 연회장 그대로 보존된 화려한 금빛 천장과 샹들리에 아래서 즐기는 품격 있는 프렌치 런치.",
                              "icon": "🍽️",
                              "tag": "식사",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Restaurant+du+Mus%C3%A9e+d%27Orsay",
                              "rating": "⭐ 4.3 (구글 리뷰 1,400+)",
                              "signatureMenu": "오늘의 생선 요리(Poisson du jour), 오리 콩피, 제철 타르트 세트",
                              "seniorNote": "미술관 내부에서 이동 없이 바로 식사할 수 있어 어르신 동선 절약 극대화"
                        },
                        {
                              "time": "14:15~16:30",
                              "title": "택시 이동 → 몽마르트르 푸니쿨라 & 사크레쾨르 대성당",
                              "desc": "택시로 몽마르트르 언덕 하부 이동 후 푸니쿨라 케이블카 탑승(계단 제로!). 정상에서 파리 전경을 한눈에 내려다보고, 테르트르 광장(Place du Tertre)에서 거리 화가들의 그림 감상.",
                              "icon": "⛪",
                              "tag": "관광",
                              "image": "https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?q=80&w=1200&auto=format&fit=crop",
                              "imageCaption": "몽마르트르 언덕 정상의 백색 사크레쾨르 대성당과 파리 시내 전경",
                              "imageSource": "https://unsplash.com/photos/sacre-coeur-paris-france-x845fHn6w1g",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Basilique+du+Sacr%C3%A9-C%C5%93ur+de+Montmartre",
                              "rating": "⭐ 4.7 (구글 리뷰 140,000+)",
                              "seniorNote": "푸니쿨라 탑승으로 무릎 관절 보호. 팔찌 강매 상인 주의하며 가족 함께 이동"
                        },
                        {
                              "time": "17:30~19:00",
                              "title": "샹젤리제 거리 & 개선문 (라파예트 샹젤리제점)",
                              "desc": "우버로 샹젤리제 이동. 웅장한 에투알 개선문(Arc de Triomphe)을 바라보고, 명품 갤러리아 라파예트 백화점에서 선물용 마카롱·초콜릿 쇼핑.",
                              "icon": "🛍️",
                              "tag": "쇼핑",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Arc+de+Triomphe+Paris",
                              "seniorNote": "개선문 전망대 나선형 계단 등반은 생략하고 지상에서 외관 감상"
                        },
                        {
                              "time": "19:30~21:30",
                              "title": "파리 마지막 만찬: Brasserie Bellanger",
                              "desc": "파리지앵들이 극찬하는 정통 프렌치 브라세리. 두툼하고 부드러운 뵈프 부르기뇽(와인 소고기 찜)과 신선한 해산물 플래터로 낭만적인 파리의 마지막 밤 기념.",
                              "icon": "🍷",
                              "tag": "만찬",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Brasserie+Bellanger+Paris",
                              "rating": "⭐ 4.6 (구글 리뷰 4,200+)",
                              "signatureMenu": "정통 뵈프 부르기뇽(Bœuf Bourguignon), 부르고뉴 에스카르고(Escargots), 수제 밀푀유",
                              "seniorNote": "소고기가 장시간 와인에 조려져 잇몸으로도 씹힐 만큼 극도로 부드러움"
                        }
                  ]
            },
            {
                  "day": 7,
                  "date": "2월 12일(금)",
                  "title": "파리 여유로운 오전 & 아시아나 OZ 502 직항 귀국편 탑승",
                  "badge": "오후 직항 귀국",
                  "summary": "16구 호텔 인근에서 여유롭게 늦은 조식과 산책을 즐기고, 오후 15:00 전용차량 샌딩으로 샤를드골 제1터미널로 이동하여 18:25 아시아나 직항에 탑승합니다.",
                  "seniorTip": "💡 아시아나 직항 옵션의 최대 장점은 마지막 날 오전 10시까지 호텔에서 여유를 부릴 수 있다는 점입니다. 오후 15:00에 샌딩 차량이 오므로 점심까지 느긋하게 드시고 출발하세요.",
                  "dayMapUrl": "https://www.google.com/maps/search/?api=1&query=Paris+Charles+de+Gaulle+Airport+Terminal+1",
                  "activities": [
                        {
                              "time": "09:30~11:00",
                              "title": "호텔 조식 & 짐 정리 & 체크아웃 후 짐 보관",
                              "desc": "여유롭게 늦은 아침을 먹고 캐리어 패킹. 11:00 프런트에 짐을 맡기고 가벼운 복장으로 외출.",
                              "icon": "🧳",
                              "tag": "체크아웃",
                              "seniorNote": "기내 반입 가방에 여권, 보조배터리, 복용약 따로 챙기기"
                        },
                        {
                              "time": "11:30~13:00",
                              "title": "16구 빅토르 위고 광장(Place Victor Hugo) 산책 & 약국 쇼핑",
                              "desc": "호텔에서 도보 5분. 파리 부촌 16구의 아름다운 분수 광장과 노천 카페. 프랑스 대표 더모 코스메틱(달팡, 눅스, 꼬달리 핸드크림) 선물 구입.",
                              "icon": "🌿",
                              "tag": "산책",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Place+Victor+Hugo+Paris",
                              "seniorNote": "도보 5분 거리의 한적한 평지 산책"
                        },
                        {
                              "time": "13:00~14:30",
                              "title": "마지막 점심: Brasserie Victor Hugo",
                              "desc": "빅토르 위고 광장 테라스에서 즐기는 여유로운 프렌치 오믈렛, 어니언 스프와 따뜻한 티.",
                              "icon": "🍽️",
                              "tag": "식사",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Brasserie+Victor+Hugo+Paris",
                              "rating": "⭐ 4.3 (구글 리뷰 1,900+)",
                              "signatureMenu": "프렌치 오믈렛, 트러플 크로크무슈, 따뜻한 카푸치노",
                              "seniorNote": "호텔에서 300m 거리로 점심 후 바로 호텔 로비로 복귀"
                        },
                        {
                              "time": "15:00",
                              "title": "[포함] 전용차량 샌딩 숙소 픽업 → CDG 공항 T1",
                              "desc": "호텔 로비에서 단독 밴 기사 미팅. 샤를드골 공항 제1터미널(CDG T1)로 이동 (출발 3시간 25분 전 도착).",
                              "icon": "🚐",
                              "tag": "공항이동",
                              "seniorNote": "출국길 무거운 짐을 들고 대중교통 탈 필요 없이 밴으로 편안히 이동"
                        },
                        {
                              "time": "16:00~18:00",
                              "title": "택스리펀(PABLO) & 아시아나 출국 수속 & 면세점",
                              "desc": "전자 택스리펀 PABLO 기계에 바코드 간편 스캔(세관 창구 대기 불필요). 아시아나항공 탑승수속 및 면세점 이용.",
                              "icon": "🛂",
                              "tag": "출국",
                              "seniorNote": "터미널 1 라운지 또는 탑승구 앞 소파에서 편안히 대기"
                        },
                        {
                              "time": "18:25",
                              "title": "아시아나항공 OZ 502 파리 → 인천 직항 출발",
                              "desc": "비행시간 12시간 15분. 국적기 한국인 승무원의 세심한 케어와 따뜻한 한식 기내식(영양 쌈밥 등).",
                              "icon": "✈️",
                              "tag": "귀국",
                              "seniorNote": "기내에서 편안한 숙면을 취하며 한국 시간대로 복귀"
                        }
                  ]
            },
            {
                  "day": 8,
                  "date": "2월 13일(토)",
                  "title": "인천국제공항 제1터미널 도착 · 가족 여행 귀가",
                  "badge": "도착 & 귀가",
                  "summary": "오후 14:40 인천공항에 안전하게 도착하여 수하물을 찾고 귀가합니다.",
                  "seniorTip": "💡 주말 오후 도착이므로 입국 후 시내 이동이 원활하며, 다음 날인 일요일(2/14)까지 하루 온전히 쉴 수 있어 어르신 일상 회복에 최적입니다.",
                  "activities": [
                        {
                              "time": "14:40 (한국)",
                              "title": "인천국제공항 도착 & 입국 심사",
                              "desc": "자동출입국심사 및 수하물 수령 후 세관 통과. 가족과 함께 안전하게 귀가.",
                              "icon": "🏠",
                              "tag": "도착",
                              "seniorNote": "집으로 귀가 후 충분한 수분 섭취와 휴식"
                        }
                  ]
            }
      ],
      "seniorGuideTips": [
            {
                  "title": "❄️ 북극 로바니에미 완벽 방한 전략",
                  "desc": "2월 로바니에미는 영하 10도~15도입니다. 두꺼운 외투 1벌보다 '보온 기능성 내의 + 플리스/스웨터 + 방풍 다운패딩' 3단계 레이어드가 효과적입니다. 오로라 투어 시에는 투어사에서 전문 방한복과 털부츠를 제공하므로 어머니 발바닥과 허리에 붙이는 핫팩만 준비하시면 충분합니다."
            },
            {
                  "title": "✈️ 국적기 아시아나 직항의 체력적 우위",
                  "desc": "이 플랜의 핵심 장점은 귀국 시 파리→인천 아시아나 직항(OZ502)입니다. 귀국 비행 12시간 동안 환승 스트레스와 수하물 분실 걱정이 없으며, 한국인 승무원의 케어와 한식 기내식(영양 쌈밥 등)을 드시며 어르신이 가장 편안하게 귀국하실 수 있습니다."
            },
            {
                  "title": "🚐 공항 전용차량 4회 단독 픽업/샌딩",
                  "desc": "웹투어 견적에 '로바니에미 공항 픽업/샌딩 2회 + 파리 샤를드골 공항 픽업/샌딩 2회' 총 4회의 전용 밴 차량이 포함되어 있습니다. 파리 지하철의 악명 높은 소매치기와 계단을 완벽히 회피하고 숙소 문 앞까지 캐리어를 실어 나릅니다."
            },
            {
                  "title": "🏨 파리 최고 안전지대 16구 숙소 (Elysees Union)",
                  "desc": "호텔이 위치한 파리 16구는 각국 대사관과 고급 주택이 밀집된 파리에서 치안이 가장 안전한 지역입니다. 밤 늦게 산책해도 위험하지 않으며, 에펠탑과 트로카데로 광장이 도보 8~10분 평지 거리라 무리 없이 에펠탑 야경을 즐기실 수 있습니다."
            },
            {
                  "title": "🏛️ 루브르·오르세 엘리베이터 동선 & 예약 필수",
                  "desc": "파리 주요 박물관은 현장 대기 시 1~2시간 이상 소요되므로 웹투어 투어 신청 또는 사전 시간예약 티켓을 필수 지참합니다. 루브르는 지하 카루젤 입구 엘리베이터를 이용하고, 2시간 이내 3대 걸작 위주로 관람하여 어머니 무릎에 무리가 가지 않도록 배려했습니다."
            },
            {
                  "title": "🍽️ 한식·온수 조리 가능한 로바니에미 아파트",
                  "desc": "로바니에미의 Forenom Serviced Apartments는 주방(인덕션, 전자레인지, 전기포트, 식기)과 개인 사우나가 구비된 스튜디오 4인실입니다. 시내 K-마트에서 장을 보아 어르신을 위한 따뜻한 한식 국물이나 누룽지를 조리해 드릴 수 있어 여행 피로 회복에 탁월합니다."
            }
      ]
},
    finland_paris_finnair: {
      "id": "finland_paris_finnair",
      "name": "핀란드·파리 (핀에어 왕복)",
      "country": "핀란드 🇫🇮 & 프랑스 🇫🇷",
      "title": "합리적인 예산으로 떠나는 핀란드&파리 7박 9일",
      "subtitle": "로바니에미 오로라 투어와 파리 핵심 명소 · 핀에어 헬싱키 환승으로 4인 총 355만원 절약 실속형 플랜",
      "heroImage": "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1200&auto=format&fit=crop",
      "heroImageCaption": "핀란드 라플란드의 신비로운 밤하늘 오로라(Aurora Borealis)",
      "heroImageSource": "https://unsplash.com/photos/aurora-borealis-during-night-time-C9qF1V55b2g",
      "status": "active",
      "dates": {
            "departure": "2027.02.05 (금)",
            "return": "2027.02.13 (토)",
            "duration": "7박 9일 · 현지 6박 + 기내 2박"
      },
      "travelers": {
            "total": 4,
            "composition": "30대 부부 2명 + 30대 딸 1명 + 60대 어머니 1명 (총 성인 4인)",
            "style": "가성비 극대화 · 공항 전용차량 4회 · 오로라 전용밴 투어 · 헬싱키 공항 쇼핑 & 쾌적한 환승"
      },
      "estimateInfo": {
            "pdfFile": "0205 강영길님 가족 유럽 여행 - 핀란드&파리 - 핀에어.pdf",
            "agency": "웹투어㈜ (Webtour)",
            "issuedDate": "2026.10.02",
            "packagePriceTotal": 17881200,
            "packagePricePerPerson": 4470300,
            "account": "KEB하나은행 145-890020-67004 웹투어㈜",
            "deposit": "계약금 1인 300,000원 (4인 총 1,200,000원) · 10/6(화)까지 입금",
            "airDeposit": "항공 중도금 1인 2,000,000원 (4인 총 8,000,000원) · 10/6(화) 16:00 발권",
            "balanceDeadline": "출발 3주 전 1월 15일(금)까지 잔금 결제",
            "highlight": "아시아나 직항 대비 1인 888,700원(4인 총 3,554,800원) 절약! 핀에어 전구간 이용으로 최상의 가성비 플랜입니다.",
            "included": [
                  "국제선 왕복 항공권 (인천-헬싱키-로바니에미 / 파리-헬싱키-인천 핀에어 전구간)",
                  "유류할증료 & 제세공과금 포함 (1인 210,300원 확정)",
                  "로바니에미-파리 구간 항공권 (에어프랑스 AF1525 직항)",
                  "로바니에미 Forenom 레지던스 4인실 (2박) + 파리 16구 Elysees Union 2실 (4박 조식 포함)",
                  "로바니에미 공항 픽업/샌딩 전용 밴 차량 2회",
                  "파리 샤를드골 공항 픽업/샌딩 전용 밴 차량 2회 (소매치기·환승계단 완벽 차단)",
                  "로바니에미 오로라 헌팅 전용 밴 투어 (모닥불 BBQ & 소시지/베리티 포함)",
                  "해외 여행자 보험 (1억원 보장)"
            ],
            "excluded": [
                  "현지 자유식비 (중식 & 석식 - 일정표 내 엄선된 추천 맛집 이용)",
                  "파리 시내 우버/택시비 및 메트로 교통비",
                  "루브르 박물관, 오르세 미술관 등 개인 입장료",
                  "호텔 시티택스 (체크인 시 1인 1박 직불)",
                  "개인 쇼핑 경비 및 물값"
            ]
      },
      "flight": {
            "airline": "핀에어 (Finnair 전구간)",
            "airlineCode": "AY",
            "type": "왕복 경유 (헬싱키 환승)",
            "outbound": {
                  "flightNo": "AY042 / AY555",
                  "depTime": "23:00 (2/5 금)",
                  "depAirport": "인천 (ICN T1)",
                  "arrTime": "10:50 (2/6 토)",
                  "arrAirport": "로바니에미 (RVN)",
                  "duration": "총 17시간 50분 (헬싱키 환승 3h45m 포함)",
                  "note": "2/5(금) 밤 23:00 출발로 기내 숙면 후 헬싱키(05:40 도착) 경유하여 로바니에미에 2/6(토) 오전 10:50 도착합니다."
            },
            "inbound": {
                  "flightNo": "AY1572 / AY041",
                  "depTime": "10:35 (2/12 금)",
                  "depAirport": "파리 샤를드골 (CDG T2D)",
                  "arrTime": "12:25 (2/13 토)",
                  "arrAirport": "인천 (ICN T1)",
                  "duration": "총 18시간 50분 (헬싱키 환승 3h05m 포함)",
                  "note": "파리에서 오전 10:35 출발하여 헬싱키 경유(환승 대기 3시간 5분 동안 쇼핑/휴식), 2/13(토) 낮 12:25 인천 도착."
            },
            "segments": [
                  {
                        "type": "outbound",
                        "label": "🛫 [1구간 국제선] 인천 → 헬싱키 (AY 42)",
                        "depDate": "2027.02.05 (금)",
                        "depTime": "23:00",
                        "depAirport": "인천 (ICN T1)",
                        "arrTime": "05:40 (+1일)",
                        "arrAirport": "헬싱키 (HEL)",
                        "duration": "13시간 40분",
                        "airline": "핀에어 (Finnair A350)",
                        "note": "야간 출발로 기내 수면. 헬싱키 공항 환승 대기 3시간 45분"
                  },
                  {
                        "type": "outbound",
                        "label": "🛫 [2구간 국내선] 헬싱키 → 로바니에미 (AY 555)",
                        "depDate": "2027.02.06 (토)",
                        "depTime": "09:25",
                        "depAirport": "헬싱키 (HEL)",
                        "arrTime": "10:50",
                        "arrAirport": "로바니에미 (RVN)",
                        "duration": "1시간 25분",
                        "airline": "핀에어 (Finnair)",
                        "note": "로바니에미 도착 후 [포함사항] 공항 전용 픽업 차량으로 숙소(Forenom) 직행"
                  },
                  {
                        "type": "intercity",
                        "label": "✈️ [3구간 이동] 로바니에미 → 파리 CDG (AF 1525)",
                        "depDate": "2027.02.08 (월)",
                        "depTime": "15:25",
                        "depAirport": "로바니에미 (RVN)",
                        "arrTime": "18:15",
                        "arrAirport": "파리 샤를드골 (CDG T2F)",
                        "duration": "3시간 50분",
                        "airline": "에어프랑스 (Air France)",
                        "note": "[포함] 로바니에미 공항 샌딩 차량 & 파리 공항 픽업 차량 제공"
                  },
                  {
                        "type": "inbound",
                        "label": "🛬 [4구간 경유1] 파리 CDG → 헬싱키 (AY 1572)",
                        "depDate": "2027.02.12 (금)",
                        "depTime": "10:35",
                        "depAirport": "파리 샤를드골 (CDG T2D)",
                        "arrTime": "14:30",
                        "arrAirport": "헬싱키 (HEL)",
                        "duration": "2시간 55분",
                        "airline": "핀에어 (Jettime 운항)",
                        "note": "아침 07:30 전용차량 샌딩으로 공항 이동. 헬싱키 도착 후 3시간 5분 여유로운 환승"
                  },
                  {
                        "type": "inbound",
                        "label": "🛬 [5구간 경유2] 헬싱키 → 인천 (AY 41)",
                        "depDate": "2027.02.12 (금)",
                        "depTime": "17:35",
                        "depAirport": "헬싱키 (HEL)",
                        "arrTime": "12:25 (+1일)",
                        "arrAirport": "인천 (ICN T1)",
                        "duration": "12시간 50분",
                        "airline": "핀에어 (Finnair A350)",
                        "note": "2/13(토) 낮 12:25 인천 도착. 아시아나보다 2시간 일찍 귀국하여 귀가 여유 확보"
                  }
            ],
            "pricing": {
                  "perPerson": 4470300,
                  "total": 17881200,
                  "priceLabel": "성인 1인 / 항공+호텔 6박+오로라투어+전용차량 4회 포함",
                  "discountNote": "성인 상품가 4,260,000원 + 유류할증료·제세공과금 210,300원 (웹투어 확정 금액 / 4인 총 355만원 절약)"
            }
      },
      "budget": {
            "total": 20681200,
            "perPerson": 5170300,
            "currency": "원 (KRW)",
            "note": "웹투어 정식 견적 17,881,200원(항공+호텔 조식포함 6박+로바니에미 오로라투어+공항 전용차량 4회+구간항공+여행자보험)에 현지 식비·교통·입장료 약 280만원을 합산한 총 예산입니다. 4인 기준 약 355만원 절약 효과가 있습니다.",
            "categories": [
                  {
                        "id": "package",
                        "name": "웹투어 확정 견적 (핀에어 전구간)",
                        "icon": "✈️",
                        "amount": 17881200,
                        "perPerson": 4470300,
                        "percentage": 86.5,
                        "desc": "핀에어 왕복+AF 구간항공+유류세+Forenom 4인실(2박)+파리 Elysees Union 2실(4박)+오로라 밴 투어+전용차량 4회+보험"
                  },
                  {
                        "id": "food",
                        "name": "현지 식비 & 유명 카페 (4인)",
                        "icon": "🍽️",
                        "amount": 1800000,
                        "perPerson": 450000,
                        "percentage": 8.7,
                        "desc": "로바니에미 Nili 정통 순록요리, 산타마을 직화 통연어, 파리 미슐랭 비스트로, 안젤리나 몽블랑 등"
                  },
                  {
                        "id": "transport",
                        "name": "파리 시내 우버/택시 & 대중교통",
                        "icon": "🚕",
                        "amount": 360000,
                        "perPerson": 90000,
                        "percentage": 1.7,
                        "desc": "60대 어머니의 지하철 환승 계단 피로를 줄이기 위한 우버 및 택시 탑승 예산"
                  },
                  {
                        "id": "tours",
                        "name": "박물관 입장료 & 센강 유람선",
                        "icon": "🏛️",
                        "amount": 380000,
                        "perPerson": 95000,
                        "percentage": 1.8,
                        "desc": "루브르 박물관, 오르세 미술관, 바토 파리지앵 유람선, 산타마을 순록 썰매 등"
                  },
                  {
                        "id": "misc",
                        "name": "호텔 시티택스 & 예비비",
                        "icon": "💶",
                        "amount": 260000,
                        "perPerson": 65000,
                        "percentage": 1.3,
                        "desc": "프랑스/핀란드 숙박세 및 현지 통신(eSIM)·비상 예비비"
                  }
            ]
      },
      "itinerary": [
            {
                  "day": 1,
                  "date": "2월 5일(금) ~ 2월 6일(토)",
                  "title": "인천 출발 → 헬싱키 경유 → 북극 로바니에미 도착 & 아늑한 첫날",
                  "badge": "북극 첫걸음",
                  "summary": "2/5(금) 밤 23:00 인천 출발 후 헬싱키를 거쳐 2/6(토) 오전 10:50 로바니에미에 도착합니다. 전용 픽업차량으로 숙소 이동 후 따뜻한 실내 관람과 정통 라플란드 만찬으로 시차에 적응합니다.",
                  "seniorTip": "💡 로바니에미 2월 기온은 영하 10도~15도 안팎입니다. 방한부츠와 핫팩, 보온내의를 착용하시고 실내는 난방이 매우 잘 되어 있으므로 얇은 옷을 여러 겹 겹쳐 입으세요.",
                  "dayMapUrl": "https://www.google.com/maps/search/?api=1&query=Forenom+Serviced+Apartments+Rovaniemi",
                  "activities": [
                        {
                              "time": "20:00 (2/5 금)",
                              "title": "인천공항 제1터미널 집결 & 핀에어 수속",
                              "desc": "출발 3시간 전 도착. 웹투어 전자항공권으로 수하물 위탁 및 출국 심사. 기내 숙면을 위해 간단한 한식 식사와 온수 음용.",
                              "icon": "🧳",
                              "tag": "출국",
                              "image": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop",
                              "imageCaption": "인천공항 국제선 출발 로비",
                              "imageSource": "https://unsplash.com/photos/airplane-wing-during-flight-bvA3D06Om0o",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Incheon+International+Airport+Terminal+1",
                              "seniorNote": "출국장 패스트트랙(교통약자/우대출구) 이용 가능 여부 확인"
                        },
                        {
                              "time": "23:00~05:40",
                              "title": "핀에어 AY 42편 인천 → 헬싱키 야간 비행",
                              "desc": "비행시간 13시간 40분. 핀에어 최신 A350 기종으로 기내 공기 순환 및 소음이 적습니다. 기내 숙면 후 아침 05:40 헬싱키 도착.",
                              "icon": "✈️",
                              "tag": "항공",
                              "seniorNote": "수면 안대, 기내 압박 스타킹 및 목베개 챙기기"
                        },
                        {
                              "time": "09:25~10:50 (2/6 토)",
                              "title": "헬싱키 환승 → 로바니에미 공항 도착",
                              "desc": "헬싱키 공항 환승(3시간 45분 여유) 후 국내선 AY 555 탑승. 1시간 25분 만에 은빛 설원의 북극 로바니에미 공항 도착!",
                              "icon": "🛬",
                              "tag": "도착",
                              "image": "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?q=80&w=1200&auto=format&fit=crop",
                              "imageCaption": "눈 덮인 핀란드 북극 라플란드 숲과 설원",
                              "imageSource": "https://unsplash.com/photos/snow-covered-trees-during-daytime-O453M2Liufs",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Rovaniemi+Airport",
                              "seniorNote": "비행기 트랩에서 공항 건물까지 짧은 도보 시 바닥 미끄럼 주의"
                        },
                        {
                              "time": "11:30",
                              "title": "[포함] 공항 전용차량 픽업 → 숙소 이동 & 짐 보관",
                              "desc": "견적 포함사항인 단독 전용 밴으로 15분 만에 로바니에미 시내 Forenom Serviced Apartments 도착. 캐리어를 맡기고 가볍게 출발.",
                              "icon": "🚐",
                              "tag": "숙소",
                              "image": "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200&auto=format&fit=crop",
                              "imageCaption": "Forenom Serviced Apartments Rovaniemi 스튜디오 4인실 객실",
                              "imageSource": "https://unsplash.com/photos/brown-wooden-bed-frame-with-white-bed-sheet-178j8tJrNlc",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Forenom+Serviced+Apartments+Rovaniemi",
                              "rating": "⭐ 4.2 (구글 리뷰 450+)",
                              "seniorNote": "시내 중심 Koskikatu 위치, 주방 및 사우나 완비, 엘리베이터 직결"
                        },
                        {
                              "time": "12:30~13:40",
                              "title": "점심: Cafe & Bar 21 (로바니에미 1등 브런치 카페)",
                              "desc": "숙소에서 도보 3분. 현지인과 여행자 모두에게 인기 높은 따뜻한 카페에서 핀란드식 와플과 부드러운 수프로 첫 끼를 즐깁니다.",
                              "icon": "🍽️",
                              "tag": "식사",
                              "image": "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200&auto=format&fit=crop",
                              "imageCaption": "따뜻하고 아늑한 로바니에미 현지 카페 분위기",
                              "imageSource": "https://unsplash.com/photos/people-sitting-on-chair-beside-table-inside-building-wuw4zC45nLw",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Cafe+%26+Bar+21+Rovaniemi",
                              "rating": "⭐ 4.5 (구글 리뷰 1,850+)",
                              "signatureMenu": "훈제 연어 와플(Smoked Salmon Waffle), 따뜻한 치킨 크림 수프, 홈메이드 젤라또",
                              "seniorNote": "숙소에서 200m 평지 도보, 자극적이지 않고 부드러운 음식"
                        },
                        {
                              "time": "14:00~16:00",
                              "title": "아르크티쿰 과학센터 & 박물관 (Arktikum)",
                              "desc": "추위를 피해 따뜻한 실내 유리 터널 박물관 관람. 북극광(오로라)의 생성 원리와 라플란드 원주민 사미족의 문화를 감상합니다.",
                              "icon": "🏛️",
                              "tag": "관광",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Arktikum+Science+Museum+Rovaniemi",
                              "rating": "⭐ 4.4 (구글 리뷰 4,800+)",
                              "seniorNote": "전 구역 휠체어/유모차 평지 및 엘리베이터 동선, 실내 벤치 풍부"
                        },
                        {
                              "time": "16:30~18:00",
                              "title": "숙소 체크인 & 휴식 & K-마트 장보기",
                              "desc": "스튜디오 4인실 입실. 아파트 바로 앞 대형 마트(K-Supermarket Rinteenkulma)에서 과일, 온수용 생수, 간식 구입 후 따뜻하게 휴식.",
                              "icon": "🏨",
                              "tag": "숙소",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=K-Supermarket+Rinteenkulma+Rovaniemi",
                              "seniorNote": "도보 2분 거리 마트, 아파트 주방에서 한국 컵라면/차 끓이기 가능"
                        },
                        {
                              "time": "18:30~20:00",
                              "title": "저녁: Ravintola Nili (정통 라플란드 미식 레스토랑)",
                              "desc": "숙소 도보 4분. 순록 뿔과 자작나무로 장식된 아늑한 분위기에서 북극 최고의 만찬. 부드러운 순록 안심 스테이크와 진한 연어 크림 수프.",
                              "icon": "🍽️",
                              "tag": "식사",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Ravintola+Nili+Rovaniemi",
                              "rating": "⭐ 4.6 (구글 리뷰 2,450+)",
                              "signatureMenu": "부드러운 순록 안심 스테이크, 전통 북극해 연어 크림 수프(Lohikeitto), 클라우드베리 디저트",
                              "seniorNote": "한국인 입맛에도 잘 맞는 고소한 연어 크림 스프 강력 추천 (예약 필수)"
                        }
                  ]
            },
            {
                  "day": 2,
                  "date": "2월 7일(일)",
                  "title": "산타클로스 마을 방문 & 밤의 신비로운 오로라 투어",
                  "badge": "산타마을 & 오로라",
                  "summary": "오전에는 진짜 산타를 만나는 산타마을에서 직화 통연어구이 점심과 순록 썰매를 즐기고, 숙소에서 충분히 쉰 뒤 밤 19:30에 포함된 오로라 투어 전용 밴에 탑승합니다.",
                  "seniorTip": "💡 밤 19:30~23:30 오로라 투어는 전용 밴을 타고 이동하며 투어사에서 전문 방한 슈트와 부츠, 장갑을 제공합니다. 어머니 발에 핫팩을 붙이고 출발하세요.",
                  "dayMapUrl": "https://www.google.com/maps/search/?api=1&query=Santa+Claus+Village+Rovaniemi",
                  "activities": [
                        {
                              "time": "09:00~10:00",
                              "title": "아늑한 조식 & 오전 준비",
                              "desc": "숙소 조식 또는 아파트 주방에서 따뜻한 식사. 방한 외투와 모자 챙기기.",
                              "icon": "☕",
                              "tag": "식사",
                              "seniorNote": "어머니 관절 부담 없도록 충분한 스트레칭 후 출발"
                        },
                        {
                              "time": "10:30~12:30",
                              "title": "산타클로스 마을 (Santa Claus Village)",
                              "desc": "시내에서 차량 12분. 산타 집무실에서 공식 산타클로스와 직접 대화하고 가족 기념사진 촬영! 북극권선(Arctic Circle 66°33′45.9″) 통과 인증서 발급.",
                              "icon": "🎅",
                              "tag": "관광",
                              "image": "https://images.unsplash.com/photo-1579033461380-adb47c3eb938?q=80&w=1200&auto=format&fit=crop",
                              "imageCaption": "산타클로스 마을의 눈 덮인 통나무집과 순록 썰매",
                              "imageSource": "https://unsplash.com/photos/reindeer-on-snow-covered-ground-during-daytime-XmYg252K63g",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Santa+Claus+Village+Rovaniemi",
                              "rating": "⭐ 4.4 (구글 리뷰 28,000+)",
                              "seniorNote": "실내 통로가 잘 갖추어져 있어 춥지 않게 산타 오피스와 상점 관람 가능"
                        },
                        {
                              "time": "12:30~13:30",
                              "title": "점심: Santa's Salmon Place (산타마을 직화 통연어)",
                              "desc": "전통 원뿔형 사미 텐트(Kota) 안에서 장작불에 직접 구워주는 두툼한 생연어 스테이크. 불향 가득하고 입에서 살살 녹는 인생 연어!",
                              "icon": "🔥",
                              "tag": "식사",
                              "image": "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=1200&auto=format&fit=crop",
                              "imageCaption": "장작불 모닥불에서 훈제 직화로 구워내는 라플란드 통연어",
                              "imageSource": "https://unsplash.com/photos/bonfire-during-winter-time-E9SZ8N2b8mU",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Santa%27s+Salmon+Place+Rovaniemi",
                              "rating": "⭐ 4.8 (구글 리뷰 4,100+)",
                              "signatureMenu": "직화 훈제 통연어 단일 메뉴(Fresh Grilled Salmon with Potato Salad & Bread)",
                              "seniorNote": "텐트 중앙 모닥불 덕분에 훈훈하며, 생선 살이 연해 어르신 식사로 최고"
                        },
                        {
                              "time": "13:40~15:00",
                              "title": "순록 썰매 짧은 체험 & 산타 중앙 우체국",
                              "desc": "400m 짧은 순록 썰매 코스(썰매에 두꺼운 순록 모피 담요를 덮고 편안히 앉아 눈 숲길 산책). 산타 중앙 우체국에서 크리스마스 특별 직인이 찍히는 엽서 발송.",
                              "icon": "🦌",
                              "tag": "체험",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Santa+Claus+Main+Post+Office",
                              "rating": "⭐ 4.6 (구글 리뷰 5,200+)",
                              "seniorNote": "스노모빌처럼 흔들림이나 소음이 전혀 없고, 썰매에 기대어 앉아 매우 안전"
                        },
                        {
                              "time": "15:30~18:00",
                              "title": "숙소 복귀 & 온수 목욕 / 사우나 & 낮잠 충전",
                              "desc": "오후에는 무리하지 않고 아파트로 복귀하여 프라이빗 사우나 또는 온수 목욕 후 2시간 이상 낮잠. 밤 오로라 투어를 위한 체력 비축.",
                              "icon": "🛏️",
                              "tag": "휴식",
                              "seniorNote": "어머니 밤 일정 전 체력 안배 필수 시간"
                        },
                        {
                              "time": "18:00~19:15",
                              "title": "이른 저녁: Restaurant Monte Rosa",
                              "desc": "숙소 도보 2분. 그릴 요리와 따뜻한 수프로 든든하게 속을 채우고 출발 준비.",
                              "icon": "🍽️",
                              "tag": "식사",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Restaurant+Monte+Rosa+Rovaniemi",
                              "rating": "⭐ 4.4 (구글 리뷰 980+)",
                              "signatureMenu": "북극 차르 생선구이, 핀란드 소고기 안심 구이, 버섯 크림 파스타",
                              "seniorNote": "호텔 City Hotel 1층에 위치하여 출입이 매우 편리"
                        },
                        {
                              "time": "19:30~23:30",
                              "title": "[포함 투어] 로바니에미 오로라 헌팅 투어 (Aurora Hunting)",
                              "desc": "웹투어 견적 포함 공식 오로라 투어. 전문 가이드와 함께 따뜻한 전용 밴을 타고 구름을 피해 최적의 관측지로 이동. 모닥불 주변에서 따뜻한 베리 티와 소시지를 먹으며 밤하늘의 초록빛 오로라 댄스를 감상합니다.",
                              "icon": "🌌",
                              "tag": "투어",
                              "image": "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1200&auto=format&fit=crop",
                              "imageCaption": "로바니에미 인근 숲 호숫가에서 촬영된 오로라와 모닥불",
                              "imageSource": "https://unsplash.com/photos/aurora-borealis-during-night-time-C9qF1V55b2g",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Rovaniemi+Northern+Lights+Tour",
                              "rating": "⭐ 4.8 (포함 투어 예정)",
                              "seniorNote": "전용 밴 내부 히터 가동으로 춥지 않게 대기 가능. 가이드가 고화질 가족 사진 촬영 지원"
                        }
                  ]
            },
            {
                  "day": 3,
                  "date": "2월 8일(월)",
                  "title": "로바니에미 출발 → 에어프랑스 탑승 → 파리 도착 & 16구 안착",
                  "badge": "파리 입성",
                  "summary": "오전 로바니에미 시내에서 늦은 조식 후 전용차량으로 공항 이동, 15:25 에어프랑스를 타고 파리 샤를드골에 18:15 도착합니다. 전용차량으로 16구 안전지대 호텔에 체크인하고 따뜻한 비스트로 만찬을 즐깁니다.",
                  "seniorTip": "💡 파리 공항에서 지하철(RER B)은 소매치기와 계단 환승이 악명 높습니다. 웹투어 견적에 'CDG 공항→파리 호텔 전용차량 픽업'이 포함되어 있어 짐을 싣고 문 앞까지 안락하게 이동합니다.",
                  "dayMapUrl": "https://www.google.com/maps/search/?api=1&query=Elysees+Union+Hotel+Paris",
                  "activities": [
                        {
                              "time": "10:00~11:30",
                              "title": "여유로운 늦은 아침 & 아파트 체크아웃",
                              "desc": "전날 오로라 투어의 피로를 풀고 느긋하게 기상. 짐을 정리하고 11:30 체크아웃.",
                              "icon": "☕",
                              "tag": "체크아웃",
                              "seniorNote": "캐리어 정리 시 파리에서 입을 봄/가을 겉옷을 위쪽으로 배치"
                        },
                        {
                              "time": "12:00~13:15",
                              "title": "점심: 로바니에미 로컬 브런치 & 카페",
                              "desc": "숙소 근처 아늑한 카페에서 따뜻한 샌드위치와 커피를 마신 후 공항 차량 대기.",
                              "icon": "🥪",
                              "tag": "식사",
                              "seniorNote": "공항 출발 전 따뜻한 화장실 이용"
                        },
                        {
                              "time": "13:30",
                              "title": "[포함] 전용차량 샌딩 숙소 픽업 → 로바니에미 공항",
                              "desc": "13:30 예약된 전용 밴 도착. 15분 만에 공항 도착하여 에어프랑스 수속.",
                              "icon": "🚐",
                              "tag": "공항이동",
                              "seniorNote": "기사님이 무거운 캐리어 상하차 대행"
                        },
                        {
                              "time": "15:25~18:15",
                              "title": "에어프랑스 AF 1525 로바니에미 → 파리 CDG",
                              "desc": "비행시간 3시간 50분. 핀란드 설원에서 빛의 예술 도시 프랑스 파리 샤를드골 공항 제2터미널(T2F) 도착.",
                              "icon": "✈️",
                              "tag": "항공",
                              "seniorNote": "기내 음료 및 스낵 서비스 제공"
                        },
                        {
                              "time": "19:15",
                              "title": "[포함] 파리 CDG 공항 전용차량 픽업 → 호텔 이동",
                              "desc": "입국장 출구에서 네임보드를 든 전용차량 기사 미팅. 편안한 밴을 타고 파리 16구 Elysees Union Hotel로 직행 (차량 약 45분).",
                              "icon": "🚐",
                              "tag": "픽업",
                              "image": "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1200&auto=format&fit=crop",
                              "imageCaption": "파리 16구 Elysees Union Hotel의 클래식하고 우아한 객실",
                              "imageSource": "https://unsplash.com/photos/white-bed-linen-on-bed-M7EwCGn2怖",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Elysees+Union+Hotel+Paris",
                              "rating": "⭐ 4.1 (구글 리뷰 1,150+)",
                              "seniorNote": "파리 16구는 대사관 밀집 지역으로 치안이 가장 안전하고 밤에도 조용함"
                        },
                        {
                              "time": "20:30~21:45",
                              "title": "첫 파리 저녁: Le Petit Rétro (1904년 전통 16구 비스트로)",
                              "desc": "호텔 인근. 미슐랭 가이드에 등재된 120년 전통의 아르누보 비스트로. 부드러운 송아지 고기 블랑케트와 따뜻한 수프로 파리의 첫 만찬.",
                              "icon": "🍽️",
                              "tag": "식사",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Le+Petit+Retro+Paris",
                              "rating": "⭐ 4.6 (구글 리뷰 700+)",
                              "signatureMenu": "천천히 조리한 송아지 고기 스튜(Blanquette de veau), 부드러운 매시드 포테이토, 쇼콜라 프로피테롤",
                              "seniorNote": "호텔과 가까워 식사 후 바로 휴식 가능, 클래식하고 품격 있는 분위기"
                        }
                  ]
            },
            {
                  "day": 4,
                  "date": "2월 9일(화)",
                  "title": "파리의 상징 · 에펠탑 마르스 광장 & 생제르맹 & 센강 바토무슈 야경",
                  "badge": "에펠탑 & 센강",
                  "summary": "숙소에서 가까운 트로카데로 광장에서 에펠탑 인생 사진을 남기고, 현지인 단골 비스트로에서 오리 콩피 점심 후 생제르맹 카페 거리와 저녁 센강 유람선 야경을 감상합니다.",
                  "seniorTip": "💡 센강 유람선(바토무슈/바토 파리지앵)은 야외 데크 외에도 유리 통창의 따뜻한 실내 좌석이 완비되어 있어 어머니가 춥지 않게 파리의 야경을 감상하실 수 있습니다.",
                  "dayMapUrl": "https://www.google.com/maps/search/?api=1&query=Eiffel+Tower+Paris",
                  "activities": [
                        {
                              "time": "09:30~10:15",
                              "title": "트로카데로 광장(샤이오 궁) 에펠탑 포토존",
                              "desc": "호텔에서 도보 8분(완벽한 평지). 샤이오 궁 테라스에서 에펠탑 전체가 정면으로 내려다보이는 파리 최고의 가족 사진 명소.",
                              "icon": "📸",
                              "tag": "관광",
                              "image": "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1200&auto=format&fit=crop",
                              "imageCaption": "트로카데로 광장에서 바라본 웅장한 파리 에펠탑",
                              "imageSource": "https://unsplash.com/photos/low-angle-photography-of-eiffel-tower-ePpaQC2c10Q",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Trocad%C3%A9ro+Paris",
                              "rating": "⭐ 4.7 (구글 리뷰 110,000+)",
                              "seniorNote": "숙소에서 평지 도보 8분, 아침 채광이 좋아 사진이 가장 예쁘게 나옴"
                        },
                        {
                              "time": "10:30~12:00",
                              "title": "이에나 다리 건너 에펠탑 마르스 광장 산책",
                              "desc": "센강을 건너 에펠탑 바로 아래를 지나 푸른 잔디밭 마르스 광장(Champ de Mars) 벤치에서 에펠탑을 올려다보며 여유로운 산책.",
                              "icon": "🗼",
                              "tag": "산책",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Champ+de+Mars+Paris",
                              "seniorNote": "에펠탑 정상 계단 등반 대신 지상 잔디밭 산책과 벤치 휴식 중심"
                        },
                        {
                              "time": "12:30~14:00",
                              "title": "점심: Bistrot des Fables (구 Cafe Constant)",
                              "desc": "에펠탑 도보 7분, 세인트 도미니크 거리의 명소. 미슐랭 셰프 크리스티앙 콩스탕의 정통 파리지앵 비스트로. 진한 양파 그라탕 스프와 부드러운 오리 다리 콩피.",
                              "icon": "🍽️",
                              "tag": "식사",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Bistrot+des+Fables+Paris",
                              "rating": "⭐ 4.5 (구글 리뷰 2,850+)",
                              "signatureMenu": "프랑스 정통 양파 그라탕 수프(Soupe à l'oignon), 겉바속촉 오리 콩피(Confit de Canard), 바닐라 밀푀유",
                              "seniorNote": "양파 스프가 따끈하고 깊은 감칠맛을 내어 어르신 피로를 확 풀어줌"
                        },
                        {
                              "time": "14:30~16:30",
                              "title": "우버 이동 → 생제르맹 데 프레(Saint-Germain) 카페 휴식",
                              "desc": "식당 앞에서 우버 호출하여 센강 좌안 생제르맹 이동. 1천년 역사의 생제르맹 데 프레 성당 내부 관람 및 전설적인 카페 레 뒤 마고(Les Deux Magots) 테라스 티타임.",
                              "icon": "☕",
                              "tag": "카페",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Les+Deux+Magots+Paris",
                              "rating": "⭐ 4.3 (구글 리뷰 13,000+)",
                              "signatureMenu": "에스프레소, 전통 핫초콜릿, 딸기 타르트, 마카롱",
                              "seniorNote": "택시/우버 탑승으로 어머니 걷기 거리 대폭 단축 (약 10분 소요)"
                        },
                        {
                              "time": "17:30~19:00",
                              "title": "센강 바토 파리지앵 유람선 탑승 (석양 & 일루미네이션)",
                              "desc": "에펠탑 선착장에서 탑승하는 센강 유람선. 루브르, 오르세, 시테섬 노트르담 대성당의 황금빛 조명을 물 위에서 앉아서 편안하게 70분간 감상.",
                              "icon": "🚢",
                              "tag": "크루즈",
                              "image": "https://images.unsplash.com/photo-1524396309943-e03f5249f002?q=80&w=1200&auto=format&fit=crop",
                              "imageCaption": "센강을 따라 유람선에서 바라본 파리의 낭만적인 다리와 야경",
                              "imageSource": "https://unsplash.com/photos/seine-river-paris-france-5OUMs2OyvGQ",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Bateaux+Parisiens+Eiffel+Tower",
                              "rating": "⭐ 4.6 (구글 리뷰 35,000+)",
                              "seniorNote": "온열 난방이 되는 1층 실내 좌석에 착석하여 춥지 않게 관람"
                        },
                        {
                              "time": "19:30~21:00",
                              "title": "저녁: Les Cocottes Tour Eiffel (주물냄비 프렌치)",
                              "desc": "스타 셰프의 감각적인 스타우브 주물 냄비 스튜 요리 전문점. 부드럽고 따뜻한 냄비 요리로 든든한 저녁.",
                              "icon": "🍽️",
                              "tag": "식사",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Les+Cocottes+Tour+Eiffel+Paris",
                              "rating": "⭐ 4.4 (구글 리뷰 2,100+)",
                              "signatureMenu": "트러플 감자 라비올리, 뵈프 부르기뇽 주물냄비 스튜, 초콜릿 무스",
                              "seniorNote": "선착장에서 도보 6분, 호텔까지 우버로 5분 거리"
                        }
                  ]
            },
            {
                  "day": 5,
                  "date": "2월 10일(수)",
                  "title": "루브르 박물관 핵심 하이라이트 & 안젤리나 티타임 & 튈르리 정원",
                  "badge": "루브르 & 예술",
                  "summary": "우버로 루브르 박물관에 도착하여 엘리베이터 동선 중심 2시간 핵심 명작 투어(모나리자, 비너스, 니케)를 진행하고, 1903년 왕실 살롱 드 떼 안젤리나에서 몽블랑 디저트를 즐깁니다.",
                  "seniorTip": "💡 루브르 박물관은 세계에서 가장 크기 때문에 전체를 다 걸으면 10km가 넘습니다. 어머니 체력을 위해 엘리베이터가 있는 드농(Denon)관 중심 3대 걸작 위주로 2시간 이내로 한정합니다.",
                  "dayMapUrl": "https://www.google.com/maps/search/?api=1&query=Louvre+Museum+Paris",
                  "activities": [
                        {
                              "time": "09:30~10:00",
                              "title": "우버로 루브르 박물관 피라미드 이동",
                              "desc": "호텔 앞에서 우버 호출하여 루브르 지하 카루젤 뒤 루브르(Carrousel du Louvre) 입구 바로 앞 하차. 비바람이나 계단 없이 엘리베이터로 박물관 진입.",
                              "icon": "🚕",
                              "tag": "이동",
                              "seniorNote": "카루젤 입구는 지상 피라미드보다 대기 줄이 훨씬 짧고 실내라 따뜻함"
                        },
                        {
                              "time": "10:00~12:15",
                              "title": "루브르 박물관 핵심 3대 걸작 투어",
                              "desc": "사전 시간예약 패스트트랙 입장. 레오나르도 다빈치의 '모나리자', '밀로의 비너스', '사모트라케의 니케', '나폴레옹 대관식' 등 인류 최고의 명작 감상.",
                              "icon": "🎨",
                              "tag": "박물관",
                              "image": "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1200&auto=format&fit=crop",
                              "imageCaption": "루브르 박물관의 상징 유리 피라미드와 고전 회랑",
                              "imageSource": "https://unsplash.com/photos/louvre-museum-paris-france-8oxvhs6FfBM",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Louvre+Museum+Paris",
                              "rating": "⭐ 4.7 (구글 리뷰 280,000+)",
                              "seniorNote": "드농관 1층에 엘리베이터와 휠체어 리프트 완비, 복도 곳곳 푹신한 소파 휴식"
                        },
                        {
                              "time": "12:30~13:45",
                              "title": "점심: Le Café Marly (루브르 유리 피라미드 전망)",
                              "desc": "루브르 리슐리외관 아케이드 테라스에 위치. 통유리 피라미드를 정면으로 바라보며 즐기는 우아한 프렌치 런치.",
                              "icon": "🍽️",
                              "tag": "식사",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Le+Cafe+Marly+Paris",
                              "rating": "⭐ 4.2 (구글 리뷰 3,600+)",
                              "signatureMenu": "클럽 샌드위치, 트러플 파스타, 연어 필레 구이, 프렌치 와인",
                              "seniorNote": "루브르 출구에서 바로 연결되어 걷지 않고 바로 착석"
                        },
                        {
                              "time": "14:00~15:30",
                              "title": "티타임: Angelina Paris (리볼리 본점 1903년 살롱)",
                              "desc": "튈르리 정원 맞은편. 코코 샤넬과 오드리 헵번이 사랑한 명품 살롱 드 떼. 시그니처 몽블랑(밤 크림 케이크)과 진하고 달콤한 쇼콜라 쇼(L'Africain).",
                              "icon": "☕",
                              "tag": "디저트",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Angelina+Paris+Rivoli",
                              "rating": "⭐ 4.4 (구글 리뷰 14,500+)",
                              "signatureMenu": "전설적인 몽블랑(Mont-Blanc), 쇼콜라 쇼(Chocolat Chaud l'Africain), 에스프레소",
                              "seniorNote": "화려한 황금빛 거울과 샹들리에 인테리어로 어머니 사진 명소"
                        },
                        {
                              "time": "16:00~18:00",
                              "title": "방돔 광장 산책 후 숙소 복귀 & 오후 휴식",
                              "desc": "방돔 광장(Place Vendôme)의 고즈넉한 광장 풍경을 둘러본 후 우버로 16구 숙소 복귀. 저녁 전까지 여유롭게 휴식.",
                              "icon": "🏨",
                              "tag": "휴식",
                              "seniorNote": "무리한 쇼핑 대신 호텔에서 다리 찜질과 휴식"
                        },
                        {
                              "time": "18:30~20:00",
                              "title": "저녁: Chez Gladines Saint-Germain 또는 16구 로컬 만찬",
                              "desc": "숙소 인근의 아늑한 비스트로에서 신선한 샐러드와 그릴 스테이크로 편안한 저녁.",
                              "icon": "🍽️",
                              "tag": "식사",
                              "seniorNote": "소화가 잘 되는 담백한 조리법 요청 가능"
                        }
                  ]
            },
            {
                  "day": 6,
                  "date": "2월 11일(목)",
                  "title": "오르세 미술관(인상파 명작) & 몽마르트르 언덕(케이블카) & 파리 마지막 밤",
                  "badge": "오르세 & 몽마르트르",
                  "summary": "옛 기차역을 개조해 동선이 평탄한 오르세 미술관에서 고흐와 모네의 그림을 감상하고, 몽마르트르 언덕은 푸니쿨라(케이블카)로 편안히 올라간 뒤 파리 정통 브라세리에서 송별 만찬을 가집니다.",
                  "seniorTip": "💡 몽마르트르 언덕은 계단이 222개나 되지만, 지하철 티켓으로 탑승 가능한 '푸니쿨라(Funiculaire de Montmartre)' 케이블카를 타면 1분 만에 정상 사크레쾨르 성당 앞에 도착합니다.",
                  "dayMapUrl": "https://www.google.com/maps/search/?api=1&query=Orsay+Museum+Paris",
                  "activities": [
                        {
                              "time": "09:30~10:00",
                              "title": "우버로 오르세 미술관(Musée d'Orsay) 이동",
                              "desc": "호텔에서 센강변을 따라 우버로 12분 이동. 오르세 정문 시간예약 전용 출입구로 신속 입장.",
                              "icon": "🚕",
                              "tag": "이동",
                              "seniorNote": "계단 환승 없이 문 앞 직행"
                        },
                        {
                              "time": "10:00~12:15",
                              "title": "오르세 미술관 인상파 명작 관람",
                              "desc": "빈센트 반 고흐의 '자화상'과 '아를의 별이 빛나는 밤', 클로드 모네의 '수련'과 '양산을 든 여인', 르누아르의 '물랭 드 라 갈레트의 무도회'. 5층 대형 시계창 포토존.",
                              "icon": "🖼️",
                              "tag": "미술관",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Orsay+Museum+Paris",
                              "rating": "⭐ 4.7 (구글 리뷰 115,000+)",
                              "seniorNote": "기차역 개조 건물이라 층고가 높고 바닥이 완만하며 엘리베이터가 곳곳에 잘 되어 있어 루브르보다 관람이 훨씬 쾌적함"
                        },
                        {
                              "time": "12:30~13:45",
                              "title": "점심: Restaurant du Musée d'Orsay",
                              "desc": "오르세 미술관 2층. 1900년 옛 오르세 호텔 연회장 그대로 보존된 화려한 금빛 천장과 샹들리에 아래서 즐기는 품격 있는 프렌치 런치.",
                              "icon": "🍽️",
                              "tag": "식사",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Restaurant+du+Mus%C3%A9e+d%27Orsay",
                              "rating": "⭐ 4.3 (구글 리뷰 1,400+)",
                              "signatureMenu": "오늘의 생선 요리(Poisson du jour), 오리 콩피, 제철 타르트 세트",
                              "seniorNote": "미술관 내부에서 이동 없이 바로 식사할 수 있어 어르신 동선 절약 극대화"
                        },
                        {
                              "time": "14:15~16:30",
                              "title": "택시 이동 → 몽마르트르 푸니쿨라 & 사크레쾨르 대성당",
                              "desc": "택시로 몽마르트르 언덕 하부 이동 후 푸니쿨라 케이블카 탑승(계단 제로!). 정상에서 파리 전경을 한눈에 내려다보고, 테르트르 광장(Place du Tertre)에서 거리 화가들의 그림 감상.",
                              "icon": "⛪",
                              "tag": "관광",
                              "image": "https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?q=80&w=1200&auto=format&fit=crop",
                              "imageCaption": "몽마르트르 언덕 정상의 백색 사크레쾨르 대성당과 파리 시내 전경",
                              "imageSource": "https://unsplash.com/photos/sacre-coeur-paris-france-x845fHn6w1g",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Basilique+du+Sacr%C3%A9-C%C5%93ur+de+Montmartre",
                              "rating": "⭐ 4.7 (구글 리뷰 140,000+)",
                              "seniorNote": "푸니쿨라 탑승으로 무릎 관절 보호. 팔찌 강매 상인 주의하며 가족 함께 이동"
                        },
                        {
                              "time": "17:30~19:00",
                              "title": "샹젤리제 거리 & 개선문 (라파예트 샹젤리제점)",
                              "desc": "우버로 샹젤리제 이동. 웅장한 에투알 개선문(Arc de Triomphe)을 바라보고, 명품 갤러리아 라파예트 백화점에서 선물용 마카롱·초콜릿 쇼핑.",
                              "icon": "🛍️",
                              "tag": "쇼핑",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Arc+de+Triomphe+Paris",
                              "seniorNote": "개선문 전망대 나선형 계단 등반은 생략하고 지상에서 외관 감상"
                        },
                        {
                              "time": "19:30~21:30",
                              "title": "파리 마지막 만찬: Brasserie Bellanger",
                              "desc": "파리지앵들이 극찬하는 정통 프렌치 브라세리. 두툼하고 부드러운 뵈프 부르기뇽(와인 소고기 찜)과 신선한 해산물 플래터로 낭만적인 파리의 마지막 밤 기념.",
                              "icon": "🍷",
                              "tag": "만찬",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Brasserie+Bellanger+Paris",
                              "rating": "⭐ 4.6 (구글 리뷰 4,200+)",
                              "signatureMenu": "정통 뵈프 부르기뇽(Bœuf Bourguignon), 부르고뉴 에스카르고(Escargots), 수제 밀푀유",
                              "seniorNote": "소고기가 장시간 와인에 조려져 잇몸으로도 씹힐 만큼 극도로 부드러움"
                        }
                  ]
            },
            {
                  "day": 7,
                  "date": "2월 12일(금)",
                  "title": "파리 출발 → 헬싱키 환승 → 핀에어 AY 41 귀국편 탑승",
                  "badge": "실속 환승 귀국",
                  "summary": "아침 07:30 전용차량 샌딩으로 CDG 공항으로 이동하여 10:35 핀에어에 탑승, 헬싱키 공항(3시간 환승 대기)에서 북유럽 디자인 쇼핑 및 휴식 후 17:35 인천행 핀에어에 탑승합니다.",
                  "seniorTip": "💡 헬싱키 공항은 세계에서 가장 환승이 쾌적하고 조용한 공항 중 하나입니다. 공항 내 마리메꼬, 이탈라, 무민 샵에서 북유럽 기념품을 구경하시고 사우나 라운지에서 편안히 쉬실 수 있습니다.",
                  "dayMapUrl": "https://www.google.com/maps/search/?api=1&query=Helsinki+Airport",
                  "activities": [
                        {
                              "time": "06:30~07:15",
                              "title": "이른 체크아웃 & 조식 박스 수령",
                              "desc": "호텔 프런트에서 체크아웃 후 요청해 둔 조식 도시락 또는 로비 커피를 마시며 출발 준비.",
                              "icon": "🧳",
                              "tag": "체크아웃",
                              "seniorNote": "이른 아침이므로 어머니 체온 유지를 위해 외투 착용"
                        },
                        {
                              "time": "07:30",
                              "title": "[포함] 전용차량 샌딩 호텔 픽업 → CDG 공항 T2D",
                              "desc": "예약된 단독 전용 밴으로 파리 샤를드골 공항 제2터미널(T2D) 이동 (약 45분).",
                              "icon": "🚐",
                              "tag": "공항이동",
                              "seniorNote": "출근길 교통 체증을 피해 3시간 전 여유롭게 공항 도착"
                        },
                        {
                              "time": "10:35~14:30",
                              "title": "핀에어 AY 1572 파리 CDG → 헬싱키",
                              "desc": "비행시간 2시간 55분 (Jettime 운항). 헬싱키 반타 공항(HEL)에 오후 14:30 도착.",
                              "icon": "✈️",
                              "tag": "항공",
                              "seniorNote": "기내에서 가벼운 음료와 함께 휴식"
                        },
                        {
                              "time": "14:30~17:35",
                              "title": "헬싱키 공항 환승 대기 (3시간 5분) & 북유럽 쇼핑",
                              "desc": "헬싱키 공항 터미널은 깔끔한 북유럽 목조 인테리어로 유명합니다. 마리메꼬(Marimekko), 이탈라(Iittala), 무민 샵에서 선물 쇼핑 및 조용한 카페 라운지 휴식.",
                              "icon": "🛍️",
                              "tag": "환승휴식",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Helsinki+Airport+Duty+Free",
                              "rating": "⭐ 4.4 (구글 리뷰 22,000+)",
                              "seniorNote": "환승 게이트 이동 거리가 짧고 무빙워크 완비"
                        },
                        {
                              "time": "17:35",
                              "title": "핀에어 AY 41 헬싱키 → 인천 출발",
                              "desc": "비행시간 12시간 50분. 핀에어 최신 A350 기종 탑승. 기내식 식사 후 숙면.",
                              "icon": "✈️",
                              "tag": "귀국",
                              "seniorNote": "아시아나 직항 대비 4인 총 355만원 절약된 실속형 귀국 여정"
                        }
                  ]
            },
            {
                  "day": 8,
                  "date": "2월 13일(토)",
                  "title": "인천국제공항 제1터미널 도착 · 가족 여행 귀가",
                  "badge": "낮 도착 귀가",
                  "summary": "낮 12:25 인천공항에 도착하여 수하물을 찾고 귀가합니다. (아시아나보다 약 2시간 15분 일찍 한국 도착)",
                  "seniorTip": "💡 토요일 정오 도착이므로 귀가 후 짐을 정리하고 가족들과 편안하게 한국 음식을 드실 수 있는 시간 여유가 풍부합니다.",
                  "activities": [
                        {
                              "time": "12:25 (한국)",
                              "title": "인천국제공항 도착 & 입국 심사",
                              "desc": "자동출입국심사 및 수하물 수령 후 세관 통과. 가족과 함께 안전하게 귀가.",
                              "icon": "🏠",
                              "tag": "도착",
                              "seniorNote": "낮 도착으로 귀가 교통편 편리"
                        }
                  ]
            }
      ],
      "seniorGuideTips": [
            {
                  "title": "💰 4인 총 355만원 절약의 실속 가성비",
                  "desc": "아시아나 직항 귀국 대신 핀에어로 왕복 귀국할 경우 4인 기준 총 3,554,800원의 큰 비용이 절약됩니다. 절약된 예산으로 현지에서 최고급 미식과 전용차량 우버를 더욱 여유롭게 이용하실 수 있습니다."
            },
            {
                  "title": "☕ 쾌적하고 조용한 헬싱키 공항 환승 팁",
                  "desc": "헬싱키 반타 공항은 규모가 아담하고 북유럽 특유의 나무 인테리어로 세계에서 가장 걷기 편한 공항으로 꼽힙니다. 환승 대기 3시간 5분 동안 마리메꼬와 이탈라 쇼핑을 즐기시거나 조용한 카페에서 어머니와 따뜻한 차를 마시며 여유를 누리실 수 있습니다."
            },
            {
                  "title": "⏰ 마지막 날 아침 7시 기상 안내",
                  "desc": "파리에서 오전 10:35 출발 비행기이므로 아침 07:30에 전용차량으로 호텔을 출발해야 합니다. 전날 밤 짐을 미리 완벽히 싸두고, 호텔에 미리 조식 박스(Breakfast Box)를 요청해 차 안이나 공항에서 드시도록 준비해 드립니다."
            },
            {
                  "title": "🚐 전용차량 4회 포함으로 캐리어 이동 제로",
                  "desc": "로바니에미 인/아웃, 파리 인/아웃 총 4회 단독 전용 밴 차량이 포함되어 있어 짐을 들고 계단을 오르내릴 필요가 전혀 없습니다."
            },
            {
                  "title": "❄️ 북극 방한과 파리 16구 안심 입지",
                  "desc": "로바니에미의 혹한 방한 슈트는 오로라 투어사에서 무료 제공되며, 파리 호텔(Elysees Union)은 치안 1등급 16구 부촌에 위치하여 언제든 안심하고 머무실 수 있습니다."
            },
            {
                  "title": "🍲 Forenom 아파트 주방과 사우나 힐링",
                  "desc": "로바니에미 숙소에 마련된 주방과 프라이빗 사우나를 활용해 여행 첫날과 둘째 날 어르신의 시차 적응과 온수 섭취, 피로 회복을 완벽히 도울 수 있습니다."
            }
      ]
},
    spain_portugal: {
      "id": "spain_portugal",
      "name": "스페인·포르투갈 (대한항공)",
      "country": "스페인 🇪🇸 & 포르투갈 🇵🇹",
      "title": "태양과 예술의 이베리아 · 스페인&포르투갈 6박 8일",
      "subtitle": "마드리드 왕궁 · 바르셀로나 가우디 투어 · 리스본 에그타르트 & 해물밥 · 대한항공 In/Out 직항 & 60대 어머니 맞춤 동선",
      "heroImage": "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=1200&auto=format&fit=crop",
      "heroImageCaption": "바르셀로나 사그라다 파밀리아 대성당(Sagrada Família)의 웅장한 전경",
      "heroImageSource": "https://unsplash.com/photos/sagrada-familia-barcelona-spain-O453M2Liufs",
      "status": "active",
      "dates": {
            "departure": "2027.02.06 (토)",
            "return": "2027.02.13 (토)",
            "duration": "6박 8일 · 현지 6박 + 기내 1박"
      },
      "travelers": {
            "total": 4,
            "composition": "30대 부부 2명 + 30대 딸 1명 + 60대 어머니 1명 (총 성인 4인)",
            "style": "대한항공 In/Out 직항 · 카탈루냐 광장 1분 호텔 · 가우디 투어 포함 · 리스본 평지 호텔 & 해물밥 미식"
      },
      "estimateInfo": {
            "pdfFile": "0205 강영길님 가족 유럽 여행 - 스페인&포르투갈 - 대한항공.pdf",
            "agency": "웹투어㈜ (Webtour)",
            "issuedDate": "2026.10.02",
            "packagePriceTotal": 16914000,
            "packagePricePerPerson": 4228500,
            "account": "KEB하나은행 145-890020-67004 웹투어㈜",
            "deposit": "계약금 1인 300,000원 (4인 총 1,200,000원) · 10/6(화)까지 입금",
            "airDeposit": "항공 중도금 1인 2,000,000원 (4인 총 8,000,000원) · 10/6(화) 16:00 발권",
            "balanceDeadline": "출발 3주 전 1월 15일(금)까지 잔금 결제",
            "highlight": "국적기 대한항공 직항(인천→마드리드 KE913 / 리스본→인천 KE922)으로 환승 스트레스가 전혀 없으며, 바르셀로나 카탈루냐 광장 1분 4성급 호텔과 가우디 투어가 포함된 최고 인기 코스입니다.",
            "included": [
                  "국제선 왕복 항공권 (인천→마드리드 KE913 직항 / 리스본→인천 KE922 직항)",
                  "유류할증료 & 제세공과금 포함 (1인 728,500원 확정)",
                  "마드리드-바르셀로나 고속열차(AVE) 2등석 티켓 포함",
                  "바르셀로나-리스본 구간 항공권 (탑포르투갈항공 TP1031 포함)",
                  "마드리드 3성(2박) + 바르셀로나 4성 카탈루냐광장 앞(2박) + 리스본 4성(2박) 조식 포함 2실",
                  "바르셀로나 핵심 가우디 투어 (전용 밴 차량 & 전문 한국어 가이드)",
                  "마드리드 공항 픽업 전용차량 + 리스본 공항 샌딩 전용차량",
                  "해외 여행자 보험 (1억원 보장)"
            ],
            "excluded": [
                  "현지 자유식비 (하몽, 꿀대구, 빠에야, 해물밥, 에그타르트 등 자율 식사)",
                  "시내 우버/택시비 및 대중교통비",
                  "프라도 미술관, 사그라다 파밀리아 성당 등 내부 입장료",
                  "호텔 시티택스 (현지 체크아웃 시 직불)",
                  "개인 쇼핑 경비 및 물값"
            ]
      },
      "flight": {
            "airline": "대한항공 & 탑포르투갈항공 (Korean Air & TAP)",
            "airlineCode": "KE/TP",
            "type": "다구간 직항 (마드리드 In / 리스본 Out)",
            "outbound": {
                  "flightNo": "KE913",
                  "depTime": "12:10 (2/6 토)",
                  "depAirport": "인천 (ICN T2)",
                  "arrTime": "19:25 (2/6 토)",
                  "arrAirport": "마드리드 (MAD T4S)",
                  "duration": "15시간 15분 (직항)",
                  "note": "2/6(토) 낮 12:10 출발 대한항공 직항. 당일 저녁 19:25 마드리드 도착하여 전용차량으로 호텔 이동."
            },
            "inbound": {
                  "flightNo": "KE922",
                  "depTime": "21:45 (2/12 금)",
                  "depAirport": "리스본 (LIS T1)",
                  "arrTime": "20:00 (2/13 토)",
                  "arrAirport": "인천 (ICN T2)",
                  "duration": "13시간 15분 (직항)",
                  "note": "리스본에서 밤 21:45 출발하는 대한항공 직항. 기내 숙면 후 2/13(토) 저녁 20:00 인천 도착."
            },
            "segments": [
                  {
                        "type": "outbound",
                        "label": "🛫 [1구간 직항] 인천 → 마드리드 (KE 913)",
                        "depDate": "2027.02.06 (토)",
                        "depTime": "12:10",
                        "depAirport": "인천 (ICN T2)",
                        "arrTime": "19:25",
                        "arrAirport": "마드리드 바라하스 (MAD T4S)",
                        "duration": "15시간 15분 (직항)",
                        "airline": "대한항공 (Korean Air B787)",
                        "note": "대한항공 직항 탑승. 한국인 승무원 서비스 및 한식 기내식. 도착 후 [포함] 전용차량 픽업 제공"
                  },
                  {
                        "type": "train",
                        "label": "🚄 [2구간 고속열차] 마드리드 → 바르셀로나",
                        "depDate": "2027.02.07 (일)",
                        "depTime": "15:00",
                        "depAirport": "마드리드 아토차 (Atocha)",
                        "arrTime": "18:15",
                        "arrAirport": "바르셀로나 산츠 (Sants)",
                        "duration": "약 3시간 15분",
                        "airline": "Renfe AVE / iryo (2등석 포함)",
                        "note": "웹투어 고속열차 티켓 포함. 넓고 안락한 좌석에서 스페인 대지 풍경을 감상하며 편안한 이동"
                  },
                  {
                        "type": "intercity",
                        "label": "✈️ [3구간 이동] 바르셀로나 → 리스본 (TP 1031)",
                        "depDate": "2027.02.10 (수)",
                        "depTime": "10:55",
                        "depAirport": "바르셀로나 엘프랏 (BCN T1)",
                        "arrTime": "11:55",
                        "arrAirport": "리스본 움베르투 델가도 (LIS T1)",
                        "duration": "2시간 00분 (시차 1시간으로 11:55 도착)",
                        "airline": "탑포르투갈항공 (TAP Air Portugal)",
                        "note": "웹투어 항공권 포함. 스페인-포르투갈 1시간 시차 덕분에 점심시간 전에 리스본 도착!"
                  },
                  {
                        "type": "inbound",
                        "label": "🛬 [4구간 직항] 리스본 → 인천 (KE 922)",
                        "depDate": "2027.02.12 (금)",
                        "depTime": "21:45",
                        "depAirport": "리스본 (LIS T1)",
                        "arrTime": "20:00 (+1일)",
                        "arrAirport": "인천 (ICN T2)",
                        "duration": "13시간 15분 (직항)",
                        "airline": "대한항공 (Korean Air 직항)",
                        "note": "[포함] 리스본 호텔→공항 전용차량 샌딩 제공. 밤 출발 직항으로 기내 숙면 후 토요일 저녁 귀국"
                  }
            ],
            "pricing": {
                  "perPerson": 4228500,
                  "total": 16914000,
                  "priceLabel": "성인 1인 / 대한항공 직항+호텔 6박+가우디투어+고속열차 포함",
                  "discountNote": "성인 상품가 3,500,000원 + 유류할증료·제세공과금 728,500원 (웹투어 견적서 확정 금액)"
            }
      },
      "budget": {
            "total": 19614000,
            "perPerson": 4903500,
            "currency": "원 (KRW)",
            "note": "웹투어 정식 견적 16,914,000원(대한항공 왕복 직항+유럽 3~4성급 호텔 조식포함 6박+마드리드-바르셀로나 고속열차+바르셀로나-리스본 항공+가우디투어+공항 전용차량 2회+보험)에 현지 식비(하몽, 꿀대구, 빠에야, 해물밥, 에그타르트), 택시비, 입장료, 시티택스 약 270만원을 합산한 4인 현실 총 예산입니다.",
            "categories": [
                  {
                        "id": "package",
                        "name": "웹투어 확정 견적 (대한항공+호텔+투어)",
                        "icon": "✈️",
                        "amount": 16914000,
                        "perPerson": 4228500,
                        "percentage": 86.2,
                        "desc": "대한항공 직항 왕복+구간항공(TP)+고속열차 2등석+Porcel Ganivet(1박)+Regina Barcelona(3박)+Mundial(2박)+가우디 투어+전용차량 2회+보험"
                  },
                  {
                        "id": "food",
                        "name": "현지 식비 & 유명 카페 (4인)",
                        "icon": "🍽️",
                        "amount": 1700000,
                        "perPerson": 425000,
                        "percentage": 8.7,
                        "desc": "마드리드 1725년 보틴(새끼돼지 구이), 산히네스 츄러스, 바르셀로나 Ciudad Condal 꿀대구, 7 Portes 정통 빠에야, 리스본 우마 해물밥, 원조 에그타르트 등"
                  },
                  {
                        "id": "transport",
                        "name": "시내 택시/우버 & 28번 트램",
                        "icon": "🚕",
                        "amount": 320000,
                        "perPerson": 80000,
                        "percentage": 1.6,
                        "desc": "리스본 언덕길 및 바르셀로나 몬주익 이동 시 어머니 무릎 보호를 위한 택시/우버 적극 탑승"
                  },
                  {
                        "id": "tours",
                        "name": "입장료 & 전망대 (가우디 외)",
                        "icon": "🏛️",
                        "amount": 420000,
                        "perPerson": 105000,
                        "percentage": 2.1,
                        "desc": "사그라다 파밀리아 및 구엘공원 내부 입장권, 까사바트요, 제로니무스 수도원, 몬주익 케이블카 등"
                  },
                  {
                        "id": "misc",
                        "name": "호텔 시티택스 & 예비비",
                        "icon": "💶",
                        "amount": 260000,
                        "perPerson": 65000,
                        "percentage": 1.3,
                        "desc": "카탈루냐/포르투갈 도시세(1인 1박당 약 5~8유로) 및 현지 통신(eSIM)·비상 예비비"
                  }
            ]
      },
      "itinerary": [
            {
                  "day": 1,
                  "date": "2월 6일(토)",
                  "title": "인천 출발 → 대한항공 직항 → 마드리드 도착 & 전용차량 안착",
                  "badge": "직항 출국",
                  "summary": "낮 12:10 인천공항에서 대한항공 직항을 타고 마드리드에 당일 저녁 19:25 도착합니다. 전용차량으로 호텔에 편안하게 체크인하고 숙소 앞 명소에서 부드러운 타파스를 즐깁니다.",
                  "seniorTip": "💡 대한항공 직항은 한국어 서비스와 따뜻한 한식 기내식이 제공되어 60대 어머니에게 가장 친숙하고 편안합니다. 마드리드 공항 도착 후 전용 밴이 대기하므로 짐 이동 걱정이 없습니다.",
                  "dayMapUrl": "https://www.google.com/maps/search/?api=1&query=Hotel+Porcel+Ganivet+Madrid",
                  "activities": [
                        {
                              "time": "09:30 (토)",
                              "title": "인천공항 제2터미널 집결 & 대한항공 수속",
                              "desc": "출발 2시간 40분 전 제2터미널 모닝캄/일반 카운터에서 수하물 위탁 및 출국 심사. 한식당에서 따뜻한 식사.",
                              "icon": "🧳",
                              "tag": "출국",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Incheon+Airport+Terminal+2",
                              "seniorNote": "T2는 쾌적하고 출국 심사 대기시간이 짧아 어르신 출국에 최적"
                        },
                        {
                              "time": "12:10~19:25",
                              "title": "대한항공 KE 913 인천 → 마드리드 직항",
                              "desc": "비행시간 15시간 15분. 보잉 787 최신 드림라이너 기종 탑승. 기내 엔터테인먼트(한국 영화/드라마)와 편안한 좌석.",
                              "icon": "✈️",
                              "tag": "항공",
                              "seniorNote": "비행 중 복도 가벼운 걷기 및 수분 섭취"
                        },
                        {
                              "time": "20:30",
                              "title": "[포함] 마드리드 공항 전용차량 픽업 → 호텔 이동",
                              "desc": "입국장에서 네임보드 든 전용 밴 기사 미팅. 캐리어를 싣고 마드리드 중심가 Hotel Porcel Ganivet으로 직행 (차량 25분).",
                              "icon": "🚐",
                              "tag": "픽업",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Hotel+Porcel+Ganivet+Madrid",
                              "rating": "⭐ 4.3 (구글 리뷰 2,200+)",
                              "seniorNote": "공항철도 환승 없이 숙소 로비까지 문 앞 이동"
                        },
                        {
                              "time": "21:15~22:15",
                              "title": "야식: Casa Lucio (스페인 국왕의 단골 비스트로)",
                              "desc": "호텔에서 도보 5분 거리의 유명 타파스 거리 카바 바하(Cava Baja) 위치. 갓 튀긴 부드러운 감자 위에 반숙 계란을 얹은 '후에보스 로토스'로 소화가 잘 되는 첫날 밤 야식.",
                              "icon": "🍽️",
                              "tag": "식사",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Casa+Lucio+Madrid",
                              "rating": "⭐ 4.3 (구글 리뷰 7,800+)",
                              "signatureMenu": "오리지널 후에보스 로토스(Huevos Rotos con Patatas), 이베리코 하몽, 버섯 구이",
                              "seniorNote": "기름지지 않고 포슬포슬한 감자와 계란 요리로 어르신 속 편한 메뉴"
                        }
                  ]
            },
            {
                  "day": 2,
                  "date": "2월 7일(일)",
                  "title": "마드리드 핵심 산책 & 세계 최고(最古) 보틴 점심 → 고속열차 타고 바르셀로나로!",
                  "badge": "고속열차 이동",
                  "summary": "마요르 광장과 1894년 산히네스 츄러스를 맛보고, 기네스북 식당 보틴에서 어린돼지 구이를 즐긴 뒤 고속열차(Renfe 3h15m)로 바르셀로나에 도착하여 카탈루냐 광장 1등 타파스 만찬을 가집니다.",
                  "seniorTip": "💡 마드리드에서 바르셀로나까지 고속열차(2등석 포함)는 비행기보다 공항 대기·수하물 번거로움이 없고, 좌석이 넓고 평온해 어머니가 풍경을 보며 쉬시기에 최고입니다.",
                  "dayMapUrl": "https://www.google.com/maps/search/?api=1&query=Plaza+Mayor+Madrid",
                  "activities": [
                        {
                              "time": "08:30~09:30",
                              "title": "호텔 조식 & 체크아웃 후 짐 보관",
                              "desc": "스페인식 뷔페 조식 후 체크아웃. 오후 기차 탑승 전까지 호텔 프런트에 짐 보관.",
                              "icon": "☕",
                              "tag": "체크아웃",
                              "seniorNote": "기차에서 입을 편안한 복장 착용"
                        },
                        {
                              "time": "09:30~10:30",
                              "title": "마요르 광장 & 솔 광장(Puerta del Sol) 산책",
                              "desc": "호텔에서 도보 8분. 붉은 벽돌의 웅장한 마요르 광장과 스페인의 중심 솔 광장의 곰 동상(El Oso y el Madroño) 둘러보기.",
                              "icon": "🏛️",
                              "tag": "산책",
                              "image": "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1200&auto=format&fit=crop",
                              "imageCaption": "마드리드 마요르 광장(Plaza Mayor)의 고풍스러운 회랑과 파란 하늘",
                              "imageSource": "https://unsplash.com/photos/plaza-mayor-madrid-spain-XmYg252K63g",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Plaza+Mayor+Madrid",
                              "rating": "⭐ 4.6 (구글 리뷰 170,000+)",
                              "seniorNote": "완만한 보행자 전용 평지 코스, 소매치기 주의하며 가방 앞으로 메기"
                        },
                        {
                              "time": "10:30~11:30",
                              "title": "티타임: Chocolatería San Ginés (1894년 전통 츄러스)",
                              "desc": "솔 광장 골목에 위치한 130년 전통 츄러스 명가. 갓 튀겨 바삭한 츄러스와 뽀라스(두꺼운 츄러스)를 진한 초콜라테에 찍어 먹는 힐링 티타임.",
                              "icon": "☕",
                              "tag": "디저트",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Chocolater%C3%ADa+San+Gin%C3%A9s+Madrid",
                              "rating": "⭐ 4.4 (구글 리뷰 66,000+)",
                              "signatureMenu": "초콜라테 콘 추로스(Chocolate con 6 Churros), 뽀라스(Porras), 카페 콘 레체",
                              "seniorNote": "지하와 1층에 대리석 테이블이 마련되어 있어 편안히 착석 가능"
                        },
                        {
                              "time": "12:30~13:45",
                              "title": "점심: Restaurante Sobrino de Botín (기네스북 등재 1725년 식당)",
                              "desc": "마요르 광장 옆. 헤밍웨이가 소설에 찬사를 남긴 세계에서 가장 오래된 식당. 300년 된 참나무 화덕에서 구워낸 새끼돼지 통구이 코치니요 아사도.",
                              "icon": "🍽️",
                              "tag": "식사",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Restaurante+Sobrino+de+Bot%C3%ADn+Madrid",
                              "rating": "⭐ 4.4 (구글 리뷰 23,500+)",
                              "signatureMenu": "코치니요 아사도(Cochinillo Asado - 겉바속촉 새끼돼지 구이), 하몽 이베리코, 카스티야식 마늘 수프",
                              "seniorNote": "껍질은 바삭하고 살코기는 숟가락으로 잘릴 만큼 부드러워 어르신 식사로 일품"
                        },
                        {
                              "time": "14:15",
                              "title": "호텔 짐 수령 후 택시로 아토차(Atocha)역 이동",
                              "desc": "택시로 7분 만에 아토차역 도착. 실내 열대식물원을 구경하며 고속열차 플랫폼 이동.",
                              "icon": "🚕",
                              "tag": "이동",
                              "seniorNote": "기차역 검색대 통과(X-ray) 지원"
                        },
                        {
                              "time": "15:00~18:15",
                              "title": "[포함] 고속열차 Renfe AVE 탑승 마드리드 → 바르셀로나",
                              "desc": "3시간 15분 만에 바르셀로나 산츠(Barcelona Sants)역 도착. 창밖의 올리브 나무와 풍경을 보며 편안한 낮잠 휴식.",
                              "icon": "🚄",
                              "tag": "열차",
                              "seniorNote": "기차 내 화장실 완비, 좌석 등받이 조절 및 콘센트 구비"
                        },
                        {
                              "time": "18:45",
                              "title": "택시로 호텔 이동 & Hotel Regina Barcelona 체크인",
                              "desc": "산츠역에서 택시로 10분. 카탈루냐 광장 도보 1분(150m) 거리에 위치한 최고급 4성급 부티크 호텔 체크인!",
                              "icon": "🏨",
                              "tag": "숙소",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Hotel+Regina+Barcelona",
                              "rating": "⭐ 4.5 (구글 리뷰 1,900+)",
                              "seniorNote": "바르셀로나 전 일정 동안 어디든 걷기 쉬운 카탈루냐 광장 특급 입지"
                        },
                        {
                              "time": "19:30~21:00",
                              "title": "저녁: Ciudad Condal (바르셀로나 1등 타파스 바)",
                              "desc": "호텔 도보 3분! 바르셀로나에서 가장 사랑받는 타파스 명가. 달콤하고 부드러운 꿀대구 구이와 싱싱한 맛조개 구이, 소고기 안심 타파스.",
                              "icon": "🍽️",
                              "tag": "식사",
                              "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=1200&auto=format&fit=crop",
                              "imageCaption": "바르셀로나 타파스 바의 신선한 해산물과 꿀대구 요리",
                              "imageSource": "https://unsplash.com/photos/food-on-white-ceramic-plate-178j8tJrNlc",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Ciudad+Condal+Barcelona",
                              "rating": "⭐ 4.5 (구글 리뷰 18,500+)",
                              "signatureMenu": "꿀대구(Bacalao al alioli de miel - 단짠의 극치), 맛조개(Navajas), 소고기 안심 몬타디토(Solomillo con foie)",
                              "seniorNote": "꿀대구는 생선 가시가 없고 달콤 짭짤하여 어머니 만족도 1위 보장 메뉴"
                        }
                  ]
            },
            {
                  "day": 3,
                  "date": "2월 8일(월)",
                  "title": "바르셀로나 고딕 지구 & 보케리아 시장 & 몬주익 언덕 지중해 조망 & 7 Portes 전통 빠에야",
                  "badge": "고딕 & 지중해",
                  "summary": "호텔에서 도보로 고딕 지구의 골목과 보케리아 시장을 구경하고, 택시로 몬주익 언덕에 올라 지중해 바다를 조망한 뒤 1836년 창업한 피카소의 단골 식당 7 Portes에서 껍질 벗긴 해산물 빠에야를 즐깁니다.",
                  "seniorTip": "💡 7 Portes 식당의 '파레야다 빠에야(Paella Parellada)'는 부르주아 신사가 손에 국물을 묻히지 않도록 조개와 새우 껍질을 전부 발라내어 조리한 메뉴로, 어머니가 수저로 편안히 드실 수 있습니다.",
                  "dayMapUrl": "https://www.google.com/maps/search/?api=1&query=Gothic+Quarter+Barcelona",
                  "activities": [
                        {
                              "time": "09:00~10:00",
                              "title": "호텔 조식 & 여유로운 오전",
                              "desc": "Hotel Regina의 신선한 카탈루냐식 조식 뷔페(판콘토마테, 하몽, 과일).",
                              "icon": "☕",
                              "tag": "식사",
                              "seniorNote": "호텔 로비에서 따뜻한 차 한 잔 후 출발"
                        },
                        {
                              "time": "10:15~12:00",
                              "title": "고딕 지구(Barri Gòtic) & 보케리아 시장 산책",
                              "desc": "바르셀로나 대성당 광장, 비스베 거리의 탄식의 다리, 레이알 광장 분수대. 람블라스 거리를 따라 보케리아 시장에서 생과일 주스 시음.",
                              "icon": "🏛️",
                              "tag": "산책",
                              "image": "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?q=80&w=1200&auto=format&fit=crop",
                              "imageCaption": "바르셀로나 고딕 지구 대성당의 고풍스러운 석조 회랑",
                              "imageSource": "https://unsplash.com/photos/brown-concrete-building-during-daytime-O453M2Liufs",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Barcelona+Cathedral",
                              "rating": "⭐ 4.6 (구글 리뷰 62,000+)",
                              "seniorNote": "골목길이 평탄하며 벤치가 많아 쉬어가기 좋음"
                        },
                        {
                              "time": "12:30~13:45",
                              "title": "점심: Bar Cañete (리세우 역 골목 최고급 타파스)",
                              "desc": "신선한 해산물과 이베리코 요리를 선보이는 카탈루냐 정통 타파스 레스토랑. 부드러운 문어 타파스와 바삭한 크로켓.",
                              "icon": "🍽️",
                              "tag": "식사",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Bar+Ca%C3%B1ete+Barcelona",
                              "rating": "⭐ 4.6 (구글 리뷰 5,200+)",
                              "signatureMenu": "갈리시아풍 문어 요리(Pulpo a la gallega), 이베리코 하몽 크로켓, 가지 튀김",
                              "seniorNote": "테이블 좌석 사전 예약으로 대기 없이 식사"
                        },
                        {
                              "time": "14:30~16:30",
                              "title": "택시로 몬주익 언덕(Montjuïc) 전망대 조망",
                              "desc": "택시를 타고 몬주익 성 앞까지 직행. 지중해 푸른 바다와 바르셀로나 항구, 시내 전경을 파노라마로 감상하며 카페 테라스에서 휴식.",
                              "icon": "🌊",
                              "tag": "전망",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Montju%C3%AFc+Castle+Barcelona",
                              "rating": "⭐ 4.5 (구글 리뷰 48,000+)",
                              "seniorNote": "언덕을 오르는 도보 없이 택시로 정상 앞 하차"
                        },
                        {
                              "time": "17:00~18:00",
                              "title": "바르셀로네타 해변 카페 휴식 & 호텔 정비",
                              "desc": "지중해 해변 산책로 벤치에서 바닷바람 쐬고 호텔로 복귀하여 잠시 휴식.",
                              "icon": "🏖️",
                              "tag": "휴식",
                              "seniorNote": "저녁 식사 전 30분 다리 휴식"
                        },
                        {
                              "time": "18:30~20:30",
                              "title": "저녁: 7 Portes (1836년 창업 유서 깊은 해산물 빠에야)",
                              "desc": "피카소, 살바도르 달리, 미로가 단골이었던 190년 역사의 레스토랑. 우아한 화이트 식탁보와 피아노 연주 속에서 정통 해산물 빠에야 만찬.",
                              "icon": "🥘",
                              "tag": "만찬",
                              "image": "https://images.unsplash.com/photo-1515443961218-a51367888e4b?q=80&w=1200&auto=format&fit=crop",
                              "imageCaption": "황금빛 샤프란 쌀과 신선한 해산물이 어우러진 정통 스페인 빠에야",
                              "imageSource": "https://unsplash.com/photos/cooked-food-on-black-skillet-5OUMs2OyvGQ",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=7+Portes+Barcelona",
                              "rating": "⭐ 4.3 (구글 리뷰 15,200+)",
                              "signatureMenu": "파레야다 빠에야(Paella Parellada - 껍질 벗긴 해산물 빠에야), 카탈루냐식 카넬로니, 샹그리아",
                              "seniorNote": "껍질이 없어 어르신이 포크로 바로 드실 수 있으며 격식 있는 분위기 최고"
                        }
                  ]
            },
            {
                  "day": 4,
                  "date": "2월 9일(화)",
                  "title": "[포함 투어] 가우디 핵심 투어 & Vinitus 꿀대구 & 그라시아 명품 거리",
                  "badge": "가우디 투어",
                  "summary": "웹투어 포함 가우디 투어로 까사바트요, 구엘공원, 사그라다 파밀리아 대성당을 전용 차량과 전문 가이드로 알차게 관람하고, 꿀대구 점심 후 오후 호텔 휴식과 그라시아 거리 산책을 즐깁니다.",
                  "seniorTip": "💡 가우디 투어는 07:45 호텔 바로 앞 카탈루냐 광장에서 집결합니다. 사그라다 파밀리아 대성당 내부는 평지이며 엘리베이터가 구비되어 있어 어머니 관람이 매우 수월합니다.",
                  "dayMapUrl": "https://www.google.com/maps/search/?api=1&query=Sagrada+Familia+Barcelona",
                  "activities": [
                        {
                              "time": "07:15~07:40",
                              "title": "호텔 조식 & 가우디 투어 집결",
                              "desc": "호텔 1층에서 든든하게 아침 식사 후 도보 1분 카탈루냐 광장 투어 차량 집결지로 이동.",
                              "icon": "🥐",
                              "tag": "준비",
                              "seniorNote": "호텔에서 100m 거리라 아침 이동 부담 제로"
                        },
                        {
                              "time": "07:45~13:20",
                              "title": "[포함 투어] 바르셀로나 가우디 핵심 투어",
                              "desc": "웹투어 포함 공식 투어. 까사 바트요(Casa Batlló) & 까사 밀라(Casa Milà) 외관 감상 → 구엘 공원(Park Güell) 입장 및 헨젤과 그레텔 동화마을 모자이크 정원 산책 → 사그라다 파밀리아 대성당(Sagrada Família) 외관 및 성당 내부 감상 (가우디 건축의 정점, 숲속을 거니는 듯한 빛의 스테인드글라스).",
                              "icon": "⛪",
                              "tag": "투어",
                              "image": "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=1200&auto=format&fit=crop",
                              "imageCaption": "사그라다 파밀리아 성당 내부의 환상적인 스테인드글라스 빛",
                              "imageSource": "https://unsplash.com/photos/sagrada-familia-barcelona-spain-O453M2Liufs",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Sagrada+Familia+Barcelona",
                              "rating": "⭐ 4.8 (구글 리뷰 230,000+)",
                              "seniorNote": "투어 전용 차량으로 명소 간 이동, 성당 내부 평지 관람"
                        },
                        {
                              "time": "13:30~15:00",
                              "title": "점심: Vinitus (바르셀로나 최고 인기 타파스)",
                              "desc": "그라시아 거리 인근. Ciudad Condal과 함께 바르셀로나 2대 타파스 맛집. 달콤한 꿀대구와 이베리코 목살 구이, 감바스 알 아히요.",
                              "icon": "🍽️",
                              "tag": "식사",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Vinitus+Barcelona",
                              "rating": "⭐ 4.5 (구글 리뷰 14,200+)",
                              "signatureMenu": "꿀대구(Bacalao con alioli de miel), 소고기 안심 타파스, 감바스 알 아히요",
                              "seniorNote": "호텔 도보 6분 거리로 식사 후 바로 호텔 복귀 가능"
                        },
                        {
                              "time": "15:00~17:30",
                              "title": "호텔 낮잠 & 어머니 충전 휴식",
                              "desc": "오전 투어 후 호텔 객실에서 2시간 30분 동안 편안하게 낮잠과 휴식.",
                              "icon": "🛏️",
                              "tag": "휴식",
                              "seniorNote": "오후 투어 없는 완전한 자유 휴식 시간"
                        },
                        {
                              "time": "17:30~19:00",
                              "title": "그라시아 거리(Passeig de Gràcia) 여유로운 산책 & 쇼핑",
                              "desc": "호텔 앞 카탈루냐 광장에서 이어지는 명품 거리 산책. 스페인 대표 브랜드(자라, 마시모두띠, 로에베) 및 기념품 쇼핑.",
                              "icon": "🛍️",
                              "tag": "산책",
                              "image": "https://images.unsplash.com/photo-1564221710304-0b37c8b9d729?q=80&w=1200&auto=format&fit=crop",
                              "imageCaption": "가우디의 걸작 까사 바트요가 자리한 바르셀로나 그라시아 거리",
                              "imageSource": "https://unsplash.com/photos/casa-batllo-barcelona-spain-8oxvhs6FfBM",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Passeig+de+Gr%C3%A0cia+Barcelona",
                              "seniorNote": "넓은 보도블록 평지 산책"
                        },
                        {
                              "time": "19:30~21:30",
                              "title": "저녁: El Nacional (웅장한 아르누보 미식 광장)",
                              "desc": "그라시아 거리에 위치한 19세기 근대 건축물을 개조한 스페인 최고의 미식 복합 공간. 화려한 조명 아래서 굴 플래터, 이베리코 하몽, 프리미엄 스테이크.",
                              "icon": "🍷",
                              "tag": "식사",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=El+Nacional+Barcelona",
                              "rating": "⭐ 4.4 (구글 리뷰 20,500+)",
                              "signatureMenu": "이베리코 벨로타 하몽(Jamón Ibérico de Bellota), 지중해 해산물 구이, 상그리아",
                              "seniorNote": "실내 공간이 매우 넓고 화장실이 특급호텔 수준으로 청결하여 어머니가 매우 만족하심"
                        }
                  ]
            },
            {
                  "day": 5,
                  "date": "2월 10일(수)",
                  "title": "바르셀로나 출발 → 리스본 도착 & Marisqueira Uma 해물밥 & 벨렝 에그타르트",
                  "badge": "리스본 입성",
                  "summary": "오전 10:55 바르셀로나에서 탑포르투갈항공으로 리스본에 11:55 도착(시차 1시간 절약!), 평지 명당 Hotel Mundial에 체크인하고 한국인 입맛 저격 해물밥과 1837년 원조 에그타르트를 즐깁니다.",
                  "seniorTip": "💡 리스본은 언덕이 많지만, 호텔(Hotel Mundial)은 완전한 평지인 호시우 광장 바로 앞입니다. 또한 오후 벨렝 지구는 평지 해안가이므로 우버를 이용해 편안하게 관람합니다.",
                  "dayMapUrl": "https://www.google.com/maps/search/?api=1&query=Hotel+Mundial+Lisbon",
                  "activities": [
                        {
                              "time": "08:30~09:15",
                              "title": "호텔 조식 & 체크아웃",
                              "desc": "Hotel Regina 조식 후 체크아웃. 호텔 앞에서 택시 탑승하여 공항 이동 (20분 소요).",
                              "icon": "🚕",
                              "tag": "이동",
                              "seniorNote": "택시로 터미널 1 출국장 바로 앞 하차"
                        },
                        {
                              "time": "10:55~11:55",
                              "title": "탑포르투갈항공 TP 1031 바르셀로나 → 리스본",
                              "desc": "비행시간 2시간. 스페인보다 시차가 1시간 느린 포르투갈 리스본에 오전 11:55 도착!",
                              "icon": "✈️",
                              "tag": "항공",
                              "seniorNote": "시차가 1시간 생겨 점심시간 전에 도착하는 최적의 시간대"
                        },
                        {
                              "time": "12:40",
                              "title": "택시/우버로 Hotel Mundial 이동 & 체크인",
                              "desc": "공항에서 택시로 15분 만에 마르팀 모니스 광장 앞 4성급 Hotel Mundial 도착. 짐을 풀고 점심 출발.",
                              "icon": "🏨",
                              "tag": "숙소",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Hotel+Mundial+Lisbon",
                              "rating": "⭐ 4.4 (구글 리뷰 5,600+)",
                              "seniorNote": "호시우 광장 도보 3분 완벽 평지 입지, 28번 트램 출발점이 호텔 바로 앞"
                        },
                        {
                              "time": "13:30~14:45",
                              "title": "점심: Marisqueira Uma (얼큰하고 시원한 원조 해물밥)",
                              "desc": "호텔 도보 4분. 냄비 가득 꽃게, 랍스터, 새우, 조개가 푸짐하게 끓여 나오는 포르투갈 전통 해물밥(Arroz de Marisco). 한국의 꽃게탕처럼 얼큰하고 시원하여 어머니 입맛을 완벽히 사로잡는 마성의 메뉴!",
                              "icon": "🥘",
                              "tag": "식사",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Marisqueira+Uma+Lisboa",
                              "rating": "⭐ 4.4 (구글 리뷰 3,600+)",
                              "signatureMenu": "원조 해물밥(Arroz de Marisco), 비노 베르데(그린 와인)",
                              "seniorNote": "유럽 여행 중 칼칼하고 따뜻한 국물이 그리울 때 최고의 감동 메뉴"
                        },
                        {
                              "time": "15:15~16:15",
                              "title": "티타임: Pastéis de Belém (1837년 창업 원조 에그타르트)",
                              "desc": "우버로 벨렝 지구 이동(15분). 제로니무스 수도원 수녀들의 비밀 레시피 그대로 구워내는 전 세계 나타의 원조. 겉은 바삭하고 속은 부드러운 크림 위에 시나몬 가루를 톡톡!",
                              "icon": "🥧",
                              "tag": "디저트",
                              "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1200&auto=format&fit=crop",
                              "imageCaption": "리스본 원조 파스테이스 드 벨렝의 바삭하고 따뜻한 에그타르트",
                              "imageSource": "https://unsplash.com/photos/brown-pastry-on-white-ceramic-plate-178j8tJrNlc",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Past%C3%A9is+de+Bel%C3%A9m",
                              "rating": "⭐ 4.6 (구글 리뷰 86,000+)",
                              "signatureMenu": "원조 에그타르트(Pastel de Belém), 갈라웅(Galão - 부드러운 밀크커피)",
                              "seniorNote": "포장 줄 대신 안쪽 넓은 테이블 살롱으로 들어가 편안하게 앉아서 주문"
                        },
                        {
                              "time": "16:30~18:00",
                              "title": "제로니무스 수도원 & 발견기념비 & 벨렝 탑(Torre de Belém)",
                              "desc": "마누엘 양식의 화려한 제로니무스 수도원 외관 감상 및 테주 강변을 따라 바스코 다 가마의 대항해 시대를 기념하는 벨렝 탑 산책.",
                              "icon": "🏰",
                              "tag": "관광",
                              "image": "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?q=80&w=1200&auto=format&fit=crop",
                              "imageCaption": "테주 강변에 우뚝 솟은 리스본의 상징 벨렝 탑(Torre de Belém)",
                              "imageSource": "https://unsplash.com/photos/belem-tower-lisbon-portugal-8oxvhs6FfBM",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Bel%C3%A9m+Tower+Lisbon",
                              "rating": "⭐ 4.6 (구글 리뷰 75,000+)",
                              "seniorNote": "강변 평지 산책로로 걷기 편안함"
                        },
                        {
                              "time": "18:30~19:30",
                              "title": "호텔 루프탑 바에서 상 조르제 성 석양 조망",
                              "desc": "Hotel Mundial 9층 루프탑 바(Rooftop Bar)에서 리스본 시내와 상 조르제 성의 노을을 감상하며 무알콜 칵테일 한잔.",
                              "icon": "🌅",
                              "tag": "전망",
                              "seniorNote": "엘리베이터로 루프탑 직행"
                        },
                        {
                              "time": "19:30~21:00",
                              "title": "저녁: Solar dos Presuntos (리스본 최고 전통 해산물 명가)",
                              "desc": "호텔 도보 5분. 포르투갈 정재계 인사들이 사랑하는 최고급 레스토랑. 올리브유와 마늘로 구운 부드러운 문어 요리와 신선한 바칼라우(대구) 크로켓.",
                              "icon": "🍽️",
                              "tag": "식사",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Solar+dos+Presuntos+Lisboa",
                              "rating": "⭐ 4.6 (구글 리뷰 6,100+)",
                              "signatureMenu": "포르투갈 문어 구이(Polvo à Lagareiro), 바칼라우 크로켓, 흑돼지 하몽",
                              "seniorNote": "문어가 믿을 수 없을 만큼 부드러워 어르신 치아에 전혀 무리 없음"
                        }
                  ]
            },
            {
                  "day": 6,
                  "date": "2월 11일(목)",
                  "title": "리스본의 낭만 · 28번 트램 & 알파마 전망대 & 타임아웃 마켓 미식 & 파두",
                  "badge": "28번 트램 & 정취",
                  "summary": "호텔 바로 앞 종점에서 28번 빈티지 트램에 앉아서 탑승해 알파마 산타 루치아 전망대를 감상하고, 트렌디한 타임아웃 마켓에서 점심을 즐긴 뒤 왕실 제과점 티타임을 갖습니다.",
                  "seniorTip": "💡 28번 트램은 중간 정류장에서는 사람이 꽉 차 탈 수 없지만, 호텔(Hotel Mundial) 바로 앞 마르팀 모니스가 시발점 종점이라 줄을 서서 100% 앉아서 탑승하실 수 있습니다.",
                  "dayMapUrl": "https://www.google.com/maps/search/?api=1&query=Miradouro+de+Santa+Luzia+Lisbon",
                  "activities": [
                        {
                              "time": "09:30~10:00",
                              "title": "호텔 앞 28번 트램 탑승 (시발점 착석!)",
                              "desc": "호텔 정문 앞 마르팀 모니스 광장에서 노란색 28번 빈티지 트램 탑승. 덜컹거리는 옛 전차를 타고 좁은 골목을 오르는 리스본 최고의 낭만.",
                              "icon": "🚋",
                              "tag": "체험",
                              "image": "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=1200&auto=format&fit=crop",
                              "imageCaption": "리스본 알파마 지구 언덕을 오르는 노란색 28번 빈티지 트램",
                              "imageSource": "https://unsplash.com/photos/yellow-tram-on-street-during-daytime-XmYg252K63g",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Tram+28+Martim+Moniz+Lisbon",
                              "rating": "⭐ 4.4 (구글 리뷰 15,000+)",
                              "seniorNote": "종점이라 서서 가지 않고 앉아서 편안하게 언덕 정상까지 이동"
                        },
                        {
                              "time": "10:15~11:30",
                              "title": "산타 루치아 전망대 & 리스본 대성당",
                              "desc": "산타 루치아 전망대(Miradouro de Santa Luzia) 하차. 푸른 타일 아줄레주 회랑과 분홍빛 부겐빌레아 꽃 너머로 펼쳐지는 주홍빛 지붕과 테주 강 조망.",
                              "icon": "📸",
                              "tag": "전망",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Miradouro+de+Santa+Luzia+Lisbon",
                              "rating": "⭐ 4.7 (구글 리뷰 34,000+)",
                              "seniorNote": "전망대 테라스 벤치에서 강바람 쐬며 가족 사진 촬영"
                        },
                        {
                              "time": "12:30~14:00",
                              "title": "점심: Time Out Market Lisboa (리베이라 미식 마켓)",
                              "desc": "택시로 이동. 리스본의 스타 셰프들이 한자리에 모인 대형 미식 마켓. 스테이크 샌드위치(프레고), 문어 샐러드, 에그타르트, 와인 등을 자유롭게 선택.",
                              "icon": "🍴",
                              "tag": "식사",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Time+Out+Market+Lisboa",
                              "rating": "⭐ 4.4 (구글 리뷰 60,000+)",
                              "signatureMenu": "프레고(Prego 소고기 샌드위치), 문어 샐러드, 바칼라우 브라스",
                              "seniorNote": "실내 중앙 테이블에서 가족끼리 다양한 메뉴를 골라 나누어 시식"
                        },
                        {
                              "time": "14:30~16:00",
                              "title": "코메르시우 광장(Praça do Comércio) 테주 강변 산책",
                              "desc": "개선문과 노란색 아케이드로 둘러싸인 웅장한 광장. 테주 강변 돌계단 벤치에서 커피를 마시며 여유로운 오후.",
                              "icon": "🏛️",
                              "tag": "산책",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Pra%C3%A7a+do+Com%C3%A9rcio+Lisbon",
                              "rating": "⭐ 4.7 (구글 리뷰 120,000+)",
                              "seniorNote": "탁 트인 평지 광장으로 시야가 시원함"
                        },
                        {
                              "time": "16:30~17:30",
                              "title": "티타임: Confeitaria Nacional (1829년 왕실 공식 납품 제과점)",
                              "desc": "호텔 바로 앞 피게이라 광장 코너. 200년 역사의 유서 깊은 베이커리 살롱에서 따뜻한 홍차와 전통 과자 볼루 헤이(Bolo Rei).",
                              "icon": "☕",
                              "tag": "카페",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Confeitaria+Nacional+Lisboa",
                              "rating": "⭐ 4.3 (구글 리뷰 6,800+)",
                              "seniorNote": "호텔에서 100m 거리로 티타임 후 호텔로 복귀하여 휴식"
                        },
                        {
                              "time": "18:30~20:30",
                              "title": "저녁: Restaurante O Chiado 또는 파두 음악 감상",
                              "desc": "정갈한 포르투갈 전통 바칼라우(대구 요리)와 따뜻한 감자 수프 칼두 베르드(Caldo Verde).",
                              "icon": "🎶",
                              "tag": "식사",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Restaurante+O+Chiado+Lisbon",
                              "rating": "⭐ 4.5 (구글 리뷰 1,800+)",
                              "seniorNote": "어머니 피로도에 따라 호텔 인근 식당 선택"
                        }
                  ]
            },
            {
                  "day": 7,
                  "date": "2월 12일(금)",
                  "title": "시아두 지구 여유로운 쇼핑 & 전용차량 샌딩 → 대한항공 KE 922 직항 귀국",
                  "badge": "밤 직항 출국",
                  "summary": "호텔 체크아웃 후 시아두 거리에서 포르투갈 특산품(코르크 공예, 큐티폴 식기, 포트와인)을 쇼핑하고, 오후 18:00 전용차량 샌딩으로 공항 이동 후 21:45 대한항공 직항에 탑승합니다.",
                  "seniorTip": "💡 밤 21:45 출발 직항이므로 마지막 날 온전히 하루 종일 리스본을 즐길 수 있습니다. 18:00에 전용 샌딩 차량이 오므로 편안하게 짐을 싣고 공항으로 이동합니다.",
                  "dayMapUrl": "https://www.google.com/maps/search/?api=1&query=Lisbon+Airport+Terminal+1",
                  "activities": [
                        {
                              "time": "09:30~11:00",
                              "title": "호텔 조식 & 짐 정리 & 체크아웃 후 짐 보관",
                              "desc": "느긋하게 조식 후 짐 패킹. 호텔 프런트에 캐리어를 맡기고 마지막 외출.",
                              "icon": "🧳",
                              "tag": "체크아웃",
                              "seniorNote": "기내 반입 가방에 여권과 약 챙기기"
                        },
                        {
                              "time": "11:30~13:00",
                              "title": "시아두 거리 산책 & 기념품 쇼핑",
                              "desc": "산타 후스타 엘리베이터 외관을 감상하고, 세계에서 가장 오래된 서점 베르트랑(Livraria Bertrand)과 큐티폴 커트러리, 포르투갈 올리브 오일 쇼핑.",
                              "icon": "🛍️",
                              "tag": "쇼핑",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Chiado+Lisbon",
                              "seniorNote": "평지 쇼핑가 위주로 가볍게 보행"
                        },
                        {
                              "time": "13:00~14:30",
                              "title": "마지막 점심: Floresta das Escadinhas",
                              "desc": "신선한 정어리 구이와 그릴 돼지고기, 따뜻한 야채 스프를 내놓는 현지인 극찬 가정식 식당.",
                              "icon": "🍽️",
                              "tag": "식사",
                              "mapUrl": "https://www.google.com/maps/search/?api=1&query=Floresta+das+Escadinhas+Lisboa",
                              "rating": "⭐ 4.6 (구글 리뷰 2,800+)",
                              "signatureMenu": "정어리 구이(Sardinhas assadas), 돼지고기 알렌테자나, 하우스 와인",
                              "seniorNote": "부드러운 생선 구이로 마지막 현지 만찬"
                        },
                        {
                              "time": "15:00~17:30",
                              "title": "피게이라 광장 카페 휴식 & 호텔 짐 정리",
                              "desc": "호텔 로비 라운지에서 커피를 마시며 휴식 후 맡겨둔 짐을 찾아 공항 차량 대기.",
                              "icon": "☕",
                              "tag": "휴식",
                              "seniorNote": "공항 출발 전 편안한 옷으로 환복"
                        },
                        {
                              "time": "18:00",
                              "title": "[포함] 리스본 호텔 전용차량 픽업 → 공항 샌딩",
                              "desc": "호텔 로비에서 단독 밴 기사 미팅. 리스본 공항 제1터미널로 이동 (출발 3시간 45분 전 여유 도착).",
                              "icon": "🚐",
                              "tag": "공항이동",
                              "seniorNote": "공항까지 20분 소요, 캐리어 상하차 지원"
                        },
                        {
                              "time": "19:00~21:00",
                              "title": "택스리펀 & 대한항공 수속 & 라운지 휴식",
                              "desc": "공항 세관에서 택스리펀 도장 및 카드 환급 신청. 대한항공 체크인 및 면세점 이용.",
                              "icon": "🛂",
                              "tag": "출국",
                              "seniorNote": "탑승구 앞 라운지/의자에서 편안히 대기"
                        },
                        {
                              "time": "21:45",
                              "title": "대한항공 KE 922편 리스본 → 인천 직항 출발",
                              "desc": "비행시간 13시간 15분. 국적기 대한항공 직항 탑승. 밤 비행으로 기내 수면 후 2/13(토) 저녁 20:00 인천 도착.",
                              "icon": "✈️",
                              "tag": "귀국",
                              "seniorNote": "기내에서 숙면을 취하며 한국 시간대로 복귀"
                        }
                  ]
            },
            {
                  "day": 8,
                  "date": "2월 13일(토)",
                  "title": "인천국제공항 제2터미널 도착 · 가족 여행 귀가",
                  "badge": "토요일 귀국",
                  "summary": "저녁 20:00 인천공항 제2터미널에 안전하게 도착하여 수하물을 찾고 귀가합니다.",
                  "seniorTip": "💡 토요일 저녁 도착이라 다음 날인 일요일(2/14)에 온전히 쉴 수 있어 시차 적응과 일상 복귀에 매우 좋습니다.",
                  "activities": [
                        {
                              "time": "20:00 (한국)",
                              "title": "인천국제공항 T2 도착 & 입국 심사",
                              "desc": "자동출입국심사 및 수하물 수령 후 세관 통과. 가족과 함께 안전하게 귀가.",
                              "icon": "🏠",
                              "tag": "도착",
                              "seniorNote": "가족과 함께 따뜻한 집으로 이동"
                        }
                  ]
            }
      ],
      "seniorGuideTips": [
            {
                  "title": "✈️ 대한항공 In/Out 직항의 안락함",
                  "desc": "인천→마드리드(KE913), 리스본→인천(KE922) 모두 대한항공 직항입니다. 환승으로 인한 대기시간이나 짐 분실 위험이 없으며, 한국인 승무원의 따뜻한 케어와 한식 기내식으로 60대 어머니가 가장 안심하고 여행하실 수 있습니다."
            },
            {
                  "title": "🏨 바르셀로나 카탈루냐 광장 1분 특급 입지 (Hotel Regina)",
                  "desc": "바르셀로나 숙소는 카탈루냐 광장 도보 1분 거리의 4성급 호텔입니다. 공항버스, 지하철, 가우디 투어 집결지, 백화점, 맛집(Ciudad Condal)이 모두 도보 1~3분 거리에 있어 이동 피로도가 사실상 0에 가깝습니다."
            },
            {
                  "title": "🚋 리스본 28번 트램 종점 착석 전략",
                  "desc": "리스본 숙소(Hotel Mundial)는 평지인 마르팀 모니스 광장 바로 앞에 위치합니다. 이곳이 바로 28번 트램의 출발 종점이므로, 어머니가 서서 가실 필요 없이 편안하게 착석하여 알파마 언덕 정상까지 오르실 수 있습니다."
            },
            {
                  "title": "🍲 어머니 입맛 저격 해물밥 & 꿀대구 & 빠에야",
                  "desc": "스페인과 포르투갈 음식은 쌀과 해산물, 올리브유 베이스라 한국인 어르신 입맛에 가장 잘 맞습니다. 특히 리스본 우마(Uma)의 얼큰한 해물밥, 바르셀로나의 달콤하고 부드러운 꿀대구, 7 Portes의 껍질 벗긴 해산물 빠에야는 어르신 만족도 100% 메뉴입니다."
            },
            {
                  "title": "🚄 고속열차 2등석 포함 & 공항 전용차량 2회",
                  "desc": "마드리드에서 바르셀로나까지 약 3시간 15분 고속열차로 쾌적하게 이동하며, 마드리드 도착 시와 리스본 출발 시 공항 단독 전용차량이 제공되어 무거운 짐을 들고 대중교통을 타실 필요가 없습니다."
            },
            {
                  "title": "👛 소매치기 예방과 안전 수칙",
                  "desc": "바르셀로나와 리스본은 소매치기가 발생하기 쉬운 관광지입니다. 핸드폰 스트랩 착용, 크로스백은 앞으로 메기, 낯선 사람의 접근(서명 요구나 설문조사) 시 무시하기 등 기본 안전 수칙을 지키며 가족이 함께 이동합니다."
            }
      ]
},
    guam: {
      id: "guam",
      name: "괌",
      country: "미국령 괌 🇬🇺",
      title: "짧은 비행, 여유로운 바다 · 괌 4일 가족 휴양",
      subtitle: "투몬 해변과 리조트 휴식 중심 · 성인 6인 가족 기준 · 연도는 2027년 기준",
      heroImage: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/3a/a8/8e/caption.jpg?w=1100&h=1100&s=1",
      heroImageCaption: "사랑의 절벽에서 바라본 괌 해안 · Tripadvisor 여행자 사진",
      heroImageSource: "https://www.tripadvisor.com/Attraction_Review-g60678-d310576-Reviews-Two_Lovers_Point-Tumon_Tamuning_Guam.html",
      status: "active",
      dates: {
        departure: "2027.02.05 (금)",
        return: "2027.02.08 (월)",
        duration: "3박 4일 · 2/8 체크아웃 후 오후 귀국"
      },
      travelers: {
        total: 6,
        composition: "성인 6인 가족",
        style: "투몬 호텔 한 곳에서 휴식 · 반일 차량 관광 · 긴 도보·남부 종주 제외"
      },
      flight: {
        airline: "대한항공 (Korean Air)",
        airlineCode: "KE",
        type: "직항",
        outbound: {
          depTime: "09:50",
          depAirport: "인천 (ICN)",
          arrTime: "15:05",
          arrAirport: "괌 (GUM)",
          duration: "4시간 15분",
          note: "2/5 한국 09:50 출발 → 괌 15:05 도착. 모든 시각은 해당 공항 현지시간이며 괌은 한국보다 1시간 빠릅니다. 입국·수하물 수령 후 투몬 호텔까지 차량 약 15~25분을 예상합니다."
        },
        inbound: {
          depTime: "16:50",
          depAirport: "괌 (GUM)",
          arrTime: "20:40",
          arrAirport: "인천 (ICN)",
          duration: "4시간 50분",
          note: "2/8 월요일 괌 16:50 출발 → 한국 20:40 도착. 이날 호텔 정규 체크아웃 후 점심을 먹고 13:20 호텔 출발, 13:50 공항 도착을 목표로 약 3시간 여유를 확보합니다."
        },
        pricing: {
          perPerson: 1097000,
          total: 6582000,
          priceLabel: "성인 1인 / 하나카드 이용실적 충족 시 · 로그인 후 특가 확인",
          discountNote: "사용자 제공 성인 왕복 1,097,000원~ · 하나카드 이용실적 충족 조건 · 로그인 후 특가 확인. 6인 모두 동일 운임 적용 가정이며 잔여 좌석·유류할증료·세금·수하물·최종 결제액은 예약 단계에서 확인"
        }
      },
      budget: {
        total: 11772000,
        perPerson: 1962000,
        currency: "원 (KRW)",
        note: "성인 6인·2인 1실·객실 3개 기준의 계획 예산입니다. 항공 외 금액은 실시간 견적이 아닌 추정치이며 환율은 1 USD = 1,450원으로 가정했습니다. 숙소는 2/5 체크인~2/8 정규 체크아웃 3박입니다. 오후 귀국편에 맞춰 마지막 날 조식·점심 6인 24만원을 식비에 포함했습니다. 교통은 성인 6인과 짐을 실을 수 있는 대형 밴 1대 기준 추정입니다. 유료 대형 액티비티와 개인 쇼핑은 별도이며, 객실·항공 성수기 할증 및 카드 적용 조건에 따라 늘어날 수 있습니다.",
        categories: [
          { id: "flight", name: "항공권", icon: "✈️", amount: 6582000, perPerson: 1097000, percentage: 55.9, desc: "대한항공 직항 성인 왕복 1,097,000원~ × 6인 · 하나카드 이용실적 충족 및 로그인 후 특가 확인" },
          { id: "accommodation", name: "호텔 (객실 3개 × 3박)", icon: "🏨", amount: 2250000, perPerson: 375000, percentage: 19.1, desc: "투몬 해변 접근이 쉬운 호텔 · 객실당 1박 25만원 × 3실 × 3박, 세금·필수 요금 포함 목표 예산 / 조식 별도" },
          { id: "food", name: "식비 & 카페", icon: "🍽️", amount: 1500000, perPerson: 250000, percentage: 12.7, desc: "6인 첫날 30만원 + 둘째 날 48만원 + 셋째 날 48만원 + 귀국일 조식·점심 24만원 · 음료·일반적인 팁 포함 예상" },
          { id: "tours", name: "입장료 & 가벼운 체험", icon: "🌊", amount: 240000, perPerson: 40000, percentage: 2.0, desc: "사랑의 절벽 전망대 등 입장료와 해변 장비 대여 등 선택 이용 한도 · 돌핀크루즈·스쿠버는 별도" },
          { id: "transport", name: "공항 이동 & 반일 차량", icon: "🚐", amount: 600000, perPerson: 100000, percentage: 5.1, desc: "성인 6인과 짐을 수용하는 대형 밴 기준 공항 왕복 24만원 + 반일 관광 27만원 + 단거리 이동 9만원 추정 · 2/8 낮 호텔 픽업 / 수용 인원·수하물 공간 확인" },
          { id: "misc", name: "보험·통신 & 예비비", icon: "🧳", amount: 600000, perPerson: 100000, percentage: 5.1, desc: "여행자보험·통신 18만원 + 예비비 42만원 · 유료 입국 허가가 필요한 경우 예비비 또는 별도 반영 / 개인 쇼핑 제외" }
        ]
      },
      itinerary: [
        {
          day: 1, date: "2월 5일 (금)", title: "괌 도착 · 투몬에서 느긋한 첫 저녁", badge: "입국 & 해변",
          summary: "09:50 인천 출발 → 15:05 괌 도착. 첫날은 입국과 호텔 이동 후 해변 산책과 저녁만 계획합니다. 이후 일정 시각은 괌 현지시간입니다.",
          seniorTip: "💡 호텔은 엘리베이터·해변 접근성·조용한 객실을 우선하고, 객실 3개를 같은 층에 요청하세요. 입국 지연 시 산책을 생략해도 좋습니다.",
          activities: [
            { time: "06:50 (한국)", title: "인천공항 도착 & 출국 수속", desc: "출발 약 3시간 전 도착 목표. 여권·입국 서류·수하물 조건을 확인하고 간단히 아침을 먹습니다. 터미널은 전자항공권 기준으로 확인하세요.", icon: "🧳", tag: "출국" },
            { time: "09:50 (한국)", title: "대한항공 인천 → 괌 직항", desc: "제공받은 비행시간 4시간 15분. 편명은 아직 제공되지 않아 예약 내역에서 확인합니다.", icon: "✈️", tag: "항공" },
            { time: "15:05 (괌)", title: "괌 국제공항 도착", desc: "입국심사·수하물 수령에 약 60~90분 여유를 둡니다. 실제 대기시간에 따라 픽업 시각을 조정합니다.", icon: "🛬", tag: "입국" },
            { time: "16:30~17:00", title: "예약 차량 이동 & 투몬 호텔 체크인", desc: "차량 이동 약 15~25분 예상. 2인 1실 객실 3개에 짐을 풀고 1시간 정도 쉽니다. 체크인부터 2/8까지 총 3박 예약입니다.", icon: "🏨", tag: "숙소" },
            {
              time: "18:00", title: "투몬 해변 짧은 산책", desc: "호텔 앞 해변을 20~30분만 걸으며 바다를 봅니다. 피곤하면 객실이나 호텔 라운지에서 쉬는 것으로 대체합니다.", icon: "🏖️", tag: "휴식",
              image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/fe/44/91/tumon-beach.jpg?w=1200&h=1200&s=1",
              imageCaption: "투몬 북쪽 해안 풍경 · 낮에 촬영된 지역 참고 사진",
              imageSource: "https://www.tripadvisor.com/Attraction_Review-g60678-d2075296-Reviews-Tumon_Beach-Tumon_Tamuning_Guam.html"
            },
            {
              time: "18:40~20:00", title: "호텔 인근 저녁 & 이른 휴식", desc: "그릴 요리·차모로 스타일 BBQ 등으로 저녁. 대기 줄이 긴 식당 대신 예약 가능한 가까운 식당을 고릅니다. 첫날 식비·간식은 6인 약 30만원 한도입니다.", icon: "🍽️", tag: "식사",
              image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/e9/33/c7/bbq-trio.jpg?w=1200&h=-1&s=1",
              imageCaption: "PROA Restaurant Guam의 BBQ Trio · 메뉴 참고 사진, 방문·예약 미정",
              imageSource: "https://www.tripadvisor.co.kr/LocationPhotoDirectLink-g60678-d1307881-i317273031-PROA_Restaurant_Guam-Tumon_Tamuning_Guam.html"
            }
          ]
        },
        {
          day: 2, date: "2월 6일 (토)", title: "리조트 오전 · 사랑의 절벽과 쇼핑", badge: "휴양 & 전망",
          summary: "오전에는 호텔에서 충분히 쉬고 오후에만 반일 차량으로 이동합니다. 투몬 → 사랑의 절벽 → 데데도 쇼핑몰 → 투몬의 짧은 북부 동선입니다.",
          seniorTip: "💡 한낮 햇볕을 피해 모자·자외선차단제·물을 챙기세요. 수영하지 않는 가족도 그늘에서 쉴 수 있는 호텔을 고르면 모두 편합니다.",
          activities: [
            { time: "08:30", title: "느긋한 조식", desc: "호텔 조식은 별도 결제하거나 가까운 카페를 이용합니다. 조식이 숙박료에 포함된 상품이라면 식비 예산에서 조정하세요.", icon: "☕", tag: "식사" },
            { time: "09:30~11:30", title: "투몬 해변 & 호텔 수영장", desc: "짧은 해변 산책이나 수영 후 객실에서 휴식합니다. 바다 상태와 안전 안내를 따르고, 파도가 높으면 수영장으로 대체합니다.", icon: "🌊", tag: "휴양" },
            { time: "12:00", title: "호텔 근처 점심", desc: "해산물·버거·누들 등 취향에 맞춰 선택합니다. 오후 이동 전 객실에서 잠깐 쉬고 출발하세요.", icon: "🍴", tag: "식사" },
            {
              time: "13:30~14:30", title: "차량으로 사랑의 절벽 전망대", desc: "투몬에서 차량 약 15~20분 예상. 전망 감상과 사진 촬영을 30~40분 정도로 제한합니다. 입장료·운영시간·보행 접근성은 방문 전 확인합니다.", icon: "📍", tag: "전망",
              image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/3a/a8/8e/caption.jpg?w=1100&h=1100&s=1",
              imageCaption: "사랑의 절벽 전망대에서 내려다본 해안과 바다",
              imageSource: "https://www.tripadvisor.com/Attraction_Review-g60678-d310576-Reviews-Two_Lovers_Point-Tumon_Tamuning_Guam.html"
            },
            {
              time: "15:00~16:30", title: "마이크로네시아 몰 실내 쇼핑 & 카페", desc: "냉방이 되는 실내에서 쉬며 필요한 물건만 구입합니다. 쇼핑하지 않는 가족은 카페에서 휴식하고, 구입비는 여행 예산과 별도로 관리합니다.", icon: "🛍️", tag: "쇼핑",
              image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/2c/d3/44/micronesia-mall-center.jpg?w=1200&h=-1&s=1",
              imageCaption: "데데도 마이크로네시아 몰 중앙 실내 공간 · 매장 구성은 방문 시점에 따라 다를 수 있음",
              imageSource: "https://www.tripadvisor.co.kr/Attraction_Review-g60674-d310589-Reviews-Micronesia_Mall-Dededo_Guam.html"
            },
            { time: "17:00~19:30", title: "호텔 복귀 · 일몰 무렵 저녁", desc: "반일 차량을 마치고 호텔에서 쉬었다가 인근 식당으로 이동합니다. 조식·점심·저녁·카페 합산 6인 약 48만원 예산입니다.", icon: "🌅", tag: "식사" }
          ]
        },
        {
          day: 3, date: "2월 7일 (일)", title: "온종일 휴양 · 괌에서 보내는 마지막 밤", badge: "휴식 & 미식",
          summary: "장거리 관광 없이 해변·쇼핑·객실 휴식을 즐기고 호텔에서 마지막 밤을 보냅니다. 공항 이동은 내일 2/8 낮입니다.",
          seniorTip: "💡 호텔은 2/5~2/8 총 3박입니다. 오늘은 조기 체크아웃 없이 숙면하고, 내일 오전 정규 체크아웃에 맞춰 짐을 준비하세요.",
          activities: [
            { time: "09:00", title: "늦은 아침 & 해변 산책", desc: "전날 피로에 따라 기상 시간을 조정하고, 호텔 주변에서만 가볍게 걷습니다.", icon: "☀️", tag: "휴식" },
            { time: "11:00~12:00", title: "기념품 구입 또는 수영장", desc: "투몬 중심 상점에서 기념품을 사거나 호텔에서 쉽니다. 해양 액티비티를 추가한다면 귀국 비행 전 안전 대기시간을 확인해야 하는 스쿠버 대신 부담 없는 활동을 선택하세요.", icon: "🎁", tag: "자유시간" },
            { time: "12:30", title: "가까운 식당에서 점심", desc: "차모로 음식 등 마지막 현지 식사를 즐깁니다. 대기시간이 길면 호텔 레스토랑으로 변경하세요.", icon: "🍽️", tag: "식사" },
            {
              time: "14:00~18:00", title: "객실 휴식 · 낮잠 · 자유시간", desc: "호텔 수영장이나 객실에서 편하게 쉽니다. 오늘 밤에도 같은 객실 3개에서 숙박하므로 서두를 필요가 없습니다.", icon: "🛏️", tag: "휴식",
              image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/33/ed/2c/photo0jpg.jpg?w=1200&h=-1&s=1",
              imageCaption: "실내에서 바라본 투몬 해안 · 휴양 분위기 참고용, 예약 호텔·객실 전망을 의미하지 않음",
              imageSource: "https://www.tripadvisor.com/Attraction_Review-g60678-d2075296-Reviews-Tumon_Beach-Tumon_Tamuning_Guam.html"
            },
            { time: "18:30~20:00", title: "마지막 저녁 & 해변 산책", desc: "저녁은 가까운 곳에서 먹고 짧게 산책합니다. 이날 식비는 6인 약 48만원, 추가 쇼핑은 별도입니다.", icon: "🍽️", tag: "식사" },
            { time: "20:30", title: "짐 정리 후 호텔에서 숙면", desc: "내일 체크아웃 시간과 13:20 공항 차량 픽업을 재확인합니다. 여권과 기내 반입 물품을 따로 챙긴 뒤 편안히 쉽니다.", icon: "🛏️", tag: "숙박" }
          ]
        },
        {
          day: 4, date: "2월 8일 (월)", title: "여유로운 오전 · 오후 출발, 저녁 인천 도착", badge: "오전 휴식 & 귀국",
          summary: "호텔에서 조식과 짧은 산책 후 체크아웃합니다. 괌 16:50 출발 → 한국 20:40 도착이며, 출발일과 한국 도착일 모두 2월 8일입니다.",
          seniorTip: "💡 무료 레이트 체크아웃을 가정하지 않습니다. 호텔 정규 퇴실 시간을 확인하고 점심 동안 짐을 맡기세요. 한국 도착 후 입국·수하물 수령을 고려해 귀가 교통편의 막차 시간을 확인합니다.",
          activities: [
            {
              time: "08:30~10:30 (괌)", title: "조식 & 마지막 해변 산책", desc: "호텔이나 가까운 카페에서 아침을 먹고 호텔 주변만 가볍게 걷습니다. 객실에서 씻고 짐을 정리할 시간을 남겨둡니다.", icon: "☕", tag: "휴식",
              image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/fe/44/91/tumon-beach.jpg?w=1200&h=1200&s=1",
              imageCaption: "마지막 산책을 위한 투몬 북쪽 해안 참고 사진",
              imageSource: "https://www.tripadvisor.com/Attraction_Review-g60678-d2075296-Reviews-Tumon_Beach-Tumon_Tamuning_Guam.html"
            },
            { time: "11:00 (괌)", title: "정규 체크아웃 & 짐 보관", desc: "11:00 퇴실을 목표로 하되 실제 호텔 규정을 따릅니다. 프런트에 짐 보관 가능 여부를 확인하고 가까운 식당으로 이동합니다.", icon: "🏨", tag: "체크아웃" },
            { time: "11:30~12:30 (괌)", title: "호텔 인근 점심", desc: "조식·점심 합산 6인 24만원을 식비에 반영했습니다. 식사 후 호텔에서 짐을 찾아 공항 차량을 기다립니다.", icon: "🍽️", tag: "식사" },
            { time: "13:20~13:50 (괌)", title: "호텔 픽업 → 괌 공항 이동", desc: "13:50 공항 도착 목표로 출발 약 3시간 전 여유를 둡니다. 실제 교통 상황과 항공사 권장 도착시간에 맞춰 조정하세요.", icon: "🚐", tag: "공항 이동" },
            { time: "13:50~16:00 (괌)", title: "출국 수속 & 탑승구 대기", desc: "체크인·수하물 위탁·보안검색 후 탑승구를 확인합니다. 탑승 시작·마감시각은 탑승권과 현장 안내를 따릅니다.", icon: "🛂", tag: "출국" },
            { time: "16:50 (괌)", title: "괌 → 인천 직항 출발", desc: "대한항공, 비행시간 4시간 50분. 한국 시각으로는 15:50 출발에 해당합니다.", icon: "✈️", tag: "항공" },
            { time: "20:40 (한국)", title: "인천국제공항 도착", desc: "입국심사와 수하물 수령 후 귀가합니다. 늦은 저녁 귀가 교통편을 확인하세요. 국내 공항 왕복 교통비는 거주지에 따라 별도이며 여행 예산에는 포함하지 않았습니다.", icon: "🏠", tag: "귀국" }
          ]
        }
      ],
      seniorGuideTips: [
        { title: "📅 연도·시간대 확인", desc: "월일만 전달받아 페이지 경로에 맞춘 2027년 일정으로 작성했습니다. 2/5 금요일 출발, 2/8 월요일 한국 도착입니다. 괌은 한국보다 1시간 빠르며 항공 시각·운항 여부·편명은 예약 확인서로 최종 확인하세요." },
        { title: "🏨 호텔 3박 & 귀국일 짐 보관", desc: "2/5·6·7일 밤 숙박 후 2/8 정규 체크아웃하는 3박 일정입니다. 객실 3개·3박의 세금 및 필수 요금 포함 견적을 받고, 체크아웃 후 점심 동안 짐 보관이 가능한지 확인하세요." },
        { title: "💳 하나카드 혜택가 · 로그인 후 확인", desc: "항공 1,097,000원~은 성인·하나카드 이용실적 충족 조건이며 로그인 후 특가 확인이 필요합니다. 6명에게 같은 할인가가 적용되는지, 유류할증료·세금·위탁수하물 포함 여부를 확인하세요. 비항공 비용은 추정이며 개인 쇼핑·국내 공항 이동·돌핀크루즈·스쿠버는 제외했습니다." },
        { title: "🛂 입국 서류는 출발 전 공식 확인", desc: "국적·여권·체류 목적에 따라 입국 요건이 달라집니다. 대한민국 여권 단기 관광이라도 괌-북마리아나 무비자 프로그램의 전자여행허가(G-CNMI ETA), ESTA 등 본인에게 적용되는 경로와 전자세관신고 요건을 미국 CBP 및 괌 공식 안내에서 확인하세요. 승인기한과 비용은 예약 전에 확인합니다." },
        { title: "🚐 낮 공항 이동과 체력 안배", desc: "공항 왕복은 성인 6인과 캐리어를 수용하는 대형 밴으로 예약하고 귀국 픽업은 2/8 13:20 호텔 출발로 요청하세요. 기사 좌석을 제외한 승객 정원과 수하물 공간을 확인합니다. 반일 관광 차량 비용에 입장료가 포함되는지 확인하고, 계단이 부담되면 전망대 대신 호텔 카페로 바꿉니다." },
        { title: "🌦️ 날씨·영업시간·팁", desc: "소나기·강풍 시 바다 일정은 실내 쇼핑몰이나 호텔 휴식으로 대체합니다. 일몰·영업시간·식당 예약은 출발 직전 확인하세요. 계산서에 서비스 요금이 포함됐는지 먼저 보고 팁의 중복 지출을 피합니다." }
      ]
    },
    rome: {
      id: "rome",
      name: "로마",
      country: "이탈리아 🇮🇹",
      title: "영원의 도시, 로마 5일 럭셔리 힐링 여행",
      subtitle: "어머니와 자녀 3명이 함께 떠나는 편안하고 품격 있는 로마 감성 여정",
      heroImage: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1600&auto=format&fit=crop",
      status: "active",
      dates: {
        departure: "2026.02.03 (화)",
        return: "2026.02.07 (토)",
        duration: "5일 (현지 4박 5일)"
      },
      travelers: {
        total: 4,
        composition: "4인가족",
        style: "도보 최소화, 프라이빗 픽업, 럭셔리 미식 & 패스트트랙 중심"
      },
      flight: {
        airline: "대한항공 (Korean Air)",
        airlineCode: "KE",
        type: "직항 (Direct)",
        outbound: {
          flightNo: "KE931",
          depTime: "14:05",
          depAirport: "인천 (ICN)",
          arrTime: "19:35",
          arrAirport: "로마 피우미치노 (FCO)",
          duration: "13시간 30분"
        },
        inbound: {
          flightNo: "KE932",
          depTime: "22:00",
          depAirport: "로마 피우미치노 (FCO)",
          arrTime: "17:25 (+1일)",
          arrAirport: "인천 (ICN)",
          duration: "11시간 25분"
        },
        pricing: {
          perPerson: 1822300,
          total: 7289200,
          discountNote: "KB국민카드 결제 조건 할인 적용가 (성인 1인당 1,822,300원)"
        }
      },
      budget: {
        total: 12329200,
        perPerson: 3082300,
        currency: "원 (KRW)",
        categories: [
          {
            id: "flight",
            name: "항공권",
            icon: "✈️",
            amount: 7289200,
            perPerson: 1822300,
            percentage: 59.1,
            desc: "대한항공 직항 왕복 4인 (KB카드 특가)"
          },
          {
            id: "accommodation",
            name: "숙소 (4박)",
            icon: "🏨",
            amount: 2000000,
            perPerson: 500000,
            percentage: 16.2,
            desc: "스페인 광장/판테온 인근 4성급 프리미엄 호텔 룸 2개 (엘리베이터 & 조식 포함)"
          },
          {
            id: "food",
            name: "식비 & 디저트",
            icon: "🍝",
            amount: 1400000,
            perPerson: 350000,
            percentage: 11.4,
            desc: "1일 4인 약 35만원 (트라토리아, 파인다이닝, 3대 에스프레소 & 젤라또)"
          },
          {
            id: "tours",
            name: "투어 & 입장권",
            icon: "🏛️",
            amount: 640000,
            perPerson: 160000,
            percentage: 5.2,
            desc: "바티칸 박물관 패스트트랙 단독 가이드, 콜로세움/포로로마노 패스트트랙, 보르게세 미술관"
          },
          {
            id: "transport",
            name: "현지 교통비",
            icon: "🚕",
            amount: 400000,
            perPerson: 100000,
            percentage: 3.2,
            desc: "공항 ↔ 시내 8인승 프라이빗 밴 왕복 + 시내 택시/우버 이용 (체력 안배)"
          },
          {
            id: "misc",
            name: "예비비 & 쇼핑",
            icon: "🎁",
            amount: 600000,
            perPerson: 150000,
            percentage: 4.9,
            desc: "기념품(올리브유, 발사믹, 와인), 유심/포켓와이파이, 여행자보험"
          }
        ]
      },
      itinerary: [
        {
          day: 1,
          date: "2월 3일 (화)",
          title: "로마 입국 & 편안한 첫날 휴식",
          badge: "입국 & 여독 해소",
          summary: "인천 공항 출발 후 로마 피우미치노 공항 도착. 예약된 프리미엄 밴으로 호텔 이동 후 숙면.",
          seniorTip: "💡 긴 비행 후 여독을 풀기 위해 첫날 밤은 일정 없이 전용 차량 이동 후 곧바로 휴식을 취합니다.",
          activities: [
            {
              time: "14:05",
              title: "인천국제공항(ICN) 출발",
              desc: "대한항공 KE931 탑승 (편안한 기내식 2회 제공 & 영화 감상)",
              icon: "✈️",
              tag: "항공"
            },
            {
              time: "19:35",
              title: "로마 피우미치노 공항(FCO) 도착",
              desc: "입국 심사 및 수하물 수령 (사전 패스트트랙 체크인 권장)",
              icon: "🛬",
              tag: "입국"
            },
            {
              time: "20:40",
              title: "프리미엄 8인승 밴 시내 이동",
              desc: "사전 기사 대기 밴 탑승. 짐 걱정 없이 스페인 광장 호텔까지 직행 (약 45분)",
              icon: "🚐",
              tag: "교통"
            },
            {
              time: "21:30",
              title: "호텔 체크인 & 숙면",
              desc: "호텔 가벼운 수프/클럽 샌드위치 간식 후 수면 (다음 날 일정을 위한 재충전)",
              icon: "🏨",
              tag: "휴식"
            }
          ]
        },
        {
          day: 2,
          date: "2월 4일 (수)",
          title: "로마의 심장: 역사 유적 & 낭만 명소 느긋하게 관람",
          badge: "고대 유적 & 카페",
          summary: "콜로세움 외관 관람, 트레비 분수, 판테온, 나보나 광장 코스. 무리 없는 택시 이동.",
          seniorTip: "💡 돌바닥이 많으므로 쿠션감 좋은 운동화 필수! 주요 명소 간 도보는 10분 이내로 제한하고 택시를 이용합니다.",
          activities: [
            {
              time: "09:30",
              title: "호텔 여유로운 조식 후 출발",
              desc: "호텔 뷔페 조식 후 전용 택시로 콜로세움 이동",
              icon: "🍳",
              tag: "식사"
            },
            {
              time: "10:00",
              title: "콜로세움 & 포로 로마노 외관 감상",
              desc: "웅장한 콜로세움 대표 포토존 사진 촬영 및 전경 감상",
              icon: "🏛️",
              tag: "관람",
              image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "12:30",
              title: "점심 식사 (Trattoria Luzzi)",
              desc: "현지인 추천 까르보나라, 피자 & 생맥주/와인 파스타 오찬",
              icon: "🍝",
              tag: "미식",
              image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "14:30",
              title: "트레비 분수 & 동전 던지기",
              desc: "택시 이동 후 트레비 분수에서 다시 로마에 오길 기원하는 동전 던지기",
              icon: "⛲",
              tag: "명소",
              image: "https://images.unsplash.com/photo-1525874684015-5837e8831055?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "16:00",
              title: "판테온 내부 관람 & 3대 카페 타짜도로",
              desc: "세계 최고의 콘크리트 돔 내부 감상 후 타짜도로 '비안코 에스프레소' 타임",
              icon: "☕",
              tag: "휴식",
              image: "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "18:00",
              title: "나보나 광장 & 야경 테라스 저녁",
              desc: "3대 분수가 빛나는 나보나 광장 산책 후 'Ristorante Mastrociccia'에서 로맨틱 저녁",
              icon: "🍷",
              tag: "저녁",
              image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=800&q=80"
            }
          ]
        },
        {
          day: 3,
          date: "2월 5일 (목)",
          title: "바티칸 시국 문화 예술 & 스페인 광장 럭셔리 가이드",
          badge: "바티칸 & 명품거리",
          summary: "대기 없는 바티칸 박물관 오전 패스트트랙 및 스페인 계단/콘도티 거리 명품관 투어.",
          seniorTip: "💡 바티칸 박물관은 매우 넓으므로 중간중간 휠체어/의자가 준비된 휴게 구역에서 15분씩 쉬어갑니다.",
          activities: [
            {
              time: "08:30",
              title: "바티칸 박물관 패스트트랙 모닝 투어",
              desc: "줄 서지 않는 오전 단독 한국어 가이드 입장 (시스티나 성당 천장화, 아테네 학당)",
              icon: "🎨",
              tag: "투어",
              image: "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "11:30",
              title: "성 베드로 대성당 관람",
              desc: "세계 최대 규모 성당 내부 감상 및 미켈란젤로의 '피에타' 조각상 감상",
              icon: "⛪",
              tag: "명소",
              image: "https://images.unsplash.com/photo-1576085898323-218337e3e43c?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "13:00",
              title: "점심 식사 (Ristorante Sorpasso)",
              desc: "바티칸 인근 최고급 하몽 & 생파스타 & 프레시 샐러드",
              icon: "🍽️",
              tag: "미식"
            },
            {
              time: "15:00",
              title: "스페인 광장 & 뽐삐(Pompi) 딸기 티라미수",
              desc: "'로마의 휴일' 영화 명소 스페인 계단과 달콤한 뽐삐 티라미수 맛보기",
              icon: "🍰",
              tag: "디저트",
              image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "17:00",
              title: "비아 콘도티 명품 쇼핑 & 티타임",
              desc: "어머니와 함께하는 여유로운 브랜드 쇼핑 및 1760년 개업 카페 'Caffè Greco' 에스프레소",
              icon: "🛍️",
              tag: "쇼핑",
              image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "19:30",
              title: "시티 뷰 파인다이닝 만찬",
              desc: "로마 시내가 한눈에 내다보이는 테라스 레스토랑에서 럭셔리 디너",
              icon: "🥂",
              tag: "저녁"
            }
          ]
        },
        {
          day: 4,
          date: "2월 6일 (금)",
          title: "보르게세 공원 힐링 산책 & 트라스테베레 골목 감성",
          badge: "힐링 & 미식",
          summary: "보르게세 미술관 조각상 감상, 전동 카트로 공원 숲길 둘러보기 및 트라스테베레 낭만 골목.",
          seniorTip: "💡 보르게세 공원에서는 도보 대신 4인용 전동 카트를 대여하여 어머니도 편안하고 즐겁게 둘러봅니다.",
          activities: [
            {
              time: "10:00",
              title: "보르게세 미술관 (사전 예약 패스트트랙)",
              desc: "베르니니의 '아폴론과 다프네' 등 살아 움직이는 듯한 대리석 조각상 관람",
              icon: "🏛️",
              tag: "미술관",
              image: "https://images.unsplash.com/photo-1581337204873-ef36aa186caa?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "12:00",
              title: "보르게세 공원 4인용 전동 카트 산책",
              desc: "울창한 공원 숲길을 전동 카트로 바람을 맞으며 편안하게 드라이브",
              icon: "🛺",
              tag: "힐링",
              image: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "13:30",
              title: "점심 식사 (Osteria Barberini)",
              desc: "이탈리아 최고급 트러플(송로버섯) 뇨끼 & 파스타 오찬",
              icon: "🍄",
              tag: "미식"
            },
            {
              time: "16:00",
              title: "트라스테베레(Trastevere) 감성 골목 탐방",
              desc: "아기자기한 핸드메이드 공방, 아티스트 카페, 꽃 장식 골목 풍경 감상",
              icon: "📸",
              tag: "산책",
              image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "19:00",
              title: "로마 마지막 밤: 피렌체식 티본 스테이크 만찬",
              desc: "최고급 티본 스테이크(Bistecca alla Fiorentina)와 키안티 클라시코 레드 와인으로 축배",
              icon: "🥩",
              tag: "만찬",
              image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
            }
          ]
        },
        {
          day: 5,
          date: "2월 7일 (토)",
          title: "기념품 선물 쇼핑 & 피우미치노 공항 귀국 (FCO 22:00)",
          badge: "쇼핑 & 귀국",
          summary: "체크아웃 후 기념품 구매, 전통 카페 브런치 후 공항 이동 및 22:00 대한항공 귀국편 탑승.",
          seniorTip: "💡 늦은 밤 비행기이므로 공항에 3시간 30분 전 도착하여 수하물 수속 및 택스리펀, 공항 라운지 휴식을 취합니다.",
          activities: [
            {
              time: "11:00",
              title: "호텔 체크아웃 & 프리미엄 짐 보관",
              desc: "체크아웃 후 호텔 벨데스크에 짐을 안전하게 맡기고 편안한 복장 출발",
              icon: "🧳",
              tag: "체크아웃"
            },
            {
              time: "11:30",
              title: "이탈리아 특산품 & 쇼핑 (Eataly / 마트)",
              desc: "엑스트라 버진 올리브오일, 모데나 발사믹 식초, 트러플 오일, 마르비스 치약, 포켓 커피 구매",
              icon: "🛍️",
              tag: "쇼핑"
            },
            {
              time: "13:30",
              title: "굿바이 브런치 & 카푸치노",
              desc: "전통 앤틱 분위기의 카페에서 샌드위치, 브런치 & 카푸치노 타임",
              icon: "🥪",
              tag: "식사"
            },
            {
              time: "17:30",
              title: "호텔 짐 픽업 ➔ 피우미치노 공항(FCO) 샌딩",
              desc: "예약된 전용 픽업 밴으로 편안하게 공항까지 이동 (약 40~50분)",
              icon: "🚐",
              tag: "교통"
            },
            {
              time: "18:30",
              title: "FCO 공항 수속 & 택스 리펀(Tax Refund)",
              desc: "대한항공 카운터 체크인, 수하물 수탁 및 명품 쇼핑건 택스리펀 환급 진행",
              icon: "💶",
              tag: "공항"
            },
            {
              time: "22:00",
              title: "대한항공 KE932 귀국편 탑승",
              desc: "로마 출발 ➔ 다음날(2/8 일요일) 17:25 인천국제공항(ICN) 안전하게 도착",
              icon: "✈️",
              tag: "귀국"
            }
          ]
        }
      ],
      seniorGuideTips: [
        {
          title: "👟 보행 및 신발 선택",
          desc: "로마 시내는 울퉁불퉁한 '삼판토니(Sampietrini)' 돌바닥이 많습니다. 구두나 얇은 슬리퍼 대신 쿠션감이 풍부한 편안한 운동화를 착용해 주세요."
        },
        {
          title: "🚕 택시 & 프라이빗 이동",
          desc: "지하철 계단 이동은 체력 부담이 큽니다. 시내 이동 시 Uber Black이나 FreeNow 앱 택시를 적극 활용하며, 공항 이동 시엔 8인승 프라이빗 밴을 이용합니다."
        },
        {
          title: "🎟️ 대기 시간 제로 (패스트트랙)",
          desc: "바티칸 박물관과 콜로세움은 일반 대기 시 1~2시간 이상 소요됩니다. 모든 핵심 유적지는 패스트트랙 사전 예약 티켓으로 대기 없이 입장합니다."
        },
        {
          title: "💧 수분 보충 및 화장실",
          desc: "이탈리아 카페(Bar)에서 에스프레소 한 잔(약 1.5유로)을 주문하면 깨끗한 화장실을 이용할 수 있으므로, 1~2시간마다 카페 휴식을 취하는 것을 추천합니다."
        }
      ]
    },
    rome_milan: {
      id: "rome_milan",
      name: "로마-베네치아-밀라노",
      country: "이탈리아 🇮🇹",
      title: "영원의 도시 로마 & 물의 도시 베네치아 & 패션의 수도 밀라노 6일 종단 여행",
      subtitle: "어머니와 자녀 3명이 함께 떠나는 로마 역사 탐방 + 베네치아 곤돌라 & 밀라노 두오모 루프탑 힐링 여정",
      heroImage: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=1600&auto=format&fit=crop",
      status: "active",
      dates: {
        departure: "2027.02.03 (수)",
        return: "2027.02.08 (월)",
        duration: "6일 (현지 5박 6일)"
      },
      travelers: {
        total: 4,
        composition: "4인가족",
        style: "로마 2박 + 베네치아 1박 + 밀라노 1박, 초고속 열차 비즈니스석, 수상 택시 & 두오모 엘리베이터"
      },
      flight: {
        airline: "대한항공 (Korean Air)",
        airlineCode: "KE",
        type: "직항 (Direct - 로마 입국 / 밀라노 출국)",
        outbound: {
          flightNo: "KE931",
          depTime: "14:05",
          depAirport: "인천 (ICN)",
          arrTime: "19:35",
          arrAirport: "로마 피우미치노 (FCO)",
          duration: "13시간 30분"
        },
        inbound: {
          flightNo: "KE928",
          depTime: "20:00",
          depAirport: "밀라노 말펜사 (MXP)",
          arrTime: "15:35 (+1일)",
          arrAirport: "인천 (ICN)",
          duration: "11시간 35분"
        },
        pricing: {
          perPerson: 1950000,
          total: 7800000,
          discountNote: "대한항공 로마 입국 / 밀라노 출국 다구간 직항 특가 (성인 1인당 1,950,000원)"
        }
      },
      budget: {
        total: 13900000,
        perPerson: 3475000,
        currency: "원 (KRW)",
        categories: [
          {
            id: "flight",
            name: "항공권",
            icon: "✈️",
            amount: 7800000,
            perPerson: 1950000,
            percentage: 56.1,
            desc: "대한항공 로마/밀라노 다구간 직항 4인"
          },
          {
            id: "accommodation",
            name: "숙소 (4박)",
            icon: "🏨",
            amount: 2400000,
            perPerson: 600000,
            percentage: 17.3,
            desc: "로마 2박 + 베네치아 1박 + 밀라노 1박 4성급 호텔 룸 2개 (조식 포함)"
          },
          {
            id: "food",
            name: "식비 & 디저트",
            icon: "🍝",
            amount: 1600000,
            perPerson: 400000,
            percentage: 11.5,
            desc: "로마 까르보나라, 베네치아 먹물 파스타, 밀라노 리조또 & 에스프레소"
          },
          {
            id: "tours",
            name: "투어 & 열차/수상택시",
            icon: "🚆",
            amount: 1100000,
            perPerson: 275000,
            percentage: 7.9,
            desc: "이탈로 비즈니스석(로마-베네치아-밀라노), 베네치아 수상택시/곤돌라, 바티칸 & 두오모 패스트트랙"
          },
          {
            id: "transport",
            name: "현지 공항 픽업",
            icon: "🚕",
            amount: 400000,
            perPerson: 100000,
            percentage: 2.8,
            desc: "로마/밀라노 공항 8인승 프라이빗 밴 픽업 & 샌딩"
          },
          {
            id: "misc",
            name: "예비비 & 쇼핑",
            icon: "🎁",
            amount: 600000,
            perPerson: 150000,
            percentage: 4.4,
            desc: "이탈리아 올리브유, 밀라노 패션 선물, 유심 & 여행자보험"
          }
        ]
      },
      itinerary: [
        {
          day: 1,
          date: "2월 3일 (수)",
          title: "1일차: 인천 출발 ➔ 로마 입국 & 프라이빗 밴 호텔 이동",
          badge: "1일차: 인천-로마",
          summary: "인천 출발 ➔ 로마 피우미치노 공항 도착. 전용 밴으로 호텔까지 짐 편안하게 이동 후 첫날 휴식.",
          seniorTip: "💡 장시간 비행 후 여독 해소를 위해 첫날은 호텔 직행 후 편안하게 휴식을 취합니다.",
          activities: [
            {
              time: "14:05",
              title: "인천국제공항(ICN) 출발",
              desc: "대한항공 KE931 직항 탑승 (기내식 2회 제공)",
              icon: "✈️",
              tag: "항공"
            },
            {
              time: "19:35",
              title: "로마 피우미치노 공항(FCO) 도착",
              desc: "입국 심사 및 수하물 수령 후 기사 피켓 대기 장소로 이동",
              icon: "🛬",
              tag: "입국"
            },
            {
              time: "20:40",
              title: "프리미엄 8인승 밴 시내 이동",
              desc: "스페인 광장 부근 호텔까지 45분 직행 (짐 걱정 없는 시니어 맞춤 이동)",
              icon: "🚐",
              tag: "교통"
            },
            {
              time: "21:30",
              title: "호텔 체크인 & 숙면",
              desc: "로마 시내 4성급 호텔 체크인 및 편안한 수면",
              icon: "🏨",
              tag: "휴식"
            }
          ]
        },
        {
          day: 2,
          date: "2월 4일 (목)",
          title: "2일차: 로마 핵심 유적 탐방 & 바티칸 박물관 패스트트랙",
          badge: "2일차: 로마",
          summary: "콜로세움 외관 포토존, 트레비 분수, 판테온 및 바티칸 박물관 단독 가이드 관람.",
          seniorTip: "💡 콜로세움과 트레비 분수는 택시로 이동하여 어머니 도보 동선을 최적화합니다.",
          activities: [
            {
              time: "09:30",
              title: "콜로세움 & 포로 로마노 관람",
              desc: "웅장한 콜로세움 포토존 가족 사진 촬영",
              icon: "🏛️",
              tag: "관람",
              image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "12:00",
              title: "점심 식사 (Trattoria 전통 파스타)",
              desc: "로마 전통 까르보나라 & 생파스타 오찬",
              icon: "🍝",
              tag: "미식",
              image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "14:00",
              title: "트레비 분수 & 판테온 관람",
              desc: "트레비 분수 동전 던지기 및 3대 카페 타짜도로 에스프레소 휴식",
              icon: "☕",
              tag: "명소",
              image: "https://images.unsplash.com/photo-1525874684015-5837e8831055?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "16:00",
              title: "바티칸 박물관 패스트트랙 입장",
              desc: "대기 없는 한국어 가이드 단독 투어 (시스티나 천장화)",
              icon: "🎨",
              tag: "투어",
              image: "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "19:00",
              title: "로마 가든 테라스 디너",
              desc: "로마 야경이 내다보이는 테라스 레스토랑 와인 만찬",
              icon: "🍷",
              tag: "저녁"
            }
          ]
        },
        {
          day: 3,
          date: "2월 5일 (금)",
          title: "3일차: 로마 보르게세 공원 힐링 산책 & 스페인 광장 명품 거리",
          badge: "3일차: 로마",
          summary: "보르게세 미술관 감상, 전동 카트로 숲길 드라이브, 스페인 계단 뽐삐 티라미수 & 명품 쇼핑.",
          seniorTip: "💡 보르게세 공원에서는 도보 대신 4인용 전동 카트를 대여하여 어머니도 편안하게 둘러봅니다.",
          activities: [
            {
              time: "10:00",
              title: "보르게세 미술관 & 전동 카트 산책",
              desc: "미술관 대리석 조각상 감상 후 4인용 전동 카트로 숲길 드라이브",
              icon: "🛺",
              tag: "힐링",
              image: "https://images.unsplash.com/photo-1581337204873-ef36aa186caa?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "12:30",
              title: "점심 식사 (Osteria Barberini)",
              desc: "이탈리아 최고급 트러플(송로버섯) 파스타 오찬",
              icon: "🍄",
              tag: "미식"
            },
            {
              time: "14:30",
              title: "스페인 광장 & 뽐삐(Pompi) 딸기 티라미수",
              desc: "스페인 계단 전경 감상 및 뽐삐 티라미수 디저트 타임",
              icon: "🍰",
              tag: "디저트",
              image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "16:30",
              title: "비아 콘도티 명품 쇼핑 & Caffè Greco",
              desc: "여유로운 명품 브랜드 쇼핑 및 1760년 전통 카페 에스프레소",
              icon: "🛍️",
              tag: "쇼핑",
              image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "19:00",
              title: "트라스테베레 낭만 골목 저녁 만찬",
              desc: "로마의 아기자기한 트라스테베레 골목 레스토랑에서 로맨틱 디너",
              icon: "🥩",
              tag: "만찬",
              image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
            }
          ]
        },
        {
          day: 4,
          date: "2월 6일 (토)",
          title: "4일차: 로마 ➔ 베네치아 이동 (고속열차) & 물의 도시 곤돌라 감성",
          badge: "4일차: 로마-베네치아",
          summary: "로마 테르미니역에서 이탈로 초고속 열차 탑승(3시간 45분) 후 베네치아 도착. 수상 택시, 산 마르코 광장 & 곤돌라 투어.",
          seniorTip: "💡 베네치아 섬 도착 후 계단 다리가 많으므로 호텔까지 프라이빗 수상 택시(Water Taxi)로 짐 부담 없이 바로 이동합니다.",
          activities: [
            {
              time: "09:30",
              title: "로마 테르미니역 ➔ 베네치아 산타루치아역 (Italo 비즈니스)",
              desc: "시속 300km 이탈로 초고속 열차 비즈니스석 탑승 (3시간 45분 이동)",
              icon: "🚆",
              tag: "열차",
              image: "https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "13:15",
              title: "베네치아 산타루치아역 도착 & 프라이빗 수상 택시",
              desc: "역 앞 전용 수상 택시 탑승 ➔ 대운하(Grand Canal)를 지나 호텔 도크에 직접 하차",
              icon: "🚤",
              tag: "수상택시",
              image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "14:00",
              title: "점심 식사 (베네치아 해산물 먹물 파스타)",
              desc: "대운하 전망 테라스에서 프레시 해산물 파스타 & 먹물 리조또 오찬",
              icon: "🦐",
              tag: "미식",
              image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "16:00",
              title: "산 마르코 광장 & 리알토 다리 산책",
              desc: "나폴레옹이 세상에서 가장 아름다운 접견실이라 칭송한 산 마르코 광장 및 리알토 다리 감상",
              icon: "🏛️",
              tag: "명소",
              image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "17:30",
              title: "프라이빗 곤돌라(Gondola) 선셋 투어",
              desc: "베네치아 낭만 곤돌라에 탑승하여 수로를 노닐며 석양 노을 감상",
              icon: "🚣‍♂️",
              tag: "곤돌라",
              image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "19:30",
              title: "베네치아 운하 뷰 디너",
              desc: "운하 야경이 비치는 식당에서 베네토 와인과 해산물 만찬",
              icon: "🍷",
              tag: "저녁"
            }
          ]
        },
        {
          day: 5,
          date: "2월 7일 (일)",
          title: "5일차: 베네치아 ➔ 밀라노 이동 & 두오모 루프탑 관람 후 출국 (MXP 20:00 out)",
          badge: "5일차: 베네치아-밀라노-out",
          summary: "베네치아에서 밀라노 고속열차 이동(2시간 25분). 두오모 루프탑 패스트트랙, 갤러리아 아케이드 산책 후 16:30 공항 이동 및 20:00 귀국편 out.",
          seniorTip: "💡 밀라노 두오모 지붕 전망대는 엘리베이터 패스트트랙으로 올라가 어머니도 편안하게 시내 전경을 감상합니다.",
          activities: [
            {
              time: "09:30",
              title: "베네치아 산타루치아역 ➔ 밀라노 중앙역 (고속열차)",
              desc: "초고속 열차 탑승 (2시간 25분 편안한 이동)",
              icon: "🚆",
              tag: "열차"
            },
            {
              time: "12:00",
              title: "밀라노 중앙역 도착 & 짐 보관",
              desc: "밀라노 중앙역 짐 보관 서비스(FrecciaClub) 수탁 후 가벼운 차림 이동",
              icon: "🧳",
              tag: "짐보관"
            },
            {
              time: "12:40",
              title: "점심 식사 (밀라노 샤프란 리조또)",
              desc: "밀라노 대표 명물 리조또 & 오소부코 맛집 오찬",
              icon: "🍽️",
              tag: "미식",
              image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "14:00",
              title: "밀라노 두오모 루프탑 (엘리베이터 패스트트랙)",
              desc: "첨탑 조각상과 밀라노 시내가 내다보이는 루프탑 전망대 관람",
              icon: "🏰",
              tag: "두오모",
              image: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "15:30",
              title: "갤러리아 비토리오 에마누엘레 2세 산책 & 카페 Cova",
              desc: "화려한 유리아케이드 산책 및 1817년 개업 카페 에스프레소 휴식",
              icon: "☕",
              tag: "카페"
            },
            {
              time: "16:30",
              title: "밀라노 짐 픽업 ➔ 말펜사 공항(MXP) 샌딩 밴",
              desc: "사전 예약된 프라이빗 픽업 밴으로 말펜사 공항 직행 (약 50분)",
              icon: "🚐",
              tag: "교통"
            },
            {
              time: "17:30",
              title: "MXP 공항 수속 & 택스 리펀(Tax Refund)",
              desc: "대한항공 카운터 체크인, 수하물 위탁 및 택스리펀 환급 진행",
              icon: "💶",
              tag: "공항"
            },
            {
              time: "20:00",
              title: "대한항공 KE928 귀국편 out 탑승",
              desc: "밀라노 출발 ➔ 다음날(2/8 월요일) 15:35 인천국제공항(ICN) 도착",
              icon: "✈️",
              tag: "귀국out"
            }
          ]
        },
        {
          day: 6,
          date: "2월 8일 (월)",
          title: "6일차: 인천국제공항 도착 & 즐거운 가족 여행 마무리",
          badge: "6일차: 인천 도착",
          summary: "15:35 인천 공항 도착 후 수하물 수령 및 프라이빗 밴 편안한 귀가.",
          seniorTip: "💡 공항 도착 후 전용 샌딩 차량으로 자택까지 안전하게 이동합니다.",
          activities: [
            {
              time: "15:35",
              title: "인천국제공항(ICN) 도착",
              desc: "입국 심사 및 수하물 수령 후 가족 귀가 밴 탑승",
              icon: "🛬",
              tag: "도착"
            }
          ]
        }
      ],
      seniorGuideTips: [
        {
          title: "🚆 이탈리아 고속열차(Italo) 비즈니스석",
          desc: "로마 ➔ 베네치아 ➔ 밀라노 이동 시 이탈로 비즈니스(Prima) 좌석을 이용합니다. 짐 보관 공간이 넓고 좌석이 안락해 어머니의 체력 부담을 줄여드립니다."
        },
        {
          title: "🚤 베네치아 프라이빗 수상 택시",
          desc: "베네치아에서는 계단 다리 도보 이동을 줄이기 위해 역과 호텔 사이를 프라이빗 수상 택시(Water Taxi)로 편안하게 이동합니다."
        },
        {
          title: "🏰 밀라노 두오모 엘리베이터 패스트트랙",
          desc: "두오모 성당 루프탑 관람 시 계단을 오르지 않고 전용 엘리베이터 패스트트랙 티켓을 사용하여 안전하고 수월하게 관람합니다."
        },
        {
          title: "💶 다구간 공항 샌딩 & 택스리펀",
          desc: "로마 입국과 밀라노 출국 시 모두 8인승 프라이빗 밴 차량이 대기하므로 캐리어 짐 걱정이 없습니다. 마지막 날 밀라노 말펜사 공항에서 택스리펀을 진행합니다."
        }
      ]
    },
    barcelona: {
      id: "barcelona",
      name: "바르셀로나",
      country: "스페인 🇪🇸",
      title: "지중해의 낭만과 가우디 건축 예술, 바르셀로나 5일 힐링 여행",
      subtitle: "어머니와 자녀 3명이 함께 떠나는 편안하고 감성 넘치는 스페인 여정",
      heroImage: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=1600&auto=format&fit=crop",
      status: "active",
      dates: {
        departure: "2026.02.03 (화)",
        return: "2026.02.07 (토)",
        duration: "5일 (현지 4박 5일)"
      },
      travelers: {
        total: 4,
        composition: "4인가족",
        style: "가우디 명소 패스트트랙, 지중해 해산물 미식, 프라이빗 공항 픽업 & 택시 위주"
      },
      flight: {
        airline: "아시아나항공 (Asiana Airlines)",
        airlineCode: "OZ",
        type: "직항 (Direct)",
        outbound: {
          flightNo: "OZ511",
          depTime: "12:00",
          depAirport: "인천 (ICN)",
          arrTime: "18:55",
          arrAirport: "바르셀로나 (BCN)",
          duration: "14시간 55분"
        },
        inbound: {
          flightNo: "OZ512",
          depTime: "20:40",
          depAirport: "바르셀로나 (BCN)",
          arrTime: "17:00 (+1일)",
          arrAirport: "인천 (ICN)",
          duration: "12시간 20분"
        },
        pricing: {
          perPerson: 1847700,
          total: 7390800,
          discountNote: "KB국민카드 결제 조건 할인 적용가 (성인 1인당 1,847,700원)"
        }
      },
      budget: {
        total: 12270800,
        perPerson: 3067700,
        currency: "원 (KRW)",
        categories: [
          {
            id: "flight",
            name: "항공권",
            icon: "✈️",
            amount: 7390800,
            perPerson: 1847700,
            percentage: 60.2,
            desc: "아시아나항공 직항 왕복 4인 (KB카드 특가)"
          },
          {
            id: "accommodation",
            name: "숙소 (4박)",
            icon: "🏨",
            amount: 1800000,
            perPerson: 450000,
            percentage: 14.7,
            desc: "그라시아 거리/까탈루냐 광장 인근 4성급 부티크 호텔 룸 2개 (조식 포함)"
          },
          {
            id: "food",
            name: "식비 & 타파스/빠에야",
            icon: "🥘",
            amount: 1400000,
            perPerson: 350000,
            percentage: 11.4,
            desc: "해산물 빠에야, 먹물 리조또, 고급 타파스 바, 츄러스 & 하몽 미식"
          },
          {
            id: "tours",
            name: "투어 & 입장권",
            icon: "⛪",
            amount: 680000,
            perPerson: 170000,
            percentage: 5.5,
            desc: "사그라다 파밀리아 타워 패스트트랙 가이드, 구엘 공원, 카사 바트요, 플라멩코 공연"
          },
          {
            id: "transport",
            name: "현지 교통비",
            icon: "🚕",
            amount: 400000,
            perPerson: 100000,
            percentage: 3.3,
            desc: "공항 ↔ 시내 8인승 프라이빗 밴 왕복 + 시내 택시/우버 이용"
          },
          {
            id: "misc",
            name: "예비비 & 쇼핑",
            icon: "🎁",
            amount: 600000,
            perPerson: 150000,
            percentage: 4.9,
            desc: "스페인 뚜론(Turron), 꿀국화차, 올리브오일 선물 구매, 유심/보험"
          }
        ]
      },
      itinerary: [
        {
          day: 1,
          date: "2월 3일 (화)",
          title: "바르셀로나 입국 & 편안한 첫날 휴식",
          badge: "입국 & 프라이빗 픽업",
          summary: "인천 공항 출발 후 바르셀로나 엘프라트 공항 도착. 프라이빗 밴으로 호텔 이동 및 숙면.",
          seniorTip: "💡 약 15시간 비행 후 여독 해소를 위해 도착 직후 밴 차량으로 호텔 직행 후 편안하게 휴식합니다.",
          activities: [
            {
              time: "12:00",
              title: "인천국제공항(ICN) 출발",
              desc: "아시아나항공 OZ511 탑승 (기내식 2회 & 최신 엔터테인먼트 감상)",
              icon: "✈️",
              tag: "항공"
            },
            {
              time: "18:55",
              title: "바르셀로나 엘프라트 공항(BCN) 도착",
              desc: "입국 심사 및 수하물 수령 (사전 패스트트랙 체크인)",
              icon: "🛬",
              tag: "입국"
            },
            {
              time: "20:00",
              title: "프리미엄 8인승 밴 시내 이동",
              desc: "사전 피켓 기사 대기. 짐 부담 없이 그라시아 거리 호텔까지 30분 직행",
              icon: "🚐",
              tag: "교통"
            },
            {
              time: "20:40",
              title: "호텔 체크인 & 따뜻한 간식",
              desc: "4성급 부티크 호텔 체크인 후 따뜻한 클럽 샌드위치/수프 간식 후 숙면",
              icon: "🏨",
              tag: "휴식"
            }
          ]
        },
        {
          day: 2,
          date: "2월 4일 (수)",
          title: "가우디 거장 코스: 사그라다 파밀리아 & 카사 바트요",
          badge: "가우디 핵심",
          summary: "대기 없는 성가족 성당 타워 엘리베이터 패스트트랙 및 그라시아 명품관 거리 산책.",
          seniorTip: "💡 성가족 성당 내부는 수직 엘리베이터로 이동하며, 내부 성당 의자에 앉아 스테인드글라스 빛의 무지개를 느긋하게 감상합니다.",
          activities: [
            {
              time: "09:30",
              title: "호텔 뷔페 조식 후 출발",
              desc: "호텔 조식 후 전용 택시로 사그라다 파밀리아 이동 (약 10분)",
              icon: "🍳",
              tag: "식사"
            },
            {
              time: "10:00",
              title: "사그라다 파밀리아 (성가족 성당) 패스트트랙 입장",
              desc: "줄 서지 않는 한국어 단독 가이드 투어 및 타워 엘리베이터 관람",
              icon: "⛪",
              tag: "투어",
              image: "https://images.unsplash.com/photo-1583778176476-4a8b02a64c01?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "12:30",
              title: "점심 식사 (Can Majó 또는 해산물 전문점)",
              desc: "바르셀로나 최고급 먹물 빠에야(Paella Negra) & 지중해 하몽 샐러드",
              icon: "🥘",
              tag: "미식"
            },
            {
              time: "15:00",
              title: "카사 바트요 & 카사 밀라 가우디 주택 외관 감상",
              desc: "바다 속과 산을 형상화한 가우디의 대표 건축물 포토존 사진 촬영",
              icon: "🏛️",
              tag: "관람"
            },
            {
              time: "16:30",
              title: "스페인 전통 츄러스 명가 'Granja M.Viader'",
              desc: "1870년 개업 맛집에서 따뜻한 초콜렛에 찍어먹는 갓 튀긴 츄러스 디저트 타임",
              icon: "☕",
              tag: "휴식"
            },
            {
              time: "18:30",
              title: "그라시아 거리 미식 타파스 저녁",
              desc: "스페인 명품 거리 야경 산책 후 고급 타파스 바 'Ciudad Condal'에서 와인과 타파스",
              icon: "🍷",
              tag: "저녁"
            }
          ]
        },
        {
          day: 3,
          date: "2월 5일 (목)",
          title: "동화 속 구엘 공원 산책 & 지중해 바르셀로네타 해변",
          badge: "공원 & 지중해",
          summary: "구엘 공원 숲길 둘러보기, 지중해 바다 전망 점심 및 플라멩코 명품 관람.",
          seniorTip: "💡 구엘 공원 입구는 경사가 있으므로 공원 상부 주차장까지 택시로 이동하여 내리막길로 편안하게 관람합니다.",
          activities: [
            {
              time: "10:00",
              title: "구엘 공원 (Park Güell) 패스트트랙 관람",
              desc: "가우디 타일 도마뱀 분수대, 곡선 벤치에서 지중해 바다 배경 가족 사진 촬영",
              icon: "🦎",
              tag: "공원"
            },
            {
              time: "12:30",
              title: "지중해 해변 런치 (Ristorante 7 Portes)",
              desc: "1836년 개업 전통의 해산물 빠에야 & 감바스 알 아히요 맛집",
              icon: "🦐",
              tag: "미식"
            },
            {
              time: "14:30",
              title: "바르셀로네타 해변 프롬나드 산책",
              desc: "탁 트인 지중해 바닷바람과 벤치에서 여유로운 야외 티타임",
              icon: "🌊",
              tag: "힐링"
            },
            {
              time: "16:30",
              title: "고딕 지구 & 바르셀로나 대성당 골목 탐방",
              desc: "중세 골목의 고풍스러운 분위기 및 아기자기한 공방 숍 구경",
              icon: "📸",
              tag: "산책"
            },
            {
              time: "19:00",
              title: "스페인 정통 플라멩코 공연 & 코스 디너",
              desc: "열정적인 음악과 무용이 펼쳐지는 명품 플라멩코 쇼 관람하며 저녁 식사",
              icon: "💃",
              tag: "공연"
            }
          ]
        },
        {
          day: 4,
          date: "2월 6일 (금)",
          title: "몬주익 언덕 힐링 전경 & 스페인 쇼핑 라이프",
          badge: "전망 & 쇼핑",
          summary: "택시로 몬주익 언덕 올라 시내 전경 감상, 그라시아 명품 쇼핑 및 마지막 밤 만찬.",
          seniorTip: "💡 몬주익 언덕은 케이블카나 택시로 이동하여 계단 없이 탁 트인 바르셀로나 항구 전경을 감상합니다.",
          activities: [
            {
              time: "10:30",
              title: "몬주익 언덕 & 파노라마 전망대",
              desc: "바르셀로나 도시 전체와 지중해 항구가 한눈에 내다보이는 대표 전망대",
              icon: "🏔️",
              tag: "전망"
            },
            {
              time: "12:30",
              title: "점심 식사 (El Nacional)",
              desc: "화려한 인테리어의 명품 푸드 홀에서 최고급 하몽, 안심 스테이크 오찬",
              icon: "🍽️",
              tag: "미식"
            },
            {
              time: "14:30",
              title: "그라시아 거리 스페인 브랜드 쇼핑",
              desc: "스페인 대표 명품 브랜드 Loewe, Camper, Zara 등 어머니와 여유로운 쇼핑",
              icon: "🛍️",
              tag: "쇼핑"
            },
            {
              time: "17:00",
              title: "카페 카푸치노 & 젤라또 타임",
              desc: "쇼핑 후 테라스 카페에서 오렌지 주스 & 카푸치노 휴식",
              icon: "🍊",
              tag: "휴식"
            },
            {
              time: "19:30",
              title: "바르셀로나 마지막 밤: 지중해 와인 & 해산물 만찬",
              desc: "상그리아(Sangria) 와인과 랍스터 리조또로 즐거운 여행 축하 저녁",
              icon: "🥂",
              tag: "만찬"
            }
          ]
        },
        {
          day: 5,
          date: "2월 7일 (토)",
          title: "특산품 선물 쇼핑 & 귀국 (BCN 20:40 출발)",
          badge: "쇼핑 & 귀국",
          summary: "보케리아 시장 특산품 구매, 여유로운 브런치 후 16:30 공항 샌딩 밴 이동.",
          seniorTip: "💡 보케리아 시장은 인파가 많으므로 어머니 가방을 앞으로 메고, 1시간 이내로 선물(뚜론, 꿀차) 구매 후 카페로 이동합니다.",
          activities: [
            {
              time: "11:00",
              title: "호텔 체크아웃 & 프리미엄 짐 보관",
              desc: "체크아웃 후 호텔 벨데스크에 짐을 맡기고 가벼운 차림 출발",
              icon: "🧳",
              tag: "체크아웃"
            },
            {
              time: "11:30",
              title: "보케리아 재래시장 선물 쇼핑",
              desc: "스페인 수제 뚜론(Turron), 꿀국화차(Manzanilla con Miel), 최고급 올리브유 구매",
              icon: "🍯",
              tag: "쇼핑"
            },
            {
              time: "13:30",
              title: "굿바이 브런치 & 카푸치노",
              desc: "까탈루냐 광장 부근 전통 카페에서 클럽 샌드위치 & 카푸치노 타임",
              icon: "🥪",
              tag: "식사"
            },
            {
              time: "16:30",
              title: "호텔 짐 픽업 ➔ 엘프라트 공항(BCN) 샌딩",
              desc: "예약된 전용 픽업 밴으로 편안하게 공항 이동 (약 25~30분 소요)",
              icon: "🚐",
              tag: "교통"
            },
            {
              time: "17:30",
              title: "BCN 공항 수속 & 택스 리펀(Tax Refund)",
              desc: "아시아나 카운터 수하물 위탁 및 쇼핑건 택스리펀 현금/카드 환급 진행",
              icon: "💶",
              tag: "공항"
            },
            {
              time: "20:40",
              title: "아시아나항공 OZ512 귀국편 탑승",
              desc: "바르셀로나 출발 ➔ 다음날(2/8 일요일) 17:00 인천국제공항(ICN) 도착",
              icon: "✈️",
              tag: "귀국"
            }
          ]
        }
      ],
      seniorGuideTips: [
        {
          title: "👜 소매치기 철저 예방",
          desc: "람블라스 거리와 보케리아 시장은 붐빕니다. 어머니 가방은 지퍼가 있는 크로스백으로 전면에 밀착하고 여권/큰돈은 호텔 세이프티 박스에 보관합니다."
        },
        {
          title: "🧂 음식 간 조절 (소금 적게)",
          desc: "스페인 음식은 기본 간이 짤 수 있습니다. 주문 시 'Sin Sal, por favor (씬 살 프르 파보르 - 소금 적게 부탁해요)'라고 요청하면 더욱 맛있게 드실 수 있습니다."
        },
        {
          title: "🎟️ 가우디 명소 사전 예약 패스트트랙",
          desc: "사그라다 파밀리아와 구엘 공원은 현장 표 매진이 흔합니다. 모두 한국어 가이드 포함 대기 없는 패스트트랙 예약으로 진행합니다."
        },
        {
          title: "🚕 언덕 관람 시 전용 택시 활용",
          desc: "구엘 공원과 몬주익 언덕은 경사 구간이 많습니다. 진입 시 상부 입구까지 택시로 이동하여 내리막 도보 동선으로 체력을 아낍니다."
        }
      ]
    },
    hawaii: {
      id: "hawaii",
      name: "하와이 (오아후)",
      country: "미국 🇺🇸",
      title: "알로하! 하와이 쉐라톤 와이키키 오션프론트 6일 힐링 여행",
      subtitle: "어머니와 자녀 3명의 쉐라톤 와이키키 럭셔리 휴양 + 오아후 1일 핵심 섬일주 투어 (하나투어 명품 패키지 스타일)",
      heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
      status: "active",
      dates: {
        departure: "2027.02.03 (수)",
        return: "2027.02.08 (월)",
        duration: "6일 (4박 6일 - 시차 적용)"
      },
      travelers: {
        total: 4,
        composition: "4인가족",
        style: "쉐라톤 와이키키 오션프론트룸 업그레이드, 1일 오아후 섬일주 투어, 전용 밴 픽업 & 노 쇼핑 패키지"
      },
      flight: {
        airline: "하와이안항공 (Hawaiian Airlines) / 대한항공",
        airlineCode: "HA",
        type: "직항 (Direct)",
        outbound: {
          flightNo: "HA460",
          depTime: "21:25",
          depAirport: "인천 (ICN)",
          arrTime: "10:20 (2/3 오전)",
          arrAirport: "호놀룰루 (HNL)",
          duration: "7시간 55분"
        },
        inbound: {
          flightNo: "HA459",
          depTime: "13:20 (2/7)",
          depAirport: "호놀룰루 (HNL)",
          arrTime: "19:15 (+1일 2/8)",
          arrAirport: "인천 (ICN)",
          duration: "10시간 55분"
        },
        pricing: {
          perPerson: 1880000,
          total: 7520000,
          discountNote: "하와이안항공/대한항공 직항 특가 (성인 1인당 1,880,000원)"
        }
      },
      budget: {
        total: 14000000,
        perPerson: 3500000,
        currency: "원 (KRW)",
        categories: [
          {
            id: "flight",
            name: "항공권",
            icon: "✈️",
            amount: 7520000,
            perPerson: 1880000,
            percentage: 53.7,
            desc: "하와이안항공/대한항공 직항 왕복 4인"
          },
          {
            id: "accommodation",
            name: "숙소 (4박)",
            icon: "🏨",
            amount: 3200000,
            perPerson: 800000,
            percentage: 22.9,
            desc: "쉐라톤 와이키키 오션프론트 룸 2개 (리조트피 & 인피니티 풀 이용 포함)"
          },
          {
            id: "food",
            name: "식비 & 미식",
            icon: "🥩",
            amount: 1600000,
            perPerson: 400000,
            percentage: 11.4,
            desc: "울프강 스테이크하우스, 노스쇼어 지오반니 새우트럭, 루아우 민속 만찬, 포케"
          },
          {
            id: "tours",
            name: "투어 & 입장권",
            icon: "🌺",
            amount: 800000,
            perPerson: 200000,
            percentage: 5.7,
            desc: "오아후 섬일주 단독 가이드 투어, 쿠알로아 랜치, 다이아몬드 헤드, 선셋 카타마란 크루즈"
          },
          {
            id: "transport",
            name: "현지 교통비",
            icon: "🚐",
            amount: 400000,
            perPerson: 100000,
            percentage: 2.9,
            desc: "공항 ↔ 쉐라톤 프라이빗 픽업/샌딩 밴 + 와이키키 핑크 트롤리 & 우버"
          },
          {
            id: "misc",
            name: "예비비 & 쇼핑",
            icon: "🎁",
            amount: 480000,
            perPerson: 120000,
            percentage: 3.4,
            desc: "코나 커피, 마카다미아 초콜릿, 미국 ESTA 비자, 여행자보험"
          }
        ]
      },
      itinerary: [
        {
          day: 1,
          date: "2월 3일 (수)",
          title: "알로하 하와이! 호놀룰루 시내 투어 & 쉐라톤 체크인",
          badge: "시내 투어 & 쉐라톤",
          summary: "인천 출발 ➔ 호놀룰루 오전 도착. 이올라니 궁전, 카카아코 벽화 산책 후 쉐라톤 와이키키 오션프론트 체크인.",
          seniorTip: "💡 시차(한국보다 19시간 늦음) 적응을 위해 첫날 낮에는 야외 햇살을 받으며 가벼운 시내 산책을 즐긴 후 일찍 수면을 취합니다.",
          activities: [
            {
              time: "21:25 (2/3)",
              title: "인천국제공항(ICN) 출발",
              desc: "하와이안항공 HA460 직항 탑승 (날짜변경선을 통과하여 시차 적용)",
              icon: "✈️",
              tag: "항공"
            },
            {
              time: "10:20 (2/3 오전)",
              title: "호놀룰루 다니엘 K. 이노우에 공항(HNL) 도착",
              desc: "미국 입국 심사 및 수하물 수령 후 단독 가이드 미팅",
              icon: "🛬",
              tag: "입국"
            },
            {
              time: "11:30",
              title: "호놀룰루 역사 시내 투어",
              desc: "하와이 왕국의 상징 '이올라니 궁전', '카메하메하 대왕 동상' 관람 및 사진 촬영",
              icon: "🏛️",
              tag: "관람",
              image: "https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "13:00",
              title: "카카아코(Kakaako) 트렌디 벽화 거리 & 점심",
              desc: "인생샷 포인트 카카아코 거리를 거닐고 하와이안 프레시 포케(Poke) 런치",
              icon: "🎨",
              tag: "미식",
              image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "15:00",
              title: "쉐라톤 와이키키 (Sheraton Waikiki) 체크인",
              desc: "와이키키 최고의 위치! 오션프론트(Ocean Front) 룸에서 펼쳐지는 에메랄드빛 태평양 감상",
              icon: "🏨",
              tag: "호텔",
              image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "18:00",
              title: "환영 저녁 식사 (울프강 스테이크하우스)",
              desc: "로열 하와이안 센터 명품 드라이에이징 포터하우스 스테이크 만찬",
              icon: "🥩",
              tag: "저녁",
              image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
            }
          ]
        },
        {
          day: 2,
          date: "2월 4일 (목)",
          title: "하나투어 추천: 오아후 섬일주 단독 가이드 1일 명소 관람",
          badge: "오아후 섬일주 1일",
          summary: "다이아몬드 헤드 전망, 쿠알로아 랜치, 노스쇼어 새우트럭, 돌 파인애플 농장, 와이켈레 아웃렛.",
          seniorTip: "💡 전용 8인승 밴으로 가이드가 명소 바로 앞까지 이동하므로 어머니께서 계단을 오르지 않고 편안하게 섬 전체를 관광할 수 있습니다.",
          activities: [
            {
              time: "09:00",
              title: "쉐라톤 호텔 로비 가이드 픽업 출발",
              desc: "맛있는 호텔 뷔페 조식 후 가이드 전용 밴 탑승",
              icon: "🚐",
              tag: "출발"
            },
            {
              time: "09:30",
              title: "다이아몬드 헤드 & 하노우마 베이 전망대",
              desc: "하와이의 상징 다이아몬드 헤드 외관 및 코발트빛 하노우마 해양보호구역 포토존",
              icon: "🌋",
              tag: "명소",
              image: "https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "10:30",
              title: "할로나 블로우홀 (Halona Blowhole)",
              desc: "바위 사이로 거대한 바닷물이 분수처럼 솟구치는 장관 감상",
              icon: "🌊",
              tag: "관람"
            },
            {
              time: "12:00",
              title: "쿠알로아 랜치 (Kualoa Ranch) 경관 관람",
              desc: "영화 '쥬라기 공원' 촬영지인 웅장한 산맥 전경 배경 가족 기념사진",
              icon: "🎬",
              tag: "투어",
              image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "13:00",
              title: "노스쇼어 할레이바 타운 & 지오반니 새우트럭 점심",
              desc: "하와이 대표 서핑 마일 마을 노스쇼어 및 유명 갈릭 버터 새우 요리 오찬",
              icon: "🦐",
              tag: "미식",
              image: "https://images.unsplash.com/photo-1559737525-470a1c1d044f?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "15:00",
              title: "돌 플랜테이션 (Dole Plantation) 파인애플 농장",
              desc: "상큼한 파인애플 소프트 젤라또 아이스크림 맛보기 및 기념품 구경",
              icon: "🍍",
              tag: "휴식",
              image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "16:30",
              title: "와이켈레 프리미엄 아웃렛 (Waikele Outlets)",
              desc: "코치, 폴로, 토리버치 등 스페셜 할인 아웃렛 자유 쇼핑 (약 1.5시간)",
              icon: "🛍️",
              tag: "쇼핑",
              image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "19:00",
              title: "호텔 복귀 및 시푸드 디너",
              desc: "쉐라톤 와이키키 복귀 후 해변 인근 메이킹 해산물 파인다이닝 식사",
              icon: "🦞",
              tag: "저녁"
            }
          ]
        },
        {
          day: 3,
          date: "2월 5일 (금)",
          title: "쉐라톤 와이키키 힐링 & 인피니티 풀 휴양",
          badge: "호캉스 & 루아우 쇼",
          summary: "쉐라톤 엣지 인피니티 풀에서 태평양 바다 감상, 알라모아나 쇼핑 및 저녁 루아우 민속 공연.",
          seniorTip: "💡 쉐라톤 와이키키의 'Edge Infinity Pool'은 수평선과 수영장이 이어져 어머니께 최고의 힐링을 선사합니다.",
          activities: [
            {
              time: "09:30",
              title: "쉐라톤 오션뷰 테라스 조식",
              desc: "파도 소리를 들으며 카푸치노와 오믈렛, 열대 과일 뷔페 조식",
              icon: "☕",
              tag: "식사"
            },
            {
              time: "10:30",
              title: "쉐라톤 엣지 인피니티 풀 & 와이키키 해변 힐링",
              desc: "세계 최고 수준의 인피니티 풀 카바나에서 여유로운 수영 & 선베드 휴식",
              icon: "🏊‍♀️",
              tag: "휴양",
              image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "13:00",
              title: "알라모아나 쇼핑센터 (Ala Moana Center) 브런치",
              desc: "세계 최대 야외 쇼핑몰 구경 및 하와이 마카다미아 펜케이크 브런치",
              icon: "🥞",
              tag: "미식",
              image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "16:00",
              title: "와이키키 핑크 트롤리 탑승 체험",
              desc: "지붕이 트인 핑크 트롤리를 타고 와이키키 해변 시원한 바람맞기",
              icon: "🚋",
              tag: "체험"
            },
            {
              time: "18:30",
              title: "하와이 정통 루아우(Luau) 민속 공연 & 코스 디너",
              desc: "우쿨렐레 연주, 훌라 댄스, 불쇼가 함께하는 환상적인 민속 공연 만찬",
              icon: "💃",
              tag: "공연",
              image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80"
            }
          ]
        },
        {
          day: 4,
          date: "2월 6일 (토)",
          title: "하와이 감성 힐링 & 와이키키 선셋 카타마란 크루즈",
          badge: "선셋 크루즈",
          summary: "카할라 고급 주택가 드라이브, 마노아 숲길 둘러보기 및 석양을 감상하는 요트 크루즈.",
          seniorTip: "💡 선셋 카타마란 요트는 흔들림이 적어 어머니도 안전하게 와이키키 노을을 감상하실 수 있습니다.",
          activities: [
            {
              time: "10:30",
              title: "카할라(Kahala) 고급 주택가 & 카임키 카페 거리",
              desc: "하와이의 비버리힐스 카할라 거리를 드라이브하고 아기자기한 로컬 카페 탐방",
              icon: "🚗",
              tag: "드라이브"
            },
            {
              time: "12:30",
              title: "점심 식사 (Teddy's Bigger Burgers)",
              desc: "하와이 3대 수제버거 맛집 아보카도 수제버거 오찬",
              icon: "🍔",
              tag: "미식"
            },
            {
              time: "14:30",
              title: "마노아 폴스 (Manoa) 녹음 숲길 산책",
              desc: "울창한 열대 우림과 피톤치드를 마시는 평지 위주 힐링 산책",
              icon: "🌿",
              tag: "산책",
              image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "17:00",
              title: "와이키키 선셋 카타마란 요트 크루즈",
              desc: "와이키키 바다 한가운데에서 음료를 마시며 주황빛 노을과 다이아몬드 헤드 감상",
              icon: "⛵",
              tag: "크루즈",
              image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80"
            },
            {
              time: "19:30",
              title: "하와이 마지막 밤: 해산물 파인다이닝 디너",
              desc: "쉐라톤 럼파이어(RumFire) 레스토랑에서 모히또 와인과 랍스터 요리로 축배",
              icon: "🥂",
              tag: "만찬"
            }
          ]
        },
        {
          day: 5,
          date: "2월 7일 (일)",
          title: "특산품 선물 쇼핑 & 호놀룰루 공항 귀국 (HNL 13:20 출발)",
          badge: "쇼핑 & 귀국",
          summary: "오션뷰 마지막 힐링, 하와이 특산품(코나 커피, 마카다미아) 구매 후 13:20 귀국편 탑승.",
          seniorTip: "💡 귀국 당일 오전은 호텔 체크아웃 후 전용 밴으로 공항에 2시간 30분 전 편안하게 이동합니다.",
          activities: [
            {
              time: "09:00",
              title: "호텔 체크아웃 준비 & 오션뷰 티타임",
              desc: "테라스에서 마지막으로 와이키키 파도를 바라보며 커피 한잔",
              icon: "☕",
              tag: "휴식"
            },
            {
              time: "10:00",
              title: "하와이 대표 선물 쇼핑 (ABC Store / 로열 하와이안)",
              desc: "100% 코나 커피, 마카다미아 초콜릿, 하와이안 호스트, 유기농 꿀 구매",
              icon: "🛍️",
              tag: "쇼핑"
            },
            {
              time: "10:40",
              title: "쉐라톤 체크아웃 & 공항 전용 밴 샌딩",
              desc: "예약된 전용 8인승 밴으로 호놀룰루 공항까지 이동 (약 25분 소요)",
              icon: "🚐",
              tag: "교통"
            },
            {
              time: "11:20",
              title: "HNL 공항 수속 & 면세점 구경",
              desc: "하와이안항공 카운터 수하물 위탁 및 면세점 선물 코너 관람",
              icon: "🛫",
              tag: "공항"
            },
            {
              time: "13:20",
              title: "하와이안항공 HA459 귀국편 탑승",
              desc: "호놀룰루 출발 ➔ 다음날(2/8 월요일) 19:15 인천국제공항(ICN) 도착",
              icon: "✈️",
              tag: "귀국"
            }
          ]
        },
        {
          day: 6,
          date: "2월 8일 (월)",
          title: "인천국제공항(ICN) 도착 및 여행 완료",
          badge: "인천 도착",
          summary: "19:15 인천 공항 도착, 입국 수속 후 안전하게 귀가.",
          seniorTip: "💡 시차로 인한 피로를 해소하도록 귀국 후 따뜻한 식사와 푹 쉬는 저녁 시간을 보냅니다.",
          activities: [
            {
              time: "19:15",
              title: "인천국제공항(ICN) 도착",
              desc: "입국 심사 및 수하물 수령 후 귀가 (가족 여행 완료)",
              icon: "🛬",
              tag: "도착"
            }
          ]
        }
      ],
      seniorGuideTips: [
        {
          title: "🌊 쉐라톤 와이키키 최고의 입지 & 엘리베이터",
          desc: "쉐라톤 와이키키는 해변 및 쇼핑몰과 바로 연결되어 도보 동선이 가장 짧으며, 인피니티 풀 수영장이 타 호텔과 비교 불가할 정도로 우수합니다."
        },
        {
          title: "☀️ 강렬한 햇빛 및 피부 보호",
          desc: "하와이는 자외선이 매우 강합니다. 어머니를 위해 챙이 넓은 모자, 선글라스, 얇은 긴소매 겉옷, SPF50+ 선크림을 철저히 준비해 주세요."
        },
        {
          title: "🚐 오아후 섬일주 단독 차량 수송",
          desc: "하나투어 핵심 구성처럼 1일 오아후 섬일주 투어는 계단이나 긴 보행 없이 가이드 전용 밴으로 명소 바로 앞까지 이동하여 체력을 보존합니다."
        },
        {
          title: "📄 미국 ESTA 비자 사전 발급",
          desc: "미국 입국을 위한 전자허가제(ESTA)는 한국 출발 최소 72시간 전 온라인 신청하여 여권 승인을 받아야 합니다."
        }
      ]
    }
  }
};
