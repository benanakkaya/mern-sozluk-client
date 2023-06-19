import { Entry } from "./EntryType";


export interface User {
    avatar: string;
    birthday: string;
    confirmed: boolean;
    createdAt: string;
    email: string;
    entries: Entry[];
    favorites: Entry[];
    gender: string;
    updatedAt: string;
    userType: string;
    username: string;
    __v: number;
    _id: string;
  }