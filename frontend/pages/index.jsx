import { DealStatusChart } from "@/components/Dashboard/DealStatusCart";
import { DashboardFilters } from "@/components/Dashboard/Filters";
import { RegionChart } from "@/components/Dashboard/RegionChart";
import { SummaryCards } from "@/components/Dashboard/SummaryCards";
import { SalesRepTable } from "@/components/Dashboard/Table";
import { useError } from "@/components/Error/ErrorProvider";
import Layout from "@/components/Layout";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [filteredData, setFilteredData] = useState([]);
  const [filterParams, setFilterParams] = useState({
    name: "",
    region: "",
    client_name: "",
    status: "",
  });
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const { showError } = useError();

  const { name, region, client_name, status } = filterParams;

  const getSalesData = useCallback(async () => {
    setIsLoading(true); // Set loading to true before fetching data
    const response = await fetch(`http://localhost:8000/api/sales?${new URLSearchParams(filterParams)}`);
    try {
      if (!response.ok) {
        throw new Error("Failed to fetch sales data");
      }
      const data = await response.json();
      setFilteredData(data);
      setIsLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      showError("Error fetching sales data", error);
    } finally {
      setIsLoading(false);
    }
  }, [filterParams]);

  useEffect(() => {
    // Debounce the API call to avoid excessive requests
    const delayInputTimeoutId = setTimeout(() => {
      getSalesData();
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [name, region, client_name, status]);

  return (
    <Layout showChatButton title="Dashboard">
      {isLoading && <div className="absolute z-50 bg-slate-600/5 h-full w-full flex justify-center pt-6">Loading...</div>}
      <div className="relative mx-auto px-4">
        <div className="sticky top-16 z-10 bg-gray-50 dark:bg-gray-900 py-4 border-b mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <DashboardFilters
              filterParams={filterParams}
              onFilterChange={setFilterParams}
            />
          </div>
        </div>
        <SummaryCards data={filteredData} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <DealStatusChart data={filteredData} />
          <RegionChart
            data={filteredData}
            activeRegion={filterParams.region}
            setActiveRegion={(region) => setFilterParams((prev) => ({ ...prev, region }))}
          />
        </div>
        <div className="grid grid-cols-1 gap-6 mb-6">
          <SalesRepTable data={filteredData} />
        </div>
      </div>
    </Layout>
  );
}
