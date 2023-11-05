export type Project = {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    expected_length: string;
    technologies: string[];
    is_active: boolean;
}

export type ProjectForm = {
    name: string;
    description: string;
    expected_length: string;
    technologies: string[];
}