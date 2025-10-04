# AI Data Analyst - Backend API

FastAPI backend for AI-powered data analysis and insights using Pandas and PandasAI.

## Features

- **CSV File Upload**: Handle CSV file uploads with validation
- **Data Processing**: Process uploaded data using Pandas
- **AI Insights**: Generate insights using PandasAI with OpenAI
- **Chart Generation**: Create various chart types from data
- **RESTful API**: Clean API endpoints for frontend integration

## Tech Stack

- **Framework**: FastAPI
- **Data Processing**: Pandas
- **AI Analysis**: PandasAI
- **Validation**: Pydantic
- **Documentation**: Swagger UI / ReDoc

## Setup

1. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Set up environment variables**:
   ```bash
   cp env.example .env
   # Edit .env and add your OpenAI API key
   ```

3. **Run the development server**:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

4. **Access the API documentation**:
   - Swagger UI: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

## API Endpoints

### Upload
- `POST /api/upload/` - Upload CSV file and get dataset summary

### Analysis
- `POST /api/analysis/{dataset_id}` - Analyze dataset and get charts/insights
- `GET /api/analysis/charts/{dataset_id}` - Get available chart types
- `GET /api/analysis/insights/{dataset_id}` - Get available insight types

### Health
- `GET /` - API information
- `GET /health` - Health check

## Project Structure

```
BE/
├── app/
│   ├── api/
│   │   └── routes/          # API route handlers
│   ├── core/
│   │   └── config.py        # Configuration settings
│   ├── models/
│   │   └── schemas.py       # Pydantic models
│   ├── services/
│   │   └── data_processor.py # Data processing logic
│   └── main.py              # FastAPI application
├── tests/                   # Test files
├── requirements.txt         # Python dependencies
└── README.md               # This file
```

## Configuration

The application uses environment variables for configuration:

- `PANDASAI_API_KEY`: OpenAI API key for PandasAI
- `ALLOWED_ORIGINS`: CORS allowed origins
- `MAX_FILE_SIZE`: Maximum file upload size
- `UPLOAD_DIR`: Directory for temporary file storage

## Development

- The API runs on port 8000 by default
- CORS is configured for frontend integration
- File uploads are temporarily stored and cleaned up
- All responses follow a consistent JSON format

## Integration with Frontend

The backend is designed to work with the Next.js frontend:

1. Frontend uploads CSV to `/api/upload/`
2. Backend processes file and returns dataset summary
3. Frontend calls `/api/analysis/{dataset_id}` for charts and insights
4. Backend generates visualizations and AI insights
5. Frontend displays results to user
