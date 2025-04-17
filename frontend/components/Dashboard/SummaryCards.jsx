import { formatCurrency, getDealsByStatus, getTotalValue, dataSalesTypes } from "@/utils/dataUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Users, Briefcase, DollarSign } from "lucide-react";

export const SummaryCards = ({ data }) => {
  const totalReps = data.length;
  const totalDeals = data.reduce((acc, rep) => acc + rep.deals.length, 0);
  const totalValue = getTotalValue(data);
  const dealStatus = getDealsByStatus(data);
  const closedWonDeals = dealStatus.find(d => d.status === "Closed Won");
  const closedWonValue = closedWonDeals ? closedWonDeals.totalValue : 0;
  const winRate = totalValue > 0 ? Math.round((closedWonValue / totalValue) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Total Sales Reps</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalReps}</div>
          <p className="text-xs text-muted-foreground">
            Active sales representatives
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Total Deals</CardTitle>
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalDeals}</div>
          <p className="text-xs text-muted-foreground">
            Across all representatives
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
          <p className="text-xs text-muted-foreground">
            All deals combined
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{winRate}%</div>
          <p className="text-xs text-muted-foreground">
            Of total deal value
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

SummaryCards.propTypes = {
  data: dataSalesTypes
};