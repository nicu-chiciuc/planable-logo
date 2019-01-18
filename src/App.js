import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Logo from "./Logo";

import DatGui, {
  DatBoolean,
  DatButton,
  DatColor,
  DatNumber,
  DatString
} from "react-dat-gui";
import "react-dat-gui/build/react-dat-gui.css";

class App extends Component {
  state = {
    data: {
      package: "react-dat-gui",
      translateX: 400,
      translateY: 300,
      smallDig: 2.5,
      largeDig: 4.63,

      middleDist: 2,

      localRotation: 45,
      mainRotation: 0,

      smallArmRotation: 0,
      largeArmRotation: 0,

      isAwesome: true,

      smallColor: "#51D895",
      largeColor: "#25CE7B",
      middleColor: "#1C9B5C"
    }
  };

  handleUpdate = data => this.setState({ data });

  render() {
    const { data } = this.state;

    return (
      <div className="App">
        <Logo data={data} />

        <DatGui data={data} onUpdate={this.handleUpdate}>
          {/* <DatString path="package" label="Package" /> */}
          <DatNumber
            path="translateX"
            label="Translate X"
            min={0}
            max={800}
            step={1}
          />
          <DatNumber
            path="translateY"
            label="Translate Y"
            min={0}
            max={600}
            step={1}
          />

          <DatNumber
            path="smallDig"
            label="Small dig"
            min={0}
            max={5}
            step={0.1}
          />
          <DatNumber
            path="largeDig"
            label="Large dig"
            min={0}
            max={5}
            step={0.1}
          />

          <DatNumber
            path="middleDist"
            label="Middle dist"
            min={0}
            max={5}
            step={0.1}
          />

          <DatNumber
            path="localRotation"
            label="Local rotation"
            min={0}
            max={360}
            step={1}
          />

          <DatNumber
            path="mainRotation"
            label="Main rotation"
            min={-45}
            max={45}
            step={1}
          />

          <DatNumber
            path="largeArmRotation"
            label="Large Arm Rotation"
            min={-180}
            max={180}
            step={1}
          />
          <DatNumber
            path="smallArmRotation"
            label="Small Arm Rotation"
            min={-180}
            max={180}
            step={1}
          />

          {/* <DatBoolean path="isAwesome" label="Awesome?" />
          <DatColor path="feelsLike" label="Feels Like" /> */}
        </DatGui>
      </div>
    );
  }
}

export default App;
