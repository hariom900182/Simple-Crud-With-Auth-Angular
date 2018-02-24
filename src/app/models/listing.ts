export class Listing
{
	public id: any;
    public title:string;
    public detail:string;
    public email:string;
    public status:boolean;
	constructor() {
        this.id = null;
        this.title = "";
        this.detail= "";
        this.email = "";
        this.status = true;
	}
};