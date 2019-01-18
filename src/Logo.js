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
      largeArmRotation,
      smallColor,
      largeColor,
      middleColor
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

    const old = (
      <g id="all_small" transform={mainTransform}>
        {transforms.map((trans, i) => (
          <use key={i} href="#lshape" transform={trans} />
        ))}
      </g>
    );

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
            <use fill={smallColor} href="#shape_small" />
            <use fill={largeColor} href="#shape_large" />
            <use
              fill={middleColor}
              href="#shape_large"
              clipPath="url(#mask_small)"
            />
          </g>

          <g id="all_small" transform={mainTransform}>
            {transforms.map((trans, i) => (
              <use
                key={i}
                fill="#51D895"
                href="#shape_small"
                transform={trans}
              />
            ))}
          </g>

          <g id="all_large" transform={mainTransform}>
            {transforms.map((trans, i) => (
              <use
                key={i}
                fill="#25CE7B"
                href="#shape_large"
                transform={trans}
              />
            ))}
          </g>

          <clipPath id="all_mask_small">
            <use href="#all_small" />
          </clipPath>
        </defs>

        {old}

        {/* <use href="#all_small" />
        <use href="#all_large" />

        <use fill="#1C9B5C" href="#all_large" clipPath="url(#all_mask_small)" /> */}
      </svg>
    );
  }
}

export default Logo;
