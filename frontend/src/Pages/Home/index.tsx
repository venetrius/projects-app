import React from 'react';
import { Link } from 'react-router-dom';
import ProjectTable from '../../Components/Project/Table/Index';
import { Button, Col, Row, Typography } from 'antd';

const { Title } = Typography;


const Home: React.FC = () => {
    return (<>
        <Title>Projects</Title>
        <ProjectTable />
        <Link to={'/projects/new'}>
            <Button type="primary">Create new project</Button>
        </Link>
    </>)
};

export default Home;
