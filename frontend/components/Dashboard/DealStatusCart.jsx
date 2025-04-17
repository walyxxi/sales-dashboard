import { getDealsByStatus, formatCurrency, dataSalesTypes } from "@/utils/dataUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";

export const DealStatusChart = ({ data }) => {
  const dealsByStatus = getDealsByStatus(data);
  const isMobile = useIsMobile();
  
  const COLORS = ["#4ade80", "#f97316", "#ef4444"];
  const RADIAN = Math.PI / 180;
  
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (isMobile && percent < 0.1) return null;
    
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Deal Status Distribution</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className={`${isMobile ? 'h-60' : 'h-80'}`}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <Pie
                data={dealsByStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius="90%"
                fill="#8884d8"
                dataKey="totalValue"
                nameKey="status"
              >
                {dealsByStatus.map((entry, index) => (
                  <Cell key={`cell-${entry}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [formatCurrency(value), "Total Value"]}
                labelFormatter={(value) => `Status: ${value}`}
              />
              <Legend verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

DealStatusChart.propTypes = {
  data: dataSalesTypes,
};