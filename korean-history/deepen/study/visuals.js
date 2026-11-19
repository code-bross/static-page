(() => {
  'use strict';
  const icons = {...window.DEEPEN_EARLY_ICONS, ...window.DEEPEN_MODERN_ICONS};
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  function render(diagram) {
    return `<figure class="memory-board"><figcaption><span class="eyebrow">PICTURE THE CONNECTION</span><h3>${escape(diagram.title)}</h3></figcaption><div class="diagram-grid ${diagram.kind}">${diagram.items.map((item, index) => {
      if (!icons[item.icon]) throw new Error(`Unknown learning illustration: ${item.icon}`);
      const illustration = icons[item.icon];
      return `<div class="diagram-item"><span class="diagram-number">${String(index + 1).padStart(2, '0')}</span><svg viewBox="0 0 120 92" role="img" aria-label="${escape(illustration.label)}" data-illustration="${escape(item.icon)}" focusable="false" fill="none" stroke="#213b42" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${illustration.svg}</svg><span class="diagram-motif" aria-hidden="true">${escape(illustration.label)}</span><strong>${escape(item.title)}</strong><p>${escape(item.text)}</p></div>`;
    }).join('')}</div><p class="diagram-caption">${escape(diagram.caption)}</p><span class="illustration-label">학습용 개념 그림 · 유물 실측도나 실제 지도는 아니에요.</span></figure>`;
  }
  window.HistoryDeepenVisuals = {render, escape, icons:Object.keys(icons)};
})();
