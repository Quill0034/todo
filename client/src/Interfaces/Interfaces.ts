export interface UserInterface {
    id: string;
    username: string;
    isAdmin: Boolean;
}

export interface TaskInterface {
    text: string;
    complete: Boolean;
    _id: string;
}