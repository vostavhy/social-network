export default class PostController {
  constructor(postService) {
    this.postService = postService;
  }

  async getPosts(req, res) {
    try {
      const posts = await this.postService.getPosts();
      return res.json(posts);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getPostById(req, res) {
    try {
      const { id } = req.params;
      const post = await this.postService.getPostById(id);

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      return res.json(post);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createPost(req, res) {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const isAuthorExists = await this.postService.isAuthorExists(user.userId);
    if (!isAuthorExists) {
      return res.status(403).json({ error: 'Author not found' });
    }

    const { title, content } = req.body;
    if (!content || !title) {
      return res.status(400).json({ error: 'Content and title are required' });
    }

    try {
      const newPost = await this.postService.createPost({
        title,
        content,
        authorId: user.userId,
      });

      return res.json(newPost);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updatePost(req, res) {
    const { user } = req;

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.params;
    const post = await this.postService.getPostById(id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.authorId !== user.userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const { content, title } = req.body;

    if (!content || !title) {
      return res.status(400).json({ error: 'Content are required' });
    }

    try {
      const updatedPost = await this.postService.updatePost(id, { content });
      return res.json(updatedPost);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deletePost(req, res) {
    const { user } = req;

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.params;
    const post = await this.postService.getPostById(id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.authorId !== user.userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    try {
      const post = await this.postService.deletePost(id);
      return res.status(204).json(post);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
