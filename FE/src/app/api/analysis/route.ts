import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000'

export async function POST(request: NextRequest) {
  try {
    const { dataset_id, file_path } = await request.json()

    if (!dataset_id) {
      return NextResponse.json(
        { success: false, error: 'Dataset ID is required' },
        { status: 400 }
      )
    }

    // Forward the request to the backend API
    const backendResponse = await fetch(`${BACKEND_URL}/api/analysis/${dataset_id}?file_path=${encodeURIComponent(file_path)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await backendResponse.json()

    if (!backendResponse.ok) {
      return NextResponse.json(
        { success: false, error: result.detail || 'Backend error' },
        { status: backendResponse.status }
      )
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
