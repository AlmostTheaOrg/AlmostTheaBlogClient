import { IAppState } from './IAppState';
import { GET_PORTRAITS, EDIT_PORTRAIT, DELETE_PORTRAIT, ADD_PORTRAIT } from '../portraits/portrait.actions';
import { GET_PROJECTS, GET_PROJECT, ADD_PROJECT, EDIT_PROJECT, DELETE_PROJECT } from '../projects/project.actions';
import { IS_AUTHENTICATED, USER_GET, USER_LOGIN, USER_LOGOUT } from '../auth/auth.actions';
import { Project } from '../services/project.service';
import { Portrait } from '../services/portrait.service';
import { SHOULD_SHOW_SPINNER } from '../shared/shared.actions';
import { FEEDBACK_ADD, FEEDBACK_DELETE, FEEDBACK_MARK, FEEDBACK_ALL } from '../contacts/feedback.actions';
import { NotificationType, NOTIFICATION_MESSAGE } from '../shared/shared.actions';

export const DEFAULT_SELECTED_PROJECT: Project = { id: '-1', name: 'empty', thumbnailUrl: 'empty', photos: [] };

const initialState: IAppState = {
	projects: [],
	portraits: [],
	selectedProject: DEFAULT_SELECTED_PROJECT,
	isAuthenticated: false,
	currentUser: null,
	notificationMessage: { message: '', type: NotificationType.Info },
	shouldShowSpinner: false,
	feedbacks: []
};
export function reducer(state: IAppState = initialState, action) {
	switch (action.type) {
		// Portraits actions.
		case GET_PORTRAITS:
			return getPortraits(state, action);
		case ADD_PORTRAIT:
			return addPortrait(state, action);
		case EDIT_PORTRAIT:
			return editPortrait(state, action);
		case DELETE_PORTRAIT:
			return deletePortrait(state, action);
		// Project actions.
		case GET_PROJECTS:
			return getProjects(state, action);
		case GET_PROJECT:
			return getProject(state, action);
		case ADD_PROJECT:
			return addProject(state, action);
		case EDIT_PROJECT:
			return editProject(state, action);
		case DELETE_PROJECT:
			return deleteProject(state, action);
		// Auth actions:
		case IS_AUTHENTICATED:
			return isAuthenticated(state, action);
		case USER_GET:
			return userGet(state, action);
		case USER_LOGIN:
			return setUser(state, action);
		case USER_LOGOUT:
			return setUser(state, action);
		// Feedback Actions:
		case FEEDBACK_ADD:
			return addFeedback(state, action);
		case FEEDBACK_MARK:
			return markFeedback(state, action);
		case FEEDBACK_ALL:
			return allFeedback(state, action);
		case FEEDBACK_DELETE:
			return deleteFeedback(state, action);
		// Global Actions:
		case NOTIFICATION_MESSAGE:
			return setNotificationMessage(state, action);
		case SHOULD_SHOW_SPINNER:
			return updateSpinner(state, action);
		default:
			return state;
	}
}

// Auth actions.
function isAuthenticated(state: IAppState, action) {
	return Object.assign({}, state, {
		isAuthenticated: action.isAuthenticated
	});
}

function userGet(state: IAppState, action) {
	return Object.assign({}, state, {
		currentUser: action.user
	});
}

function setUser(state: IAppState, action) {
	return Object.assign({}, state, {
		currentUser: action.user,
		isAuthenticated: action.isAuthenticated
	});
}

// -----------------
// Project actions.
function getProjects(state: IAppState, action) {
	return Object.assign({}, state, {
		projects: action.projects
	});
}

function getProject(state: IAppState, action) {
	return Object.assign({}, state, {
		selectedProject: action.project
	});
}

function addProject(state: IAppState, action) {
	const projects = state.projects.slice();
	projects.push(action.project);

	return Object.assign({}, state, {
		projects: projects
	});
}

function editProject(state: IAppState, action) {
	return Object.assign({}, state, {
		selectedProject: action.project
	});
}

function deleteProject(state: IAppState, action) {
	const projects = Object.assign([], state.projects);
	const index = projects.findIndex(p => p.id === action.id);
	projects.splice(index, 1);

	return Object.assign({}, state, {
		projects: projects
	});
}

// -----------------
// Portraits actions.
function getPortraits(state: IAppState, action) {
	return Object.assign({}, state, {
		portraits: action.portraits
	});
}

function addPortrait(state: IAppState, action) {
	const portraits: Portrait[] = new Array(...state.portraits);
	portraits.push(action.portrait);

	return Object.assign({}, state, {
		portraits: portraits
	});
}

function editPortrait(state: IAppState, action) {
	const portraits: Portrait[] = new Array(...state.portraits);
	const index = portraits.findIndex(p => p.id === action.portrait.id);
	portraits[index] = action.portrait;
	return Object.assign({}, state, {
		portraits: portraits
	});
}

function deletePortrait(state: IAppState, action) {
	return Object.assign({}, state, {
		portraits: state.portraits.filter(p => p.id !== action.id)
	});
}

// -----------------
// FeedbackActions
function addFeedback(state: IAppState, action) {
	const feedbacks = new Array(...state.feedbacks);
	feedbacks.push(action.feedback);

	return Object.assign({}, state, { feedbacks });
}

function markFeedback(state: IAppState, action) {
	const feedbacks = new Array(...state.feedbacks);
	const index = feedbacks.findIndex((f) => f.id === action.id);
	feedbacks[index] = Object.assign({}, feedbacks[index], { isRead: true });

	return Object.assign({}, state, { feedbacks });
}

function allFeedback(state: IAppState, action) {
	return Object.assign({}, state, { feedbacks: action.feedbacks });
}

function deleteFeedback(state: IAppState, action) {
	const feedbacks = new Array(...state.feedbacks);
	const index = feedbacks.findIndex((f) => f.id === action.id);
	feedbacks.splice(index, 1);

	return Object.assign({}, state, { feedbacks });
}

// -----------------
// Global actions
function setNotificationMessage(state: IAppState, action) {
	return Object.assign({}, state, {
		notificationMessage: { message: action.message, type: action.notificationType }
	});
}

function updateSpinner(state: IAppState, action) {
	return Object.assign({}, state, {
		shouldShowSpinner: action.shouldShowSpinner
	});
}
