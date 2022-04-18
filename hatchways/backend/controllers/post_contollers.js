const cache = require('memory-cache');

const { fetchPosts } = require("../services/api_service");

class PostController {
  static async getPosts(req, res) {
    const sorts = ['id', 'reads', 'likes', 'popularity'];
    const directions = ['asc', 'desc'];
    const { tags, direction = 'asc', sortBy = 'id' } = req.query

    // Check query params
    if (!query.tags) {
      // return error if no tags
      res.status(400).json({
        "error": "Tags parameter is required"
      })
      return
    }

    if (sortBy && !sorts.includes(sortBy)) {
      // return error if sortBy is not valid
      res.status(400).json({
        "error": "sortBy parameter is invalid"
      });
      return
    }

    if (direction && !directions.includes(direction)) {
      // return error if direction is not valid
      res.status(400).json({
        "error": "direction parameter is invalid"
      });
      return
    }
    // handle data
    let tagArr = tags.split(',');
    let posts = [];
    let cachePosts = cache.get(tags);
    if (cachePosts) {
      posts = cachePosts;
    } else {
      let apis = [];
      for (let i = 0; i < tagArr.length; i++) {
        apis.push(fetchPosts(tagArr[i]));
      }
      let results = await Promise.all(apis);
      results = results.map(result => result.data);
      results.forEach(result => {
        posts = posts.concat(result.posts);
      });
      // cache data
      const TIME_OUT = 1000 * 60 * 60;
      cache.put(query.tags, posts, TIME_OUT);
    }
    // remove duplicates
    let ids = posts.map(post => post.authorId);
    posts = posts.filter((post, index) => ids.indexOf(post.id) === index);
    // sort posts
    posts.sort((a, b) => (a[sort] - b[sort]) * (direction === 'asc' ? 1 : -1));
    res.json({ posts })
  }
}

module.exports = PostController;