const bcrypt = require("bcrypt");
const { connectMysql } = require("../database");
const saltRounds = 10;
class PasswordEncrypt {
  async hashPassword({ password }) {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  }
  async getPassword(username) {
    const mysql = `select password from account where username = '${username}'`;
    const [data, _] = await connectMysql.promise().execute(mysql);
    if (data.length == 0) {
      return false;
    }
    return data[0].password;
  }
  async comparePassword(password, passwordDB) {
    const result = await bcrypt.compare(password, passwordDB);
    return result;
  }
}

module.exports = new PasswordEncrypt();
