import PropTypes from "prop-types";

export const dataSalesTypes = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    deals: PropTypes.arrayOf(
      PropTypes.shape({
        client: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
      })
    ).isRequired,
    clients: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        industry: PropTypes.string.isRequired,
        contact: PropTypes.string.isRequired,
      })
    ).isRequired,
  })
).isRequired;

export function getDealsByStatus(salesReps) {
  const statusMap = new Map();

  salesReps.forEach(rep => {
    rep.deals.forEach(deal => {
      const current = statusMap.get(deal.status) || { count: 0, totalValue: 0 };
      statusMap.set(deal.status, {
        count: current.count + 1,
        totalValue: current.totalValue + deal.value
      });
    });
  });

  return Array.from(statusMap.entries()).map(([status, data]) => ({
    status,
    count: data.count,
    totalValue: data.totalValue
  }));
}

export function getDealsByRegion(salesReps) {
  const regionMap = new Map();

  salesReps.forEach(rep => {
    const current = regionMap.get(rep.region) || { salesReps: 0, totalDeals: 0, totalValue: 0 };
    const dealsCount = rep.deals.length;
    const dealsValue = rep.deals.reduce((sum, deal) => sum + deal.value, 0);

    regionMap.set(rep.region, {
      salesReps: current.salesReps + 1,
      totalDeals: current.totalDeals + dealsCount,
      totalValue: current.totalValue + dealsValue
    });
  });

  return Array.from(regionMap.entries()).map(([region, data]) => ({
    region,
    salesReps: data.salesReps,
    totalDeals: data.totalDeals,
    totalValue: data.totalValue
  }));
}

export function getTopSkills(salesReps) {
  const skillMap = new Map();

  salesReps.forEach(rep => {
    rep.skills.forEach(skill => {
      skillMap.set(skill, (skillMap.get(skill) || 0) + 1);
    });
  });

  return Array.from(skillMap.entries())
    .map(([skill, count]) => ({ skill, count }))
    .sort((a, b) => b.count - a.count);
}

export function getClientsByIndustry(salesReps) {
  const industryMap = new Map();

  salesReps.forEach(rep => {
    rep.clients.forEach(client => {
      industryMap.set(client.industry, (industryMap.get(client.industry) || 0) + 1);
    });
  });

  return Array.from(industryMap.entries())
    .map(([industry, count]) => ({ industry, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllDeals(salesReps) {
  const allDeals = [];

  salesReps.forEach(rep => {
    rep.deals.forEach(deal => {
      allDeals.push({ ...deal, repName: rep.name });
    });
  });

  return allDeals;
}

export function getAllClients(salesReps) {
  const allClients = [];

  salesReps.forEach(rep => {
    rep.clients.forEach(client => {
      allClients.push({ ...client, repName: rep.name });
    });
  });

  return allClients;
}

export function getTotalValue(salesReps) {
  return salesReps.reduce((total, rep) => {
    return total + rep.deals.reduce((repTotal, deal) => repTotal + deal.value, 0);
  }, 0);
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
}