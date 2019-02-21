import * as React from "react";
import styled from "styled-components";

function calculateSectors(size, percentage, offset) {
  var dataPie = {
    size: size,
    sectors: [
      {
        percentage: percentage,
        label: "Thing 1"
      }
    ]
  };

  var sectors = [];
  var colors = ["#61C0BF", "#DA507A", "#BB3D49", "#DB4548"];

  var l = dataPie.size / 2;
  var a = 0; // Angle
  var aRad = 0; // Angle in Rad
  var z = 0; // Size z
  var x = 0; // Side x
  var y = 0; // Side y
  var X = 0; // SVG X coordinate
  var Y = 0; // SVG Y coordinate
  var R = 0; // Rotation

  dataPie.sectors.map(function(item, key) {
    a = 360 * item.percentage;
    var aCalc = a > 180 ? 360 - a : a;
    aRad = (aCalc * Math.PI) / 180;
    z = Math.sqrt(2 * l * l - 2 * l * l * Math.cos(aRad));
    if (aCalc <= 90) {
      x = l * Math.sin(aRad);
    } else {
      x = l * Math.sin(((180 - aCalc) * Math.PI) / 180);
    }

    y = Math.sqrt(z * z - x * x);
    Y = y;

    var arcSweep = 0;

    if (a <= 180) {
      X = l + x;
      arcSweep = 0;
    } else {
      X = l - x;
      arcSweep = 1;
    }

    X = X + offset.X;
    Y = Y + offset.Y;
    sectors.push({
      percentage: item.percentage,
      label: item.label,
      color: colors[key],
      arcSweep: arcSweep,
      L: l,
      X: X,
      Y: Y,
      R: R
    });

    R = R + a;
  });

  return sectors;
}

const style: React.CSSProperties = {
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  color: "#8855FF",
  background: "rgba(136, 85, 255, 0.2)",
  overflow: "hidden"
};

const outlineOffset = styled.path`
  outline-color: rgb(0, 0, 255);
  outline-style: solid;
  outline-width: 10px;
  outline-offset: -20px;
`;

// Define type of property
interface Props {
  text: string;
  color: string;
  strokeColor: string;
  percentage: number;
}

export class PieSegments extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    text: "Hello World!",
    color: "#000",
    strokeColor: "#000",
    percentage: 0.1
  };

  // Items shown in property panel
  /*
  static propertyControls: PropertyControls = {
    text: { type: ControlType.String, title: "Text" },
    color: { type: ControlType.Color, title: "Color" },
    strokeColor: { type: ControlType.Color, title: "Stroke Color" },
    percentage: { type: ControlType.Number, title: "Percentage", min: 0, max: 1, step: 0.01 }
  }
  */
  render() {
    var sectorsArray = calculateSectors(200, this.props.percentage, {
      X: 0,
      Y: 0
    });
    var sectorsStrokeArray = calculateSectors(200, this.props.percentage, {
      X: 0,
      Y: 0
    });

    const filter1 = {
      filter: `url(#filter1)`
    };
    const filter2 = {
      filter: `url(#filter2)`
    };
    const filter2turbo = {
      filter: `url(#filter2turbo)`
    };
    const filter3 = {
      filter: `url(#filter3)`
    };

    return (
      <div className="svg-container">
        <svg
          version="1.1"
          viewBox="0 0 200 200"
          preserveAspectRatio="xMinYMin meet"
          className="svg-content"
        >
          <defs>
            <filter
              id="filter1"
              filterUnits="userSpaceOnUse"
              x="0"
              y="0"
              height="200"
              width="200"
            >
              <feTurbulence
                baseFrequency="0.2"
                numOctaves="3"
                type="fractalNoise"
              />
              <feDisplacementMap
                scale="2"
                xChannelSelector="R"
                in="SourceGraphic"
              />
            </filter>
            <filter
              id="filter2"
              filterUnits="userSpaceOnUse"
              x="0"
              y="0"
              height="280"
              width="280"
            >
              <feTurbulence
                type="turbulence"
                baseFrequency="0.4"
                numOctaves="1"
                result="turbulence"
              />
              <feDisplacementMap
                in2="turbulence"
                in="SourceGraphic"
                scale="16"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
            <filter
              id="filter2turbo"
              filterUnits="userSpaceOnUse"
              x="0"
              y="0"
              height="280"
              width="280"
            >
              <feTurbulence
                type="turbulence"
                baseFrequency="0.2"
                numOctaves="1"
                result="turbulence"
              />
              <feDisplacementMap
                in2="turbulence"
                in="SourceGraphic"
                scale="3"
                xChannelSelector="R"
              />
            </filter>
            <filter
              id="filter3"
              filterUnits="userSpaceOnUse"
              x="0"
              y="0"
              height="280"
              width="280"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.6"
                numOctaves="1"
              />
              <feDisplacementMap
                in="SourceGraphic"
                scale="3"
                xChannelSelector="R"
              />
            </filter>
          </defs>

          <g transform="translate(0,0)">
            {sectorsArray.map((item, i) => (
              <path
                key={`page-${i}`}
                fill="=#ffffff"
                stroke="#ffffff"
                strokeWidth="4"
                d={`M${item.L},${item.L} L${item.L},0 A${item.L},${
                  item.L
                } 1 0,1 ${item.X}, ${item.Y} Z`}
                style={filter1}
              />
            ))}

            {sectorsArray.map((item, i) => (
              <path
                key={`pageA-${i}`}
                fill={this.props.color}
                d={`M${item.L},${item.L} L${item.L},0 A${item.L},${
                  item.L
                } 1 0,1 ${item.X}, ${item.Y} Z`}
                style={filter2turbo}
              />
            ))}
          </g>
        </svg>
      </div>
    );
  }
}

/*

        <!--
        //<path fill="#61C0BF" d="M${},<radius> L<radius>,0 A<radius>,<radius> 1 0,1 <X>, <Y> z"></path>
    -->

*/
