import './App.css';
import Home from './Pages/Home';
import { ProjectListProvider } from './context/projectList';

function App() {
  return (
    <ProjectListProvider>
      <Home />
    </ProjectListProvider>
  );
}

export default App;
