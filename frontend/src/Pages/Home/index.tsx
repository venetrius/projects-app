import React from 'react';
import ProjectTable from '../../Components/Project/Table/Index';
import { ProjectListProvider } from '../../context/projectList';

const Home: React.FC = () => {
    return <ProjectListProvider><ProjectTable /></ProjectListProvider>;
};

export default Home;
