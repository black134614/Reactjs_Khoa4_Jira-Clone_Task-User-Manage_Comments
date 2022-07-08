import { withFormik } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { Button, Input } from 'antd';
import { UserOutlined, LockOutlined, InfoCircleOutlined, PhoneOutlined, TwitterOutlined } from '@ant-design/icons';
import { SIGN_UP_USER_SAGA } from '../../../redux/constants/Cyberbugs/UsersContants';
import { values } from 'lodash';
import { NavLink } from 'react-router-dom';


function SignUpCyberBugs(props) {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;


    return (
        <form onSubmit={handleSubmit} className="container" >
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: window.innerHeight }} >
                <h3 className="text-center" style={{ fontWeight: 300, fontSize: 35 }}>Sign up</h3>
                <div className="d-flex mt-3" >
                    <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} name="email" size="large" placeholder="email" prefix={<UserOutlined />} />
                </div>
                <div className="text-danger">{errors.email}</div>
                <div className="d-flex mt-3">
                    <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} type="text" name="passWord" size="large" placeholder="password" prefix={<LockOutlined />} />
                </div>
                <div className="text-danger">{errors.passWord}</div>
                <div className="d-flex mt-3">
                    <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} type="text" name="phoneNumber" size="large" placeholder="phone number" maxLength={13} prefix={<PhoneOutlined />} />
                </div>
                <div className="text-danger">{errors.phoneNumber}</div>
                <div className="d-flex mt-3">
                    <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} type="text" name="name" size="large" placeholder="name" prefix={<InfoCircleOutlined />} />
                </div>
                <div className="text-danger">{errors.name}</div>

                <Button htmlType="submit" size="large" style={{ minWidth: 300, backgroundColor: 'rgb(102,117,223)', color: '#fff' }} className="mt-5">Sign up</Button>
                <div className='mt-2'>If you have account? Let's login.</div>
                <NavLink to='/login' style={{ minWidth: 300, backgroundColor: 'rgb(102,117,223)', color: '#fff', textAlign: 'center', padding: '8px', fontSize: '16px' }} className="mt-2">Login</NavLink>


                <div className="social mt-3 d-flex">
                    <Button style={{ backgroundColor: 'rgb(59,89,152)' }} shape="circle" size={"large"}>
                        <span className="font-weight-bold" style={{ color: '#fff' }} >F</span>
                    </Button>
                    <Button type="primary ml-3" shape="circle" icon={<TwitterOutlined />} size={"large"}>

                    </Button>
                </div>
            </div>

        </form>

    )

}
const SignupWithFormik = withFormik({
    mapPropsToValues: () => ({
        email: '',
        passWord: '',
        phoneNumber: '',
        name: ''
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string().required('Email is required!').email('email is invalid!'),
        passWord: Yup.string().min(6, 'password must have min 6 characters').max(32, 'password  have max 32 characters').required('password is required!'),
        phoneNumber: Yup.string().min(10, 'phone number must have 10 number!').required('phone number is required!'),
        name: Yup.string().required('name is required!')
    }),
    handleSubmit: ({ email, passWord, phoneNumber, name }, { props, setSubmitting }) => {
        
        const newUser = {
            email,
            passWord,
            phoneNumber,
            name
        }
        console.log(newUser)
        setSubmitting(true);
        props.dispatch({
            type: SIGN_UP_USER_SAGA,
            newUser
        });

    },
    handleChange: (phoneNumber) => {
        console.log("chay haldle change")
    },

    displayName: 'Register To Cyberbugs',
})(SignUpCyberBugs);

export default connect()(SignupWithFormik);