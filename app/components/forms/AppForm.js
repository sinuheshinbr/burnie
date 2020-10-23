import React from 'react'
import { Formik } from 'formik'
import SubmitButton from '../forms/SubmitButton'

const AppForm = ({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  innerRef,
  submitButtonTitle,
  displaySubmitButton = false,
  validateOnChange,
  validateOnBlur,
  isSubmitting
}) => {
  return (
    <Formik
      validateOnChange={validateOnChange}
      validateOnBlur={validateOnBlur}
      innerRef={innerRef}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => (
        <>
          {children}
          {displaySubmitButton && (
            <SubmitButton title={submitButtonTitle} disabled={isSubmitting} />
          )}
        </>
      )}
    </Formik>
  )
}

export default AppForm
