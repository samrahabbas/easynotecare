import { Fragment, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import AddressRow from "./AddressRow"
import { Sort_by } from "../../../../../../_helper/objectSorter"
import SubMenuSection from "../SubMenuSection"

const AddressList = ({ location }) => {
    const [sortedBy, setSortedBy] = useState('')
    const [addresses, setAddresses] = useState([])

    const history = useHistory()

    useEffect(() => {
        if (location.state === undefined) {
            history.push("/care/individual-intake/list")
        } else {
            let clientInfo = location.state
            let tempAddress = []
            axios.get("/programs/get")
                .then(res => {
                    let programData = res.data
                    for (const element of programData) {
                        if (element.individualsAdded.includes(clientInfo.formID)) {
                            let tempObj = {
                                name: element.siteName,
                                address: element?.siteAddress,
                                enteredDate: element?.createDate,
                                addrType: "Site Address",
                                primaryPhone: "-N/A-",
                                secondaryPhone: "-N/A=",
                            }
                            tempAddress.push(tempObj)
                        }
                    }
                    if (clientInfo.residentialAddr) {
                        let tempObj = {
                            name: "Residential Address",
                            address: clientInfo.addrInfo.st1 +
                                " " + clientInfo.addrInfo.st2 +
                                " " + clientInfo.addrInfo.state +
                                " " + clientInfo.addrInfo.city +
                                " " + clientInfo.addrInfo.zipCode +
                                " " + clientInfo.addrInfo.country,
                            primaryPhone: clientInfo?.addrInfo?.primaryPhone,
                            secondaryPhone: clientInfo?.addrInfo?.secondaryPhone,
                            enteredDate: clientInfo?.enteredDate,
                            addrType: "IDF Address",
                        }
                        tempAddress.push(tempObj)
                    }
                    if (clientInfo.mailingAddr) {
                        let tempObj = {
                            name: "Mailing Address",
                            address: clientInfo?.mailingInfo?.st1 +
                                " " + clientInfo?.mailingInfo?.st2 +
                                " " + clientInfo?.mailingInfo?.state +
                                " " + clientInfo?.mailingInfo?.city +
                                " " + clientInfo?.mailingInfo?.zipCode +
                                " " + clientInfo?.mailingInfo?.country,
                            primaryPhone: clientInfo?.mailingInfo?.primaryPhone,
                            secondaryPhone: clientInfo?.mailingInfo?.secondaryPhone,
                            enteredDate: clientInfo?.enteredDate,
                            addrType: "IDF Address"
                        }
                        tempAddress.push(tempObj)
                    }
                })
                .then(() => {
                    setAddresses(tempAddress)
                })
        }
    }, [])

    return (
        <div>
            <div className="card mb-5 col-mb-10" id="kt-content">
                <div className="post d-flex flex-column-fluid" id="kt_post">
                    <div className="container-xxl" id="kt_content-container">
                        <div className="mt-6 mx-6">
                            <SubMenuSection individual={location.state} />
                        </div>
                        <div className="card-header border-0 pt-6">
                            <div className="w-100">
                                <h3 className="fw-bolder">List of Addresses under: {location.state.firstName} {location.state.lastName}</h3>
                            </div>
                        </div>
                        <div className="card-body table-responsive mt-4" style={{ padding: "0rem 2.25rem" }}>
                            <table
                                className='table table-light table-rounded table-striped border border-2 table-hover fs-6 gy-5'
                                id='kt_address_table'
                            >
                                <thead>
                                    <tr className='text-start table-dark text-gray-400 table-rounded fw-bolder fs-7 text-uppercase gs-0'>
                                        <th className="px-3 min-w-150px" style={{ cursor: "pointer" }} onClick={() => {
                                            if (sortedBy !== "name") {
                                                let finalSort = addresses.sort(Sort_by('name', false, (a) => a.toUpperCase()))
                                                setAddresses(finalSort)
                                                setSortedBy("name")
                                            } else if (sortedBy === "name") {
                                                let finalSort = addresses.sort(Sort_by('name', true, (a) => a.toUpperCase()))
                                                setAddresses(finalSort)
                                                setSortedBy('')
                                            }
                                        }}>
                                            Name
                                            <i className={sortedBy === "name" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                        </th>
                                        <th className="px-3 min-w-150px" style={{ cursor: "pointer" }} onClick={() => {
                                            if (sortedBy !== "addrType") {
                                                let finalSort = addresses.sort(Sort_by('addrType', false, (a) => a.toUpperCase()))
                                                setAddresses(finalSort)
                                                setSortedBy("addrType")
                                            } else if (sortedBy === "addrType") {
                                                let finalSort = addresses.sort(Sort_by('addrType', true, (a) => a.toUpperCase()))
                                                setAddresses(finalSort)
                                                setSortedBy('')
                                            }
                                        }}>
                                            Address Type
                                            <i className={sortedBy === "addrType" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                        </th>
                                        <th className="px-3 min-w-250px" style={{ cursor: "pointer" }} onClick={() => {
                                            if (sortedBy !== "address") {
                                                let finalSort = addresses.sort(Sort_by('address', false, (a) => a.toUpperCase()))
                                                setAddresses(finalSort)
                                                setSortedBy("address")
                                            } else if (sortedBy === "address") {
                                                let finalSort = addresses.sort(Sort_by('address', true, (a) => a.toUpperCase()))
                                                setAddresses(finalSort)
                                                setSortedBy('')
                                            }
                                        }}>
                                            Address & Location
                                            <i className={sortedBy === "address" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                        </th>
                                        <th className="px-3 min-w-150px" style={{ cursor: "pointer" }} onClick={() => {
                                            if (sortedBy !== "primaryPhone") {
                                                let finalSort = addresses.sort(Sort_by('primaryPhone', false, (a) => a.toUpperCase()))
                                                setAddresses(finalSort)
                                                setSortedBy("primaryPhone")
                                            } else if (sortedBy === "primaryPhone") {
                                                let finalSort = addresses.sort(Sort_by('primaryPhone', true, (a) => a.toUpperCase()))
                                                setAddresses(finalSort)
                                                setSortedBy('')
                                            }
                                        }}>
                                            Primary Phone
                                            <i className={sortedBy === "primaryPhone" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                        </th>
                                        <th className="px-3 min-w-150px" style={{ cursor: "pointer" }} onClick={() => {
                                            if (sortedBy !== "secondaryPhone") {
                                                let finalSort = addresses.sort(Sort_by('secondaryPhone', false, (a) => a.toUpperCase()))
                                                setAddresses(finalSort)
                                                setSortedBy("secondaryPhone")
                                            } else if (sortedBy === "secondaryPhone") {
                                                let finalSort = addresses.sort(Sort_by('secondaryPhone', true, (a) => a.toUpperCase()))
                                                setAddresses(finalSort)
                                                setSortedBy("")
                                            }
                                        }}>
                                            Secondary Phone
                                            <i className={sortedBy === "secondaryPhone" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                        </th>
                                        <th className="px-3 min-w-150px" style={{ cursor: "pointer" }} onClick={() => {
                                            if (sortedBy !== "enteredDate") {
                                                let finalSort = addresses.sort(Sort_by('enteredDate', false, parseInt))
                                                setAddresses(finalSort)
                                                setSortedBy("enteredDate")
                                            } else if (sortedBy === "enteredDate") {
                                                let finalSort = addresses.sort(Sort_by('enteredDate', true, parseInt))
                                                setAddresses(finalSort)
                                                setSortedBy("")
                                            }
                                        }}>
                                            Entered Date
                                            <i className={sortedBy === "enteredDate" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill"} />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {addresses.length > 0 ? addresses.map((address, index) => (
                                        <Fragment key={index}>
                                            <AddressRow address={address} />
                                        </Fragment>
                                    ))
                                        :
                                        <tr>
                                            <td align="center" colSpan={12}><span className='text-gray-600 fs-2 fw-bolder'>No Addresses Found</span></td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AddressList