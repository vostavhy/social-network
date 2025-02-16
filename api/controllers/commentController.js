export default class CommentController {
  constructor(commentService) {
    this.commentService = commentService;
  }

  async getCommentById(req, res) {
    const { id } = req.params;

    try {
      const comment = await this.commentService.getCommentById(id);

      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }

      return res.json(comment);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createComment(req, res) {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { content, postId } = req.body;
    if (!content || !postId) {
      return res.status(400).json({ error: 'Content are required' });
    }

    try {
      const newComment = await this.commentService.createComment({
        content,
        postId,
        userId: user.userId,
      });

      return res.json(newComment);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteComment(req, res) {
    const { user } = req;

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.params;

    try {
      const comment = await this.commentService.getCommentById(id);

      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }

      if (comment.userId !== user.userId) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      await this.commentService.deleteComment(id);

      return res.json({ message: 'Comment deleted' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
