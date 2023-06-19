

export interface Entry {
    _id: string;
    createdAt:string;
    updatedAt:string;
    topic: {
        _id: string;
        title:string;
    };
    text: string;
    owner: {
        _id: string;
        username: string;
        avatar: string | undefined;
    };
    likes: string[];
    dislikes: string[];
    favorites: string[];
    __V:number;
}