import { getAllEnquiries } from './enquiryService.js';

// ─────────────────────────────────────────────────────────────
// Analytics Service
// ─────────────────────────────────────────────────────────────

/**
 * Generate monthly analytics report
 */
export async function getMonthlyReport(month = null) {
  const enquiries = await getAllEnquiries();
  
  // Default to current month if not specified
  const targetMonth = month || new Date().toISOString().slice(0, 7); // YYYY-MM format

  // Filter enquiries for the target month
  const monthlyEnquiries = enquiries.filter(e => 
    e.timestamp.startsWith(targetMonth)
  );

  // Count product interests
  const productInterestCounts = {};
  monthlyEnquiries.forEach(e => {
    const product = e.product_interest || 'Unspecified';
    productInterestCounts[product] = (productInterestCounts[product] || 0) + 1;
  });

  // Count cities
  const cityCounts = {};
  monthlyEnquiries.forEach(e => {
    const city = e.city || 'Unknown';
    cityCounts[city] = (cityCounts[city] || 0) + 1;
  });

  // Find top product and city
  const topProduct = Object.keys(productInterestCounts).reduce(
    (a, b) => productInterestCounts[a] > productInterestCounts[b] ? a : b,
    'None'
  );
  
  const topCity = Object.keys(cityCounts).reduce(
    (a, b) => cityCounts[a] > cityCounts[b] ? a : b,
    'None'
  );

  return {
    month: targetMonth,
    total_enquiries: monthlyEnquiries.length,
    top_product_interest: topProduct,
    top_city: topCity,
    product_breakdown: productInterestCounts,
    city_breakdown: cityCounts,
    daily_trend: getDailyTrend(monthlyEnquiries, targetMonth)
  };
}

/**
 * Helper to get daily enquiry trend
 */
function getDailyTrend(enquiries, month) {
  const dailyCounts = {};
  enquiries.forEach(e => {
    const day = e.timestamp.slice(0, 10); // YYYY-MM-DD
    dailyCounts[day] = (dailyCounts[day] || 0) + 1;
  });
  
  return Object.entries(dailyCounts)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
}
