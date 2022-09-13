const blogModel = require('../models/blogModel')
const authorModel = require('../models/authorModel')
const mongoose = require('mongoose')
const moment = require('moment')

let regname = /^[a-zA-Z]+([_ -]?[a-zA-Z])*$/
let regfortags = /^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/
// 1) post ) createBlogs...
const createBlogs = async function (req, res) {
    try {
        if (Object.keys(req.body).length == 0) return res.status(400).send({ status: false, msg: "data is not given" })

        const { title, body, authorId, tags, category, subcategory, isDeleted, isPublished, publishedAt, deletedAt } = req.body
        // title = title.trim()
        if (!authorId) return res.status(400).send({ status: false, msg: "AuthorId is Mendatory" })
        if (!mongoose.Types.ObjectId.isValid(authorId)) return res.status(400).send({ status: false, msg: "AuthorId is not Valid" })

        let result = await authorModel.findById(authorId)
        if (!result) return res.status(404).send({ status: false, msg: "Author is not Present" })

        if (!title) return res.status(400).send({ status: false, msg: "title is a mandatory thing" })

        if (!regname.test(title)) return res.status(400).send({ status: false, msg: "pls enter correct title" })

        if (!body) return res.status(400).send({ status: false, msg: "body is a mandatory thing" })

        if (!regname.test(body)) return res.status(400).send({ status: false, msg: "pls enter correct body" })

        if (!category) return res.status(400).send({ status: false, msg: "category is a mandatory thing" })

        if (!regname.test(category)) return res.status(400).send({ status: false, msg: "pls enter correct category" })
        if (tags) {
            if (typeof (tags) != "object") return res.status(400).send({ status: false, msg: "tags type is wrong" })
            for (let i = 0; i < tags.length; i++) {
                if (!regfortags.test(tags[i])) return res.status(400).send({ status: false, msg: "pls write tags in a correct format" })
            }
        }
        if (subcategory) {
            if (typeof (subcategory) != "object") return res.status(400).send({ status: false, msg: "subcategory type is wrong" })
            for (let i = 0; i < subcategory.length; i++) {
                if (!regfortags.test(subcategory[i])) return res.status(400).send({ status: false, msg: "pls write Subcategory in a correct format" })
            }
        }
        if (isPublished) {
            if (typeof (isPublished) != "boolean")
                return res.status(400).send({ status: false, msg: "isPublished is wrong type" })
            if (isPublished === true) {
                if (!publishedAt) return res.status(400).send({ status: false, msg: "published  date is a mandatory thing" })
                if (!moment(publishedAt, 'YYYY-MM-DD', true).isValid())
                    return res.status(400).send({ status: false, msg: "Plz write publishedAt in Valid format" })
            }
        }
        if (isDeleted) {
            if (typeof (isDeleted) != 'boolean')
                return res.status(400).send({ status: false, msg: "isDeleted is wrong type" })
            if (isDeleted === true) {
                if (!moment(deletedAt, 'YYYY-MM-DD', true).isValid())
                    return res.status(400).send({ status: false, msg: "Plz write DeletedAt in Valid format" })
            }
        }
        let savedData = await blogModel.create(req.body)

        return res.status(201).send({ status: true, data: savedData })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }

}
//2) get ) getBlogs...
const getBlogs = async function (req, res) {

    try {

        let findData = req.query;                   
        if (findData.authorId )
        {
            if(!mongoose.Types.ObjectId.isValid(findData.authorId))
                return res.status(400).send({ status: false, msg: "authorId is invilid" })
        }
        let result = await blogModel.find({ $and: [findData, { isDeleted: false, isPublished: true }] });
        if (result.length == 0) return res.status(404).send({ status: false, msg: "DATA NOT FOUND" })
        res.status(200).send({ status: true, data: result })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}
// 3) put) update blogs...
const updateBlogs = async function (req, res) {
    try {
        let blogId = req.params.blogId

        if (!mongoose.Types.ObjectId.isValid(blogId))
            return res.status(400).send({ status: false, msg: "blogId is invilid" })

        if (Object.keys(req.body).length == 0) return res.status(400).send({ status: false, msg: "No data for update" })

        let data = await blogModel.findById(blogId)
        if (data.isDeleted === true) return res.status(404).send({ status: false, msg: "data not found" })

        const { title, body, tags, subcategory } = req.body

        let blogData = {}
        if (title) {
            if (!regname.test(title))
                return res.status(400).send({ status: false, msg: "pls enter correct title name" })
            blogData.title = title
        }
        if (body) {
            if (!regname.test(body))
                return res.status(400).send({ status: false, msg: "pls enter correct body Name" })
            blogData.body = body
        }
        blogData.isPublished = true;
        blogData.publishedAt = Date.now()

        let blogTags = {}
        if (tags) {
            if (typeof (tags) != "object") return res.status(400).send({ status: false, msg: "tags type is wrong" })
            for (let i = 0; i < tags.length; i++) {
                if (!regfortags.test(tags[i])) return res.status(400).send({ status: false, msg: "pls write tags in a correct format" })
            }
            blogTags.tags = tags
        }
        if (subcategory) {
            if (typeof (subcategory) != "object") return res.status(400).send({ status: false, msg: "subcategory type is wrong" })
            for (let i = 0; i < subcategory.length; i++) {
                if (!regfortags.test(subcategory[i])) return res.status(400).send({ status: false, msg: "pls write Subcategory in a correct format" })
            }
            blogTags.subcategory = subcategory
        }
        let saveddata = await blogModel.findOneAndUpdate({ _id: blogId }, { $set: blogData, $addToSet: blogTags }, { new: true })
        res.status(200).send({ status: true, data: saveddata })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

// 4) delete ) delete blogs by blogId...
const deleteBlogsById = async function (req, res) {
    try {
        let blogId = req.params.blogId

        if (!mongoose.Types.ObjectId.isValid(blogId))
            return res.status(400).send({ status: false, msg: "blogId Is invilid" })

        let blogData = await blogModel.findOneAndUpdate({ $and: [{ _id: blogId }, { isDeleted: false }] }, { isDeleted: true, deletedAt: Date.now() }, { new: true })
        if (!blogData)
            return res.status(404).send({ status: false, msg: "DATA NOT FOUND" })
       return res.status(200).send()
    }
    catch (err) {
       return res.status(500).send({ status: false, msg: "server side error" })
    }

}

//5) delete ) delete blogs by Fileter
const deleteBlogsByFilter = async function (req, res) {

    try {
        
        let queryData = req.query
        let blogData = await blogModel.updateMany({ $and: [queryData, {isDeleted: false }] }, { $set: { isDeleted: true, deletedAt: Date.now() } })
        if (blogData.modifiedCount == 0)
            return res.status(404).send({ status: false, msg: "DATA NOT FOUND" })
        return res.status(200).send({ status: true, mgs: "Data deleted completed" })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }

}


module.exports = { createBlogs, getBlogs, updateBlogs, deleteBlogsById, deleteBlogsByFilter }


