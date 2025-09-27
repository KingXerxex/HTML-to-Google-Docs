function doPost(e) {
  const SPREADSHEET_ID = "SPREADSHEET_ID"; //Insert Spreadsheet ID from a sheet that can be used as a Extension Access List - On this list email addresses will be placed to limit access to the tool
  const userEmail = Session.getActiveUser().getEmail();
  
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0];
  const data = sheet.getRange("A:A").getValues();
  const approvedUsers = data.flat().filter(String);

  if (!approvedUsers.includes(userEmail)) {
    Logger.log("Access Denied for user: " + userEmail);
    return ContentService
      .createTextOutput("Error: Access Denied. You are not authorized to use this tool.")
      .setMimeType(ContentService.MimeType.TEXT);
  }
  try {
    const FOLDER_NAME = "Policy Documents"; 
    const postData = JSON.parse(e.postData.contents);
    const htmlContent = postData.html;
    const title = postData.title || 'Untitled Page';
    let targetFolder;
    const folders = DriveApp.getFoldersByName(FOLDER_NAME);
    if (folders.hasNext()) {
      targetFolder = folders.next();
    } else {
      targetFolder = DriveApp.createFolder(FOLDER_NAME);
    }
    const blob = Utilities.newBlob(htmlContent, 'text/html', title);
    const newDoc = targetFolder.createFile(blob).setName(title);
    const url = newDoc.getUrl();
    return ContentService.createTextOutput(url).setMimeType(ContentService.MimeType.TEXT);
  } catch (error) {
    Logger.log("ERROR in doPost: " + error.toString());
    return ContentService.createTextOutput("Error: " + error.toString()).setMimeType(ContentService.MimeType.TEXT);
  }
}
