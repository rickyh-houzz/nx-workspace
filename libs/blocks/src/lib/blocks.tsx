import { utils } from '@nx-workspace/utils';

/* eslint-disable-next-line */
export interface BlocksProps {}

export function Blocks(props: BlocksProps) {
  return (
    <div>
      <h1>Welcome to Blocks!!!</h1>
      <p>Welcome again</p>
      {utils}
    </div>
  );
}

export default Blocks;
