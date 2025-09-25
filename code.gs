function doPost(e) {
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
