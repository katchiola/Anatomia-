# Ossos — imagens para a versão 2.0

Esta pasta contém a primeira coleção visual do esqueleto. A versão ativa do aplicativo continua sendo a **1.5.6**; estas imagens ainda não estão ligadas à câmera.

- `referencias/esqueleto-anterior.png` e `referencias/esqueleto-posterior.png`: duas referências de corpo inteiro.
- `vistas/<peca>/01-frente.png` e `vistas/<peca>/05-costas.png`: 16 peças independentes, total de 32 PNGs com transparência.
- `vistas/manifest.json`: nomes, setores e lados anatômicos das peças.
- `previsualizar.html`: galeria local para comparar frente e costas.
- `arquivados/`: tentativas anteriores dos pés, incluindo as quatro imagens com perspectiva excessivamente vista de cima.

**Orientação:** direita e esquerda são sempre as do corpo da pessoa. Na vista anterior, o lado direito da pessoa aparece à esquerda na tela; na posterior, aparece à direita. Crânio e mandíbula são arquivos separados para permitir o movimento da articulação temporomandibular.

As imagens foram geradas com a ferramenta integrada de criação de imagens, usando as referências de corpo inteiro para manter a mesma paleta de ossos marfim, sombras pêssego e contorno vinho escuro. A geração de cada peça foi guiada por seu osso, lado e vista. As três imagens de pés com orientação incorreta foram refeitas e as anteriores foram guardadas. As ilustrações são **rascunhos educativos**, sujeitos à revisão visual/anatômica e ao teste de montagem no boneco antes de entrarem no aplicativo.

Após a revisão visual, os quatro pés foram refeitos para aproximar a perspectiva da referência de corpo inteiro: frente com tornozelo e dedos vistos de frente e ligeiramente de cima; costas com calcanhar predominante e dedos parcialmente visíveis para o lado externo. As imagens anteriores estão em `arquivados/pes-vista-superior/`.
