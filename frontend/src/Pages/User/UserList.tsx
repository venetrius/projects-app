import { Input, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import Header from '../../Components/Header';

const { Title } = Typography;

type UserType = {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
};

const columns: ColumnsType = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: true,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        sorter: true,
    },
    {
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'created_at',
        sorter: true,
    },
    {
        title: 'Updated At',
        dataIndex: 'updated_at',
        key: 'updated_at',
        sorter: true,
    },
];

const UsersPage: React.FC = () => {
    const [pageSize, setPageSize] = useState(10);
    const [users, setUsers] = useState<UserType[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);

    console.log({ users, setUsers, pageSize, setPageSize })
    const fetchUsers = async () => {
        const response = await fetch('http://localhost:8000/api/users')
        const users = await response.json();
        setUsers(users);
        setFilteredUsers(users);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <Header />
            <Title>Users</Title>
            <Input
                placeHolder="search by name"
                onChange={(e: any) => {
                    const { value } = e.target;
                    if (!value) return setFilteredUsers(users);
                    const filteredUsers = users.filter(user => user.name.includes(value));
                    setFilteredUsers(filteredUsers);
                }}
            />
            <Table
                columns={columns}
                dataSource={filteredUsers}
                pagination={{
                    pageSizeOptions: ['3', '5', '10', '20'],
                    showSizeChanger: true,
                }}
            />
        </>

    );
}

export default UsersPage;
