chrome.downloads.onDeterminingFilename.addListener((downloadItem, suggest) => {
  // ダウンロード元のURLからドメイン名を取得
  const downloadUrl = new URL(downloadItem.url);
  let domain = getDomainFromUrl(downloadUrl.origin);

  // 元のファイル名を取得
  const fileName = getFileName(downloadItem.filename);

  // ドメインが取得できなかった場合、リファラーから取得を試みる
  if (!domain || domain === "null") {
    domain = getDomainFromReferrer(downloadItem.referrer);
  }

  // それでも取得できない場合、ドメインを「Other」に設定
  if (!domain) {
    domain = "Other";
  }

  if (fileName) {
    // ファイルの拡張子を取得
    const fileExtension = getFileExtension(fileName);

    // 現在の日付を "YYYYMMDD" 形式で取得
    const dateString = getCurrentDateString();

    // 新しいファイルパスを作成
    const newFileName = fileExtension
      ? `${dateString}/${domain}/${fileExtension}/${fileName}` // 拡張子がある場合
      : `${dateString}/${domain}/Other/${fileName}`;           // 拡張子がない場合

    // 新しいファイル名を提案
    suggest({ filename: newFileName });
  } else {
    suggest(); // デフォルトのファイル名を使用
  }
});

/**
 * URLからドメイン名を抽出する
 * @param {string} origin - URLのorigin部分
 * @returns {string|null} - ドメイン名
 */
function getDomainFromUrl(origin: string): string | null {
  const domain = origin.replace(/^https?:\/\/(www\.)?/, "");
  return domain !== "" ? domain : null;
}

/**
 * ファイルパスからファイル名を取得
 * @param {string} filePath - ファイルパス
 * @returns {string} - ファイル名
 */
function getFileName(filePath: string): string {
  return filePath.split('/').pop() || '';
}

/**
 * ファイル名から拡張子を取得
 * @param {string} fileName - ファイル名
 * @returns {string|null} - 拡張子
 */
function getFileExtension(fileName: string): string | null {
  return fileName.includes('.') ? fileName.split('.').pop() || null : null;
}

/**
 * リファラーURLからドメイン名を取得
 * @param {string} referrer - リファラーURL
 * @returns {string|null} - ドメイン名
 */
function getDomainFromReferrer(referrer: string): string | null {
  if (!referrer) return null;
  const referrerUrl = new URL(referrer);
  return getDomainFromUrl(referrerUrl.origin);
}

/**
 * 現在の日付を "YYYYMMDD" 形式で取得
 * @returns {string} - "YYYYMMDD"形式の日付
 */
function getCurrentDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 月を2桁にする
  const day = String(now.getDate()).padStart(2, '0'); // 日を2桁にする
  return `${year}${month}${day}`;
}

