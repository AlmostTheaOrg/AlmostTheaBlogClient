import { Image, Project } from '../data/models';
import { User } from '../data/models/User';

export interface IAppState {
	portraits: Image[];

	projects: Project[];

	selectedProject: Project;

	isAuthenticated: boolean;

	currentUser: User;
}
