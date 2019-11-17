import React from "react";
import RegisterationForm from "./Components/registerationForm";
import "./App.css";

function App() {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <RegisterationForm></RegisterationForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
