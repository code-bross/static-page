'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');

const root = path.resolve(__dirname, '..');
const definitions = [
  ['cram', '5일 합격 벼락치기', '5일_합격_벼락치기_유튜브_강의.md', 34],
  ['genius', '한능검, 천재가 되 · 심화', '천재가_되_심화_유튜브_강의.md', 12]
];
const courses = [];
const videos = [];
for (const [id, name, filename, count] of definitions) {
  const markdown = fs.readFileSync(path.join(root, 'lecture', filename), 'utf8');
  const teacher = markdown.match(/^- 강사: (.+)$/m)?.[1];
  assert(teacher, `${filename}: missing teacher`);
  const courseVideos = markdown.split('\n').filter(line => line.startsWith('|') && line.includes('youtube.com/watch?v=')).map(line => {
    const cells = line.split('|').slice(1, -1).map(cell => cell.trim());
    const order = Number.parseInt(cells[0], 10);
    const videoId = line.match(/youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})\)/)?.[1];
    assert(Number.isInteger(order) && videoId, `${filename}: invalid video row`);
    return {
      id: `${id}-${order}`, course: id, order,
      title: id === 'cram' ? `${order}강 · ${cells[1]}` : cells[1],
      topic: cells.length === 4 ? cells[2] : cells[1],
      videoId, url: `https://www.youtube.com/watch?v=${videoId}`
    };
  });
  assert.equal(courseVideos.length, count, `${filename}: unexpected lecture count`);
  courseVideos.forEach((video, index) => assert.equal(video.order, index + 1, `${filename}: order`));
  courses.push({id, name, teacher, source: `../lecture/${encodeURIComponent(filename)}`, count});
  videos.push(...courseVideos);
}
assert.equal(new Set(videos.map(video => video.id)).size, videos.length);
assert.equal(new Set(videos.map(video => video.videoId)).size, videos.length);

const noteDirectory = path.join(root, 'pdf', 'note');
const filename = fs.readdirSync(noteDirectory).find(name => name.normalize('NFC') === '한국사 요약.pdf');
assert(filename, 'The supplied 한국사 요약.pdf is missing');
const info = execFileSync('pdfinfo', [path.join(noteDirectory, filename)], {encoding:'utf8'});
const pages = Number(info.match(/^Pages:\s+(\d+)$/m)?.[1]);
assert.equal(pages, 9, 'Review lesson page citations if the note changes');
const sources = {
  // Git tracks this name in NFC; macOS directory listings expose its NFD equivalent.
  pdf: `../pdf/note/${encodeURIComponent(filename.normalize('NFC'))}`, pages,
  catalog: 'https://history.hackers.com/?r=history&c=free_lecture/video',
  courses, videos
};
const output = `// Generated from the two lecture Markdown catalogs and the supplied PDF.\nwindow.DEEPEN_SOURCES = ${JSON.stringify(sources, null, 2)};\n`;
const destination = path.join(__dirname, 'sources.js');
if (process.argv.includes('--check')) {
  assert.equal(fs.readFileSync(destination, 'utf8'), output, 'Run node build-sources.cjs to refresh sources.js');
  console.log('PASS: all 46 lecture links and the exact nine-page PDF path match the source files.');
} else {
  fs.writeFileSync(destination, output);
  console.log('Generated sources.js: 46 lectures and the supplied nine-page PDF.');
}
