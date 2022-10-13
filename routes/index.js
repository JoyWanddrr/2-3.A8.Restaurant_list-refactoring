// 總路由，記得根據RESTful改寫app.js的路由edit，delete
// 記得安裝npm install method-override@3.0.0


const express = require('express')
const router = express.Router()

// 引入home模組程式碼(router)
const home = require('./modules/home')
// 引入restaurants模組(router)
const restaurants = require('./modules/restaurants')
// 將網址結構符合 / 字串的 request 導向 home 模組(如果request路徑是'/',就執行home的程式碼) 。此為首頁路由。最後再放入app.js使用。
router.use('/', home)
// restaurants路由
router.use('/restaurants', restaurants)



// 匯出路由器
module.exports = router