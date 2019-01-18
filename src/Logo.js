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
      mainRotation,
      smallArmRotation,
      largeArmRotation
    } = data;

    const newSmall = `
      M ${u} 0
      A ${u} ${u} 0 0 1 ${-u} 0
      L ${-u} ${-u * smallDig} 
      A ${u} ${u} 0 0 1 ${u} ${-u * smallDig}
    `;

    const newLarge = `
      M 0 ${u}
      A ${u} ${u} 0 0 1 0 ${-u}
      L ${u * largeDig} ${-u}
      A ${u} ${u} 0 0 1 ${u * largeDig} ${u}
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
          <path
            id="shape_small"
            d={newSmall}
            transform={`rotate(${smallArmRotation})`}
          />
          <path
            id="shape_large"
            d={newLarge}
            transform={`rotate(${largeArmRotation})`}
          />

          <clipPath id="mask_small">
            <use href="#shape_small" />
          </clipPath>

          <g id="lshape">
            <use fill="#51D895" href="#shape_small" />
            <use fill="#25CE7B" href="#shape_large" />
            <use
              fill="#1C9B5C"
              href="#shape_large"
              clip-path="url(#mask_small)"
            />
          </g>
        </defs>

        <g id="all_small" transform={mainTransform}>
          {transforms.map((trans, i) => (
            <use key={i} fill="#51D895" href="#shape_small" transform={trans} />
          ))}
        </g>

        <g id="all_large" transform={mainTransform}>
          {transforms.map((trans, i) => (
            <use key={i} fill="#25CE7B" href="#shape_large" transform={trans} />
          ))}
        </g>

        <use fill="#1C9B5C" href="#all_large" clip-path="url(#all_small)" />

        {/* <g transform={mainTransform}>
          {transforms.map((trans, i) => (
            <use key={i} fill="#51D895" href="#shape_small" />
          ))}
        </g> */}
      </svg>
    );
  }
}

export default Logo;
