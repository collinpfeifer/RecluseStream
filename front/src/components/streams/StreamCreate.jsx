import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {createStream} from '../../actions';

const StreamCreate = ({ handleSubmit, createStream }) => {

  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className='ui error message'>
          <div className='header'>{error}</div>
        </div>
      );
    }
  };

  const renderInput = ({ input, label, meta }) => {
    const fieldClass = `field ${meta.error && meta.touched ? 'error' : ''}`
    return (
      <div className={fieldClass}>
        <label>{label}</label>
        <input {...input} autoComplete='off' />
        {renderError(meta)}
      </div>
    );
  };

  const onSubmit = (formValues) => {
    createStream(formValues);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='ui form error'>
      <Field name='title' component={renderInput} label='Enter Title' />
      <Field
        name='description'
        component={renderInput}
        label='Enter Description'
      />
      <button className='ui button primary'>Submit</button>
    </form>
  );
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }

  return errors;
};

const formWrapped =  reduxForm({
  form: 'createStream',
  validate,
})(StreamCreate);

export default connect(null,{createStream})(formWrapped);