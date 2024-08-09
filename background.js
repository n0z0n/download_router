chrome.downloads.onDeterminingFilename.addListener(function (downloadItem, suggest) {
    var url = new URL(downloadItem.url);
    console.log(url);
    var domain = url.hostname.replace(/^www\./, ''); // ドメイン名を取得
    var fileName = downloadItem.filename.split('/').pop(); // 元のファイル名を取得
    if (fileName) {
        // 保存先フォルダをドメイン名に基づいて設定
        var newFileName = "".concat(domain, "/").concat(fileName);
        // 新しいファイル名を提案
        console.log(suggest({ filename: newFileName }));
    }
    else {
        console.log(suggest()); // デフォルトのファイル名を使用
    }
});
chrome.downloads.onChanged.addListener(function (delta) {
    // ダウンロードが完了したかどうかをチェック
    if (delta.state && delta.state.current === "complete") {
        console.log("Download complete: ".concat(delta.id));
    }
});
