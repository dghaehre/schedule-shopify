'use strict'
const jsonfile = require('jsonfile')
const fs = require('fs')
const path = require('path')
const file = path.resolve(__dirname, '../data.json')

const remove = (x, id) => {
  x.schedule = x.schedule.filter((y, i) => i === id ? false : true)
  return x
}


module.exports = (config, data) => new Promise((resolve, reject) => {

  let id = parseFloat(data)

  jsonfile.readFile(file, (err, oldfile) => {
    if(err) {reject({status: 'failed', err: err})} else {

      let updateFile = oldfile.map(x => x.shopName === config.shopName ? remove(x, id) : x)


      jsonfile.writeFile(file, updateFile, (err) => {

        err ? reject({status: 'failed', err: err}) : resolve({status: 'success', err: null})

      })
    }})
})
