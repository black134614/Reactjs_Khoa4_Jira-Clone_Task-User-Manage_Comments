import { all } from "redux-saga/effects";
import Todolist from "../../pages/Todolist/Todolist";
import TodolistRFC from "../../pages/Todolist/TodolistRFC";
import * as ToDoListSaga from './ToDoListSaga'
// import {theoDoiActionGetTaskApi} from './ToDoListSaga'
import * as Cyberbugs from './Cyberbugs/UserCyberbugsSaga';
import * as ProjectCategorySaga from './Cyberbugs/ProjectCategorySaga';
import * as ProjectSaga from './Cyberbugs/ProjectSaga';
import * as TaskTypeSaga from './Cyberbugs/TaskTypeSaga';
import * as PrioritySaga from './Cyberbugs/PrioritySaga';
import * as TaskSaga from './Cyberbugs/TaskSaga';
import * as CommentSaga from './Cyberbugs/CommentSaga';
import * as StatusSaga from './Cyberbugs/StatusSaga'
import { cyberbugsService } from "../../services/CyberbugsService";

export function* rootSaga() {

  yield all([
    //Nghiệp vụ theo dõi các action saga todolist
    ToDoListSaga.theoDoiActionGetTaskApi(),
    ToDoListSaga.theoDoiActionAddTaskApi(),
    ToDoListSaga.theoDoiActionDeleteTask(),
    ToDoListSaga.theoDoiDoneTask(),
    ToDoListSaga.theoDoiRejectTask(),
    
    //Nghiệp vụ cyberbugs .... ,
    Cyberbugs.theoDoiSignin(),
    Cyberbugs.theoDoiGetUser(),
    Cyberbugs.theoDoiRemoveUserProject(),
    Cyberbugs.theoDoiAddUserProject(),
    Cyberbugs.theoDoiGetUserByProjectIdSaga(),
    
    //Nghiep vu quan ly users
    Cyberbugs.theoDoiSignupUser(),
    Cyberbugs.theoDoiGetAllUserSaga(),
    Cyberbugs.theoDoiEditUserSaga(),
    Cyberbugs.theoDoiDeleteUserSaga(),

    ProjectCategorySaga.theoDoigetAllProjectCategory(),
    ProjectSaga.theoDoiCreateProjectSaga(),
    ProjectSaga.theoDoiGetListProjectSaga(),
    ProjectSaga.theoDoiUpdateProjectSaga(),
    ProjectSaga.theoDoiDeleteProject(),
    ProjectSaga.theoDoiGetProjectDetail(),
    ProjectSaga.theoDoiGetAllProjectSaga(),
    StatusSaga.theoDoiGetAllStatusSaga(),

    TaskTypeSaga.theoDoiGetAllTaskTypeSaga(),
    PrioritySaga.theoDoiGetAllPriority(),

    TaskSaga.theoDoiCreateTaskSaga(),
    TaskSaga.theoDoiGetTaskDetailSaga(),
    TaskSaga.theoDoiUpdateTaskStatusSaga(),
    TaskSaga.theoDoiHandleChangePostApi(),
    TaskSaga.theoDoiUdpateTask(),

    CommentSaga.theoDoigetAllCommentSaga(),
    CommentSaga.theoDoideleteCommentSaga(),
    CommentSaga.theoDoiinsertCommentSaga(),
    CommentSaga.theoDoiupdateCommentSaga()
  ])


}