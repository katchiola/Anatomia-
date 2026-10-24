# Vistas dos órgãos

Conjunto de ilustrações geradas a partir das referências originais da pasta `orgaos/` para o aplicativo Anatomia Mágica. Na versão 1.5.4, somente `01-frente.png` e `05-costas.png` de cada órgão são carregados; as demais vistas permanecem guardadas para revisão e restauração.

Cada conjunto possui oito arquivos PNG com transparência, numerados na ordem de rotação pretendida ao redor do corpo. `Esquerda` e `direita` referem-se sempre ao lado anatômico da pessoa, não ao lado da tela:

1. `01-frente.png` — anterior, 0°
2. `02-diagonal-frontal-esquerda.png` — anterior esquerda, 45°
3. `03-lateral-esquerda.png` — lateral esquerda, 90°
4. `04-diagonal-traseira-esquerda.png` — posterior esquerda, 135°
5. `05-costas.png` — posterior, 180°
6. `06-diagonal-traseira-direita.png` — posterior direita, 225°
7. `07-lateral-direita.png` — lateral direita, 270°
8. `08-diagonal-frontal-direita.png` — anterior direita, 315°

## Órgãos disponíveis

- `baco`
- `bexiga`
- `cerebro`
- `coracao`
- `delgado`
- `estomago`
- `figado`
- `grosso`
- `pancreas`
- `pulmao_direito`
- `pulmao_esquerdo`
- `rim_direito`
- `rim_esquerdo`

Os conjuntos anteriores `pulmao/` e `rins/`, com os dois órgãos juntos, foram preservados apenas como referência. Eles não constam mais entre os conjuntos individuais do `manifest.json`.

Uma primeira tentativa da vista frontal do pulmão esquerdo, com brilho indesejado no fundo, foi preservada em `arquivados/`; a vista atual usa um recorte limpo.

## Revisão de rotação dos pulmões e rins

O `pulmao_direito/` e o `rim_direito/` foram refeitos a partir das duas imagens frontais fornecidas pelo usuário. Primeiro foram geradas e conferidas as vistas de perfil e de costas. Depois, as diagonais foram geradas entre essas vistas vizinhas. Assim, a silhueta e a visibilidade de brônquios, vasos e ureter mudam ao longo da sequência. A primeira tentativa completa de cada órgão foi guardada em `arquivados/pulmao_direito-2026-10-22-primeira-tentativa/` e `arquivados/rim_direito-2026-10-22-primeira-tentativa/`.

O mesmo processo foi aplicado ao `pulmao_esquerdo/` e ao `rim_esquerdo/`, mantendo suas imagens frontais como referência. No lado esquerdo, os perfis externos ocultam os brônquios/vasos, enquanto o perfil interno os revela. As versões anteriores estão em `arquivados/pulmao_esquerdo-2026-10-22-primeira-tentativa/` e `arquivados/rim_esquerdo-2026-10-22-primeira-tentativa/`.

Abra `previsualizar-rotacao.html` para percorrer manualmente ou reproduzir os oito ângulos dos quatro órgãos.

**Estado atual: integrado como ilustração educativa, ainda em revisão.** Os conjuntos distinguem frente, perfis, diagonais e costas, mas foram gerados como ilustrações separadas: não há uma geometria 3D única que garanta continuidade perfeita ou precisão anatômica. O aplicativo usa apenas frente e costas; a prévia acima continua mostrando a biblioteca completa. Estas ilustrações de IA não são material clínico validado.
