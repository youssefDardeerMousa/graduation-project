import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styles from './login.module.css'; // Import the CSS module
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { useApi } from '../../Context.js';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Use the hook for navigation
  const { updateToken } = useApi();

  const initialValues = {
    Email: '',
    Password: '',
  };

  const validationSchema = Yup.object({
    Email: Yup.string().email('Invalid email format').required('Email is required'),
    Password: Yup.string().min(5, 'Password must be at least 6 characters').required('Password is required'),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setLoading(true);
    axios.post('https://clean-green-agriculture.vercel.app/auth/login', values)
      .then(response => {
        setLoading(false);
        if (response.data.status === 200) {
          toast.success('Login Successfully', {
            position: "top-center",
            className: styles['toast-success'],
            theme: "colored"
          });
          const token = response.data.token;
          updateToken(token);
          navigate('/');
        }
      })
      .catch(error => {
        setLoading(false);
        const errorMessage = error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'Something went wrong. Please try again.';
        toast.error(errorMessage, {
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
            <h1 className={styles.textWhite}>Login</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
              {({ isSubmitting, isValid, dirty }) => (
                <Form>
                  <div className="form-group py-2">
                    <Field type="email" name="Email" placeholder="Enter Your Email" className={`form-control w-100 ${styles.form_control}`} />
                    <ErrorMessage name="Email" component="div" className={styles.textDanger} />
                  </div>
                  <div className="form-group py-2">
                    <Field type="password" name="Password" placeholder="Enter Your Password" className={`form-control w-100 ${styles.form_control}`} />
                    <ErrorMessage name="Password" component="div" className={styles.textDanger} />
                    <div className={`text-end mt-3 ${styles.textWhite}`}>
                      <Link to="/reset-Password" className={styles.textWarning}>Forgot Password?</Link>
                    </div>
                  </div>
                  
                  <button type="submit" disabled={isSubmitting || !isValid || !dirty} className={`btn btn-light w-100 ${styles.btnPrimary}`}>
                    {loading ? <i className='fas fa-spinner fa-spin fs-4 text-dark'></i> : "Login"}
                  </button>
                  <div className={`text-center mt-3 ${styles.textWhite}`}>
                    Don't have an account? <Link to="/register" className={styles.textWarning}>Register</Link>
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
