(() => {
  const $ = id => document.getElementById(id);
  const escape = value => String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
  const abbreviations = {
    EBITDA: '이자·법인세·감가상각비 차감 전 영업이익',
    VWAP: '거래량가중평균가격',
    SPAC: '기업인수목적회사',
    BSI: '기업경기실사지수',
    CSI: '소비자심리지수',
    ESI: '경제심리지수',
    GDP: '국내총생산',
    PER: '주가수익비율',
    PBR: '주가순자산비율',
    EPS: '주당순이익',
    BPS: '주당순자산',
    CAPM: '자본자산가격결정모형',
    SML: '증권시장선',
    ROE: '자기자본이익률',
    ROI: '총자본이익률',
    OBV: '거래량균형지표',
    ADR: '등락비율',
    ADL: '등락주선',
    VR: '거래량비율',
    ELD: '주가연계예금',
    ELS: '주가연계증권',
    ELF: '주가연계펀드',
    ELW: '주식워런트증권',
    ISA: '개인종합자산관리계좌',
    IRP: '개인형퇴직연금',
    CMA: '종합자산관리계좌',
    MMF: '머니마켓펀드',
    MMW: '머니마켓랩',
    CD: '양도성예금증서',
    RP: '환매조건부채권',
    IOC: '즉시체결 후 잔량취소',
    FOK: '전량 즉시체결 또는 전량취소',
    'T+2': '거래일로부터 2영업일 결제',
    'M&A': '기업 인수·합병',
    EV: '기업가치',
    VI: '변동성완화장치',
    DI: '경기확산지수',
    CI: '경기종합지수',
    M1: '협의통화',
    M2: '광의통화',
    Lf: '금융기관 유동성',
    L: '광의 유동성',
    CB: '전환사채',
    BW: '신주인수권부사채',
    EB: '교환사채',
    bp: '베이시스포인트'
  };
  const readable = value => Object.entries(abbreviations)
    .sort(([left], [right]) => right.length - left.length)
    .reduce((text, [short, full]) => {
      const pattern = short === 'T+2' || short === 'M&A'
        ? new RegExp(`\\b${short.replace('+', '\\+').replace('&', '\\&')}\\b`, 'g')
        : new RegExp(`\\b${short}\\b`, 'g');
      return text.replace(pattern, `${short} (${full})`);
    }, String(value));
  const data = window.SPECIAL_NOTES.map(note => ({
    ...note, ...window.SPECIAL_PAGES.find(source => source.id === note.id)
  }));
  const normalize = text => text.normalize('NFKC').toLowerCase().replace(/\s+/g, '');
  const searchText = new Map(data.map(lecture => [lecture.id, normalize(JSON.stringify(lecture))]));
  let currentLecture;
  let currentPage = 0;

  const lectureLinks = data.map(lecture =>
    `<a href="#${lecture.id}">${escape(lecture.session)} · ${escape(lecture.title)}</a>`).join('');
  $('lecture-links').innerHTML = lectureLinks;
  $('lecture-rail').innerHTML = lectureLinks;
  $('lecture-filter').insertAdjacentHTML('beforeend', data.map(lecture =>
    `<option value="${lecture.id}">${escape(lecture.session)} ${escape(lecture.title)}</option>`).join(''));

  function render() {
    const query = normalize($('search').value.trim());
    const selected = $('lecture-filter').value;
    const filtered = data.filter(lecture =>
      (selected === 'all' || lecture.id === selected) && (!query || searchText.get(lecture.id).includes(query)));
    $('result').textContent = `${filtered.length} / ${data.length}개 특강`;
    $('chapters').innerHTML = filtered.map(lecture => {
      const matchingPages = lecture.pages.filter(page => !query || normalize(page.text).includes(query));
      const pages = query ? matchingPages : lecture.pages;
      return `<article class="chapter-card" id="${lecture.id}">
        <div class="chapter-heading"><div><span class="subj-tag">${escape(lecture.session)} · 핵심 특강</span>
        <h2>${escape(lecture.title)}</h2></div></div>
        <p class="intro">${escape(readable(lecture.intro))}</p>
        <div class="notes-grid">${lecture.sections.map(section => {
          const visuals = section.visualId ? [window.SPECIAL_VISUALS[section.visualId]].filter(Boolean) : [];
          return `<section class="note">
          <h3>${escape(readable(section.title))}</h3>
          <p>${escape(readable(section.body))}</p>
          ${visuals.map(visual => `<figure class="note-visual">
            <img src="${escape(visual.image)}" alt="${escape(visual.alt)}" loading="lazy">
            <figcaption>${escape(visual.caption)}</figcaption>
          </figure>`).join('')}
          </section>`;
        }).join('')}</div>
        <section class="formula" aria-label="핵심 공식과 적용"><h3>공식·판별 기준</h3>
          <p>${escape(readable(lecture.formula))}</p><p><strong>직접 적용</strong> · ${escape(readable(lecture.example))}</p></section>
        <details class="self-check"><summary>이해 확인 · ${escape(readable(lecture.question))}</summary>
          <p>${escape(readable(lecture.answer))}</p></details>
        <details class="source-pages" ${query && pages.length ? 'open' : ''}>
          <summary>${query ? '검색어가 있는 원문 그림' : '표·차트·강의자료 펼치기'} · ${pages.length}개</summary>
          <p class="source">그림을 누르면 확대됩니다. 원본 크기에서는 새 탭으로 열어 더 크게 볼 수 있습니다.</p>
          <div class="page-grid">${pages.map(page => `<figure>
            <button type="button" class="page-button" data-lecture="${lecture.id}" data-page="${page.number}" aria-label="${escape(lecture.title)} 강의자료 그림 확대">
              <img src="${page.image}" width="${page.width}" height="${page.height}" loading="lazy" decoding="async" alt="${escape(lecture.title)} 강의자료 그림">
            </button><figcaption class="page-caption">강의자료 그림</figcaption></figure>`).join('')}            </div>
            ${!pages.length ? '<p>원문 텍스트에는 일치하는 내용이 없습니다. 이미지 내부 글자는 검색되지 않을 수 있습니다. 검색어를 지우면 모든 그림을 볼 수 있습니다.</p>' : ''}
        </details>
      </article>`;
    }).join('') || '<p class="empty">검색 결과가 없습니다. 검색어를 바꾸거나 전체 특강을 선택하세요.</p>';
  }

  $('search').addEventListener('input', render);
  $('lecture-filter').addEventListener('change', render);
  $('core-only').addEventListener('change', () => {
    $('chapters').classList.toggle('core-only', $('core-only').checked);
  });
  $('print').addEventListener('click', () => window.print());
  $('lecture-links').addEventListener('click', event => {
    if (!event.target.closest('a')) return;
    $('search').value = '';
    $('lecture-filter').value = 'all';
    render();
  });

  function updateTheme(theme) {
    document.documentElement.dataset.theme = theme;
    $('theme').textContent = theme === 'dark' ? '☀️' : '🌙';
    $('theme').setAttribute('aria-label', theme === 'dark' ? '밝은 테마 전환' : '어두운 테마 전환');
    $('theme').setAttribute('title', theme === 'dark' ? '밝은 테마로 전환' : '어두운 테마로 전환');
  }
  updateTheme(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');
  $('theme').addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    updateTheme(theme);
    localStorage.setItem('theme', theme);
  });

  function showPage() {
    const page = currentLecture.pages[currentPage];
    const label = `${currentLecture.session} ${currentLecture.title} · 강의자료 그림`;
    $('viewer-title').textContent = label;
    $('viewer-image').src = page.image;
    $('viewer-image').alt = label;
    $('full-image').href = page.image;
    $('previous').disabled = currentPage === 0;
    $('next').disabled = currentPage === currentLecture.pages.length - 1;
    $('viewer').scrollTop = 0;
  }
  $('chapters').addEventListener('click', event => {
    const button = event.target.closest('.page-button');
    if (!button) return;
    currentLecture = data.find(lecture => lecture.id === button.dataset.lecture);
    currentPage = currentLecture.pages.findIndex(page => page.number === Number(button.dataset.page));
    showPage();
    $('viewer').showModal();
  });
  $('previous').addEventListener('click', () => { if (currentPage > 0) { currentPage--; showPage(); } });
  $('next').addEventListener('click', () => { if (currentPage < currentLecture.pages.length - 1) { currentPage++; showPage(); } });
  $('close-viewer').addEventListener('click', () => $('viewer').close());
  $('viewer').addEventListener('click', event => {
    if (event.target === $('viewer')) $('viewer').close();
  });
  $('viewer').addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); $('previous').click(); }
    if (event.key === 'ArrowRight') { event.preventDefault(); $('next').click(); }
  });
  render();
  const target = document.getElementById(location.hash.slice(1));
  if (target) target.scrollIntoView();
})();
