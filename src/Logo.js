import React from "react";

class Logo extends React.Component {
  render() {
    const { data } = this.props;

    const u = 22;
    const {
      smallDig,
      largeDig,
      middleDist,
      localRotation,
      mainRotation
    } = data;

    const pathSmall = `
      M 0, 0
      L ${-u}, 0
      A ${u} ${u} 0 0 0 ${-u * 2} ${u}
      L ${-u * 2}, ${-u * smallDig}
      A ${u} ${u} 0 0 1 0 ${-u * smallDig}
    `;

    const pathMid = `
      M 0, 0
      L ${-u}, 0
      A ${u} ${u} 0 1 0 0 ${u}
    `;

    const pathLarge = `
      M 0, 0
      L 0, ${u}
      A ${u} ${u} 0 0 1 ${-u} ${u * 2}
      L ${u * largeDig}, ${u * 2}
      A ${u} ${u} 0 0 0 ${u * largeDig} 0
    `;

    const mainTransform = `translate(${data.translateX} ${
      data.translateY
    }) scale(0.97 0.97) rotate(${mainRotation})`;

    const middleTranslate = u * middleDist;

    const transforms = [
      `translate(${middleTranslate} 0) rotate(${localRotation})`,
      `translate(0 ${middleTranslate}) rotate(${localRotation + 90})`,
      `translate(${-middleTranslate} 0) rotate(${localRotation + 180})`,
      `translate(0 ${-middleTranslate}) rotate(${localRotation + 270})`
    ];

    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="600px">
        <defs>
          <g id="lshape">
            <path fill="#51D895" d={pathSmall} />
            <path fill="#1C9B5C" d={pathMid} />
            <path fill="#25CE7B" d={pathLarge} />
          </g>
        </defs>
        <g transform={mainTransform}>
          {transforms.map((trans, i) => (
            <use key={i} href="#lshape" transform={trans} />
          ))}
        </g>
      </svg>
    );
  }
}

export default Logo;
