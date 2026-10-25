(function (root) {
  'use strict';

  // Cada região tem uma ilustração de frente e outra de costas.
  const parts = [
    { id: 'rosto', asset: 'rosto', name: 'Crânio e músculos da cabeça', sector: 'rosto', info: 'Músculos da expressão e mastigação aparecem sobre o crânio; os músculos posteriores ajudam a sustentar a cabeça.' },
    { id: 'torax', asset: 'torax', name: 'Tórax e dorso', sector: 'torax', info: 'Peitorais, trapézio e músculos do dorso movimentam os braços e estabilizam o tronco.' },
    { id: 'abdome', asset: 'abdome', name: 'Abdome e lombar', sector: 'abdome', info: 'Reto abdominal, oblíquos e músculos lombares flexionam, giram e sustentam o tronco.' },
    { id: 'braco_esquerdo', asset: 'braco', name: 'Braço esquerdo', sector: 'bracos', info: 'Deltoide, bíceps, braquial e tríceps movimentam ombro e cotovelo.' },
    { id: 'braco_direito', asset: 'braco', name: 'Braço direito', sector: 'bracos', info: 'Deltoide, bíceps, braquial e tríceps movimentam ombro e cotovelo.' },
    { id: 'antebraco_esquerdo', asset: 'antebraco', name: 'Antebraço esquerdo', sector: 'antebracos', info: 'Flexores e extensores movimentam o punho e os dedos.' },
    { id: 'antebraco_direito', asset: 'antebraco', name: 'Antebraço direito', sector: 'antebracos', info: 'Flexores e extensores movimentam o punho e os dedos.' },
    { id: 'coxa_esquerda', asset: 'coxa', name: 'Coxa esquerda', sector: 'coxas', info: 'Quadríceps e músculos posteriores da coxa movimentam quadril e joelho.' },
    { id: 'coxa_direita', asset: 'coxa', name: 'Coxa direita', sector: 'coxas', info: 'Quadríceps e músculos posteriores da coxa movimentam quadril e joelho.' },
    { id: 'perna_esquerda', asset: 'perna', name: 'Perna esquerda', sector: 'pernas', info: 'Tibial anterior e panturrilha movimentam tornozelo e pé.' },
    { id: 'perna_direita', asset: 'perna', name: 'Perna direita', sector: 'pernas', info: 'Tibial anterior e panturrilha movimentam tornozelo e pé.' },
    { id: 'mao_esquerda', asset: 'maos', name: 'Mão esquerda', sector: 'maos', info: 'Músculos da palma e tendões ajudam a segurar e mover os dedos.' },
    { id: 'mao_direita', asset: 'maos', name: 'Mão direita', sector: 'maos', info: 'Músculos da palma e tendões ajudam a segurar e mover os dedos.' },
    { id: 'pe_esquerdo', asset: 'pe', name: 'Pé esquerdo', sector: 'pes', info: 'Músculos e tendões do pé ajudam no equilíbrio e no impulso ao caminhar.' },
    { id: 'pe_direito', asset: 'pe', name: 'Pé direito', sector: 'pes', info: 'Músculos e tendões do pé ajudam no equilíbrio e no impulso ao caminhar.' }
  ];
  const sectors = [
    ['todos', 'Musculatura completa'], ['rosto', 'Crânio e cabeça'],
    ['torax', 'Tórax e dorso'], ['abdome', 'Abdome e lombar'],
    ['bracos', 'Braços'], ['antebracos', 'Antebraços'], ['coxas', 'Coxas'],
    ['pernas', 'Pernas'], ['maos', 'Mãos'], ['pes', 'Pés']
  ];
  const byId = Object.fromEntries(parts.map(part => [part.id, part]));
  const visibleParts = (view, selected = 'todos') =>
    ['front', 'back'].includes(view) ? parts.filter(part => selected === 'todos' || part.sector === selected) : [];

  function render({ ctx, points, view, screenPoint, image, selected = 'todos' }) {
    const wanted = new Set(visibleParts(view, selected).map(part => part.id));
    const hits = [];
    const p = index => {
      const q = points[index];
      return q && Number.isFinite(q.x) && Number.isFinite(q.y) &&
        q.x >= -.03 && q.x <= 1.03 && q.y >= -.03 && q.y <= 1.03 &&
        (q.visibility ?? 1) >= .35 ? screenPoint(q) : null;
    };
    const mid = (a, b) => a && b ? { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 } : null;
    const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

    function put(id, center, width, height, angle = 0, mirror = false) {
      if (!wanted.has(id) || !center || width < 3 || height < 3) return;
      const entry = image(byId[id].asset, view);
      if (!entry || !entry.ready) return;
      const crop = entry.crop || { sx: 0, sy: 0, w: entry.image.naturalWidth, h: entry.image.naturalHeight };
      ctx.save();
      ctx.translate(center.x, center.y);
      ctx.rotate(angle);
      if (mirror) ctx.scale(-1, 1);
      ctx.globalAlpha = .94;
      ctx.drawImage(entry.image, crop.sx, crop.sy, crop.w, crop.h,
        -width / 2, -height / 2, width, height);
      ctx.restore();
      hits.push({ x: center.x, y: center.y, radius: Math.max(16, Math.min(width, height) * .55), organ: byId[id] });
    }
    function segment(id, start, end, widthRatio, heightRatio, mirror = false) {
      if (!start || !end) return;
      const length = dist(start, end);
      if (length < 10) return;
      put(id, mid(start, end), length * widthRatio, length * heightRatio,
        Math.atan2(end.y - start.y, end.x - start.x) - Math.PI / 2, mirror);
    }

    const leftShoulder = p(11), rightShoulder = p(12);
    const leftHip = p(23), rightHip = p(24);
    const shoulderPair = mid(leftShoulder, rightShoulder);
    const hipPair = mid(leftHip, rightHip);
    const measuredShoulderWidth = shoulderPair ? dist(leftShoulder, rightShoulder) : 0;
    const measuredHipWidth = hipPair ? dist(leftHip, rightHip) : 0;
    const shoulderWidth = measuredShoulderWidth || measuredHipWidth * 1.45;
    const shoulders = shoulderPair || (hipPair && measuredHipWidth >= 18
      ? { x: hipPair.x, y: hipPair.y - measuredHipWidth * 2.4 } : null);
    const hips = hipPair || (shoulderPair && measuredShoulderWidth >= 18
      ? { x: shoulderPair.x, y: shoulderPair.y + measuredShoulderWidth * 1.6 } : null);
    const torso = shoulders && hips ? dist(shoulders, hips) : 0;

    if (shoulders && hips && shoulderWidth >= 18 && torso >= 20) {
      if (view === 'front') {
        put('torax', { x: shoulders.x + (hips.x - shoulders.x) * .24,
          y: shoulders.y + (hips.y - shoulders.y) * .24 },
        shoulderWidth * 1.04, torso * .54);
        put('abdome', { x: shoulders.x + (hips.x - shoulders.x) * .74,
          y: shoulders.y + (hips.y - shoulders.y) * .74 },
        shoulderWidth * .80, torso * .58);
      } else {
        put('torax', { x: shoulders.x + (hips.x - shoulders.x) * .35,
          y: shoulders.y + (hips.y - shoulders.y) * .35 },
        shoulderWidth * 1.07, torso * .78);
        put('abdome', { x: shoulders.x + (hips.x - shoulders.x) * .77,
          y: shoulders.y + (hips.y - shoulders.y) * .77 },
        shoulderWidth * .78, torso * .50);
      }
    }

    const earLeft = p(7), earRight = p(8), eyeLeft = p(2), eyeRight = p(5);
    const face = mid(earLeft, earRight) || mid(eyeLeft, eyeRight) || p(0);
    const faceWidth = earLeft && earRight ? dist(earLeft, earRight) * 1.25 :
      eyeLeft && eyeRight ? dist(eyeLeft, eyeRight) * 2.55 : shoulderWidth * .48;
    if (face && faceWidth >= 12) {
      // A nova peça inclui a abóbada craniana. Ela começa acima das orelhas.
      put('rosto', { x: face.x, y: face.y + faceWidth * .15 },
        faceWidth * 1.05, faceWidth * (view === 'back' ? 1.35 : 1.50));
    }

    const sides = [
      { shoulder: 11, elbow: 13, wrist: 15, finger: 19, hip: 23, knee: 25, ankle: 27, toe: 31,
        arm: 'braco_esquerdo', forearm: 'antebraco_esquerdo', hand: 'mao_esquerda',
        thigh: 'coxa_esquerda', shin: 'perna_esquerda', foot: 'pe_esquerdo', mirror: true },
      { shoulder: 12, elbow: 14, wrist: 16, finger: 20, hip: 24, knee: 26, ankle: 28, toe: 32,
        arm: 'braco_direito', forearm: 'antebraco_direito', hand: 'mao_direita',
        thigh: 'coxa_direita', shin: 'perna_direita', foot: 'pe_direito', mirror: false }
    ];
    for (const side of sides) {
      const shoulder = p(side.shoulder), elbow = p(side.elbow), wrist = p(side.wrist);
      const hip = p(side.hip), knee = p(side.knee), ankle = p(side.ankle);
      segment(side.arm, shoulder, elbow, .43, 1.05, side.mirror);
      segment(side.forearm, elbow, wrist, .33, 1.03, side.mirror);
      const finger = p(side.finger) || (elbow && wrist ? {
        x: wrist.x + (wrist.x - elbow.x) * .38,
        y: wrist.y + (wrist.y - elbow.y) * .38 } : null);
      segment(side.hand, wrist, finger, .80, 1.12, side.mirror);
      segment(side.thigh, hip, knee, .47, 1.04, side.mirror);
      segment(side.shin, knee, ankle, .36, 1.04, side.mirror);
      if (ankle && knee) {
        const shinLength = dist(knee, ankle);
        if (shinLength >= 12) {
          const toe = p(side.toe);
          const angle = toe ? Math.max(-.35, Math.min(.35,
            Math.atan2(toe.x - ankle.x, Math.max(12, toe.y - ankle.y)) * .35)) : 0;
          const height = shinLength * (view === 'back' ? .47 : .55);
          put(side.foot, { x: ankle.x, y: ankle.y + height * .36 },
            shinLength * .52, height, angle, side.mirror);
        }
      }
    }
    return hits;
  }

  const api = { parts, sectors, visibleParts, render };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.MuscleRig = api;
})(typeof window !== 'undefined' ? window : globalThis);
