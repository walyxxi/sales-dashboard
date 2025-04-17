import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Filter, User, Users } from "lucide-react";
import PropTypes from "prop-types";
import { Button } from "../ui/button";

export const DashboardFilters = ({
  filterParams,
  onFilterChange
}) => {
  const uniqueStatuses = ["Closed Won", "In Progress", "Closed Lost"]

  const onFilterChangeHandler = (key, value) => {
    onFilterChange((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
      <div className="relative">
        <User className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search Name"
          value={filterParams.name}
          onChange={(e) => onFilterChangeHandler("name", e.target.value)}
          className="pl-8 w-full md:w-[180px]"
        />
      </div>
      <div className="relative">
        <Users className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search Client Name"
          value={filterParams.client_name}
          onChange={(e) => onFilterChangeHandler("client_name", e.target.value)}
          className="pl-8 w-full md:w-[180px]"
        />
      </div>

      <Select
        value={filterParams.status}
        onValueChange={(value) => onFilterChangeHandler("status", value === "all_statuses" ? "" : value)}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all_statuses">All Statuses</SelectItem>
          {uniqueStatuses.map(status => (
            <SelectItem key={status} value={status}>{status}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {filterParams.region && (
        <Button 
          variant="outline" 
          onClick={() => onFilterChangeHandler("region", "")}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          Clear Region ({filterParams.region})
        </Button>
      )}
    </div>
  );
};

DashboardFilters.propTypes = {
  filterParams: PropTypes.shape({
    name: PropTypes.string,
    region: PropTypes.string,
    client_name: PropTypes.string,
    status: PropTypes.string,
    length: PropTypes.number
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired
};