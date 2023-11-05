import { Table } from 'antd';
import { useProjectList } from '../../../context/projectList';
import { useEffect } from 'react';
import { columns } from './types';

const ProjectTable: React.FC = () => {
    const { projects, fetchProjects } = useProjectList();

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    return <Table columns={columns} dataSource={projects} />;
};

export default ProjectTable;
