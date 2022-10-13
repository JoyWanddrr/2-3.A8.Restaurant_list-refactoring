const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
// 引用路由器
const routes = require('./routes')

// 使用 require 去引用檔案，對 app.js 而言，Mongoose 連線設定只需要「被執行」，不需要接到任何回傳參數繼續利用，所以這裡不需要再設定變數。。
require('./config/mongoose')

const app = express()
// 設定載入的engine
//建立一個名叫hbs的樣板引擎，並傳入exphbs與相關參數(extname: '.hbs'，是指定副檔名為.hbs預設的長檔名改寫成短檔名)。
// 注意，此設定僅限於express-handlebars4.0.2 的版本，其他版本需閱讀文件，再做設定。
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
// 啟動樣板引擎hbs
app.set('view engine', 'hbs')
// 設定 Express 路由以提供靜態檔案
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)

app.listen(3000, () => {
  console.log('express now is listening on prot 3000.')
})