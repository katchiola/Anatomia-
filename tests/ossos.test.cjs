const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const rig = require('../ossos/rig.js');

const root = path.resolve(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'ossos/vistas/manifest.json')));
assert.equal(rig.parts.length, 16);
assert.equal(manifest.pecas.length, 16);
assert.equal(rig.sectors.length, 10, 'Menu completo mais nove setores.');
for (const part of rig.parts) {
  assert.ok(manifest.pecas.some(item => item.id === part.id), `${part.id} deve estar no manifesto.`);
  for (const view of ['01-frente.png', '05-costas.png']) {
    assert.ok(fs.existsSync(path.join(root, 'ossos/vistas', part.id, view)), `${part.id}/${view} ausente.`);
  }
}

const calls = [];
const imageDraws = [];
const ctx = new Proxy({}, { get(_target, key) {
  if (key === 'drawImage') return (...args) => { calls.push('drawImage'); imageDraws.push(args); };
  return () => {};
} });
const seen = [];
function image(id, view) {
  seen.push(`${id}/${view}`);
  return { ready: true, image: {}, crop: { sx: 0, sy: 0, w: 100, h: 140 } };
}
const screenPoint = point => ({ x: point.x * 400, y: point.y * 600 });
function render(points, view = 'front', selected = 'todos', jawOpen = 0) {
  seen.length = 0;
  return rig.render({ ctx, points, view, screenPoint, image, selected, jawOpen, showJoints: true });
}
const front = rig.demoLandmarks('front', 0);
const back = rig.demoLandmarks('back', 0);
let spots = render(front);
assert.equal(spots.length, 16, 'O boneco completo deve desenhar as 16 peças.');
assert.equal(seen.length, 16);
assert.ok(seen.every(item => item.endsWith('/front')));
assert.ok(calls.length >= 16);

spots = render(back, 'back');
assert.equal(spots.length, 16, 'A vista posterior deve manter as 16 peças.');
assert.ok(seen.every(item => item.endsWith('/back')));
assert.ok(spots.find(item => item.organ.id === 'pe_direito').x >
  spots.find(item => item.organ.id === 'pe_esquerdo').x,
  'De costas, o pé direito anatômico deve ficar à direita da imagem.');

spots = render(front, 'front', 'pes');
assert.deepEqual(spots.map(item => item.organ.id).sort(), ['pe_direito', 'pe_esquerdo']);
assert.equal(seen.length, 2, 'O filtro Pés não deve carregar outros ossos.');

const closed = render(front, 'front', 'cranio', 0).find(item => item.organ.id === 'mandibula');
const closedHeight = imageDraws.at(-1).at(-1);
const open = render(front, 'front', 'cranio', 1).find(item => item.organ.id === 'mandibula');
const openHeight = imageDraws.at(-1).at(-1);
assert.ok(open.y > closed.y, 'A mandíbula deve descer quando a boca abre.');
assert.ok(openHeight > closedHeight * 1.75, 'A abertura deve ser visível mesmo no celular.');
assert.ok(Math.abs((closed.y - closedHeight / 2) - (open.y - openHeight / 2)) < .001,
  'A parte superior da mandíbula deve permanecer junto à articulação.');

const before = render(front).find(item => item.organ.id === 'umero_direito');
const moved = front.map(point => point && { ...point });
moved[14].x -= .08;
moved[14].y += .06;
const after = render(moved).find(item => item.organ.id === 'umero_direito');
assert.ok(Math.hypot(after.x - before.x, after.y - before.y) > 10,
  'O úmero deve acompanhar o cotovelo, em vez de ficar fixo no tronco.');

delete moved[16];
spots = render(moved);
assert.ok(!spots.some(item => item.organ.id === 'antebraco_direito' || item.organ.id === 'mao_direita'));
assert.ok(spots.some(item => item.organ.id === 'umero_direito'),
  'A perda do punho deve ocultar só as peças dependentes dele.');

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert.match(html, /id="system-select"/);
assert.match(html, /<script src="ossos\/rig\.js\?v=2\.0\.2"><\/script>/);
assert.match(html, /systemMode === 'bones'/);
assert.match(html, /id="bone-actions"/);
assert.match(html, /jawTarget = jawTarget \? 0 : 1/);
assert.match(html, /jawOpen = jawTarget;/);
console.log('OK: 16 peças, duas vistas, nove setores, articulações, mandíbula e troca de sistema.');
