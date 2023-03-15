import React, { useState } from "react";
import axios from "axios";

const VinDecoder = () => {
  const [vin, setVin] = useState("");
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [fuelInjectionType, setFuelInjectionType] = useState("");
  const [manufacturer, setManufacturer] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    if (vin.length === 17) {
      axios
        .get(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${vin}?format=json`)
        .then((response) => {
          const vehicle = response.data.Results[0];
          setYear(vehicle.ModelYear);
          setMake(vehicle.Make);
          setModel(vehicle.Model);
          setFuelInjectionType(vehicle.FuelInjectionType);
          setManufacturer(vehicle.Manufacturer)

        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("Please enter a valid VIN");
    }
  }; 

  return (
    <>
    <div>
      <h1>VIN Decoder</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="vin">Enter VIN:</label>
        <input
          type="text"
          id="vin"
          name="vin"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
        />
        <button type="submit">Decode</button>
      </form>
      {year && make && model&& manufacturer && fuelInjectionType && (
        <div>
           <h2>Vehicle Information</h2>
          <table>
            <tr>
              <td>VIN:</td>
              <td>{vin}</td>
            </tr>
            <tr>
              <td>Model:</td>
              <td>{model}</td>
            </tr>
            <tr>
              <td>Year:</td>
              <td>{year}</td>
            </tr>
            <tr>
              <td>Make:</td>
              <td>{make}</td>
            </tr>
            <tr>
              <td>Manufacturer:</td>
              <td>{manufacturer}</td>
            </tr>
            <tr>
              <td>FuelInjectionType:</td>
              <td>{fuelInjectionType}</td>
            </tr>
           
          </table>
        </div>
      )}
    </div>
    </>
  );
};

export default VinDecoder;
