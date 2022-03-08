import NxWelcome from './nx-welcome';
import { Blocks } from '@nx-workspace/blocks';

export function App() {
  return (
    <>
      <NxWelcome title="editor" />
      <Blocks />
      <div />
      <h1>123</h1>
    </>
  );
}

export default App;
