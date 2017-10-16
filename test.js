const ScheduleShopify = require('./index');


const Schedule = ScheduleShopify({
  shopName: 'shopName',
  apiKey: 'apiKey',
  password: 'password'
})


const run = async () => {
let add, list, del
try {

  add = await Schedule.add({
    product: 'Skutest2',
    time: `Mon Oct 16 2017 15:13:28 GMT+0200 (CEST)`,
    price: 40,
    priceCompare: 40
  })

  //list = await Schedule.list({limit: 10})

  //del = await Schedule.del(1)

} catch(err) {console.log(err)}
  console.log(add)
  console.log(list)
  console.log(del)
}

run()
