from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import JSONResponse
import pandas as pd
import os
from app.services.data_processor import DataProcessor
from app.models.schemas import AnalysisResponse, ErrorResponse
from app.core.config import settings

router = APIRouter()

@router.post("/{dataset_id}", response_model=AnalysisResponse)
async def analyze_dataset(
    dataset_id: str,
    file_path: str = Query(..., description="Path to the uploaded CSV file")
):
    """
    Analyze a dataset and return charts and insights
    """
    try:
        # Check if file exists
        if not os.path.exists(file_path):
            raise HTTPException(
                status_code=404,
                detail="File not found"
            )
        
        # Read the dataset
        df = pd.read_csv(file_path)
        
        # Process data
        processor = DataProcessor()
        
        # Generate charts and insights
        charts = await processor.generate_charts(df, dataset_id)
        insights = await processor.generate_insights(df, dataset_id)
        
        return AnalysisResponse(
            success=True,
            dataset_id=dataset_id,
            charts=charts,
            insights=insights,
            message="Analysis completed successfully"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content=ErrorResponse(
                success=False,
                error="Analysis failed",
                details=str(e)
            ).dict()
        )

@router.get("/charts/{dataset_id}")
async def get_charts(dataset_id: str):
    """
    Get available chart types for a dataset
    """
    return {
        "dataset_id": dataset_id,
        "available_charts": [
            "bar", "line", "pie", "scatter", "histogram", "box"
        ]
    }

@router.get("/insights/{dataset_id}")
async def get_insights(dataset_id: str):
    """
    Get available insight types for a dataset
    """
    return {
        "dataset_id": dataset_id,
        "available_insights": [
            "trend", "anomaly", "correlation", "summary", "prediction"
        ]
    }
