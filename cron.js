'use strict'
const cron = require('./app/cron')

const run = async () => {
let all, toBeUpdated, status
try {

  all = await cron.getAll()

  toBeUpdated = await cron.toBeUpdated(all)

  status = await cron.update(toBeUpdated)

} catch(err) {console.log(err)}

  console.log(status)

}

run()
