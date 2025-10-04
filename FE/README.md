# AI Data Analyst - Frontend MVP

A Next.js 15 application for AI-powered data analysis and visualization.

## Features

- **CSV File Upload**: Drag-and-drop interface for uploading CSV files
- **Dataset Summary**: Automatic analysis showing rows, columns, and column names
- **Interactive Charts**: Multiple chart types (bar, line, pie, scatter) using ECharts
- **AI Insights**: Mock AI-generated insights with different types (trend, anomaly, correlation, summary)
- **Modern UI**: Built with Shadcn/UI components and Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **Charts**: ECharts with echarts-for-react
- **Icons**: Lucide React

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── api/upload/          # Mock API endpoint
│   ├── dashboard/           # Main dashboard page
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page (redirects to dashboard)
├── components/
│   ├── ui/                  # Shadcn/UI components
│   ├── FileUploader.tsx     # CSV upload component
│   ├── ChartRenderer.tsx    # ECharts wrapper component
│   └── InsightCard.tsx      # AI insights display component
├── lib/
│   ├── utils.ts             # Utility functions
│   └── mockData.ts          # Mock data for charts and insights
└── types/
    └── index.ts             # TypeScript type definitions
```

## Usage

1. Navigate to `/dashboard`
2. Upload a CSV file using the drag-and-drop interface
3. View the dataset summary with rows, columns, and column names
4. Explore interactive charts generated from mock data
5. Read AI-generated insights in the cards below

## Mock Data

The application uses mock data for demonstration purposes:
- **Charts**: Department distribution, performance trends, salary distribution, age vs performance
- **Insights**: Performance trends, salary anomalies, correlations, department summaries

## API Endpoints

- `POST /api/upload` - Uploads a CSV file and returns dataset summary (mock implementation)

## Development

- The app uses Next.js 15 with App Router
- All components are built with TypeScript
- UI follows Shadcn/UI design system
- Charts are rendered using ECharts
- Mock APIs simulate real data processing
