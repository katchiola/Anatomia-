# Músculos — Anatomia Mágica 3.0

O arquivo `rig.js` desenha os grupos musculares diretamente no Canvas do aplicativo. Cada peça tem nome, função, região e vista frontal ou posterior. O catálogo possui 36 grupos: 20 visíveis de frente e 18 de costas; os deltoides aparecem nas duas vistas. Os filtros abrangem nove regiões do corpo.

O desenho segue os pontos da cabeça, dos ombros, cotovelos, punhos, quadris, joelhos e tornozelos fornecidos pelo MediaPipe Pose. Se um ponto necessário estiver ausente, a peça correspondente fica oculta. A câmera não mede contração muscular. Os desenhos mostram a localização geral dos grupos e não pretendem reproduzir todos os detalhes anatômicos.

As funções de renderização são independentes das imagens dos ossos e dos órgãos. Assim, a troca de sistema mantém a câmera ativa e mostra somente o sistema escolhido. A vista frontal e a posterior têm conjuntos próprios de músculos.

Execute `node tests/musculos.test.cjs` para conferir catálogo, filtros, vistas, movimento dos membros e visibilidade em closes. A posição e a escala ainda precisam de avaliação com câmera real no celular.
