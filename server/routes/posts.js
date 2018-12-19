const errors = require('restify-errors');
const Post = require('../models/Posts');
const axios = require('axios');

module.exports = server => {

  server.get('/posts', async (req, res, next) => {
    try {
      const posts = await Post.find({});
      res.send(posts);
      next();  
    } catch(err) {
      return next(new errors.InvalidContentError(err));
    }        
  });

  server.get('/axios', (req, res, next) => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        console.log('response: success');
        
        const postList = response.data.splice(0,10);
        
        {postList && postList.map(item => {
          console.log(`-- ${item.title}`);

          const post = new Post({
            userId: item.userId,
            title: item.title,
            body: item.body
          });

          try {
            const newPost = post.save();
            res.send(201);
            next();
          } catch(err) {
            return next(new errors.InternalError(err.message));
          }
        })}
      })
      .catch(error => {
        console.log(error);
      });
  });
}