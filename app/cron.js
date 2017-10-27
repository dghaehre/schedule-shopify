'use strict'
const jsonfile = require('jsonfile')
const fs = require('fs')
const path = require('path')
const file = path.resolve(__dirname, '../data.json')
const Shopify = require('shopify-api-node')
const createDate = d => new Date(d.split('/')[2].substring(0, 4), d.split('/')[0], d.split('/')[1], d.split('T')[1].split(':')[0],d.split('T')[1].split(':')[1])
const remove = status => data => status.reduce((bool, stat) => stat.split(':')[0] === 'success' && stat.split(':')[1] == data.product && stat.split(':')[2] === data.time ? false : bool, true)


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




const Update = (config, data) => new Promise(async (resolve, reject) => {
let shopify, updatePriceShopify, status, removed
  try {
      shopify = new Shopify(config)

      updatePriceShopify = updatePrice(shopify)

      status = await Promise.all(data.map((x, i) => updatePriceShopify(x, i)))

      removed = await removeSuccesfulUpdates(status, config, data)

  } catch(err) {reject(err)}

    resolve(removed)
})




const updatePrice = shopify => (data, i=0) => new Promise((resolve, reject) => {
    setTimeout(() => {

    shopify.productVariant.update(data.product, {
      price: data.price,
      compare_price: data.compare_price
    })
    .then(order => {
      resolve(`success:${data.product}:${data.time}`)
    })
    .catch(err => {
      console.log(err)
      console.log(`data: ${JSON.stringify(data, null, 2)}`)
      resolve(`failed id:${data.product}:${i}`)
    })
  }, i*1500)
})


const removeSuccesfulUpdates = (status, config, schedule) => new Promise((resolve, reject) => {
  jsonfile.readFile(file, (err, oldfile) => {
    if(err) {reject({status: 'failed', err: err})} else {
      console.log(`oldfile: ${JSON.stringify(oldfile, null, 2)}`)
      let updateFile = oldfile.map(x => {
        if(x.shopName === config.shopName) {
          x.schedule = schedule.filter(remove(status))
        }
        return x
      })
      console.log(`new file: ${JSON.stringify(updateFile, null, 2)}`)
      jsonfile.writeFile(file, updateFile, (err) => {
        err ? reject({status: 'failed', err: err}) : resolve('success')
      })
    }})
})



const removeSuccess = list => new Promise(async (resolve, reject) => {
let status, oldfile, newfile
try {
    oldfile = await getAll()
    newfile = oldfile.map(x => x.schedule.filter(remove(list)))
} catch(err) {console.log(err); reject(err)}
})




const filterTime = now => x => {
  let isValid = isNaN(createDate(x.time).getTime())
  return isValid ? false : createDate(x.time).getTime() <  now ? true : false
}
