export interface IMessage{
    id?: number;
    messageId?: number;
    dateOfEntry?: string;
    user?: string;
    message?: string;
}


export class Messages {
    public static id = 0;
    public static archived: IMessage[] = [];
    public messages: IMessage[] = [{}];

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