import React, { useEffect, useState } from 'react';
import { useApi } from '../../Context';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';

const Order = () => {
  const { fetchCoupons, createOrder, fetchCart,token } = useApi(); // Assuming fetchCart is a function in your API context
  const [coupons, setCoupons] = useState([]);
  const [orderSuccess, setOrderSuccess] = useState('');
  const [orderError, setOrderError] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');

  useEffect(() => {
    const loadCoupons = async () => {
      try {
        const response = await fetchCoupons();
        setCoupons(response.results);
      } catch (error) {
        console.error('Failed to fetch coupons:', error);
      }
    };
    loadCoupons();
  }, [fetchCoupons]);

  useEffect(() => {
 
    if (orderSuccess && redirectUrl) {
      window.location.href = redirectUrl;
    }
  }, [orderSuccess, redirectUrl]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const orderResponse = await createOrder(values);

      if (orderResponse.success) {
       
        setOrderSuccess('Order created successfully!');
        setRedirectUrl(orderResponse.payUrl); // Set the payUrl for redirection
        setOrderError('');
        // toast.success('order placed successfully , check your Email to see invoice', {
        //     position: "top-center",
            
        //     theme: "colored"
        //   });
          
        console.log(token);
        // Call fetchCart to empty the cart
        await fetchCart(`CleanAndGreen_${token}`); // Assuming fetchCart empties the cart
      } else {
        setOrderSuccess('');
        toast.danger('Failed to create order.', {
            position: "top-center",
            
            theme: "colored"
          });
        setOrderError('Failed to create order.');
      }
    } catch (error) {
      setOrderSuccess('');
      setOrderError('Failed to create order.');
    } finally {
      setSubmitting(false);
    }
  };
  
  const orderSchema = Yup.object().shape({
    address: Yup.string().required('Address is required'),
    phone: Yup.string().required('Phone is required'),
    payment: Yup.string().required('Payment is required'),
    coupon: Yup.string(),
  });

  return (
    <div className="container">
      <h3 className="text-center my-5 text-success fw-bold">Create Order</h3>
      <Formik
        initialValues={{
          address: '',
          phone: '',
          payment: 'visa', // Default selection for payment
          coupon: '', // Initial empty value for coupon
        }}
        validationSchema={orderSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <Field type="text" name="address" className="form-control" />
              <ErrorMessage name="address" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <Field type="text" name="phone" className="form-control" />
              <ErrorMessage name="phone" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="payment" className="form-label">Payment</label>
              <Field as="select" name="payment" className="form-control">
                <option value="visa">Visa</option>
              </Field>
              <ErrorMessage name="payment" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="coupon" className="form-label">Coupon</label>
              <Field as="select" name="coupon" className="form-control" onChange={(e) => setFieldValue('coupon', e.target.value)}>
                <option value="">Select a coupon</option>
                {coupons?.map((coupon) => (
                  <option key={coupon?._id} value={coupon?.name}>{coupon?.name}</option>
                ))}
              </Field>
              <ErrorMessage name="coupon" component="div" className="text-danger" />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Loading...' : 'Create Order'}
            </button>
            {orderSuccess && <div className="alert alert-success mt-3">{orderSuccess}</div>}
            {orderError && <div className="alert alert-danger mt-3">{orderError}</div>}
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default Order;
