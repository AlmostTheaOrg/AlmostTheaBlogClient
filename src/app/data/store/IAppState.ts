import { User } from '../../data/models/User';
import { Project } from '../../services/project.service';
import { Portrait } from '../../services/portrait.service';
import { Feedback } from '../../services/feedback.service';
import { NotificationMessage } from '../../shared/shared.actions';

export interface IAppState {
	portraits: Portrait[];

	projects: Project[];

	selectedProject: Project;

	isAuthenticated: boolean;

	currentUser: User;

	notificationMessage: NotificationMessage;
	feedbacks: Feedback[];
}
