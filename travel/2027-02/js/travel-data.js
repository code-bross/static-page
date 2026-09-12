/**
 * Travel Dashboard Data Store
 * Destination itineraries and estimated budgets
 */

const TRAVEL_DATA = {
  destinations: {
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
