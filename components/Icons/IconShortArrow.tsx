import Svg, { G, Path } from "react-native-svg";

interface Props {
  fill?: string;
  width?: string;
  height?: string;
  direction?: "up" | "down" | "left" | "right";
}

export default function IconShortArrow({
  fill = "#000",
  width = "100",
  height = "100",
  direction = "up",
}: Props) {
  const rotationDegrees = {
    up: 0,
    right: 90,
    down: 180,
    left: 270,
  }[direction];

  return (
    <Svg width={width} height={height} viewBox="0 0 20 20">
      <G transform={`rotate(${rotationDegrees} 10 10)`}>
        <Path
          d="M223.707692,6534.63378 L223.707692,6534.63378 C224.097436,6534.22888 224.097436,6533.57338 223.707692,6533.16951 L215.444127,6524.60657 C214.66364,6523.79781 213.397472,6523.79781 212.616986,6524.60657 L204.29246,6533.23165 C203.906714,6533.6324 203.901717,6534.27962 204.282467,6534.68555 C204.671211,6535.10081 205.31179,6535.10495 205.70653,6534.69695 L213.323521,6526.80297 C213.714264,6526.39807 214.346848,6526.39807 214.737591,6526.80297 L222.294621,6534.63378 C222.684365,6535.03868 223.317949,6535.03868 223.707692,6534.63378"
          transform="translate(-204, -6523)"
          fill={fill}
        />
      </G>
    </Svg>
  );
}
