import { User } from '../data/models/User';
import { Project } from '../services/project.service';
import { Portrait } from '../services/portrait.service';

export interface IAppState {
	portraits: Portrait[];

	projects: Project[];

	selectedProject: Project;

	isAuthenticated: boolean;

	currentUser: User;

	globalErrorMessage: string;

	shouldShowSpinner: boolean;
}
