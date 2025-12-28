const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const secretKey = process.env.SECRET_KEY;
const iv = crypto.randomBytes(16);

exports.encrypt = (buffer) => {
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(secretKey),
    iv
  );
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  return {
    iv: iv.toString("hex"),
    content: encrypted
  };
};

exports.decrypt = (encryptedData) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey),
    Buffer.from(encryptedData.iv, "hex")
  );
  const decrypted = Buffer.concat([
    decipher.update(encryptedData.content),
    decipher.final()
  ]);
  return decrypted;
};
