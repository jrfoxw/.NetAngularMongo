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
        Messages.id += 1;
        const message: IMessage = {
            id: Messages.id,
            user: user,
            text: text,
            date: Date.now()
        }

        this.messages.push(message);
    }

    public clearMessages(): void{

        const n = this.messages;
        Messages.archived = [...Messages.archived, ...this.messages];
        console.log('Archiving Messages: ', Messages.archived, this.messages);
        this.messages = [];
    }

    public getArchived(): IMessage[] {
        console.log('Archived Messages', Messages.archived);
        return Messages.archived;
    }


}