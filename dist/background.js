"use strict";
chrome.downloads.onDeterminingFilename.addListener((downloadItem, suggest) => {
    const url = new URL(downloadItem.url);
    let domain = url.origin.replace(/^https?:\/\/(www\.)?/, "");
    const fileName = downloadItem.filename.split('/').pop(); // 元のファイル名を取得
    if (!domain || domain === "") {
        domain = "Other"; // ドメインが取れない場合は「Other」を使用
    }
    if (fileName) {
        // ファイルの拡張子を取得
        const fileExtension = fileName.includes('.') ? fileName.split('.').pop() : "";
        // 現在の日付を取得 (YYYYMMDD形式)
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // 月を2桁にする
        const day = String(now.getDate()).padStart(2, '0'); // 日を2桁にする
        const dateString = `${year}${month}${day}`;
        let newFileName;
        if (fileExtension) {
            // 拡張子がある場合、その拡張子のフォルダに保存
            newFileName = `${dateString}/${domain}/${fileExtension}/${fileName}`;
        }
        else {
            // 拡張子がない場合、「Other」フォルダに保存
            newFileName = `${dateString}/${domain}/Other/${fileName}`;
        }
        // 新しいファイル名を提案
        suggest({ filename: newFileName });
    }
    else {
        suggest(); // デフォルトのファイル名を使用
    }
});
