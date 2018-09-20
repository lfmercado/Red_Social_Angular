export class User{
    constructor(
        public _id: string,
        public name: string,
        public surname: string,
        public description: string,
        public profession: string,
        public nick: string,
        public password: string,
        public role: string,
        public image: string,
        public email:string
    ){

    }
}