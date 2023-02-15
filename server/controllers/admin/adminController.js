const FirebaseService = require("../../services/firebaseService");

class AdminController {
  async createCertificate(req, res, next) {
    try {
      const data = {
        ...req.body,
      };
      const cert = await FirebaseService.createCertificate(data);
      return res.json({ message: "New Certificate has been created" });
    } catch (err) {
      console.error(err);
      return res.status(404).send({ message: "Server internal" });
    }
  }
  async updateCertificate(req, res, next) {
    try {
      const data = {
        ...req.body,
      };
      const cert = await FirebaseService.updateCertificate(data);
      return res.json({ message: "Certificate has been updated" });
    } catch (err) {
      console.error(err);
      return res.status(404).send({ message: "Server internal" });
    }
  }
  async getCertificates(req, res, next) {
    try {
      const data = {
        ...req.body,
      };
      const certificate = await FirebaseService.getCertificate(data);
      if (!certificate)
        return res.json({ message: "Certificate doesn't exist" });
      return res.json({ message: "Hello" });
    } catch (err) {
      console.log(err);
      return res.status(404).send({ message: "Server internal" });
    }
  }
  async deleteCertificate(req, res, next) {
    try {
      const data = {
        ...req.body,
      };
      const deleteCer = await FirebaseService.deleteCertificate(data);
      return res.json({ message: "This certificate has been deleted." });
    } catch (err) {
      console.error(err);
      return res.status(404).send({ message: "Server internal" });
    }
  }
}

module.exports = new AdminController();
