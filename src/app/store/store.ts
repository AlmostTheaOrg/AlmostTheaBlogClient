import {
	createStore,
	applyMiddleware,
	compose,
	StoreEnhancer
} from 'redux';
import { reducer } from './reducer';
import { IAppState } from './IAppState';
import freezeState from './deepFreeze';

declare var window: any;
const devToolsExtension: StoreEnhancer = (window.devToolsExtension)
	? window.devToolsExtension() : (f) => f;

export const store = createStore(
	reducer,
	compose(applyMiddleware(freezeState), devToolsExtension) as StoreEnhancer);
