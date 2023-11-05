import { ColumnsType } from 'antd/es/table';
import { Project } from '../../../types';

export const columns: ColumnsType<Project> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Technologies',
        dataIndex: 'technologies',
        key: 'technologies',
    },
    {
        title: 'Expected Length',
        dataIndex: 'expected_length',
        key: 'expected_length',
    },
    {
        title: 'Is Active',
        dataIndex: 'is_active',
        key: 'is_active',
    },
    {
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'created_at',
    },
    {
        title: 'Updated At',
        dataIndex: 'updated_at',
        key: 'updated_at',
    }
];