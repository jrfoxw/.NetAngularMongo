export interface IMessage{
    id?: number;
    messageId?: number;
    priority?: string;
    dateOfEntry?: string;
    user?: string;
    message?: string;
}


export class Messages implements IMessage{
    public static id = 0;
    public messageId = 0;
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