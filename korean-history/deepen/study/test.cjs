'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {execFileSync} = require('node:child_process');

const root = __dirname;
const context = {window:{}};
for (const filename of ['../../basic/study/wiki-images.js', 'sources.js', 'video-notes.js', 'lessons-early.js', 'lessons-modern.js', 'icons-early.js', 'icons-modern.js', 'visuals.js']) {
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

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const localPaths = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(match => match[1]).filter(url => !/^(?:https?:|data:|#)/.test(url));
localPaths.push(sources.pdf, ...sources.courses.map(course => course.source));
localPaths.forEach(url => {
  const filename = path.resolve(root, decodeURIComponent(url.split('#')[0]));
  assert(fs.existsSync(filename), `Missing local source: ${url}`);
});
for (const filename of fs.readdirSync(root).filter(name => /\.(?:js|cjs)$/.test(name))) {
  execFileSync(process.execPath, ['--check', path.join(root, filename)], {stdio:'pipe'});
}
execFileSync(process.execPath, [path.join(root, 'build-sources.cjs'), '--check'], {stdio:'inherit'});
console.log(`PASS: ${lessons.length} lessons, 96 distinct era/topic-specific illustrations, 64 explained quizzes, attributed photographs, all 46 videos and all nine PDF pages.`);
