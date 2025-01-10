/**
 * @title JSON Schemas
 * @fileoverview JSON schemas for NFT data validation
 * @path /lib/schemas.ts
 */

// Schema for NFT Market Data
const marketDataSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      collection: { type: "string" },
      floorPrice: { type: "number" },
      volume24h: { type: "number" },
      holders: { type: "number" },
      riskScore: { type: "number" }
    },
    required: ["collection", "floorPrice", "volume24h", "holders", "riskScore"],
    additionalProperties: false
  }
};

// Schema for Network Analysis data
const networkSchema = {
  type: "object",
  properties: {
    nodes: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          group: { type: "string", enum: ["collection", "whale", "trader"] },
          size: { type: "number" }
        },
        required: ["id", "group", "size"]
      }
    },
    links: {
      type: "array",
      items: {
        type: "object",
        properties: {
          source: { type: "string" },
          target: { type: "string" },
          value: { type: "number" }
        },
        required: ["source", "target", "value"]
      }
    }
  },
  required: ["nodes", "links"]
};

// Schema for Price History data
const priceHistorySchema = {
  type: "object",
  properties: {
    collection: { type: "string" },
    timestamps: { type: "array", items: { type: "string" } },
    prices: { type: "array", items: { type: "number" } },
    volumes: { type: "array", items: { type: "number" } }
  },
  required: ["collection", "timestamps", "prices", "volumes"]
};

// Export schemas
export { 
  marketDataSchema,
  networkSchema,
  priceHistorySchema
};
