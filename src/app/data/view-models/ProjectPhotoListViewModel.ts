export class ProjectPhotoListViewModel {
	constructor(public id: string,
		public imageUrl: string,
		public previous?: ProjectPhotoListViewModel,
		public next?: ProjectPhotoListViewModel) {
	}
}
