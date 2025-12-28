# Blockchain-Based Secure File Storage System

A web-based application that allows users to securely upload and download files using **IPFS (InterPlanetary File System)** with **AES encryption** and **MongoDB** for metadata storage.  
The system ensures data integrity, confidentiality, and decentralized storage.

---

## 🚀 Features

- User authentication (Login & Register)
- Secure file upload with AES-256 encryption
- Decentralized file storage using IPFS (Pinata)
- Encrypted file download using IPFS hash
- MongoDB Atlas for storing file metadata
- Simple and user-friendly UI
- Session-based access control

---

## 🛠 Tech Stack

**Frontend**
- HTML
- CSS
- JavaScript

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB Atlas

**Storage & Security**
- IPFS (Pinata)
- AES-256 Encryption

---

## 📁 Project Structure

```blockchain-file-storage/
│
├── server.js
├── package.json
├── .env.example
├── .gitignore
│
├── config/
│ └── db.js
│
├── controllers/
│ └── fileController.js
│
├── routes/
│ ├── fileRoutes.js
│ └── authRoutes.js
│
├── models/
│ ├── File.js
│ └── User.js
│
├── middleware/
│ └── upload.js
│
├── utils/
│ └── encryptDecrypt.js
│
├── public/
│ ├── login.html
│ ├── home.html
│ ├── upload.html
│ ├── download.html
│ └── style.css
│
└── README.md```


---




## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
git clone https://github.com/your-username/blockchain-file-storage.git
cd blockchain-file-storage

2️⃣ Install dependencies
npm install

3️⃣ Configure environment variables

Create a .env file using .env.example:

PORT=5000
MONGO_URI=your_mongodb_atlas_uri
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_KEY=your_pinata_secret_key
SECRET_KEY=12345678901234567890123456789012

4️⃣ Run the application
node server.js


Open in browser:

http://localhost:5000/login.html

🔐 Security Note

- .env file is ignored using .gitignore

- Files are encrypted before uploading to IPFS

- Only encrypted content is stored on IPFS

🔐 How Security Works

- Files are encrypted using AES-256 before upload

- Encrypted files are stored on IPFS

- Only encrypted data is publicly accessible

- Decryption happens on the server before download

- File metadata (IPFS hash, IV, filename) is stored in MongoDB

📌 Usage Flow

1. User registers or logs in

2. User chooses upload or download

3. On upload:

    - File is encrypted

    - Uploaded to IPFS

    - IPFS hash is generated

4. On download:

    - User provides IPFS hash

    - File is fetched, decrypted, and downloaded

📌 Use Case

This project demonstrates how blockchain concepts like decentralized storage can be combined with modern web development and encryption to build secure applications.

👨‍💻 Author

Logeshwaran S
Full Stack Developer Intern