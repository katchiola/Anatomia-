# Histórico de versões

## Regra de versionamento

1. O `index.html` da raiz representa sempre a versão ativa.
2. Uma versão publicada nunca deve ser sobrescrita dentro de `versoes/`.
3. Antes de iniciar uma nova versão, confirme que a versão ativa possui uma cópia em `versoes/v<numero>/`.
4. Faça as alterações no `index.html` da raiz e use o próximo número sequencial.
5. Depois de testar, copie os arquivos finais para `versoes/v<novo-numero>/`.
6. Atualize `VERSAO_ATUAL`, este histórico e o número mostrado no aplicativo.
7. Gere um ZIP em `pacotes/` quando a versão for concluída.
8. Após comparar e informar as diferenças, publique o `index.html`, a documentação e os recursos da versão no GitHub; confira que o número exibido no site corresponde à versão enviada.

Se uma versão nova apresentar erro, restaure o `index.html` da última pasta estável em `versoes/`.

## Versões preservadas

### 1.0

- Protótipo inicial com câmera, MediaPipe e órgãos simplificados em Three.js.

### 1.1

- Tratamento mais detalhado de erros da câmera e tentativa de melhorar o carregamento do 3D.

### 1.2

- CDNs alternativas e tentativas de compatibilidade com Safari para Three.js e MediaPipe.

### 1.3

- Substituição do 3D por Canvas 2D.
- MediaPipe carregado como script clássico para melhorar a compatibilidade com iPhone.
- Controles de câmera, nomes e espelhamento.

### 1.4 — publicada anteriormente no GitHub

- Órgãos substituídos por desenhos vetoriais com `Path2D`.
- Gradientes, contornos e detalhes internos.
- Ajuste do espelhamento e posicionamento sobre o tronco.
- Versão anterior do GitHub Pages, preservada em `versoes/v1.4/` e no histórico do repositório.

### 1.5 — primeira integração local, preservada

- Criado o conjunto-base de 88 ilustrações: oito ângulos para cada um dos onze órgãos.
- Arquivos salvos como PNG RGBA em `orgaos/vistas/`.
- As imagens foram conectadas ao rastreamento na primeira versão local 1.5; a publicação ficou para a revisão 1.5.1.
- Pulmões e rins divididos em órgãos direito e esquerdo, com oito arquivos para cada lado (32 novas imagens). Os conjuntos em pares foram preservados como referência.
- Os novos ângulos são rascunhos: algumas vistas laterais e posteriores dos rins ainda precisam de correção visual/anatômica antes de uso no aplicativo.
- A primeira vista frontal do pulmão esquerdo, com brilho de fundo, foi preservada em `orgaos/vistas/arquivados/` ao ser substituída por uma versão mais limpa.
- Pulmão direito e rim direito refeitos usando as imagens frontais enviadas pelo usuário: foram criadas vistas laterais estreitas, costas sem detalhes frontais e diagonais intermediárias. A primeira tentativa dos dois conjuntos está preservada em `orgaos/vistas/arquivados/`.
- Na primeira etapa, apenas os órgãos direitos foram refeitos; a revisão permaneceu visual, sem integração à versão 1.4.
- Pulmão esquerdo e rim esquerdo refeitos pelo mesmo processo: perfis externo/interno, costas e diagonais intermediárias. As primeiras tentativas foram preservadas em `orgaos/vistas/arquivados/`; a prévia de rotação agora permite escolher os quatro órgãos.
- A revisão das imagens continua pendente de validação anatômica e de continuidade em movimento.
- Em 23/10/2026, foram corrigidas parcialmente vistas do pulmão direito e cérebro; as sequências anteriores foram arquivadas. A tentativa de corrigir a bexiga foi preservada, mas não incorporada por criar uma descontinuidade. A prévia agora mostra qualquer um dos 13 órgãos ou conjuntos sincronizados. As pendências restantes estão registradas em `orgaos/vistas/REVISAO-2026-10-23.md`.
- Integração local: 13 órgãos com oito vistas, escolha automática aproximada pelo giro do tronco, controle manual, demonstração sem câmera, seleção de órgãos e carregamento de imagens sob demanda. Testes automatizados de sintaxe, caminhos das 104 imagens e seleção de ângulos passaram; a câmera no celular ainda precisa de teste humano.

### 1.5.1 — publicada; troca de ângulos reprovada no teste com celular

- Ao ativar o controle manual durante o uso da câmera, mantém a vista que estava selecionada automaticamente, evitando um salto para a frente.
- Preservada em `versoes/v1.5.1/` com todos os 104 PNGs e publicada no GitHub Pages. O teste do usuário mostrou que a mudança de lado e a vista de costas não funcionavam bem.

### 1.5.2 — preservada localmente, aguardando teste no celular

- Removidas do aplicativo as seis opções laterais e diagonais: agora há somente frente e costas.
- A detecção automática usa a ordem dos ombros e quadris, mantém a última vista quando a pessoa está de lado e exige três leituras estáveis antes de trocar de frente para costas ou vice-versa.
- Ao selecionar costas, usa `05-costas.png` para cada órgão, inverte a posição anatômica no corpo sem espelhar novamente a ilustração posterior e mantém a correção manual.
- Teste automatizado confirma os 13 órgãos, as 26 imagens usadas, a troca automática e a preservação das imagens antigas. Falta repetir o teste no celular; o GitHub Pages permanece na 1.5.1.

### 1.5.3 — preservada localmente, aguardando teste no celular

- Após fotos do teste da 1.5.1, todos os 13 órgãos passaram a aparecer por padrão; o filtro antigo exibia somente oito órgãos principais e ocultava pâncreas, baço, bexiga e os dois rins.
- Desenhos menores e posições relativas ajustadas: pulmões e coração no tórax, órgãos digestivos no abdome superior, rins posteriormente no abdome superior, intestinos abaixo e bexiga na pelve.
- Nomes começam ocultos para evitar sobreposição; o usuário pode ativá-los, tocar no órgão ou isolá-lo pelo menu. Quando a pessoa está distante, o app recomenda aproximá-la da câmera.
- Testes automatizados de seleção, caminhos das 26 imagens, posições relativas e troca frente/costas passaram. A câmera real ainda precisa de um novo teste no celular. Não publicada no GitHub.

### 1.5.4 — publicada; preservada

- O cérebro passa a usar o tamanho e a posição das orelhas ou dos olhos quando a cabeça está próxima da câmera.
- Os órgãos do tronco continuam escalando quando somente os ombros ou somente os quadris estão visíveis; a posição do restante do tronco é estimada a partir do par disponível.
- A vista frente/costas pode ser inferida também por um par de pontos visíveis, e o app informa quando a câmera está próxima demais para reconhecer uma referência corporal.
- Testes simulados confirmam aumento proporcional do cérebro, pulmão e bexiga, além da seleção das 26 imagens de frente/costas. Publicada no GitHub; a câmera real ainda precisa de teste no celular.

### 1.5.5 — publicada; preservada

- Após a foto de teste da versão 1.5.4, coração, fígado, estômago e intestinos grosso e delgado foram ampliados; o pâncreas foi reduzido.
- Os centros dos órgãos foram mantidos para preservar o posicionamento alcançado na versão anterior.
- Testes automatizados confirmam as seis proporções ajustadas, os 13 órgãos, as vistas de frente e costas e a ampliação em closes. A aparência com câmera real ainda precisa de conferência no celular.

### 1.5.6 — publicada; preservada

- A foto de teste da 1.5.5 mostrou que a ampliação anterior ainda era discreta. Coração, fígado, estômago, intestino grosso e intestino delgado foram ampliados em aproximadamente 30% a 35% adicionais.
- O fígado foi deslocado levemente para o centro para permanecer dentro da largura do tronco. O pâncreas manteve o tamanho da 1.5.5, aprovado no teste visual.
- Testes automatizados passaram para tamanhos, 13 órgãos, vistas de frente/costas e ampliação em closes. A proporção final ainda precisa de nova conferência com câmera real.

### 2.0 — preservada; validação no celular identificou ajuste necessário na mandíbula

- Adicionado seletor Sistema para alternar entre Órgãos e Ossos. Os dois sistemas não aparecem simultaneamente e a troca não reinicia a câmera.
- Mantidos os 13 órgãos, filtros, imagens de frente/costas e proporções da 1.5.6.
- Integradas 16 peças ósseas em nove setores, com 32 ilustrações de frente e costas. Cada membro é posicionado entre pontos corporais próprios; a perda de um ponto oculta somente as peças dependentes dele.
- Incluídos marcadores opcionais das articulações e mandíbula separada com controle manual de abertura na vista frontal. A demonstração mostra o esqueleto completo sem câmera.
- A mensagem de ajuda fica abaixo da área da imagem no modo Ossos para não encobrir os pés.
- Testes locais passaram para os órgãos, ossos, setores, vistas, movimento dos membros e mandíbula. A montagem e o desempenho com a câmera real ainda precisam de teste no celular.

### 2.0.1 — preservada; abertura ainda discreta no teste do celular

- A mandíbula fechada foi reposicionada abaixo dos dentes superiores. A abertura manual agora é visível e mantém as extremidades superiores próximas às articulações do crânio.
- Os controles de abertura da boca e articulações foram movidos para logo abaixo da imagem, com acesso mais fácil no celular.
- Teste local confirmou as posições fechada e aberta, a separação entre Órgãos e Ossos e as vistas de frente e costas. Falta conferir com câmera real no celular.

### 2.0.2 — preservada; teste no celular confirmou que a boca não é reconhecida automaticamente

- Abertura da mandíbula ampliada para permanecer visível quando o crânio está pequeno na tela.
- O botão aplica imediatamente a posição aberta ou fechada, independentemente da velocidade do reconhecimento da câmera.
- O script dos ossos recebe um número de versão no endereço para evitar o uso de uma cópia antiga armazenada pelo navegador.
- Prévia em largura de celular confirmou a diferença entre boca fechada e aberta; falta repetir com câmera real.

### 3.0 — versão ativa; validação no celular pendente

- Adicionado o terceiro sistema **Músculos**, separado de Órgãos e Ossos, com troca sem reiniciar a câmera.
- Desenhados 36 grupos musculares esquemáticos em nove regiões: 20 aparecem de frente e 18 de costas. Cada grupo pode ser selecionado pelo filtro ou tocado para mostrar sua função.
- Braços, antebraços, coxas e pernas acompanham as mesmas articulações reconhecidas no modo Ossos. Cabeça e tronco usam os pontos disponíveis; em closes, os músculos visíveis continuam escalando pelas referências presentes.
- A demonstração exibe uma silhueta muscular nas duas vistas. Os 13 órgãos e 16 ossos permanecem acessíveis em seus modos.
- Testes locais passaram para as três modalidades, ambas as vistas, filtros, movimento dos membros e closes. A precisão visual com câmera real ainda precisa de conferência no celular.
