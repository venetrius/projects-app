import { Table } from 'antd';
import { useProjectList } from '../../../context/projectList';
import { useEffect } from 'react';
import { columns } from './types';

const ProjectTable: React.FC = () => {
    const { projects, fetchProjects, pagination } = useProjectList();
    const { current, pageSize } = pagination;

    useEffect(() => {
        fetchProjects({page: current, pageSize});
      }, [fetchProjects, pagination.current, pagination.pageSize]);
      
      const handleTableChange = (params: any) => {
        fetchProjects({page: params.current, pageSize: params.pageSize});
      };
      
      return (
        <Table
          columns={columns}
          dataSource={projects}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            pageSizeOptions: ['3', '5', '10', '20'],
            showSizeChanger : true,
          }}
          onChange={handleTableChange}
        />
      );
        }

export default ProjectTable;
