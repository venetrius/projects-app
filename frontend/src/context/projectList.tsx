import { createContext, useCallback, useContext, useState, useMemo, ReactNode } from 'react';
import { Project } from "../types";
import { API_URL } from "./settings";

type ProjectListProviderProps = {
  children: ReactNode;
};

type SorterType = {
  field: string;
  order: string;
};

type FetchProjectParams = {
  page?: number;
  pageSize?: number;
  sorters?: SorterType[];
};

type ProjectListContextType = {
  projects: Project[];
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
  sorters: SorterType[];
  fetchProjects: (params: FetchProjectParams) => void;
};

type ProjectListState = {
  projects: Project[];
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
  sorters: SorterType[];
};

const ProjectListContext = createContext<ProjectListContextType | null>(null);

const ProjectListProvider: React.FC<ProjectListProviderProps> = ({ children }) => {
  const [state, setState] = useState<ProjectListState>({
    projects: [],
    pagination: { current: 1, pageSize: 3, total: 0 },
    sorters: [],
  });

  const { projects, pagination, sorters } = state;

  const fetchProjects = useCallback(async ({ page = 1, pageSize = 5, sorters }: FetchProjectParams): Promise<void> => {
    let sortParams = '';
    console.log({ sorters })
    if (sorters && sorters.length > 0) {
      sortParams = sorters.map(sorter => `sortField[]=${sorter.field}&sortOrder[]=${sorter.order}`).join('&');
    }
    const response = await fetch(`${API_URL}/projects?page=${page}&pageSize=${pageSize}&${sortParams}`);
    try {
      const { data, total } = await response.json();
      console.log({ data });
      setState(s => ({ ...s, projects: data, pagination: { ...s.pagination, total, current: page, pageSize }, sorters: sorters || [] }));
    } catch (error) {
      // TODO: Handle error
      console.error(error);
    }
  }, []);

  const providerValue = useMemo(() => ({ projects, fetchProjects, pagination, sorters }), [projects, pagination, sorters]);

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