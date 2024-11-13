import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import fs, { access } from 'fs';
import AWS from 'aws-sdk'


dotenv.config();

const app = express();
const port = 5000;

// configure aws 
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

const upload = multer({
  dest: 'uploads/'
})

const uploadFileToS3 = async (file) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `${Date.now()}_${file.originalname}`,
    Body: fs.createReadStream(file.path),
    ContentType: file.mimetype
  }

  return await s3.upload(params).promise()
}

app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file

  if(!file){
    return res.status(400).json({
      message: "file not found"
    })
  }

  try {
    
    const data = await uploadFileToS3(file)

    // deleting file after upload
    fs.unlinkSync(file.path)

    res.json({
      message: 'File uploaded successfully',
      fileUrl: data.Location
    })
  } catch (error) {
 
    if(fs.existsSync(file.path)){
      fs.unlinkSync(file.path)
    }

    return res.status(500).json({
      message: "Error uploading file"
    })
  }


})


app.get('/', (_req, res) => res.json({Status: 'Server is up and running on an EC2 instance'}))

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
