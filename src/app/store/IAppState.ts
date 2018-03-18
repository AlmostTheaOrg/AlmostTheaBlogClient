import { User } from '../data/models/User';
import { Portrait } from '../data/models/Portrait';
import { Project } from '../services/project.service';

export interface IAppState {
	portraits: Portrait[];

	projects: Project[];

	selectedProject: Project;

	isAuthenticated: boolean;

	currentUser: User;

	globalErrorMessage: string;
}
