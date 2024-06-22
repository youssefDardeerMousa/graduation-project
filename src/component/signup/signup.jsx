import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styles from './signup.module.css'; // Import the CSS module
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Use the hook for navigation

  const initialValues = {
    Name: '',
    Email: '',
    Password: '',
    RePassword: '',
  };

  const validationSchema = Yup.object({
    Name: Yup.string().required('Name is required'),
    Email: Yup.string().email('Invalid email format').required('Email is required'),
    Password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    RePassword: Yup.string().oneOf([Yup.ref('Password'), null], 'Passwords must match').required('Confirm your password'),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setLoading(true);
    axios.post('https://clean-green-agriculture.vercel.app/auth/register', values)
      .then(response => {
        setLoading(false);
        console.log(response.data.status);
        if (response.data.status === 201) {
          toast.success( 'Signup successful , Check your Email to activate your account!', {
            position: "top-center",
            className: styles['toast-success'],
            theme: "colored"
          });
         
        } 
        setTimeout(() => {
          navigate('/login'); // Navigate to login after showing the toast
        }, 3000);
      })
      .catch(error => {
        setLoading(false);
        console.log(error?.response?.data?.message);
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
          <div className={` ${styles.signupInfo}`}>
            <h5 className="fw-bold h-6 ">Clean Green</h5>
          </div>
          <div className={styles.signupForm}>
            <h1 className={styles.textWhite}>Sign up</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
              {({ isSubmitting, isValid, dirty }) => (
                <Form>
                  <div className="form-group py-2">
                    <Field type="text" name="Name" placeholder="Enter your name" className={`form-control w-100 ${styles.form_control}`} />
                    <ErrorMessage name="Name" component="div" className={`${styles.textDanger}`} />
                  </div>

                  <div className="form-group py-2">
                    <Field type="email" name="Email" placeholder="Enter Your Email" className={`form-control w-100 ${styles.form_control}`} />
                    <ErrorMessage name="Email" component="div" className={styles.textDanger} />
                  </div>
                  <div className="form-group py-2">
                    <Field type="password" name="Password" placeholder="Enter Your Password" className={`form-control w-100 ${styles.form_control}`} />
                    <ErrorMessage name="Password" component="div" className={styles.textDanger} />
                  </div>
                  <div className="form-group py-2">
                    <Field type="password" name="RePassword" placeholder="Confirm password" className={`form-control w-100 ${styles.form_control}`} />
                    <ErrorMessage name="RePassword" component="div" className={styles.textDanger} />
                  </div>
                  <button type="submit" disabled={isSubmitting || !isValid || !dirty} className={`btn btn-light w-100 ${styles.btnPrimary}`}>
                    {loading ? <i className='fas fa-spinner fa-spin fs-4 text-dark'></i> : "Sign up"}
                  </button>
                  <div className={`text-center mt-3 ${styles.textWhite}`}>
                    Already have an account? <Link to="/login" className={styles.textWarning}>Login</Link>
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
