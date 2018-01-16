export class ProjectPhotoListViewModel {
	constructor(public imageSrc: string,
		public previous?: ProjectPhotoListViewModel,
		public next?: ProjectPhotoListViewModel) {
	}
}
