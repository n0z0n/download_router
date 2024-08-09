chrome.downloads.onDeterminingFilename.addListener((downloadItem, suggest) => {
  const url = new URL(downloadItem.url);
  const domain = url.origin.replace(/^https?:\/\//, "");
  const fileName = downloadItem.filename.split('/').pop(); // 元のファイル名を取得

  if (fileName) {
    // ファイルの拡張子を取得
    const fileExtension = fileName.includes('.') ? fileName.split('.').pop() : "";

    let newFileName;

    if (fileExtension) {
      // 拡張子がある場合、その拡張子のフォルダに保存
      newFileName = `${domain}/${fileExtension}/${fileName}`;
    } else {
      // 拡張子がない場合、ドメイン直下に保存
      newFileName = `${domain}/${fileName}`;
    }
    // 新しいファイル名を提案
    suggest({ filename: newFileName });
  } else {
    suggest(); // デフォルトのファイル名を使用
  }
});

