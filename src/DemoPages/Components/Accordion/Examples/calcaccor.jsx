import React, { Component } from "react";
import { Card, CardBody, CardHeader, Collapse, Button } from "reactstrap";
import Calculator from "../Examples/calslider"; // adjust path

const accordionTitles = ["INTEREST", "CARLOAN", "HOUSELOAN"];

class AccordionsWithCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = { accordion: [true, false, false] };
  }

  toggleAccordion = (index) => {
    this.setState({
      accordion: this.state.accordion.map((x, i) => (i === index ? !x : false)),
    });
  };

  render() {
    return (
      <div id="accordion" className="accordion-wrapper mb-3">
        {accordionTitles.map((title, index) => (
          <Card key={index}>
            <CardHeader id={`heading${index}`}>
              <Button
                block
                color="link"
                className="text-start m-0 p-0"
                onClick={() => this.toggleAccordion(index)}
                aria-expanded={this.state.accordion[index]}
                aria-controls={`collapse${index}`}
              >
                <h5 className="m-0 p-0">{title}</h5>
              </Button>
            </CardHeader>

            <Collapse
              isOpen={this.state.accordion[index]}
              data-parent="#accordion"
              id={`collapse${index}`}
              aria-labelledby={`heading${index}`}
            >
              <CardBody>
                <Calculator typeIndex={index} />
              </CardBody>
            </Collapse>
          </Card>
        ))}
      </div>
    );
  }
}

export default AccordionsWithCalculator;
