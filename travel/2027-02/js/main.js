/**
 * Travel Dashboard Core Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Functionality (Default: Light Mode)
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeToggleIcon = document.getElementById('themeToggleIcon');
  const themeToggleText = document.getElementById('themeToggleText');

  function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (themeToggleIcon && themeToggleText) {
      if (theme === 'dark') {
        themeToggleIcon.textContent = '🌙';
        themeToggleText.textContent = '다크 모드';
      } else {
        themeToggleIcon.textContent = '☀️';
        themeToggleText.textContent = '화이트 모드';
      }
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // Initialize theme
  initTheme();

  // Current active destination ID & selected day
  let currentDestination = 'rome';
  let currentDay = 1;
  let customHeadcount = 4; // Default group size (4인 가족)

  // Initialize UI elements
  const destTabsContainer = document.getElementById('destinationTabs');
  const mainContentContainer = document.getElementById('mainContentArea');

  // Load Initial Destination
  renderDestination(currentDestination);

  /**
   * Render Selected Destination Dashboard
   */
  function renderDestination(destId) {
    const data = TRAVEL_DATA.destinations[destId];
    if (!data) return;

    currentDay = 1; // Reset day selection on destination change

    // Handle Destination Selector Active State
    document.querySelectorAll('.tab-btn').forEach(btn => {
      if (btn.dataset.id === destId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (data.status === 'coming_soon') {
      renderComingSoonView(data);
      return;
    }

    // Render Active Destination View
    renderActiveDestinationView(data);
  }

  /**
   * Render Active Destination View (Rome)
   */
  function renderActiveDestinationView(data) {
    customHeadcount = data.travelers.total;
    
    // HTML Markup Generation
    const html = `
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-card" style="background-image: var(--hero-card-bg), url('${data.heroImage}');">
          <div class="hero-header-box">
            <div class="hero-meta">
              <span class="meta-pill highlight">📍 ${data.country}</span>
              <span class="meta-pill">📅 ${data.dates.departure} ~ ${data.dates.return} (${data.dates.duration})</span>
              <span class="meta-pill">👥 ${data.travelers.composition}</span>
            </div>
            <h1 class="hero-title">${data.title}</h1>
            <p class="hero-subtitle">${data.subtitle}</p>
          </div>

          <!-- Key Metrics Grid -->
          <div class="metrics-grid">
            <div class="metric-card">
              <div class="metric-label">총 여행 예상 경비</div>
              <div class="metric-value gold" id="metricTotalBudget">${formatKRW(data.budget.total)}</div>
              <div class="metric-sub">인당 약 <span id="metricPerPersonBudget">${formatKRW(data.budget.perPerson)}</span> (4인 기준)</div>
            </div>
            <div class="metric-card">
              <div class="metric-label">대한항공 직항 항공권</div>
              <div class="metric-value">${formatKRW(data.flight.pricing.total)}</div>
              <div class="metric-sub">인당 ${formatKRW(data.flight.pricing.perPerson)} (${data.flight.pricing.discountNote})</div>
            </div>
            <div class="metric-card">
              <div class="metric-label">여행 스타일 & 동선</div>
              <div class="metric-value" style="font-size: 1.15rem; font-weight: 700;">시니어 맞춤 힐링</div>
              <div class="metric-sub">${data.travelers.style}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Flight Details Card -->
      <section style="margin-bottom: 36px;">
        <div class="flight-card">
          <div class="flight-header">
            <div class="airline-info">
              <div class="airline-logo-badge">KE</div>
              <div>
                <div class="airline-name">${data.flight.airline}</div>
                <div class="airline-type">${data.flight.type} 왕복</div>
              </div>
            </div>
            <div class="flight-price-tag">
              <div class="flight-price-val">${formatKRW(data.flight.pricing.perPerson)}~</div>
              <div class="flight-price-sub">성인 1인 / KB국민카드 혜택가</div>
            </div>
          </div>

          <div class="flight-routes-grid">
            <!-- Outbound Flight -->
            <div class="route-box">
              <span class="route-label outbound">🛫 가는 편 (KE931) - ${data.dates.departure}</span>
              <div class="timeline-row">
                <div class="time-city">
                  <div class="time">${data.flight.outbound.depTime}</div>
                  <div class="airport">${data.flight.outbound.depAirport}</div>
                </div>
                <div class="flight-path">
                  <span class="flight-duration">${data.flight.outbound.duration}</span>
                  <div class="path-line-container">
                    <span class="dot"></span>
                    <span class="line"><span class="plane-icon">✈</span></span>
                    <span class="dot"></span>
                  </div>
                </div>
                <div class="time-city">
                  <div class="time">${data.flight.outbound.arrTime}</div>
                  <div class="airport">${data.flight.outbound.arrAirport}</div>
                </div>
              </div>
              <div class="flight-notes">
                <span>💡 도착 후 전용 밴(8인승) 사전 대기. 공항 ➔ 호텔 약 45분 이동 후 편안하게 첫날 휴식.</span>
              </div>
            </div>

            <!-- Inbound Flight -->
            <div class="route-box">
              <span class="route-label inbound">🛬 오는 편 (KE932) - ${data.dates.return}</span>
              <div class="timeline-row">
                <div class="time-city">
                  <div class="time">${data.flight.inbound.depTime}</div>
                  <div class="airport">${data.flight.inbound.depAirport}</div>
                </div>
                <div class="flight-path">
                  <span class="flight-duration">${data.flight.inbound.duration}</span>
                  <div class="path-line-container">
                    <span class="dot"></span>
                    <span class="line"><span class="plane-icon">✈</span></span>
                    <span class="dot"></span>
                  </div>
                </div>
                <div class="time-city">
                  <div class="time">${data.flight.inbound.arrTime}</div>
                  <div class="airport">${data.flight.inbound.arrAirport}</div>
                </div>
              </div>
              <div class="flight-notes">
                <span>💡 늦은 밤 22:00 출발이므로 17:30 호텔 전용 샌딩 밴으로 이동, 공항 수속 & 택스리펀 여유 확보.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Budget Dashboard & Live Calculator Split -->
      <section style="margin-bottom: 40px;">
        <div class="section-header">
          <div>
            <div class="section-title-group">
              <span class="section-icon">📊</span>
              <h2 class="section-title">여행 예산 한눈에 보기</h2>
            </div>
            <p class="section-desc">항공, 숙소, 식비, 입장권 등 항목별 경비 내역 및 4인 가계산</p>
          </div>
        </div>

        <div class="budget-overview-grid">
          <!-- Itemized Budget Card -->
          <div class="budget-card">
            <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 24px;">카테고리별 경비 비중</h3>
            <div id="budgetCategoriesList">
              ${renderBudgetCategories(data.budget.categories)}
            </div>
          </div>

          <!-- Live Interactive Calculator Card -->
          <div class="budget-card calc-card">
            <div>
              <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 8px;">🧮 인원 맞춤 예산 시뮬레이터</h3>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 24px;">
                여행 인원에 따른 예상 비용 총액 및 1인당 금액을 실시간으로 시뮬레이션하세요.
              </p>

              <div class="calc-row">
                <div class="calc-label">
                  <span>총 여행 인원</span>
                  <span style="color: var(--accent-gold); font-weight: 700;">인원 조절 가능</span>
                </div>
                <div class="calc-input-group">
                  <button class="calc-btn" id="btnMinusHeadcount">-</button>
                  <span class="calc-num-display" id="displayHeadcount">${customHeadcount}명</span>
                  <button class="calc-btn" id="btnPlusHeadcount">+</button>
                </div>
              </div>

              <div style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 20px;">
                * 항공권(${formatKRW(data.flight.pricing.perPerson)}/인) 및 입장권/식비는 인원 비례 계산되며,<br>
                숙소 및 전용 차량 비용은 그룹 단위(룸 2개, 밴 1대)로 나뉩니다.
              </div>
            </div>

            <div class="summary-box">
              <div class="summary-box-title"><span id="calcHeadcountLabel">${customHeadcount}</span>인 기준 총 예상 경비</div>
              <div class="summary-box-val" id="calcTotalValue">${formatKRW(data.budget.total)}</div>
              <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 4px;">
                1인당 약 <strong style="color: var(--text-primary);" id="calcPerPersonValue">${formatKRW(data.budget.perPerson)}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Daily Itinerary Section -->
      <section class="itinerary-section">
        <div class="section-header">
          <div>
            <div class="section-title-group">
              <span class="section-icon">🗓️</span>
              <h2 class="section-title">일자별 여행 루트 & 계획</h2>
            </div>
            <p class="section-desc">어머니의 체력을 고려한 맞춤 동선 (${data.dates.departure.split(' ')[0]} ~ ${data.dates.return.split(' ')[0]})</p>
          </div>
        </div>

        <!-- Day Selector Pills -->
        <div class="day-selector-bar" id="daySelectorBar">
          ${data.itinerary.map(item => `
            <button class="day-pill-btn ${item.day === currentDay ? 'active' : ''}" data-day="${item.day}">
              <div class="day-pill-num">DAY 0${item.day}</div>
              <div class="day-pill-title">${item.badge}</div>
            </button>
          `).join('')}
        </div>

        <!-- Active Day Timeline Content -->
        <div class="active-day-container" id="activeDayContainer">
          ${renderDayDetails(data.itinerary.find(i => i.day === currentDay))}
        </div>
      </section>

      <!-- Senior Travel Tips Section -->
      <section style="margin-bottom: 60px;">
        <div class="section-header">
          <div>
            <div class="section-title-group">
              <span class="section-icon">💡</span>
              <h2 class="section-title">어머니 맞춤 여행 꿀팁 & 주의사항</h2>
            </div>
            <p class="section-desc">안전하고 쾌적한 로마 가족 여행을 위한 필수 체크리스트</p>
          </div>
        </div>

        <div class="guide-grid">
          ${data.seniorGuideTips.map(tip => `
            <div class="guide-card">
              <div class="guide-title">${tip.title}</div>
              <div class="guide-desc">${tip.desc}</div>
            </div>
          `).join('')}
        </div>
      </section>
    `;

    mainContentContainer.innerHTML = html;

    // Attach Event Listeners for Calculator & Day Pills
    attachEvents(data);
  }

  /**
   * Render Category Progress Bars
   */
  function renderBudgetCategories(categories) {
    return categories.map(cat => `
      <div class="category-item">
        <div class="category-meta">
          <div class="cat-name-icon">
            <span>${cat.icon}</span>
            <span>${cat.name}</span>
          </div>
          <div class="cat-price-info">
            <span class="cat-price-total">${formatKRW(cat.amount)}</span>
            <span class="cat-price-sub">(${cat.percentage}%)</span>
          </div>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width: ${cat.percentage}%;"></div>
        </div>
        <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">
          ${cat.desc}
        </div>
      </div>
    `).join('');
  }

  /**
   * Render Specific Day Timeline Details
   */
  function renderDayDetails(dayData) {
    if (!dayData) return '<p>일정 정보를 불러올 수 없습니다.</p>';

    // Filter activities with photos for the Top Photo Highlights Gallery
    const photoActivities = dayData.activities.filter(act => act.image);

    return `
      <div class="day-header-meta">
        <div>
          <span class="day-date-tag">🗓️ DAY ${dayData.day} - ${dayData.date}</span>
          <h3 class="day-title-text" style="margin-top: 8px;">${dayData.title}</h3>
        </div>
      </div>

      <p class="day-summary-banner">${dayData.summary}</p>

      ${dayData.seniorTip ? `
        <div class="senior-tip-box">
          ${dayData.seniorTip}
        </div>
      ` : ''}

      <!-- Top Photo Highlight Gallery Grid -->
      ${photoActivities.length > 0 ? `
        <div style="margin-bottom: 32px;">
          <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--accent-gold); margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
            <span>📸</span> <span>DAY 0${dayData.day} 주요 명소 & 미식 화보</span>
          </h4>
          <div class="day-photo-gallery">
            ${photoActivities.map(act => `
              <div class="gallery-photo-card js-lightbox-trigger" data-img="${act.image}" data-caption="${act.title} (${act.tag}) - ${act.desc}">
                <img src="${act.image}" alt="${act.title}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop';">
                <div class="gallery-caption-overlay">
                  <span class="gallery-caption-tag">${act.tag}</span>
                  <span class="gallery-caption-title">${act.title}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Timeline List -->
      <div class="timeline-list">
        ${dayData.activities.map(act => `
          <div class="timeline-item">
            <div class="timeline-dot-icon">${act.icon}</div>
            <div class="timeline-content-card">
              ${act.image ? `
                <div class="activity-img-box js-lightbox-trigger" data-img="${act.image}" data-caption="${act.title} (${act.tag}) - ${act.desc}">
                  <img src="${act.image}" alt="${act.title}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop';">
                  <span class="img-badge-overlay">🔍 크게 보기</span>
                </div>
              ` : ''}
              <div class="activity-header">
                <span class="activity-time">⏰ ${act.time}</span>
                <span class="activity-tag">${act.tag}</span>
              </div>
              <div class="activity-title">${act.title}</div>
              <div class="activity-desc">${act.desc}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  /**
   * Render Coming Soon View for Barcelona & Hawaii
   */
  function renderComingSoonView(data) {
    mainContentContainer.innerHTML = `
      <div class="coming-soon-box">
        <div class="cs-icon">✈️ ${data.country}</div>
        <h2 class="cs-title">${data.title}</h2>
        <p class="cs-desc">${data.subtitle}</p>
        <div style="display: inline-block; padding: 8px 16px; background: rgba(229, 169, 60, 0.15); border: 1px solid var(--border-glow); border-radius: 20px; color: var(--accent-gold); font-weight: 700;">
          🔜 곧 일정이 업데이트될 예정입니다!
        </div>
      </div>
    `;
  }

  /**
   * Event Listeners Attachment
   */
  function attachEvents(data) {
    // Day Selection Pill Click
    const dayPills = document.querySelectorAll('.day-pill-btn');
    const dayContainer = document.getElementById('activeDayContainer');

    dayPills.forEach(pill => {
      pill.addEventListener('click', () => {
        dayPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentDay = parseInt(pill.dataset.day, 10);

        const targetDayData = data.itinerary.find(i => i.day === currentDay);
        if (targetDayData && dayContainer) {
          dayContainer.innerHTML = renderDayDetails(targetDayData);
          attachLightboxEvents();
        }
      });
    });

    // Lightbox Modal Attachment
    attachLightboxEvents();

    // Calculator Buttons
    const btnMinus = document.getElementById('btnMinusHeadcount');
    const btnPlus = document.getElementById('btnPlusHeadcount');
    const displayHeadcount = document.getElementById('displayHeadcount');
    const calcHeadcountLabel = document.getElementById('calcHeadcountLabel');
    const calcTotalValue = document.getElementById('calcTotalValue');
    const calcPerPersonValue = document.getElementById('calcPerPersonValue');

    if (btnMinus && btnPlus) {
      btnMinus.addEventListener('click', () => {
        if (customHeadcount > 1) {
          customHeadcount--;
          updateCalculator(data);
        }
      });

      btnPlus.addEventListener('click', () => {
        if (customHeadcount < 10) {
          customHeadcount++;
          updateCalculator(data);
        }
      });
    }

    function updateCalculator(data) {
      if (displayHeadcount) displayHeadcount.textContent = `${customHeadcount}명`;
      if (calcHeadcountLabel) calcHeadcountLabel.textContent = customHeadcount;

      const flightTotal = data.flight.pricing.perPerson * customHeadcount;
      const foodTotal = 350000 * customHeadcount;
      const toursTotal = 160000 * customHeadcount;
      const miscTotal = 150000 * customHeadcount;
      
      const roomsNeeded = Math.ceil(customHeadcount / 2);
      const hotelTotal = 1000000 * roomsNeeded;
      
      const transportTotal = customHeadcount > 4 ? 600000 : 400000;

      const newTotalBudget = flightTotal + foodTotal + toursTotal + miscTotal + hotelTotal + transportTotal;
      const newPerPerson = Math.round(newTotalBudget / customHeadcount);

      if (calcTotalValue) calcTotalValue.textContent = formatKRW(newTotalBudget);
      if (calcPerPersonValue) calcPerPersonValue.textContent = formatKRW(newPerPerson);
    }
  }

  /**
   * Lightbox Photo Modal Handler
   */
  function attachLightboxEvents() {
    const triggers = document.querySelectorAll('.js-lightbox-trigger');
    const modal = document.getElementById('lightboxModal');
    const modalImg = document.getElementById('lightboxImg');
    const modalCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.getElementById('lightboxCloseBtn');

    if (!modal || !modalImg) return;

    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const imgSrc = trigger.dataset.img;
        const caption = trigger.dataset.caption;

        if (imgSrc) {
          modalImg.src = imgSrc;
          if (modalCaption) modalCaption.textContent = caption || '';
          modal.classList.add('active');
        }
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

    function closeModal() {
      modal.classList.remove('active');
    }
  }

  // Destination Tab Switch Event Delegation
  destTabsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;

    const destId = btn.dataset.id;
    if (destId && destId !== currentDestination) {
      currentDestination = destId;
      renderDestination(currentDestination);
    }
  });

  /**
   * Helper: Format Currency to Korean Won (KRW)
   */
  function formatKRW(amount) {
    return new Intl.NumberFormat('ko-KR').format(amount) + '원';
  }
});
