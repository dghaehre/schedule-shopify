'use strict'
const jsonfile = require('jsonfile')
const fs = require('fs')
const path = require('path')
const file = path.resolve(__dirname, '../data.json')

module.exports = (config, data) => new Promise((resolve, reject) => {

  let limit = data.limit

  jsonfile.readFile(file, (err, oldfile) => {
    if(err) {reject(err)} else {

        let shop = oldfile.filter(x => x.shopName === config.shopName ? true : false)

        let list = shop[0] ? shop[0].schedule : []

        resolve(list)

    }})
})
