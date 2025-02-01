class UserController {
  async register(req, res) {
    res.send('register');
  }

  async login(req, res) {
    res.send('login');
  }

  async getUserById(req, res) {
    const { id } = req.params;
    res.send(`profile: ${id}`);
  }

  async updateUserById(req, res) {
    res.send('update');
  }

  async delete(req, res) {
    res.send('delete');
  }
}

export default UserController;
