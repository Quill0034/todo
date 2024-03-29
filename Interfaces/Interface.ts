export interface UserInterface {
    username: string;
    isAdmin: Boolean;
    id: string;
}

export interface DatabaseUserInterface {
    username: string;
    password: string;
    isAdmin: Boolean;
    _id: string;
}

export interface TaskInterface {
    text: string;
    complete: Boolean;
    _id: string;
}

export interface MessageInterface {
    text: string;
    _id: string;
}