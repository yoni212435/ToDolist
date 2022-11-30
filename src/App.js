import Layout from "./components/Layout";
import { DataProvider } from "./context";


function App() {
  
  return (
    <DataProvider>
    <Layout />
  </DataProvider>
  );
}

export default App;
