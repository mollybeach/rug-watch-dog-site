/**
 * @title JSON Schemas
 * @fileoverview JSON schemas
 * @path /lib/schemas.ts
 */

// Schema for DataPoint used in VolcanoPlot
const volcanoPlotSchema = {
  type: "array", // The top-level structure is an array
  items: {
    type: "object", // Each item in the array is an object
    properties: {
      gene: { type: "string" }, // gene should be a string
      logFC: { type: "number" }, // logFC should be a number
      pValue: { type: "number" }  // pValue should be a number
    },
    required: ["gene", "logFC", "pValue"], // All properties are required
    additionalProperties: false // No additional properties allowed
  }
};

// Schema for ChordDiagram data
const chordDiagramSchema = {
    type: "object",
    properties: {
      nodes: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            group: { type: "string" },
            color: { type: "string" },
          },
          required: ["id", "group", "color"],
        },
      },
      links: {
        type: "array",
        items: {
          type: "object",
          properties: {
            source: { type: "string" },
            target: { type: "string" },
            value: { type: "number" },
          },
          required: ["source", "target", "value"],
        },
      },
    },
    required: ["nodes", "links"],
  };


// Schema for LineChart data
const lineChartSchema = {
    type: "array", // The top-level structure is an array
    items: {
      type: "object", // Each item in the array is an object
      properties: {
        x: { type: "number" }, // x should be a number
        y: { type: "number" }  // y should be a number
      },
      required: ["x", "y"], // All properties are required
      additionalProperties: false // No additional properties allowed
    }
  };
  
  // Schema for PathwayData used in PathwayDiagram
  const pathwaySchema = {
    type: "object",
    additionalProperties: false,
    properties: {
      nodes: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            label: { type: "string", nullable: true }, // Optional label
            group: { type: "string" },
          },
          required: ["id", "group"], // Ensure these are required
        },
      },
      links: {
        type: "array",
        items: {
          type: "object",
          properties: {
            source: { type: "string" },
            target: { type: "string" },
            value: { type: "number" }, // Ensure this property is included
          },
          required: ["source", "target", "value"], // Include 'value' as a required property
        },
      },
      metadata: {
        type: "object",
        properties: {
          title: { type: "string" },
          description: { type: "string" },
          groups: {
            type: "object",
            additionalProperties: {
              type: "object",
              properties: {
                color: { type: "string" },
              },
              required: ["color"], // Ensure 'color' is required
            },
          },
        },
        required: ["title", "description", "groups"], // Ensure these properties are required
      },
    },
    required: ["nodes", "links", "metadata"], // Ensure all top-level properties are required
  };

// Schema for DEG Rankings data
const degRankingsSchema = {
  type: "array", // The top-level structure is an array
    items: {
      type: "object", // Each item in the array is an object
      properties: {
        id: { type: "string" }, // id should be a string
        geneName: { type: "string" }, // geneName should be a string
        logFC: { type: "number" }, // logFC should be a number
        pValue: { type: "number" }, // pValue should be a number
        fdr: { type: "number" }, // fdr should be a number
        significant: { type: "boolean" }, // significant should be a boolean
        treatment: { type: "string", enum: ['CsA', 'VOC'] }, // treatment should be a string with specific values
        rank: { type: "number" }, // rank should be a number
      },
      required: ["id", "geneName", "logFC", "pValue", "fdr", "significant", "treatment", "rank"], // All properties are required
    },
  };
// Schema for BarChart data
const barChartSchema = {
  type: "array", // The top-level structure is an array
  items: {
    type: "object", // Each item in the array is an object
    properties: {
      category: { type: "string" }, // category should be a string
      value: { type: "number" }      // value should be a number
    },
    required: ["category", "value"], // All properties are required
    additionalProperties: false // No additional properties allowed
  }
};


// Export all schemas including the new PathwayData schema
export { 
  volcanoPlotSchema, 
  barChartSchema, 
  lineChartSchema, 
  chordDiagramSchema, 
  degRankingsSchema, 
  pathwaySchema 
};
