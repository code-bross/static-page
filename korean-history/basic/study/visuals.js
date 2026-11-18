(() => {
  'use strict';
  const {escape, exams} = window.HistoryApp;
  // Curated against each question's OCR, not the order of the broad topic refs.
  const sources = {
    'paleolithic': [['75-1', '전곡리 발굴 자료와 주먹도끼를 소개하는 기출 장면. 도구와 이동 생활을 연결해 보세요.']],
    'neolithic': [['66-1', '농경·목축이 시작된 신석기 마을을 표현한 기출 그림. 빗살무늬 토기와 생활 모습을 살펴보세요.'], ['71-1', '빗살무늬 토기·갈돌과 갈판을 체험 활동으로 제시한 자료입니다.']],
    'bronze-age': [['79-1', '청동 방울·청동검·민무늬 토기를 함께 제시한 그림. 지배층의 권위와 생활 도구를 구분해 보세요.'], ['73-1', '울주 검단리의 환호와 고인돌을 설명하는 유적 자료입니다.']],
    'gojoseon': [['79-2', '범금 8조의 처벌을 그림으로 표현한 자료. 생명·곡식·재산·신분의 단서를 찾아보세요.'], ['75-3', '개천절 기념식 사진을 담은 자료. 기념일과 고조선 건국 이야기를 연결합니다.']],
    'early-states': [['64-2', '동예의 지배자·제천 행사·풍습·특산물을 배치한 기출 관계도입니다.']],
    'goguryeo': [['71-6', '광개토 대왕릉비와 안악 3호분 행렬도를 활용한 기념품 제안 자료입니다.'], ['66-3', '광개토 대왕릉비 건립·평양 천도·한성 함락을 왕의 업적과 연결하는 자료입니다.']],
    'baekje': [['66-5', '부여의 정림사지 오층 석탑과 궁남지를 소개한 자료. 사비 천도와 지역을 연결해 보세요.'], ['64-3', '근초고왕의 대외 활동을 정리한 기획안입니다. 성왕의 업적과 구별해 보세요.']],
    'silla': [['73-6', '경주 금령총 출토 토기의 주인·하인 표현을 살펴보는 자료. 신분과 생활의 차이에 주목하세요.'], ['67-5', '단양 적성비를 소개하는 기출 사진. 진흥왕의 영토 확장과 연결합니다.']],
    'gaya': [['67-6', '가야 고분군에서 출토된 금동 허리띠·금동관의 사진 자료. 여러 지역의 문화와 철 교역을 연결해 보세요.'], ['75-4', '고령 지산동 고분군 사진과 유물 선택지를 함께 제시한 자료입니다.']],
    'unification': [['67-7', '김춘추·문무왕·김유신의 활동을 비교하는 기출 그림입니다. 제시된 배치가 시간순인 것은 아닙니다.'], ['64-4', '살수와 안시성 전투 사이의 사건을 묻는 자료. 수와 당을 구별해 보세요.']],
    'ancient-heritage': [['64-6', '분황사 모전 석탑과 다른 탑의 사진을 비교하는 자료. 모든 선택지가 같은 시대의 유산은 아닙니다.'], ['66-8', '미륵사지 석탑과 사리장엄구를 소개하는 자료. 탑의 형태를 비교해 보세요.']],
    'balhae': [['67-8', '상경성 재현 그림과 영광탑·이불병좌상·벽화 등의 선택지입니다. 백제의 칠지도가 섞여 있음에 주의하세요.'], ['64-9', '대조영·해동성국의 기록과 유물 사진을 연결하는 자료입니다.']],
    'unified-silla': [['66-9', '완도 청해진 유적을 찾아가는 탐방 자료. 장보고의 해상 교역 거점을 확인해 보세요.']],
    'late-silla': [['64-7', '원종과 애노의 봉기를 신라의 큰 연표 안에 놓아 보는 자료입니다.'], ['64-8', '견훤을 기리는 사당을 소개하는 자료. 후백제의 건국과 공산 전투를 연결해 보세요.']],
    'ancient-buddhism': [['73-4', '화엄종·부석사·관음 신앙을 한 인물과 연결하는 기출 도식입니다.'], ['71-8', '원효의 아들·이두·화왕계의 단서를 모은 설총 관련 자료입니다.']],
    'goryeo-foundation': [['64-15', '후삼국 통일과 발해 유민 포용을 그림으로 표현한 자료. 왕건의 정책과 연결해 보세요.']],
    'goryeo-administration': [['75-10', '최승로의 시무 28조와 국자감 창설 기록을 함께 읽는 자료. 성종의 체제 정비를 확인합니다.'], ['64-10', '청주 용두사지 철당간의 연호를 단서로 광종의 정책을 찾는 자료입니다.']],
    'goryeo-khitan': [['66-12', '개경 나성의 성벽을 소개한 자료. 거란과의 전쟁 및 강감찬의 활동을 연결해 보세요.'], ['73-11', '서희의 무덤을 소개하며 강동 6주 확보를 묻는 자료입니다.']],
    'goryeo-jurchen': [['75-17', '「척경입비도」 속 경계비를 세우는 장면. 윤관·별무반·동북 9성을 연결해 보세요.']],
    'goryeo-unrest': [['64-14', '묘청의 난과 만적의 난 사이의 사건을 묻는 연표와 인물 그림입니다.']],
    'goryeo-mongol': [['64-13', '팔만대장경판을 옮기는 정대불사 자료. 대장경 조성과 몽골 침입을 연결해 보세요.'], ['66-15', '몽골의 침입·강화 천도·김윤후의 항쟁을 살펴보는 기획안입니다.']],
    'goryeo-reforms': [['64-16', '이조년 초상과 「천산대렵도」의 복식 자료. 원 간섭기의 모습을 관찰해 보세요.'], ['79-15', '몽골풍 금지·쌍성총관부 공격·정방 폐지를 연결한 공민왕의 정책 관계도입니다.']],
    'goryeo-economy': [['77-15', '해동통보·은병과 여러 화폐의 모양을 비교하는 자료. 고려 화폐와 다른 시대 화폐를 구분하세요.']],
    'goryeo-culture': [['71-14', '배흘림 기둥과 주심포 양식을 단서로 목조 건축물 사진을 비교하는 자료입니다.'], ['66-16', '부석사 무량수전과 청자 등 문화유산을 우표 도안으로 제시한 자료입니다.']],
    'goryeo-buddhism': [['77-17', '지눌의 초상과 『목우자수심결』을 소개한 자료. 정혜쌍수·수선사 결사를 연결해 보세요.']],
    'records-printing': [['64-47', '정조와 혜경궁의 화성 행차를 재현한 기출 장면. 국가 행사를 기록한 의궤와 연결합니다.'], ['64-13', '팔만대장경판을 옮기는 행사 자료. 기록 문화유산의 종류와 제작 배경을 구분해 보세요.']],
    'joseon-foundation': [['66-18', '경복궁의 이름과 『조선경국전』을 단서로 정도전을 알아보는 자료입니다.']],
    'joseon-administration': [['64-19', '정치와 사회·문화로 나누어 태종의 업적을 정리한 기출 도식입니다.']],
    'sejong': [['79-21', '일성정시의의 발굴 실물과 복원 모습을 함께 제시한 자료. 세종의 과학 기술 진흥과 연결합니다.']],
    'sarim': [['64-23', '김인후를 배향한 서원을 소개하는 자료. 사림의 활동과 사화를 연결해 보세요.'], ['75-23', '조광조의 현량과 건의를 표현한 장면. 개혁과 기묘사화를 연결합니다.']],
    'imjin-war': [['64-21', '진주성·한산도·동래읍성지의 사진을 담은 탐방 자료. 장소와 항전 인물을 연결해 보세요.']],
    'manchu-war': [['75-21', '『심양일기』와 소현 세자의 억류를 소개하는 자료. 병자호란의 결과를 연결합니다.'], ['64-22', '강홍립의 파병·삼전도 항복·나선 정벌을 비교하는 자료. 그림의 배치는 시간순이 아닙니다.']],
    'joseon-diplomacy': [['73-20', '『해동제국기』에 실린 일본 지도를 제시한 자료. 조선의 대일 교류와 연결합니다.']],
    'joseon-tax': [['64-20', '토산물 대신 토지 결 수를 기준으로 납부하도록 한 대동법의 기출 장면입니다.'], ['66-26', '군포 2필을 1필로 줄인 균역법을 문답으로 정리한 자료입니다.']],
    'yeongjo-jeongjo': [['64-26', '초계문신제와 규장각 관원을 단서로 정조의 업적을 찾는 자료입니다.']],
    'joseon-economy': [['64-25', '상평통보의 실물 모양과 조선 후기 경제 활동을 함께 살펴보는 자료입니다.']],
    'joseon-arts': [['66-27', '신윤복의 「단오풍정」과 다른 그림을 비교하는 기출 자료입니다.'], ['64-24', '정선의 「인왕제색도」와 다른 회화 작품을 비교하는 자료입니다.']],
    'silhak': [['79-27', '거중기를 작동시키는 체험 장면. 정약용의 설계와 수원 화성 건설을 연결합니다.'], ['66-29', '여유당을 소개하는 사진 자료. 정약용과 『목민심서』를 연결해 보세요.']],
    'joseon-social-change': [['71-28', '서얼의 신분과 통청 운동을 살펴보는 기출 문답입니다.']],
    'peasant-uprisings': [['66-28', '진주 농민 봉기의 주요 지점을 조선 시대 지도에 표시한 자료입니다.'], ['64-27', '「정주성공함작전도」를 제시한 자료. 홍경래의 난과 서북 지역 차별을 연결합니다.']],
    'daewongun': [['67-32', '병인양요 때 약탈된 외규장각 의궤의 귀환을 소개하는 전시 자료입니다.'], ['71-29', '경복궁 중건·원납전·당백전을 단서로 흥선 대원군의 정책을 살펴보는 자료입니다.']],
    'opening-treaties': [['64-28', '일본 군인의 무력 시위 그림을 담은 기출 신문. 운요호 사건과 강화도 조약을 연결합니다.']],
    'early-modernization': [['71-27', '임오군란의 현장을 경로로 연결한 답사 자료. 구식 군인의 차별 대우를 배경과 연결합니다.']],
    'donghak-reforms': [['71-33', '장성 황룡 전적과 죽창 모양의 기념탑을 소개한 자료. 동학 농민 운동의 전개를 살펴보세요.']],
    'independence-club': [['67-33', '관민 공동회 현장을 표현한 기출 장면. 독립 협회와 헌의 6조를 연결합니다.']],
    'korean-empire-life': [['66-39', '동대문 전차 개통식에 참석한 관리들의 사진. 대한 제국 시기 생활 변화를 살펴보세요.']],
    'sovereignty-armies': [['66-32', '쓰시마섬에서 순국한 최익현을 소개하는 기출 신문. 을사늑약과 의병 활동을 연결합니다.']],
    'enlightenment-movements': [['77-32', '『대한매일신보』 기사를 읽고 금연·의연금과 국채 보상 운동을 연결하는 자료입니다.'], ['64-33', '『대한매일신보』·신민회·임시 정부 활동을 정리한 양기탁 소개 자료입니다.']],
    'overseas-koreans': [['64-31', '서간도·충칭·하와이·멕시코를 표시한 기출 지도. 『서간도 시종기』와 신흥 강습소를 연결합니다.']],
    'colonial-rule': [['64-32', '토지 조사 사업의 사무원 모집 공고를 재구성한 기출 자료입니다.'], ['79-39', '산미 증식 계획의 목적과 농민의 부담을 설명하는 기출 용어 카드입니다.']],
    'march-first': [['73-39', '만세 시위와 제암리 사건을 지역·날짜로 살펴보는 기출 자료입니다.']],
    'provisional-government': [['77-42', '노백린과 한인 비행사들의 사진. 대한민국 임시 정부의 활동과 연결해 보세요.'], ['79-41', '충칭 창설과 인도·미얀마 전선 활동을 담은 한국광복군 관련 자료입니다.']],
    'armed-independence': [['75-43', '양세봉을 기리는 기념물의 위치를 표시한 지도. 조선 혁명군의 활동과 연결합니다.'], ['64-35', '봉오동·청산리 전투와 간도 참변을 연결하는 기출 자료입니다.']],
    'heroic-struggle': [['67-39', '한인 애국단 가입·훙커우 공원 의거·김구에게 남긴 시계를 사진으로 연결한 윤봉길 자료입니다.'], ['64-37', '이봉창 의사의 선서문을 소개하는 기출 신문입니다.']],
    'social-national-movements': [['67-37', '조만식과 물산 장려 운동의 홍보 행렬을 담은 자료. 구호와 운동의 목적을 연결합니다.'], ['71-40', '민립 대학 설립 운동의 주도 인물과 모금 활동을 정리한 자료입니다.']],
    'colonial-culture': [['71-43', '이육사의 「광야」 낭독을 표현한 기출 장면. 저항시와 인물을 연결합니다.'], ['77-40', '「서시」·「별 헤는 밤」 등의 작품을 단서로 윤동주를 찾는 기출 인물 소개입니다.']],
    'liberation': [['79-44', '여운형의 주요 활동을 나란히 제시한 기출 자료. 조선 건국 준비 위원회와 좌우 합작을 연결합니다.'], ['67-41', '여운형·김규식과 좌우 합작 위원회를 연결하는 자료입니다.']],
    'government-establishment': [['66-46', '제헌 국회 개회식의 화보. 정부 수립 과정과 국회의 활동을 연결해 보세요.'], ['71-45', '반민특위 터의 표석을 소개하는 자료. 정부 수립 이후의 과제를 살펴봅니다.']],
    'korean-war': [['67-43', '남침·인천 상륙 작전·중국군 참전·정전 협정을 연결하는 전쟁 기록 자료입니다.']],
    'april-revolution': [['75-46', '3·15 부정 선거 관련 재판 소식을 담은 기출 뉴스 장면. 4·19 혁명의 계기와 연결합니다.']],
    'economic-development': [['64-44', '새마을 운동·광주 대단지 사건·수출 달성을 함께 제시한 사진 자료입니다.'], ['71-47', '경부 고속 도로 순직자 위령탑 자료. 경제 개발과 그 과정의 희생을 함께 살펴봅니다.']],
    'democratization': [['64-41', '직선제 개헌을 다룬 「고바우 영감」 만화. 6월 민주 항쟁과 연결합니다.'], ['66-47', '옛 전남도청 모형을 제시한 자료. 5·18 민주화 운동의 장소와 의미를 연결합니다.']],
    'civilian-governments': [['73-48', '지방 자치·조선 총독부 건물 철거·OECD 가입의 사진을 함께 제시한 자료입니다.']],
    'reunification': [['67-45', '서울 올림픽·남북한 유엔 동시 가입·한중 수교를 연결한 기출 도식입니다.'], ['79-49', '6·15 남북 공동 선언과 판문점 선언 사이의 사건을 묻는 연표입니다.']],
    'local-customs': [['73-23', '돌을 던지고 손으로 받는 놀이를 묘사한 조선 시대 그림. 공기놀이의 모습을 관찰해 보세요.'], ['66-4', '견우·직녀·오작교를 표현한 기출 그림. 칠석과 연결해 보세요.']]
  };
  const questionByRef = new Map(exams.flatMap(exam => exam.questions.map(question => [`${exam.round}-${question.number}`, {exam, question}])));

  function figure([ref, caption], index) {
    const {exam, question} = questionByRef.get(ref);
    const label = `${exam.round}회 ${question.number}번`;
    return `<figure class="study-figure">
      <div class="visual-source-label"><span>${index === 0 ? '대표 기출 자료' : '비교 기출 자료'}</span><span>${label} · ${question.page}쪽</span></div>
      <div class="visual-preview">
        ${window.HistoryApp.questionImage(exam, question, {alt: `${label}. ${caption}`, className: 'study-source-image'})}
        <button type="button" class="visual-open" data-study-visual="${ref}" aria-haspopup="dialog" aria-label="${escape(`${label} 자료 확대: ${caption}`)}">자료 크게 보기 <span aria-hidden="true">↗</span></button>
      </div>
      <figcaption><strong>관찰 포인트</strong><p>${escape(caption)}</p><div class="visual-source-links"><a href="${escape(exam.paper)}#page=${question.page}" target="_blank" rel="noopener">원본 PDF ${question.page}쪽 <span class="sr-only">(새 탭)</span> ↗</a><a href="../test/index.html?round=${exam.round}&q=${question.number}">이 문제 풀기 →</a></div></figcaption>
      <details class="visual-transcript"><summary>자료 텍스트 읽기 · 선택지 포함</summary><pre>${escape(question.text)}</pre></details>
    </figure>`;
  }
  function render(concept) {
    const entries = sources[concept.id].filter(([ref]) => concept.refs.includes(ref) && questionByRef.has(ref));
    return `<section class="study-visuals" aria-labelledby="visual-heading">
      <div class="visual-heading"><h3 id="visual-heading">자료로 먼저 만나기</h3><span>관찰 → 개념 → 기출</span></div>
      <p class="visual-intro">제공된 기출 원본의 그림·사진·지도·문서입니다. 선택지에는 다른 시대나 틀린 설명도 섞여 있으니, 아래 관찰 포인트와 함께 읽어 보세요.</p>
      ${figure(entries[0], 0)}
      ${entries.length > 1 ? `<details class="visual-gallery"><summary>함께 비교할 기출 자료 ${entries.length - 1}개 더 보기</summary>${entries.slice(1).map((entry, index) => figure(entry, index + 1)).join('')}</details>` : ''}
    </section>`;
  }
  function emphasize(text, keywords) {
    const words = [...keywords].sort((a, b) => b.length - a.length);
    const pattern = new RegExp(words.map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g');
    let start = 0;
    let result = '';
    for (const match of text.matchAll(pattern)) {
      result += escape(text.slice(start, match.index)) + `<mark>${escape(match[0])}</mark>`;
      start = match.index + match[0].length;
    }
    return result + escape(text.slice(start));
  }
  function memory(concept) {
    return `<p class="sr-only">${escape(concept.remember)}</p><div class="memory-map" aria-hidden="true">${concept.remember.split(' / ').map(group => `<div class="memory-group">${group.split('→').map((part, index) => `${index ? '<span class="memory-arrow">→</span>' : ''}<span class="memory-node">${escape(part.trim())}</span>`).join('')}</div>`).join('<span class="memory-divider">/</span>')}</div>`;
  }
  window.HistoryStudyVisuals = {render, emphasize, memory};

  document.addEventListener('click', event => {
    const button = event.target.closest('[data-study-visual]');
    if (!button) return;
    const {exam, question} = questionByRef.get(button.dataset.studyVisual);
    const dialog = document.querySelector('#visual-dialog');
    document.querySelector('#visual-dialog-title').textContent = `${exam.round}회 ${question.number}번 · 자료 확대`;
    document.querySelector('#visual-dialog-image').innerHTML = window.HistoryApp.questionImage(exam, question, {alt: `${exam.round}회 ${question.number}번 기출 원본 자료. 자료 텍스트는 학습 화면에서 확인할 수 있습니다.`});
    const pdf = document.querySelector('#visual-dialog-pdf');
    pdf.href = `${exam.paper}#page=${question.page}`;
    pdf.textContent = `원본 PDF ${question.page}쪽 열기 ↗`;
    dialog.showModal();
  });
})();
