# Formulários do site → Google Sheets + aviso por e-mail

O site tem dois formulários que usam o mesmo Web App do Google Apps Script:

1. **Contato** — nome, email e mensagem, gravados na aba **Respostas**.
2. **Escrita → "Avise-me quando publicar"** — só o email, gravado na aba
   **Notificacoes**.

Toda vez que qualquer um dos dois é enviado, o script também **dispara um
e-mail para você**, na hora, avisando o que chegou. Não precisa configurar
gatilho (trigger) separado — isso já acontece dentro do próprio `doPost`.

Leva uns 5 minutos para configurar.

## 1. Crie a planilha

1. Acesse [sheets.google.com](https://sheets.google.com) e crie uma planilha
   nova (pode chamar de "Contatos do site", por exemplo).

## 2. Cole o script

1. Na planilha, vá em **Extensões → Apps Script**.
2. Apague o conteúdo padrão (`function myFunction() {}`) e cole todo o
   conteúdo do arquivo [`Code.gs`](./Code.gs) desta pasta.
3. No topo do arquivo, confira a linha:

   ```js
   var OWNER_EMAIL = 'luisfernandoboff@gmail.com';
   ```

   Troque pelo e-mail onde você quer receber os avisos, se for diferente.
4. Clique no ícone de salvar (ou `Ctrl/Cmd + S`) e dê um nome ao projeto,
   por exemplo "Formulário Portfolio".

## 3. Implante como Web App

1. Clique em **Implantar → Nova implantação**.
2. No ícone de engrenagem, escolha o tipo **App da Web**.
3. Configure:
   - **Executar como:** Eu (seu e-mail)
   - **Quem pode acessar:** Qualquer pessoa
4. Clique em **Implantar**.
5. O Google vai pedir para autorizar o script a acessar sua planilha e a
   enviar e-mails em seu nome — é esperado, pois é assim que ele grava as
   respostas e te avisa. Aceite as permissões (pode aparecer um aviso de
   "app não verificado"; clique em "Acessar" mesmo assim, já que o script é
   seu).
6. Copie a **URL do app da Web** que aparece no final (termina em `/exec`).

## 4. Conecte ao site

1. Abra `src/config.ts` no projeto do site.
2. Cole a URL copiada dentro das aspas de `FORM_ENDPOINT`:

   ```ts
   export const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyVpByl9-B0wZcjVoXkCAWdzl4_05q8WCcG9l4Rcdxsco4tUpwI4rx4QLR_E91gYBtA/exec';
   ```
3. Rode `npm run build` novamente e publique o site atualizado.

Pronto — cada envio vira uma nova linha na planilha (aba "Respostas" ou
"Notificacoes", dependendo do formulário) e você recebe um e-mail na hora.

## Sobre o comportamento do envio no site

Por uma limitação do próprio Google Apps Script (ele não permite ler a
resposta de outro domínio via `fetch` comum), o site dispara o envio e mostra
a mensagem de sucesso assim que a requisição sai, sem conseguir confirmar a
entrega em tempo real. Se quiser ter certeza de que algo chegou, basta
conferir seu e-mail ou abrir a planilha.

## Sobre o limite de e-mails

Contas gratuitas do Google Apps Script (Gmail pessoal) podem enviar até
**100 e-mails por dia** via `MailApp`. Para um formulário de portfólio isso
é mais do que suficiente; se um dia o volume crescer muito, dá pra trocar
por um serviço dedicado de e-mail transacional.

## Se quiser atualizar o script depois

Sempre que editar o `Code.gs` no Apps Script, é preciso ir em
**Implantar → Gerenciar implantações → editar (ícone de lápis) → Nova
versão → Implantar** para que as mudanças valham para a URL já em uso.
