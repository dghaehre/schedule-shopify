const ScheduleShopify = require('./index');


const Schedule = ScheduleShopify({
  shopName: 'shopName',
  apiKey: 'apiKey',
  password: 'password'
})


const run = async () => {
let test, add, list, del
try {
  //test = await Schedule.test()

  /*add = await Schedule.add({
    product: 'Skutest2',
    time: `Time format`,
    price: 40,
    priceCompare: 40
  })
*/
  list = await Schedule.list({limit: 10})

  //del = await Schedule.del(1)

} catch(err) {console.log(err)}
  console.log(test)
  console.log(add)
  console.log(list)
  console.log(del)
}

run()
