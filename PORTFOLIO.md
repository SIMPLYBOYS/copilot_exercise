# 今日待辦 Web App

這是一個在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App。專案從基本的待辦管理開始，逐步加入篩選、資料保存與清理已完成項目的功能，並維持簡單、可離線運作的前端架構。

## 線上展示

[GitHub Pages](https://<你的帳號>.github.io/<你的repo名稱>/)

> 請將上方網址中的佔位文字替換成實際的 GitHub 帳號與 repository 名稱。

## 功能

- 新增待辦事項，空白內容不會被加入。
- 勾選待辦事項為完成，完成項目會顯示刪除線並淡化文字。
- 刪除單筆待辦事項。
- 顯示整體未完成待辦數量。
- 使用 `localStorage` 保存待辦資料，重新整理後仍可保留清單。
- 提供「全部」、「未完成」與「已完成」三種篩選模式。
- 保存目前的篩選條件，重新整理後恢復上次選擇；遇到無效值時安全回到「全部」。
- 篩選結果為空時顯示對應提示，讓使用者知道項目只是被篩選條件隱藏。
- 提供「清除已完成」功能，清除前會先顯示確認對話框。
- 沒有已完成項目時，清除按鈕會維持停用狀態。
- 支援手機螢幕與響應式版面。

## 技術

- 使用純 HTML、CSS 與原生 JavaScript。
- 不使用任何框架或第三方套件。
- 不使用外部 CDN，可離線開啟與操作。
- 以 CSS 變數集中管理介面顏色。
- 使用瀏覽器 `localStorage` 保存待辦資料與篩選偏好。
- 使用 `textContent`、`createElement` 與事件監聽器產生和更新 DOM。

## 開發方式

- 使用 GitHub Copilot Agent Mode，依照需求逐步建立待辦清單 App，並透過瀏覽器操作驗證功能。
- 使用 MCP 連接 Microsoft Learn 文件，查詢 `prefers-color-scheme` 與網頁無障礙色彩對比等官方建議。
- 使用 GitHub MCP 與 GitHub issue 工作流程讀取需求、整理修復計畫、建立分支、驗證修正內容並準備 Pull Request。
- 使用 `.github/prompts/fix-issue.prompt.md` 定義 agentic workflow，讓 issue 修復工作遵循讀取 issue、等待確認、修改、驗證、提交與開 PR 的順序。

## 我學到什麼

- 如何用原生 HTML、CSS 與 JavaScript 建立可操作的前端應用程式。
- 如何使用 `localStorage` 保存使用者資料與介面偏好。
- 如何設計篩選狀態、空清單提示與不可逆操作的確認流程。
- 如何透過 Git 分支、commit、rebase 與 Pull Request 管理功能開發。
- 如何把 Copilot Agent Mode、MCP 與可重複使用的 prompt workflow 放進實際開發流程。
