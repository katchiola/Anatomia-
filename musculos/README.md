# Músculos — Anatomia Mágica 3.2

O modo Músculos usa 18 ilustrações anatômicas, uma vista frontal e uma posterior para cada uma das nove regiões: cabeça, tórax, abdome, braço, antebraço, coxa, perna, mão e pé. Na versão 3.2, a peça da cabeça foi refeita para mostrar os músculos integrados ao crânio e ligados por um pescoço curto ao tronco. As imagens finais transparentes ficam em `vistas/`; os originais da cabeça estão em `rascunhos/cranio-v3.2/`, e os demais em `rascunhos/vistas/`. Abra `previsualizar.html` para comparar as duas vistas.

O arquivo `rig.js` posiciona 15 peças sobre o corpo: três peças centrais e seis pares de membros. Os pares usam as mesmas ilustrações espelhadas para o lado esquerdo e direito. Braços, antebraços, coxas e pernas acompanham ombros, cotovelos, punhos, quadris, joelhos e tornozelos reconhecidos pelo MediaPipe Pose. Mãos e pés seguem punhos e tornozelos, com auxílio dos pontos dos dedos quando disponíveis. Rosto e tronco usam as referências corporais visíveis, inclusive em closes.

O seletor mantém nove regiões. Ao tocar numa peça, o aplicativo mostra o nome e a função geral dos músculos daquela região. Órgãos e ossos continuam em modos separados.

Execute `node tests/musculos.test.cjs` para conferir catálogo, arquivos, vistas, filtros, articulações e closes. As imagens são educativas; o encaixe final deve ser conferido com câmera real no celular.
