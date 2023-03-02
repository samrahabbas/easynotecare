import { Form, Formik, Field, ErrorMessage } from "formik"
import * as Yup from 'yup'
import { CurrentDate } from "../../../../../../../_helper/currentDate"
import { randomID } from "../../../../../../../_helper/randomID"

const registrationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Mininum 3 characters required')
        .max(50, 'Maximum 50 characters are required')
        .required("Name is required")
})

const DiagnosticsTypeForm = ({ setNewTypeForm, AddType }) => {
    return (
        <Formik
            initialValues={{
                formID: "ALLERGY-" + randomID(),
                dateCreated: CurrentDate(),
                name: ''
            }}
            validationSchema={registrationSchema}
            onSubmit={(values) => {
                AddType(values)
                setNewTypeForm(false)
            }}
        >
            {({ resetForm }) => (
                <Form>
                    <div className="row">
                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                            <label className=' fw-bold fs-6 mb-2'>Type Name</label>
                            <Field
                                name="name"
                                className='form-control form-control-solid mb-3 mb-lg-0'
                                placeholder='Enter The Name Of Your Allergy Type'
                                autoComplete="off"
                                required
                            />
                            <ErrorMessage name="name" component="div" className="text-danger" />
                        </div>
                        <div className="my-5">
                            <button className="btn btn-sm btn-primary" type="submit">
                                Save
                            </button>
                            <button className="btn btn-sm btn-primary mx-3"
                                onClick={() => {
                                    setNewTypeForm(false)
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default DiagnosticsTypeForm