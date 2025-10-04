from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import os
import shutil
from datetime import datetime
from app.services.data_processor import DataProcessor
from app.models.schemas import UploadResponse, ErrorResponse
from app.core.config import settings

router = APIRouter()

# Create upload directory if it doesn't exist
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)

@router.post("/", response_model=UploadResponse)
async def upload_csv(file: UploadFile = File(...)):
    """
    Upload a CSV file and return dataset summary
    """
    try:
        # Validate file type
        if file.content_type not in settings.ALLOWED_FILE_TYPES:
            raise HTTPException(
                status_code=400,
                detail="Only CSV files are allowed"
            )
        
        # Validate file size
        file_size = 0
        content = await file.read()
        file_size = len(content)
        
        if file_size > settings.MAX_FILE_SIZE:
            raise HTTPException(
                status_code=400,
                detail=f"File size exceeds maximum allowed size of {settings.MAX_FILE_SIZE} bytes"
            )
        
        # Save file
        file_path = os.path.join(settings.UPLOAD_DIR, f"{datetime.now().timestamp()}_{file.filename}")
        with open(file_path, "wb") as buffer:
            buffer.write(content)
        
        # Process file
        processor = DataProcessor()
        summary = await processor.process_csv(file_path, file.filename, file_size)
        
        # Clean up file
        os.remove(file_path)
        
        return UploadResponse(
            success=True,
            dataset_id=summary.dataset_id,
            summary=summary,
            message="File uploaded and processed successfully"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content=ErrorResponse(
                success=False,
                error="Internal server error",
                details=str(e)
            ).dict()
        )
