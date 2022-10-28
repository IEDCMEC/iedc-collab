import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as yup from "yup";
import { Form, Row, Col, InputGroup } from "react-bootstrap";
import { doEditProfile } from "../../Firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import "./EditModal.scss";
import { toast } from "react-toastify";
import Compress from "compress.js";

const compress = new Compress();
const NewUserForm = ({ onClose, user }) => {
  const [image, setImage] = useState(user?.profilePhoto || "");
  const [profilePhotoName, setProfilePhotoName] = useState(
    user?.profilePhotoName || ""
  );
  const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || "");
  //  const { fetchData } = useContext(UserContext);
  const initialValue = {
    name: user?.name || "",
    branch: user?.branch || "",
    year: user?.year || "",
    about: user?.about || "",
    skills: user?.skills?.join(", ") || "",
    achievements: user?.achievements || "",
    contact: user?.contact || "",
    email: user?.email || "",
    linkedin: user?.linkedin || "",
    github: user?.github || "",
    website: user?.website || "",
  };

  // const newProjectSchema = yup.object({
  //   desc: yup.string().required("Please add a valid description").min(10),
  //   contactNo: yup
  //     .string()
  //     .required()
  //     .matches(
  //       /^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
  //       "Please enter a valid 10 digit phone number"
  //     ),
  //   links: yup.string().min(4),
  //   githubLink: yup.string().optional().min(4),
  //   tags: yup.string(),
  //   teamMembers: yup.string(),
  // });

  const handleSubmit = (values, actions) => {
    const { skills } = values;
    const formValues = {
      ...values,
      skills: skills
        .split(",")
        .filter(Boolean)
        .map((link) => link.trim()),
      profilePhoto,
      profilePhotoName,
    };
    doEditProfile(formValues, () => {
      toast("Edited Profile Successfully", {
        autoClose: 2000,
      });
      window.location.reload();
    });
    onClose();
    actions.resetForm();
  };
  return (
    <div className="newProjectForm">
      <Formik
        initialValues={initialValue}
        // validationSchema={newProjectSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Name*</Form.Label>
              <Form.Control
                required
                onBlur={props.handleBlur("name")}
                value={props.values.name}
                type="text"
                placeholder="Enter Your Name"
              />
              <Form.Text className="text-danger">
                {props.touched.name && props.errors.name}
              </Form.Text>
            </Form.Group>
            <br />
            <InputGroup controlId="formPhoto" className="photoContainer">
              <Form.Label className="photoLabel">
                <span className="photoHead">Profile Photo*</span>
                <span className="photoIcon">
                  <FontAwesomeIcon icon={faUpload} />
                </span>

                <Form.Control
                  required
                  onBlur={props.handleBlur("photo")}
                  onChange={async (e) => {
                    try {
                      const results = await compress.compress(
                        [...e.target.files],
                        {
                          size: 1.5,
                          quality: 0.7,
                          rotate: false,
                          resize: true,
                        }
                      );
                      const img1 = results[0];
                      console.log(img1);
                      const base64str = results[0].data;
                      const imgExt = img1.ext;
                      const compressedImage = Compress.convertBase64ToFile(
                        base64str,
                        imgExt
                      );
                      setProfilePhoto(compressedImage);
                      setProfilePhotoName(e.target.files[0].name);
                      setImage(URL.createObjectURL(compressedImage));
                    } catch (error) {
                      setProfilePhoto(e.target.files[0]);
                      setProfilePhotoName(e.target.files[0].name);
                      setImage(URL.createObjectURL(e.target.files[0]));
                      console.log("Error in compressing: " + error);
                    }
                  }}
                  type="file"
                  className="customFile"
                />
                {/* </span> */}
              </Form.Label>
            </InputGroup>
            <Form.Text className="text-danger">
              {props.touched.photo && props.errors.photo}
            </Form.Text>
            <Row className="col-md-12 d-flex justify-content-center">
              {image && (
                <img
                  className="projectPhoto"
                  alt="project banner"
                  width="200px"
                  height="200px"
                  src={image}
                ></img>
              )}
            </Row>
            <Row>
              <Form.Group controlId="formBranch" className="col-md-6">
                <Form.Label>Branch*</Form.Label>
                <Form.Control
                  onBlur={props.handleBlur("branch")}
                  value={props.values.branch}
                  onChange={props.handleChange("branch")}
                  type="text"
                  placeholder="eg: CSE,ECE,EEE"
                />
                <Form.Text className="text-danger">
                  {props.touched.branch && props.errors.branch}
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formYear" className="col-md-6">
                <Form.Label>Year Of Passing*</Form.Label>
                <Form.Control
                  onBlur={props.handleBlur("year")}
                  value={props.values.year}
                  onChange={props.handleChange("year")}
                  type="text"
                  placeholder="eg: 2024,2025"
                />
                <Form.Text className="text-danger">
                  {props.touched.year && props.errors.year}
                </Form.Text>
              </Form.Group>
            </Row>
            <Form.Group controlId="formAboutMe">
              <Form.Label>About Me*</Form.Label>
              <Form.Control
                onBlur={props.handleBlur("about")}
                value={props.values.about}
                onChange={props.handleChange("about")}
                as="textarea"
                placeholder="lorem ipsum dolor si amet..."
                rows="3"
              />
              <Form.Text className="text-danger">
                {props.touched.about && props.errors.about
                  ? "Please enter a description greater than 10 characters"
                  : ""}
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formSkills">
              <Form.Label>Skills</Form.Label>
              <Form.Control
                onBlur={props.handleBlur("skills")}
                value={props.values.skills}
                onChange={props.handleChange("skills")}
                type="text"
                placeholder="Enter the skills..."
              />
              <Form.Text className="text-right helperText">
                Please separate the skills using commas
              </Form.Text>
              <Form.Text className="text-danger">
                {props.touched.skills && props.errors.skills}
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formAchievements">
              <Form.Label>Achievements*</Form.Label>
              <Form.Control
                required
                onBlur={props.handleBlur("achievements")}
                value={props.values.achievements}
                onChange={props.handleChange("achievements")}
                type="text"
                placeholder="Enter Your Achievements"
              />
              <Form.Text className="text-danger">
                {props.touched.achievements && props.errors.achievements}
              </Form.Text>
            </Form.Group>

            <Row>
              <Form.Group controlId="formContact" className="col-md-6">
                <Form.Label>Contact No.</Form.Label>
                <Form.Control
                  onBlur={props.handleBlur("constact")}
                  value={props.values.contact}
                  onChange={props.handleChange("contact")}
                  type="text"
                  placeholder="Enter your Contact No"
                />
                <Form.Text className="text-danger">
                  {props.touched.contact && props.errors.contact}
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formMail" className="col-md-6">
                <Form.Label>Mail ID</Form.Label>
                <Form.Control
                  onBlur={props.handleBlur("email")}
                  value={props.values.email}
                  type="text"
                  placeholder="eg: iedc@mec.ac.in"
                />
                <Form.Text className="text-danger">
                  {props.touched.email && props.errors.email}
                </Form.Text>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group controlId="formLinkedin" className="col-md-6">
                <Form.Label>LinkedIn</Form.Label>
                <Form.Control
                  onBlur={props.handleBlur("linkedin")}
                  value={props.values.linkedin}
                  onChange={props.handleChange("linkedin")}
                  type="text"
                  placeholder="eg: https://linkedin.com/in/IEDCMEC"
                />
                <Form.Text className="text-danger">
                  {props.touched.linkedin && props.errors.linkedin}
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formGithub" className="col-md-6">
                <Form.Label>Github</Form.Label>
                <Form.Control
                  onBlur={props.handleBlur("github")}
                  value={props.values.github}
                  onChange={props.handleChange("github")}
                  type="text"
                  placeholder="eg: https://github.com/IEDCMEC/iedc-collab-frontend"
                />
                <Form.Text className="text-danger">
                  {props.touched.github && props.errors.github}
                </Form.Text>
              </Form.Group>
            </Row>

            <Form.Group controlId="formWebsite">
              <Form.Label>Website*</Form.Label>
              <Form.Control
                required
                onBlur={props.handleBlur("website")}
                value={props.values.website}
                onChange={props.handleChange("website")}
                type="text"
                placeholder="Enter Website Link"
              />
              <Form.Text className="text-danger">
                {props.touched.website && props.errors.website}
              </Form.Text>
            </Form.Group>
            <br />
            <Row className="col-md-12 d-flex justify-content-center">
              <Button
                variant="outline-danger"
                className="btn"
                type="submit"
                size="sm"
                onClick={props.handleSubmit}
              >
                <strong>Submit</strong>
              </Button>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const EditProfileModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="modalbody">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="modalHead ">Edit Your Profile</h3>
          <i
            className="fa fa-close d-block d-md-none"
            style={{
              fontSize: "25px",
              right: "30px",
              padding: 10,
              cursor: "pointer",
            }}
            onClick={props.onHide}
          ></i>
        </div>
        <Col className="p-md-5">
          <NewUserForm onClose={props.onHide} user={props.user} />
        </Col>
      </Modal.Body>
    </Modal>
  );
};
export default EditProfileModal;
