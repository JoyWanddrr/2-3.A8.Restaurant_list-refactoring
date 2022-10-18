// 種子資料腳本，並且以指令執行腳本，建立種子資料。

// 重構mongoose連線設定，從mongoose.js 匯出的db，在這裡取得。require為執行mongoose.js。
const db = require('./../../config/mongoose')

// 載入 restaurant model
const Restaurant = require('../restaurant')
// 載入restaurant.json
const restaurantList = require('./restaurant.json').results

// export的db用在這裡。
db.once('open', () => {
  // 想的太複雜了，直接把results提取放入就可以
  Restaurant.create(restaurantList)
    .then(() => {
      console.log('restaurantSeeder done!')
      // db.close()
    })
    .catch(err => console.error(err))
})
