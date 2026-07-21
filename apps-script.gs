/**
 * KODE INI DITEMPEL DI GOOGLE APPS SCRIPT (bukan di file HTML).
 * Fungsinya: menerima skor kuis dari aplikasi (index.html) dan menyimpannya
 * secara otomatis ke satu Google Sheet, dari perangkat manapun (HP/laptop/tablet),
 * lalu menyediakan data itu lagi untuk halaman Peringkat.
 *
 * CARA PASANG (lihat juga README.md):
 * 1. Buat Google Sheet baru, beri nama misalnya "Hasil Kuis SDN-1 Sidorejo".
 *    Buat baris pertama (header) di sheet pertama: Nama | Skor | Durasi | Tanggal
 * 2. Buka menu Extensions/Ekstensi > Apps Script.
 * 3. Hapus kode contoh, lalu tempel SELURUH isi file ini.
 * 4. Klik Deploy > New deployment > pilih tipe "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Klik Deploy, izinkan akses (Authorize), lalu salin URL Web App yang muncul
 *    (bentuknya seperti: https://script.google.com/macros/s/XXXXXXXX/exec)
 * 6. Tempel URL tersebut ke aplikasi kuis: masuk sebagai Guru/Admin > Pengaturan >
 *    "URL Google Apps Script".
 */

const SHEET_NAME = 'Hasil'; // ganti jika nama sheet berbeda

function getSheet_(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if(!sheet){
    sheet = ss.getSheets()[0];
  }
  if(sheet.getLastRow() === 0){
    sheet.appendRow(['Nama','Skor','Durasi (detik)','Tanggal']);
  }
  return sheet;
}

// Menerima hasil kuis (dipanggil dari fetch POST di index.html)
function doPost(e){
  try{
    const data = JSON.parse(e.postData.contents);
    if(data.action === 'submit'){
      const sheet = getSheet_();
      sheet.appendRow([
        data.name || 'Tanpa Nama',
        data.score || 0,
        data.duration || 0,
        data.date || new Date().toISOString()
      ]);
      return ContentService.createTextOutput(JSON.stringify({ok:true}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    return ContentService.createTextOutput(JSON.stringify({ok:false, error:'unknown action'}))
      .setMimeType(ContentService.MimeType.JSON);
  }catch(err){
    return ContentService.createTextOutput(JSON.stringify({ok:false, error:String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Mengirim data peringkat (dipanggil dari fetch GET di index.html)
function doGet(e){
  const action = e.parameter.action;
  if(action === 'ranking'){
    const sheet = getSheet_();
    const values = sheet.getDataRange().getValues();
    const rows = values.slice(1); // lewati header
    const results = rows
      .filter(r => r[0])
      .map(r => ({ name: r[0], score: Number(r[1])||0, duration: Number(r[2])||0, date: r[3] }));
    return ContentService.createTextOutput(JSON.stringify(results))
      .setMimeType(ContentService.MimeType.JSON);
  }
  return ContentService.createTextOutput(JSON.stringify({ok:true, info:'Backend Kuis SDN-1 Sidorejo aktif.'}))
    .setMimeType(ContentService.MimeType.JSON);
}
