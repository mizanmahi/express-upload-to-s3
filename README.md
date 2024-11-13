# S3 File Uploader

This project is a Node.js Express application that allows users to upload files to an Amazon S3 bucket. Upon successful upload, the application returns the URL of the uploaded file. The project uses `multer` for handling file uploads and the AWS SDK to interact with Amazon S3.

## Features

-  **File Upload**: Users can upload files through a POST request.
-  **AWS S3 Integration**: The uploaded files are stored in an S3 bucket.
-  **Security**: Utilizes environment variables to securely manage AWS credentials.

## Prerequisites

Before you begin, ensure you have met the following requirements:

-  Node.js and npm/yarn installed on your machine.
-  An AWS account with S3 access.
-  An S3 bucket created in your AWS account.
-  AWS credentials set up on your machine.

## Getting Started

Follow these instructions to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/mizanmahi/upload-file-s3.git
cd upload-file-s3
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following variables:

```plaintext
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=your-region
S3_BUCKET_NAME=your-bucket-name
```

### 4. Run the Application

Start the application with the following command:

Using npm:

```bash
npm start
```

Or using yarn:

```bash
yarn start
```

The server will start on `http://localhost:5000`.

### 5. Upload a File

You can upload a file by making a POST request to `/upload` with the file attached in a form-data field named `file`.

Example using `curl`:

```bash
curl -X POST -F 'file=@/path/to/your/file.ext' http://localhost:5000/upload
```

Upon successful upload, the server will return a JSON response with the file's URL.

## Project Structure

-  `main.js`: The main application file containing the Express server and file upload logic.
-  `.env`: Environment variables file (not included in version control).
-  `uploads/`: Temporary directory where files are stored before being uploaded to S3 (created automatically by `multer`).

## Dependencies

-  **express**: Web framework for Node.js.
-  **multer**: Middleware for handling `multipart/form-data`, used for file uploads.
-  **aws-sdk**: AWS SDK for JavaScript, used for interacting with AWS services.
-  **dotenv**: Loads environment variables from a `.env` file.

## AWS S3 Configuration

Ensure your S3 bucket has the appropriate permissions and CORS configuration if required. See the [AWS S3 Documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) for more details.

## Contributing

If you want to contribute to this project, please fork the repository and make a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
