import React from 'react';
import { Link } from 'react-router-dom';
import ProjectTable from '../../Components/Project/Table/Index';
import { Button, Col, Row, Typography } from 'antd';
import Header from '../../Components/Header';

const { Title } = Typography;


const Home: React.FC = () => {
    return (<>
        <Header />
        <Title>Projects</Title>
        <ProjectTable />
        <Link to={'/projects/new'}>
            <Button type="primary">Create new project</Button>
        </Link>
    </>)
};

export default Home;
