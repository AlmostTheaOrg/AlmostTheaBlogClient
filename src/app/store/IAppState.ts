import { Project } from '../data/models';
import { User } from '../data/models/User';
import { Portrait } from '../data/models/Portrait';

export interface IAppState {
	portraits: Portrait[];

	projects: Project[];

	selectedProject: Project;

	isAuthenticated: boolean;

	currentUser: User;

	globalErrorMessage: string;
}
