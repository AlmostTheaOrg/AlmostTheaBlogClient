import { IAppState } from './IAppState';
import { GET_PORTRAITS, EDIT_PORTRAIT, DELETE_PORTRAIT, ADD_PORTRAIT } from '../portraits/portrait.action';
import { Image } from '../data/models/Image';

export function reducer(state: IAppState, action) {
	switch (action.type) {
		case GET_PORTRAITS:
			return getPortraits(state, action);
		case ADD_PORTRAIT:
			return addPortrait(state, action);
		case EDIT_PORTRAIT:
			return editPortrait(state, action);
		case DELETE_PORTRAIT:
			return deletePortrait(state, action);
		default:
			return state;
	}
}

function getPortraits(state: IAppState, action) {
	return Object.assign({}, state, {
		portraits: action.portraits
	});
}

function addPortrait(state: IAppState, action) {
	const portraits: Image[] = new Array(...state.portraits);
	portraits.push(action.portrait);

	return Object.assign({}, state, {
		portraits: portraits
	});
}

function editPortrait(state: IAppState, action) {
	const portraits: Image[] = new Array(...state.portraits);
	const index = portraits.findIndex(p => p.getId() === action.id);
	portraits[index] = action.portrait;
	return Object.assign({}, state, {
		portraits: portraits
	});
}

function deletePortrait(state: IAppState, action) {
	return Object.assign({}, state, {
		portraits: state.portraits.filter(p => p.getId() !== action.id)
	});
}
