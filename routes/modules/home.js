// 首頁路由，home page

const express = require('express')
const router = express.Router()
// 載入restaurants的schema
const Restaurant = require('./../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    // 測試餐廳資料長度，為0則可以requrie seed
    .then(restaurants => {
      res.render('index', { restaurants })
    })
    .catch(error => console.error(error))
})


// 搜尋特定餐廳
router.get('/search', (req, res) => {
  // 擷取input
  const keywords = req.query.keyword.trim()
  // 如果查詢不到則返回首頁
  if (!keywords) {
    return res.redirect('/')
  }
  Restaurant.find()
    .lean()
    .then(restaurants => {
      const filterRestaurant = restaurants.filter(
        (data) =>
          data.name.toLowerCase().includes(keywords) ||
          data.category.includes(keywords)
      )
      res.render('index', { restaurants: filterRestaurant, keywords })
    })
    .catch(err => console.error(err))
})



module.exports = router