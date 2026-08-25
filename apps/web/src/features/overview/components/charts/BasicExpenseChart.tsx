'use client'
import { BarChart, Bar, XAxis, YAxis, LabelList, Label } from 'recharts'
import { BasicExpenseStatistic } from '../../types'

type Props = {
  data: BasicExpenseStatistic
}

export const BasicExpenseChart = ({ data }: Props) => {
  return (
    <BarChart
      style={{
        width: '100%',
        maxWidth: '700px',
        maxHeight: '70vh',
        aspectRatio: 2,
      }}
      responsive
      data={data}
      margin={{
        top: 10,
        right: 0,
        left: 10,
        bottom: 15,
      }}
    >
      <XAxis dataKey="purchaseDate">
        <Label
          value="Purchase date"
          offset={-15}
          position="insideBottom"
        />
      </XAxis>
      <YAxis
        width="auto"
        label={{
          value: 'CZK',
          angle: -90,
          position: 'insideLeft',
          textAnchor: 'middle',
        }}
      />
      <Bar
        dataKey="totalAmount"
        fill="#8884d8"
        radius={[10, 10, 0, 0]}
      >
        <LabelList
          dataKey="totalAmount"
          position="top"
        />
      </Bar>
    </BarChart>
  )
}
