const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const muscles = require('../musculos/rig.js');
const bones = require('../ossos/rig.js');

const ctx = new Proxy({}, { get(_target, key) {
  if (key === 'createLinearGradient') return () => ({ addColorStop() {} });
  return () => {};
} });
const screenPoint = point => ({ x: point.x * 400, y: point.y * 600 });
const render = (points, view, selected = 'todos') =>
  muscles.render({ ctx, points, view, screenPoint, selected });

assert.equal(muscles.parts.length, 36);
assert.equal(new Set(muscles.parts.map(part => part.id)).size, 36);
assert.equal(muscles.sectors.length, 10, 'Menu completo e nove regiões.');
for (const view of ['front', 'back']) {
  const points = bones.demoLandmarks(view, 0);
  const expected = muscles.visibleParts(view);
  const hits = render(points, view);
  assert.deepEqual(hits.map(hit => hit.organ.id).sort(), expected.map(part => part.id).sort(),
    `Todos os músculos da vista ${view} devem ser desenhados.`);
  for (const [sector] of muscles.sectors.slice(1)) {
    assert.ok(muscles.visibleParts(view, sector).length > 0, `${sector} vazio em ${view}.`);
    assert.ok(render(points, view, sector).every(hit => hit.organ.sector === sector));
  }
}
assert.equal(muscles.visibleParts('front').length, 20);
assert.equal(muscles.visibleParts('back').length, 18);

const front = bones.demoLandmarks('front', 0);
const before = render(front, 'front').find(hit => hit.organ.id === 'biceps_direito');
const moved = front.map(point => point && { ...point });
moved[14].x -= .10;
moved[14].y += .05;
const after = render(moved, 'front').find(hit => hit.organ.id === 'biceps_direito');
assert.ok(Math.hypot(after.x - before.x, after.y - before.y) > 10,
  'O bíceps deve acompanhar o cotovelo.');
delete moved[14];
assert.ok(!render(moved, 'front').some(hit => hit.organ.id === 'biceps_direito'));

const headOnly = front.map((point, index) => [0, 2, 5, 7, 8].includes(index) ? point : undefined);
assert.deepEqual(render(headOnly, 'front').map(hit => hit.organ.id).sort(),
  ['masseter_direito', 'masseter_esquerdo']);
const shouldersOnly = front.map((point, index) => [0, 2, 5, 7, 8, 11, 12, 13, 14, 15, 16].includes(index) ? point : undefined);
assert.ok(render(shouldersOnly, 'front').some(hit => hit.organ.id === 'reto_abdominal'),
  'O abdômen deve manter escala quando os quadris saem da câmera.');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
assert.match(html, /<option value="muscles">Músculos<\/option>/);
assert.match(html, /id="muscle-filter"/);
assert.match(html, /<script src="musculos\/rig\.js\?v=3\.0"><\/script>/);
assert.match(html, /systemMode === 'muscles'/);
console.log('OK: 36 grupos, duas vistas, nove regiões, movimento e closes.');
