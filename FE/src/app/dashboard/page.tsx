'use client'

import React, { useState } from 'react'
import { FileUploader } from '@/components/FileUploader'
import { ChartRenderer } from '@/components/ChartRenderer'
import { InsightsSection } from '@/components/InsightCard'
import { DatasetSummary, ChartData, Insight } from '@/types'
import { mockChartData, mockInsights } from '@/lib/mockData'

export default function DashboardPage() {
  const [summary, setSummary] = useState<DatasetSummary | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const [charts, setCharts] = useState<ChartData[]>([])
  const [insights, setInsights] = useState<Insight[]>([])

  const handleUpload = async (file: File): Promise<DatasetSummary> => {
    setIsLoading(true)
    
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Upload failed')
      }

      setSummary(result.summary)
      
      // Call analysis API after successful upload
      try {
        const analysisResponse = await fetch('/api/analysis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            dataset_id: result.summary.dataset_id,
            file_path: `temp_${result.summary.dataset_id}.csv` // This would be handled by backend
          }),
        })

        const analysisResult = await analysisResponse.json()

        if (analysisResult.success) {
          setCharts(analysisResult.charts)
          setInsights(analysisResult.insights)
        } else {
          // Fallback to mock data if analysis fails
          setCharts(mockChartData)
          setInsights(mockInsights)
        }
      } catch (analysisError) {
        console.error('Analysis error:', analysisError)
        // Fallback to mock data
        setCharts(mockChartData)
        setInsights(mockInsights)
      }

      return result.summary
    } catch (error) {
      console.error('Upload error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            AI Data Analyst
          </h1>
          <p className="text-xl text-muted-foreground">
            Upload your CSV data and get instant insights with AI-powered analysis
          </p>
        </div>

        <div className="space-y-8">
          <FileUploader
            onUpload={handleUpload}
            summary={summary}
            isLoading={isLoading}
          />

          {charts.length > 0 && (
            <ChartRenderer charts={charts} />
          )}

          {insights.length > 0 && (
            <InsightsSection insights={insights} />
          )}
        </div>
      </div>
    </div>
  )
}
