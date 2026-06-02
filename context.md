# Hirely Backend - Repository Context

## 1. Repository Overview

**Repository Name:** hirely-backend

**Purpose:** Backend API service for the Hirely platform - an AI-powered CV/Resume analysis and job matching system that helps job seekers optimize their resumes against job descriptions.

**Main Responsibilities:**
- User authentication and management
- CV file upload and parsing (PDF and DOCX formats)
- CV analysis against job descriptions using AI
- Resume scoring and skill matching
- User profile management
- Authentication token management (JWT)

**Current Development Status:** Early-stage active development (v1.0.0). Core features implemented; some AI integration is still using mock data.

---

## 2. Technology Stack

### Backend Framework
- **Express.js** (v5.2.1) - Web application framework
- **Node.js** (ES6 modules) - Runtime environment

### Database
- **MongoDB** - NoSQL database
- **Mongoose** (v9.6.2) - MongoDB object modeling

### Authentication & Security
- **JWT (jsonwebtoken)** (v9.0.3) - Token-based authentication
- **bcrypt** (v6.0.0) - Password hashing

### File Handling
- **Multer** (v2.1.1) - File upload middleware
- **pdf-parse** (v2.4.5) - PDF text extraction
- **mammoth** (v1.12.0) - DOCX text extraction

### Validation & Data Processing
- **Joi** (v18.2.1) - Request payload validation
- **nanoid** (v5.1.11) - Unique ID generation

### Infrastructure
- **CORS** (v2.8.6) - Cross-origin resource sharing
- **dotenv** (v17.4.2) - Environment variable management
- **Docker** - Container orchestration

### Development Tools
- **ESLint** (v10.2.1) - Code linting
- **Nodemon** - Development server auto-reload

---

## 3. Architecture Overview

The application follows a **layered service-oriented architecture** with clear separation of concerns:

```
Request
  ↓
Express Routes
  ↓
Middleware (Validation, File Upload, Error Handling)
  ↓
Controllers (Business Logic Orchestration)
  ↓
Repositories (Data Access Layer)
  ↓
MongoDB Models (Data Schema)
  ↓
Database (MongoDB)
  ↓
Response (JSON via apiResponse utility)
```

### Architecture Layers

**1. Routes Layer** (`services/[feature]/[feature]-routes.js`)
- Defines HTTP endpoints
- Attaches validation and file upload middlewares
- Routes requests to controllers

**2. Controllers Layer** (`services/[feature]/[feature]-controllers.js`)
- Handles request/response orchestration
- Calls repositories and external services
- Returns standardized API responses

**3. Repositories Layer** (`services/[feature]/[feature]-repositories.js`)
- Database operations (CRUD)
- Data transformation
- Database-agnostic from controller perspective

**4. Models Layer** (`models/[feature]-model.js`)
- Mongoose schema definitions
- Data validation rules at database level
- Collection structure definition

**5. Security Layer** (`security/token-manager.js`)
- JWT token generation and verification
- Token secret management

**6. Middleware Layer** (`middlewares/`)
- Request validation (Joi schemas)
- File upload handling (Multer)
- Error handling and standardization

**7. Utilities** (`utils/`)
- File extraction (PDF/DOCX parsing)
- Standard API response formatting

---

## 4. Folder Structure Summary

```
hirely-backend/
├── src/
│   ├── app.js                              # Express app configuration (currently commented out)
│   ├── server.js                           # Entry point, MongoDB connection, server startup
│   ├── server/
│   │   └── index.js                        # Active app instance with middleware setup
│   ├── configs/
│   │   └── mongodb.js                      # MongoDB connection configuration
│   ├── routes/
│   │   └── index.js                        # Main router aggregating all feature routes
│   ├── security/
│   │   └── token-manager.js                # JWT token operations
│   ├── models/                             # Mongoose schemas
│   │   ├── users-model.js
│   │   ├── authentications-model.js
│   │   └── analyses-model.js
│   ├── services/                           # Feature modules (MVC per feature)
│   │   ├── authentications/                # Login, refresh token, logout
│   │   ├── users/                          # User CRUD and queries
│   │   ├── analyses/                       # CV analysis and upload
│   │   └── ai/                             # AI integration service
│   ├── middlewares/                        # Express middlewares
│   │   ├── error-handler.js                # Global error handling
│   │   ├── validation.js                   # Request validation middleware
│   │   └── upload-file.js                  # File upload configuration
│   ├── exceptions/                         # Custom error classes
│   │   ├── client-error.js
│   │   ├── authentication-error.js
│   │   ├── authorization-error.js
│   │   ├── invariant-error.js
│   │   └── not-found-error.js
│   └── utils/
│       ├── apiResponse.js                  # Standard response formatter
│       └── extractUploadedFile.js          # PDF/DOCX text extraction
├── public/
│   └── cv/                                 # Uploaded CV files storage
├── Dockerfile                              # Container configuration
├── package.json                            # Dependencies and scripts
├── eslint.config.js                        # Linting rules
├── README.md                               # Project description (placeholder)
├── note.txt                                # Development notes
└── context.md                              # This file
```

---

## 5. Features

### 5.1 User Authentication (IMPLEMENTED)
**Purpose:** Enable secure user login, token refresh, and logout

**Main Files:**
- [src/services/authentications/authentications-routes.js](src/services/authentications/authentications-routes.js)
- [src/services/authentications/authentications-controllers.js](src/services/authentications/authentications-controllers.js)
- [src/services/authentications/authentications-repositories.js](src/services/authentications/authentications-repositories.js)
- [src/models/authentications-model.js](src/models/authentications-model.js)
- [src/security/token-manager.js](src/security/token-manager.js)

**Status:** Complete and functional
- Login with username/password
- JWT access token generation
- Refresh token management
- Logout with token invalidation

### 5.2 User Management (IMPLEMENTED)
**Purpose:** User registration, profile retrieval, and user search

**Main Files:**
- [src/services/users/users-routes.js](src/services/users/users-routes.js)
- [src/services/users/users-controllers.js](src/services/users/users-controllers.js)
- [src/services/users/users-repositories.js](src/services/users/users-repositories.js)
- [src/models/users-model.js](src/models/users-model.js)

**Status:** Complete
- User registration with password hashing
- User profile retrieval by ID
- User search by username (case-insensitive regex)
- Password verification and credential validation

### 5.3 CV Analysis (PARTIALLY IMPLEMENTED)
**Purpose:** Upload, parse, and analyze CVs against job descriptions

**Main Files:**
- [src/services/analyses/analyses-routes.js](src/services/analyses/analyses-routes.js)
- [src/services/analyses/analyses-controllers.js](src/services/analyses/analyses-controllers.js)
- [src/services/analyses/analyses-repositories.js](src/services/analyses/analyses-repositories.js)
- [src/models/analyses-model.js](src/models/analyses-model.js)
- [src/services/ai/ai-services.js](src/services/ai/ai-services.js)
- [src/utils/extractUploadedFile.js](src/utils/extractUploadedFile.js)
- [src/middlewares/upload-file.js](src/middlewares/upload-file.js)

**Status:** Functional with mock AI results
- CV file upload (PDF, DOCX)
- Automatic text extraction from CVs
- CV storage in MongoDB with file metadata
- **AI Analysis (MOCKED):** Currently returns hardcoded responses including:
  - Skill matching score (0-100)
  - Matched skills extraction
  - Missing skills identification
  - Improvement suggestions
  - Recommended skills

---

## 6. Data Flow

### User Registration & Authentication Flow
```
1. User submits registration (POST /hirely-api/v1/users)
   ↓
2. Validation middleware validates payload (Joi schema)
   ↓
3. Controller checks username uniqueness
   ↓
4. Repository creates user with hashed password (bcrypt)
   ↓
5. MongoDB stores user document with timestamp
   ↓
6. Response returns user ID
   ↓
7. User logs in (POST /hirely-api/v1/authentications)
   ↓
8. Controller verifies credentials (bcrypt password check)
   ↓
9. TokenManager generates access and refresh tokens
   ↓
10. Repository stores refresh token in DB
   ↓
11. Response returns both tokens for client storage
```

### CV Analysis Flow
```
1. User submits CV + job description (POST /hirely-api/v1/analyses)
   ↓
2. Multer middleware handles file upload to public/cv/
   ↓
3. Validation middleware validates request body
   ↓
4. Controller receives file and job description
   ↓
5. extractUploadedFile utility parses file (PDF/DOCX → text)
   ↓
6. aiForAnalysesCV processes extracted text + job description
   ↓
7. AI service returns analysis results (currently mocked)
   ↓
8. Repository stores analysis record in MongoDB
   ↓
9. File deleted from disk (cleanup)
   ↓
10. Response returns analysis results with MongoDB ID
```

### Token Refresh Flow
```
1. Frontend detects access token expiration
   ↓
2. Client sends refresh token (PUT /hirely-api/v1/authentications)
   ↓
3. Controller verifies refresh token exists in DB
   ↓
4. TokenManager decodes and validates refresh token
   ↓
5. New access token generated
   ↓
6. Response returns new access token
   ↓
7. Frontend updates authorization header
```

---

## 7. API Analysis

### Authentication Endpoints

#### POST /hirely-api/v1/authentications
**Purpose:** User login

**Request:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response (Success - 201):**
```json
{
  "code": 201,
  "status": "success",
  "message": "Authentication berhasil ditambahkan",
  "data": {
    "accessToken": "jwt_token_here",
    "refreshToken": "jwt_token_here"
  }
}
```

**Response (Failure - 401):**
```json
{
  "code": 401,
  "status": "fail",
  "message": "Kredensial yang Anda berikan salah",
  "data": null
}
```

**Authentication:** None (public endpoint)

---

#### PUT /hirely-api/v1/authentications
**Purpose:** Refresh access token

**Request:**
```json
{
  "refreshToken": "jwt_token_here"
}
```

**Response (Success - 200):**
```json
{
  "code": 200,
  "status": "success",
  "message": "Access Token berhasil diperbarui",
  "data": {
    "accessToken": "new_jwt_token_here"
  }
}
```

**Authentication:** None (public endpoint)

---

#### DELETE /hirely-api/v1/authentications
**Purpose:** Logout (invalidate refresh token)

**Request:**
```json
{
  "refreshToken": "jwt_token_here"
}
```

**Response (Success - 200):**
```json
{
  "code": 200,
  "status": "success",
  "message": "Refresh token berhasil dihapus",
  "data": null
}
```

**Authentication:** None (public endpoint)

---

### User Endpoints

#### POST /hirely-api/v1/users
**Purpose:** Register new user

**Request:**
```json
{
  "username": "string (3-50 chars)",
  "password": "string (min 6 chars)",
  "fullname": "string",
  "email": "string"
}
```

**Response (Success - 201):**
```json
{
  "code": 201,
  "status": "success",
  "message": "User berhasil ditambahkan",
  "data": {
    "id": "nanoid_generated_id"
  }
}
```

**Response (Failure - 400):**
```json
{
  "code": 400,
  "status": "fail",
  "message": "Gagal menambahkan user. Username sudah digunakan",
  "data": null
}
```

**Authentication:** None (public endpoint)

---

#### GET /hirely-api/v1/users/:id
**Purpose:** Get user profile by ID

**Request:** No body

**Response (Success - 200):**
```json
{
  "code": 200,
  "status": "success",
  "message": "User berhasil ditampilkan",
  "data": {
    "user": {
      "_id": "mongodb_id",
      "id": "nanoid_id",
      "username": "string",
      "fullname": "string",
      "email": "string",
      "password": "hashed_password",
      "createdAt": "iso_date",
      "updatedAt": "iso_date"
    }
  }
}
```

**Response (Failure - 404):**
```json
{
  "code": 404,
  "status": "fail",
  "message": "User tidak ditemukan",
  "data": null
}
```

**Authentication:** Optional (no protected route decorator currently)

---

#### GET /hirely-api/v1/users?username=search_term
**Purpose:** Search users by username

**Request:** Query parameter `username`

**Response (Success - 200):**
```json
{
  "code": 200,
  "status": "success",
  "message": "User berhasil ditampilkan",
  "data": {
    "users": [
      {
        "id": "nanoid_id",
        "username": "string",
        "fullname": "string"
      }
    ]
  }
}
```

**Response (Failure - 404):**
```json
{
  "code": 404,
  "status": "fail",
  "message": "User tidak ditemukan",
  "data": null
}
```

**Authentication:** Optional (no protected route decorator currently)

---

### Analyses Endpoints

#### POST /hirely-api/v1/analyses
**Purpose:** Upload and analyze CV against job description

**Request:** Multipart form data
- **Field `cv`:** File (PDF or DOCX, max 2MB)
- **Field `jobDescription`:** String (required, validated by Joi)

**Optional fields (not currently validated in schema):**
- `fullname`
- `position`
- `education`
- `experience`
- `skill`

**Response (Success - 201):**
```json
{
  "code": 201,
  "status": "success",
  "message": "Berhasil menganalisis CV",
  "data": {
    "analyses": {
      "_id": "mongodb_id",
      "id": "nanoid_id",
      "filename": "cv_filename.pdf",
      "filepath": "public/cv/timestamp-filename.pdf",
      "mimetype": "application/pdf",
      "jobDescription": "string",
      "extractedText": "extracted_cv_content",
      "fullname": "string",
      "position": "string",
      "education": "string",
      "experience": "string",
      "skill": "string",
      "score": 78,
      "summary": "CV cukup sesuai untuk posisi...",
      "matchedSkills": ["Node.js", "Express.js", "MongoDB"],
      "missingSkills": ["Docker", "CI/CD", "Unit Testing"],
      "improvements": ["Tambahkan project deployment", "..."],
      "recommendedSkills": ["Docker", "GitHub Actions", "Jest"],
      "status": "completed",
      "createdAt": "iso_date",
      "updatedAt": "iso_date"
    }
  }
}
```

**Response (Failure - 400):**
```json
{
  "code": 400,
  "status": "fail",
  "message": "Anda harus unggah CV.",
  "data": null
}
```

**File Requirements:**
- Format: PDF or DOCX only
- Max size: 2MB
- MIME types: `application/pdf`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`

**Authentication:** None (public endpoint)

---

### Health Check Endpoint

#### GET /hirely-api/v1/ping
**Purpose:** Server health check

**Response (Success - 200):**
```json
{
  "status": "success",
  "message": "Server is OK"
}
```

**Authentication:** None (public endpoint)

---

## 8. Authentication Analysis

### Authentication Method
**JWT (JSON Web Tokens)** - Stateless token-based authentication

### Login Process
1. User submits `username` and `password` to `POST /hirely-api/v1/authentications`
2. Server verifies credentials against MongoDB user collection using bcrypt
3. On success, server generates two tokens:
   - **Access Token:** For API requests (payload: user ID)
   - **Refresh Token:** For obtaining new access tokens (stored in DB)

### Token Management
- **Access Token Key:** Stored in environment variable `ACCESS_TOKEN_KEY`
- **Refresh Token Key:** Stored in environment variable `REFRESH_TOKEN_KEY`
- **Refresh Token Storage:** MongoDB Authentication collection
- **Token Verification:** JWT verification with appropriate secret key

### Token Refresh Flow
1. Frontend detects access token expiration
2. Client sends `PUT /hirely-api/v1/authentications` with refresh token
3. Server verifies refresh token exists in DB
4. Server validates token signature
5. New access token is generated and returned

### Logout
1. User submits `DELETE /hirely-api/v1/authentications` with refresh token
2. Server deletes refresh token from MongoDB
3. Refresh token becomes invalid

### Protected Routes
**Current Status:** No protected routes implemented yet
- All endpoints are currently public
- API clients must implement frontend token management
- Server does not validate access tokens on protected endpoints

### Security Implementation
- **Password Hashing:** bcrypt with salt rounds = 10
- **Token Signing:** JWT with separate keys for access and refresh
- **CORS:** Enabled with origin: '*' (all origins allowed - potential security concern)

---

## 9. Database Analysis

### MongoDB Collections

#### 1. Users Collection
**Model:** [src/models/users-model.js](src/models/users-model.js)

**Schema:**
```javascript
{
  id: String (unique, custom nanoid),
  fullname: String (required),
  username: String (unique, required),
  email: String (unique, required),
  password: String (required, bcrypt hashed),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

**Indexes:** 
- `id` (unique)
- `username` (unique)
- `email` (unique)

**Purpose:** Store user account information for authentication and profile management

---

#### 2. Authentications Collection
**Model:** [src/models/authentications-model.js](src/models/authentications-model.js)

**Schema:**
```javascript
{
  token: String (required, refresh token value)
}
```

**Purpose:** Maintain valid refresh tokens for token rotation and logout functionality

---

#### 3. Analyses Collection
**Model:** [src/models/analyses-model.js](src/models/analyses-model.js)

**Schema:**
```javascript
{
  id: String (unique, custom nanoid),
  filename: String (required, original filename),
  filepath: String (required, disk path),
  mimetype: String (required, file MIME type),
  jobDescription: String (required),
  extractedText: String (required, parsed CV text),
  fullname: String (required),
  position: String (required),
  education: String (required),
  experience: String (required),
  skill: String (required),
  score: Number (0-100, AI analysis result),
  summary: String (AI generated summary),
  matchedSkills: [String] (skills found in CV),
  missingSkills: [String] (skills required but missing),
  improvements: [String] (improvement suggestions),
  recommendedSkills: [String] (recommended skills to learn),
  status: String (default: 'completed'),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

**Indexes:**
- `id` (unique)

**Purpose:** Store CV analysis results and job matching data

---

### Database Relationships
```
User (1) ──→ (Many) Analyses
           └── submits CV for analysis

Authentications ←── User
           └── stores refresh tokens for valid sessions
```

### Data Storage Notes
- **Password Storage:** Hashed using bcrypt (10 rounds), plaintext never stored
- **File Paths:** Relative paths stored in DB, actual files in `public/cv/` directory
- **Timestamps:** Mongoose auto-manages `createdAt` and `updatedAt` fields
- **ID Generation:** Custom `nanoid(16)` for all primary records (not MongoDB _id)

---

## 10. Environment Variables

### Required Environment Variables

| Variable | Purpose | Example | Environment |
|----------|---------|---------|-------------|
| `MONGODB_URL` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` | All |
| `PORT` | Server listening port | `3000` (dev), `7860` (prod) | All |
| `HOST` | Server binding address | `localhost` (dev), `0.0.0.0` (prod) | All |
| `ACCESS_TOKEN_KEY` | Secret key for access token signing | Long random string | All |
| `REFRESH_TOKEN_KEY` | Secret key for refresh token signing | Long random string | All |

### Environment Configuration

**Development (.env.local)**
```
MONGODB_URL=mongodb://localhost:27017/hirely-dev
PORT=3000
HOST=localhost
ACCESS_TOKEN_KEY=dev-access-secret-key
REFRESH_TOKEN_KEY=dev-refresh-secret-key
```

**Production (Docker/Hugging Face Spaces)**
```
MONGODB_URL=mongodb+srv://[user]:[password]@[cluster].mongodb.net/hirely
PORT=7860
HOST=0.0.0.0
ACCESS_TOKEN_KEY=[production-secret-key]
REFRESH_TOKEN_KEY=[production-secret-key]
```

### Docker Environment
- Node.js runtime: node:22-alpine
- Environment: `NODE_ENV=production`
- Auto-port: Hugging Face Spaces uses port 7860

---

## 11. External Integrations

### AI Service
**File:** [src/services/ai/ai-services.js](src/services/ai/ai-services.js)

**Current Status:** MOCKED - Returns hardcoded responses

**Function:** `aiForAnalysesCV({ extractedFile, jobDescription })`
- **Input:**
  - `extractedFile`: Parsed text from CV (PDF or DOCX)
  - `jobDescription`: Job posting text

- **Output:**
  ```javascript
  {
    score: Number,                    // 0-100
    summary: String,                  // Analysis summary
    matchedSkills: [String],          // Skills found in CV
    missingSkills: [String],          // Skills missing
    improvements: [String],           // Improvement suggestions
    recommendedSkills: [String]       // Recommended to learn
  }
  ```

- **Future Implementation:** Ready for integration with:
  - OpenAI GPT API
  - Google Vertex AI
  - Hugging Face Models
  - Custom ML model endpoints

### File Format Libraries
- **pdf-parse** (v2.4.5): PDF text extraction using PDFParser class
- **mammoth** (v1.12.0): DOCX text extraction (extracts raw text without formatting)

### Third-Party Dependencies
- **express** (v5.2.1): Web framework
- **mongoose** (v9.6.2): MongoDB ODM
- **jsonwebtoken** (v9.0.3): JWT operations
- **bcrypt** (v6.0.0): Password hashing
- **multer** (v2.1.1): File upload handling
- **joi** (v18.2.1): Request validation
- **cors** (v2.8.6): Cross-origin handling
- **dotenv** (v17.4.2): Environment variables
- **nanoid** (v5.1.11): Unique ID generation

---

## 12. Current User Flow

### Scenario 1: New User Registration & First Analysis

```
1. User visits Hirely frontend
   ↓
2. User clicks "Register" and fills form:
   - Username: "john_dev"
   - Password: "SecurePass123"
   - Full Name: "John Developer"
   - Email: "john@example.com"
   ↓
3. Frontend validates input and sends:
   POST /hirely-api/v1/users
   {
     "username": "john_dev",
     "password": "SecurePass123",
     "fullname": "John Developer",
     "email": "john@example.com"
   }
   ↓
4. Backend validates schema, checks username uniqueness
   ↓
5. Backend hashes password, creates user with nanoid
   ↓
6. User ID returned: "a1b2c3d4e5f6g7h8"
   ↓
7. User clicks "Login" and submits credentials
   ↓
8. Frontend sends:
   POST /hirely-api/v1/authentications
   {
     "username": "john_dev",
     "password": "SecurePass123"
   }
   ↓
9. Backend verifies password, generates tokens
   ↓
10. Frontend receives accessToken and refreshToken
    ↓
11. Frontend stores tokens (localStorage/sessionStorage)
    ↓
12. User navigates to "Analyze CV" page
    ↓
13. User uploads resume (CV.pdf) and enters job description:
    "Seeking Node.js backend developer with Express..."
    ↓
14. Frontend sends multipart form:
    POST /hirely-api/v1/analyses
    - Field: cv = [file]
    - Field: jobDescription = "Seeking Node.js..."
    ↓
15. Backend validates, receives file upload
    ↓
16. Backend extracts text from PDF: "John Developer, 3 years experience..."
    ↓
17. Backend calls AI service with CV text + job description
    ↓
18. AI returns (currently mocked):
    {
      "score": 78,
      "summary": "CV cukup sesuai untuk posisi Backend Developer...",
      "matchedSkills": ["Node.js", "Express.js", "MongoDB"],
      "missingSkills": ["Docker", "CI/CD"],
      "improvements": ["Add deployment experience"],
      "recommendedSkills": ["Docker", "GitHub Actions"]
    }
    ↓
19. Backend stores analysis record in MongoDB
    ↓
20. Backend deletes uploaded CV file from disk
    ↓
21. Frontend receives analysis results and displays:
    - Score: 78/100
    - Matched skills visualization
    - Improvement recommendations
    ↓
22. User reviews results and can:
    - Download analysis report
    - Refine CV based on suggestions
    - Reanalyze against different job descriptions
```

### Scenario 2: Returning User

```
1. User visits frontend
   ↓
2. User has stored accessToken from previous session
   ↓
3. User submits CV analysis request
   ↓
4. Frontend includes authorization: Bearer [accessToken]
   ↓
5. Backend processes request (no auth validation currently implemented)
   ↓
6. Results returned
   ↓
Note: If accessToken expires, frontend should:
   - Call PUT /hirely-api/v1/authentications with refreshToken
   - Get new accessToken
   - Retry original request
```

---

## 13. Missing Features

### Not Yet Implemented (Evidence from Code)

1. **Protected Route Middleware**
   - No authentication middleware decorating protected endpoints
   - All routes are public
   - Frontend must handle token validation
   - **Evidence:** No auth middleware in routes; controllers don't verify access tokens

2. **Authorization Layer**
   - [src/exceptions/authorization-error.js](src/exceptions/authorization-error.js) exists but is never thrown
   - No role-based access control
   - No user ownership verification on analyses
   - **Evidence:** Authorization-error.js exists but unused; analyses endpoint doesn't validate user ownership

3. **Real AI Integration**
   - AI service returns hardcoded mock data
   - **Evidence:** [src/services/ai/ai-services.js](src/services/ai/ai-services.js) line comments indicate: "sementara mock dulu" (for now mocked)

4. **Analysis Retrieval Endpoints**
   - No GET endpoint to retrieve previous analyses
   - No analysis history per user
   - **Evidence:** analyses-repositories.js only has uploadCV method; no get methods

5. **CV File Retrieval**
   - Uploaded CV files are deleted immediately after analysis
   - No way to download original CV
   - **Evidence:** analyses-controllers.js calls deleteUploadedFile in finally block

6. **User Profile Updates**
   - No PUT endpoint to update user info
   - No password change functionality
   - **Evidence:** users-routes.js only has POST and GET; no PUT

7. **Input Validation for Optional Fields**
   - Optional fields in CV analysis (fullname, position, education, experience, skill) are not validated
   - **Evidence:** analysisPayloadSchema only validates jobDescription; other fields come from req.body but aren't validated

8. **API Rate Limiting**
   - No rate limiting middleware
   - No brute force protection on login
   - **Evidence:** No rate-limiting dependency in package.json

9. **Logging System**
   - Only console.log used
   - No structured logging
   - No request/response logging
   - **Evidence:** error-handler.js uses console.error; ai-services.js uses console.log

10. **Test Suite**
    - No test files
    - No test scripts
    - **Evidence:** package.json test script shows "no test specified"

11. **Input Sanitization**
    - No protection against XSS or injection
    - User input stored directly in database
    - **Evidence:** No sanitization library in dependencies

12. **Pagination**
    - User search returns all results
    - No pagination for large datasets
    - **Evidence:** getUsersByUsername returns all matches without limit

13. **Soft Delete**
    - No soft delete functionality
    - No audit trail
    - **Evidence:** No isDeleted or deletedAt fields in models

14. **Email Verification**
    - Email field stored but not validated
    - No email confirmation workflow
    - **Evidence:** Email only checked in userPayloadSchema as string.required()

15. **API Documentation**
    - No Swagger/OpenAPI documentation
    - README is placeholder
    - **Evidence:** README.md is only 3 lines

---

## 14. Known Technical Debt

### Security Concerns

1. **CORS Configuration (HIGH PRIORITY)**
   - **Issue:** `cors({ origin: '*' })` allows requests from any domain
   - **Location:** [src/server/index.js](src/server/index.js#L7)
   - **Impact:** CSRF vulnerability, token theft risk
   - **Fix:** Whitelist specific frontend domain(s)

2. **No HTTPS/TLS Enforcement**
   - **Issue:** JWT tokens sent over HTTP vulnerable to interception
   - **Location:** Docker runs on port 7860 without TLS setup
   - **Fix:** Implement HTTPS in Docker and proxy configuration

3. **Token Secrets in Environment**
   - **Issue:** Access/Refresh token secrets only in environment variables
   - **Impact:** Token compromise if environment is exposed
   - **Fix:** Implement key rotation strategy

4. **No Token Expiration on Access Token**
   - **Issue:** JWT.sign() called without expiresIn option
   - **Location:** [src/security/token-manager.js](src/security/token-manager.js#L5)
   - **Impact:** Access tokens valid indefinitely
   - **Fix:** Add `{ expiresIn: '1h' }` to JWT.sign calls

5. **No Input Sanitization**
   - **Issue:** User input not sanitized before database storage
   - **Example:** jobDescription stored directly
   - **Impact:** Potential NoSQL injection (low risk with Mongoose, but not best practice)

6. **Hardcoded File Size Limit**
   - **Issue:** 2MB limit hardcoded in middleware
   - **Location:** [src/middlewares/upload-file.js](src/middlewares/upload-file.js#L24)
   - **Better:** Use environment variable

7. **No API Authentication**
   - **Issue:** No access token validation on protected endpoints
   - **Impact:** Anyone can call APIs if they know the endpoint
   - **Fix:** Implement authentication middleware

8. **Uploaded Files Public**
   - **Issue:** Uploaded CVs stored in public/ directory with predictable paths
   - **Impact:** Privacy concern; anyone can access others' CVs
   - **Fix:** Implement access control or store outside web root

### Code Quality Issues

1. **Mixed Commented Code**
   - **Location:** [src/app.js](src/app.js) - Entire file is commented
   - **Issue:** Confusing whether this is backup or test code
   - **Fix:** Remove or document reason for existence

2. **Unused Exception Classes**
   - **Issue:** [src/exceptions/authorization-error.js](src/exceptions/authorization-error.js) defined but never thrown
   - **Impact:** Dead code
   - **Fix:** Either use or remove

3. **Unused Import in AI Service**
   - **Location:** [src/services/ai/ai-services.js](src/services/ai/ai-services.js#L1)
   - **Issue:** `/* eslint-disable no-unused-vars */` disables linting
   - **Fix:** Remove if not needed or use the variable

4. **Inconsistent Response Structure**
   - **Issue:** Some responses have data: null, others have data: { analyses }
   - **Location:** analyses-repositories.js returns { analyses }
   - **Better:** Standardize response wrapper

5. **No Error Context in Logs**
   - **Issue:** Error logging with console.error doesn't include request context
   - **Location:** error-handler.js#L19
   - **Fix:** Add request ID middleware for tracing

6. **Magic Numbers**
   - **Issue:** Bcrypt rounds (10), file size (2MB), nanoid length (16) hardcoded
   - **Fix:** Move to constants file or environment variables

7. **No Request Validation on Optional Fields**
   - **Issue:** fullname, position, education, experience, skill not validated in analyses endpoint
   - **Location:** analyses-validators.js
   - **Impact:** Inconsistent data quality

8. **File Deletion Error Silent**
   - **Location:** [src/utils/extractUploadedFile.js](src/utils/extractUploadedFile.js#L36)
   - **Issue:** Error deleting file is logged but not propagated
   - **Impact:** Orphaned files might accumulate

### Potential Bugs

1. **PDF Parsing Library Version Issue**
   - **Evidence:** [src/utils/extractUploadedFile.js](src/utils/extractUploadedFile.js#L11-L14) shows commented code suggesting API change
   - **Issue:** Code changed from PDFParse direct call to new PDFParse() constructor
   - **Impact:** May break if library updates

2. **User Query Performance**
   - **Issue:** getUsersByUsername uses regex without index on username field
   - **Location:** [src/services/users/users-repositories.js](src/services/users/users-repositories.js#L44)
   - **Impact:** Slow on large datasets

3. **No Refresh Token Expiration**
   - **Issue:** Refresh tokens stored without expiration date
   - **Impact:** Tokens valid indefinitely even if compromised
   - **Fix:** Add expiredAt field and cleanup job

### Infrastructure/DevOps Issues

1. **Node Version Lock**
   - **Location:** Dockerfile uses node:22-alpine (specific version)
   - **Better:** Use specific semver like node:22.0.0-alpine

2. **No Health Check in Docker**
   - **Issue:** Docker container has no health check defined
   - **Impact:** Orchestrators can't auto-restart failed services

3. **No Logging to stdout**
   - **Issue:** Only console output, no log aggregation
   - **Fix:** Implement structured logging (Winston, Pino)

4. **Public Directory Committed**
   - **Issue:** public/cv/ directory might accumulate old files
   - **Better:** Add cleanup cron job or cloud storage

---

## 15. Integration Context

### What This Repository Expects from Frontend (hirely-frontend)

1. **User Registration Flow**
   - Frontend sends POST /hirely-api/v1/users with username, password, fullname, email
   - Frontend expects user ID in response
   - Frontend navigates to login page

2. **Authentication Management**
   - Frontend stores accessToken and refreshToken after login
   - Frontend includes accessToken in Authorization header (not currently validated)
   - Frontend implements token refresh logic using PUT /hirely-api/v1/authentications
   - Frontend handles logout by calling DELETE endpoint

3. **CV Analysis Request**
   - Frontend gathers file input + job description text
   - Frontend sends multipart form with fields: cv (file), jobDescription (string)
   - Frontend expects analysis results with score, matched skills, recommendations
   - Frontend displays analysis results to user

4. **User Search**
   - Frontend may call GET /hirely-api/v1/users?username=search_term
   - Backend returns array of users with id, username, fullname
   - Frontend uses this for user discovery

5. **Profile Retrieval**
   - Frontend may call GET /hirely-api/v1/users/:id
   - Backend returns full user object including email
   - Frontend displays user profile

### Known API Contracts

**Authentication Contract:**
- Credentials: username + password (no multi-factor auth)
- Tokens: JWT format
- Token refresh: Separate endpoint, returns new access token
- Logout: Requires refresh token to revoke

**CV Analysis Contract:**
- File types: PDF or DOCX (MIME type validated server-side)
- File size: Max 2MB
- Output: JSON with score (0-100), arrays of matched/missing skills, text suggestions
- Text extraction: Server handles PDF/DOCX parsing
- AI logic: Server-side (currently mocked)

**Error Response Contract:**
```json
{
  "code": 400,
  "status": "fail",
  "message": "Human-readable error message",
  "data": null
}
```

### Shared Business Rules

1. **Username Uniqueness:** Enforced at registration, case-sensitive storage
2. **Email Uniqueness:** Enforced but not validated or verified
3. **Password Security:** Hashed with bcrypt, minimum 6 characters (validated frontend)
4. **CV Analysis Results:** Returned immediately (no async queue)
5. **File Cleanup:** CVs deleted immediately after analysis (not stored long-term)
6. **User Discovery:** Can search other users by username (no privacy restrictions)

### Unknown Contracts

- **Frontend Base URL:** Unknown from backend code
- **Frontend Error Handling:** How frontend interprets error codes
- **Frontend Token Storage:** localStorage vs sessionStorage vs cookies
- **Frontend Authorization Header Format:** Assumed "Bearer [token]" but not validated
- **Frontend CORS Origin:** CORS configured as '*' so frontend origin unknown

---

## 16. AI Assistant Context

### What This Repository Does
Hirely is the **backend API for an AI-powered CV analysis and job matching platform**. It enables users to:
1. Register and authenticate
2. Upload resumes (PDF/DOCX format)
3. Analyze resumes against job descriptions
4. Receive AI-driven insights: skill matching, gaps, and improvement recommendations

### Current Implementation Status

**Fully Implemented ✅**
- User authentication (JWT + refresh tokens)
- User registration with password hashing
- User profile management
- CV file upload with validation
- Text extraction from PDF and DOCX files
- CV analysis results storage in MongoDB
- Error handling with custom exception hierarchy
- Request validation with Joi schemas
- File upload handling with Multer

**Partially Implemented ⚠️**
- AI analysis service (currently returns mock data)
- API documentation (no Swagger/OpenAPI)

**Not Implemented ❌**
- Protected route middleware (no token validation)
- Authorization layer (no role-based access)
- Analysis retrieval endpoints
- User profile updates
- Test suite
- Rate limiting
- Email verification
- Logging system
- API documentation

### Critical Files to Understand First

1. **[src/server.js](src/server.js)** (10 lines)
   - Entry point, MongoDB connection, server startup
   
2. **[src/server/index.js](src/server/index.js)** (15 lines)
   - Express app setup, middleware configuration
   
3. **[src/routes/index.js](src/routes/index.js)** (20 lines)
   - Main router, aggregates feature routes
   
4. **[src/services/analyses/analyses-controllers.js](src/services/analyses/analyses-controllers.js)** (55 lines)
   - CV analysis endpoint logic, file handling, AI integration point
   
5. **[src/services/ai/ai-services.js](src/services/ai/ai-services.js)** (25 lines)
   - AI service stub, mocked responses, ready for real implementation
   
6. **[src/services/authentications/authentications-controllers.js](src/services/authentications/authentications-controllers.js)** (50 lines)
   - JWT token generation and management logic

### Critical Workflows

**Workflow 1: User Registration & Login**
```
POST /users → UserRepositories.createUser() → Hash password → Store MongoDB
POST /authentications → UserRepositories.verifyUserCredential() → Generate JWT → AuthRepositories.addRefreshToken()
```

**Workflow 2: CV Analysis**
```
POST /analyses (multipart) → Validate schema → Extract file text → aiForAnalysesCV() → AnalysesRepositories.uploadCV() → Delete file
```

**Workflow 3: Token Refresh**
```
PUT /authentications (with refreshToken) → AuthRepositories.verifyRefreshToken() → Generate new accessToken
```

### Next Development Priorities

**Priority 1 - Security (CRITICAL)**
- [ ] Implement access token validation middleware
- [ ] Add expiresIn to JWT tokens (access: 1h, refresh: 7d)
- [ ] Fix CORS to whitelist specific frontend domain
- [ ] Implement rate limiting

**Priority 2 - Core Features (HIGH)**
- [ ] Implement real AI service integration (replace mock)
- [ ] Add GET /analyses/:id endpoint to retrieve analysis history
- [ ] Add GET /analyses endpoint to list user's analyses
- [ ] Implement user ownership validation for analyses

**Priority 3 - User Features (MEDIUM)**
- [ ] Add PUT /users/:id endpoint for profile updates
- [ ] Add password change functionality
- [ ] Add email verification workflow
- [ ] Implement analysis history with pagination

**Priority 4 - Code Quality (MEDIUM)**
- [ ] Add comprehensive test suite (Jest)
- [ ] Implement structured logging (Winston/Pino)
- [ ] Add Swagger/OpenAPI documentation
- [ ] Remove unused code (commented app.js, unused exceptions)

**Priority 5 - Infrastructure (LOW)**
- [ ] Add Docker health checks
- [ ] Implement background job for file cleanup
- [ ] Add request ID middleware for tracing
- [ ] Set up CI/CD pipeline

### Integration Blockers

**🔴 BLOCKING ISSUES**

1. **AI Service is Mocked**
   - **Impact:** Analysis results are hardcoded
   - **Blocks:** Product launch, user testing
   - **Solution:** Integrate with real AI API (OpenAI, Google Vertex, Hugging Face)
   - **Effort:** 4-8 hours depending on chosen provider

2. **No Protected Routes**
   - **Impact:** Anyone can call any endpoint
   - **Blocks:** Production deployment, user privacy
   - **Solution:** Implement auth middleware, validate access tokens
   - **Effort:** 2-4 hours

3. **No Analysis History Endpoints**
   - **Impact:** Users can't view previous analyses
   - **Blocks:** MVP functionality
   - **Solution:** Add GET /analyses and GET /analyses/:id endpoints
   - **Effort:** 2-3 hours

**⚠️ IMPORTANT ISSUES**

4. **CORS Allows All Origins**
   - **Impact:** CSRF/token theft vulnerability
   - **Blocks:** Production deployment
   - **Solution:** Configure frontend domain whitelist
   - **Effort:** 30 minutes

5. **No Token Expiration**
   - **Impact:** Tokens valid forever if leaked
   - **Blocks:** Security best practices
   - **Solution:** Add expiresIn to JWT generation
   - **Effort:** 1 hour

6. **Uploaded Files Are Public**
   - **Impact:** User privacy concern
   - **Blocks:** User trust
   - **Solution:** Move to private cloud storage or implement access control
   - **Effort:** 4-6 hours

### Recommended First Task

**Implement Real AI Integration** (assuming OpenAI API access):
1. Install openai package
2. Add OPENAI_API_KEY to environment
3. Replace mock aiForAnalysesCV with real API call
4. Test with sample CVs
5. Adjust output parsing to match Hirely response format

This unblocks product testing and demonstrates core value proposition.

---

## Quick Reference

### Useful Commands
```bash
# Development
npm run dev          # Start with nodemon (auto-reload)
npm start            # Start production server
npm run lint         # Run ESLint

# Docker
docker build -t hirely-backend .
docker run -p 3000:7860 hirely-backend
```

### Key Endpoints
- `POST /hirely-api/v1/users` - Register
- `POST /hirely-api/v1/authentications` - Login
- `GET /hirely-api/v1/users/:id` - Get user
- `POST /hirely-api/v1/analyses` - Analyze CV
- `GET /hirely-api/v1/ping` - Health check

### Database Collections
- Users: ~100 fields per user (id, username, email, password hash, timestamps)
- Authentications: ~20 bytes per refresh token
- Analyses: ~2KB per analysis (includes extracted CV text)

---

**Generated:** 2026-06-02  
**Repository:** hirely-backend (v1.0.0)  
**Last Updated:** Current codebase analysis
