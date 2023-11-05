import { createContext, useCallback, useContext, useState, useMemo, ReactNode } from 'react';
import { Project } from "../types";
import { API_URL } from "./settings";

type ProjectListProviderProps = {
    children: ReactNode;
};

type FetchProjectParams = {
    page?: number;
    pageSize?: number;
  };

type ProjectListContextType = {
    projects: Project[];
    pagination: {
        current: number;
        pageSize: number;
        total: number;
      };
    fetchProjects: (params: FetchProjectParams) => void;
  };

const ProjectListContext = createContext<ProjectListContextType | null>(null);

const ProjectListProvider: React.FC<ProjectListProviderProps> = ({ children }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 3,
        total: 0,
      });

      const fetchProjects = useCallback(async ({page = 1, pageSize = 5}): Promise<void> => {
        const response = await fetch(`${API_URL}/projects?page=${page}&pageSize=${pageSize}`);
        try {
          const { data, total } = await response.json();
          console.log({data});
          setProjects(data);
          setPagination(p => ({ ...p, total, current: page, pageSize }));
        } catch (error) {
          // TODO: Handle error
          console.error(error);
        }
      }, []);

    const providerValue = useMemo(() => ({ projects, fetchProjects, pagination }), [projects, pagination]);

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