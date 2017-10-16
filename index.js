'use strict'
const add = require('./app/add')
const del = require('./app/delete')
const list = require('./app/list')


class Schedule {
  constructor(config) {
    this.config = config;
  }
  add(data) { return add(this.config, data) }
  del(data) { return del(this.config, data) }
  list(data) { return list(this.config, data) }
}


module.exports = config => new Schedule(config)
