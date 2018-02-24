export interface MutablePortrait {
	name: string;
	file: File;
}

export interface ImmutablePortrait {
	readonly id: string;
	readonly name: string;
	readonly imageSource: string;
}
