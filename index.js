const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');
const bodyParser = require('body-parser');

const storage = multer.memoryStorage();
const upload = multer({ storage });



const app = express();
const port = 3000;


// Set the region and endpoint for LocalStack
AWS.config.update({
    region: 'us-east-1',
    endpoint: 'http://localhost:4566',
    s3ForcePathStyle: true,
});

// Create an S3 service object
const s3 = new AWS.S3();

// Create a bucket
const listBuckets = async () => {
    try {
        const data = await s3.listBuckets().promise();
        console.log('Buckets:', data.Buckets);
    } catch (err) {
        console.error('Error listing buckets:', err.message);
    }
};

// Call listBuckets before creating a new bucket



// Function to create a bucket
const createBucket = async (bucketName) => {
    try {
        const params = {
            Bucket: bucketName,
        };
        const data = await s3.createBucket(params).promise();
        console.log(`Bucket created successfully at ${data.Location}`);
    } catch (err) {
        console.error('Error creating bucket:', err.message);
    }
};

app.get('/', (req, res) => {
    listBuckets();
    res.send('Hello najmu!sdfddd');
});


app.put('/create_bucket', (req, res) => {
    createBucket('my-local-bucket');
    res.send('Hello najmu!sdfddd');
});

const users = {};
app.post('/upload', upload.single('image'), async (req, res) => {
    const { userId } = req.body;
    const bucketName =  'user-bucket-9211'  //`user-bucket-${userId.toLowerCase()}`;
  
    try {
      // Check if the user already exists
      if (!users[userId]) {
        // Create a new bucket if the user is new
        // await createBucket(bucketName);
        users[userId] = bucketName; // Store the bucket for the user
        console.log(`Created new bucket: ${bucketName}`);
      } else {
        console.log(`Using existing bucket: ${users[userId]}`);
      }
      const uniqueFileName = `${Date.now()}-${req.file.originalname}`;
      // Upload the image
      const params = {
        Bucket: users[userId],
        Key: uniqueFileName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };
      
      console.log('paramsparams',params)
      await s3.upload(params).promise();
      res.status(200).send('Image uploaded successfully!');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error uploading image');
    }
  });



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});