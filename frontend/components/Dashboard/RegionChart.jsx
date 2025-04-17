import { getDealsByRegion, formatCurrency, dataSalesTypes } from "@/utils/dataUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import PropTypes from "prop-types";

export const RegionChart = ({
  data,
  activeRegion,
  setActiveRegion
}) => {
  const regionData = getDealsByRegion(data);
  const isMobile = useIsMobile();

  const handleBarClick = (data) => {
    if (data && data.region) {
      if (activeRegion === data.region) {
        setActiveRegion("");
      } else {
        setActiveRegion(data.region);
      }
    }
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>
          Sales by Region
          {activeRegion ? (
            <p className="text-xs mt-2 text-muted-foreground">
              Click the same region again to clear the filter
            </p>
          ) : (
            <p className="text-xs mt-2 text-muted-foreground">
              Click on a region to filter by it
            </p>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className={`${isMobile ? 'h-60' : 'h-80'}`}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={regionData}
              margin={{
                top: 5,
                right: isMobile ? 10 : 30,
                left: isMobile ? 0 : 20,
                bottom: 5,
              }}
              onClick={(e) => e && e.activePayload && handleBarClick(e.activePayload[0].payload)}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="region"
                tickFormatter={isMobile ? (value) => value.substring(0, 3) : undefined}
                interval={0}
              />
              <YAxis
                yAxisId="left"
                orientation="left"
                tick={isMobile ? { fontSize: 10 } : undefined}
                label={isMobile ? undefined : { value: 'Deal Count', angle: -90, position: 'insideLeft' }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={isMobile ? { fontSize: 10 } : undefined}
                label={isMobile ? undefined : { value: 'Value (USD)', angle: -90, position: 'insideRight' }}
                tickFormatter={(tick) => `${Math.round(tick / 1000)}k`}
              />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "totalValue") return [formatCurrency(value), "Total Value"];
                  return [value, name === "totalDeals" ? "Total Deals" : "Sales Reps"];
                }}
              />
              <Legend
                payload={[
                  { value: 'Deal Count', type: 'rect', color: '#8884d8' },
                  { value: 'Total Value', type: 'rect', color: '#82ca9d' }
                ]}
              />
              <Bar
                yAxisId="left"
                dataKey="totalDeals"
                fill="#8884d8"
                name="Deal Count"
                radius={[4, 4, 0, 0]}
                cursor="pointer"
              />
              <Bar
                yAxisId="right"
                dataKey="totalValue"
                fill="#82ca9d"
                name="Total Value"
                radius={[4, 4, 0, 0]}
                cursor="pointer"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

RegionChart.propTypes = {
  data: dataSalesTypes,
  activeRegion: PropTypes.string,
  setActiveRegion: PropTypes.func.isRequired
}