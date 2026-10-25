# Roteiro para a versão 2.0 — Órgãos e Ossos

**Estado:** integração inicial concluída na versão 2.0. Testes locais passaram; conferência com câmera real no celular ainda pendente. A abertura da mandíbula é manual nesta versão.

## Objetivo

Adicionar um seletor **Sistema: Órgãos | Ossos**. Ao escolher Órgãos, manter os 13 órgãos, as imagens, os tamanhos, os filtros e o funcionamento atuais. Ao escolher Ossos, mostrar o esqueleto sobre a pessoa, com filtros por nove setores. A câmera, a demonstração, os nomes e a escolha entre frente e costas são compartilhados pelos dois modos.

## Nove setores do menu Ossos

| Setor | Peças desenhadas |
| --- | --- |
| 1. Crânio | Crânio e mandíbula como peças separadas, ligadas pelas articulações temporomandibulares |
| 2. Tórax | Costelas, esterno, clavículas, escápulas e coluna no tronco |
| 3. Quadril | Pelve e sacro |
| 4. Úmeros | Direito e esquerdo |
| 5. Antebraços | Rádio e ulna de cada lado |
| 6. Mãos | Direita e esquerda, simplificadas |
| 7. Fêmures | Direito e esquerdo |
| 8. Pernas | Tíbia e fíbula de cada lado |
| 9. Pés | Direito e esquerdo, simplificados |

Os nove setores correspondem a **16 peças visuais**: crânio, mandíbula, tórax, quadril e seis pares direito/esquerdo. A ulna, a fíbula e a coluna entram nos setores acima para formar uma estrutura mais coerente sem criar novos setores no menu. O filtro de um setor bilateral mostra os dois lados; tocar em uma peça identifica o lado e apresenta sua função.

## Boneco articulado

Construir o esqueleto como um boneco de animação simples, com peças ligadas por pontos de articulação. O quadril é a base do tronco; o tórax se liga ao quadril; o pescoço e o crânio se ligam ao tórax; a mandíbula se liga ao crânio. Cada braço segue ombro → úmero → cotovelo → antebraço → punho → mão. Cada perna segue quadril → fêmur → joelho → perna → tornozelo → pé. Assim, quando um segmento se move, as peças vizinhas continuam conectadas.

Mostrar, no modo Ossos, pequenos marcadores que podem ser ligados ou desligados nas articulações principais: mandíbula, pescoço, ombros, cotovelos, punhos, quadris, joelhos e tornozelos. Ao selecionar um setor, destacar suas articulações e explicar o movimento possível.

**Mandíbula:** desenhar uma peça móvel separada do crânio, com os dois pontos da articulação temporomandibular próximos às orelhas. Na demonstração, incluir um controle **Abrir/fechar boca** e uma animação curta. Na câmera, usar reconhecimento facial para acompanhar a abertura quando o rosto estiver visível; se o rosto não for reconhecido, manter a mandíbula em repouso e permitir o controle manual. A animação educativa combina rotação e um pequeno deslocamento, simplificando o movimento real da articulação. De costas, manter a mandíbula fechada e não mostrar a animação da boca.

## Imagens

- A primeira coleção de ilustrações transparentes foi gerada em `ossos/`: duas referências de corpo inteiro e 32 arquivos de peças. Se houver referências visuais preferidas, usá-las; as imagens fornecidas pelo usuário também poderão substituir a coleção criada.
- Preparar **frente e costas** das 16 peças: 32 arquivos de base. A arte posterior da mandíbula deve respeitar a vista de costas, sem mostrar dentes ou abertura frontal. Não retomar as vistas laterais nesta fase.
- Guardar as imagens em `ossos/vistas/<peca>/01-frente.png` e `ossos/vistas/<peca>/05-costas.png`. Definir a posição anatômica e a escala de cada peça antes da integração.
- Conferir lado direito/esquerdo, continuidade nas articulações e diferenças reais entre frente e costas. Usar as imagens apenas como material educativo ilustrativo.
- A galeria `ossos/previsualizar.html` permite comparar as duas vistas; `ossos/vistas/manifest.json` identifica as peças e `ossos/PROMPTS.md` registra as diretrizes de geração. A montagem e a validação anatômica fina ainda são etapas pendentes.

## Posição e movimento

- Crânio acompanha a cabeça; tórax acompanha ombros e tronco; quadril acompanha a pelve.
- Úmero acompanha ombro–cotovelo; antebraço acompanha cotovelo–punho; mão acompanha punho e pontos aproximados da mão.
- Fêmur acompanha quadril–joelho; perna acompanha joelho–tornozelo; pé acompanha tornozelo, calcanhar e ponta aproximada do pé.
- Cada peça dos membros gira e muda de tamanho conforme o seu próprio segmento. Não usar apenas a escala do tronco para braços e pernas.
- Frente/costas, troca de lado e espelhamento devem manter a anatomia correta. Quando os pontos de uma peça não forem confiáveis, ocultar apenas essa peça e manter as demais visíveis. Suavizar oscilações para reduzir tremor.
- O rastreamento corporal oferece somente pontos aproximados para mãos e pés; a versão 2.0 mostrará uma representação simplificada dessas regiões, sem prometer posicionamento preciso dos dedos.
- O rastreamento corporal atual não mede diretamente a abertura da mandíbula. Avaliar o Face Landmarker somente no modo Ossos para obter o sinal de abertura da boca, sem prejudicar o desempenho no celular; manter o controle manual como alternativa.

## Interface

- Adicionar **Sistema** antes do filtro atual. No modo Órgãos, manter o filtro e o comportamento da 1.5.6. No modo Ossos, trocar o filtro por **Esqueleto completo** e pelos nove setores.
- Manter a escolha de frente/costas, correção manual, demonstração, câmera, espelhamento, nomes e toque para informações.
- No modo Ossos, incluir **Articulações: mostrar/ocultar**. O controle da mandíbula aparece quando o setor Crânio está selecionado e também na demonstração do esqueleto completo.
- Ao trocar de sistema, atualizar imagens, opções do filtro, textos de ajuda e seleção sem reiniciar a câmera.
- Na demonstração, criar pontos simulados para braços e pernas e animar discretamente braços, pernas e mandíbula, permitindo conferir as articulações sem câmera.

## Preservação e validação

- Preservar `versoes/v1.5.6/` e seu ZIP sem alterações. Manter os recursos de órgãos separados dos de ossos.
- Testar regressão dos 13 órgãos, nove setores, 16 peças, 32 imagens, frente/costas, lados direito/esquerdo, articulações, demonstração, troca de sistema e toque nas peças.
- Conferir no celular pessoa inteira e aproximações, braços e pernas em posições diferentes, vista de costas, perda parcial de pontos, abertura da mandíbula e desempenho do reconhecimento facial.
- Quando a 2.0 estiver concluída e validada, criar cópia imutável e ZIP, atualizar o número exibido no aplicativo e publicar conforme a regra de versionamento do projeto.

**Referências técnicas:** [pontos do corpo reconhecidos pelo MediaPipe Pose](https://github.com/google-ai-edge/mediapipe/blob/master/mediapipe/modules/pose_landmark/pose_landmark_gpu.pbtxt), [sinal de abertura da mandíbula no Face Landmarker](https://ai.google.dev/edge/api/mediapipe/python/mp/tasks/vision/drawing_styles/face_landmarker/Blendshapes) e [movimento da articulação temporomandibular](https://www.ncbi.nlm.nih.gov/books/NBK271/).
