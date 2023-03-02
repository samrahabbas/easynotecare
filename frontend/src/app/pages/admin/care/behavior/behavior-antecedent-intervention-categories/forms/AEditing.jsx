import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup'
import { updateBehaviorCategory } from '../store/actions';

const registrationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required("Name is required"),
    type: Yup.string()
        .required("Type is required")
})

const AEditing = ({ setEditEntryDataA, setShowEditingFormA, editEntryDataA, updateAntecedent }) => {
    const dispatch=useDispatch()
    return (
        <div className='mt-5'>
            <div className="d-flex justify-content-center">
                <div className='card card-flush h-md-100 w-100'>
                    <div className="d-flex w-100">
                        <div className="card-header w-75">
                            <div className="card-title">
                                <h3 className="fw-bolder">Form for editing: {editEntryDataA.name}</h3>
                            </div>
                        </div>
                    </div>
                    <Formik
                        initialValues={editEntryDataA}
                        validationSchema={registrationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            updateAntecedent(values)
                            dispatch(updateBehaviorCategory(values))
                            setShowEditingFormA(true)
                            setEditEntryDataA('')
                        }}>
                        {({ isSubmitting, resetForm }) => (
                            <div className="card-body d-flex justify-content-center py-1">
                                <Form className='w-100'>
                                    <div className='d-flex my-6'>
                                        <div>
                                            <button className='btn btn-primary btn-sm me-4' onClick={() => {
                                                resetForm()
                                                setShowEditingFormA(true)
                                            }}>Cancel</button>
                                        </div>
                                        <div>
                                            <button type="submit" className='btn btn-primary btn-sm'>Save</button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Name</label>
                                            <Field
                                                name='name'
                                                className='form-control form-control-solid mb-3 mb-lg-0'
                                                placeholder='Name'
                                                autoComplete="off"
                                            />
                                        </div>
                                        <ErrorMessage name="name" component="div" className='text-danger' />
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Type</label>
                                            <label className="fw-bold fs-4 mb-2 w-100">Antecedent</label>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default AEditing