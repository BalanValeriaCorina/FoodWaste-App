import "./App.css";
import Layout from "./components/Layout";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <div>
      <RecoilRoot>
        <Layout></Layout>
      </RecoilRoot>
    </div>
  );
}

export default App;
