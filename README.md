# 鼎電影專案
這是一個影評系統，功能類似於國外IMDb影評網站。使用者可以查尋電影、收藏電影、瀏覽影評、撰寫影評、按讚影評。還有即時聊天論壇、景點地圖共同編輯等功能。

![image](https://github.com/wayou122/react-movie/blob/master/%E5%B0%88%E6%A1%88%E8%AA%AA%E6%98%8E%E5%9C%96/%E5%B0%88%E6%A1%88%E8%AA%AA%E6%98%8E(4).JPG)

## 系統架構
本系統採用前後端分離架構，後端使用Java、SpringBoot框架完成，採用Spring MVC架構。即時聊天訊息使用WebSocket技術。資料存取使用JPA與資料庫連結。
前後端之間使用REST API互相溝通。前端使用React構成，以Bootstrap設定基礎樣式。地圖部分則是採用React Leaflet套件完成。

![image](https://github.com/wayou122/react-movie/blob/master/%E5%B0%88%E6%A1%88%E8%AA%AA%E6%98%8E%E5%9C%96/%E5%B0%88%E6%A1%88%E8%AA%AA%E6%98%8E(5).JPG)

## 資料表結構
本系統的資料表符合第三正規化。
1. 所有欄位都是單一值，沒有複合值。
2. 所有非主鍵欄位都依賴於整個主鍵，也就是沒有部份相依。
3. 所有非主鍵欄位之間沒有依賴關係，也就是沒有移轉相依。

![image](https://github.com/wayou122/react-movie/blob/master/%E5%B0%88%E6%A1%88%E8%AA%AA%E6%98%8E%E5%9C%96/%E5%B0%88%E6%A1%88%E8%AA%AA%E6%98%8E(6).JPG)

## 系統功能展示

這是電影列表頁。使用者可以搜尋電影（電影標題）、排序（依評價高低、依評論數量、依上映日期）、篩選電影（依照電影類型劇情片/紀錄片/動畫/短片）。此處的查詢使用Spring Data Pageable達到分頁查詢的效果，減低傳輸負擔。查詢參數顯示在網址，讓使用者點選瀏覽器上下頁能夠符合個人體驗。

登入帳號後在卡片右側可以點選收藏。點選標題或電影海報則可以進入電影專頁。

![image](https://github.com/wayou122/react-movie/blob/master/%E5%B0%88%E6%A1%88%E8%AA%AA%E6%98%8E%E5%9C%96/%E5%B0%88%E6%A1%88%E8%AA%AA%E6%98%8E(7).JPG)

### 電影專頁
使用者可以撰寫影評，此處限定一個人對一部電影只能評論一次。若已評論則可以點選編輯和刪除。

![image](https://github.com/wayou122/react-movie/blob/master/%E5%B0%88%E6%A1%88%E8%AA%AA%E6%98%8E%E5%9C%96/%E5%B0%88%E6%A1%88%E8%AA%AA%E6%98%8E(8).JPG)

使用者在電影專頁還可以瀏覽此部電影的所有評論，並且可排序（依評論日期、依熱門程度）、篩選評論（依照分數）。點選評論人名稱可以跳至評論人專頁。針對每一部影評則可以按讚、按倒讚，表達自己對這篇影評的感想。

![image](https://github.com/wayou122/react-movie/blob/master/%E5%B0%88%E6%A1%88%E8%AA%AA%E6%98%8E%E5%9C%96/%E5%B0%88%E6%A1%88%E8%AA%AA%E6%98%8E(9).JPG)

### 影評人專頁
此頁面會列出影評人的所有影評，路徑參數直接使用影評人的名字，能夠讓使用者方便搜尋、儲存、分享。此處的影評也使用Pageable分頁查詢。

![image](https://github.com/wayou122/react-movie/blob/master/%E5%B0%88%E6%A1%88%E8%AA%AA%E6%98%8E%E5%9C%96/%E5%B0%88%E6%A1%88%E8%AA%AA%E6%98%8E(10).JPG)

### 聊天論壇頁
此頁面可以在電影大型活動時啟用（如：頒獎典禮），讓使用者即時聊天互動交流。此處使用WebSocket即時通訊技術。訊息協定則使用STOMP協定，讓訂閱和發布訊息更有效率。

![image](https://github.com/wayou122/react-movie/blob/master/%E5%B0%88%E6%A1%88%E8%AA%AA%E6%98%8E%E5%9C%96/%E5%B0%88%E6%A1%88%E8%AA%AA%E6%98%8E(11).JPG)

### 景點地圖
有許多電影拍攝場景會成為影迷朝聖的地點，這個頁面提供使用者自由共同編輯電影景點地圖，類似於開放街圖/地圖版維基百科，符合PPGIS公眾參與地理資訊系統的精神。此頁面使用React Leaflet套件架設，後端存取經緯度坐標呈現在地圖上。

使用者點選地圖會自動產出坐標，搜尋電影名稱點選出現此地點的電影（限定選擇資料庫內的電影，用於建立電影表外鍵）。新增完成後點選景點可以看到景點資訊，也可以連結至電影頁面。

![image](https://github.com/wayou122/react-movie/blob/master/%E5%B0%88%E6%A1%88%E8%AA%AA%E6%98%8E%E5%9C%96/%E5%B0%88%E6%A1%88%E8%AA%AA%E6%98%8E(12).JPG)

## 專案資訊
本專案由王昱堯在2025年5-6月獨自完成。
* 專案後端連結 https://github.com/wayou122/springboot-movie
* 專案前端連結 https://github.com/wayou122/react-movie

![image](https://github.com/wayou122/react-movie/blob/master/%E5%B0%88%E6%A1%88%E8%AA%AA%E6%98%8E%E5%9C%96/%E5%B0%88%E6%A1%88%E8%AA%AA%E6%98%8E(13).JPG)


