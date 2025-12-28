const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  filename: String,
  ipfsHash: String,
  iv: String,
  uploadDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("File", FileSchema);
