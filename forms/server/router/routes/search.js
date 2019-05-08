let reference = require('./dependency');
let client = reference.express;

function searchGuest (req, res) {
 let searchName = req.body.searchName;
 let searchEmail = req.body.searchEmail;
 let moveIn = req.body.searchMoveIn;
 let searchFloor = req.body.floorplan;
 let SQL = `SELECT * FROM guests WHERE lastname=$1 OR email=$2 OR movein=$3 OR floorplan=$4`
 let values = [searchName, searchEmail, moveIn, searchFloor]
 return client.query(SQL, values)
 .then(data => {
   let guests = data.rows.map(el => new Guest(el))
   console.log(guests)
   res.render('guestView', {
     topicHead: `${appName}`,
     guests: guests
   })
 })
}

module.exports.searchGuest = searchGuest;