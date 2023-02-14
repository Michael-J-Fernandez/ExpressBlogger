const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { validateBlogData } = require('../validation/blogs');
// instantiate mongodb
const {db} = require('../mongo')


// GET blogs listing
router.get('/', async function(req, res, next) {
    const blogs = await db()
        .collection('sample_blogs')
        .find({})
        .limit(5)
        .toArray(function(err, result){
            if (err) {
            res.status(400).send("error fetching blogs")
            } else {
            res.json(result);
            }
        });

    res.json({
        sucess:true,
        message: "Welcome to the blogs page.",
        blogs: blogs
    });
});


// /all/ (GET): returns all the blog posts
router.get('/all', async (req, res) => {

    const blogs = await db()
        .collection('sample_blogs')
        .find({})
        .toArray(function(err, result){
            if (err) {
            res.status(400).send("error fetching blogs")
            } else {
            res.json(result);
            }
        });

    res.json({
        sucess:true,
        blogs: blogs
    });
})


// /get-one/ (GET): returns one blog post
router.get('/get-one', async (req, res) => {

    const blogs = await db()
        .collection('sample_blogs')
        .find({})
        .limit(1)
        .toArray(function(err, result){
            if (err) {
            res.status(400).send("error fetching blogs")
            } else {
            res.json(result);
            }
        });

    res.json({
        sucess:true,
        blogs: blogs
    });
})


// /get-one/:id (GET): returns one blog post given an id
router.get('/get-one/:id', async (req, res) => {
    const idToFind = req.params.id;

    const foundBlog = await db()
    .collection('sample_blogs')
    .findOne({"id": idToFind})

    if (!foundBlog) {
        res.json({
            success: false,
            message: "Blog not found."
        })
        return;
    }

    res.json({
        success: true,
        blog: foundBlog
    })
})


// /create-one/ (POST): creates one blog post 
router.post('/create-one', async (req, res) => {
    const title = req.body.title;
    const text = req.body.text;
    const author = req.body.author;
    const category = req.body.category;
    const createdAt = new Date();
    const lastModified = new Date();
    
    const newBlog = {
        id: uuidv4(),
        title,
        text,
        author,
        category,
        createdAt,
        lastModified
    }

    const blogDataCheck = validateBlogData(newBlog);

    if (blogDataCheck.isValid === false) {
        res.json({
            success: false,
            message: blogDataCheck.message
        })
        return;
    }

    await db()
        .collection('sample_blogs')
        .insertOne(newBlog)

    res.json({
        success: true
    })
})


// ---- STRETCH GOALS ----

// /get-multi/ (GET): get multiple sorted results
router.get('/get-multi', async (req, res) => {

    const sortedBlogs = await db()
        .collection('sample_blogs')
        .find(req.query)
        .sort({ title : 1 })
        .toArray(function(err, result){
            if (err) {
            res.status(400).send("error fetching blogs")
            } else {
            res.json(result);
            }
        });

    res.json({
        sucess:true,
        sortedBlogs
    });
})


// /delete-multi/ (GET): get multiple results
router.get('/delete-multi', async (req, res) => {

    const sortedBlogs = await db()
        .collection('sample_blogs')
        .deleteMany(req.query)

    res.json({
        sucess:true
    });
})



/* THESE ROUTES ARE NOT REQUIRED BY THE ASSIGNMENT

// DELETE blog
router.delete('/single/:titleToDelete', (req, res) => {
    const titleToDelete = req.params.titleToDelete;
    const deleteIndex = sampleBlogs.findIndex(blog => blog.title === titleToDelete);
    sampleBlogs.splice(deleteIndex, 1);

    res.json({
        success: true
    })
})

// UPDATE single blog
router.put('/update-one/:blog', (req, res) => {
    const titleToUpdate = sampleBlogs.find(blog => blog.title === req.params.blog);
    const updateIndex = sampleBlogs.findIndex(blog => blog.title === req.params.blog);
    const updatedBlog = {};

    updatedBlog.title = req.body.title === undefined ? titleToUpdate.title : req.body.title;
    updatedBlog.text = req.body.text === undefined ? titleToUpdate.text : req.body.text;
    updatedBlog.author = req.body.author === undefined ? titleToUpdate.author : req.body.author;
    updatedBlog.category = req.body.category === undefined ? titleToUpdate.category : req.body.category;
    updatedBlog.createdAt = titleToUpdate.createdAt;
    updatedBlog.lastModified = new Date();

    const blogDataCheck = validateBlogData(updatedBlog);

    if (blogDataCheck.isValid === false) {
        res.json({
            success: false,
            message: blogDataCheck.message
        })
        return;
    }

    sampleBlogs[updateIndex] = updatedBlog;

    res.json({
        success: true
    })

})

THESE ROUTES ARE NOT REQUIRED BY THE ASSIGNMENT */


module.exports = router;