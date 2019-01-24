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
import { original } from "./logo-small-colored";

const colSmall = [81, 216, 149];
const colLarge = [37, 206, 123];

var coler = (final, alpha) => {
  const c = (final - (1 - alpha) * 255) / alpha;
  return Math.max(c, 0);
};

var rgbColer = (arr, alpha) => {
  const nArr = arr.map(c => coler(c, alpha));

  return nArr;
};

function toRgba(rgb, alpha) {
  const [r, g, b] = rgbColer(rgb, alpha);

  const c = `rgba(${r}, ${g}, ${b}, ${alpha})`;

  return c;
}

class App extends Component {
  state = {
    data: {
      unit: 20.43,
      linkArms: false,
      showStuff: true,

      package: "react-dat-gui",
      translateX: 138,
      translateY: 138,
      smallDig: 2.7,
      largeDig: 5.1,

      middleDist: 2,

      localRotation: 45,
      mainRotation: 0,

      smallArmRotation: 0,
      largeArmRotation: 0,

      switchLength: 0,

      isAwesome: true,

      smallColor: toRgba(colSmall, 0.682353),
      largeColor: toRgba(colLarge, 0.854902),
      middleColor: "rgb(28, 155, 92)"

      // smallColor: "#51D895"
      // largeColor: "#25CE7B",
      // middleColor: "#1C9B5C"
    }
  };

  handleUpdate = data => {
    this.setState({ data });
  };

  render() {
    const { data } = this.state;

    return (
      <div className="App">
        <Logo data={data} />

        {/* Uncomment to compare with the original */}
        {/* {original} */}

        <DatGui data={data} onUpdate={this.handleUpdate}>
          {/* <DatString path="package" label="Package" /> */}
          <DatNumber path="unit" label="Unit" min={19} max={23} step={0.01} />

          <DatBoolean path="linkArms" label="Link arms" />
          <DatBoolean path="showStuff" label="Show stuff" />

          <DatNumber
            path="translateX"
            label="Translate X"
            min={135}
            max={140}
            step={0.01}
          />
          <DatNumber
            path="translateY"
            label="Translate Y"
            min={135}
            max={140}
            step={0.01}
          />

          <DatNumber
            path="smallDig"
            label="Small dig"
            min={-10}
            max={10}
            step={0.1}
          />
          <DatNumber
            path="largeDig"
            label="Large dig"
            min={-10}
            max={10}
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
            path="switchLength"
            label="Switch length"
            min={-2.7}
            max={2.7}
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

          <DatColor path="smallColor" label="Small Arm Color" />
          <DatColor path="largeColor" label="Large Arm Color" />
          <DatColor path="middleColor" label="Middle Color" />

          {/* <DatBoolean path="isAwesome" label="Awesome?" />*/}
        </DatGui>
      </div>
    );
  }
}

export default App;
