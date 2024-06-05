import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TestChart() {
  const fakedata = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 300, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 300, pv: 1398, amt: 2210 },
    { name: "Page D", uv: 300, pv: 1398, amt: 2210 },
    { name: "Page E", uv: 300, pv: 1398, amt: 2210 },

  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Yo</CardTitle>
        <CardDescription>Overzicht van alle users</CardDescription>
      </CardHeader>
      <CardContent>
        <LineChart
          width={400}
          height={300}
          data={fakedata}
          margin={{ top: 10, right: 20, bottom: 5, left: 0 }}
        >
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </CardContent>
    </Card>
  );
}
