const axios = require('axios');

class APIService {
    static async fetchPosts(tag) {
        return await axios.get(`https://api.hatchways.io/assessment/blog/posts?tag=${tag}`);
    }
}

module.exports = APIService;

