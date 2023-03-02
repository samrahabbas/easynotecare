import { Form, Formik, Field, ErrorMessage } from "formik"
import * as Yup from 'yup'
import { randomID } from "../../../../../../_helper/randomID"
import axios from "axios"
import { useSelector } from 'react-redux'
const selectAuth = (state) => state.auth;

const registrationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Mininum 3 characters required')
        .max(50, 'Maximum 50 characters are required')
        .required("Name is required")
})

const NewTypeForm = ({ setNewTypeForm }) => {

    const auth = useSelector(selectAuth);

	const companyid = auth.user?.company_code

    return (
        <Formik
            initialValues={{
                name: '',
                formID: "SCT-" + randomID(),
                company_code: companyid
            }}
            validationSchema={registrationSchema}
            onSubmit={(values) => {
                axios.post("/sharedtype/create", values)
                    .then(() => {
                        setNewTypeForm(false)
                    })
            }}
        >
            {({ resetForm }) => (
                <Form>
                    <div className='card-body'>
                        <div className="row">
                            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-3'>
                                <label className=' fw-bold fs-6 mb-2'>Name</label>
                                <Field
                                    name="name"
                                    className='form-control form-control-solid mb-3 mb-lg-0'
                                    placeholder='Enter The Name Of Your Shared Contact Type'
                                    autoComplete="off"
                                    required
                                />
                                <ErrorMessage name="name" component="div" className="text-danger" />
                            </div>
                            <div className="my-5">
                                <button className="btn btn-sm btn-primary" type="submit">
                                    Create
                                </button>
                                <button className="btn btn-sm btn-primary mx-3"
                                    onClick={() => {
                                        resetForm()
                                        setNewTypeForm(false)
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default NewTypeForm