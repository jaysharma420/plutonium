const collegeModel = require("../models/CollegeModel");
const internsModel = require("../models/internsModel");

//validation by => JAY Sharama
const createCollege = async (req, res) => {
  try {
    let data = req.body;

    const datas = await college.create(data);

    res.status(201).send({ status: true, data: datas });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

//------------------⭐GET/collegeDetails⭐---------------------------//

//get CollegeDetails by richard

// const createIntern = async (req,res)=>{

//     let data = req.body

//     const datas = await intern.create(data)

//     res.send({data:datas})
// }

const getCollegeDetails = async (req, res) => {
  try {
    const clgName = req.query;
    let { collegeName } = req.query;

    if (!collegeName)
      return res
        .status(400)
        .send({ status: false, msg: "CollgeName is required" });

    if (Object.keys(clgName).length > 1)
      return res.status(400).send({ status: false, msg: "enter single query" });

    const isValidName = function (value) {
      if (!(value === value.toLowerCase())) {
        return false;
      }
      return true;
    };

    if (!isValidName(collegeName))
      return res .status(400).send({status: false,msg: "Invalid-CollegeName-Try name with lowerCase",});

     const collegename = await collegeModel.findOne({ name: collegeName });

    if (!collegename)return res.status(404)
        .send({ status: false, msg: "This College not Found" });

    const { name, fullName, logoLink } = collegename;

    const intern = await internsModel
      .find({ collegeId: collegename._id })
      .select({ name: 1, email: 1, mobile: 1 });

    const data = {
      name: name,
      fullName: fullName,
      logoLink: logoLink,
      interns: intern.length
        ? intern
        : { msg: "0 application from this collge" },
    };

    return res.status(200).send({ status: true, data: data });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

// module.exports = {createIntern}

module.exports = { createCollege, getCollegeDetails };
