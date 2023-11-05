import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import { ProjectListProvider } from './context/projectList';
import NewProject from './Pages/NewProject';
import { ProjectProvider } from './context/project';

function App() {
  return (
    <ProjectListProvider>
      <ProjectProvider>
        <Router>
          <Routes>
            <Route path="/projects/new" element={<NewProject />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </Router>
      </ProjectProvider>
    </ProjectListProvider>
  );
}

export default App;
