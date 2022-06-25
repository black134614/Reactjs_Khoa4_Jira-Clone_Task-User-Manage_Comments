
import { baseService } from './baseService';

export class CommentService extends baseService {
    constructor() {
        super();
    }
    getAllComment = (taskId) => {
        return this.get(`/Comment/getAll?taskId=${taskId}`)
    }
    deleteComment = (commentId) => {
        return this.delete(`Comment/deleteComment?idComment=${commentId}`)
    }
    insertComment = (newComnent) => {
        return this.post("Comment/insertComment", newComnent)
    }
    updateComment = (commentId, newCommentContent) => {
        return this.put(`Comment/updateComment?id=${commentId}&contentComment=${newCommentContent}`)
    }
}

export const commentService = new CommentService();
