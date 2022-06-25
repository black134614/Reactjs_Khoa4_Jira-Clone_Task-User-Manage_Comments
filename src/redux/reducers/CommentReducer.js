import { GET_ALL_COMMENT } from "../constants/Cyberbugs/CommentConstants"

const initialState = {
    commentList: []
}

export const CommentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COMMENT: {
            return { ...state, commentList: action.commentList }
        }
        default:
            return { ...state };
    }
}
