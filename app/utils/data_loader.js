/**
 * Utility functions for loading and processing data
 */

/**
 * Fetches data from an API endpoint
 * @param {string} url - The API endpoint URL
 * @param {Object} options - Optional fetch configuration
 * @returns {Promise<any>} The parsed response data
 */
export async function fetchData(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

/**
 * Processes raw data into a format suitable for charts
 * @param {Array} data - Raw data array
 * @param {string} labelKey - Key to use for labels
 * @param {string} valueKey - Key to use for values
 * @returns {Object} Formatted data for charts
 */
export function processChartData(data, labelKey, valueKey) {
  return {
    labels: data.map(item => item[labelKey]),
    values: data.map(item => item[valueKey])
  };
}

/**
 * Groups data by a specific key
 * @param {Array} data - Array of objects to group
 * @param {string} key - Key to group by
 * @returns {Object} Grouped data object
 */
export function groupDataBy(data, key) {
  return data.reduce((acc, item) => {
    const groupKey = item[key];
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {});
}
