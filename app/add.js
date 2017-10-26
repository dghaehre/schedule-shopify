'use strict'
const jsonfile = require('jsonfile')
const fs = require('fs')
const path = require('path')
const file = path.resolve(__dirname, '../data.json')


module.exports = (config, data) => new Promise((resolve, reject) => {
  if(data.comparePrice == null || data.comparePrice == '') {
    data.comparePrice = data.price
  }


jsonfile.readFile(file, (err, oldfile) => {
  if(err) {reject({status: 'failed', err: err})} else {

  let shop = oldfile.filter(x => x.shopName === config.shopName ? true : false)

  let s = shop[0] || {}

  let updateFile = shop.length > 0 ? addExisting(oldfile, s, data, config) : createNew(oldfile, s, data, config)

  jsonfile.writeFile(file, updateFile, (err) => {

    err ? reject({status: 'failed', err: err}) : resolve({status: 'success', err: null})

  })

}})

})













const addExisting = (o, s, data, config) => {
  // add to existing shop

  s.schedule.push(data)

  return o.map(x => x.shopName === config.shopName ? s : x)

}

const createNew = (o, s, data, config) => {
  // Add new shop

  s['shopName'] = config.shopName
  s['schedule'] = [data]
  s['apiKey'] = config.apiKey
  s['password'] = config.password

  return o.concat([s])

}
