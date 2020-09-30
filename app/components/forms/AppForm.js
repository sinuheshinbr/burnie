import React from 'react'
import { Formik } from 'formik'

const AppForm = ({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  innerRef
}) => {
  return (
    <Formik
      innerRef={innerRef}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  )
}

export default AppForm
