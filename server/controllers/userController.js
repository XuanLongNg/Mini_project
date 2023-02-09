const DB = require("../../database");

class UserController {
  // Post
  login(req, res, next, con) {
    try {
      const { username, password } = req.body;
      //query
      let mysql =
        "select username, password from account where username = '" +
        username +
        "' and password = '" +
        password +
        "'";
      con.query(mysql, function (err, data, field) {
        if (err) throw err;

        if (data.length == 0) {
          console.log("incorrect");
          res.render("sign_in", {
            message: "Incorrect",
            username: username,
          });
        } else {
          console.log("correct");
          let user = { username: username, password: password };
          req.session.user = user;
          res.redirect("home_page");
        }
        DB.closeDB(con);
      });
    } catch (error) {
      console.log("error", error);
      return res.render("sign_in", { message: "server internal" });
    }
  }
  signup(req, res, next, con) {
    try {
      const { username, password, name, dob, address, phoneNum, position } =
        req.body;
      //query
      let mysql = "select * from account where username = '" + username + "'";
      console.log(req.body);
      console.log(mysql);
      con.query(mysql, function (err, data, field) {
        if (err) {
          console.log(err);
          throw err;
        }
        if (data.length == 0) {
          let pos = "";
          if (position == "Technical") pos = "tech";
          else if (position == "Security") pos = "sec";
          else if (position == "Community") pos = "com";
          mysql = "select id from person where id like '" + pos + "%'";
          con.query(mysql, function (err, data, field) {
            if (err) throw err;
            pos += (data.length + 1).toString().padStart(2, "0");
            mysql = `insert into person (id, name, dob, address,phoneNum) values ('${pos}','${name}','${dob}', '${address}' , '${phoneNum}')`;
            con.query(mysql, function (err, data, field) {
              if (err) throw err;
              mysql = "select id from account";
              con.query(mysql, function (err, data, field) {
                if (err) throw err;
                let id = "ac" + (data.length + 1).toString().padStart(2, "0");
                mysql = `insert into account (id,idPer,username,password) value ('${id}', '${pos}','${username}', '${password}')`;
                con.query(mysql, function (err, data, field) {
                  if (err) throw err;
                  console.log("This profile has been updated");
                  res.redirect("sign_in");
                });
                DB.closeDB(con);
              });
            });
          });
        } else {
          console.log("Account already exists");
          res.render("sign_up", {
            message: "Account already exists",
            username: username,
            password: password,
            name: name,
            address: address,
            phoneNum: phoneNum,
            position: position,
          });
          DB.closeDB(con);
        }
      });
    } catch (error) {
      console.log("error", error);
      return res.send({ message: "server internal" });
    }
  }
}

module.exports = { UserController };
