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

app.get('/', (req, res) => {
  // 使用find，在未寫入條件之下，會取出全部的資料
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    // 抓取錯誤資訊
    .catch(error => console.error(error))
})

// ------------------------------------------------------------
// 新增餐廳
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.post('/restaurants', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})
// --------------------------------------------------------------


// detail/show，注意，因為是由資料庫匯入，所以都要用Restaurant
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    // 撇除Mongoose的處理，才能render
    .lean()
    // 將拿到的資料放入show.hbs渲染
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// 搜尋特定餐廳
app.get("/search", (req, res) => {
  // 擷取input
  const keywords = req.query.keyword.trim()
  // 如果查詢不到則返回首頁
  if (!keywords) {
    res.redirect("/")
  }
  Restaurant.find({})
    .lean()
    .then(restaurants => {
      const filterRestaurant = restaurants.filter(
        (data) =>
          data.name.toLowerCase().includes(keywords) ||
          data.category.includes(keywords)
      )
      res.render('index', { restaurants: filterRestaurant, keywords })
    })
    .catch(err => console.log(err))
})

// edit
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// 設定edit的post路由。
app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  // 1.查詢資料
  // findByIdAndUpdate(id, update, options, callback)，可直接查找ID並修改整組資料上傳
  return Restaurant.findByIdAndUpdate(id, req.body)
    // 這裡需要Mongoose的function，所以不用Lean()移除格式。成功後重新導向detail頁面
    .then((restaurant) => res.redirect(`/restaurants/${id}`))
    .catch(err => console.log(err))
})


// delete只需設定POST，在index就有設定
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


app.listen(3000, () => {
  console.log('express now is listening on prot 3000.')
})