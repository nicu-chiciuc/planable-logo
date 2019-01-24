import React from "react";

class Logo extends React.Component {
  render() {
    const { props } = this;
    const { data } = props;

    let {
      unit,
      linkArms,
      showStuff,
      smallDig,
      largeDig,
      middleDist,
      localRotation,
      mainRotation,
      smallArmRotation,
      largeArmRotation,
      smallColor,
      largeColor,
      switchLength,
      middleColor
    } = data;

    const u = unit;

    const [initialSmallDig, initialLargeDig] = [smallDig, largeDig];

    // smallDig -= switchLength;
    // largeDig += switchLength;

    //

    const duration = 3600;
    const current = (props.time % duration) / duration;
    const angle = current * 180;

    const diff = initialLargeDig - initialSmallDig;

    if (angle < 90) {
      smallDig = initialSmallDig + current * diff * 2;
      largeDig = initialLargeDig - current * diff * 2;
    } else {
      smallDig = initialSmallDig + (1 - current) * diff * 2;
      largeDig = initialLargeDig - (1 - current) * diff * 2;
    }

    // console.log((current * 100).toFixed(2));

    const switchRotation = -angle;

    //

    if (linkArms) {
      // smallDig = (largeDig * largeDig) / (middleDist * Math.sqrt(2) + largeDig);
      // smallDig = largeDig - middleDist * Math.sqrt(2);
      largeDig = smallDig + middleDist * Math.sqrt(2);
    }

    const smallCircleDir = smallDig > 0 ? 1 : 0;
    const longCircleDir = largeDig > 0 ? 1 : 0;

    const newSmall = `
      M ${u} 0
      A ${u} ${u} 0 0 ${smallCircleDir} ${-u} 0
      L ${-u} ${-u * smallDig} 
      A ${u} ${u} 0 0 ${smallCircleDir} ${u} ${-u * smallDig}
    `;

    const newLarge = `
      M 0 ${u}
      A ${u} ${u} 0 0 ${longCircleDir} 0 ${-u}
      L ${u * largeDig} ${-u}
      A ${u} ${u} 0 0 ${longCircleDir} ${u * largeDig} ${u}
    `;

    const mainTransform = `translate(${data.translateX} ${
      data.translateY
    }) scale(0.97 0.97) rotate(${mainRotation + switchRotation})`;

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

    const Dot = ({ x, y }) => {
      return <circle cx={x} cy={y} fill="black" r="3" />;
    };

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

            {showStuff && (
              <>
                <Dot key="mid" x={0} y={0} />
                <Dot key="small" x={0} y={-u * smallDig} />
                <Dot key="big" x={u * largeDig} y={0} />

                <line
                  x1={-u * largeDig}
                  y1={-u * smallDig * 2}
                  x2={u * largeDig * 2}
                  y2={u * smallDig}
                  stroke="black"
                />
              </>
            )}
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
