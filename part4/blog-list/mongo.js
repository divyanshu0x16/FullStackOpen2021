const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://Divyanshu:${password}@cluster0.eitz6.mongodb.net/blog-list?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  title: 'Test',
  author: 'me!!',
  url: 'google.com',
  likes: 0,
})

blog.save().then(result => {
  console.log('blog saved!')
  mongoose.connection.close()
})