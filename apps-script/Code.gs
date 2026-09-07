// Cole este código no Apps Script vinculado à sua planilha do Google Sheets.
// Veja o passo a passo em INSTRUCOES.md nesta mesma pasta.

// Troque pelo e-mail onde você quer ser avisado a cada novo registro.
var OWNER_EMAIL = 'luisfernandoboff@gmail.com';

var CONTACT_SHEET = 'Respostas';
var NOTIFY_SHEET = 'Notificacoes';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    if (data.type === 'notify') {
      // Formulário "avise-me quando publicar" (seção Escrita do site)
      var notifySheet = getOrCreateSheet_(NOTIFY_SHEET, ['Data', 'Email', 'Idioma', 'Página']);
      notifySheet.appendRow([new Date(), data.email || '', data.lang || '', data.page || '']);

      notifyOwner_(
        'Novo inscrito para novidades do site',
        'Email: ' + (data.email || '') +
          '\nIdioma: ' + (data.lang || '') +
          '\nPágina: ' + (data.page || '')
      );
    } else {
      // Formulário de contato (seção Contato do site)
      var contactSheet = getOrCreateSheet_(CONTACT_SHEET, ['Data', 'Nome', 'Email', 'Mensagem', 'Idioma', 'Página']);
      contactSheet.appendRow([
        new Date(),
        data.name || '',
        data.email || '',
        data.message || '',
        data.lang || '',
        data.page || ''
      ]);

      notifyOwner_(
        'Nova mensagem pelo site',
        'Nome: ' + (data.name || '') +
          '\nEmail: ' + (data.email || '') +
          '\n\nMensagem:\n' + (data.message || '') +
          '\n\nIdioma: ' + (data.lang || '') +
          '\nPágina: ' + (data.page || '')
      );
    }

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Permite abrir a URL no navegador só para confirmar que o app está no ar.
function doGet(e) {
  return ContentService.createTextOutput('Formulário do portfólio está no ar.');
}

function getOrCreateSheet_(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }
  return sheet;
}

// Envia um e-mail para você a cada novo registro. Se o envio falhar por
// algum motivo, isso não deve impedir o registro na planilha.
function notifyOwner_(subject, body) {
  try {
    MailApp.sendEmail(OWNER_EMAIL, subject, body);
  } catch (err) {
    // Silenciosamente ignorado — o dado já está salvo na planilha de qualquer forma.
  }
}
