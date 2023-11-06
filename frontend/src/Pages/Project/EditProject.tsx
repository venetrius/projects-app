import { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import Select from "antd/es/select";
import { ProjectForm } from '../../types';
import { useProject } from '../../context/project';
import { Link, useParams } from 'react-router-dom';
import { Typography } from 'antd';
import Header from '../../Components/Header';

const { Title } = Typography;

const EditProject = () => {
    const [form] = Form.useForm();
    const { project, fetchProject, updateProject } = useProject();

    const { id } = useParams<{ id: string }>();
    const projectId = Number(id);

    useEffect(() => {
        fetchProject(projectId);
    }, [id, fetchProject]);

    const onFinish = (values: any) => {
        const updatedProject: ProjectForm = {
            name: values.name,
            description: values.description,
            expected_length: values.expected_length,
            technologies: values.technologies?.map((tech: any) => tech.value),
        };

        updateProject(projectId, updatedProject);
    };

    if (!project) return (<div>Loading...</div>);

    return (
        <>
            <Header />
            <Title>Edit Project</Title>
            <Link to={'/'}>Back to projects</Link>
            <Form
                form={form}
                name="editProject"
                onFinish={onFinish}
                initialValues={{
                    name: project.name,
                    description: project.description,
                    expected_length: project.expected_length,
                    technologies: project.technologies.map((tech: string) => ({ label: tech, value: tech })),
                }}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input project name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input project description!' }]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    label="Expected Length"
                    name="expected_length"
                    rules={[{ required: true, message: 'Please input expected length! (e.g.: 2 hours, 1 day etc.' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Technologies" name="technologies" rules={[]}>
                    <Select
                        mode="tags"
                        labelInValue
                        style={{ width: '100%' }}
                        placeholder="Select technologies or type to add new"
                    >
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Update Project
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default EditProject;
