'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, AlertTriangle, Link, BarChart3 } from 'lucide-react'
import { Insight } from '@/types'

interface InsightCardProps {
  insight: Insight
}

const getInsightIcon = (type: Insight['type']) => {
  switch (type) {
    case 'trend':
      return <TrendingUp className="h-5 w-5 text-blue-500" />
    case 'anomaly':
      return <AlertTriangle className="h-5 w-5 text-orange-500" />
    case 'correlation':
      return <Link className="h-5 w-5 text-green-500" />
    case 'summary':
      return <BarChart3 className="h-5 w-5 text-purple-500" />
    default:
      return <BarChart3 className="h-5 w-5 text-gray-500" />
  }
}

const getInsightBadgeVariant = (type: Insight['type']) => {
  switch (type) {
    case 'trend':
      return 'default' as const
    case 'anomaly':
      return 'destructive' as const
    case 'correlation':
      return 'secondary' as const
    case 'summary':
      return 'outline' as const
    default:
      return 'outline' as const
  }
}

export function InsightCard({ insight }: InsightCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {getInsightIcon(insight.type)}
            <CardTitle className="text-lg">{insight.title}</CardTitle>
          </div>
          <Badge variant={getInsightBadgeVariant(insight.type)}>
            {insight.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base leading-relaxed">
          {insight.description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}

interface InsightsSectionProps {
  insights: Insight[]
}

export function InsightsSection({ insights }: InsightsSectionProps) {
  if (!insights || insights.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Insights</CardTitle>
          <CardDescription>
            Automated analysis and insights generated from your data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {insights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
