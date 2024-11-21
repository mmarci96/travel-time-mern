
export interface PostCreateDTO {
    title: string;
    description?: string;
    location?: string;
    image_url: string;
}

export interface PostUpdateDTO {
    author_name?: string,
    title?: string;
    description?: string;
    location?: string;
    image_url?: string;
}
