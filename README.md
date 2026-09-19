# 曼谷咖啡散步

曼谷咖啡廳清單，可依標籤、街區和關鍵字篩選，並切換 Google 地圖。不需要安裝套件。

網站網址：https://sshuaichen.github.io/my-website/

GitHub 儲存庫：https://github.com/sshuaichen/my-website

## 本機預覽

用瀏覽器開啟 `index.html` 即可。

## 修改內容

- `index.html`：頁面結構和資料使用說明。
- `style.css`：顏色、字型與響應式版面。
- `cafes.js`：7 間店家、評分快照、特色、地址、來源與標籤依據。
- `app.js`：搜尋、複選標籤（AND）、排序和單店 Google 地圖切換。

資料於 2026-09-19 查閱公開來源後整理，非即時爬蟲或 Google Places API。
評分由各店列出的第三方頁面轉載 Google 資料，不保證與即時評分相同。
「評分高」為至少 4.5 分，「評論多」為至少 1,000 則；其餘標籤依報導或評論整理。
預設顯示 4 間高評分店，清除篩選可看全部 7 間（含 3 間 4.4 分特色備選）。
地圖一次顯示一間咖啡廳，另附外部 Google Maps 連結。

## 發布到 GitHub Pages

1. 在 GitHub 建立公開儲存庫，例如 `my-website`。
2. 上傳 `index.html`、`style.css`、`cafes.js`、`app.js` 與 `.nojekyll` 到儲存庫根目錄。
3. 在儲存庫的 **Settings → Pages**，選擇 **Deploy from a branch**。
4. 選擇 `main` 分支與 `/ (root)` 資料夾，儲存。
5. 等待部署完成，在 Pages 設定頁查看網站網址。

一般專案網址為 `https://你的帳號.github.io/my-website/`。

官方說明：https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
