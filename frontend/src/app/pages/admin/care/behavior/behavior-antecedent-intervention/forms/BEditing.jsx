import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup'
import { updateBehaviorCategory } from '../../behavior-antecedent-intervention-categories/store/actions';

const registrationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required("Name is required"),
    type: Yup.string()
        .required("Type is required"),
    category: Yup.string()
        .required("Category is required"),
    description: Yup.string()
        .max(3000, "Maximum 3000 characters")
})

const BEditing = ({ setEditEntryDataB, setShowEditingFormB, editEntryDataB, updateBehavior }) => {
    const dispatch=useDispatch()
    return (
        <div className='mt-5'>
            <div className="d-flex justify-content-center">
                <div className='card card-flush h-md-100 w-100'>
                    <div className="d-flex w-100">
                        <div className="card-header w-75">
                            <div className="card-title">
                                <h3 className="fw-bolder">Form for editing: {editEntryDataB.name}</h3>
                            </div>
                        </div>
                    </div>
                    <Formik
                        initialValues={editEntryDataB}
                        validationSchema={registrationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            // updateBehavior(values)
              dispatch(updateBehaviorCategory(values))
                            setShowEditingFormB(true)
                            setEditEntryDataB('')
                        }}>
                        {({ isSubmitting, resetForm }) => (
                            <div className="card-body d-flex justify-content-center py-1">
                                <Form>
                                    <div className='d-flex my-6'>
                                        <div>
                                            <button className='btn btn-primary btn-sm me-4' onClick={() => {
                                                resetForm()
                                                setShowEditingFormB(true)
                                            }}>Cancel</button>
                                        </div>
                                        <div>
                                            <button type="submit" className='btn btn-primary btn-sm'>Save</button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Name</label>
                                            <Field
                                                name='name'
                                                className='form-control form-control-solid mb-3 mb-lg-0'
                                                placeholder='Name'
                                                autoComplete="off"
                                            />
                                        </div>
                                        <ErrorMessage name="name" component="div" className='text-danger' />
                                        <div className="d-flex w-100">
                                            <div className='w-50'>
                                                <label className=' fw-bold fs-6 mb-2 w-100'>Type</label>
                                                <label className="fw-bold fs-4 mb-2 w-100">Behavior</label>
                                            </div>
                                            <div className='w-50'>
                                                <label className=' fw-bold fs-6 mb-2'>Categories</label>
                                                <Field as="select" className='form-select form-select-lg mb-3'
                                                    name="category" aria-label='.form-select-lg example'>
                                                    <option hidden>Select Categories</option>
                                                    <option value='Assualtive'>Assualtive</option>
                                                    <option value='Attention Seeking'>Attention Seeking</option>
                                                    <option value='Mental Health'>Mental Health</option>
                                                    <option value='Non-Compliant'>Non-Compliant</option>
                                                    <option value='Obsessive-Compulsive'>Obsessive-Compulsive</option>
                                                    <option value='Positive Behavior'>Positive Behavior</option>
                                                    <option value='Property Destruction'>Property Destruction</option>
                                                    <option value='Self Injurious'>Self Injurious</option>
                                                    <option value='Self Stimulation'>Self Stimulation</option>
                                                    <option value='Speech'>Speech</option>
                                                </Field>
                                                <ErrorMessage name="category" component="div" className='text-danger' />
                                            </div>
                                        </div>
                                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                            <label className=' fw-bold fs-6 mb-2'>Description</label>
                                            <Field
                                                as="textarea"
                                                name='description'
                                                className='form-control form-control-solid mb-3 mb-lg-0'
                                                placeholder='Add description here...'
                                                rows="4"
                                            />
                                            <ErrorMessage name="description" component="div" className='text-danger' />
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

export default BEditing