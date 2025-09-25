# HTML-to-Google-Docs
A simple Chrome Extension designed to save a webpage from a specified domain (like a corporate intranet) as a clean, editable Google Doc in a designated Google Drive folder.

This tool is perfect for archiving pages, drafting policy updates, or capturing content from internal sites that lack a proper export function.

---

## Features

-   **One-Click Saving**: Adds a simple "Save to Google Docs" button to the page.
-   **Direct to Google Docs**: Converts the page's HTML into a fully editable Google Doc, not just an HTML file.
-   **Automatic Folder Management**: Automatically finds a specific folder (e.g., "Policy Documents") in the user's Google Drive, or creates it if it doesn't exist.
-   **Domain-Restricted**: Designed to only activate and appear on specified websites or intranet addresses.
-   **Serverless Backend**: Uses a Google Apps Script as a secure, serverless backend to handle Google Drive integration, avoiding the need to host a separate server.

---

## How It Works

This project uses a two-part architecture to securely interact with Google Drive without embedding sensitive keys in the extension itself.

1.  The **Chrome Extension** (the frontend) is loaded in the user's browser. It has permission to run only on the specified company intranet domain.
2.  When the user clicks the "Save to Google Docs" button, the extension's `content.js` script captures the page's HTML.
3.  The `background.js` script sends this HTML in a `POST` request to a private Google Apps Script Web App URL.
4.  The **Google Apps Script** (the backend) receives the HTML. It runs under the user's own Google account permissions.
5.  The script searches the user's Google Drive for the designated folder, creating it if necessary.
6.  It then creates a new Google Doc from the received HTML and places it inside that folder.
7.  Finally, the script returns the URL of the newly created Google Doc to the extension.
8.  The extension opens this URL in a new tab for the user.



---

## Setup and Installation

You must set up both the Google Apps Script backend and the Chrome Extension frontend.

### Part 1: The Google Apps Script (Backend)

1.  Go to [script.google.com](https://script.google.com) and create a **New project**.
2.  Delete the placeholder code and paste the entire contents of `Code.gs` into the editor.
3.  Click the **Deploy** button and select **New deployment**.
4.  Click the gear icon next to "Select type" and choose **Web app**.
5.  Configure the deployment with the following settings:
    -   **Description**: `Saves HTML pages to Google Drive`
    -   **Execute as**: `User accessing the app`
    -   **Who has access**: `Anyone within [Your Company's Domain]` (or `Anyone with a Google Account` if for personal use)
6.  Click **Deploy**.
7.  **Authorize permissions** when prompted. The script needs access to your Google Drive to save files.
8.  Copy the provided **Web app URL**. You will need it for the extension.

### Part 2: The Chrome Extension (Frontend)

1.  Open the `background.js` file.
2.  Paste the **Web app URL** you copied from the Apps Script deployment into the `APPS_SCRIPT_WEB_APP_URL` constant.
3.  Open the `manifest.json` file.
4.  Update the `host_permissions` and `content_scripts.matches` arrays to include the URL(s) of your intranet site.
5.  Open Google Chrome and navigate to `chrome://extensions`.
6.  Enable **Developer mode** using the toggle in the top-right corner.
7.  Click the **Load unpacked** button and select this project's folder.
8.  The extension is now installed and will be active on the domains you specified.

---

## Configuration

You can customize the following variables to suit your needs:

-   **`manifest.json`**: Change the URLs in `host_permissions` and `matches` to the website you want the extension to run on.
-   **`Code.gs`**: Change the `FOLDER_NAME` constant at the top of the script to your desired Google Drive folder name.
-   **`background.js`**: Update the `APPS_SCRIPT_WEB_APP_URL` if you ever re-deploy your Apps Script.

---

## License

This project is open-source and available under the [MIT License](LICENSE).
