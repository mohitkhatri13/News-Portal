import "./App.css";
import Home from "./components/Home";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (

    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/category/:category" element={<Home />} />
      </Routes>
    </div>

  );
}

export default App;