import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Experience from './Pages/Experience/Experience';
import About from './Pages/About/About';
import Playground from './Pages/Playground/Playground';
import Projects from './Pages/Projects/Projects';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/About" element={ <About/> } />
        <Route path="/Experience" element={ <Experience/> } />
        <Route path="/Playground" element={ <Playground/> } />
        <Route path="/Projects" element={ <Projects/> } />

      </Routes>
    </div>
  )
}

export default App