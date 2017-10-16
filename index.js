'use strict'
const Shopify = require('shopify-api-node') // !! Dette trenger man bare for cron!!!
const add = require('./app/add')
const del = require('./app/delete')
const list = require('./app/list')
/*

Lag noe som kan gjøre det slik at du kan schedule tid på produkter

*/


class Schedule {
  constructor(config) {
    this.config = config;
    this.shopify = new Shopify(config)
  }
  test() { return new Promise((resolve, reject) => {
    resolve(`test!! with config: ${JSON.stringify(this.config)}`)
  })}
  add(data) { return add(this.config, data) }
  del(data) { return del(this.config, data) }
  list(data) { return list(this.config, data) }
}

/*
const schedule = config => {
  test: () => {
    console.log('test med config:', config)
  }
}
*/







module.exports = config => new Schedule(config)
