"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { date: "01/06", total: 12 },
  { date: "02/06", total: 19 },
  { date: "03/06", total: 15 },
  { date: "04/06", total: 22 },
  { date: "05/06", total: 18 },
  { date: "06/06", total: 25 },
  { date: "07/06", total: 21 },
  { date: "08/06", total: 28 },
  { date: "09/06", total: 24 },
  { date: "10/06", total: 30 },
  { date: "11/06", total: 26 },
  { date: "12/06", total: 32 },
]

export function DailyRecordsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Registros de Formulários Diários</CardTitle>
        <CardDescription>Monitoramento de formulários preenchidos por dia em Junho.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  border: "1px solid #ccc",
                  borderRadius: "0.5rem",
                }}
              />
              <Line type="monotone" dataKey="total" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
