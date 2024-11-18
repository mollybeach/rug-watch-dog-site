/**
 * @title JSON Validator
 * @fileoverview JSON validator
 * @path /lib/jsonValidator.ts
 */

import Ajv, { JSONSchemaType } from "ajv";

export function validateJson<T>(data: T, schema: JSONSchemaType<T>): string[] | null {
  const ajv = new Ajv();

  // Compile the schema, validate becomes a type guard for T
  const validate = ajv.compile(schema);

  if (validate(data)) {
    // If validation succeeds, data is guaranteed to match the type T
    return null;
  } else {
    // Handle errors as an array of human-readable strings
    return validate.errors?.map(
      (error) => `${error.instancePath || "root"} ${error.message || "is invalid"}`
    ) || [];
  }
}
