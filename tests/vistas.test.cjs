const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(script, 'O script do aplicativo deve existir.');

const elements = new Map();
const requested = [];
const scales = [];
const drawing = Object.fromEntries([
  'setTransform', 'clearRect', 'save', 'restore', 'translate', 'transform',
  'beginPath', 'moveTo', 'lineTo', 'closePath', 'fill', 'ellipse',
  'drawImage', 'strokeText', 'fillText'
].map(name => [name, () => {}]));
drawing.scale = (x, y) => scales.push([x, y]);
function element(id) {
  if (!elements.has(id)) elements.set(id, {
    value: id === 'organ-filter' ? 'todos' : 'front',
    clientWidth: 400, clientHeight: 600, videoWidth: 400, videoHeight: 600,
    textContent: '', hidden: false,
    classList: { add() {}, remove() {}, toggle() {} },
    getBoundingClientRect: () => ({ width: 400, height: 600, left: 0, top: 0 }),
    addEventListener() {}, append() {}, getContext: () => drawing
  });
  return elements.get(id);
}
class FakeImage {
  set src(value) { this._src = value; requested.push(value); }
  get src() { return this._src; }
}
const context = vm.createContext({
  document: { querySelector: selector => element(selector.slice(1)), createElement: () => ({}) },
  window: { devicePixelRatio: 1, addEventListener() {},
    MuscleRig: require('../musculos/rig.js') },
  Image: FakeImage, performance: { now: () => 0 }, requestAnimationFrame() {},
  console, Math, Set, Map, Promise
});
vm.runInContext(script, context);
const run = source => vm.runInContext(source, context);
assert.match(html, /<option value="todos" selected>/);
assert.equal(run('selectedOrgans().length'), 13, 'Todos os órgãos devem aparecer por padrão.');
assert.equal(run('labels'), false, 'Os nomes devem começar ocultos para não cobrir os órgãos.');
function points(sign) {
  const result = [];
  result[11] = { x: .5 + .16 * sign, y: .34, visibility: 1 };
  result[12] = { x: .5 - .16 * sign, y: .34, visibility: 1 };
  result[23] = { x: .5 + .11 * sign, y: .69, visibility: 1 };
  result[24] = { x: .5 - .11 * sign, y: .69, visibility: 1 };
  return result;
}
context.frontPoints = points(1);
context.backPoints = points(-1);
context.sidePoints = points(.08);

assert.deepEqual(Array.from(run('Object.keys(viewFiles)')).sort(), ['back', 'front']);
assert.equal(run('detectFacing(frontPoints)'), 'front');
assert.equal(run('detectFacing(backPoints)'), 'back');
assert.equal(run('detectFacing(sidePoints)'), null);

run('demo = false; manual = false; orientationConfirmed = false; landmarks = frontPoints; draw(0)');
assert.equal(run('currentView'), 'front');
run('landmarks = backPoints; draw(0); draw(0)');
assert.equal(run('currentView'), 'front', 'A troca deve aguardar estabilidade.');
run('draw(0)');
assert.equal(run('currentView'), 'back', 'De costas, deve escolher a arte posterior.');
run('landmarks = sidePoints; draw(0)');
assert.equal(run('currentView'), 'back', 'De lado, deve manter a última vista.');

run('manual = true; manualView = "front"; updateRotation(frontPoints)');
assert.ok(run('bodyGeometry(frontPoints).horizontal.x') > 0);
run('manualView = "back"; updateRotation(backPoints)');
assert.ok(run('bodyGeometry(backPoints).horizontal.x') < 0,
  'Ao virar de costas, os órgãos devem trocar de lado na tela.');
run('mirrored = true');
assert.ok(run('bodyGeometry(backPoints).horizontal.x') > 0,
  'O espelhamento da câmera deve ser aplicado apenas uma vez.');
run('mirrored = false; demo = true; document.querySelector("#organ-filter").value = "todos"');
run('manualView = "front"; draw(0); manualView = "back"; draw(0)');

const ids = run('organs.map(organ => organ.id).join(",")').split(',');
assert.equal(ids.length, 13);
const adjustedSizes = {
  coracao: [.38, .31], figado: [.61, .33], estomago: [.42, .31],
  grosso: [.66, .37], delgado: [.43, .28], pancreas: [.26, .12]
};
for (const [id, [width, height]] of Object.entries(adjustedSizes)) {
  const organ = run(`organs.find(item => item.id === "${id}")`);
  assert.equal(organ.w, width, `${id}: largura ajustada.`);
  assert.equal(organ.h, height, `${id}: altura ajustada.`);
}
for (const id of ['pancreas', 'baco', 'bexiga', 'rim_direito', 'rim_esquerdo']) {
  assert.ok(ids.includes(id), `${id} deve estar disponível no filtro inicial.`);
}
assert.ok(run('organs.find(organ => organ.id === "rim_direito").y') >
  run('organs.find(organ => organ.id === "rim_esquerdo").y'));
assert.ok(run('organs.find(organ => organ.id === "bexiga").y') >
  run('organs.find(organ => organ.id === "grosso").y'));
assert.ok(run('organs.find(organ => organ.id === "pancreas").y') <
  run('organs.find(organ => organ.id === "grosso").y'));
assert.ok(run('organs.find(organ => organ.id === "figado").x') < 0);
assert.ok(run('organs.find(organ => organ.id === "baco").x') > 0);
for (const id of ids.filter(id => id !== 'cerebro')) {
  const organ = run(`organs.find(organ => organ.id === "${id}")`);
  assert.ok(organ.x - organ.w / 2 >= -.52 && organ.x + organ.w / 2 <= .52,
    `${id} deve caber na largura aproximada do tronco.`);
  assert.ok(organ.y - organ.h / 2 >= -.52 && organ.y + organ.h / 2 <= .65,
    `${id} deve caber entre tórax e pelve.`);
}
for (const id of ids) {
  for (const filename of ['01-frente.png', '05-costas.png']) {
    const asset = `orgaos/vistas/${id}/${filename}`;
    assert.ok(fs.existsSync(path.join(root, asset)), `${asset} deve existir.`);
    assert.ok(requested.includes(asset), `${asset} deve ser usado no aplicativo.`);
  }
}
assert.ok(requested.every(asset => /\/(01-frente|05-costas)\.png$/.test(asset)),
  'O aplicativo não deve carregar imagens laterais ou diagonais.');
run('cache.get("figado/back").ready = true; cache.get("figado/back").crop = { sx: 0, sy: 0, w: 100, h: 100 }');
run('manualView = "back"; draw(0)');
assert.ok(scales.some(([x, y]) => x === -1 && y === 1),
  'A arte de costas não deve ser espelhada duas vezes.');
const farPoints = points(.25);
for (const key of [11, 12]) farPoints[key].y = .49;
for (const key of [23, 24]) farPoints[key].y = .57;
context.farPoints = farPoints;
run('demo = false; trackingReady = true; landmarks = farPoints; draw(0)');
assert.match(element('hint').textContent, /Aproxime a pessoa da câmera/);

const shouldersOnly = points(1), shouldersClose = points(1.5);
context.fullClose = points(1.5);
for (const key of [11, 12]) context.fullClose[key].y = .2375;
for (const key of [23, 24]) context.fullClose[key].y = .7625;
assert.equal(run('bodyGeometry(frontPoints).mode'), 'full');
assert.ok(run('bodyGeometry(fullClose).length') > run('bodyGeometry(frontPoints).length') * 1.4);
for (const pair of [shouldersOnly, shouldersClose]) { delete pair[23]; delete pair[24]; }
context.shouldersOnly = shouldersOnly;
context.shouldersClose = shouldersClose;
assert.equal(run('bodyGeometry(shouldersOnly).mode'), 'shoulders');
assert.equal(run('detectFacing(shouldersOnly)'), 'front');
assert.ok(run('bodyGeometry(shouldersClose).length') > run('bodyGeometry(shouldersOnly).length') * 1.4);
run('cache.get("pulmao_direito/front").ready = true; cache.get("pulmao_direito/front").crop = { sx: 0, sy: 0, w: 100, h: 100 }');
run('manual = true; manualView = "front"; landmarks = shouldersOnly; draw(0)');
const lungRadius = run('hitSpots.find(spot => spot.organ.id === "pulmao_direito").radius');
run('landmarks = shouldersClose; draw(0)');
assert.ok(run('hitSpots.find(spot => spot.organ.id === "pulmao_direito").radius') > lungRadius * 1.4,
  'O pulmão deve crescer quando os ombros se aproximam da câmera.');

const hipsOnly = points(1), hipsClose = points(1.5);
for (const pair of [hipsOnly, hipsClose]) { delete pair[11]; delete pair[12]; }
context.hipsOnly = hipsOnly;
context.hipsClose = hipsClose;
assert.equal(run('bodyGeometry(hipsOnly).mode'), 'hips');
assert.equal(run('detectFacing(hipsOnly)'), 'front');
assert.ok(run('bodyGeometry(hipsClose).length') > run('bodyGeometry(hipsOnly).length') * 1.4);
run('cache.get("bexiga/front").ready = true; cache.get("bexiga/front").crop = { sx: 0, sy: 0, w: 100, h: 100 }');
run('landmarks = hipsOnly; draw(0)');
const bladderRadius = run('hitSpots.find(spot => spot.organ.id === "bexiga").radius');
run('landmarks = hipsClose; draw(0)');
assert.ok(run('hitSpots.find(spot => spot.organ.id === "bexiga").radius') > bladderRadius * 1.4,
  'A bexiga deve crescer quando os quadris se aproximam da câmera.');

function ears(span) {
  const result = [];
  result[7] = { x: .5 + span / 2, y: .3, visibility: 1 };
  result[8] = { x: .5 - span / 2, y: .3, visibility: 1 };
  return result;
}
context.headOnly = ears(.2);
context.headClose = ears(.4);
assert.equal(run('bodyGeometry(headOnly)'), null);
assert.equal(run('detectFacing(headOnly)'), 'front');
context.headBack = ears(-.2);
assert.equal(run('detectFacing(headBack)'), 'back');
assert.ok(run('headGeometry(headClose).width') > run('headGeometry(headOnly).width') * 1.9);
run('cache.get("cerebro/front").ready = true; cache.get("cerebro/front").crop = { sx: 0, sy: 0, w: 100, h: 100 }');
run('landmarks = headOnly; draw(0)');
assert.deepEqual(Array.from(run('hitSpots.map(spot => spot.organ.id)')), ['cerebro']);
const brainRadius = run('hitSpots[0].radius');
run('landmarks = headClose; draw(0)');
assert.ok(run('hitSpots[0].radius') > brainRadius * 1.9,
  'O cérebro deve crescer quando a cabeça se aproxima da câmera.');
run('landmarks = null; draw(0)');
assert.match(element('hint').textContent, /afaste um pouco a câmera/);

console.log('OK: 13 órgãos, proporções ajustadas, frente/costas e ampliação em closes.');
