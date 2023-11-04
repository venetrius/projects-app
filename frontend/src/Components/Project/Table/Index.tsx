import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Project } from '../../../types';

const columns: ColumnsType<Project> = [
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
    },
    {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
    }
];

const data: Project[] = [
    {
        "id": 1,
        "name": "projects_app",
        "description": "A simple application to create and store project ideas.",
        "technologies": [
            "Laravel",
            "PSQL",
            "React",
            "TypeScript"
        ],
        "expected_length": "1day",
        "is_active": true,
        "created_at": "2023-11-04T00:00:00.000000Z",
        "updated_at": "2023-11-04T00:00:00.000000Z"
    }
]

const ProjectTable: React.FC = (p) => {
    return <Table columns={columns} dataSource={data} />;
};

export default ProjectTable;
