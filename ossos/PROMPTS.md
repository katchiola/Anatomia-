# Diretrizes de geração das imagens dos ossos

Esta é a descrição reproduzível da primeira coleção visual da versão 2.0. Os arquivos gerados são rascunhos educativos e ainda precisam de revisão anatômica e montagem sobre o corpo.

## Estilo comum

Ilustração educativa de esqueleto humano, legível em tela de celular, com ossos em marfim claro, sombras suaves em pêssego, contorno vinho escuro, formas bem separadas, sem texto, sem etiquetas, sem órgãos, sem pele e com fundo transparente. Manter proporções e paleta consistentes entre todas as peças.

## Referências de corpo inteiro

- `referencias/esqueleto-anterior.png`: esqueleto humano completo em posição anatômica, visto de frente, com os dois lados do corpo visíveis e articulações simples.
- `referencias/esqueleto-posterior.png`: o mesmo esqueleto visto de costas, mostrando corretamente escápulas, coluna, parte posterior da pelve, mãos e pés.

## Peças separadas

Para cada peça abaixo, gerar um recorte isolado na vista anterior (`01-frente.png`) e outro na vista posterior (`05-costas.png`), mantendo a mesma orientação do corpo inteiro. Direita e esquerda referem-se sempre ao corpo da pessoa, nunca ao lado da tela.

1. Crânio, sem mandíbula.
2. Mandíbula separada, própria para a animação de abrir e fechar a boca; na vista posterior, sem dentes ou face frontal.
3. Tórax com costelas, esterno, clavículas, escápulas e trecho de coluna conforme a vista.
4. Quadril com pelve e sacro.
5. Úmero direito e úmero esquerdo.
6. Antebraço direito e antebraço esquerdo, cada um com rádio e ulna.
7. Mão direita e mão esquerda, com dedos simplificados.
8. Fêmur direito e fêmur esquerdo.
9. Perna direita e perna esquerda, cada uma com tíbia e fíbula.
10. Pé direito e pé esquerdo, com dedos simplificados.

Os pés foram revisados para que o hálux fique do lado medial de cada pé: vista anterior, pé direito à esquerda da tela com hálux à direita da imagem e pé esquerdo à direita da tela com hálux à esquerda da imagem; vista posterior, a relação se inverte. As três primeiras imagens com orientação incorreta estão em `arquivados/`.

Depois, os quatro pés foram gerados novamente com a referência de corpo inteiro como guia principal para o ângulo: na frente, uma perspectiva de pessoa em pé, vista de frente e levemente de cima, com os dedos em primeiro plano; nas costas, calcanhar destacado, dedos parcialmente visíveis para fora. Evitar a vista superior plana em que todo o dorso do pé aparece alongado. As versões anteriores estão em `arquivados/pes-vista-superior/`.

## Uso no aplicativo

Antes da integração, conferir a anatomia e ajustar escala, recorte e pontos de ancoragem das 16 peças nas duas vistas. A transparência e os nomes dos arquivos já estão preparados para esse trabalho.
