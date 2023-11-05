import { useState } from 'react';
import { Form, Input, Button, Typography, Row, Col } from 'antd';
import Select from "antd/es/select";
import { ProjectForm } from '../../types';
import { useProject } from '../../context/project';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header';

const { Title } = Typography;

const NewProject = () => {
    const [form] = Form.useForm();
    const { createProject, generateProject } = useProject();
    const [project, setProject] = useState<ProjectForm>({
        name: '',
        description: '',
        expected_length: '',
        technologies: [],
    });

    const onFinish = (values: any) => {
        const newProject: ProjectForm = {
            name: values.name,
            description: values.description,
            expected_length: values.expected_length,
            technologies: values.technologies.map((tech: any) => tech.value),
        };
        setProject(newProject);
        createProject(newProject);
        // TODO handle error
        form.resetFields();
    };

    const handleGenerateProject = async () => {
        const generatedProject = await generateProject();
        if (!generatedProject) return;

        const technologies = generatedProject.technologies?.map((tech: any) => ({ value: tech, label: tech }));

        form.setFieldsValue(generatedProject);
        form.setFieldValue('technologies', technologies);
    }

    return (
        <div>
            <Header />
            <Title>Create New Project</Title>

            <br />
            <Link to={'/'}>Back to projects</Link>
            <br /><br />

            <Button type="primary" onClick={handleGenerateProject}>
                Generate Project
            </Button>
            <br />

            <Form
                form={form}
                name="newProject"
                onFinish={onFinish}
                initialValues={{ is_active: false }}
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
                        {/* Add populat techs to be selected */}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create Project
                    </Button>
                </Form.Item>
            </Form>

            {project.name !== "" && (
                <div>
                    <h2>New Project Created:</h2>
                    <p>Name: {project.name}</p>
                    <p>Description: {project.description}</p>
                    <p>Expected Length: {project.expected_length}</p>
                    <p>Technologies: {project.technologies.join(', ')}</p>
                </div>
            )}
        </div>
    );
};

export default NewProject;
