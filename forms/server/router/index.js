'use strict'
// Objects
module.exports = function engage () {
 app.get('/', home)
 app.post('/guest/add', addGuest)
 app.post('/vendor/add', addVendor)
 app.post('/searches', searchGuest)
 app.post('/searchByPrice', searchByPrice)
 app.get('/*', errorFunction)
}



