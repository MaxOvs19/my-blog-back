class UserController {
  async registration(req, res) {}

  async login(req, res) {}

  async check(req, res) {
    res.send("Hi");
  }
}

export default new UserController();
