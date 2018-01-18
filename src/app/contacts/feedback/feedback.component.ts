import { Component } from '@angular/core';

@Component({
	selector: 'app-feedback',
	templateUrl: './feedback.component.html',
	styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
	public feedbacks = [
		{
			id: 1, name: 'Pesho', email: 'tudor@gmail.com', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
				'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
				'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
				'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
				'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
				'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
				'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
				'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
				'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
				'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
				'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
				'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
				'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
				'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
				'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
				'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
				'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
		},
		{ id: 2, name: 'Gosho', email: 'gosho@gmail.com', content: 'Lorizzle ipsizzle dolizzle pizzle go to hizzle, fo shizzle.' },
		{ id: 3, name: 'Maria', email: 'maria@gmail.com', content: 'Climb leg rub face on everything give attitude nap all day.' },
		{ id: 4, name: 'Pesho', email: 'tudor@gmail.com', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' },
		{ id: 5, name: 'Gosho', email: 'gosho@gmail.com', content: 'Lorizzle ipsizzle dolizzle pizzle go to hizzle, fo shizzle.' },
		{ id: 6, name: 'Maria', email: 'maria@gmail.com', content: 'Climb leg rub face on everything give attitude nap all day.' },
		{ id: 7, name: 'Pesho', email: 'tudor@gmail.com', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' },
		{ id: 8, name: 'Gosho', email: 'gosho@gmail.com', content: 'Lorizzle ipsizzle dolizzle pizzle go to hizzle, fo shizzle.' },
		{ id: 9, name: 'Maria', email: 'maria@gmail.com', content: 'Climb leg rub face on everything give attitude nap all day.' },
	];

	public opened;

	public selected = new Set();

	constructor() { }

	select(feedback) {
		this.opened = feedback;
	}

	markOrUnmark(feedback) {
		console.log('click');
		if (this.selected.has(feedback.id)) {
			this.selected.delete(feedback.id);
		} else {
			this.selected.add(feedback.id);
		}
	}

	close() {
		this.opened = null;
	}

	delete() {
		if (this.opened && this.selected.has(this.opened.id)) {
			this.close();
		}

		this.feedbacks = this.feedbacks.filter(f => !this.selected.has(f.id));
		this.selected.clear();
	}
}
