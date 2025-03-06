# WhatsApp Backend Service

A backend service that handles media uploads, auto-messaging, and guest user management for a WhatsApp-like application.

## Features

- **Media Management**: Upload and store files using Google Cloud Storage
- **Auto Messaging**: AI-powered automated responses using Gemini API
- **Docker Support**: Containerized deployment
- **CI/CD Pipeline**: Automated deployment to Google Cloud Platform

## Tech Stack

- Node.js & Express
- Google Cloud Storage
- Firebase Admin SDK
- Google Gemini API
- Docker
- GitHub Actions

## Project Structure

```
whatsapp-backend/
├── config/
│   └── storage.config.js
├── controllers/
│   ├── media.controller.js
│   ├── auto-message.controller.js
├── services/
│   ├── storage.service.js
├── sdks/
│   ├── gcp.sdk.js
│   ├── firestore.sdk.js
├── .env
├── .gitignore
├── Dockerfile
├── package.json
└── server.js
```

## Prerequisites

- Node.js (v20 or later)
- Docker
- Google Cloud Platform account
- Firebase account

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
GCP_PROJECT_ID=your_project_id
GCP_BUCKET_NAME=your_bucket_name
GCS_SA_KEY_STRING=your_gcp_service_account_key
FIREBASE_SA_KEY_STRING=your_firebase_service_account_key
GEMINI_API_KEY=your_gemini_api_key
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/whatsapp-backend.git
cd whatsapp-backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

## Docker Deployment

1. Build the Docker image:
```bash
docker build -t whatsapp-backend .
```

2. Run the container:
```bash
docker run -p 3000:3000 --env-file .env -d whatsapp-backend
```

## API Endpoints

### Media Upload
- `POST /media/upload`: Upload a file to Google Cloud Storage

### Auto Message
- `POST /auto-message/generate`: Generate AI response for a chat room

## CI/CD Pipeline

The project uses GitHub Actions for CI/CD. On push to the main branch:
1. Builds Docker image
2. Pushes to Docker Hub
3. Deploys to Google Cloud Platform VM

## Security

- Environment variable protection
- Google Cloud IAM integration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
