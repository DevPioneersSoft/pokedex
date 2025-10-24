import { Outlet } from "react-router-dom";
import Header from "./features/layout/components/Header";

function App() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-400 to-secondary-900 text-white">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
