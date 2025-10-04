from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime

class DatasetSummary(BaseModel):
    dataset_id: str
    rows: int
    columns: int
    column_names: List[str]
    file_name: str
    file_size: int
    created_at: datetime

class ChartData(BaseModel):
    type: str  # 'bar', 'line', 'pie', 'scatter'
    title: str
    data: Dict[str, Any]
    options: Optional[Dict[str, Any]] = None

class Insight(BaseModel):
    id: str
    title: str
    description: str
    type: str  # 'trend', 'anomaly', 'correlation', 'summary'
    confidence: Optional[float] = None
    created_at: datetime

class UploadResponse(BaseModel):
    success: bool
    dataset_id: str
    summary: DatasetSummary
    message: Optional[str] = None

class AnalysisResponse(BaseModel):
    success: bool
    dataset_id: str
    charts: List[ChartData]
    insights: List[Insight]
    message: Optional[str] = None

class ErrorResponse(BaseModel):
    success: bool = False
    error: str
    details: Optional[str] = None
