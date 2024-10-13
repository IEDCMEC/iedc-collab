import React, { useContext, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import firebase from "firebase";
import "firebase/firestore"
import { submitJob } from "../../Firebase/firebase";
// import {db} from "

import * as yup from "yup";
import {
  Autocomplete,
  createTheme,
  TextField,
  ThemeProvider,
} from "@mui/material";
import "./JobModal.scss";
import { ProjectContext } from "../../contexts/ProjectContext";
// import { collection, addDoc } from "firebase/firestore";
const JobModal = ({ show, onHide, job }) => {
  const [acValue, setACValue] = useState(job?.skills || []);
  const {profile} = useContext(ProjectContext)
  const initialValue = {
    job_name: job?.job_name || "",
    contact_email: job?.contact_email || "",
    phone_no: job?.phone_no || "",
    responsibilities: job?.responsibilities?.join(", ") || "",
    requirements: job?.requirements?.join(", ") || "",
    hiring_process: job?.hiring_process?.join(", ") || "",
    role: job?.role || "",
    work_hours: job?.work_hours || "",
    location: job?.location || "",
    start_date: job?.start_date || "",
    duration: job?.duration || "",
    skills_required: job?.skills_required || [],
    extra_benefits: job?.extra_benefits?.join(", ") || "",
  };

  const newJobSchema = yup.object({
    job_name: yup.string().required("Please add a valid job name").min(3),
    contact_email: yup
      .string()
      .required("Please add a valid contact email")
      .email("Please enter a valid email"),
    phone_no: yup
      .string()
      .required()
      .matches(
        /^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
        "Please enter a valid phone number"
      ),
    responsibilities: yup.string().required("Please add job responsibilities"),
    requirements: yup.string().required("Please add job requirements"),
    hiring_process: yup.string().required("Please add hiring process"),
    role: yup.string().required("Role is required"),
    work_hours: yup.string().required("Please add work hours"),
    location: yup.string().required("Please add location"),
    start_date: yup.string().required("Please add a start date"),
    duration: yup
      .number()
      .min(1, "Minimum duration is 1 month")
      .max(12, "Maximum duration is 12 months")
      .required("Duration is required"),
    skills_required: yup
      .array()
      .of(yup.string())
      .required("Please add required skills"),
    extra_benefits: yup.string().required("Please add extra benefits"),
  });

  const handleSubmit = async (values, actions) => {
    const formValues = {
      ...values,
      responsibilities: values.responsibilities
        .split(",")
        .map((item) => item.trim()),
      requirements: values.requirements.split(",").map((item) => item.trim()),
      hiring_process: values.hiring_process
        .split(",")
        .map((item) => item.trim()),
      skills_required: acValue,
      extra_benefits: values.extra_benefits
        .split(",")
        .map((item) => item.trim()),
        orgId: profile?.id
    };

    try{
     
      const docId = await submitJob(formValues);
      console.log("Job submitted successfully with ID:", docId);

      onHide();
      actions.resetForm();
    }catch(e){
      console.log("error adding job",e)
    }

    console.log(formValues);

    
  };

  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "&:hover .MuiOutlinedInput-notchedOutline": {
              color: "#9E0000",
              border: "2px solid #9E0000",
              outline: "none",
              borderRadius: "10px",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              color: "#9E0000",
              border: "2px solid #9E0000",
              outline: "none",
              borderRadius: "10px",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              color: "#9E0000",
              border: "2px solid #9E0000",
              outline: "none",
              borderRadius: "10px",
            },
            "& .MuiChip-root": {
              fontFamily: "Nunito",
              backgroundColor: "#9E0000",
              color: "white",
            },
            "& .MuiChip-deleteIcon": { color: "#fff !important" },
            minHeight: "150%",
          },
        },
      },
    },
  });

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Post a Job</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValue}
          validationSchema={newJobSchema}
          onSubmit={handleSubmit}
          validateOnChange={false}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit}>
              <Row className="form-row">
                <Form.Group as={Col} controlId="formBasicTitle">
                  <Form.Label>Job Name*</Form.Label>
                  <Form.Control
                    required
                    onBlur={props.handleBlur("job_name")}
                    value={props.values.job_name}
                    onChange={props.handleChange("job_name")}
                    type="text"
                    placeholder="Enter Job Name"
                  />
                  <Form.Text className="text-danger">
                    {props.touched.job_name && props.errors.job_name}
                  </Form.Text>
                </Form.Group>

                <Form.Group as={Col} controlId="formBasicEmail">
                  <Form.Label>Contact Email*</Form.Label>
                  <Form.Control
                    required
                    onBlur={props.handleBlur("contact_email")}
                    value={props.values.contact_email}
                    onChange={props.handleChange("contact_email")}
                    type="email"
                    placeholder="Enter Contact Email"
                  />
                  <Form.Text className="text-danger">
                    {props.touched.contact_email && props.errors.contact_email}
                  </Form.Text>
                </Form.Group>
              </Row>

              <Row className="form-row">
                <Form.Group as={Col} controlId="formBasicPhone">
                  <Form.Label>Phone Number*</Form.Label>
                  <Form.Control
                    required
                    onBlur={props.handleBlur("phone_no")}
                    value={props.values.phone_no}
                    onChange={props.handleChange("phone_no")}
                    type="text"
                    placeholder="Enter Phone Number"
                  />
                  <Form.Text className="text-danger">
                    {props.touched.phone_no && props.errors.phone_no}
                  </Form.Text>
                </Form.Group>

                <Form.Group as={Col} controlId="formResponsibilities">
                  <Form.Label>Responsibilities*</Form.Label>
                  <Form.Control
                    required
                    onBlur={props.handleBlur("responsibilities")}
                    value={props.values.responsibilities}
                    onChange={props.handleChange("responsibilities")}
                    as="textarea"
                    style={{ whiteSpace: "pre-wrap" }}
                    placeholder="Enter Responsibilities (comma separated)"
                    rows="3"
                  />
                  <Form.Text className="text-danger">
                    {props.touched.responsibilities &&
                      props.errors.responsibilities}
                  </Form.Text>
                </Form.Group>
              </Row>

              <Row className="form-row">
                <Form.Group as={Col} controlId="formRequirements">
                  <Form.Label>Requirements*</Form.Label>
                  <Form.Control
                    required
                    onBlur={props.handleBlur("requirements")}
                    value={props.values.requirements}
                    onChange={props.handleChange("requirements")}
                    as="textarea"
                    style={{ whiteSpace: "pre-wrap" }}
                    placeholder="Enter Requirements (comma separated)"
                    rows="3"
                  />
                  <Form.Text className="text-danger">
                    {props.touched.requirements && props.errors.requirements}
                  </Form.Text>
                </Form.Group>

                <Form.Group as={Col} controlId="formHiringProcess">
                  <Form.Label>Hiring Process*</Form.Label>
                  <Form.Control
                    required
                    onBlur={props.handleBlur("hiring_process")}
                    value={props.values.hiring_process}
                    onChange={props.handleChange("hiring_process")}
                    as="textarea"
                    style={{ whiteSpace: "pre-wrap" }}
                    placeholder="Enter Hiring Process (comma separated)"
                    rows="3"
                  />
                  <Form.Text className="text-danger">
                    {props.touched.hiring_process &&
                      props.errors.hiring_process}
                  </Form.Text>
                </Form.Group>
              </Row>

              <Row className="form-row">
                <Form.Group as={Col} controlId="formRole">
                  <Form.Label>Role*</Form.Label>
                  <Form.Control
                    required
                    onBlur={props.handleBlur("role")}
                    value={props.values.role}
                    onChange={props.handleChange("role")}
                    type="text"
                    placeholder="Enter Role"
                  />
                  <Form.Text className="text-danger">
                    {props.touched.role && props.errors.role}
                  </Form.Text>
                </Form.Group>

                <Form.Group as={Col} controlId="formWorkHours">
                  <Form.Label>Work Hours*</Form.Label>
                  <Form.Control
                    required
                    onBlur={props.handleBlur("work_hours")}
                    value={props.values.work_hours}
                    onChange={props.handleChange("work_hours")}
                    type="text"
                    placeholder="Enter Work Hours"
                  />
                  <Form.Text className="text-danger">
                    {props.touched.work_hours && props.errors.work_hours}
                  </Form.Text>
                </Form.Group>
              </Row>

              <Row className="form-row">
                <Form.Group as={Col} controlId="formLocation">
                  <Form.Label>Location*</Form.Label>
                  <Form.Control
                    required
                    onBlur={props.handleBlur("location")}
                    value={props.values.location}
                    onChange={props.handleChange("location")}
                    type="text"
                    placeholder="Enter Location"
                  />
                  <Form.Text className="text-danger">
                    {props.touched.location && props.errors.location}
                  </Form.Text>
                </Form.Group>

                <Form.Group as={Col} controlId="formStartDate">
                  <Form.Label>Start Date*</Form.Label>
                  <Form.Control
                    required
                    onBlur={props.handleBlur("start_date")}
                    value={props.values.start_date}
                    onChange={props.handleChange("start_date")}
                    type="date"
                  />
                  <Form.Text className="text-danger">
                    {props.touched.start_date && props.errors.start_date}
                  </Form.Text>
                </Form.Group>
              </Row>

              <Row className="form-row">
                <Form.Group as={Col} controlId="formDuration">
                  <Form.Label>Duration (months)*</Form.Label>
                  <Form.Control
                    required
                    onBlur={props.handleBlur("duration")}
                    value={props.values.duration}
                    onChange={props.handleChange("duration")}
                    type="number"
                    min="1"
                    max="12"
                    placeholder="Enter Duration"
                  />
                  <Form.Text className="text-danger">
                    {props.touched.duration && props.errors.duration}
                  </Form.Text>
                </Form.Group>

                <Form.Group as={Col} controlId="formSkillsRequired">
                  <Form.Label>Skills Required (comma separated) *</Form.Label>
                  <ThemeProvider theme={theme}>
                    <Autocomplete
                      multiple
                      freeSolo
                      onBlur={props.handleBlur("skills_required")}
                      value={acValue}
                      onChange={(event, newValue) => setACValue(newValue)}
                      options={
                        props.values.skills_required &&
                        props.values.skills_required.map((skill) => skill)
                      }
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Enter Skills" />
                      )}
                    />
                  </ThemeProvider>
                  <Form.Text className="text-danger">
                    {props.touched.skills_required &&
                      props.errors.skills_required}
                  </Form.Text>
                </Form.Group>
              </Row>

              <Row className="form-row">
                <Form.Group as={Col} controlId="formExtraBenefits">
                  <Form.Label>Extra Benefits*</Form.Label>
                  <Form.Control
                    required
                    onBlur={props.handleBlur("extra_benefits")}
                    value={props.values.extra_benefits}
                    onChange={props.handleChange("extra_benefits")}
                    as="textarea"
                    style={{ whiteSpace: "pre-wrap" }}
                    placeholder="Enter Extra Benefits (comma separated)"
                    rows="3"
                  />
                  <Form.Text className="text-danger">
                    {props.touched.extra_benefits &&
                      props.errors.extra_benefits}
                  </Form.Text>
                </Form.Group>
              </Row>

              <div className="btn-row">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default JobModal;
