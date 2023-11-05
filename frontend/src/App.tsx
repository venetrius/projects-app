import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProjectListProvider } from './context/projectList';
import { ProjectProvider } from './context/project';

import Home from './Pages/Home';
import EditProject from './Pages/EditProject';
import NewProject from './Pages/NewProject';
import { Col, Row } from 'antd';

function App() {
  return (
    <ProjectListProvider>
      <ProjectProvider>

        <Row>

          <Col span={1}></Col>
          <Col span={22}>
            <Router>
              <Routes>
                <Route path="/projects/new" element={<NewProject />} />
                <Route path="/projects/:id" element={<EditProject />} />
                <Route path="/" element={<Home />} />
                <Route path="*" element={<h1>Not Found</h1>} />
              </Routes>
            </Router>
          </Col>

        </Row>

      </ProjectProvider>
    </ProjectListProvider>
  );
}

export default App;
