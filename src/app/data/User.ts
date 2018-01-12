export class User {
    constructor(private username: string, private password: string) {
    }

    get user() {
        return this.username;
    }
}
