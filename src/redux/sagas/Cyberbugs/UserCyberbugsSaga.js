import Axios from 'axios';
import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
import { cyberbugsService } from '../../../services/CyberbugsService';
import { USER_SIGNIN_API, USLOGIN } from '../../constants/Cyberbugs/Cyberbugs';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst';
import { STATUS_CODE, TOKEN, USER_LOGIN } from '../../../util/constants/settingSystem'

import { history } from '../../../util/history';
import { userService } from '../../../services/UserService';
import { DELETE_USER_SAGA, EDIT_USER_SAGA, GET_ALL_USER, GET_USER_BY_PROJECT_ID, GET_USER_BY_PROJECT_ID_SAGA } from '../../constants/Cyberbugs/UsersContants';
import { array } from 'yup';
import { GET_ALL_USER_SAGA, SIGN_UP_USER_SAGA } from '../../constants/Cyberbugs/UsersContants';
import {notifiFunction} from '../../../util/Notification/notificationCyberbugs'

//Quản lý các action saga 
function* signinSaga(action) {
    // console.log(action);
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    //Gọi api 
    try {
    const {data, status} = yield call(()=>cyberbugsService.signinCyberBugs(action.userLogin)) ;

        //Lưu vào localstorage khi đăng nhập thành công
        localStorage.setItem(TOKEN, data.content.accessToken);
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));


        yield put({
            type: USLOGIN,
            userLogin: data.content
        })

        // let history = yield select(state=> state.HistoryReducer.history)

        history.push('/');

    } catch (err) {
        console.log(err.response.data)
    }


    yield put({
        type: HIDE_LOADING
    })

}


export function* theoDoiSignin() {
    yield takeLatest(USER_SIGNIN_API, signinSaga);
}




//Quản lý các action saga
function* getUserSaga(action) {

    //action.keyWord
    console.log("keyword", action.keyWord);
    //Gọi api 
    try {
        const { data, status } = yield call(() => userService.getUser(action.keyWord));

        yield put({
            type: 'GET_USER_SEARCH',
            lstUserSearch: data.content
        })
        console.log("data", data);

    } catch (err) {
        console.log(err.response.data)
    }
}



export function* theoDoiGetUser() {
    yield takeLatest("GET_USER_API", getUserSaga);
}





//Quản lý các action saga
function* addUserProjectSaga(action) {


    try {
        const { data, status } = yield call(() => userService.assignUserProject(action.userProject));

        yield put({
            type: 'GET_LIST_PROJECT_SAGA'
        })

    } catch (err) {
        console.log(err.response.data)
    }
}



export function* theoDoiAddUserProject() {
    yield takeLatest("ADD_USER_PROJECT_API", addUserProjectSaga);
}






//Quản lý các action saga
function* removeUserProjectSaga(action) {


    try {
        const { data, status } = yield call(() => userService.deleteUserFromProject(action.userProject));

        yield put({
            type: 'GET_LIST_PROJECT_SAGA'
        })

    } catch (err) {
        console.log(err.response.data)
    }
}



export function* theoDoiRemoveUserProject() {
    yield takeLatest("REMOVE_USER_PROJECT_API", removeUserProjectSaga);
}




function* getUserByProjectIdSaga(action) {
    const { idProject } = action;
    console.log('action',idProject)

    try {
        const { data, status } = yield call(() => userService.getUserByProjectId(idProject));
        console.log('checkdata',data);

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type:GET_USER_BY_PROJECT_ID,
                arrUser:data.content
            })
        }

    } catch (err) {
        console.log(err);
        console.log(err.response?.data);
        if(err.response?.data.statusCode === STATUS_CODE.NOT_FOUND) {
            yield put({
                type:GET_USER_BY_PROJECT_ID,
                arrUser:[]
            })
        }
    }
}



export function* theoDoiGetUserByProjectIdSaga() {
    yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga)
}

//Saga dung de sign up user
export function* signupUserSaga(action) {
    const {newUser} = action;
    // console.log(action.newUser)
    try {
        const { data, status } = yield call(() => userService.signupUser(newUser));
        if(status === STATUS_CODE.SUCCESS){
            history.push('/login');
            notifiFunction('success', data.message)
        }
    } catch (error) {
        console.log(error.response?.data);
        notifiFunction('error', error.response?.data.message)
    }
}
export function* theoDoiSignupUser(){
    yield takeLatest(SIGN_UP_USER_SAGA, signupUserSaga)
}

//saga de lay tat ca thong tin user
export function* getAllUserSaga(){
    try {
        const {data, status} = yield call(()=> userService.getAllUser());
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type: GET_ALL_USER,
                arrUser: data.content
            })
        }
    } catch (error) {
        console.log(error.response?.data);
        notifiFunction('error', error.response?.data.message)
    }
}

export function* theoDoiGetAllUserSaga(){
    yield takeLatest(GET_ALL_USER_SAGA, getAllUserSaga)
}

//saga cap nhat thong tin user
export function* editUserSaga(action){
    try {
        const {data, status} = yield call(()=> userService.editUser(action.user));
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type: GET_ALL_USER_SAGA
            });
            yield put({
                type:'CLOSE_DRAWER'
            })
            notifiFunction('success', data.content);
        }
    } catch (error) {
        console.log(error.response?.data);
        notifiFunction('error', error.response?.data.message)
    }
}

export function* theoDoiEditUserSaga(){
    yield takeLatest(EDIT_USER_SAGA, editUserSaga)
}

//saga xoa user
export function* deleteUserSaga(action){
    try {
        const {data, status} = yield call(()=> userService.deleteUser(action.userId));
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type: GET_ALL_USER_SAGA
            });
            notifiFunction('success', data.content);
        }
    } catch (error) {
        console.log(error.response?.data);
        notifiFunction('error', error.response?.data.message)
    }
}

export function* theoDoiDeleteUserSaga(){
    yield takeLatest(DELETE_USER_SAGA, deleteUserSaga)
}