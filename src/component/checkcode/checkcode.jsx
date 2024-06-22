import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styles from './checkcode.module.css'; // Import the CSS module
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Checkcode() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Use the hook for navigation

    const initialValues = {
        digit1: '',
        digit2: '',
        digit3: '',
        digit4: '',
        digit5: ''
    };

    const validationSchema = Yup.object({
        digit1: Yup.string().matches(/^\d$/, 'Must be a digit').required('Required'),
        digit2: Yup.string().matches(/^\d$/, 'Must be a digit').required('Required'),
        digit3: Yup.string().matches(/^\d$/, 'Must be a digit').required('Required'),
        digit4: Yup.string().matches(/^\d$/, 'Must be a digit').required('Required'),
        digit5: Yup.string().matches(/^\d$/, 'Must be a digit').required('Required')
    });

    const onSubmit = (values, { setSubmitting }) => {
        setLoading(true);
        const OTP = `${values.digit1}${values.digit2}${values.digit3}${values.digit4}${values.digit5}`;

        axios.post('https://clean-green-agriculture.vercel.app/auth/verify-code', { OTP })
            .then(response => {
                setLoading(false);
                console.log(response);
                if (response.data.status === 200) {
                    toast.success('OTP verified successfully', {
                        position: "top-center",
                        className: styles['toast-success'],
                        theme: "colored"
                    });
                    setTimeout(() => {
                        navigate('/change-password'); // Navigate to reset-password after showing the toast
                    }, 3000);
                }
            })
            .catch(error => {
                setLoading(false);
               
                console.error('Error:', error?.response?.data?.message);
                toast.error(error?.response?.data?.message, {
                    position: "top-center",
                    className: styles['toast-error'],
                    theme: "colored"
                });
            });
        setSubmitting(false); // Keep the form enabled after submission
    };

    useEffect(() => {
        const inputs = document.querySelectorAll(`.${styles.otpField}`);
        inputs.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                if (e.target.value.length === 1 && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            });
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && input.value === '' && index > 0) {
                    inputs[index - 1].focus();
                }
            });
        });
    }, []);

    const customHandleChange = (e, handleChange, setFieldValue, index) => {
        handleChange(e);
        if (e.target.value.length === 1 && index < 4) {
            document.getElementById(`digit${index + 2}`).focus();
        }
    };

    return (
        <>
            <div className={`d-flex justify-content-center align-items-center ${styles.signupContainer}`}>
                <div className={styles.signupCard}>
                    <div className={styles.signupInfo}>
                        <h5 className="fw-bold h-6">Clean Green</h5>
                    </div>
                    <div className={styles.signupForm}>
                        <h3 className={styles.textWhite}>Verify OTP!</h3>
                        <p className={styles.textWhite}>Enter the OTP sent to your email</p>
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                            {({ isSubmitting, isValid, dirty, handleChange, setFieldValue }) => (
                                <Form>
                                    <div className="d-flex justify-content-between">
                                        {['digit1', 'digit2', 'digit3', 'digit4', 'digit5'].map((digit, index) => (
                                            <Field
                                                key={digit}
                                                type="text"
                                                name={digit}
                                                id={digit}
                                                maxLength="1"
                                                className={`form-control ${styles.otpField}`}
                                                onChange={(e) => customHandleChange(e, handleChange, setFieldValue, index)}
                                            />
                                        ))}
                                    </div>
                                    <div className="form-group py-2">
                                       
                                    </div>
                                    <button type="submit" disabled={isSubmitting || !isValid || !dirty} className={`btn btn-light w-100 ${styles.btnPrimary}`}>
                                        {loading ? <i className='fas fa-spinner fa-spin fs-4 text-dark'></i> : "Verify OTP"}
                                    </button>
                                    <div className={`text-center mt-3 ${styles.textWhite}`}>
                                        Go back to <Link to="/login" className={styles.textWarning}>login</Link> <span>page</span>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
