(function (root) {
  'use strict';

  const parts = [
    { id: 'masseter_esquerdo', name: 'Masseter esquerdo', sector: 'cabeca', views: ['front'], info: 'Ajuda a fechar a mandíbula durante a mastigação.' },
    { id: 'masseter_direito', name: 'Masseter direito', sector: 'cabeca', views: ['front'], info: 'Ajuda a fechar a mandíbula durante a mastigação.' },
    { id: 'nuca', name: 'Músculos da nuca', sector: 'cabeca', views: ['back'], info: 'Ajudam a sustentar e mover a cabeça.' },
    { id: 'pescoco', name: 'Músculos do pescoço', sector: 'cabeca', views: ['front'], info: 'Participam da rotação e inclinação da cabeça.' },
    { id: 'deltoide_esquerdo', name: 'Deltoide esquerdo', sector: 'ombros', views: ['front', 'back'], info: 'Eleva e afasta o braço do corpo.' },
    { id: 'deltoide_direito', name: 'Deltoide direito', sector: 'ombros', views: ['front', 'back'], info: 'Eleva e afasta o braço do corpo.' },
    { id: 'peitoral_esquerdo', name: 'Peitoral esquerdo', sector: 'torax', views: ['front'], info: 'Move o braço em direção ao peito.' },
    { id: 'peitoral_direito', name: 'Peitoral direito', sector: 'torax', views: ['front'], info: 'Move o braço em direção ao peito.' },
    { id: 'trapezio', name: 'Trapézio', sector: 'torax', views: ['back'], info: 'Move e estabiliza as escápulas e o pescoço.' },
    { id: 'dorsal_esquerdo', name: 'Grande dorsal esquerdo', sector: 'torax', views: ['back'], info: 'Puxa o braço para trás e para baixo.' },
    { id: 'dorsal_direito', name: 'Grande dorsal direito', sector: 'torax', views: ['back'], info: 'Puxa o braço para trás e para baixo.' },
    { id: 'reto_abdominal', name: 'Reto abdominal', sector: 'abdomen', views: ['front'], info: 'Ajuda a flexionar o tronco e estabilizar o abdômen.' },
    { id: 'obliquo_esquerdo', name: 'Oblíquo esquerdo', sector: 'abdomen', views: ['front'], info: 'Ajuda a girar e inclinar o tronco.' },
    { id: 'obliquo_direito', name: 'Oblíquo direito', sector: 'abdomen', views: ['front'], info: 'Ajuda a girar e inclinar o tronco.' },
    { id: 'lombar_esquerdo', name: 'Eretores da coluna esquerdos', sector: 'abdomen', views: ['back'], info: 'Ajudam a manter a coluna ereta.' },
    { id: 'lombar_direito', name: 'Eretores da coluna direitos', sector: 'abdomen', views: ['back'], info: 'Ajudam a manter a coluna ereta.' },
    { id: 'biceps_esquerdo', name: 'Bíceps esquerdo', sector: 'bracos', views: ['front'], info: 'Flexiona o cotovelo.' },
    { id: 'biceps_direito', name: 'Bíceps direito', sector: 'bracos', views: ['front'], info: 'Flexiona o cotovelo.' },
    { id: 'triceps_esquerdo', name: 'Tríceps esquerdo', sector: 'bracos', views: ['back'], info: 'Estende o cotovelo.' },
    { id: 'triceps_direito', name: 'Tríceps direito', sector: 'bracos', views: ['back'], info: 'Estende o cotovelo.' },
    { id: 'flexores_esquerdos', name: 'Flexores do antebraço esquerdo', sector: 'antebracos', views: ['front'], info: 'Ajudam a flexionar o punho e os dedos.' },
    { id: 'flexores_direitos', name: 'Flexores do antebraço direito', sector: 'antebracos', views: ['front'], info: 'Ajudam a flexionar o punho e os dedos.' },
    { id: 'extensores_esquerdos', name: 'Extensores do antebraço esquerdo', sector: 'antebracos', views: ['back'], info: 'Ajudam a estender o punho e os dedos.' },
    { id: 'extensores_direitos', name: 'Extensores do antebraço direito', sector: 'antebracos', views: ['back'], info: 'Ajudam a estender o punho e os dedos.' },
    { id: 'flexor_quadril_esquerdo', name: 'Flexores do quadril esquerdos', sector: 'quadril', views: ['front'], info: 'Ajudam a levantar a coxa.' },
    { id: 'flexor_quadril_direito', name: 'Flexores do quadril direitos', sector: 'quadril', views: ['front'], info: 'Ajudam a levantar a coxa.' },
    { id: 'gluteo_esquerdo', name: 'Glúteo esquerdo', sector: 'quadril', views: ['back'], info: 'Estende e estabiliza o quadril.' },
    { id: 'gluteo_direito', name: 'Glúteo direito', sector: 'quadril', views: ['back'], info: 'Estende e estabiliza o quadril.' },
    { id: 'quadriceps_esquerdo', name: 'Quadríceps esquerdo', sector: 'coxas', views: ['front'], info: 'Estende o joelho.' },
    { id: 'quadriceps_direito', name: 'Quadríceps direito', sector: 'coxas', views: ['front'], info: 'Estende o joelho.' },
    { id: 'isquiotibiais_esquerdos', name: 'Isquiotibiais esquerdos', sector: 'coxas', views: ['back'], info: 'Flexionam o joelho e ajudam a estender o quadril.' },
    { id: 'isquiotibiais_direitos', name: 'Isquiotibiais direitos', sector: 'coxas', views: ['back'], info: 'Flexionam o joelho e ajudam a estender o quadril.' },
    { id: 'tibial_esquerdo', name: 'Tibial anterior esquerdo', sector: 'pernas', views: ['front'], info: 'Eleva a ponta do pé.' },
    { id: 'tibial_direito', name: 'Tibial anterior direito', sector: 'pernas', views: ['front'], info: 'Eleva a ponta do pé.' },
    { id: 'panturrilha_esquerda', name: 'Panturrilha esquerda', sector: 'pernas', views: ['back'], info: 'Ajuda a ficar na ponta dos pés e impulsiona a marcha.' },
    { id: 'panturrilha_direita', name: 'Panturrilha direita', sector: 'pernas', views: ['back'], info: 'Ajuda a ficar na ponta dos pés e impulsiona a marcha.' }
  ];
  const sectors = [
    ['todos', 'Musculatura completa'], ['cabeca', 'Cabeça e pescoço'],
    ['ombros', 'Ombros'], ['torax', 'Peito e costas'], ['abdomen', 'Abdômen e lombar'],
    ['bracos', 'Braços'], ['antebracos', 'Antebraços'], ['quadril', 'Quadril e glúteos'],
    ['coxas', 'Coxas'], ['pernas', 'Pernas']
  ];
  const byId = Object.fromEntries(parts.map(part => [part.id, part]));
  const visibleParts = (view, selected = 'todos') => parts.filter(part =>
    part.views.includes(view) && (selected === 'todos' || part.sector === selected));

  function render({ ctx, points, view, screenPoint, selected = 'todos' }) {
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
    const leftShoulder = p(11), rightShoulder = p(12);
    const leftHip = p(23), rightHip = p(24);
    const shoulderPair = mid(leftShoulder, rightShoulder);
    const hipPair = mid(leftHip, rightHip);
    const measuredShoulderWidth = leftShoulder && rightShoulder ? dist(leftShoulder, rightShoulder) : 0;
    const measuredHipWidth = leftHip && rightHip ? dist(leftHip, rightHip) : 0;
    const shoulderWidth = measuredShoulderWidth || measuredHipWidth * 1.45;
    const hipWidth = measuredHipWidth || measuredShoulderWidth * .73;
    const shoulders = shoulderPair || (hipPair && measuredHipWidth >= 18
      ? { x: hipPair.x, y: hipPair.y - measuredHipWidth * 2.4 } : null);
    const hips = hipPair || (shoulderPair && measuredShoulderWidth >= 18
      ? { x: shoulderPair.x, y: shoulderPair.y + measuredShoulderWidth * 1.6 } : null);
    const torso = shoulders && hips ? dist(shoulders, hips) : 0;
    const side = [
      { shoulder: leftShoulder, elbow: p(13), wrist: p(15), hip: leftHip, knee: p(25), ankle: p(27), suffix: 'esquerdo', legSuffix: 'esquerda' },
      { shoulder: rightShoulder, elbow: p(14), wrist: p(16), hip: rightHip, knee: p(26), ankle: p(28), suffix: 'direito', legSuffix: 'direita' }
    ];

    function muscle(id, center, width, height, angle = 0, shape = 'spindle') {
      if (!wanted.has(id) || !center || width < 3 || height < 3) return;
      ctx.save();
      ctx.translate(center.x, center.y);
      ctx.rotate(angle);
      const gradient = ctx.createLinearGradient(-width / 2, 0, width / 2, 0);
      gradient.addColorStop(0, '#7f1d1d');
      gradient.addColorStop(.27, '#dc564d');
      gradient.addColorStop(.57, '#f28b72');
      gradient.addColorStop(1, '#8d2824');
      ctx.fillStyle = gradient;
      ctx.strokeStyle = '#5b1f24';
      ctx.lineWidth = Math.max(1, width * .045);
      ctx.beginPath();
      if (shape === 'fan') {
        ctx.moveTo(0, -height / 2);
        ctx.bezierCurveTo(width * .53, -height * .38, width * .63, height * .32, 0, height / 2);
        ctx.bezierCurveTo(-width * .63, height * .32, -width * .53, -height * .38, 0, -height / 2);
      } else if (shape === 'flat') {
        ctx.ellipse(0, 0, width / 2, height / 2, 0, 0, Math.PI * 2);
      } else {
        ctx.moveTo(0, -height / 2);
        ctx.bezierCurveTo(width * .47, -height * .32, width * .55, height * .19, width * .13, height / 2);
        ctx.lineTo(-width * .13, height / 2);
        ctx.bezierCurveTo(-width * .55, height * .19, -width * .47, -height * .32, 0, -height / 2);
      }
      ctx.closePath();
      ctx.fill(); ctx.stroke();
      ctx.strokeStyle = '#ffd0aa88';
      ctx.lineWidth = Math.max(.8, width * .022);
      ctx.beginPath();
      ctx.moveTo(-width * .15, -height * .31);
      ctx.quadraticCurveTo(-width * .25, 0, -width * .1, height * .3);
      ctx.moveTo(width * .14, -height * .26);
      ctx.quadraticCurveTo(width * .25, 0, width * .1, height * .26);
      ctx.stroke();
      ctx.strokeStyle = '#6c292cb3';
      ctx.lineWidth = Math.max(.7, width * .018);
      if (id === 'reto_abdominal') {
        ctx.beginPath();
        ctx.moveTo(0, -height * .43); ctx.lineTo(0, height * .42);
        for (const y of [-.25, 0, .25]) {
          ctx.moveTo(-width * .34, height * y);
          ctx.quadraticCurveTo(0, height * (y + .06), width * .34, height * y);
        }
        ctx.stroke();
      } else if (id.startsWith('peitoral_') || id === 'trapezio' || id.startsWith('dorsal_')) {
        ctx.beginPath();
        for (const x of [-.22, 0, .22]) {
          ctx.moveTo(0, -height * .38);
          ctx.quadraticCurveTo(width * x, 0, width * x * 1.45, height * .37);
        }
        ctx.stroke();
      } else if (id.startsWith('quadriceps_') || id.startsWith('isquiotibiais_') ||
          id.startsWith('panturrilha_')) {
        ctx.beginPath();
        for (const x of [-.18, .18]) {
          ctx.moveTo(width * x, -height * .30);
          ctx.quadraticCurveTo(width * x * 1.45, 0, width * x * .55, height * .30);
        }
        ctx.stroke();
      }
      ctx.restore();
      hits.push({ x: center.x, y: center.y, radius: Math.max(16, Math.max(width, height) * .43), organ: byId[id] });
    }
    function segment(id, start, end, ratio, along = .5) {
      if (!wanted.has(id) || !start || !end) return;
      const length = dist(start, end);
      if (length < 10) return;
      const center = { x: start.x + (end.x - start.x) * along, y: start.y + (end.y - start.y) * along };
      const angle = Math.atan2(end.y - start.y, end.x - start.x) - Math.PI / 2;
      muscle(id, center, length * ratio, length * .82, angle);
    }

    if (shoulders && shoulderWidth >= 18) {
      const neckTop = mid(p(7), p(8)) || mid(p(2), p(5)) || p(0);
      if (neckTop) {
        const neck = { x: (neckTop.x + shoulders.x) / 2, y: (neckTop.y + shoulders.y) / 2 };
        muscle(view === 'front' ? 'pescoco' : 'nuca', neck,
          shoulderWidth * .20, dist(neckTop, shoulders) * .62);
      }
      if (view === 'back') muscle('trapezio',
        { x: shoulders.x, y: shoulders.y + Math.max(torso, shoulderWidth) * .16 },
        shoulderWidth * .72, Math.max(torso * .32, shoulderWidth * .25), 0, 'fan');
    }

    if (view === 'front') {
      const face = mid(p(7), p(8)) || mid(p(2), p(5));
      const faceWidth = p(7) && p(8) ? dist(p(7), p(8)) :
        p(2) && p(5) ? dist(p(2), p(5)) * 1.8 : 0;
      if (face && faceWidth >= 12) {
        const faceLeft = p(7) || p(2), faceRight = p(8) || p(5);
        muscle('masseter_esquerdo', { x: face.x + (faceLeft?.x - face.x) * .78,
          y: face.y + faceWidth * .28 }, faceWidth * .22, faceWidth * .35);
        muscle('masseter_direito', { x: face.x + (faceRight?.x - face.x) * .78,
          y: face.y + faceWidth * .28 }, faceWidth * .22, faceWidth * .35);
      }
    }

    if (shoulders && hips && torso >= 20 && shoulderWidth >= 18) {
      if (view === 'front') {
        for (const s of side) {
          if (!s.shoulder) continue;
          const x = shoulders.x + (s.shoulder.x - shoulders.x) * .43;
          muscle(`peitoral_${s.suffix}`, { x, y: shoulders.y + torso * .23 },
            shoulderWidth * .42, torso * .27, 0, 'fan');
          muscle(`obliquo_${s.suffix}`, { x: shoulders.x + (s.shoulder.x - shoulders.x) * .72,
            y: shoulders.y + torso * .65 }, shoulderWidth * .23, torso * .34);
          if (s.hip) muscle(`flexor_quadril_${s.suffix}`, { x: hips.x + (s.hip.x - hips.x) * .70,
            y: hips.y - torso * .03 }, hipWidth * .42, torso * .22);
        }
        muscle('reto_abdominal', { x: (shoulders.x + hips.x) / 2,
          y: shoulders.y + torso * .63 }, shoulderWidth * .38, torso * .49, 0, 'flat');
      } else {
        for (const s of side) {
          if (!s.shoulder) continue;
          muscle(`dorsal_${s.suffix}`, { x: shoulders.x + (s.shoulder.x - shoulders.x) * .56,
            y: shoulders.y + torso * .48 }, shoulderWidth * .38, torso * .57, 0, 'fan');
          if (s.hip) {
            muscle(`lombar_${s.suffix}`, { x: hips.x + (s.hip.x - hips.x) * .28,
              y: shoulders.y + torso * .73 }, shoulderWidth * .18, torso * .32);
            muscle(`gluteo_${s.suffix}`, { x: hips.x + (s.hip.x - hips.x) * .58,
              y: hips.y + torso * .10 }, hipWidth * .64, torso * .30, 0, 'flat');
          }
        }
      }
    }

    for (const s of side) {
      if (s.shoulder && s.elbow) {
        const upper = dist(s.shoulder, s.elbow);
        muscle(`deltoide_${s.suffix}`, { x: s.shoulder.x + (s.elbow.x - s.shoulder.x) * .16,
          y: s.shoulder.y + (s.elbow.y - s.shoulder.y) * .16 }, upper * .43, upper * .42, 0, 'fan');
        segment(`${view === 'front' ? 'biceps' : 'triceps'}_${s.suffix}`, s.shoulder, s.elbow, .32, .56);
      }
      segment(`${view === 'front' ? 'flexores' : 'extensores'}_${s.suffix === 'esquerdo' ? 'esquerdos' : 'direitos'}`,
        s.elbow, s.wrist, .29, .46);
      segment(`${view === 'front' ? 'quadriceps' : 'isquiotibiais'}_${s.suffix === 'esquerdo' ? 'esquerdo' : 'direito'}${view === 'back' ? 's' : ''}`,
        s.hip, s.knee, .40, .48);
      segment(view === 'front' ? `tibial_${s.suffix}` : `panturrilha_${s.legSuffix}`,
        s.knee, s.ankle, view === 'front' ? .24 : .38, .45);
    }
    return hits;
  }

  const api = { parts, sectors, visibleParts, render };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.MuscleRig = api;
})(typeof window !== 'undefined' ? window : globalThis);
