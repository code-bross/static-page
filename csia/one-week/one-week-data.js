/**
 * CSIA 1주 완성 학습 데이터
 * 자동 분리 파일: one-week-data.js
 */
window.ONE_WEEK_DATA = [
  {
    "day": 1,
    "id": "day-1",
    "label": "DAY 1 · 1과목",
    "title": "경기·기업·기술·채권 분석",
    "description": "공식은 풀 수 있는 것만 남기고, 방향성과 개념 구분으로 득점합니다.",
    "tags": [
      "22문항",
      "경기 6 + 기본 5 + 기술 4 + 채권 7",
      "이해 + 선택 계산"
    ],
    "check": [
      {
        "q": "① 명목GDP 500, 실질GDP 400의 디플레이터?",
        "a": "500 ÷ 400 × 100 = 125입니다."
      },
      {
        "q": "② 금리가 오르면 채권가격은?",
        "a": "내립니다. 새 채권의 수익률이 높아져 기존 채권 가격이 조정됩니다."
      },
      {
        "q": "③ 골든크로스의 정확한 주체?",
        "a": "주가와 이평선이 아니라 단기 이동평균선이 장기 이동평균선을 상향 돌파하는 것입니다."
      }
    ],
    "sheetHtml": "<section class=\"section\"><h3>1. 경기순환의 언어</h3><p>경기는 한 나라의 실물·금융·해외 부문을 합친 총체적 경제활동 수준입니다. 시계열에는 네 가지 변동이 섞여 있습니다.</p><div class=\"number-grid\"><div class=\"number\"><b>추세</b>장기 성장 방향</div><div class=\"number\"><b>순환</b>추세 주변의 상승·하강</div><div class=\"number\"><b>계절</b>계절적 반복</div><div class=\"number\"><b>불규칙</b>태풍·팬데믹 등 일시 충격</div></div><p>경기분석에서는 계절·불규칙 변동을 제거합니다. 확장국면은 저점→정점, 수축국면은 정점→저점. 정점과 저점의 높이 차이는 순환진폭입니다.</p></section>\n          <section class=\"section\"><h3>2. 지표와 공식 — 이 3개는 풉니다</h3><div class=\"formula\">GDP 디플레이터 = 명목GDP ÷ 실질GDP × 100</div><div class=\"formula\">통화유통속도 V = 명목GDP ÷ 통화량</div><div class=\"formula\">통화공급 증가율 Mg = 물가 Pg + 실질성장 Yg − 유통속도 변화 Vg</div><p>GDP는 분기·연도별, 산업활동지표는 월별로 발표됩니다. CPI는 도시가계 생계비, PPI는 생산자 출하가격이며 PPI는 CPI에 선행하는 성격이 있습니다. M1은 당장 쓸 돈, M2는 M1 + 만기 2년 미만 예·적금, LF와 L로 갈수록 범위가 넓어집니다.</p><div class=\"callout\"><b>버리지 말 것</b> 디플레이터와 EC방식은 대입형입니다. Vg가 -1%면 ‘빼기 음수’이므로 더해지는 부호만 조심하세요.</div></section>\n          <section class=\"section\"><h3>3. 기본적분석 vs 기술적분석</h3><table class=\"compare\"><thead><tr><th>구분</th><th>기본적분석</th><th>기술적분석</th></tr></thead><tbody><tr><td data-label=\"구분\">질문</td><td data-label=\"기본적분석\">왜 이 가격인가?</td><td data-label=\"기술적분석\">앞으로 어느 방향인가?</td></tr><tr><td data-label=\"구분\">자료</td><td data-label=\"기본적분석\">재무·산업·경제 자료</td><td data-label=\"기술적분석\">과거 가격·거래량</td></tr><tr><td data-label=\"구분\">목표</td><td data-label=\"기본적분석\">내재가치 산정</td><td data-label=\"기술적분석\">차트 패턴으로 추세 예측</td></tr></tbody></table><p>일반적 기본적분석은 <b>경제 → 산업 → 기업</b>의 탑다운 방식입니다. 골든크로스는 단기 이평선이 장기 이평선을 상향 돌파하는 매수신호, 데드크로스는 하향 돌파하는 매도신호입니다.</p></section>\n          <section class=\"section\"><h3>4. 채권은 ‘금리와 가격의 반대’를 중심에</h3><p>표면이율은 발행할 때 정해져 만기까지 유지되지만, 만기수익률은 시장금리처럼 움직이며 미래 현금흐름을 현재가치로 할인할 때 사용합니다.</p><div class=\"cards\"><div class=\"card\"><h4>이표채</h4><p>중간에 이자를 받고 만기에 액면을 상환.</p></div><div class=\"card\"><h4>할인채</h4><p>이자를 미리 할인해 싸게 발행. 초기 구입비용 최소.</p></div><div class=\"card\"><h4>복리채</h4><p>이자를 누적해 만기에 함께 지급. 만기 수령액 최대.</p></div><div class=\"card\"><h4>FRN</h4><p>기준금리에 연동되어 표면금리가 변하는 예외.</p></div></div><div class=\"memory\"><strong>채권가격 ↔ 시장금리</strong> 시장금리(만기수익률)가 오르면 기존 채권의 매력이 낮아져 가격은 내리고, 금리가 내리면 가격은 오릅니다.</div><h4>발행·유통 빈출</h4><ul class=\"bullets\"><li>사모 <b>50인 미만</b> / 공모 50인 이상</li><li>우리나라 무보증 회사채는 <b>2곳 이상</b> 복수 신용평가, ABS는 1곳</li><li>신용스프레드 = 회사채 수익률 − 무위험채권 수익률</li><li>우리나라 국채 발행은 <b>차등가격 경매</b></li><li>총액인수는 인수회사가 모두 인수하므로 수수료가 가장 높고 발행회사에는 안전</li><li>장외시장은 상대매매, 상장·비상장 채권 모두 거래, 일반적으로 D+1 결제</li></ul></section>\n          <section class=\"section\"><h3>5. 계산 문제 선별법</h3><div class=\"roadmap\"><div class=\"road\"><b>반드시 풀기</b><br>GDP 디플레이터, EC방식, 단순 손해배상, 신용스프레드</div><div class=\"road\"><b>개념 먼저</b><br>금리·채권가격 방향, 표면이율과 YTM 구분</div><div class=\"road\"><b>시간 제한</b><br>복잡한 재무비율·채권 현재가치가 90초를 넘으면 표시 후 이동</div></div></section>\n          <section class=\"check\"><h3>개념을 읽은 뒤 3문장 체크</h3><details><summary>① 명목GDP 500, 실질GDP 400의 디플레이터?</summary><div>500 ÷ 400 × 100 = 125입니다.</div></details><details><summary>② 금리가 오르면 채권가격은?</summary><div>내립니다. 새 채권의 수익률이 높아져 기존 채권 가격이 조정됩니다.</div></details><details><summary>③ 골든크로스의 정확한 주체?</summary><div>주가와 이평선이 아니라 단기 이동평균선이 장기 이동평균선을 상향 돌파하는 것입니다.</div></details></section>\n          <div class=\"sources\">출처: <a href=\"https://www.youtube.com/watch?v=UHgVVzi_HqU\" target=\"_blank\" rel=\"noopener\">이패스TV 경기분석</a> <a href=\"https://www.youtube.com/watch?v=CDlIe_9TmmY\" target=\"_blank\" rel=\"noopener\">해커스 기본적분석</a> <a href=\"https://www.youtube.com/watch?v=KZcXLysyuF0\" target=\"_blank\" rel=\"noopener\">해커스 기술적분석</a> <a href=\"https://www.youtube.com/watch?v=KGiCMBTPveY\" target=\"_blank\" rel=\"noopener\">해커스 채권시장</a></div><div class=\"next\"><span></span><button data-next=\"2\">Day 2로 →</button></div>"
  },
  {
    "day": 2,
    "id": "day-2",
    "label": "DAY 2 · 1과목",
    "title": "증권시장 구조와 거래",
    "description": "공시·주문·시장별 차이를 한 장의 거래소 지도처럼 익힙니다.",
    "tags": [
      "13문항+",
      "유가 8 + 코스닥 3",
      "규칙·숫자"
    ],
    "check": [
      {
        "q": "① 발행시장 공시 3가지는?",
        "a": "증권신고서, 투자설명서, 발행실적보고서입니다."
      },
      {
        "q": "② IOC와 FOK의 차이는?",
        "a": "IOC는 일부 체결 후 잔량 취소, FOK는 전량 즉시 체결이 아니면 전부 취소입니다."
      },
      {
        "q": "③ K-OTC 주관기관과 매매방식?",
        "a": "금융투자협회가 주관하며, 1:1 상대매매입니다."
      }
    ],
    "sheetHtml": "<section class=\"section\"><h3>1. 발행시장과 유통시장 공시</h3><div class=\"memory\"><strong>발행시장 공시 3개만 외우기</strong><br>증권신고서 · 투자설명서 · 발행실적보고서. 나머지 공시는 먼저 유통시장으로 의심하세요.</div><div class=\"cards\"><div class=\"card\"><h4>조회공시</h4><p>풍문·보도의 사실 여부를 회사에 묻습니다. 오전 요청은 오후까지, 오후 요청은 다음날 오전까지.</p></div><div class=\"card\"><h4>공정공시</h4><p>IR 등 특정인에게 정보를 주기 <strong>전</strong> 일반 투자자에게도 알려 정보 비대칭을 막습니다.</p></div><div class=\"card\"><h4>자율공시</h4><p>회사가 알릴 가치가 있다고 판단한 주요 경영사항을 자율적으로 공시.</p></div><div class=\"card\"><h4>불성실공시</h4><p>불이행·번복·변경. 지정·공표, 거래정지, 벌점·제재금 등이 가능.</p></div></div></section>\n          <section class=\"section\"><h3>2. 주문은 체결 의지의 차이</h3><table class=\"compare\"><thead><tr><th>주문</th><th>뜻</th></tr></thead><tbody><tr><td data-label=\"주문\"><b>지정가</b></td><td data-label=\"뜻\">종목·수량·가격 모두 지정</td></tr><tr><td data-label=\"주문\"><b>시장가</b></td><td data-label=\"뜻\">가격을 정하지 않고 가능한 호가로 체결</td></tr><tr><td data-label=\"주문\"><b>조건부지정가</b></td><td data-label=\"뜻\">장중 지정가, 장 마감 10분 전 시장가로 전환</td></tr><tr><td data-label=\"주문\"><b>최유리지정가</b></td><td data-label=\"뜻\">상대방 최우선 호가로 주문</td></tr><tr><td data-label=\"주문\"><b>최우선지정가</b></td><td data-label=\"뜻\">같은 방향 최우선 호가로 주문</td></tr></tbody></table><div class=\"cards\"><div class=\"card\"><h4>IOC</h4><p>지금 되는 만큼 체결하고 <strong>나머지 취소</strong>.</p></div><div class=\"card\"><h4>FOK</h4><p><strong>전량</strong>이 즉시 가능할 때만 체결, 아니면 전부 취소.</p></div></div></section>\n          <section class=\"section\"><h3>3. 거래 규칙 핵심 숫자</h3><div class=\"number-grid\"><div class=\"number\"><b>09:00~15:30</b>정규 거래시간</div><div class=\"number\"><b>±30%</b>유가·코스닥 가격제한폭</div><div class=\"number\"><b>1주</b>기본 거래단위</div><div class=\"number\"><b>ELW 10주</b>거래단위 예외</div><div class=\"number\"><b>7단계</b>유가증권 호가단위</div><div class=\"number\"><b>5단계</b>코스닥·코넥스 호가단위</div></div><p>가격제한폭 적용 제외는 <b>정리매매·ELW·신주인수권증서·신주인수권증권</b>. 레버리지 ETF는 배율만큼 확대 적용합니다.</p></section>\n          <section class=\"section\"><h3>4. 코넥스와 K-OTC를 대비</h3><table class=\"compare\"><thead><tr><th>구분</th><th>코넥스</th><th>K-OTC</th></tr></thead><tbody><tr><td data-label=\"구분\">시장</td><td data-label=\"코넥스\">KRX 장내시장</td><td data-label=\"K-OTC\">금융투자협회 장외시장</td></tr><tr><td data-label=\"구분\">기업 진입</td><td data-label=\"코넥스\">중소기업 상장, 지정자문인이 적격성 판단</td><td data-label=\"K-OTC\">상장이 아닌 등록·지정</td></tr><tr><td data-label=\"구분\">매매</td><td data-label=\"코넥스\">가격제한폭 ±15%</td><td data-label=\"K-OTC\">1:1 상대매매</td></tr><tr><td data-label=\"구분\">특유 제도</td><td data-label=\"코넥스\">기업설명회 의무, 지정투자자·LP·경매매</td><td data-label=\"K-OTC\">투자유의사항 공시</td></tr></tbody></table><div class=\"callout\"><b>함정</b> K-OTC 불성실공시는 불이행·번복 2개만 있고 ‘공시변경’은 제외됩니다.</div></section>\n          <section class=\"check\"><h3>개념을 읽은 뒤 3문장 체크</h3><details><summary>① 발행시장 공시 3가지는?</summary><div>증권신고서, 투자설명서, 발행실적보고서입니다.</div></details><details><summary>② IOC와 FOK의 차이는?</summary><div>IOC는 일부 체결 후 잔량 취소, FOK는 전량 즉시 체결이 아니면 전부 취소입니다.</div></details><details><summary>③ K-OTC 주관기관과 매매방식?</summary><div>금융투자협회가 주관하며, 1:1 상대매매입니다.</div></details></section>\n          <div class=\"sources\">출처: <a href=\"https://www.youtube.com/watch?v=qUJBuvvFjE0\" target=\"_blank\" rel=\"noopener\">해커스 유가·코스닥시장</a> <a href=\"https://www.youtube.com/watch?v=-ox83fdyMJ8\" target=\"_blank\" rel=\"noopener\">해커스 코넥스·K-OTC</a></div><div class=\"next\"><button class=\"secondary\" data-next=\"1\">← Day 1</button><button data-next=\"3\">Day 3로 →</button></div>"
  },
  {
    "day": 3,
    "id": "day-3",
    "label": "DAY 3 · 3과목",
    "title": "협회규정·회사법·세제",
    "description": "숫자와 결의요건을 짝으로 외우는 날. 비슷한 말 사이의 경계를 선명하게 만듭니다.",
    "tags": [
      "15문항",
      "협회 4 + 회사 6 + 세제 5",
      "숫자 암기"
    ],
    "check": [
      {
        "q": "① 이사 선임과 해임의 결의는?",
        "a": "선임은 보통결의, 해임은 특별결의입니다."
      },
      {
        "q": "② 금융투자상품 광고는 언제 심의?",
        "a": "한국금융투자협회의 사전심의를 받습니다."
      },
      {
        "q": "③ 거래세는 손실이면 없어지나요?",
        "a": "아니요. 이익이 아니라 매도한 양도가액을 기준으로 부과합니다."
      }
    ],
    "sheetHtml": "<section class=\"section\"><h3>1. 금융투자협회는 자율규제기관</h3><p>자본시장법에 근거한 법정단체로, 회원 관리와 투자자 보호를 담당합니다.</p><div class=\"cards\"><div class=\"card\"><h4>표준화</h4><p>표준약관, 표준투자권유준칙, 윤리강령 제정</p></div><div class=\"card\"><h4>심의·관리</h4><p>투자광고 <strong>사전심의</strong>, 자격 등록·관리, 회원 제재</p></div></div><div class=\"callout\"><b>광고 핵심</b> ‘원금보장·확정수익’ 같은 단정 표현, 근거 없는 수익률, 과거 수익을 미래 수익처럼 보이는 표시는 금지됩니다.</div></section>\n          <section class=\"section\"><h3>2. 회사법은 결의요건부터</h3><table class=\"compare\"><thead><tr><th>결의</th><th>요건</th><th>대표 사례</th></tr></thead><tbody><tr><td data-label=\"결의\"><b>보통결의</b></td><td data-label=\"요건\">출석 과반 + 발행주식 1/4 이상</td><td data-label=\"대표 사례\">이사·감사 <b>선임</b></td></tr><tr><td data-label=\"결의\"><b>특별결의</b></td><td data-label=\"요건\">출석 의결권 2/3 + 발행주식 1/3 이상</td><td data-label=\"대표 사례\">이사·감사 <b>해임</b>, 주식 분할·병합, 자본감소</td></tr><tr><td data-label=\"결의\"><b>특수결의</b></td><td data-label=\"요건\">의결권 없는 주주 포함 전원 동의</td><td data-label=\"대표 사례\">이사 책임면제, 조직변경</td></tr></tbody></table><div class=\"memory\"><strong>설립 4단계</strong> 발기인조합 → 정관 → 실체 구성 → 설립등기. 실체 구성 후 2주 이내 등기하며, 등기로 회사가 성립합니다.</div><p>자본 3원칙은 <b>확정·유지·불변</b>. 스톡옵션은 정관 규정과 주총 특별결의가 필요하고, 부여 결의일부터 2년 이상 재임 후 행사합니다.</p></section>\n          <section class=\"section\"><h3>3. 주주 권리의 분류</h3><div class=\"cards\"><div class=\"card\"><h4>자익권</h4><p>배당청구, 잔여재산분배, 신주인수, 주식양도처럼 주주 개인의 이익을 위한 권리.</p></div><div class=\"card\"><h4>공익권</h4><p>회사·다른 주주에도 이익. 단독주주권과 일정 지분이 필요한 소수주주권으로 구분.</p></div></div><p><b>대표소송제기권·주주제안권</b>은 소수주주권입니다. 주식 양도는 합의와 주권 교부로 효력이 생기며, 명의개서를 해야 회사에 대항할 수 있습니다.</p></section>\n          <section class=\"section\"><h3>4. 세제 — 기준 시점 주의</h3><div class=\"callout\"><b>중요</b> 아래 숫자는 연구자료가 명시한 <strong>2025년 11월 시험 기준</strong>입니다. 세율·대주주 기준은 바뀔 수 있으므로 응시 회차의 최신 교재·공고로 다시 확인하세요.</div><div class=\"number-grid\"><div class=\"number\"><b>15.4%</b>이자·배당 원천징수</div><div class=\"number\"><b>2,000만원 초과</b>금융소득종합과세</div><div class=\"number\"><b>250만원</b>해외주식 기본공제</div><div class=\"number\"><b>22%</b>해외주식 양도세율</div><div class=\"number\"><b>50억원</b>국내주식 대주주 기준*</div><div class=\"number\"><b>매도액 기준</b>거래세는 손실에도 과세</div></div><p>* 연구자료는 2025년 9월 기준으로 제시하며 2026년 이후 변경 가능성을 경고합니다.</p><table class=\"compare\"><thead><tr><th>2025 기준</th><th>증권거래세</th></tr></thead><tbody><tr><td data-label=\"시장\">코스피</td><td data-label=\"세율\">0% + 농어촌특별세 0.15%</td></tr><tr><td data-label=\"시장\">코스닥·K-OTC</td><td data-label=\"세율\">0.15%</td></tr><tr><td data-label=\"시장\">코넥스</td><td data-label=\"세율\">0.10%</td></tr></tbody></table><p>국내 주식형 ETF 매매차익은 원칙적으로 비과세지만 레버리지·인버스·TR·해외혼합형은 예외가 있습니다. 국내상장 해외ETF 매매차익은 배당소득 15.4%로 과세되고 금융소득종합과세에 합산될 수 있습니다.</p></section>\n          <section class=\"check\"><h3>개념을 읽은 뒤 3문장 체크</h3><details><summary>① 이사 선임과 해임의 결의는?</summary><div>선임은 보통결의, 해임은 특별결의입니다.</div></details><details><summary>② 금융투자상품 광고는 언제 심의?</summary><div>한국금융투자협회의 사전심의를 받습니다.</div></details><details><summary>③ 거래세는 손실이면 없어지나요?</summary><div>아니요. 이익이 아니라 매도한 양도가액을 기준으로 부과합니다.</div></details></section>\n          <div class=\"sources\">출처: <a href=\"https://www.youtube.com/watch?v=iWinnHya8Tw\" target=\"_blank\" rel=\"noopener\">해커스 주식회사 관련법</a> · 세제 수치는 연구자료의 2025년 11월 시험 기준 요약</div><div class=\"next\"><button class=\"secondary\" data-next=\"2\">← Day 2</button><button data-next=\"4\">Day 4로 →</button></div>"
  },
  {
    "day": 4,
    "id": "day-4",
    "label": "DAY 4 · 3과목",
    "title": "자본시장 관련 법규",
    "description": "가장 많은 20문항. 상품 → 업종 → 투자자 → 금지행위 순으로 구조를 잡습니다.",
    "tags": [
      "20문항",
      "목표 14개",
      "최우선"
    ],
    "check": [
      {
        "q": "① 증권과 파생상품의 구분 기준?",
        "a": "추가 지급의무, 즉 원금초과손실 가능성입니다."
      },
      {
        "q": "② 투자권유대행인은 어떤 업의 적용 배제?",
        "a": "투자중개업입니다."
      },
      {
        "q": "③ 금융투자상품 제외 3종?",
        "a": "CD, 관리신탁의 수익권, 주식매수선택권(스톡옵션)입니다."
      }
    ],
    "sheetHtml": "<section class=\"section\"><h3>1. 자본시장법의 방향</h3><div class=\"cards\"><div class=\"card\"><h4>포괄주의</h4><p>법에 나열된 것만 허용하던 열거주의에서, <strong>금지하지 않으면 가능한</strong> 방식으로 전환.</p></div><div class=\"card\"><h4>기능별 규제</h4><p>은행·증권사라는 기관 이름보다 <strong>실제로 하는 기능</strong>이 같으면 같은 규제를 적용.</p></div></div><p>상품은 다양해졌고 업무범위는 넓어졌지만, 동시에 설명의무·적합성 등 투자자 보호도 강화됐습니다.</p></section>\n          <section class=\"section\"><h3>2. 금융투자상품 판별 3단계</h3><div class=\"flow\"><div class=\"step\">원금손실 가능?<br><small>없음: 예금</small></div><div class=\"arrow\">→</div><div class=\"step\">추가 지급의무?<br><small>없음: 증권</small></div><div class=\"arrow\">→</div><div class=\"step\">있음: 파생상품<br><small>원금초과손실</small></div></div><div class=\"callout\"><b>최빈출 함정</b><br>ELS·DLS는 이름에 ‘파생’이 들어가지만 <strong>파생결합증권</strong>입니다. 금융투자상품에서 법적으로 제외되는 3종은 <strong>CD·관리신탁 수익권·스톡옵션</strong>입니다.</div><h4>증권 6종</h4><p>채무 · 지분 · 수익 · 파생결합 · 투자계약 · 증권예탁(DR)</p></section>\n          <section class=\"section\"><h3>3. 금융투자업 적용 배제</h3><table class=\"compare\"><thead><tr><th>업종</th><th>대표 적용 배제</th></tr></thead><tbody><tr><td data-label=\"업종\">투자매매업</td><td data-label=\"대표 적용 배제\">국가·한국은행 공익거래, 직접 상대방 거래, 증권 발행. 단 투자신탁 수익증권·파생결합증권 발행은 매매업</td></tr><tr><td data-label=\"업종\">투자중개업</td><td data-label=\"대표 적용 배제\"><b>투자권유대행인</b></td></tr><tr><td data-label=\"업종\">집합투자업</td><td data-label=\"대표 적용 배제\">종합금융투자회사의 CMA 계좌</td></tr><tr><td data-label=\"업종\">투자자문업</td><td data-label=\"대표 적용 배제\">불특정 다수 대상 유사투자자문업, 역외투자자문업</td></tr></tbody></table><div class=\"memory\"><strong>온라인소액투자중개업</strong> 일반 중개업과 달리 인가가 아니라 <b>등록</b>, 자기자본 요건은 <b>5억원</b>입니다.</div></section>\n          <section class=\"section\"><h3>4. 투자자 분류</h3><div class=\"cards\"><div class=\"card\"><h4>절대적 전문투자자</h4><p>국가 등. 일반투자자로 전환할 수 없습니다.</p></div><div class=\"card\"><h4>상대적 전문투자자</h4><p>상장법인·지자체 등. 서면 통지와 동의를 거쳐 일반투자자로 전환 가능.</p></div></div><p>장외파생상품 거래에서는 상대적 전문투자자도 일반투자자로 취급되며, 일반투자자는 <b>위험회피 목적</b>으로만 거래할 수 있습니다.</p><div class=\"number-grid\"><div class=\"number\"><b>5년 중 1년</b>투자경험 필수</div><div class=\"number\"><b>5천만원</b>금융상품 잔고</div><div class=\"number\"><b>+ 선택 1</b>소득 1억 / 순자산 5억 / 전문성</div><div class=\"number\"><b>2년</b>전문투자자 지위 유지</div></div><p class=\"muted\">개인 자발적 전문투자자는 투자경험 요건과 소득·자산·전문성 중 하나를 함께 충족하는 구조입니다.</p></section>\n          <section class=\"section\"><h3>5. 손해배상 계산은 이 한 줄</h3><div class=\"formula\">손해배상금 = (납입액 − 판매수수료) − (회수액 + 환매수수료 + 세금)</div><p>판매수수료는 투자금액에서 빼고, 환매수수료와 세금은 회수금액에 더합니다. 부호만 정확히 잡으면 풀 수 있는 계산이므로 버리지 마세요.</p></section>\n          <section class=\"check\"><h3>개념을 읽은 뒤 3문장 체크</h3><details><summary>① 증권과 파생상품의 구분 기준?</summary><div>추가 지급의무, 즉 원금초과손실 가능성입니다.</div></details><details><summary>② 투자권유대행인은 어떤 업의 적용 배제?</summary><div>투자중개업입니다.</div></details><details><summary>③ 금융투자상품 제외 3종?</summary><div>CD, 관리신탁의 수익권, 주식매수선택권(스톡옵션)입니다.</div></details></section>\n          <div class=\"sources\">출처: <a href=\"https://www.youtube.com/watch?v=2Go8DzVNdx0\" target=\"_blank\" rel=\"noopener\">이패스TV 법규 기본강의</a> <a href=\"https://www.youtube.com/watch?v=Jq3Y9wzmUis\" target=\"_blank\" rel=\"noopener\">해커스 자본시장법 기출</a></div><div class=\"next\"><button class=\"secondary\" data-next=\"3\">← Day 3</button><button data-next=\"5\">Day 5로 →</button></div>"
  },
  {
    "day": 5,
    "id": "day-5",
    "label": "DAY 5 · 2과목",
    "title": "투자권유·금융상품",
    "description": "권유 여부를 먼저 판단하고, 상품의 ‘법적 껍데기’를 구분합니다.",
    "tags": [
      "18문항",
      "권유 5 + 상품 13",
      "구분 문제 중심"
    ],
    "check": [
      {
        "q": "① 고객이 스스로 주문하면 어떤 원칙?",
        "a": "적정성원칙입니다. 회사가 권유할 때는 적합성원칙입니다."
      },
      {
        "q": "② 일임과 신탁의 결정적 차이?",
        "a": "일임은 소유권이 고객에게 남고, 신탁은 수탁자에게 소유권이 넘어갑니다."
      },
      {
        "q": "③ 펀드 운용과 보관을 나누는 이유?",
        "a": "집합투자업자와 신탁업자가 서로 견제해 투자자 재산을 보호하기 위해서입니다."
      }
    ],
    "sheetHtml": "<section class=\"section\"><h3>1. 6대 판매규제의 출발점</h3><table class=\"compare\"><thead><tr><th>규제</th><th>언제</th><th>핵심</th></tr></thead><tbody><tr><td data-label=\"규제\"><b>적합성</b></td><td data-label=\"언제\">회사가 권유할 때</td><td data-label=\"핵심\">목적·재산·경험에 맞는 상품만 권유</td></tr><tr><td data-label=\"규제\"><b>적정성</b></td><td data-label=\"언제\">고객이 스스로 주문할 때</td><td data-label=\"핵심\">그 상품이 고객에게 적정한지 판단·고지</td></tr><tr><td data-label=\"규제\"><b>설명의무</b></td><td data-label=\"언제\">중요 상품 설명 시</td><td data-label=\"핵심\">설명서 교부 + 고객 이해 확인</td></tr><tr><td data-label=\"규제\"><b>금지 3종</b></td><td data-label=\"언제\">영업·권유·광고</td><td data-label=\"핵심\">불공정영업, 부당권유, 거짓·과장광고 금지</td></tr></tbody></table><div class=\"memory\"><strong>한 줄 암기</strong> 권유 O = 적합성 / 권유 X = 적정성. 단정적 판단, 손실보전, 이익보장 약속은 부당권유입니다.</div></section>\n          <section class=\"section\"><h3>2. 금융투자업 6종</h3><div class=\"cards\"><div class=\"card\"><h4>투자매매업</h4><p><strong>자기 계산</strong>으로 사고팝니다. 자기매매·인수 등이 해당.</p></div><div class=\"card\"><h4>투자중개업</h4><p><strong>타인 계산</strong>의 거래를 연결하고 수수료를 받습니다. 펀드판매도 중개업.</p></div><div class=\"card\"><h4>집합투자업</h4><p>2명 이상 자금을 모아 운용하는 펀드.</p></div><div class=\"card\"><h4>자문·일임·신탁</h4><p>자문은 조언, 일임은 판단 위임, 신탁은 <strong>소유권까지 수탁자에게 이전</strong>.</p></div></div><div class=\"callout\"><b>인가 vs 등록</b><br>원칙적으로 금융투자업은 인가 대상이지만, 투자자문업·투자일임업은 등록 대상입니다.</div></section>\n          <section class=\"section\"><h3>3. 금융회사·증권사 업무</h3><p><span class=\"tag\">세신단</span> 신용협동기구는 <b>새마을금고·신협·단위조합</b>. 저축은행은 은행법상 은행은 아니지만 예금자보호법의 보호를 받고, 우체국예금은 국가가 전액 보장합니다.</p><h4>증권회사 6가지 업무</h4><div class=\"number-grid\"><div class=\"number\"><b>01</b>위탁매매</div><div class=\"number\"><b>02</b>자기매매</div><div class=\"number\"><b>03</b>인수·주선</div><div class=\"number\"><b>04</b>펀드판매</div><div class=\"number\"><b>05</b>자산관리</div><div class=\"number\"><b>06</b>신용공여</div></div></section>\n          <section class=\"section\"><h3>4. 펀드는 운용과 보관을 나눈다</h3><p>집합투자업자는 돈을 운용하고, 신탁업자는 재산을 보관·감시합니다. 한 회사가 모두 맡지 않도록 분리한 구조입니다.</p><table class=\"compare\"><thead><tr><th>구분</th><th>신탁형</th><th>회사형</th></tr></thead><tbody><tr><td data-label=\"구분\">형태</td><td data-label=\"신탁형\">집합투자업자와 수탁자의 신탁계약</td><td data-label=\"회사형\">임직원 없는 주식회사</td></tr><tr><td data-label=\"구분\">투자자 증권</td><td data-label=\"신탁형\"><b>수익증권</b></td><td data-label=\"회사형\"><b>주식</b></td></tr><tr><td data-label=\"구분\">핵심</td><td data-label=\"신탁형\">판매대금은 수탁회사로 이체</td><td data-label=\"회사형\">일반사무관리회사가 회계·기준가 산정</td></tr></tbody></table><p>사모펀드는 투자자 <b>50명 미만</b>. 일반사모의 일반투자자는 3억원 이상 투자 조건이 제시됩니다.</p></section>\n          <section class=\"check\"><h3>개념을 읽은 뒤 3문장 체크</h3><details><summary>① 고객이 스스로 주문하면 어떤 원칙?</summary><div>적정성원칙입니다. 회사가 권유할 때는 적합성원칙입니다.</div></details><details><summary>② 일임과 신탁의 결정적 차이?</summary><div>일임은 소유권이 고객에게 남고, 신탁은 수탁자에게 소유권이 넘어갑니다.</div></details><details><summary>③ 펀드 운용과 보관을 나누는 이유?</summary><div>집합투자업자와 신탁업자가 서로 견제해 투자자 재산을 보호하기 위해서입니다.</div></details></section>\n          <div class=\"sources\">출처: <a href=\"https://www.youtube.com/watch?v=XFcNNI1VEnA\" target=\"_blank\" rel=\"noopener\">이패스TV 금융상품분석</a></div><div class=\"next\"><button class=\"secondary\" data-next=\"4\">← Day 4</button><button data-next=\"6\">Day 6로 →</button></div>"
  },
  {
    "day": 6,
    "id": "day-6",
    "label": "DAY 6 · 2과목",
    "title": "직무윤리·분쟁예방",
    "description": "“누구의 이익을 먼저 지킬 것인가” 하나로 이해하면 법과 규정이 연결됩니다.",
    "tags": [
      "12문항",
      "목표 10개",
      "암기 중심"
    ],
    "check": [
      {
        "q": "① 윤리 위반과 법 위반의 차이는?",
        "a": "윤리 위반은 원칙적으로 도덕적 비난, 법 위반은 법적 처벌의 대상입니다."
      },
      {
        "q": "② 고지·저감으로 해결되지 않는 이해상충은?",
        "a": "그 거래 자체를 하지 않는 ‘회피’ 단계로 갑니다."
      },
      {
        "q": "③ 자기거래 예외를 말해보세요.",
        "a": "공개시장 경유 위탁체결, 자기 판매 펀드 매수, 금융위원회 고시입니다."
      }
    ],
    "sheetHtml": "<section class=\"section\"><h3>1. 법은 윤리의 최소한</h3><p class=\"lead\">윤리는 스스로 지키는 행동 기준이고, 법은 그중 사회가 강제로 지키게 만든 최소선입니다.</p><div class=\"cards\"><div class=\"card\"><h4>윤리 위반</h4><p>원칙적으로 <strong>도덕적 비난</strong>의 대상. 자율규제가 중심입니다.</p></div><div class=\"card\"><h4>법 위반</h4><p><strong>법적 처벌</strong>의 대상. 강제성과 제재가 따릅니다.</p></div></div><div class=\"callout\"><b>시험에 이렇게 나온다</b><br>“직무윤리를 위반하면 모두 법적 처벌을 받는다”는 틀린 지문입니다. 다만 신의성실 원칙처럼 법에 들어간 윤리는 법적 의무도 됩니다.</div></section>\n          <section class=\"section\"><h3>2. 기본원칙은 두 줄</h3><div class=\"cards\"><div class=\"card\"><h4>신의성실</h4><p>처음엔 윤리적 의무였지만 법의 강제규정이 되어 <strong>윤리 + 법적 의무</strong>가 됐습니다.</p></div><div class=\"card\"><h4>고객우선</h4><p>우선순위는 <strong>고객 &gt; 회사 &gt; 임직원</strong>. 고객들끼리는 우선순위가 없습니다.</p></div></div><p>적용 대상은 보수·계약 형태와 무관하게 실제 금융투자업 업무를 하는 모든 사람이며, 아직 거래하지 않은 <strong>잠재 고객</strong>도 포함합니다.</p></section>\n          <section class=\"section\"><h3>3. 이해상충은 ‘알리고, 낮추고, 안 되면 피한다’</h3><p>증권사는 매매가 많을수록 수수료를 얻지만 고객은 비용을 냅니다. 그래서 과당매매가 대표적인 이해상충 사례입니다.</p><div class=\"flow\"><div class=\"step\">가능성 파악·관리</div><div class=\"arrow\">→</div><div class=\"step\">고객에게 고지</div><div class=\"arrow\">→</div><div class=\"step\">충돌 수준 저감</div><div class=\"arrow\">→</div><div class=\"step\">곤란하면 거래 회피</div></div><ul class=\"bullets\"><li><b>차이니스 월:</b> 고객정보 제공 제한, 종사자 겸직 금지, 공간·설비 공동이용 차단</li><li><b>조사분석자료 제한:</b> 금융투자업자가 자신이 발행한 증권의 리포트를 공표하지 못함</li><li><b>자기거래 금지:</b> 업자가 본인 명의로 고객과 거래하면서 동시에 고객을 대리하는 행위 금지</li></ul><div class=\"memory\"><strong>자기거래 예외 3개</strong><br>① 공개시장 경유 위탁체결 ② 자기가 판매하는 펀드 매수 ③ 금융위원회 고시</div></section>\n          <section class=\"section\"><h3>4. 왜 금융업에서 더 엄격한가</h3><div class=\"number-grid\"><div class=\"number\"><b>이해상충</b>수수료 수익과 고객 비용이 충돌</div><div class=\"number\"><b>투자성</b>원금손실 가능 상품을 취급</div><div class=\"number\"><b>소비자 변화</b>정보를 넘어 권리 보호 요구</div><div class=\"number\"><b>안전장치</b>직원 자신을 지키는 판단 기준</div></div></section>\n          <section class=\"check\"><h3>개념을 읽은 뒤 3문장 체크</h3><details><summary>① 윤리 위반과 법 위반의 차이는?</summary><div>윤리 위반은 원칙적으로 도덕적 비난, 법 위반은 법적 처벌의 대상입니다.</div></details><details><summary>② 고지·저감으로 해결되지 않는 이해상충은?</summary><div>그 거래 자체를 하지 않는 ‘회피’ 단계로 갑니다.</div></details><details><summary>③ 자기거래 예외를 말해보세요.</summary><div>공개시장 경유 위탁체결, 자기 판매 펀드 매수, 금융위원회 고시입니다.</div></details></section>\n          <div class=\"sources\">출처: <a href=\"https://www.youtube.com/watch?v=bbIh6UfsA3c\" target=\"_blank\" rel=\"noopener\">해커스금융 직무윤리 이론</a></div><div class=\"next\"><button class=\"secondary\" data-next=\"5\">← Day 5</button><a class=\"mock\" style=\"padding:12px 18px;border-radius:8px;text-decoration:none\" href=\"https://code-bross.github.io/static-page/csia/index.html\" target=\"_blank\" rel=\"noopener\">Day 7 모의고사 →</a></div>"
  }
];
