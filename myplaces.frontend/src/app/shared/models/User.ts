
export class User {
    public id: string;
    public _id: string;
    public name: string;
    public email: string;
    public image: string;

    constructor(userData) {
        this.id = userData._id;
        this._id = userData._id;
        this.name = userData.name;
        this.email = userData.email;
        this.image = userData.image;
    }
}
