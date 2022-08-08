const express = require('express');
const abc = require('../introduction/intro')
const router = express.Router();

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});
 
// ==================================PROBLEN NO. 1 ===========================================
router.get('/movies', function (req, res) {
    let movie = ["pushpa","kgf","saaho","vikram","kgf","kaithi"]
    res.send(movie)
});

// ==================================PROBLEN NO. 2 ===========================================

router.get('/movies/:indexNumber', function (req, res) {
    let movie = ["pushpa","kgf","saaho","vikram","kgf","kaithi"]
    console.log(req.params.indexNumber);
    res.send(movie[req.params.indexNumber])
});

// ==================================PROBLEN NO. 3 ===========================================

router.get('/movies/:indexNumber', function (req, res) {
    let movie = ["pushpa","kgf","saaho","vikram","kgf","kaithi"]
    let arrlength = movie.length
    req.params.indexNumber = Number(req.params.indexNumber)
    console.log(req.params.indexNumber);
    console.log(arrlength);
    console.log(typeof(req.params.indexNumber));
    console.log(typeof(arrlength));
    if (typeof(req.params.indexNumber) !== "number") {
        res.send("pls enter only number in the place of indexnumber")
    } else {
     if (req.params.indexNumber<arrlength) {
    res.send(movie[req.params.indexNumber])    
    }else{res.send("pls enter correct index")}
    }
});

// ==================================PROBLEN NO. 4 ===========================================

router.get('/films', function (req, res) {
   let obj =  [ {
        "id": 1,
        "name": "The Shining"
       }, {
        "id": 2,
        "name": "Incendies"
       }, {
        "id": 3,
        "name": "Rang de Basanti"
       }, {
        "id": 4,
        "name": "Finding Nemo"
       }]
       res.send(obj)     
});

// ==================================PROBLEN NO. 5 ===========================================

router.get('/films/:filmId', function (req, res) {
    let obj =  [ {
         "id": 1,
         "name": "The Shining"
        }, {
         "id": 2,
         "name": "Incendies"
        }, {
         "id": 3,
         "name": "Rang de Basanti"
        }, {
         "id": 4,
         "name": "Finding Nemo"
        }]

        console.log(obj[0].id);
        console.log(obj[1]);
        console.log(obj.length);
        console.log(req.params.filmId);

for (let i = 0; i < obj.length; i++) {
    if (obj[i].id != req.params.filmId) {
        continue 
    }else 
    { res.send(obj[i]) }
}
res.send("pls enter correct film id")

 });

module.exports = router;