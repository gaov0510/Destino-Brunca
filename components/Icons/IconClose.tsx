import Svg, { Path } from "react-native-svg";

interface Props {
  fill?: string;
  width?: string | number;
  height?: string | number;
}

export default function IconClose({
  fill = "#000000",
  width = 80,
  height = 80,
}: Props) {
  return (
    <Svg width={width} height={height} viewBox="-0.5 0 25 25" fill="none">
      <Path
      d="M3 21.32L21 3.32001"
      stroke={fill}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      />
      <Path
      d="M3 3.32001L21 21.32"
      stroke={fill}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      />
    </Svg>
  );
}
