const express = require('express')
const app = express()
// 連接資料庫，先npm mongoose，在robo 3T設定資料庫，在終端機裡設定連線
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
// 載入Schema
const Restaurant = require('./models/restaurant')
const methodOverride = require('method-override')
mongoose.connect("mongodb+srv://Alpha:camp@cluster0.j297u5e.mongodb.net/restaurant_list?retryWrites=true&w=majority")
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// 取得資料庫連線
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

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





app.listen(3000, () => {
  console.log('express now is listening on prot 3000.')
})