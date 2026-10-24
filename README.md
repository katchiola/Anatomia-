# Anatomia Mágica

Aplicativo web educativo de anatomia em realidade aumentada. Usa a câmera do celular e o MediaPipe Pose para posicionar desenhos de órgãos sobre o tronco da pessoa.

## Versão atual

**1.5.4 (publicada; teste no celular pendente)**

O arquivo `index.html` da raiz é a versão ativa, publicada no GitHub Pages como 1.5.4. As revisões 1.5.2 e 1.5.3 ficaram preservadas localmente, mas não foram publicadas. As versões anteriores continuam disponíveis no histórico do GitHub e nas cópias locais em `versoes/` e `pacotes/`.

A versão 1.5.4 mostra apenas frente e costas para os 13 órgãos. No modo câmera, a ordem dos pontos visíveis da cabeça, dos ombros e dos quadris indica a orientação; ao ficar de lado, o app mantém a última vista. A troca para costas usa as imagens posteriores e inverte a posição dos órgãos no corpo. Também há correção manual e demonstração sem câmera.

Todos os 13 órgãos aparecem por padrão, inclusive pâncreas, baço, bexiga e os dois rins. Seus desenhos foram reduzidos e reposicionados para respeitar melhor as regiões do tórax, abdome e pelve. Os nomes começam ocultos para não cobrir o corpo; é possível ativá-los, tocar em um órgão para conhecer sua função ou isolá-lo no menu. Se a pessoa estiver pequena na imagem, o aplicativo recomenda aproximá-la da câmera.

Ao aproximar a câmera, a escala do cérebro acompanha a largura da cabeça; os órgãos do tronco acompanham os ombros quando os quadris saem da imagem, ou os quadris quando os ombros saem. Se nenhuma dessas referências for detectada, o app mostra uma orientação para afastar um pouco a câmera. Essa aproximação depende de o MediaPipe continuar reconhecendo os pontos visíveis; ainda precisa de validação no celular.

As ilustrações ainda são rascunhos. As outras seis vistas por órgão permanecem guardadas em `orgaos/vistas/` e nos backups, mas não são carregadas pelo aplicativo. Veja `orgaos/vistas/REVISAO-2026-10-23.md`. Teste a câmera e o alinhamento no celular antes de considerar a versão validada.

## Organização

- `index.html`: versão ativa do aplicativo.
- `versoes/`: cópias imutáveis de cada versão concluída.
- `pacotes/`: arquivos ZIP das versões preservadas localmente.
- `orgaos/`: imagens e referências visuais para evolução dos órgãos.
- `VERSOES.md`: histórico das versões e procedimento de atualização.
- `VERSAO_ATUAL`: número da versão ativa.

## Executar

Hospede o `index.html` por HTTPS, ou use `localhost`. Abra no Safari do iPhone ou Chrome do Android e permita o acesso à câmera.

É necessária conexão com a internet para carregar o MediaPipe e seu modelo de reconhecimento corporal. As imagens dos órgãos são arquivos locais do projeto: ao hospedar ou transferir o app, mantenha os arquivos `01-frente.png` e `05-costas.png` de cada órgão na pasta `orgaos/vistas/` junto do `index.html`.

Para conferir a troca das vistas, os 13 órgãos, as posições relativas e a ampliação em closes simulados, execute `node tests/vistas.test.cjs`.

## Privacidade e limitações

A câmera é processada no próprio aparelho pelo código do navegador. O aplicativo não possui contas, login ou servidor de armazenamento de imagens.

As posições anatômicas são educativas e aproximadas. O aplicativo não é uma ferramenta médica.
