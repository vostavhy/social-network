export default class FollowerController {
  constructor(followerService) {
    this.followerService = followerService;
  }

  async follow(req, res) {
    const { userId } = req.user;
    const { followingId } = req.body;

    if (!followingId) {
      return res.status(400).send('Following ID is required');
    }

    // you cannot follow yourself
    if (userId === followingId) {
      return res.status(400).send('You cannot follow yourself');
    }

    // check if the user is already following
    const isFollowing = await this.followerService.isFollowing(userId, followingId);
    if (isFollowing) {
      return res.status(400).send('You are already following this user');
    }

    try {
      await this.followerService.follow(userId, followingId);
      res.status(200).send('Followed');
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async unfollow(req, res) {
    const { userId } = req.user;
    const { followingId } = req.body;

    if (!followingId) {
      return res.status(400).send('Following ID is required');
    }

    // check if the user is not following
    const isFollowing = await this.followerService.isFollowing(userId, followingId);
    if (!isFollowing) {
      return res.status(400).send('You are not following this user');
    }

    try {
      await this.followerService.unfollow(userId, followingId);
      res.status(200).send('Unfollowed');
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}
