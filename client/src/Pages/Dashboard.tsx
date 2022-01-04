import { ScaleIcon } from "@heroicons/react/solid";
import React, { ReactElement } from "react";
import Card from "../Components/Card";
import Container from "../Components/Container";
import Stats from "../Components/Stats";

export default function Dashboard(): ReactElement {
  return (
    <Container>
      <div className="grid grid-cols-2 gap-5">
        <Card className="row-span-2">
          <Card.Header />
          <Card.Body />
          <Card.Footer />
        </Card>
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <Card.Header />
            <Card.Body />
            <Card.Footer />
          </Card>
          <Card>
            <Card.Header />
            <Card.Body />
            <Card.Footer />
          </Card>
        </div>
        <Card className="row-span-2">
          <Card.Header />
          <Card.Body />
          <Card.Footer />
        </Card>
        <Card className="row-span-2">
          <Card.Header />
          <Card.Body />
          <Card.Footer />
        </Card>
        <Card>
          <Card.Header />
          <Card.Body />
          <Card.Footer />
        </Card>
      </div>
    </Container>
  );
}
