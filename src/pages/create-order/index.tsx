import React from 'react';
import { Typography, Form, Input, Select } from 'antd';
import styles from './index.module.scss';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

const CreateOrder = () => {
  const navigate = useNavigate();

  interface OrderValues {
    product_name: string;
    price: string;
    order_date: string;
    customer_name: string;
    category_name: string;
  }
  const onFinish = async (values: OrderValues) => {
    const priceString = values.price;

    const priceWithoutComma = priceString.replace(/,/g, '');

    const priceNumber = Number(priceWithoutComma);

    if (Number.isNaN(priceNumber)) {
      toast('Put a valid price');
      console.log('invalid number');
      return;
    } else {
      console.log('Valid price:', priceNumber);
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.post(
        'https://dashboard-rest-api-1j07.onrender.com/api/orders',
        {
          product_name: values.product_name,
          price: priceNumber,
          order_date: values.order_date,
          customer_name: values.customer_name,
          product_category: values.category_name,
        },
        config,
      );

      if (res.data.msg === 'order created successfully') {
        toast.success('Order created successfully');
        navigate('/dashboard');
      } else {
        toast.error('Failed to create order');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while creating the order');
    }
  };
  const { Option } = Select;

  return (
    <div className={styles['signup-form']}>
      <h5 className={styles['signup-form__nav']}>
        <Link to="/dashboard">dashboard</Link>
      </h5>
      <div className={styles['signup-form-section']}>
        <div className={styles['signup-form-section__info']}>
          <Typography.Title
            level={2}
            className={styles['signup-form-section__info__title']}
          >
            Create an Order
          </Typography.Title>

          <div className={styles['signup-form-section__form']}>
            <Form onFinish={onFinish} layout="vertical">
              <Form.Item
                label="Customer name"
                name="customer_name"
                rules={[
                  {
                    required: true,
                    message: 'Pleas provide a name',
                    type: 'string',
                  },
                ]}
                className={styles['signup-form-section__label']}
              >
                <Input placeholder="Enter a name" />
              </Form.Item>

              <Form.Item
                label="Product name"
                name="product_name"
                rules={[
                  {
                    required: true,
                    message: 'Please provide a product name',
                    type: 'string',
                  },
                ]}
              >
                <Input placeholder="product name" />
              </Form.Item>

              <Form.Item
                label="Select a category"
                name="category_name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select>
                  <Option value="Sci-Fi">Sci-Fi</Option>
                  <Option value="Comedy">Comedy</Option>
                  <Option value="Drama">Drama</Option>
                  <Option value="Horror">Horror</Option>
                  <Option value="Docu">Docu</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Price"
                name="price"
                rules={[
                  {
                    required: true,
                    message: 'Please provide a price',
                    type: 'string',
                  },
                ]}
              >
                <Input placeholder="e.g 1200" />
              </Form.Item>

              <Form.Item
                label="Order date"
                name="order_date"
                rules={[
                  {
                    required: true,
                    message: 'Please provide a date',
                    type: 'string',
                  },
                ]}
              >
                <Input placeholder="e.g 3/2/2020" type="date" />
              </Form.Item>

              <div className={styles['signup-form-section__form__button']}>
                <button type="submit">Submit</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
