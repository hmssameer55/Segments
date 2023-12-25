import React from "react";
import SchemaSelect from "./SchemaSelect";
import { MdDelete } from "react-icons/md";

export default function SegmentsSchemaInput({
  schema,
  index,
  onChange,
  onRemove,
  newSchemas,
}) {
  return (
    <div className="d-flex align-items-center mt-2">
      <SchemaSelect
        value={schema}
        onChange={(e) => onChange(e, index)}
        newSchemas={newSchemas}
      />
      <MdDelete
        className="ml-2"
        cursor={"pointer"}
        size={22}
        color="#c82333"
        onClick={() => onRemove(index)}
      />
    </div>
  );
}
