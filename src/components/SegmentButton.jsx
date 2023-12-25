import React from "react";
import Button from "react-bootstrap/Button";

export default function SegmentButton({ onClick }) {
  return (
    <Button className="mt-2" size="lg" variant="primary" onClick={onClick}>
      Save Segment
    </Button>
  );
}
