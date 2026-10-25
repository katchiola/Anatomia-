const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const muscles = require('../musculos/rig.js');
const bones = require('../ossos/rig.js');

const drawn = [];
const ctx = new Proxy({}, { get(_target, key) {
  if (key === 'drawImage') return (...args) => drawn.push(args);
  return () => {};
} });
const image = () => ({
  ready: true, image: { naturalWidth: 100, naturalHeight: 100 },
  crop: { sx: 0, sy: 0, w: 100, h: 100 }
});
const screenPoint = point => ({ x: point.x * 400, y: point.y * 600 });
const render = (points, view, selected = 'todos') =>
  muscles.render({ ctx, points, view, screenPoint, image, selected });

assert.equal(muscles.parts.length, 15);
assert.equal(new Set(muscles.parts.map(part => part.id)).size, 15);
assert.equal(muscles.sectors.length, 10, 'Menu completo e nove regiões.');
assert.equal(new Set(muscles.parts.map(part => part.asset)).size, 9);
for (const asset of new Set(muscles.parts.map(part => part.asset))) {
  for (const file of ['01-frente.png', '05-costas.png']) {
    assert.ok(fs.existsSync(path.join(__dirname, '..', 'musculos', 'vistas', asset, file)),
      `Imagem ausente: ${asset}/${file}`);
  }
}
for (const view of ['front', 'back']) {
  const points = bones.demoLandmarks(view, 0);
  const expected = muscles.visibleParts(view);
  drawn.length = 0;
  const hits = render(points, view);
  assert.deepEqual(hits.map(hit => hit.organ.id).sort(), expected.map(part => part.id).sort(),
    `Todas as peças da vista ${view} devem ser desenhadas.`);
  assert.equal(drawn.length, 15);
  for (const [sector] of muscles.sectors.slice(1)) {
    assert.ok(muscles.visibleParts(view, sector).length > 0, `${sector} vazio em ${view}.`);
    assert.ok(render(points, view, sector).every(hit => hit.organ.sector === sector));
  }
}
assert.equal(muscles.visibleParts('front').length, 15);
assert.equal(muscles.visibleParts('back').length, 15);

const front = bones.demoLandmarks('front', 0);
const before = render(front, 'front').find(hit => hit.organ.id === 'braco_direito');
const moved = front.map(point => point && { ...point });
moved[14].x -= .10;
moved[14].y += .05;
const after = render(moved, 'front').find(hit => hit.organ.id === 'braco_direito');
assert.ok(Math.hypot(after.x - before.x, after.y - before.y) > 10,
  'O braço deve acompanhar o cotovelo.');
delete moved[14];
assert.ok(!render(moved, 'front').some(hit => hit.organ.id === 'braco_direito'));

const headOnly = front.map((point, index) => [0, 2, 5, 7, 8].includes(index) ? point : undefined);
assert.deepEqual(render(headOnly, 'front').map(hit => hit.organ.id).sort(),
  ['rosto']);
const shouldersOnly = front.map((point, index) => [0, 2, 5, 7, 8, 11, 12, 13, 14, 15, 16].includes(index) ? point : undefined);
assert.ok(render(shouldersOnly, 'front').some(hit => hit.organ.id === 'abdome'),
  'O abdômen deve manter escala quando os quadris saem da câmera.');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
assert.match(html, /<option value="muscles">Músculos<\/option>/);
assert.match(html, /id="muscle-filter"/);
assert.match(html, /<script src="musculos\/rig\.js\?v=3\.1"><\/script>/);
assert.match(html, /systemMode === 'muscles'/);
assert.match(html, /image: muscleSprite/);
console.log('OK: 18 imagens, 15 peças, duas vistas, nove regiões, movimento e closes.');
