'use client'

import {
  Pie,
  PieChart,
  PieLabelRenderProps,
  PieSectorShapeProps,
  Sector,
  Tooltip,
  useActiveTooltipDataPoints,
  useIsTooltipActive,
} from 'recharts'
import type { CategoryExpenseStatistic } from '../../types'

type Props = {
  data: CategoryExpenseStatistic
}

const RADIAN = Math.PI / 180
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const ncx = Number(cx)
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN)
  const ncy = Number(cy)
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > ncx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  )
}

const MyCustomPie = (props: PieSectorShapeProps) => {
  const p = useActiveTooltipDataPoints()
  const isAnyPieActive = useIsTooltipActive()
  const isThisPieActive = isAnyPieActive && props.payload === p?.[0]
  const fillOpacity = isAnyPieActive && !isThisPieActive ? 0.5 : 1

  return (
    <Sector
      {...props}
      fill={COLORS[(props.index ?? 0) % COLORS.length]}
      stroke="none"
      fillOpacity={fillOpacity}
      style={{ transition: 'fill-opacity 0.3s ease' }}
    />
  )
}

export const CategoryExpenseChart = ({ data }: Props) => {
  return (
    <PieChart
      style={{
        width: '100%',
        maxWidth: '500px',
        maxHeight: '80vh',
        aspectRatio: 1,
      }}
      responsive
    >
      <Pie
        data={data}
        labelLine={false}
        label={renderCustomizedLabel}
        dataKey="totalSpent"
        shape={MyCustomPie}
      />
      <Tooltip />
    </PieChart>
  )
}
