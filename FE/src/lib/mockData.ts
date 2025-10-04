import { ChartData, Insight } from '@/types'

export const mockChartData: ChartData[] = [
  {
    type: 'bar',
    title: 'Department Distribution',
    data: {
      categories: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'],
      series: [
        {
          name: 'Employees',
          data: [45, 23, 18, 12, 8],
          color: '#3b82f6'
        }
      ]
    }
  },
  {
    type: 'line',
    title: 'Performance Score Trend',
    data: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      series: [
        {
          name: 'Average Score',
          data: [75, 78, 82, 85, 88, 90],
          color: '#10b981'
        }
      ]
    }
  },
  {
    type: 'pie',
    title: 'Salary Distribution',
    data: {
      series: [
        {
          name: 'Salary Ranges',
          data: [
            { value: 35, name: '$50k - $70k' },
            { value: 45, name: '$70k - $90k' },
            { value: 15, name: '$90k - $110k' },
            { value: 5, name: '$110k+' }
          ]
        }
      ]
    }
  },
  {
    type: 'scatter',
    title: 'Age vs Performance Score',
    data: {
      xAxisName: 'Age',
      yAxisName: 'Performance Score',
      series: [
        {
          name: 'Employees',
          data: [
            [25, 85], [30, 78], [35, 92], [28, 88], [32, 75],
            [27, 90], [33, 82], [29, 86], [31, 79], [26, 93]
          ],
          color: '#8b5cf6'
        }
      ]
    }
  }
]

export const mockInsights: Insight[] = [
  {
    id: 'insight_1',
    title: 'Performance Improvement Trend',
    description: 'Employee performance scores have shown a consistent upward trend over the past 6 months, with an average increase of 2.5 points per month. This suggests effective management practices and employee development programs.',
    type: 'trend'
  },
  {
    id: 'insight_2',
    title: 'Salary Anomaly Detected',
    description: 'Three employees in the Engineering department have salaries significantly above the department average (150%+ higher). This may indicate specialized roles or potential data entry errors that require review.',
    type: 'anomaly'
  },
  {
    id: 'insight_3',
    title: 'Age-Performance Correlation',
    description: 'Strong positive correlation (r=0.73) found between employee age and performance scores. Employees aged 30-35 show the highest performance levels, suggesting optimal experience-to-energy ratio.',
    type: 'correlation'
  },
  {
    id: 'insight_4',
    title: 'Department Performance Summary',
    description: 'Engineering leads in both headcount (45 employees) and average performance (87.2), while Finance shows the smallest team (8 employees) but maintains competitive performance scores (84.1).',
    type: 'summary'
  }
]
