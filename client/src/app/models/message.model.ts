export class Message{
    constructor(
        public text: String,
        public viewed: String,
        public created_at: String,
        public emitter: string,
        public receiver: string
    ){}
}