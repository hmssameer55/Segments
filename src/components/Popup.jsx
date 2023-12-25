import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { schemaOptions } from "../utils";
import SchemaSelect from "./SchemaSelect";
import SegmentSchemaInput from "./SegmentsSchemaInput";

const SegmentPopup = ({ show, onClose }) => {
  const [segmentName, setSegmentName] = useState("");
  const [newSchemas, setNewSchemas] = useState([]);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();

    if (newSchemas.length === 0)
      return alert("Please add at least one schema to segment");

    setIsLoading(true);

    const payload = {
      segment_name: segmentName,
      schema: newSchemas.map((schema) => {
        const matchedOption = schemaOptions.find(
          (option) => option.value === schema
        );
        return { [schema]: matchedOption.label };
      }),
    };

    try {
      const res = await fetch(
        "https://webhook.site/5c31c8ba-9959-4c87-be7a-e138b0e82fe7",
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      onClose();
      handleResetAllValues();
    } catch (err) {
      console.error("Error sending data to server:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSchema = (e) => {
    e.preventDefault();
    if (!value) return;
    setNewSchemas((prev) => [...prev, value]);
    setValue("");
  };

  const handleResetAllValues = () => {
    setSegmentName("");
    setNewSchemas([]);
    setValue("");
  };

  const handleSchemaChange = (e, index) => {
    const newSchemasCopy = [...newSchemas];
    newSchemasCopy[index] = e.target.value;
    setNewSchemas(newSchemasCopy);
  };

  const handleRemoveSchema = (index) => {
    const newSchemasCopy = [...newSchemas];
    newSchemasCopy.splice(index, 1);
    setNewSchemas(newSchemasCopy);
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        handleResetAllValues();
        onClose();
      }}
      centered={true}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Form onSubmit={handleSave}>
        <Modal.Header closeButton>
          <Modal.Title>Save Segment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="segmentName" className="mb-4">
            <Form.Label>Segment Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Segment Name"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="schemaDropdown" className="mb-4">
            <Form.Group controlId="schemaDropdown" className="mb-4">
              <Form.Label>Add Schema to Segment</Form.Label>
              <SchemaSelect
                value={value}
                onChange={(e) => setValue(e.target.value)}
                newSchemas={newSchemas}
              />
            </Form.Group>
          </Form.Group>
          <Button
            variant="primary"
            onClick={handleAddSchema}
            disabled={!value}
            title="Add new schema"
          >
            + Add new schema
          </Button>
          {newSchemas.map((schema, index) => (
            <SegmentSchemaInput
              key={schema}
              schema={schema}
              index={index}
              onChange={handleSchemaChange}
              onRemove={handleRemoveSchema}
              newSchemas={newSchemas}
            />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleResetAllValues();
              onClose();
            }}
          >
            Close
          </Button>
          <Button variant="primary" type="submit">
            {!!isLoading && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
            )}
            <span>{isLoading ? "Saving..." : "Save"}</span>
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SegmentPopup;
