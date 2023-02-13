const bcrypt = require("bcrypt");
const bcrypt = require("bcrypt");
const saltRounds = 10;
async function hashPassword(plaintextPassword) {
  const hash = await bcrypt.hash(plaintextPassword, saltRounds);
  // Store hash in the database
}

// compare password
async function comparePassword(plaintextPassword, hash) {
  const result = await bcrypt.compare(plaintextPassword, hash);
  return result;
}
