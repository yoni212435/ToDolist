import Layout from "./components/Layout";
import { DataProvider } from "./context";


function App() {
 console.log("jkj")
  return (
    <DataProvider>
    <Layout />
  </DataProvider>
  );
}

export default App;
