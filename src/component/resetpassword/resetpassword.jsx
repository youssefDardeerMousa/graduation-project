import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styles from './resetpass.module.css'; // Import the CSS module
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Resetpassword() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Use the hook for navigation

    const initialValues = {
      Email: '',
    };

    const validationSchema = Yup.object({
      Email: Yup.string().email('Invalid email format').required('Email is required'),
    });

    const onSubmit = (values, { setSubmitting }) => {
      setLoading(true);
      axios.patch('https://clean-green-agriculture.vercel.app/auth/forgetPasswordCode', values)
        .then(response => {
          setLoading(false);
          console.log(response);
          if (response.data.status === 200) {
            toast.success('Check Your Email to verify code', {
              position: "top-center",
              className: styles['toast-success'],
              theme: "colored"
            });
            setTimeout(() => {
              navigate('/verify-code'); // Navigate to verify-code after showing the toast
            }, 3000);
          } 
        })
        .catch(error => {
          setLoading(false);
          const errorMessage = error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : 'Something went wrong. Please try again.';
          console.error('Error:', error?.response?.data?.message);
          toast.error(error?.response?.data?.message, {
            position: "top-center",
            className: styles['toast-error'],
            theme: "colored"
          });
        });
        setSubmitting(false); // Keep the form enabled after submission
    };

    return (
      <>
        <div className={`d-flex justify-content-center align-items-center ${styles.signupContainer}`}>
          <div className={styles.signupCard}>
            <div className={styles.signupInfo}>
              <h5 className="fw-bold h-6">Clean Green</h5>
            </div>
            <div className={styles.signupForm}>
              <h3 className={styles.textWhite}>Forget Password!</h3>
              <p className={styles.textWhite}>Don't worry about your account</p>
              <p className={styles.textWhite}>Enter Your Email to get a link to reset your password</p>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
                {({ isSubmitting, isValid, dirty }) => (
                  <Form>
                    <div className="form-group py-2">
                      <Field type="email" name="Email" placeholder="Enter Your Email" className={`form-control w-100 ${styles.form_control}`} />
                      <ErrorMessage name="Email" component="div" className={styles.textDanger} />
                    </div>
                    <button type="submit" disabled={isSubmitting || !isValid || !dirty} className={`btn btn-light w-100 ${styles.btnPrimary}`}>
                      {loading ? <i className='fas fa-spinner fa-spin fs-4 text-dark'></i> : "Reset My Password"}
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
