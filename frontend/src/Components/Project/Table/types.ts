import { ColumnsType } from 'antd/es/table';
import { Project } from '../../../types';

export const columns: ColumnsType<Project> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: {
            multiple: 1
        },
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
        render : (props: string[]) =>  props.join(', '),
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
        render: (props: any) => {
            return props.toString()
        }
    },
    {
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'created_at',
        sorter: {
            multiple: 2
        },
    },
    {
        title: 'Updated At',
        dataIndex: 'updated_at',
        key: 'updated_at',
    }
];