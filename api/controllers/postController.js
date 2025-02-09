export default class PostController {
  async getPosts(req, res) {
    return res.send('getPosts');
  }

  async getPostById(req, res) {
    return res.send('getPostById');
  }
  async createPost(req, res) {
    return res.send('createPost');
  }

  async updatePost(req, res) {
    return res.send('updatePost');
  }

  async deletePost(req, res) {
    return res.send('deletePost');
  }
}
