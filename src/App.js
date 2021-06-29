import { ChakraProvider, Flex } from "@chakra-ui/react";

import Layout from "./Layout";

function App() {
  return (
    <ChakraProvider>
      <Layout />
    </ChakraProvider>
    
  );
}

export default App;
