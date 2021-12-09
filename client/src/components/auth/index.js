import React, { useState, useEffect } from "react"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { TextField, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from "../../store/actions/user_actions"

const Auth = (props) => {
    const [register, setRegister] = useState(false)
    const dispatch = useDispatch()
    const notifications = useSelector( state => state.notifications )

    const formik = useFormik({

        initialValues:{ email: '' , password: ''},

        validationSchema:Yup.object({
            email: Yup.string()
            .required('Sorry email is required to proceed')
            .email('Enter a valid e-mail'),
            password: Yup.string()
            .required('Sorry password is required to proceed')
        }),
        onSubmit:(values, { resetForm })=>{
            handleSubmit(values)
        }
    })

    const handleSubmit = (values) => {
        if(register) {
            dispatch(registerUser(values))
        } else {

        }
    }

    const errorHelper = (formik, values) => {
        return({
            error: formik.errors[values] && formik.touched[values] ? true : false,
            helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
        })
    }

    useEffect(() => {
        if(notifications && notifications.success) {
            props.history.push('/dashboard')
        }
    }, [notifications, props.history])

    return(
        <>
            <div className="auth_container">
                <h1>Authenticate</h1>
                <form className="mt-3" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <TextField
                        style={{width: "100%"}}
                        label="E-mail"
                        variant="outlined"
                        {...formik.getFieldProps('email')}
                        {...errorHelper(formik,'email')}
                    />
                </div>

                <div className="form-group">
                    <TextField
                        style={{width: "100%"}}
                        label="Password"
                        variant="outlined"
                        type="password"
                        {...formik.getFieldProps('password')}
                        {...errorHelper(formik,'password')}
                    />
                </div>

                <Button 
                    variant="contained"
                    color="success"
                    type="submit"
                    size="large"
                >
                    { register ? 'Register' : 'Login' }
                </Button>

                <Button 
                    className="mt-3"
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => setRegister(!register)}
                >
                   Want to { !register ? 'Register' : 'Login' } ?
                </Button>
                </form>
            </div>
        </>
    )
}

export default Auth