'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {execFileSync} = require('node:child_process');

const root = __dirname;
const context = {window:{}};
for (const filename of ['../../basic/study/wiki-images.js', 'sources.js', 'video-notes.js', 'lessons-early.js', 'lessons-modern.js', 'icons-early.js', 'icons-modern.js', 'visuals.js', '../concepts.js']) {
  vm.runInNewContext(fs.readFileSync(path.join(root, filename), 'utf8'), context, {filename});
}
const {DEEPEN_SOURCES:sources, DEEPEN_VIDEO_NOTES:notes, HISTORY_WIKI_IMAGES:photos, HistoryDeepenVisuals:visuals} = context.window;
const lessons = [...context.window.DEEPEN_EARLY_LESSONS, ...context.window.DEEPEN_MODERN_LESSONS];
const expectedIds = ['tools','early-states','three-kingdoms','northern-southern','ancient-culture','goryeo-state','goryeo-borders','goryeo-power','goryeo-life','goryeo-culture','joseon-state','sarim-politics','joseon-wars','late-joseon-politics','joseon-economy','practical-learning','opening','modern-reforms','sovereignty','modern-life','colonial-control','independence-1919','national-social-movements','armed-independence','culture-defense','liberation-government','korean-war','democracy','economic-change','inter-korean','regional-heritage','timeline-review'];
assert.deepEqual(lessons.map(lesson => lesson.id), expectedIds);
assert.equal(new Set(lessons.map(lesson => lesson.era)).size, 8);
assert.equal(sources.videos.length, 46);
assert.equal(sources.pages, 9);
assert.equal(decodeURIComponent(sources.pdf.split('/').at(-1)), '한국사 요약.pdf', 'Use the Git-tracked NFC filename in deployed URLs');
const videoIds = new Set(sources.videos.map(video => video.id));
const citedPages = new Set();
const citedVideos = new Set();
const string = (value, label) => assert(typeof value === 'string' && value.trim(), label);
const illustrations = {...context.window.DEEPEN_EARLY_ICONS, ...context.window.DEEPEN_MODERN_ICONS};
assert.equal(Object.keys(context.window.DEEPEN_EARLY_ICONS).length, 48);
assert.equal(Object.keys(context.window.DEEPEN_MODERN_ICONS).length, 48);
assert.equal(Object.keys(illustrations).length, 96);
const geometry = svg => svg.replace(/\s(?:fill|stroke(?:-[\w]+)?|opacity|transform)="[^"]*"/g, '').replace(/\s+/g, '');
const usedIllustrations = new Set();
const allowedSvgTags = new Set(['path','rect','circle','ellipse','line','polyline','polygon','g']);
Object.values(illustrations).forEach(illustration => {
  string(illustration.label, 'specific historical picture label');
  assert(illustration.label.length >= 3);
  string(illustration.svg, 'local vector illustration');
  assert([...illustration.svg.matchAll(/<\/?([A-Za-z][\w:-]*)\b/g)].every(match => allowedSvgTags.has(match[1])), 'Only local SVG geometry is allowed');
  assert(!/\b(?:on\w+|(?:xlink:)?href)\s*=|https?:|javascript:|url\s*\(/i.test(illustration.svg), 'Illustrations must not run code or request external assets');
});
assert.equal(new Set(Object.values(illustrations).map(illustration => illustration.label)).size, 96, 'Each card needs a specific picture label');
assert.equal(new Set(Object.values(illustrations).map(illustration => geometry(illustration.svg))).size, 96, 'Recoloring the same generic shape does not create a new historical illustration');
for (const lesson of lessons) {
  for (const field of ['id','era','title','lead','story','memory','photo']) string(lesson[field], `${lesson.id}.${field}`);
  assert(lesson.story.length >= 100, `${lesson.id}: explanatory story`);
  assert.equal(lesson.steps.length, 3, `${lesson.id}: steps`);
  lesson.steps.forEach(step => { string(step.title, 'step title'); string(step.text, 'step text'); });
  assert.equal(lesson.glossary.length, 3);
  lesson.glossary.forEach(word => { string(word.term, 'glossary term'); string(word.meaning, 'plain-language definition'); });
  for (const field of ['title','leftTitle','rightTitle']) string(lesson.compare[field], 'comparison heading');
  assert.equal(lesson.compare.rows.length, 3);
  lesson.compare.rows.forEach(row => ['label','left','right'].forEach(field => string(row[field], 'comparison cell')));
  assert(['flow','compare'].includes(lesson.diagram.kind));
  assert.equal(lesson.diagram.items.length, 3);
  string(lesson.diagram.title, 'diagram title');
  string(lesson.diagram.caption, 'diagram explanation');
  lesson.diagram.items.forEach((item, index) => {
    assert(visuals.icons.includes(item.icon), `${lesson.id}: local illustration`);
    assert.equal(item.icon, `${lesson.id}-${index + 1}`, 'Bind every picture to its own lesson and card');
    assert(!usedIllustrations.has(item.icon), `Repeated illustration: ${item.icon}`);
    usedIllustrations.add(item.icon);
    string(item.title, 'diagram label'); string(item.text, 'diagram description');
  });
  const diagram = visuals.render(lesson.diagram);
  assert.equal((diagram.match(/<svg /g) || []).length, 3);
  assert.equal((diagram.match(/role="img"/g) || []).length, 3);
  lesson.diagram.items.forEach(item => assert(diagram.includes(visuals.escape(illustrations[item.icon].label)), 'Show an accessible description of the depicted object'));
  assert(diagram.includes('학습용 개념 그림'));
  assert.equal(lesson.quiz.length, 2);
  lesson.quiz.forEach(quiz => {
    string(quiz.question, 'quiz question'); string(quiz.explanation, 'quiz explanation');
    assert.equal(quiz.options.length, 3);
    assert.equal(new Set(quiz.options).size, 3);
    quiz.options.forEach(option => string(option, 'quiz option'));
    assert(Number.isInteger(quiz.answer) && quiz.answer >= 0 && quiz.answer < 3);
  });
  assert(lesson.pages.length);
  assert.equal(new Set(lesson.pages).size, lesson.pages.length);
  lesson.pages.forEach(page => { assert(Number.isInteger(page) && page >= 1 && page <= sources.pages); citedPages.add(page); });
  assert(lesson.videoIds.length);
  lesson.videoIds.forEach(id => { assert(videoIds.has(id), `${lesson.id}: video ${id}`); citedVideos.add(id); });
  const photo = photos[lesson.photo];
  assert(photo, `${lesson.id}: attributed historical photograph`);
  ['title','alt','caption','author','license'].forEach(field => string(photo[field], `photo.${field}`));
  ['src','article','file','licenseUrl'].forEach(field => assert.equal(new URL(photo[field]).protocol, 'https:'));
  assert(/Public domain|CC0|CC BY/.test(photo.license), 'reuse-compatible photo license');
  assert(photo.width > 0 && photo.height > 0);
}
assert.equal(citedVideos.size, 46);
assert.equal(usedIllustrations.size, 96);
assert.equal(citedPages.size, 9);
assert.equal(new Set(sources.videos.map(video => video.videoId)).size, 46);
sources.videos.forEach(video => {
  assert(/^[A-Za-z0-9_-]{11}$/.test(video.videoId));
  assert.equal(new URL(video.url).searchParams.get('v'), video.videoId);
  assert(sources.courses.some(course => course.id === video.course));
});
assert.equal(new Set(notes.map(note => note.id)).size, notes.length);
notes.forEach(note => {
  assert(videoIds.has(note.id));
  assert(['catalog','title-only','description','transcript'].includes(note.evidence));
  string(note.actualTitle, 'actual video title');
  assert(['none','partial','full'].includes(note.transcriptCoverage));
  if (note.evidence === 'transcript') assert.notEqual(note.transcriptCoverage, 'none');
  note.takeaways.forEach(takeaway => string(takeaway, 'original video takeaway'));
});
assert.equal(visuals.escape('<script>&"\''), '&lt;script&gt;&amp;&quot;&#39;');
const poisoned = {title:'<script>alert(1)</script>',kind:'flow',items:[{icon:'tools-1',title:'<img onerror=alert(1)>',text:'&'}],caption:'<b>caption</b>'};
assert(!visuals.render(poisoned).includes('<script>'));
assert(!visuals.render(poisoned).includes('<img onerror'));
assert.throws(() => visuals.render({...poisoned,items:[{icon:'missing'}]}), /Unknown learning illustration/);

const {HISTORY_CONCEPTS:concepts, HISTORY_TOPICS:topics, DEEPEN_EXAM_STUDY:examStudy, DEEPEN_EXAM_ANSWERS:examAnswers} = context.window;
assert.deepEqual(Array.from(concepts, concept => concept.id), expectedIds, 'Exam concepts preserve the existing 32 lesson IDs and order');
const sourceQuestions = new Map();
for (let round = 60; round <= 80; round++) {
  const markdown = fs.readFileSync(path.join(root, '../pdf/test', `${round}회_심화_정답해설.md`), 'utf8');
  const rows = [...markdown.matchAll(/^\|\s*(\d+)\s*\|\s*([①②③④⑤])\s*\|\s*(.+?)\s*\|\s*$/gm)];
  assert.equal(rows.length, 50);
  rows.forEach((row, index) => {
    assert.equal(Number(row[1]), index + 1);
    const ref = `${round}-${row[1]}`;
    sourceQuestions.set(ref, row[3]);
    assert.equal(examAnswers[ref], '①②③④⑤'.indexOf(row[2]) + 1, `Source answer: ${ref}`);
  });
}
assert.equal(Object.keys(topics).length, 1050);
assert.equal(Object.keys(examAnswers).length, 1050);
assert.equal(examAnswers['61-39'], 3);
assert.equal(examAnswers['70-47'], 4);
for (const [ref, related] of Object.entries(topics)) {
  assert(sourceQuestions.has(ref), `Valid question reference: ${ref}`);
  assert(related.length >= 1 && related.length <= 5, `${ref}: focused lesson mapping`);
  assert.equal(new Set(related).size, related.length);
  related.forEach(id => assert(expectedIds.includes(id)));
}
let cardCount = 0;
for (const concept of concepts) {
  assert.equal(concept.title, lessons.find(lesson => lesson.id === concept.id).title);
  const expectedRefs = Object.keys(topics).filter(ref => topics[ref].includes(concept.id));
  assert.deepEqual(Array.from(concept.refs), expectedRefs, `${concept.id}: exact inverse mapping`);
  assert(concept.refs.length, `${concept.id}: useful question coverage`);
  const study = examStudy[concept.id];
  assert.deepEqual(Array.from(study.refs), expectedRefs);
  assert(study.points.length >= 3 && study.points.length <= 5);
  study.points.forEach(point => {
    cardCount++;
    string(point.title, 'specific new concept');
    string(point.text, 'plain-language exam-derived explanation');
    assert(point.text.length >= 45 && point.text.length <= 260, 'Readable educational cards, not just question links');
    assert(!/정답은?\s*[①②③④⑤1-5]/.test(point.text), 'No arbitrary answer-number spoilers');
    assert(point.refs.length && new Set(point.refs).size === point.refs.length);
    point.refs.forEach(ref => {
      assert(sourceQuestions.has(ref), `Grounded in an exact source question: ${ref}`);
      assert(study.refs.includes(ref), `${concept.id}: supporting question belongs to this concept`);
    });
  });
}
assert.equal(cardCount, 101);
assert(concepts.find(concept => concept.id === 'timeline-review').refs.length < 50, 'Timeline is a targeted concept, not a catch-all fallback');
for (const [ref, id] of Object.entries({
  '66-26':'three-kingdoms', '68-49':'tools', '69-16':'ancient-culture',
  '71-16':'practical-learning', '73-41':'democracy', '74-40':'economic-change',
  '78-43':'modern-life', '80-2':'early-states', '80-25':'joseon-economy',
  '80-37':'armed-independence', '80-50':'regional-heritage'
})) assert(topics[ref].includes(id), `${ref}: reviewed historical meaning, not question-position inference`);

const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
assert(!/src="(?:\.\.\/)?(?:data|explanations|common)\.js"/.test(fs.readFileSync(path.join(root, 'index.html'), 'utf8')), 'Study does not load full exam data');
function appHooks(search = '', records = {}) {
  const reads = [];
  const panel = {hidden:true, innerHTML:''};
  const scope = {
    window:context.window, URLSearchParams, DOMException,
    location:{search, hash:''},
    document:{querySelector:selector => selector === '#exam-review' ? panel : {textContent:'', hidden:true}},
    localStorage:{
      getItem:key => {
        reads.push(key);
        const value = records[key];
        if (value instanceof Error || value instanceof DOMException) throw value;
        return value === undefined ? null : typeof value === 'string' ? value : JSON.stringify(value);
      },
      setItem:() => assert.fail('Review must not write records'),
      removeItem:() => assert.fail('Review must not clear records')
    }
  };
  vm.runInNewContext(app.slice(0, app.indexOf('  const searchIndex =')) +
    'globalThis.hooks = {readExamReview, questionLink, renderExamStudy, renderExamReview, searchable, review, examMode};})();', scope);
  return {...scope.hooks, reads, panel};
}
const practiceKey = 'kh-deepen-attempt-80-practice-v1';
const examKey = 'kh-deepen-attempt-80-v1';
const completed = {
  answers:Array.from({length:50}, (_, index) => examAnswers[`80-${index + 1}`]),
  marked:[], current:0, submitted:true, remaining:4800, deadline:null
};
let hooks = appHooks('?review=80&mode=practice', {[practiceKey]:completed});
assert.equal(hooks.examMode, 'practice');
assert.equal(hooks.review.submitted, true);
assert.equal(hooks.review.refs.length, 0);
assert.deepEqual(hooks.reads, [practiceKey], 'Read only the requested attempt');
hooks.renderExamReview();
assert(hooks.panel.innerHTML.includes('모든 문항을 맞혔어요'));
const mistakes = {...completed, answers:[...completed.answers]};
mistakes.answers[0] = 0;
mistakes.answers[1] = completed.answers[1] === 5 ? 1 : 5;
hooks = appHooks('?review=80&mode=practice', {[practiceKey]:mistakes});
assert.deepEqual(Array.from(hooks.review.wrong), ['80-2']);
assert.deepEqual(Array.from(hooks.review.unanswered), ['80-1']);
hooks.renderExamReview();
assert(hooks.panel.innerHTML.includes('오답 1문항 · 미응답 1문항'));
assert(hooks.panel.innerHTML.includes('고조선과 여러 나라'));
assert(hooks.panel.innerHTML.includes('도구가 바꾼 생활'));
assert(!hooks.panel.innerHTML.includes('청자·대장경·직지'), 'Review concepts only relate to missed questions');
assert(hooks.questionLink('80-2').includes('mode=practice'));
assert(hooks.questionLink('80-2').includes('오답'));
assert(!hooks.questionLink('80-2').includes('정답'));
hooks = appHooks('?review=80', {[examKey]:mistakes, [practiceKey]:completed});
assert.equal(hooks.examMode, 'exam', 'Legacy result links without a mode refer to exam records');
assert.deepEqual(hooks.reads, [examKey]);
assert(hooks.questionLink('80-1').includes('round=80&amp;q=1&amp;mode=exam'));
assert.equal(appHooks().examMode, 'practice', 'New study question links default to practice');
assert.equal(appHooks('?mode=exam').examMode, 'exam');
for (const value of [
  null, '{broken', [], {...completed, answers:[1]}, {...completed, answers:Array(50).fill(6)},
  {...completed, marked:[1,1]}, {...completed, current:50}, {...completed, remaining:-1}, {...completed, remaining:4801},
  {...completed, deadline:'soon'}, {...completed, submitted:false}, {...completed, submitted:'yes'},
  new DOMException('Denied', 'SecurityError')
]) {
  const records = value === null ? {} : {[practiceKey]:value};
  hooks = appHooks('?review=80&mode=practice', records);
  assert.equal(hooks.review.submitted, false, 'Invalid, unavailable or unfinished records are never graded');
  assert.equal(hooks.review.refs.length, 50, 'Honest source-round fallback');
  assert.equal(hooks.review.wrong.length, 0);
  hooks.renderExamReview();
  assert(hooks.panel.innerHTML.includes('이 회차와 연결된 배움'));
}
assert.equal(appHooks('?review=81').review, null, 'Do not read unknown rounds');
assert.equal(appHooks('?review=80x').reads.length, 0);
hooks = appHooks();
for (const lesson of lessons) {
  const rendered = hooks.renderExamStudy(lesson);
  assert(rendered.includes(`관련 기출 ${examStudy[lesson.id].refs.length}문항`));
  assert(!/<details[^>]*\bopen(?:\s|>)/.test(rendered), 'Related questions start collapsed');
  examStudy[lesson.id].points.forEach(point => assert(hooks.searchable(lesson).includes(point.title.normalize('NFC').trim().toLocaleLowerCase()), 'Search indexes added concepts'));
}
assert(hooks.searchable(lessons.find(lesson => lesson.id === 'early-states')).includes('서옥제'));

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const localPaths = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(match => match[1]).filter(url => !/^(?:https?:|data:|#)/.test(url));
localPaths.push(sources.pdf, ...sources.courses.map(course => course.source));
localPaths.forEach(url => {
  const filename = path.resolve(root, decodeURIComponent(url.split(/[?#]/)[0]));
  assert(fs.existsSync(filename), `Missing local source: ${url}`);
});
for (const filename of fs.readdirSync(root).filter(name => /\.(?:js|cjs)$/.test(name))) {
  execFileSync(process.execPath, ['--check', path.join(root, filename)], {stdio:'pipe'});
}
execFileSync(process.execPath, [path.join(root, 'build-sources.cjs'), '--check'], {stdio:'inherit'});
execFileSync(process.execPath, [path.join(root, '../build-concepts.cjs'), '--check'], {stdio:'inherit'});
console.log(`PASS: ${lessons.length} lessons, 96 distinct illustrations, 64 quizzes, 1050 bidirectional exam mappings, ${cardCount} source-grounded cards, mode-safe submitted-result review, 46 videos and nine PDF pages.`);
