import { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { Project } from "../types";
import { API_URL } from "./settings";

type ProjectListProviderProps = {
    children: ReactNode;
};

type ProjectListContextType = {
    projects: Project[];
    fetchProjects: () => void;
  };

const ProjectListContext = createContext<ProjectListContextType | null>(null);

const ProjectListProvider: React.FC<ProjectListProviderProps> = ({ children }) => {
    const [projects, setProjects] = useState<Project[]>([]);

    async function fetchProjects(): Promise<void> {
        const response = await fetch(`${API_URL}/projects`);
        try {
            const projects = await response.json();
            setProjects(projects);
        } catch (error) {
            // TODO: Handle error
            console.error(error);
        }
    }
    const providerValue = useMemo(() => ({ projects, fetchProjects }), [projects]);

    return (
        <ProjectListContext.Provider value={providerValue}>
            {children}
        </ProjectListContext.Provider>
    );
};

const useProjectList = () => {
    const context = useContext(ProjectListContext);
    if (!context) {
        throw new Error('useProjectList must be used within a ProjectListProvider');
    }
    return context;
};

export { ProjectListProvider, useProjectList };