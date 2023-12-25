import React from "react";
import Form from "react-bootstrap/Form";

import { schemaOptions } from "../utils";

export default function SchemaSelect({ value, onChange, newSchemas }) {
  return (
    <Form.Control as="select" value={value} onChange={onChange}>
      <option value="" disabled>
        Select Schema
      </option>
      {schemaOptions.map((option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={newSchemas.includes(option.value)}
        >
          {option.label}
        </option>
      ))}
    </Form.Control>
  );
}
