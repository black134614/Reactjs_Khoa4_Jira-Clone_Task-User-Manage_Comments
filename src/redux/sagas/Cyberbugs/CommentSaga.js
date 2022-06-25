import { call, delay, put, takeLatest } from "redux-saga/effects";
import { commentService } from "../../../services/CommentService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { notifiFunction } from "../../../util/Notification/notificationCyberbugs";
import { DELETE_COMMENT_SAGA, GET_ALL_COMMENT, GET_ALL_COMMENT_SAGA, INSERT_COMMENT_SAGA, UPDATE_COMMENT_SAGA } from "../../constants/Cyberbugs/CommentConstants";
import { UPDATE_STATUS_TASK_SAGA } from "../../constants/Cyberbugs/TaskConstants";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";


//Hàm dùng để call service để lấy tất cả comment từ  taskId
export function* getAllCommentByTaskId(taskId) {
    try {
        const { data, status } = yield call(() => commentService.getAllComment(taskId));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_COMMENT,
                commentList: data.content
            })
        }
    } catch (err) {
        console.log(err);
    }
}

//Saga dùng để get all comment từ api
export function* getAllCommentSaga(action) {
    const { taskId } = action;
    yield call(getAllCommentByTaskId, taskId);
}

export function* theoDoigetAllCommentSaga() {
    yield takeLatest(GET_ALL_COMMENT_SAGA, getAllCommentSaga)
}

//saga dùng để delete comment từ api
export function* deleteCommentSaga(action) {
    const { taskId, commentId } = action;
    try {
        const { data, status } = yield call(() => commentService.deleteComment(commentId));
        if (status === STATUS_CODE.SUCCESS) {
            notifiFunction('success', 'Delete comment successfully !')
            yield call(getAllCommentByTaskId, taskId);
        }
        else {
            notifiFunction('error', 'Delete comment fail !')
        }
    } catch (error) {
        notifiFunction('error', 'Delete comment fail !')
        console.log(error);
    }
}

export function* theoDoideleteCommentSaga() {
    yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga)
}

//Saga dùng để thêm comment
export function* insertCommentSaga(action) {
    const { newComnent } = action;
    const { taskId } = newComnent;
    try {
        const { status, data } = yield call(() => commentService.insertComment(newComnent));
        if (status === STATUS_CODE.SUCCESS) {
            notifiFunction('success', 'Insert comment successfully !')
            yield call(getAllCommentByTaskId, taskId);
        }
        else {
            notifiFunction('error', 'Insert comment fail !')
        }
    } catch (error) {
        console.log(error);
    }
}

export function* theoDoiinsertCommentSaga() {
    yield takeLatest(INSERT_COMMENT_SAGA, insertCommentSaga)
}

//Saga dùng để update comment
export function* updateCommentSaga(action) {
    const { taskId, commentId, newCommentContent } = action;
    console.log(taskId, commentId, newCommentContent)
    try {
        const { status, data } = yield call(() => commentService.updateComment(commentId, newCommentContent));
        if (status === STATUS_CODE.SUCCESS) {
            yield call(getAllCommentByTaskId, taskId);
            console.log(data.message)
        }
        else {
            notifiFunction('error', 'Update comment fail !')
        }
    } catch (error) {
        console.log(error.response?.data);
        notifiFunction('error', error.response?.data.message)
    }
}

export function* theoDoiupdateCommentSaga() {
    yield takeLatest(UPDATE_COMMENT_SAGA, updateCommentSaga)
}