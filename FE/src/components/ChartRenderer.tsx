'use client'

import React, { useRef, useEffect } from 'react'
import ReactECharts from 'echarts-for-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartData } from '@/types'

interface ChartRendererProps {
  charts: ChartData[]
}

export function ChartRenderer({ charts }: ChartRendererProps) {
  if (!charts || charts.length === 0) {
    return null
  }

  const getChartOption = (chart: ChartData) => {
    const baseOption = {
      title: {
        text: chart.title,
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      legend: {
        data: chart.data.series?.map((s: any) => s.name) || [],
        top: 'bottom'
      }
    }

    switch (chart.type) {
      case 'bar':
        return {
          ...baseOption,
          xAxis: {
            type: 'category',
            data: chart.data.categories || [],
            axisLabel: {
              rotate: 45
            }
          },
          yAxis: {
            type: 'value'
          },
          series: chart.data.series?.map((s: any) => ({
            name: s.name,
            type: 'bar',
            data: s.data,
            itemStyle: {
              color: s.color || '#3b82f6'
            }
          })) || []
        }

      case 'line':
        return {
          ...baseOption,
          xAxis: {
            type: 'category',
            data: chart.data.categories || [],
            axisLabel: {
              rotate: 45
            }
          },
          yAxis: {
            type: 'value'
          },
          series: chart.data.series?.map((s: any) => ({
            name: s.name,
            type: 'line',
            data: s.data,
            smooth: true,
            lineStyle: {
              color: s.color || '#3b82f6'
            },
            itemStyle: {
              color: s.color || '#3b82f6'
            }
          })) || []
        }

      case 'pie':
        return {
          ...baseOption,
          series: [{
            name: chart.title,
            type: 'pie',
            radius: '50%',
            data: chart.data.series?.[0]?.data || [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        }

      case 'scatter':
        return {
          ...baseOption,
          xAxis: {
            type: 'value',
            name: chart.data.xAxisName || 'X Axis'
          },
          yAxis: {
            type: 'value',
            name: chart.data.yAxisName || 'Y Axis'
          },
          series: chart.data.series?.map((s: any) => ({
            name: s.name,
            type: 'scatter',
            data: s.data,
            symbolSize: 8,
            itemStyle: {
              color: s.color || '#3b82f6'
            }
          })) || []
        }

      default:
        return baseOption
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Visualizations</CardTitle>
          <CardDescription>
            Interactive charts generated from your dataset
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {charts.map((chart, index) => (
              <div key={index} className="space-y-4">
                <div className="h-80">
                  <ReactECharts
                    option={getChartOption(chart)}
                    style={{ height: '100%', width: '100%' }}
                    opts={{ renderer: 'canvas' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
