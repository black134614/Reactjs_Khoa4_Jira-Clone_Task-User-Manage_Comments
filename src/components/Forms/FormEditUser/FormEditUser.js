import { withFormik } from 'formik';
import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { EDIT_USER_SAGA } from '../../../redux/constants/Cyberbugs/UsersContants';

function FormEditUser(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: 'SET_SUBMIT_FORM_EDIT_USER',
            submitFunction: handleSubmit
        })
    }, []);

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setValues,
        setFieldValue
    } = props;

    return (
        <form className="container-fuild" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">User ID</p>
                        <input disabled value={values.userId} className="form-control" name="userId" />
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">User Name</p>
                        <input value={values.name} className="form-control" name="name" onChange={handleChange} />
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">Email</p>
                        <input className="form-control" value={values.email} name="email" onChange={handleChange} />
                        <div className='text-danger'>{errors.email}</div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <p className="font-weight-bold">Phone Number</p>
                        <input className="form-control" value={values.phoneNumber} name="phoneNumber" onChange={handleChange} />
                    </div>
                </div>
            </div>
        </form >
    )
}
const EditUserForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { user } = props;

        return {
            userId: user.userId,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber
        }
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().email()
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        const user = {
            id: values.userId,
            name: values.name,
            email: values.email,
            phoneNumber: values.phoneNumber
        }
        //Gọi saga
        props.dispatch({
            type: EDIT_USER_SAGA,
            user
        })
    },
    displayName: 'EditProjectForm',
})(FormEditUser);
const mapStateToProps = (state) => ({
   
})

export default connect(mapStateToProps)(EditUserForm);