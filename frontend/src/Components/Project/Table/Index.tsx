import { Button, Table } from 'antd';
import { useProjectList } from '../../../context/projectList';
import { useProject } from '../../../context/project';
import { useEffect } from 'react';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { columns } from './types';
import { Link } from 'react-router-dom';

const ProjectTable: React.FC = () => {
    const { projects, fetchProjects, pagination } = useProjectList();
    const { deleteProject } = useProject();
    const { current, pageSize } = pagination;

    useEffect(() => {
        fetchProjects({ page: current, pageSize });
    }, [fetchProjects, pagination.current, pagination.pageSize]);

    const handleTableChange = (params: any) => {
        fetchProjects({ page: params.current, pageSize: params.pageSize });
    };

    const handleDelete = async (projectId: number) => {
        await deleteProject(projectId);
        fetchProjects({ page: current, pageSize });
    };

    const actions = {
        title: 'Actions',
        key: 'actions',
        render: (props: any) => (
            <>
                <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(props.id)}
                />
                <Link to={`/projects/${props.id}`}>
                    <Button
                        type="text"
                        icon={<EyeOutlined />}
                    />
                </Link>
            </>

        ),
    };

    return (
        <Table
            columns={[...columns, actions]}
            dataSource={projects}
            pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: pagination.total,
                pageSizeOptions: ['3', '5', '10', '20'],
                showSizeChanger: true,
            }}
            onChange={handleTableChange}
        />
    );
}

export default ProjectTable;
