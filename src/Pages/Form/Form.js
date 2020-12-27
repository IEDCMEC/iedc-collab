import React, { useState } from 'react'
import './Form.css'

const Form = () => {
    const [displayPasswordForm, setDisplayPasswordForm] = useState("block")
    const [displayMainForm, setdisplayMainForm] = useState("none")

    const passwordValidate = (e) => {
        e.preventDefault()
        //  VALIDATION LOGIC TO BE ADDED

        setDisplayPasswordForm("none")
        setdisplayMainForm("block")
    }

    return (
        <div className="form-page">
            <div className="main-container">

                <div className="password-form" style={{ display: displayPasswordForm }}>
                    <form action="" method="" onSubmit={passwordValidate}>
                        <div className="form-field">
                            <div className="form-field-title">Enter password</div>
                            <input type="password" placeholder="Enter the password" required />
                        </div>
                        <div className="submit-container">
                            <button className="submit-btn" type="submit"> SUBMIT</button>
                        </div>
                    </form>
                </div>

                <div className="main-form" style={{ display: displayMainForm }}>
                    <div className="form-header">
                        <h3>CONTACT US</h3>
                    </div>
                    <hr />
                    <form action="" method="" onSubmit="">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-field-title">Company Name</div>
                                <input placeholder="Enter your company name" required />
                            </div>
                            <div className="col-sm-6 mt-2 mt-sm-0">
                                <div className="form-field-title">Phone</div>
                                <input type="text" placeholder="Enter your phone number" required />
                            </div>
                        </div>
                        <div className="form-field">
                            <div className="form-field-title">Email</div>
                            <input type="email" placeholder="Enter your email" required />
                        </div>
                        <div className="form-field">
                            <div className="form-field-title">Internship project</div>
                            <input type="text" placeholder="Enter your project title" required />
                        </div>
                        <div className="form-field">
                            <div className="form-field-title">Description</div>
                            <textarea placeholder="Enter a brief description of your project" required ></textarea>
                        </div>
                        <div className="form-field">
                            <div className="form-field-title">Links</div>
                            <input type="text" placeholder="Enter project links" required />
                        </div>
                        <div className="submit-container">
                            <button className="submit-btn" type="submit">SUBMIT</button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default Form

