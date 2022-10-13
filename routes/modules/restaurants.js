// restaurants的相關路由，包含修改、刪除、新增

const express = require('express')
const router = express.Router()
// 載入restaurants的schema
const Restaurant = require('./../../models/restaurant')

// 將重複的路由路徑restaurants取出，放在總路由

// 新增餐廳
router.get('/new', (req, res) => {
  res.render('new')
})

// 接住新增餐廳的路由
router.post('/', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


// detail/show，注意，因為是由資料庫匯入，所以都要用Restaurant
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    // 撇除Mongoose的處理，才能render
    .lean()
    // 將拿到的資料放入show.hbs渲染
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})


// edit
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// 設定edit接住的路由。
router.put('/:id', (req, res) => {
  const id = req.params.id
  // 1.查詢資料
  // findByIdAndUpdate(id, update, options, callback)，可直接查找ID並修改整組資料上傳
  return Restaurant.findByIdAndUpdate(id, req.body)
    // 這裡需要Mongoose的function，所以不用Lean()移除格式。成功後重新導向detail頁面
    .then((restaurant) => res.redirect(`/restaurants/${id}`))
    .catch(err => console.log(err))
})


// delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router