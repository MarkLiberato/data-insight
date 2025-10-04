import pandas as pd
import pandasai
from pandasai import PandasAI
from pandasai.llm.openai import OpenAI
import os
import uuid
from datetime import datetime
from typing import Dict, List, Any, Tuple
from app.core.config import settings
from app.models.schemas import DatasetSummary, ChartData, Insight

class DataProcessor:
    def __init__(self):
        self.llm = OpenAI(api_token=settings.PANDASAI_API_KEY)
        self.pandas_ai = PandasAI(self.llm, verbose=True)
    
    async def process_csv(self, file_path: str, file_name: str, file_size: int) -> DatasetSummary:
        """Process uploaded CSV file and return dataset summary"""
        try:
            # Read CSV file
            df = pd.read_csv(file_path)
            
            # Generate dataset ID
            dataset_id = f"ds_{uuid.uuid4().hex[:12]}"
            
            # Create summary
            summary = DatasetSummary(
                dataset_id=dataset_id,
                rows=len(df),
                columns=len(df.columns),
                column_names=list(df.columns),
                file_name=file_name,
                file_size=file_size,
                created_at=datetime.now()
            )
            
            return summary
            
        except Exception as e:
            raise Exception(f"Error processing CSV file: {str(e)}")
    
    async def generate_charts(self, df: pd.DataFrame, dataset_id: str) -> List[ChartData]:
        """Generate charts from the dataset"""
        charts = []
        
        try:
            # Bar Chart - Categorical data
            categorical_cols = df.select_dtypes(include=['object', 'category']).columns
            if len(categorical_cols) > 0:
                col = categorical_cols[0]
                value_counts = df[col].value_counts().head(10)
                
                charts.append(ChartData(
                    type="bar",
                    title=f"Distribution of {col}",
                    data={
                        "categories": value_counts.index.tolist(),
                        "series": [{
                            "name": col,
                            "data": value_counts.values.tolist(),
                            "color": "#3b82f6"
                        }]
                    }
                ))
            
            # Line Chart - Numerical data over time
            numerical_cols = df.select_dtypes(include=['int64', 'float64']).columns
            if len(numerical_cols) > 0:
                col = numerical_cols[0]
                if len(df) > 1:
                    charts.append(ChartData(
                        type="line",
                        title=f"Trend of {col}",
                        data={
                            "categories": list(range(len(df))),
                            "series": [{
                                "name": col,
                                "data": df[col].tolist(),
                                "color": "#10b981"
                            }]
                        }
                    ))
            
            # Pie Chart - If we have categorical data with reasonable number of categories
            if len(categorical_cols) > 0:
                col = categorical_cols[0]
                value_counts = df[col].value_counts()
                if 2 <= len(value_counts) <= 8:
                    charts.append(ChartData(
                        type="pie",
                        title=f"Distribution of {col}",
                        data={
                            "series": [{
                                "name": col,
                                "data": [
                                    {"value": count, "name": str(category)}
                                    for category, count in value_counts.items()
                                ]
                            }]
                        }
                    ))
            
            # Scatter Plot - If we have at least 2 numerical columns
            if len(numerical_cols) >= 2:
                col1, col2 = numerical_cols[0], numerical_cols[1]
                charts.append(ChartData(
                    type="scatter",
                    title=f"{col1} vs {col2}",
                    data={
                        "xAxisName": col1,
                        "yAxisName": col2,
                        "series": [{
                            "name": "Data Points",
                            "data": [[x, y] for x, y in zip(df[col1], df[col2])],
                            "color": "#8b5cf6"
                        }]
                    }
                ))
            
        except Exception as e:
            print(f"Error generating charts: {str(e)}")
            # Return empty list if chart generation fails
            pass
        
        return charts
    
    async def generate_insights(self, df: pd.DataFrame, dataset_id: str) -> List[Insight]:
        """Generate AI insights using PandasAI"""
        insights = []
        
        try:
            # Basic statistical insights
            numerical_cols = df.select_dtypes(include=['int64', 'float64']).columns
            
            if len(numerical_cols) > 0:
                # Data quality insights
                total_rows = len(df)
                null_rows = df.isnull().any(axis=1).sum()
                
                if null_rows > 0:
                    insights.append(Insight(
                        id=f"insight_{uuid.uuid4().hex[:8]}",
                        title="Data Quality Issue",
                        description=f"Found {null_rows} rows ({null_rows/total_rows*100:.1f}%) with missing values. Consider data cleaning before analysis.",
                        type="anomaly",
                        confidence=0.9,
                        created_at=datetime.now()
                    ))
                
                # Statistical summary
                col = numerical_cols[0]
                mean_val = df[col].mean()
                std_val = df[col].std()
                
                insights.append(Insight(
                    id=f"insight_{uuid.uuid4().hex[:8]}",
                    title=f"Statistical Summary - {col}",
                    description=f"Mean: {mean_val:.2f}, Standard Deviation: {std_val:.2f}. The data shows {'high' if std_val > mean_val else 'low'} variability.",
                    type="summary",
                    confidence=0.8,
                    created_at=datetime.now()
                ))
            
            # Correlation insights
            if len(numerical_cols) >= 2:
                corr_matrix = df[numerical_cols].corr()
                max_corr = 0
                max_corr_cols = None
                
                for i in range(len(corr_matrix.columns)):
                    for j in range(i+1, len(corr_matrix.columns)):
                        corr_val = abs(corr_matrix.iloc[i, j])
                        if corr_val > max_corr:
                            max_corr = corr_val
                            max_corr_cols = (corr_matrix.columns[i], corr_matrix.columns[j])
                
                if max_corr_cols and max_corr > 0.5:
                    insights.append(Insight(
                        id=f"insight_{uuid.uuid4().hex[:8]}",
                        title="Strong Correlation Found",
                        description=f"Strong correlation ({max_corr:.2f}) between {max_corr_cols[0]} and {max_corr_cols[1]}. This suggests a potential relationship worth investigating.",
                        type="correlation",
                        confidence=max_corr,
                        created_at=datetime.now()
                    ))
            
            # Trend analysis
            if len(df) > 10:
                insights.append(Insight(
                    id=f"insight_{uuid.uuid4().hex[:8]}",
                    title="Dataset Overview",
                    description=f"Dataset contains {len(df)} rows and {len(df.columns)} columns. {'Good sample size for analysis' if len(df) > 100 else 'Consider collecting more data for robust analysis'}.",
                    type="trend",
                    confidence=0.7,
                    created_at=datetime.now()
                ))
            
        except Exception as e:
            print(f"Error generating insights: {str(e)}")
            # Add a fallback insight
            insights.append(Insight(
                id=f"insight_{uuid.uuid4().hex[:8]}",
                title="Analysis Complete",
                description="Dataset has been successfully processed. Basic analysis completed.",
                type="summary",
                confidence=0.5,
                created_at=datetime.now()
            ))
        
        return insights
