import { Button, Table } from 'antd';
import { useProjectList } from '../../../context/projectList';
import { useProject } from '../../../context/project';
import { useEffect } from 'react';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { columns } from './types';
import { Link } from 'react-router-dom';

// TODO should read query params from url and apply them to the table
const ProjectTable: React.FC = () => {
    const { projects, fetchProjects, pagination, sorters } = useProjectList();
    const { deleteProject } = useProject();
    const { current, pageSize } = pagination;

    useEffect(() => {
        fetchProjects({ page: current, pageSize, sorters });
    }, []);

    const handleTableChange = (params: any, filters: any, sorter: any) => {
        const sorters = Array.isArray(sorter) ? sorter : sorter.column ? [sorter] : [];
        const sortCriteria = sorters.map(s => ({ field: s.field, order: s.order }));
        fetchProjects({ page: params.current, pageSize: params.pageSize, sorters: sortCriteria });
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
