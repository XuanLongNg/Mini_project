const userService = require("../services/userService");

class UserController {
  // Post
  async signin(req, res, next) {
    try {
      const dataCreate = {
        ...req.body,
      };
      const auth = await userService.authentication(dataCreate);
      if (auth) {
        return res.send({ message: "Sign in successfully!" });
      } else {
        return res
          .status(400)
          .send({ message: "Username or password incorrect." });
      }
    } catch (error) {
      console.log(error);
      return res.send({ message: "server internal" });
    }
  }
  async signup(req, res, next) {
    try {
      const hasUser = await userService.hasUser(req.body.username);
      if (hasUser) {
        return res.status(400).send({ message: "Username is exist" });
      }
      const personId = (await userService.getPersonId()) + 1;
      const dataCreate = {
        ...req.body,
        personId,
      };
      await Promise.all([
        userService.createPerson(dataCreate),
        userService.createAccount(dataCreate),
        userService.addMember(dataCreate),
      ]);
      return res.json({ message: "New Account has been created" });
    } catch (err) {
      return res.send({ message: "server internal" });
    }
  }
}

module.exports = new UserController();
