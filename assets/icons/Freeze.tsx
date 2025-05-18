import * as React from 'react';
import Svg, { G, Circle, Path, Rect, Defs, ClipPath } from 'react-native-svg';

const Freeze = (props) => (
  <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
    <Defs>
      <ClipPath id="a">
        <Rect width={25} height={8} fill="#fff" transform="translate(-209 321)" />
      </ClipPath>
    </Defs>
    <G transform="translate(213 -305)">
      <Circle cx={16} cy={16} r={16} fill="#325baf" transform="translate(-213 305)" />
      <Path
        d="M17 7.437h-2.264l1.023-1.537-1.768-1.175-1.809 2.712H9.562V4.376l2.6-1.3-.949-1.9L9.562 2V0H7.437v2l-1.65-.824-.949 1.9 2.6 1.3v3.061H4.818L3.009 4.725 1.241 5.9l1.023 1.537H0v2.125h2.265L1.241 11.1l1.768 1.179 1.81-2.716h2.62v2.619l-2.715 1.811 1.177 1.768 1.535-1.024V17h2.125v-2.264l1.538 1.025 1.18-1.768-2.719-1.613V9.563h2.619l1.81 2.716 1.177-1.768-1.024-1.537H17z"
        fill="#9ac0fa"
        transform="translate(-197.23 308.916) rotate(45)"
      />
      <G clipPath="url(#a)">
        <Path
          d="M17 7.437h-2.264l1.023-1.537-1.768-1.175-1.809 2.712H9.562V4.376l2.6-1.3-.949-1.9L9.562 2V0H7.437v2l-1.65-.824-.949 1.9 2.6 1.3v3.061H4.818L3.009 4.725 1.241 5.9l1.023 1.537H0v2.125h2.265L1.241 11.1l1.768 1.179 1.81-2.716h2.62v2.619l-2.715 1.811 1.177 1.768 1.535-1.024V17h2.125v-2.264l1.538 1.025 1.18-1.768-2.719-1.613V9.563h2.619l1.81 2.716 1.177-1.768-1.024-1.537H17z"
          fill="#f1f3f4"
          transform="translate(-197.23 308.916) rotate(45)"
        />
      </G>
    </G>
  </Svg>
);

export default Freeze; 