'use strict'
// Objects
module.exports.Guest = (obj) => {
 this.classification = "guest"
 this.firstname = obj.firstname ? obj.firstname : 'n/a',
 this.lastname = obj.lastname ? obj.lastname : 'n/a',
 this.email = obj.email ? obj.email : 'n/a',
 this.telephone = obj.telephone ? obj.telephone : 'n/a',
 this.floorplan = obj.floorplan ? obj.floorplan : 'n/a',
 this.movein = obj.movein ? obj.movein : 'n/a',
 this.price = obj.price ? obj.price : 'n/a'
}

module.exports.Vendor = (obj) => {
 this.classification = "vendor"
 this.company = obj.company,
 this.fname = obj.fname,
 this.lname = obj.laname,
 this.service = obj.service,
 this.date = obj.serviceDate,
 this.note = obj.note
}
