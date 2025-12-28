const axios = require("axios");
const FormData = require("form-data");
const File = require("../models/File");
const { encrypt, decrypt } = require("../utils/encryptDecrypt");

// =======================
// UPLOAD + ENCRYPT
// =======================
exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const encryptedData = encrypt(req.file.buffer);

    const formData = new FormData();
    formData.append("file", encryptedData.content, req.file.originalname);

    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: Infinity,
        headers: {
          ...formData.getHeaders(),
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_SECRET_KEY
        }
      }
    );

    const ipfsHash = response.data.IpfsHash;

    const newFile = new File({
      filename: req.file.originalname,
      ipfsHash,
      iv: encryptedData.iv
    });

    await newFile.save();

    res.json({ ipfsHash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
};

// =======================
// DOWNLOAD + DECRYPT
// =======================
exports.getFile = async (req, res) => {
  try {
    const fileData = await File.findOne({ ipfsHash: req.params.hash });

    if (!fileData) {
      return res.status(404).json({ error: "File not found" });
    }

    const encryptedFile = await axios.get(
      `https://gateway.pinata.cloud/ipfs/${req.params.hash}`,
      { responseType: "arraybuffer" }
    );

    const decrypted = decrypt({
      iv: fileData.iv,
      content: Buffer.from(encryptedFile.data)
    });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${fileData.filename}`
    );

    res.send(decrypted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Download failed" });
  }
};
