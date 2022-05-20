export interface IMessage{
    id?: number
    date?: number;
    user?: string;
    text?: string;
}


export class Messages {
    public static id = 0;
    public static archived: IMessage[] = [];
    public messages: IMessage[] = [{id: 0, user: "", text: "", date: Date.now()}];

    constructor(){

    }

    public getMessages(): IMessage[]{
        return this.messages;
    }

    public addMessage(user: string, text: string): void{
    }

    public clearMessages(): void{

    }

    public getArchived(): void {
    }


}