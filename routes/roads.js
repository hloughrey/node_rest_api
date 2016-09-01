let express = require('express');
let router = express.Router();
let Pool = require('pg').Pool;
let roads = require('../models/roads.js');

let onError = function(err) {
  console.log(err.message, err.stack)
  res.writeHead(500, {'content-type': 'text/plain'});
  res.end('An error occurred');
};

router.route('/')
  .all((req, res, next) => {
    next();
  })

  .get((req, res) => {
    pool.query('SELECT id, \
                roadname, \
                town, \
                usrn, \
                adoption_status, \
                open, \
                notes, \
                ST_AsGeoJSON(geom) AS geom\
                FROM herefordshire.lsg \
                LIMIT 10', (err, result) => {
      if (err) return onError(err)
      roads.roadsModel(result.rows, function() {

      })
      res.writeHead(200, {'content-type': 'text/plain'});
      res.json(geoJSON);
    })
  });

  // .post((err, res) => {
  //   res.json({message: 'foo'})
  // });

// router.route('/:id')
//   .all((req, res, next) => {
//     next();
//   })
//
//   .get((err, res) => {
//     res.json({message: 'foobar'})
//   })
//
//   .post((err, res) => {
//     res.json({message: 'foo'})
//   })

module.exports = router;
