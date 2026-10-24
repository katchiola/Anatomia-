# Instruções do projeto Anatomia Mágica

## Versionamento obrigatório

- Considere o `index.html` da raiz como a versão ativa e publicável.
- Leia `VERSAO_ATUAL` e `VERSOES.md` antes de alterar o aplicativo.
- Nunca modifique uma pasta existente dentro de `versoes/`; essas pastas são cópias imutáveis para restauração.
- Antes de modificar a raiz, confirme que a versão ativa já está preservada em `versoes/v<versão>/`.
- Toda evolução funcional deve receber o próximo número sequencial. Depois da 1.4, use 1.5.
- Ao concluir e validar uma versão, salve uma cópia completa em `versoes/v<versão>/`, atualize `VERSAO_ATUAL`, `VERSOES.md` e `README.md`, e gere o respectivo ZIP em `pacotes/`.
- O usuário autorizou a publicação no GitHub a cada nova versão concluída. Após os testes disponíveis e a criação do backup, publique a atualização sem esperar uma nova solicitação; informe quando a validação no celular ainda estiver pendente.
- Antes de publicar, compare a versão local ativa com a versão do GitHub e informe quais arquivos serão atualizados.
- Ao publicar, confira que o título e o número de versão exibidos no site correspondem à versão enviada e verifique a conclusão do GitHub Pages.

## Estrutura

- `index.html`: aplicativo ativo.
- `versoes/`: versões concluídas e imutáveis.
- `pacotes/`: pacotes ZIP das versões.
- `orgaos/`: referências e recursos visuais.
