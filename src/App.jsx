import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

import Layout from './Layout';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
