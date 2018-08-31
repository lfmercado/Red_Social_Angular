export class Publication{
    constructor(
        public _id: string,
        public text: string,
        public file: String,
        public created_at: String,
        public user: string
    ){

    }
}