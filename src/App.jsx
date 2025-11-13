import React, { useState } from "react";
import "./App.css";
import Service_Provider from "./pages/service_provider/Service_Provider";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
      </div>

      <div style={{ borderTop: "2px solid #ddd", marginTop: "40px", paddingTop: "20px" }}>
        <h2 style={{ textAlign: "center", color: "#333" }}>Labbi Provider Dashboard</h2>
        <Service_Provider />
      </div>
    </>
  );
}

export default App;
