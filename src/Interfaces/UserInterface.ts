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