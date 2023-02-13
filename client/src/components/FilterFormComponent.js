import _ from "underscore";
import axios from 'axios';
import Select from "react-select";
import { useState } from "react";
import { colourOptions } from "./colourOptions";
import { dateOptions } from "./dateOptions";
import { speedLogicOptions, dateLogicOptions } from "./logicOptions";
import QueryStringComponent from "./QueryStringComponent";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./FilterFormComponent.css";

function FilterFormComponent() {
  const [colors, setColors] = useState([]);
  const [dateManufacture, setDateManufacture] = useState({ limit: "gt", date: "1980" });
  const [maxSpeed, setMaxSpeed] = useState({ limit: "gt", speed: "50" });
  const [pulseLaser, setPulseLaser] = useState(true);
  const [queryString, setQueryString] = useState("");
  const [viewSection, setViewSection] = useState(false);
  const [resultData, setResultData] = useState([]);

  const handleColorSelect = (selecetOptions) => {
    setColors(
      _.map(selecetOptions, (item) => {
        return item.value;
      })
    );
  };
  const handleLimitInput = (e) => {
    if (e.name === "date-limit") {
      setDateManufacture((prevState) => ({
        ...prevState,
        limit: e.value,
      }));
    }
    if (e.name === "speed-limit") {
      setMaxSpeed((prevState) => ({
        ...prevState,
        limit: e.value,
      }));
    }
  };
  const handleDateSelect = (selecetDate) => {
    setDateManufacture((prevState) => ({
      ...prevState,
      [selecetDate.name]: selecetDate.value,
    }));
  };
  const handleInput = (e) => {
    let { name, value } = e.target;
    if (name === "speed") {
      setMaxSpeed((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const handleChange = () => {
    setPulseLaser(!pulseLaser);
  };
  const handleFormSubmit = (e) => {
    // Create query string
    const selectedParams = {
      date: dateManufacture.limit + "," + dateManufacture.date,
      speed: maxSpeed.limit + "," + maxSpeed.speed,
      laser: pulseLaser,
    };
    if (colors.length > 0) selectedParams.colors = colors.join(",");
    const params = new URLSearchParams(selectedParams);
    const url = "http://localhost:3001/spaceships?" + params.toString().replace(/%2C/g, ",");
    setQueryString(url);

    // Show result section
    setViewSection(true);

    // Call api and get results
    const getreas = async () => {
      const resData = await axios.get(url);
      setResultData(resData.data.message);
    };
    getreas();
  };

  return (
    <div>
      {/* Filter form */}
      <form className="form-section">
        <Container>
          {/* Select color */}
          <Row className="input-section">
            <Col>
              <span className="label-field">Select color(s)</span>
              <Select
                closeMenuOnSelect={false}
                isMulti
                options={colourOptions}
                onChange={handleColorSelect}
              />
            </Col>
          </Row>
          {/* Choose speed */}
          <Row className="input-section">
            <span className="label-field">
              Speed
              <span> [50 - 200]</span>
            </span>
            <Col>
              <Select
                options={speedLogicOptions}
                onChange={handleLimitInput}
                defaultValue={{
                  name: "speed-limit",
                  value: "gt",
                  label: "Greater than",
                }}
              />
            </Col>
            <Col>
              <input
                className="input-field"
                value={maxSpeed.speed}
                type="range"
                onChange={handleInput}
                name="speed"
                min="50"
                max="200"
              />
              <span>{maxSpeed.speed}</span>
            </Col>
          </Row>
          {/* Choose date*/}
          <Row className="input-section">
            <span className="label-field">Year</span>
            <Col>
              <Select
                options={dateLogicOptions}
                onChange={handleLimitInput}
                defaultValue={{
                  name: "date-limit",
                  value: "gt",
                  label: "After",
                }}
              />
            </Col>
            <Col>
              <Select
                closeMenuOnSelect={false}
                options={dateOptions}
                onChange={handleDateSelect}
                defaultValue={{ name: "date", value: "1980", label: "1980" }}
              />
            </Col>
          </Row>
          {/* Pulse-Laser enabled or not*/}
          <Row className="input-section">
            <Col>
              <span className="label-field">Pulse Laser &nbsp;</span>
              <input
                type="checkbox"
                checked={pulseLaser}
                onChange={handleChange}
              />
            </Col>
          </Row>
          {/* Submit form */}
          <Row className="input-section">
            <Col>
              <button
                type="button"
                onClick={handleFormSubmit}
                className="btn btn-success"
              >
                Submit
              </button>
            </Col>
          </Row>
        </Container>
      </form>
      {/* Generated query string and results */}
      <div>
        <QueryStringComponent
          status={viewSection}
          data={queryString}
          spaceshipData={resultData}
        />
      </div>
    </div>
  );
}

export default FilterFormComponent;
