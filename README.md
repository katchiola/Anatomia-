# Anatomia Mágica

Aplicativo web educativo de anatomia em realidade aumentada. Usa a câmera do celular e o MediaPipe Pose para posicionar órgãos, ossos ou grupos musculares sobre a pessoa.

## Versão atual

**3.2 (teste local concluído; validação com a câmera do celular pendente)**

O arquivo `index.html` da raiz é a versão ativa. A versão 3.1 permanece preservada em `versoes/v3.1/` e no ZIP respectivo. As versões anteriores continuam disponíveis nas cópias locais em `versoes/` e `pacotes/` e no histórico do GitHub.

A versão 3.2 refaz a peça muscular da cabeça nas duas vistas: os músculos da face e da nuca agora aparecem sobre o crânio, com um pescoço curto ligando a peça ao tronco. O posicionamento sobre o rosto foi ajustado para incluir o topo da cabeça. As outras oito regiões musculares, os órgãos e os ossos permanecem disponíveis.

A versão 3.1 substitui os desenhos esquemáticos do modo Músculos por 18 imagens anatômicas: frente e costas para rosto, tórax, abdome, braço, antebraço, coxa, perna, mão e pé. Elas formam 15 peças no corpo, com membros direito e esquerdo espelhados. As peças seguem as articulações reconhecidas e podem ser filtradas por nove regiões. Os originais estão em `musculos/rascunhos/vistas/`, as imagens transparentes otimizadas usadas no aplicativo estão em `musculos/vistas/`, e `musculos/previsualizar.html` mostra ambas as vistas.

A versão 3.0 acrescentou **Músculos** ao seletor de sistemas, com desenhos esquemáticos feitos pelo aplicativo. Os três modos aparecem separadamente, sem reiniciar a câmera. Cabeça, tronco, braços e pernas acompanham os pontos corporais usados pelo esqueleto; peças sem referências visíveis deixam de aparecer. Consulte `musculos/README.md` para a versão atual das imagens.

A versão 2.0 acrescenta o seletor **Sistema: Órgãos | Ossos**. Só um sistema é desenhado por vez. No modo Ossos, há um esqueleto de 16 peças distribuídas em nove setores, com imagens próprias de frente e costas. Crânio e mandíbula são separados; o botão **Abrir/fechar boca** move a mandíbula na vista frontal. O botão **Articulações** mostra pontos de ligação. Na câmera, cada úmero segue ombro e cotovelo, cada antebraço segue cotovelo e punho, cada fêmur segue quadril e joelho, e cada perna segue joelho e tornozelo. Mãos e pés usam os pontos aproximados disponíveis. Se algum ponto faltar, apenas as peças dependentes dele deixam de aparecer.

Na versão 2.0.1, a mandíbula fechada foi baixada até os dentes superiores e sua abertura foi ampliada. As extremidades superiores permanecem junto às articulações do crânio enquanto o queixo desce. Os botões de boca e articulações ficam logo abaixo da imagem para acesso mais fácil no celular.

Na versão 2.0.2, o botão aplica a abertura completa imediatamente e o espaço entre os dentes fica maior para aparecer mesmo quando o rosto está pequeno na tela. O arquivo de posicionamento dos ossos usa um endereço com número da versão para evitar que o celular carregue a lógica antiga do cache.

O modo Órgãos conserva os 13 órgãos, seus filtros, tamanhos, imagens e comportamento da versão 1.5.6. A demonstração permite testar ossos e músculos sem câmera. As peças dos ossos ficam em `ossos/vistas/`; consulte `ossos/README.md` e a prévia `ossos/previsualizar.html`.

Os três modos mostram apenas frente e costas. No modo câmera, a ordem dos pontos visíveis da cabeça, dos ombros e dos quadris indica a orientação; ao ficar de lado, o app mantém a última vista. Há correção manual quando necessário.

Todos os 13 órgãos aparecem por padrão, inclusive pâncreas, baço, bexiga e os dois rins. Após a foto da versão 1.5.5, coração, fígado, estômago e intestinos receberam um aumento adicional de aproximadamente 30% a 35%. O fígado foi ligeiramente centralizado; o pâncreas manteve o tamanho aprovado. Os nomes começam ocultos para não cobrir o corpo; é possível ativá-los, tocar em um órgão para conhecer sua função ou isolá-lo no menu. Se a pessoa estiver pequena na imagem, o aplicativo recomenda aproximá-la da câmera.

Ao aproximar a câmera, a escala do cérebro acompanha a largura da cabeça; os órgãos do tronco acompanham os ombros quando os quadris saem da imagem, ou os quadris quando os ombros saem. Se nenhuma dessas referências for detectada, o app mostra uma orientação para afastar um pouco a câmera. Essa aproximação depende de o MediaPipe continuar reconhecendo os pontos visíveis; ainda precisa de validação no celular.

As ilustrações ainda são rascunhos. As outras seis vistas por órgão permanecem guardadas em `orgaos/vistas/` e nos backups, mas não são carregadas pelo aplicativo. Veja `orgaos/vistas/REVISAO-2026-10-23.md`. Teste a câmera e o alinhamento no celular antes de considerar a versão validada.

## Organização

- `index.html`: versão ativa do aplicativo.
- `versoes/`: cópias imutáveis de cada versão concluída.
- `pacotes/`: arquivos ZIP das versões preservadas localmente.
- `orgaos/`: imagens e referências visuais para evolução dos órgãos.
- `ossos/`: 16 peças visuais com frente e costas, demonstração e arquivos de orientação.
- `musculos/`: imagens e posicionamento articulado dos músculos nas vistas frontal e posterior.
- `VERSOES.md`: histórico das versões e procedimento de atualização.
- `VERSAO_ATUAL`: número da versão ativa.

## Executar

Hospede o `index.html` por HTTPS, ou use `localhost`. Abra no Safari do iPhone ou Chrome do Android e permita o acesso à câmera.

É necessária conexão com a internet para carregar o MediaPipe e seu modelo de reconhecimento corporal. Ao hospedar ou transferir o app, mantenha `orgaos/vistas/`, `ossos/vistas/`, `ossos/rig.js`, `musculos/vistas/` e `musculos/rig.js` junto do `index.html`.

Para conferir os 13 órgãos e suas vistas, execute `node tests/vistas.test.cjs`. Para conferir os 16 ossos, execute `node tests/ossos.test.cjs`. Para conferir os músculos, as duas vistas e nove regiões, execute `node tests/musculos.test.cjs`.

## Privacidade e limitações

A câmera é processada no próprio aparelho pelo código do navegador. O aplicativo não possui contas, login ou servidor de armazenamento de imagens.

As posições anatômicas são educativas e aproximadas. O rastreamento do corpo não mede a abertura da boca nem a contração muscular; a mandíbula tem controle manual, e os músculos seguem a posição dos segmentos corporais. Ainda é preciso conferir alinhamento, escala e desempenho da versão 3.2 com câmera real em um celular. O aplicativo não é uma ferramenta médica.
