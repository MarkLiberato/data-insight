# AI Data Analyst - Full Stack Application

A complete full-stack application for AI-powered data analysis and insights, featuring a Next.js frontend and FastAPI backend with Pandas and PandasAI integration.

## Project Structure

```
data-insight/
├── FE/                     # Frontend (Next.js 15)
│   ├── src/
│   │   ├── app/           # Next.js App Router
│   │   ├── components/    # React components
│   │   ├── lib/          # Utilities and mock data
│   │   └── types/        # TypeScript definitions
│   ├── package.json
│   └── README.md
├── BE/                     # Backend (FastAPI)
│   ├── app/
│   │   ├── api/          # API routes
│   │   ├── core/         # Configuration
│   │   ├── models/       # Pydantic schemas
│   │   └── services/     # Business logic
│   ├── requirements.txt
│   └── README.md
└── README.md              # This file
```

## Quick Start

### Prerequisites
- Node.js 18+ (for frontend)
- Python 3.8+ (for backend)
- OpenAI API key (for PandasAI)

### 1. Frontend Setup
```bash
cd FE
npm install
npm run dev
```
Frontend will be available at http://localhost:3000

### 2. Backend Setup
```bash
cd BE
pip install -r requirements.txt
cp env.example .env
# Edit .env and add your OpenAI API key
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
Backend will be available at http://localhost:8000

### 3. API Documentation
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Features

### Frontend (Next.js 15)
- **Modern UI**: Built with Shadcn/UI and Tailwind CSS
- **File Upload**: Drag-and-drop CSV upload interface
- **Interactive Charts**: ECharts integration for data visualization
- **AI Insights**: Display AI-generated insights in cards
- **Responsive Design**: Mobile-first responsive layout
- **TypeScript**: Full type safety throughout

### Backend (FastAPI)
- **RESTful API**: Clean, documented API endpoints
- **Data Processing**: Pandas for data manipulation
- **AI Analysis**: PandasAI for intelligent insights
- **File Handling**: Secure file upload and processing
- **CORS Support**: Configured for frontend integration
- **Auto Documentation**: Swagger UI and ReDoc

## Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **Charts**: ECharts
- **Icons**: Lucide React

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.8+
- **Data Processing**: Pandas
- **AI Analysis**: PandasAI
- **Validation**: Pydantic
- **Documentation**: Swagger UI / ReDoc

## Workflow

1. **Upload**: User uploads CSV file through frontend
2. **Process**: Backend processes file and returns dataset summary
3. **Analyze**: Backend generates charts and AI insights
4. **Visualize**: Frontend displays interactive charts and insights
5. **Insights**: AI-powered analysis provides actionable insights

## Environment Variables

### Frontend (.env.local)
```env
BACKEND_URL=http://localhost:8000
```

### Backend (.env)
```env
PANDASAI_API_KEY=your_openai_api_key_here
ALLOWED_ORIGINS=["http://localhost:3000"]
MAX_FILE_SIZE=10485760
UPLOAD_DIR=uploads
```

## Development

### Frontend Development
```bash
cd FE
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Backend Development
```bash
cd BE
uvicorn app.main:app --reload    # Start development server
pytest                           # Run tests
```

## API Endpoints

### Upload
- `POST /api/upload/` - Upload CSV file

### Analysis
- `POST /api/analysis/{dataset_id}` - Analyze dataset
- `GET /api/analysis/charts/{dataset_id}` - Get chart types
- `GET /api/analysis/insights/{dataset_id}` - Get insight types

### Health
- `GET /` - API information
- `GET /health` - Health check

## Future Enhancements

- [ ] User authentication and authorization
- [ ] Database integration for data persistence
- [ ] Real-time data processing
- [ ] Advanced chart types and customization
- [ ] Export functionality (PDF, Excel)
- [ ] Data preprocessing and cleaning tools
- [ ] Machine learning model integration
- [ ] Multi-user collaboration features

## License

This project is licensed under the MIT License.
