Project Explaination

1. Dependencies and Middleware Configuration
    express: A web application framework for Node.js.
    aws-sdk: The official AWS SDK for JavaScript, allowing interaction with various AWS services.
    multer: Middleware for handling multipart/form-data, primarily used for file uploads.
    bodyParser: Middleware for parsing incoming request bodies. (Though it's not used explicitly in this snippet).
    multer.memoryStorage(): Configures multer to store files in memory as Buffer objects rather than saving them to disk.

2. AWS Configuration
    region: Specifies the AWS region.
    endpoint: Points to a localstack instance (which is used for mocking AWS services locally).
    s3ForcePathStyle: Forces the use of path-style URLs for S3 objects, compatible with localstack.
    Creates an S3 service object to interact with S3 buckets.


3. Functions for S3 Operations
    listBuckets():
    Lists all available S3 buckets and logs them.
    createBucket():
    Creates an S3 bucket with the specified name.

4. Express Server Setup and Routes
    When a GET request is made to the root endpoint (/), it lists all S3 buckets and sends a basic response message.
    When a PUT request is made to /create_bucket, it creates a bucket named 'my-local-bucket' and sends a response message.
    Defines a POST route /upload to handle image uploads.
    upload.single('image') expects a single file with the field name 'image'.
    Checks if a bucket for the given userId exists in the users object.
    If not, a new bucket name is assigned and logged.
    A unique file name is created using the current timestamp and original file name.
    Defines the parameters required for uploading the file to S3, including the bucket name, unique file name, file content, and content type.
    The image is uploaded to S3 using s3.upload(params).promise().
    Responds with success or error message based on the outcome.

5. Server Initialization
    Starts the Express server on port 3000 and logs the running message.


Summary
    This code sets up a basic server that can list S3 buckets, create a new bucket, and handle file uploads to S3 using localstack. It uses multer for handling file uploads, and the AWS SDK to interact with S3. The server has three main endpoints:

    GET /: Lists all S3 buckets.
    PUT /create_bucket: Creates a new S3 bucket.
    POST /upload: Uploads an image to a user-specific bucket.





