'use strict'
const jsonfile = require('jsonfile')
const fs = require('fs')
const path = require('path')
const file = path.resolve(__dirname, '../data.json')
const Shopify = require('shopify-api-node') // !! Dette trenger man bare for cron!!!
const createDate = d => new Date(d.split('/')[2].substring(0, 4), d.split('/')[0], d.split('/')[1], d.split('T')[1].split(':')[0],d.split('T')[1].split(':')[1])



exports.getAll = () => new Promise((resolve, reject) => {
  jsonfile.readFile(file, (err, oldfile) => {
    if(err) {reject(err)} else {
    resolve(oldfile)
  }
})})

exports.toBeUpdated = list => new Promise((resolve, reject) => {
let now = new Date().getTime() + (3 * 60 * 1000) // + 3 minutes

let itstime = list.reduce((a, x) => a.concat([{
                schedule: x.schedule.filter(filterTime(now)),
                config: {
                  shopName: x.shopName,
                  apiKey: x.apiKey,
                  password: x.password
                }
  }]), [])

resolve(itstime)

})


exports.update = list => new Promise((resolve, reject) => {

  Promise.all(list.map(x => Update(x.config, x.schedule)))
  .then(success => resolve(success))
  .catch(err => reject(err))

})



const Update = (config, data) => new Promise((resolve, reject) => {

  let shopify = new Shopify(config)

  let updatePriceShopify = updatePrice(shopify)

  Promise.all(data.map((x, i) => updatePriceShopify(x, i)))
  .then(success => resolve(success))
  .catch(err => reject(err))

})



const updatePrice = shopify => (data, i=0) => new Promise((resolve, reject) => {
    setTimeout(() => {

    shopify.productVariant.update(data.product, {
      price: data.price,
      compare_price: data.compare_price
    })
    .then(order => {
      resolve(`success : ${data.product}`)
    })
    .catch(err => {
      console.log(err)
      console.log(`data: ${JSON.stringify(data, null, 2)}`)
      resolve(`failed id: ${data.product}`)
    })
  }, i*1500)
})


const filterTime = now => x => {
  let isValid = isNaN(createDate(x.time).getTime())
  return isValid ? false : createDate(x.time).getTime() <  now ? true : false
}
