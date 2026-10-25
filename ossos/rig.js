(function (root) {
  'use strict';

  const parts = [
    { id: 'cranio', name: 'Crânio', sector: 'cranio', info: 'Protege o cérebro e acompanha os movimentos da cabeça.' },
    { id: 'mandibula', name: 'Mandíbula', sector: 'cranio', info: 'Move-se nas articulações temporomandibulares para abrir e fechar a boca.' },
    { id: 'torax', name: 'Tórax', sector: 'torax', info: 'Costelas, esterno, clavículas e escápulas protegem o peito e ligam os braços ao tronco.' },
    { id: 'quadril', name: 'Quadril', sector: 'quadril', info: 'A pelve liga o tronco às pernas e protege estruturas da região pélvica.' },
    { id: 'umero_direito', name: 'Úmero direito', sector: 'umeros', info: 'Liga o ombro direito ao cotovelo direito.' },
    { id: 'umero_esquerdo', name: 'Úmero esquerdo', sector: 'umeros', info: 'Liga o ombro esquerdo ao cotovelo esquerdo.' },
    { id: 'antebraco_direito', name: 'Rádio e ulna direitos', sector: 'antebracos', info: 'Ligam o cotovelo direito ao punho direito e permitem girar o antebraço.' },
    { id: 'antebraco_esquerdo', name: 'Rádio e ulna esquerdos', sector: 'antebracos', info: 'Ligam o cotovelo esquerdo ao punho esquerdo e permitem girar o antebraço.' },
    { id: 'mao_direita', name: 'Mão direita', sector: 'maos', info: 'Ossos do punho, palma e dedos direitos ajudam a segurar objetos.' },
    { id: 'mao_esquerda', name: 'Mão esquerda', sector: 'maos', info: 'Ossos do punho, palma e dedos esquerdos ajudam a segurar objetos.' },
    { id: 'femur_direito', name: 'Fêmur direito', sector: 'femures', info: 'Liga o quadril direito ao joelho direito e sustenta o peso do corpo.' },
    { id: 'femur_esquerdo', name: 'Fêmur esquerdo', sector: 'femures', info: 'Liga o quadril esquerdo ao joelho esquerdo e sustenta o peso do corpo.' },
    { id: 'perna_direita', name: 'Tíbia e fíbula direitas', sector: 'pernas', info: 'Ligam o joelho direito ao tornozelo direito.' },
    { id: 'perna_esquerda', name: 'Tíbia e fíbula esquerdas', sector: 'pernas', info: 'Ligam o joelho esquerdo ao tornozelo esquerdo.' },
    { id: 'pe_direito', name: 'Pé direito', sector: 'pes', info: 'Ossos do pé direito apoiam o corpo e participam da caminhada.' },
    { id: 'pe_esquerdo', name: 'Pé esquerdo', sector: 'pes', info: 'Ossos do pé esquerdo apoiam o corpo e participam da caminhada.' }
  ];
  const byId = Object.fromEntries(parts.map(part => [part.id, part]));
  const sectors = [
    ['todos', 'Esqueleto completo'], ['cranio', 'Crânio e mandíbula'], ['torax', 'Tórax'],
    ['quadril', 'Quadril'], ['umeros', 'Úmeros'], ['antebracos', 'Antebraços'],
    ['maos', 'Mãos'], ['femures', 'Fêmures'], ['pernas', 'Pernas'], ['pes', 'Pés']
  ];

  function demoLandmarks(view, time) {
    const sign = view === 'back' ? -1 : 1;
    const sway = Math.sin(time / 550) * .012;
    const points = [];
    function bilateral(left, right, x, y, motion = 0) {
      points[left] = { x: .5 + (x + motion) * sign, y, visibility: 1 };
      points[right] = { x: .5 - (x - motion) * sign, y, visibility: 1 };
    }
    points[0] = { x: .5, y: .135, visibility: 1 };
    bilateral(2, 5, .035, .14);
    bilateral(7, 8, .072, .16);
    bilateral(11, 12, .15, .29);
    bilateral(13, 14, .205, .43, sway);
    bilateral(15, 16, .225, .565, sway * 2);
    bilateral(19, 20, .235, .61, sway * 2);
    bilateral(23, 24, .105, .585);
    bilateral(25, 26, .115, .76, sway * .35);
    bilateral(27, 28, .125, .915, sway * .55);
    bilateral(29, 30, .125, .94, sway * .55);
    bilateral(31, 32, .155, .968, sway * .55);
    return points;
  }

  function render({ ctx, points, view, screenPoint, image, selected, showJoints, jawOpen }) {
    const wanted = selected === 'todos' ? new Set(parts.map(part => part.id)) :
      new Set(parts.filter(part => part.sector === selected).map(part => part.id));
    const hitSpots = [];
    const joints = [];
    const p = index => {
      const point = points[index];
      return point && Number.isFinite(point.x) && Number.isFinite(point.y) &&
        point.x >= -.03 && point.x <= 1.03 && point.y >= -.03 && point.y <= 1.03 &&
        (point.visibility ?? 1) >= .35 ? screenPoint(point) : null;
    };
    const midpoint = (a, b) => a && b ? { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 } : null;
    const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
    const shoulderLeft = p(11), shoulderRight = p(12), hipLeft = p(23), hipRight = p(24);
    const shoulders = midpoint(shoulderLeft, shoulderRight);
    const hips = midpoint(hipLeft, hipRight);
    const torso = shoulders && hips ? distance(shoulders, hips) : 0;
    const shoulderWidth = shoulderLeft && shoulderRight ? distance(shoulderLeft, shoulderRight) : 0;
    const hipWidth = hipLeft && hipRight ? distance(hipLeft, hipRight) : 0;

    function record(id, center, radius) {
      hitSpots.push({ x: center.x, y: center.y, radius: Math.max(15, radius), organ: byId[id] });
    }
    function putImage(id, center, width, height, angle = 0, anchorY = .5) {
      if (!wanted.has(id) || !center || width < 3 || height < 3) return;
      const entry = image(id, view);
      if (!entry.ready) return;
      const crop = entry.crop;
      ctx.save();
      ctx.translate(center.x, center.y);
      ctx.rotate(angle);
      ctx.globalAlpha = .94;
      ctx.drawImage(entry.image, crop.sx, crop.sy, crop.w, crop.h,
        -width / 2, -height * anchorY, width, height);
      ctx.restore();
      record(id, center, Math.max(width, height) * .44);
    }
    function connector(a, b, width) {
      if (!a || !b) return;
      ctx.save();
      ctx.strokeStyle = '#f9deb1';
      ctx.lineWidth = Math.max(5, width);
      ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      ctx.restore();
    }
    function segment(id, start, end, thickness, label) {
      if (!wanted.has(id) || !start || !end) return;
      const length = distance(start, end);
      if (length < 10) return;
      connector(start, end, thickness * .32);
      const angle = Math.atan2(end.y - start.y, end.x - start.x) - Math.PI / 2;
      const center = midpoint(start, end);
      putImage(id, center, thickness, length * 1.10, angle);
      joints.push({ point: start, label }, { point: end, label });
    }
    function central(id, center, width, height) {
      if (wanted.has(id)) putImage(id, center, width, height);
    }

    // O tórax e a pelve seguem o tronco; a ligação vertebral cruza a cintura.
    if (shoulders && hips && torso >= 20) {
      if (wanted.has('torax') || wanted.has('quadril')) connector(shoulders, hips, Math.max(7, shoulderWidth * .10));
      central('torax', { x: shoulders.x + (hips.x - shoulders.x) * .36,
        y: shoulders.y + (hips.y - shoulders.y) * .36 }, shoulderWidth * 1.12, torso * .98);
      central('quadril', hips, Math.max(hipWidth * 1.27, shoulderWidth * .65), torso * .35);
      joints.push({ point: hips, label: 'Coluna e quadril' });
    } else if (shoulders && shoulderWidth >= 20) {
      central('torax', { x: shoulders.x, y: shoulders.y + shoulderWidth * .42 },
        shoulderWidth * 1.12, shoulderWidth * 1.05);
    } else if (hips && hipWidth >= 20) {
      central('quadril', hips, hipWidth * 1.27, hipWidth * .55);
    }

    const earLeft = p(7), earRight = p(8);
    const eyeLeft = p(2), eyeRight = p(5);
    const face = midpoint(earLeft, earRight) || midpoint(eyeLeft, eyeRight) || p(0);
    const faceWidth = earLeft && earRight ? distance(earLeft, earRight) * 1.35 :
      eyeLeft && eyeRight ? distance(eyeLeft, eyeRight) * 2.8 : shoulderWidth * .52;
    if (face && faceWidth >= 12) {
      const head = { x: face.x, y: face.y - faceWidth * .13 };
      const headHeight = faceWidth * 1.03;
      if (shoulders && wanted.has('cranio')) connector(
        { x: head.x, y: head.y + headHeight * .38 }, shoulders, faceWidth * .12);
      central('cranio', head, faceWidth, headHeight);
      if (wanted.has('mandibula') && view === 'front') {
        // As extremidades superiores permanecem nas articulações próximas às orelhas.
        // Ao abrir, o queixo desce enquanto os dentes inferiores se afastam dos superiores.
        const jawTop = head.y + headHeight * .29;
        const jawHeight = headHeight * (.35 + .17 * jawOpen);
        const jaw = { x: head.x, y: jawTop + jawHeight / 2 };
        putImage('mandibula', jaw, faceWidth * .67, jawHeight);
        if (showJoints) {
          joints.push({ point: { x: head.x - faceWidth * .30, y: jawTop }, label: 'Mandíbula' });
          joints.push({ point: { x: head.x + faceWidth * .30, y: jawTop }, label: 'Mandíbula' });
        }
      } else if (wanted.has('mandibula') && view === 'back') {
        putImage('mandibula', { x: head.x, y: head.y + headHeight * .39 },
          faceWidth * .58, headHeight * .28);
      }
      if (shoulders) joints.push({ point: shoulders, label: 'Pescoço' });
    }

    const sides = [
      { shoulder: 12, elbow: 14, wrist: 16, finger: 20, hip: 24, knee: 26, ankle: 28, toe: 32,
        humerus: 'umero_direito', forearm: 'antebraco_direito', hand: 'mao_direita',
        femur: 'femur_direito', shin: 'perna_direita', foot: 'pe_direito', label: 'direito' },
      { shoulder: 11, elbow: 13, wrist: 15, finger: 19, hip: 23, knee: 25, ankle: 27, toe: 31,
        humerus: 'umero_esquerdo', forearm: 'antebraco_esquerdo', hand: 'mao_esquerda',
        femur: 'femur_esquerdo', shin: 'perna_esquerda', foot: 'pe_esquerdo', label: 'esquerdo' }
    ];
    for (const side of sides) {
      const sh = p(side.shoulder), elbow = p(side.elbow), wrist = p(side.wrist), finger = p(side.finger);
      const hip = p(side.hip), knee = p(side.knee), ankle = p(side.ankle), toe = p(side.toe);
      const upperArm = sh && elbow ? distance(sh, elbow) : 0;
      const lowerArm = elbow && wrist ? distance(elbow, wrist) : 0;
      const upperLeg = hip && knee ? distance(hip, knee) : 0;
      const lowerLeg = knee && ankle ? distance(knee, ankle) : 0;
      segment(side.humerus, sh, elbow, upperArm * .31, `Ombro/cotovelo ${side.label}`);
      segment(side.forearm, elbow, wrist, lowerArm * .32, `Cotovelo/punho ${side.label}`);
      const handEnd = finger || (elbow && wrist ? {
        x: wrist.x + (wrist.x - elbow.x) * .34, y: wrist.y + (wrist.y - elbow.y) * .34 } : null);
      segment(side.hand, wrist, handEnd, Math.max(lowerArm * .31, 8), `Punho ${side.label}`);
      segment(side.femur, hip, knee, upperLeg * .30, `Quadril/joelho ${side.label}`);
      segment(side.shin, knee, ankle, lowerLeg * .29, `Joelho/tornozelo ${side.label}`);
      if (wanted.has(side.foot) && ankle && lowerLeg >= 12) {
        const width = lowerLeg * .63;
        const height = width * (view === 'back' ? .70 : .91);
        const shift = toe ? Math.max(-.4, Math.min(.4, (toe.x - ankle.x) / Math.max(15, distance(ankle, toe)) * .25)) : 0;
        putImage(side.foot, { x: ankle.x - Math.sin(shift) * height * .35,
          y: ankle.y + height * .40 }, width, height, -shift);
        joints.push({ point: ankle, label: `Tornozelo ${side.label}` });
      }
    }
    if (showJoints) {
      const used = new Set();
      for (const joint of joints) {
        const key = `${Math.round(joint.point.x)}:${Math.round(joint.point.y)}`;
        if (used.has(key)) continue;
        used.add(key);
        ctx.save();
        ctx.fillStyle = '#fde68a';
        ctx.strokeStyle = '#7f1d1d';
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(joint.point.x, joint.point.y, 4.5, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke(); ctx.restore();
      }
    }
    return hitSpots;
  }

  const api = { parts, sectors, demoLandmarks, render };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.SkeletonRig = api;
})(typeof window !== 'undefined' ? window : globalThis);
