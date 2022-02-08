import NxWelcome from './nx-welcome';
import { Blocks } from '@nx-workspace/blocks';

export function App() {
  return (
    <>
      <NxWelcome title="editor" />
      <Blocks />
      <div />
    </>
  );
}

export default App;
