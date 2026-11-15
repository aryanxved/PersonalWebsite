import { Location, Route, Routes, useLocation } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Experience from './Pages/Experience/Experience';
import About from './Pages/About/About';
import Playground from './Pages/Playground/Playground';
import Projects from './Pages/Projects/Projects';
import { ThemeProvider } from './theme/ThemeContext';
import { featureFlags } from './featureFlags';
import { EducationDialog, ExperienceDialog, ProjectDialog } from './Components/Detail/DetailDialog';

export interface DetailLocationState {
  /** The page the detail was opened from; it stays rendered under the dialog. */
  backgroundLocation?: Location;
}

function AppRoutes() {
  const location = useLocation();
  const backgroundLocation = (location.state as DetailLocationState | null)?.backgroundLocation;

  return (
    <>
      {/* Page layer: when a detail was opened from the grid, keep showing the page it came from. */}
      <Routes location={backgroundLocation ?? location}>
        <Route path="/" element={<Home />} />
        {/* Direct visits to a detail URL render Home underneath the dialog. */}
        <Route path="/experience/:id" element={<Home />} />
        <Route path="/projects/:id" element={<Home />} />
        <Route path="/education/:id" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Experience" element={<Experience />} />
        <Route path="/Playground" element={<Playground />} />
        <Route path="/Projects" element={<Projects />} />
      </Routes>

      {/* Dialog layer: always matches the real URL. */}
      <Routes>
        <Route path="/experience/:id" element={<ExperienceDialog />} />
        <Route path="/projects/:id" element={featureFlags.projectPopups ? <ProjectDialog /> : null} />
        <Route path="/education/:id" element={<EducationDialog />} />
        <Route path="*" element={null} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <AppRoutes />
      </div>
    </ThemeProvider>
  );
}

export default App;
