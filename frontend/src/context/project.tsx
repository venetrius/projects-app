import { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { Project, ProjectForm } from "../types";
import { API_URL } from "./settings";

type ProjecProviderProps = {
    children: ReactNode;
};

type ProjectContextType = {
    project: Project | null;
    fetchProject: (projectId : number) => void;
    createProject: (project: ProjectForm) => void;
  };

const ProjectContext = createContext<ProjectContextType | null>(null);

const ProjectProvider: React.FC<ProjecProviderProps> = ({ children }) => {
    const [project, setProject] = useState<Project | null>(null);

    async function fetchProject(projectId: number): Promise<void> {
        const response = await fetch(`${API_URL}/projects/${projectId}`);
        try {
            const project = await response.json();
            setProject(project);
            // Handle success
        } catch (error) {
            // TODO: Handle error
            console.error(error);
        }
    }

    async function createProject(project: ProjectForm): Promise<void> {
        const response = await fetch(`${API_URL}/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        });
        try {
            const project = await response.json();
            setProject(project);
        } catch (error) {
            console.error(error);
            // TODO: Handle error
        }
    }

    const providerValue = useMemo(() => ({ project, fetchProject, createProject }), [project]);

    return (
        <ProjectContext.Provider value={providerValue}>
            {children}
        </ProjectContext.Provider>
    );
};

const useProject = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error('useProject must be used within a ProjectProvider');
    }
    return context;
};

export { ProjectProvider, useProject };