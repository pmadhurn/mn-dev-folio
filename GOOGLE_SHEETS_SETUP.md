# Google Sheets Integration Guide

This guide will help you connect your website's contact form to a Google Sheet so you can automatically collect responses for free.

## 1. Setup Google Sheet & Apps Script

1.  Go to [Google Sheets](https://sheets.google.com) and create a new sheet.
2.  Name the sheet (e.g., "Website Contact Form Responses").
3.  In the first row, add headers for the data you want to collect:
    *   Column A: `Timestamp`
    *   Column B: `Name`
    *   Column C: `Email`
    *   Column D: `Message`
4.  Click on **Extensions** > **Apps Script**.

## 2. Add the Script Code

1.  Delete any code in the `Code.gs` file and paste the following code:

```javascript
const SHEET_NAME = "Sheet1"; // Make sure this matches your sheet tab name

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = doc.getSheetByName(SHEET_NAME);

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const nextRow = sheet.getLastRow() + 1;

    // Parse the request body
    // If sent as JSON
    let data;
    if (e.postData.type.includes("application/json")) {
        data = JSON.parse(e.postData.contents);
    } else {
        // If sent as FormData
        data = e.parameter;
    }

    const newRow = headers.map(function(header) {
      if (header === 'Timestamp') return new Date();
      return data[header.toLowerCase()] || data[header] || '';
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

  } catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

2.  Save the project (File > Save).

## 3. Deploy the Script

1.  Click on the **Deploy** button (top right) > **New deployment**.
2.  Click the gear icon (Select type) > **Web app**.
3.  Fill in the details:
    *   **Description**: "Contact Form API"
    *   **Execute as**: Me (your email)
    *   **Who has access**: **Anyone** (This is crucial for the form to work without login)
4.  Click **Deploy**.
5.  Authorize the script when prompted. (You might see a "Google hasn't verified this app" warning. Click "Advanced" > "Go to [Project Name] (unsafe)" to proceed).
6.  **Copy the Web App URL**. It will look something like `https://script.google.com/macros/s/.../exec`.

## 4. Update Your Website Code

1.  Open `src/components/Contact.tsx`.
2.  Find the `GOOGLE_SCRIPT_URL` constant (I have added a placeholder).
3.  Replace the placeholder string with your copied Web App URL.

```javascript
// Example:
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx.../exec";
```

4.  Save the file and deploy your website.

Your contact form should now be fully functional!
