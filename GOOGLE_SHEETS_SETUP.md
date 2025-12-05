# Google Sheets Integration Guide

## 1. Setup Google Sheet & Apps Script

1.  Go to [Google Sheets](https://sheets.google.com) and create a new sheet.
2.  Name the sheet (e.g., "Website Contact Form Responses").
3.  **Important:** Rename the tab at the bottom to `Sheet1` (it usually is by default, but check it).
4.  In the first row, add these exact headers:
    *   Column A: `Timestamp`
    *   Column B: `Name`
    *   Column C: `Email`
    *   Column D: `Message`
    *   Column E: `Debug` (Optional, useful for troubleshooting)
5.  Click on **Extensions** > **Apps Script**.

## 2. Add the Robust Script Code

1.  Delete any code in the `Code.gs` file and paste the following **updated** code. This version is more robust and helps with debugging.

```javascript
// This script handles both FormData and JSON
// It also tries to log errors to the sheet if something goes wrong.

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Wait up to 10 seconds for other requests to finish

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName("Sheet1");

    // Fallback: If "Sheet1" isn't found, use the first sheet
    if (!sheet) {
      sheet = doc.getSheets()[0];
    }

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;

    var newRow = headers.map(function(header) {
      if (header === 'Timestamp') {
        // Format the date to include time (YYYY-MM-DD HH:mm:ss)
        return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");
      }

      var key = header.toLowerCase(); // 'Name' -> 'name'
      var val = '';

      // 1. Try to get from URL parameters (Standard form submission)
      if (e.parameter && e.parameter[key]) {
        val = e.parameter[key];
      }

      // 2. Try to get from JSON body (if sending JSON)
      if (!val && e.postData && e.postData.contents) {
        try {
          var json = JSON.parse(e.postData.contents);
          if (json[key]) val = json[key];
        } catch (e) {
          // not json
        }
      }

      return val;
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (e) {
    // ERROR LOGGING: Try to write the error to the sheet so you can see it
    try {
       var doc = SpreadsheetApp.getActiveSpreadsheet();
       var sheet = doc.getSheets()[0];
       // Append error to the last column or a new row
       sheet.appendRow(["ERROR", e.toString(), new Date().toString()]);
    } catch(e2) {}

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

2.  Save the project (File > Save).

## 3. Deploy (CRITICAL STEP)

**If you have deployed before, you MUST create a NEW version.**

1.  Click **Deploy** > **Manage deployments**.
2.  Click the **Edit** (pencil) icon next to your existing "Web app" deployment.
3.  **Version**: Select **New version** from the dropdown. (Do not leave it as "Version 1" or the old version).
4.  **Execute as**: Me (your email).
5.  **Who has access**: **Anyone** (Must be "Anyone", or it won't work).
6.  Click **Deploy**.

**Alternatively (if starting fresh):**
1.  Click **Deploy** > **New deployment**.
2.  Select **Web app**.
3.  Execute as: **Me**.
4.  Who has access: **Anyone**.
5.  Click **Deploy**.

**Copy the Web App URL** (ends in `/exec`).

## 4. Update Your Website Code

1.  Open `src/components/Contact.tsx`.
2.  Paste your **new** Web App URL into the `GOOGLE_SCRIPT_URL` variable.
3.  Save and deploy your website.
