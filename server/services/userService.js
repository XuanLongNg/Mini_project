const POSITION = require("../constants/positions.contant");
const { connectMysql } = require("../database");
const PasswordEncrypt = require("../hashPassword/hashing");

class UserService {
  async hasUser(username) {
    const mysql = "select * from account where username = '" + username + "'";
    const [data] = await connectMysql.promise().execute(mysql);
    if (data.length > 0) {
      return true;
    }
    return false;
  }

  async createPerson({ name, dob, address, phoneNum, personId }) {
    const insertSql = `insert into person (name, dob, address,phoneNum) values ('${name}','${dob}', '${address}' , '${phoneNum}')`;
    const data = await connectMysql.promise().execute(insertSql);
    return data;
  }
  async getPersonId() {
    const totalPersonSql = "select id from person ";
    const [data, _] = await connectMysql.promise().execute(totalPersonSql);
    if (data.length == 0) return 0;
    return data[data.length - 1].id;
  }

  async createAccount({ username, password, personId }) {
    const insertSql = `insert into account (idPerson,username,password) values ('${personId}','${username}', '${password}')`;
    const data = await connectMysql.promise().execute(insertSql);
    return data;
  }

  async addMember({ position, personId }) {
    let idTeam;
    if (position == "Technical") idTeam = "tech";
    else if (position == "Security") idTeam = "sec";
    else if (position == "Community") idTeam = "com";
    const insertSql = `INSERT INTO member (idPerson, idTeam) values ('${personId}', '${idTeam}')`;
    const data = await connectMysql.promise().execute(insertSql);
    return data;
  }
  async authentication({ username, password }) {
    const passwordDB = await PasswordEncrypt.getPassword(username);
    const result = await PasswordEncrypt.comparePassword(password, passwordDB);
    if (result) {
      return true;
    }
    return false;
  }
}

module.exports = new UserService();
