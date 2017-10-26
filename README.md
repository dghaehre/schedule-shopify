
# schedule-shopify

> NOTE: This is not ready yet!

> This is a simple package based on shopify-api-node to schedule product price updates in shopify

> Easily create a cron job to run as frequent you would like and it will check the json file and run necessary updates. If cron finds job that is scheduled to run within 3 minutes it will run the update. It will of course run any update that was supposed to be ran already. So the accuracy of the cron is determined by when you schedule and how often cron.js is ran.

> NOTE: This package will create a jsonfile with your shopify credentials for cron job, if you feel like that is not good enough please feel free to help, as I have not bothered yet.


## Install

```
$ npm install --save schedule-shopify
```

## Usage

```js

const ScheduleShopify = require('schedule-shopify');

const Schedule = ScheduleShopify({
  shopName: shopName,
  apiKey: apiKey,
  password: password
})


let productSchedule = await Schedule.add({
  product: Shopify-Id,
  time: `10/24/2017T12:28:00`,
  price: price,
  priceCompare: priceCompare
})
//=> {status, err}

let scheduleList = await Schedule.list({limit: 10})
//=> list of 10 schedules

let removeSchedule = await Schedule.del(8)
//=> {status, err}

```

## CRON

```js

// Example:

node ./node_modules/schedule-shopify/cron.js

```
