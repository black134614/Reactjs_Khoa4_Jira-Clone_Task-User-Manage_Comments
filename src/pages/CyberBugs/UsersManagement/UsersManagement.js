/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Avatar, Menu, Dropdown, Space, Input, Table, Popconfirm } from 'antd';
import { UserOutlined, DownOutlined, SmileOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
import './UsersManagement.css'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_USER_SAGA, GET_ALL_USER_SAGA } from '../../../redux/constants/Cyberbugs/UsersContants';
import EditUserForm from '../../../components/Forms/FormEditUser/FormEditUser';

const { Search } = Input;




function onChange(pagination, filters, sorter, extra) {
}

export default function UsersManagement(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: GET_ALL_USER_SAGA
        })
    }, []);
    const searchUser = (e) => {
        const keyWord = e.target.value;
        console.log(keyWord);
        dispatch({
            type: GET_ALL_USER_SAGA,
            keyWord: keyWord
        })
    }
    let data = useSelector((state) => state.UserLoginCyberBugsReducer.arrUser).map((item, index) => {
        return { ...item, key: index + 1 }
    });
    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            filterSearch: false,
            sorter: (a, b) => a.key - b.key
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            width: '40%',
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
        },
        {
            title: 'Action',
            dataIndex: ['userId', 'name', 'email', 'phoneNumber'],
            // key: 'x',
            render: (text, record, index) => {
                return <div>
                    <button className="btn mr-2 btn-primary" onClick={() => {
                        const user = {
                            userId: record.userId,
                            name: record.name,
                            email: record.email,
                            phoneNumber: record.phoneNumber
                        }
                        dispatch({
                            type: 'OPEN_FORM_EDIT_USER',
                            title: 'Edit User',
                            Component: <EditUserForm user={user} />,
                        })
                    }}>
                        <FormOutlined style={{ fontSize: 17 }} />
                    </button>
                    <Popconfirm
                        title="Are you sure to delete this project?"
                        onConfirm={() => {
                            dispatch({
                                type: DELETE_USER_SAGA,
                                userId: record.userId
                            })
                        }}

                        okText="Yes"
                        cancelText="No"
                    >
                        <button className="btn btn-danger">
                            <DeleteOutlined style={{ fontSize: 17 }} />
                        </button>
                    </Popconfirm>

                </div>
            },
        }
    ];
    return (
        <div style={{ width: "100%" }}>
            <div className='d-flex align-items-center justify-content-end my-4'>
                <span>Chào!,  </span>
                <strong className='mx-1'> Luân</strong>
                <Avatar>
                    LV
                </Avatar>
                <div class="dropdown dropleft">
                    <button class="btn btn-light btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">

                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: "3.5rem" }}>
                <NavLink className="text-dark btn btn-primary" to="/signup">
                    <h5 className='m-0'>Create User</h5>
                </NavLink>
                <Search
                    placeholder="Search email , phone number account ..."
                    allowClear
                    enterButton="Search"
                    className='mb-2 mt-4'
                    onChange={(e) => { searchUser(e) }}
                />
            </div>


            <Table columns={columns} dataSource={data} onChange={onChange} />
        </div>
    )
}
