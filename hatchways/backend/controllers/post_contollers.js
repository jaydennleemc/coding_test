const cache = require('memory-cache');

const { fetchPosts } = require("../services/api_service");

class PostController {
  static async getPosts(req, res) {
    const sorts = ['id', 'reads', 'likes', 'popularity'];
    const directions = ['asc', 'desc'];
    let query = req.query;

    // Check query params
    if (!query.tags) {
      // return error if no tags
      res.status(400).json({
        "error": "Tags parameter is required"
      })
      return
    }

    if (query.sortBy && !sorts.includes(query.sortBy)) {
      // return error if sortBy is not valid
      res.status(400).json({
        "error": "sortBy parameter is invalid"
      });
      return
    }

    if (query.direction && !directions.includes(query.direction)) {
      // return error if direction is not valid
      res.status(400).json({
        "error": "direction parameter is invalid"
      });
      return
    }
    let sort = query.sortBy || 'id';
    let direction = query.direction || 'asc';

    // handle data
    let tags = query.tags.split(',');
    let posts = [];
    let cachePosts = cache.get(query.tags);
    if (cachePosts) {
      posts = cachePosts;
    }else {
      let apis = [];
      for (let i = 0; i < tags.length; i++) {
        apis.push(fetchPosts(tags[i]));
      }
      let results = await Promise.all(apis);
      results = results.map(result => result.data);
      results.forEach(result => {
        posts = posts.concat(result.posts);
      });
      // cache data
      cache.put(query.tags, posts, 1000 * 60 * 60);
    }
    // remove duplicates
    let ids = posts.map(post => post.authorId);
    posts = posts.filter((post, index) => ids.indexOf(post.authorId) === index);
    // sort posts
    posts.sort((a, b) => (a[sort] - b[sort]) * (direction === 'asc' ? 1 : -1));
    res.json({
      "posts":posts
    })
  }
}

module.exports = PostController;