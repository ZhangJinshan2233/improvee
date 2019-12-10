export class PostModel {
    constructor(_id?: string,
        _coachee?: string,
        description?: string,
        rating?: string,
        createdDate?: Date,
        postImage?: PostImage,
        comments?: [Comment]
    ) {}

}

export interface PostImage {
    imgType?: string,
    data?: any
}

export interface Comment {

    userName?: string,
    content?: string,
    createdDate?: Date,
    isSenderCoach?: boolean
}