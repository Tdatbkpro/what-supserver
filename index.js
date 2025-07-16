const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const crypto = require('crypto');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post('/get-signature', (req, res) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const uploadPreset = "What'sUpS"; // 👈 Preset bạn đã tạo

  const paramsToSign = `timestamp=${timestamp}&upload_preset=${uploadPreset}`; // 👈 Cần đúng thứ tự

  const signature = crypto
    .createHash('sha1')
    .update(paramsToSign + process.env.CLOUDINARY_API_SECRET)
    .digest('hex');

  res.json({
    signature,
    timestamp,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    uploadPreset // 👈 Gửi thêm cho client Flutter
  });
});

app.listen(3000, () => {
  console.log('🚀 Cloudinary Signature Server running on http://localhost:3000');
});
