// 餐廳清單所使用的schema架構，每筆資料輸出到資料庫都有固定框架。
// _id會自動產生
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  name_en: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  // 用number會出現錯誤
  phone: {
    type: String,
    required: true
  },
  google_map: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('Restaurant', restSchema)
//  mongoose.model('restaurant',xxx)的restaurant，是Collection(RDBMS中的table)的名稱。mongoose中，會自動複數化，所以在Mongodb中的Collection name會變成restaurants。
