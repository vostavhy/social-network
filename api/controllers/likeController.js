export default class LikeController {
  constructor(likeService) {
    this.likeService = likeService;
  }

  async like(req, res) {
    const { postId } = req.body;
    const userId = req.user.userId;

    // user can like post only once
    const ifExist = await this.likeService.getLike(userId, postId);
    if (ifExist) {
      return res.status(400).json({ error: 'You already liked this post' });
    }

    try {
      const like = await this.likeService.like(userId, postId);
      res.status(201).json(like);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async unlike(req, res) {
    const { postId } = req.params;
    const userId = req.user.id;

    // user can unlike post only if hi liked it
    const ifExist = await this.likeService.getLike(userId, postId);

    if (!ifExist) {
      return res.status(400).json({ error: 'You did not like this post' });
    }

    try {
      await this.likeService.unlike(userId, postId);
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
