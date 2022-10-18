// 由於 Mongoose 連線是屬於專案的環境設定(configuration)，所以我們習慣將其歸入一個叫 config 的資料夾。


const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// 導出db待會使用
module.exports = db
