

export interface Topic {
    _id: string;
    title: string;
    entries: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    totalCount:number;
    totalPages:number;
}