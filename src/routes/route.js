const express = require('express');
const myHelper = require('../util/helper')
const underscore = require('underscore')

const router = express.Router();
let bookings = [{
    "bookingNumber": 4,
    "sportId": "",
    "centerId": "",
    "type": "private",
    "slot": 16286598000000,
    "bookedOn": "31/08/2021",
    "bookedFor": "01/09/2021"
}]


let players =
    [
        {
            "name": "manish",
            "dob": "1/1/1995",
            "gender": "male",
            "city": "jalandhar",
            "sports": [
                "swimming"
            ]
        },
        {
            "name": "gopal",
            "dob": "1/09/1995",
            "gender": "male",
            "city": "delhi",
            "sports": [
                "soccer"
            ],
        },
        {
            "name": "lokesh",
            "dob": "1/1/1990",
            "gender": "male",
            "city": "mumbai",
            "sports": [
                "soccer"
            ],
        },
    ]

router.post('/post-players', function (req, res) {
    for (let i = 0; i < players.length; i++) {
        if (players[i].name === req.body.name) {
            res.send("player with this name is already exists")
        }
    }
    players.push(req.body)

    res.send({ data: players, status: true })
})


router.post('/players/:playerName/bookings/:bookingId', function (req, res) {
    let pn = req.params.playerName
    let bn = req.params.bookingId
    console.log(pn);
    console.log(bn);
    console.log(players[0].name);
    console.log(bookings.length);
    console.log(bookings);
    for (let i = 0; i < players.length; i++) {
        if (players[i].name == pn) {
            for (let j = 0; j <= bookings.length; j++) {
                if (bookings[j].bookingNumber != bn) {
                    bookings.push(req.body)
                    res.send({ bookingrecord: bookings })
                } else { res.send("booking id of this player is already exist") }
            }
        }
    }
    res.send("no player present for this name")
});

router.post('/post-api2', function (req , res) {
    let persons = [{
        "name": "pk",
        "age": 10,
        "votingStatus": false
    },
    {
        "name": "ak",
        "age": 15,
        "votingStatus": false
    },
    {
        "name": "sk",
        "age": 18,
        "votingStatus": false
    },
    {
        "name": "js",
        "age": 25,
        "votingStatus": false
    },
    {
        "name": "ss",
        "age": 28,
        "votingStatus": false
    }
    ]
let vp = []
    let votingage = req.query.age

    for (let i = 0; i < persons.length; i++) {
        if (persons[i].age > votingage) {
            persons[i].votingStatus = true
            vp.push(persons[i])
        }
    }
  res.send({"data":vp})
  console.log(persons);
});

module.exports = router;