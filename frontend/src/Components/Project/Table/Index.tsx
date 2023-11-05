import { Button, Table } from 'antd';
import { useProjectList } from '../../../context/projectList';
import { useEffect } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { columns } from './types';

const ProjectTable: React.FC = () => {
    const { projects, fetchProjects, pagination } = useProjectList();
    const { current, pageSize } = pagination;

    useEffect(() => {
        fetchProjects({ page: current, pageSize });
    }, [fetchProjects, pagination.current, pagination.pageSize]);

    const handleTableChange = (params: any) => {
        fetchProjects({ page: params.current, pageSize: params.pageSize });
    };

    const actions = {
        title: 'Actions',
        key: 'actions',
        render: () => (
            <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => alert("deleting record")}
            />
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
