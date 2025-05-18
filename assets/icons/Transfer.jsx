import * as React from "react";
import Svg, { Circle, Path, Rect } from "react-native-svg";

const TransferIcon = (props) => (
  <Svg width={32} height={32} viewBox="0 0 32 32" {...props}>
    <Circle cx={16} cy={16} r={16} fill="#325BAF" />
    <Path
      d="M8,0a8,8,0,1,0,8,8A8.009,8.009,0,0,0,8,0ZM2,8A5.961,5.961,0,0,1,3.115,4.529l8.356,8.356A5.99,5.99,0,0,1,2,8Zm10.885,3.471L4.529,3.115a5.991,5.991,0,0,1,8.356,8.356Z"
      fill="#9AC0FA"
      transform="translate(8 8)"
    />
    <Rect
      width={11.8}
      height={2}
      fill="#F1F3F4"
      transform="rotate(45 16.757 6.757)"
    />
  </Svg>
);

export default TransferIcon; 