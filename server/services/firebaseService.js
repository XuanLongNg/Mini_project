const { db } = require("../constants/firebaseInit");

class FirebaseService {
  async createCertificate({ name, header, certificateTime }) {
    const data = {
      name: name,
      header: header,
      certificateTime: certificateTime,
    };
    const docRef = await db.collection("Certificate").doc().set(data);
    return docRef;
  }
  async updateCertificate({ id, name, header, certificateTime }) {
    const data = {
      name: name,
      header: header,
      certificateTime: certificateTime,
    };
    const docRef = await db.collection("Certificate").doc(id).set(data);
    return docRef;
  }
  async getCertificate({ id }) {
    const snapshot = await db.collection("Certificate").get();
    let data = false;
    snapshot.forEach((doc) => {
      if (doc.id === id) data = doc.data();
    });
    return data;
  }
  async deleteCertificate({ id }) {
    const delCertificate = await db.collection("Certificate").doc(id).delete();
    return delCertificate;
  }
}

module.exports = new FirebaseService();
