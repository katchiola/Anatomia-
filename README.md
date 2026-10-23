# Anatomia Mágica

Aplicativo web educativo de anatomia em realidade aumentada. Usa a câmera do celular e o MediaPipe Pose para posicionar desenhos de órgãos sobre o tronco da pessoa.

## Versão atual

**1.5.1 (publicada; teste no celular pendente)**

O arquivo `index.html` da raiz é a versão ativa, publicada no GitHub Pages junto com as 104 imagens de `orgaos/vistas/` usadas pelo aplicativo. As versões anteriores continuam disponíveis no histórico do GitHub e nas cópias locais em `versoes/` e `pacotes/`.

A versão 1.5.1 usa as oito imagens de cada um dos 13 órgãos em `orgaos/vistas/`. No modo câmera, estima a vista pela posição e profundidade dos ombros e quadris; também há controle manual de ângulo e demonstração sem câmera. É possível exibir órgãos principais, todos os órgãos, os dois pulmões, os dois rins ou um órgão isolado. A revisão 1.5.1 preserva o ângulo atual quando o controle manual é ativado.

As ilustrações ainda são rascunhos e algumas sequências não representam uma rotação anatômica contínua. Veja `orgaos/vistas/REVISAO-2026-10-23.md`. Teste a câmera e o alinhamento no celular antes de considerar a versão validada.

## Organização

- `index.html`: versão ativa do aplicativo.
- `versoes/`: cópias imutáveis de cada versão concluída.
- `pacotes/`: arquivos ZIP das versões preservadas localmente.
- `orgaos/`: imagens e referências visuais para evolução dos órgãos.
- `VERSOES.md`: histórico das versões e procedimento de atualização.
- `VERSAO_ATUAL`: número da versão ativa.

## Executar

Hospede o `index.html` por HTTPS, ou use `localhost`. Abra no Safari do iPhone ou Chrome do Android e permita o acesso à câmera.

É necessária conexão com a internet para carregar o MediaPipe e seu modelo de reconhecimento corporal. As imagens dos órgãos são arquivos locais do projeto: ao hospedar ou transferir o app, mantenha a pasta `orgaos/vistas/` junto do `index.html`.

## Privacidade e limitações

A câmera é processada no próprio aparelho pelo código do navegador. O aplicativo não possui contas, login ou servidor de armazenamento de imagens.

As posições anatômicas são educativas e aproximadas. O aplicativo não é uma ferramenta médica.
