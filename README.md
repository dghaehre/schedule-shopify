
# schedule-shopify

> This is a simple package based on shopify-api-node to schedule product price updates in shopify

> Easily create a cron job to run as frequent you would like and it will check the json file and run necessary updates.

> NOTE: This package will create a jsonfile with you shopify credentials for cron job, if you dont feel comfortable with that you can use something else.


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
  product: Sku || Barcode || Shopify-Id,
  time: `Time format`,
  price: price,
  priceCompare: priceCompare
})
//=> {status, err}

let scheduleList = await Schedule.list({limit: 10})
//=> list of 10 schedules

let removeSchedule = await Schedule.del({id: 8})
//=> {status, err}

```

## CRON

```js

// Example:



```
