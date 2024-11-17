
/**
 * Formats volcano plot data from DEG analysis
 * @param {Array} genes - Array of gene expression data
 * @returns {Object} Formatted data for volcano plot
 */
export const formatVolcanoPlotData = (genes) => {
  return {
    datasets: [{
      label: 'Genes',
      data: genes.map(gene => ({
        x: gene.logFC,
        y: -Math.log10(gene.pValue),
        label: gene.geneName
      })),
      backgroundColor: genes.map(gene => 
        Math.abs(gene.logFC) > 1 && gene.pValue < 0.05 
          ? 'rgba(255, 99, 132, 0.5)'  // Significant
          : 'rgba(201, 203, 207, 0.5)' // Not significant
      )
    }]
  };
};

/**
 * Formats pathway enrichment data for bar chart
 * @param {Array} pathways - Array of pathway enrichment data
 * @returns {Object} Formatted data for bar chart
 */
export const formatPathwayBarData = (pathways) => {
  return {
    labels: pathways.map(p => p.pathwayName),
    datasets: [{
      label: '-log10(FDR)',
      data: pathways.map(p => -Math.log10(p.fdr)),
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };
};

/**
 * Common chart options for RNA-seq visualizations
 */
export const chartOptions = {
  volcano: {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Log2 Fold Change'
        }
      },
      y: {
        title: {
          display: true,
          text: '-log10(p-value)'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const point = context.raw;
            return `${point.label}: FC=${Math.pow(2, point.x).toFixed(2)}, p=${Math.pow(10, -point.y).toExponential(2)}`;
          }
        }
      }
    }
  },
  pathwayBar: {
    responsive: true,
    indexAxis: 'y',
    scales: {
      x: {
        title: {
          display: true,
          text: '-log10(FDR)'
        }
      }
    }
  }
};

/**
 * Generates color scale for heatmaps
 * @param {number} value - Value to convert to color
 * @returns {string} RGB color string
 */
export const getHeatmapColor = (value) => {
  // Normalize value between -1 and 1
  const normalized = Math.max(-1, Math.min(1, value));
  
  // Red for positive values, blue for negative
  if (normalized > 0) {
    return `rgb(${Math.round(255 * normalized)}, 0, 0)`;
  } else {
    return `rgb(0, 0, ${Math.round(-255 * normalized)})`;
  }
};

/**
 * Formats comparison data between CsA and VOC
 * @param {Object} csaData - CsA analysis data
 * @param {Object} vocData - VOC analysis data
 * @returns {Object} Formatted comparison data
 */
export const formatComparisonData = (csaData, vocData) => {
  return {
    labels: ['DEGs', 'Pathways', 'GO Terms'],
    datasets: [
      {
        label: 'CsA',
        data: [
          csaData.degCount,
          csaData.pathwayCount,
          csaData.goTermCount
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      },
      {
        label: 'VOC',
        data: [
          vocData.degCount,
          vocData.pathwayCount,
          vocData.goTermCount
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.5)'
      }
    ]
  };
};

/**
 * Calculate basic statistics for gene expression data
 * @param {Array} expressionData - Array of expression values
 * @returns {Object} Statistical measures
 */
export const calculateStats = (expressionData) => {
  const values = expressionData.filter(v => !isNaN(v));
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const sorted = [...values].sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)];
  
  return {
    mean,
    median,
    min: Math.min(...values),
    max: Math.max(...values),
    count: values.length
  };
}; 