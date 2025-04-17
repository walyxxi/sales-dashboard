import { dataSalesTypes, formatCurrency } from "@/utils/dataUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Users } from "lucide-react";

export const SalesRepTable = ({ data }) => {
  const [sortField, setSortField] = useState("totalValue");
  const [sortDirection, setSortDirection] = useState("desc");
  const isMobile = useIsMobile();
  
  // States for dialogs
  const [selectedRepDeals, setSelectedRepDeals] = useState(null);
  const [selectedRepClients, setSelectedRepClients] = useState(null);
  const [selectedRepName, setSelectedRepName] = useState("");
  const [isDealDialogOpen, setIsDealDialogOpen] = useState(false);
  const [isClientDialogOpen, setIsClientDialogOpen] = useState(false);
  
  const repsWithMetrics = data.map(rep => {
    const totalDeals = rep.deals.length;
    const totalValue = rep.deals.reduce((sum, deal) => sum + deal.value, 0);
    const wonDeals = rep.deals.filter(deal => deal.status === "Closed Won").length;
    const wonValue = rep.deals
      .filter(deal => deal.status === "Closed Won")
      .reduce((sum, deal) => sum + deal.value, 0);
    const winRate = totalDeals > 0 ? Math.round((wonDeals / totalDeals) * 100) : 0;
    
    return {
      ...rep,
      totalDeals,
      totalValue,
      wonDeals,
      wonValue,
      winRate
    };
  });
  
  const sortedReps = [...repsWithMetrics].sort((a, b) => {
    if (sortField === "name") {
      return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (sortField === "region") {
      return sortDirection === "asc" ? a.region.localeCompare(b.region) : b.region.localeCompare(a.region);
    } else {
      // For numeric fields
      const aValue = a[sortField]
      const bValue = b[sortField]
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
  });
  
  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };
  
  const handleShowDeals = (rep) => {
    setSelectedRepDeals(rep.deals);
    setSelectedRepName(rep.name);
    setIsDealDialogOpen(true);
  };
  
  const handleShowClients = (rep) => {
    setSelectedRepClients(rep.clients);
    setSelectedRepName(rep.name);
    setIsClientDialogOpen(true);
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case "Closed Won":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Closed Lost":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "In Progress":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };
  
  return (
    <>
      <Card className="col-span-1">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Sales Representatives</CardTitle>
          <span className="text-sm text-muted-foreground">
            {sortedReps.length} reps
          </span>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => handleSort("name")}
                  >
                    Name {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  {!isMobile && (
                    <TableHead 
                      className="cursor-pointer hover:bg-muted"
                      onClick={() => handleSort("region")}
                    >
                      Region {sortField === "region" && (sortDirection === "asc" ? "↑" : "↓")}
                    </TableHead>
                  )}
                  <TableHead 
                    className="text-right cursor-pointer hover:bg-muted"
                    onClick={() => handleSort("totalValue")}
                  >
                    {isMobile ? 'Value' : 'Total Value'} {sortField === "totalValue" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="text-center">Deals</TableHead>
                  <TableHead className="text-center">Clients</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedReps.map((rep) => (
                  <TableRow key={rep.id}>
                    <TableCell className="font-medium">{rep.name}</TableCell>
                    {!isMobile && (
                      <TableCell>{rep.region}</TableCell>
                    )}
                    <TableCell className="text-right">{formatCurrency(rep.totalValue)}</TableCell>
                    <TableCell className="text-center">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleShowDeals(rep)}
                        className="p-2"
                      >
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">View Deals</span>
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleShowClients(rep)}
                        className="p-2"
                      >
                        <Users className="h-4 w-4" />
                        <span className="sr-only">View Clients</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Deals Dialog */}
      <Dialog open={isDealDialogOpen} onOpenChange={setIsDealDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedRepName}'s Deals</DialogTitle>
          </DialogHeader>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedRepDeals?.map((deal, index) => (
                  <TableRow key={deal.client}>
                    <TableCell className="font-medium">{deal.client}</TableCell>
                    <TableCell className="text-right">{formatCurrency(deal.value)}</TableCell>
                    <TableCell className="text-right">
                      <Badge className={getStatusColor(deal.status)} variant="outline">
                        {deal.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Clients Dialog */}
      <Dialog open={isClientDialogOpen} onOpenChange={setIsClientDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedRepName}'s Clients</DialogTitle>
          </DialogHeader>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Contact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedRepClients?.map((client, index) => (
                  <TableRow key={client.name}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.industry}</TableCell>
                    <TableCell>{client.contact}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

SalesRepTable.propTypes = {
  data: dataSalesTypes,
};