# ExpressBlogger

• Create two GET routes in ./routes/blogs.js
• GET /blogs/all that will send the entire list of sample blogs in the HTTP response
"Remember: Since route names concatenate with the blogs router code we added to app.js, we only need to name our new route "all" in blogs.js. This is because all of the routes we will create in blogs.js will concatenate their route name with "blogs" from the app.use('/blogs', blogsRouter); line of code in app.js.
• Note: It is good practice to send success: true in the response JSON
• res.json({ success: true, blogs: sampleBlogs });
• GET /blogs/single/:blog TitleToGet that will send a single blog from the sample blogs in the HTTP response based upon the blog title passed into the url
• Create one DELETE route with a single route param blog TitleToDelete
• DELETE /blogs/single/blog TitleToDelete that will delete a single blog in the sample blogs based upon the blog title passed into the
• Note: Even though we are not sending any blog data back with this request, we still need to respond to the request. So we will res.json an object containing success:true.
• Create Postman requests for all of these routes and test to see that they work

~~~~~~~~~~~~~~~~~~~~~~~~~

Requirements - Day 2
Create a new file /validation/blogs.js. In /validation/blogs.js:
Create a basic validator function for blogData and add that function to the module.exports
In /routes/blogs.js:
Import (require) the blogData validator function into /routes/blogs.js


Create one POST route /blogs/create-one to create a new blog post
Note: Do not forget to generate createdAt and lastModified in the new blog post


Create one PUT route /blogs/update-one/:blog Title to update a blog post


Both of the above routes should run validations on the incoming blog post body data BEFORE either creating a new blog post or updating a blog post. If the blog data is invalid, then a message should be sent in the http response indicating which validation failed and why
Build out the blogData validator function to check for the following conditions:

Title, text and author are required fields and they should be strings
Title and author should be no longer than 40 characters in length (letters + whitespace)


Stretch Goal:
If category is defined and has a length greater than 0:
" There can be no more than 10 entries for category
All the entries must be strings
All categories must be in the following list of strings:
"Lorem"
"ipsum"
"dolor"
"sit"
"amet"