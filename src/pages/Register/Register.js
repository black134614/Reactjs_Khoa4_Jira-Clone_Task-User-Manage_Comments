import { withFormik } from 'formik';
import React from 'react';
import { connect} from 'react-redux';
import * as Yup from 'yup';
import { Button, Input } from 'antd';
import { UserOutlined, LockOutlined, InfoCircleOutlined, PhoneOutlined, FacebookOutlined } from '@ant-design/icons';


function Register(props) {
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
                    <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} type="text" name="password" size="large" placeholder="password" prefix={<LockOutlined />} />
                </div>
                <div className="text-danger">{errors.password}</div>
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
                <Button htmlType="button" size="large" style={{ minWidth: 300, backgroundColor: 'rgb(102,117,223)', color: '#fff' }} className="mt-2">Login</Button>


                <div className="social mt-3 d-flex">
                    <Button style={{ backgroundColor: 'rgb(59,89,152)' }} shape="circle" size={"large"}>
                        <span className="font-weight-bold" style={{ color: '#fff' }} >F</span>
                    </Button>
                </div>
            </div>

        </form>

    )

}
const RegisterWithFormik = withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: '',
        phoneNumber: '',
        name: ''
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string().required('Email is required!').email('email is invalid!'),
        password: Yup.string().min(6, 'password must have min 6 characters').max(32, 'password  have max 32 characters').required('password is required!'),
        phoneNumber: Yup.string().min(10, 'phone number must have 10 number!').max(32, 'password  have max 32 characters'),
        name: Yup.string().required('name is required!')
    }),
    handleSubmit: ({ email, password, phoneNumber, name }, { props, setSubmitting }) => {

        // let action = {
        //     type:USER_SIGNIN_API,
        //     userLogin: {
        //         email:values.email,
        //         password:values.password
        //     }
        // }

        setSubmitting(true);
        // props.dispatch(singinCyberbugAction(email,password));

        // console.log(props)
        // console.log(values);

    },
    handleChange: (phoneNumber) => {
        console.log("chay haldle change")
    },

    displayName: 'Register To Cyberbugs',
})(Register);

export default connect()(RegisterWithFormik);