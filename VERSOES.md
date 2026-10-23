# Histórico de versões

## Regra de versionamento

1. O `index.html` da raiz representa sempre a versão ativa.
2. Uma versão publicada nunca deve ser sobrescrita dentro de `versoes/`.
3. Antes de iniciar uma nova versão, confirme que a versão ativa possui uma cópia em `versoes/v<numero>/`.
4. Faça as alterações no `index.html` da raiz e use o próximo número sequencial.
5. Depois de testar, copie os arquivos finais para `versoes/v<novo-numero>/`.
6. Atualize `VERSAO_ATUAL`, este histórico e o número mostrado no aplicativo.
7. Gere um ZIP em `pacotes/` quando a versão for concluída.
8. Só então publique o `index.html`, a documentação e os recursos da versão no GitHub.

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

### 1.5.1 — atual, publicada; teste no celular pendente

- Ao ativar o controle manual durante o uso da câmera, mantém a vista que estava selecionada automaticamente, evitando um salto para a frente.
- Preservada em `versoes/v1.5.1/` com todos os 104 PNGs e publicada no GitHub Pages. A câmera e o alinhamento ainda precisam de validação em um celular.
