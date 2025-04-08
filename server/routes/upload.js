const crypto = require('crypto');
const express = require('express');
const router = express.Router();

router.get('/signature', (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = crypto.createHash('sha256')
    .update(`timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`)
    .digest('hex');

  res.json({ timestamp, signature });
});

module.exports = router;
