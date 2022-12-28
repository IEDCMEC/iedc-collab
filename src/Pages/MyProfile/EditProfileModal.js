import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as yup from "yup";
import { Form, Row, Col, InputGroup } from "react-bootstrap";
import {
  doEditProfile,
  // getProjects,
  getSkills,
  addSkills,
} from "../../Firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import "./EditModal.scss";
import { toast } from "react-toastify";
import Compress from "compress.js";
import "./EditModal.scss";
import { Autocomplete, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ProjectContext } from "../../contexts/ProjectContext";

const compress = new Compress();
const NewUserForm = ({ onClose, user }) => {
  const [image, setImage] = useState(user?.profilePhoto || "");
  const [profilePhotoName, setProfilePhotoName] = useState(
    user?.profilePhotoName || ""
  );
  const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || "");
  // const [projects, setProjects] = useState([]);
  const { projects } = useContext(ProjectContext);
  const [acValue, setACValue] = useState(user?.projects || []);
  const [remainProjects, setRemainProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState();
  const [acValue1, setACValue1] = useState(user?.skills || []);
  const [remainSkills, setRemainSkills] = useState([]);
  // const getSkills=['React Js','Vanilla Js','Vue Js','Angular Js','Arduino','Rasberry Pi','IOT','C++','Python','Django','Flask','Java','Spring','Node JS','Kotlin', 'Fluuter','MySQL','PostgreSQL','SQLite'];
  //  const { fetchData } = useContext(UserContext);
  const initialValue = {
    name: user?.name || "",
    branch: user?.branch || "",
    year: user?.year || "",
    about: user?.about || "",
    skills: user?.skills || "",
    projects: user?.projects || "",
    achievements: user?.achievements || "",
    contact: user?.contact || "",
    email: user?.email || "",
    linkedin: user?.linkedin || "",
    github: user?.github || "",
    website: user?.website || "",
  };

  // const getWorks = async () => {
  //   await getProjects().then(async function (snapshot) {
  //     let messageObject = snapshot.val();
  //     const result = Object.keys(messageObject).map((key) => ({
  //       ...messageObject[key],
  //       id: key,
  //     }));
  //     setProjects(result);
  //   });
  // };

  useEffect(() => {
    // getWorks();
    getRemainProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects, acValue]);

  function getRemainProjects() {
    let temp = [];
    projects?.forEach((project) => {
      if (!acValue.find((item) => item.id === project.id)) temp.push(project);
    });
    setRemainProjects(temp);
    //console.log(acValue)

    //console.log(temp)
  }
  function getRemainSkills() {
    let temp1 = [];
    skills?.forEach((skill) => {
      if (!acValue1.find((item) => item === skill)) temp1.push(skill);
    });
    setRemainSkills(temp1);
    //console.log(acValue)

    //console.log(temp)
  }

  const getAbilities = async () => {
    await getSkills().then(async function (snapshot) {
      let messageObject = snapshot.val();
      setSkills(messageObject);
    });
  };

  useEffect(() => {
    getAbilities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skill, acValue1]);
  useEffect(() => {
    getRemainSkills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skills, acValue1]);

  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "&:hover .MuiOutlinedInput-notchedOutline": {
              color: "#9E0000",
              border: "2px solid #9E0000",
              borderRadius: "10px",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              color: "#9E0000",
              border: "2px solid #9E0000",
              borderRadius: "10px",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              color: "#9E0000",
              border: "2px solid #9E0000",
              borderRadius: "10px",
            },
            minHeight: "150%",
          },
        },
      },
    },
  });
  const newUserSchema = yup.object({
    about: yup.string().required("Please add a valid description").min(10),
    branch: yup.string().required("Please select a branch."),
    year: yup.string().required("Please select a passing year."),
    contact: yup
      .string()
      .required()
      .matches(
        /^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
        "Please enter a valid 10 digit phone number"
      ),
    achievements: yup.string(),
    github: yup.string().optional().min(4),
    linkedin: yup.string().optional().min(4),
    website: yup.string().optional().min(4),
  });

  const handleSubmit = (values, actions) => {
    // const { skills } = values;
    const formValues = {
      ...values,
      projects: acValue,
      skills: acValue1,
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
        validationSchema={newUserSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form>
            <Form.Group controlid="formBasicTitle">
              <Form.Label>Name*</Form.Label>
              <Form.Control
                required
                disabled
                style={{ cursor: "not-allowed" }}
                onBlur={props.handleBlur("name")}
                value={props.values.name}
              />
              <Form.Text className="text-danger">
                {props.touched.name && props.errors.name}
              </Form.Text>
            </Form.Group>
            <br />
            <InputGroup controlid="formPhoto" className="photoContainer">
              <Form.Label className="photoLabel">
                <span className="photoHead">Profile Photo</span>
                <span className="photoIcon">
                  <FontAwesomeIcon icon={faUpload} />
                </span>

                <Form.Control
                  required
                  onBlur={props.handleBlur("photo")}
                  onChange={async (e) => {
                    if (e.target.files[0].size > 1048576) {
                      toast("File size should be less than 1MB", {
                        autoClose: 2000,
                      });
                    } else {
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
                        // console.log(img1);
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
              <Form.Group controlid="formBranch" className="col-md-6">
                <Form.Label>Branch*</Form.Label>
                <Form.Control
                  as="select"
                  style={{
                    color: "#9E0000",
                    border: "2px solid #9E0000",
                    borderRadius: "10px",
                  }}
                  onBlur={props.handleBlur("branch")}
                  value={props.values.branch}
                  onChange={props.handleChange("branch")}
                >
                  <option value="">Choose Branch...</option>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="MECH">EBE</option>
                  <option value="MECH">MECH</option>
                </Form.Control>
                <Form.Text className="text-danger">
                  {props.touched.branch && props.errors.branch}
                </Form.Text>
              </Form.Group>
              <Form.Group controlid="formYear" className="col-md-6">
                <Form.Label>Year Of Passing*</Form.Label>
                <Form.Control
                  as="select"
                  style={{
                    color: "#9E0000",
                    border: "2px solid #9E0000",
                    borderRadius: "10px",
                  }}
                  onBlur={props.handleBlur("year")}
                  value={props.values.year}
                  onChange={props.handleChange("year")}
                >
                  <option value="">Choose Passing Year...</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </Form.Control>
                <Form.Text className="text-danger">
                  {props.touched.year && props.errors.year}
                </Form.Text>
              </Form.Group>
            </Row>
            <Form.Group
              controlid="formProjects"
              style={{
                border: "none",
              }}
            >
              <ThemeProvider theme={theme}>
                <Autocomplete
                  multiple
                  onChange={(event, value) => {
                    setACValue(value);
                  }}
                  id="checkboxes-tags-demo"
                  value={acValue}
                  options={remainProjects}
                  filterSelectedOptions
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.name}
                  renderOption={(props, option) => (
                    <li {...props}>{option.name}</li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      {...params}
                      label="Projects Worked In"
                      className={theme.root}
                      sx={{
                        "& .MuiInputLabel-root": {
                          color: "#9E0000",
                        },
                        "& label.Mui-focused": {
                          color: "#9E0000",
                        },
                      }}
                      variant="outlined"
                    />
                  )}
                />
              </ThemeProvider>

              <Form.Text className="text-danger">
                {props.touched.projects && props.errors.projects}
              </Form.Text>
            </Form.Group>
            <Form.Group controlid="formAboutMe">
              <Form.Label>About Me*</Form.Label>
              <Form.Control
                onBlur={props.handleBlur("about")}
                value={props.values.about}
                onChange={props.handleChange("about")}
                as="textarea"
                style={{whiteSpace: "pre-wrap"}}
                placeholder="lorem ipsum dolor si amet..."
                rows="3"
              />
              <Form.Text className="text-danger">
                {props.touched.about && props.errors.about
                  ? "Please enter a description greater than 10 characters"
                  : ""}
              </Form.Text>
            </Form.Group>
            <Form.Group controlid="formSkills">
              <ThemeProvider theme={theme}>
                <Autocomplete
                  multiple
                  onChange={(event, value) => {
                    setACValue1(value);
                  }}
                  id="checkboxes-tags-demo"
                  value={acValue1}
                  options={remainSkills}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      {...params}
                      label="Skills"
                      className={theme.root}
                      sx={{
                        "& .MuiInputLabel-root": {
                          color: "#9E0000",
                        },
                        "& label.Mui-focused": {
                          color: "#9E0000",
                        },
                      }}
                      variant="outlined"
                    />
                  )}
                />
              </ThemeProvider>
              <Form.Text className="text-danger">
                {props.touched.skills && props.errors.skills}
              </Form.Text>
            </Form.Group>
            <div className="add-skill-row">
              <Form.Group controlid="formContact" className="col-md-6">
                <Form.Label>
                  Enter Skill (If not present in skills list)
                </Form.Label>
                <Form.Control
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  type="text"
                  placeholder="Enter Skill"
                />
              </Form.Group>
              <div
                className="add-skill-btn"
                onClick={() => {
                  if (!skill) toast("Please enter a skill.");
                  else {
                    if (skill && skill.length > 0) {
                      for (let i = 0; i < skills.length; i++) {
                        if (skills[i].toLowerCase() === skill.toLowerCase()) {
                          toast("Skill already present in list.");
                          break;
                        }
                      }
                      addSkills(skill);
                      setSkill("");
                      setACValue1([...acValue1, skill]);
                    }
                  }
                }}
              >
                Add Skill
              </div>
            </div>
            <Form.Group controlid="formAchievements">
              <Form.Label>Achievements</Form.Label>
              <Form.Control
                required
                onBlur={props.handleBlur("achievements")}
                value={props.values.achievements}
                onChange={props.handleChange("achievements")}
                type="text"
                style={{whiteSpace: "pre-wrap"}}
                as="textarea"
                rows="3"
                placeholder="Enter Your Achievements"
              />
              <Form.Text className="text-danger">
                {props.touched.achievements && props.errors.achievements}
              </Form.Text>
            </Form.Group>

            <Row>
              <Form.Group controlid="formContact" className="col-md-6">
                <Form.Label>Contact No.*</Form.Label>
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
              <Form.Group controlid="formMail" className="col-md-6">
                <Form.Label>Mail ID*</Form.Label>
                <Form.Control
                  onBlur={props.handleBlur("email")}
                  value={props.values.email}
                  disabled
                  required
                />
                <Form.Text className="text-danger">
                  {props.touched.email && props.errors.email}
                </Form.Text>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group controlid="formLinkedin" className="col-md-6">
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
              <Form.Group controlid="formGithub" className="col-md-6">
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

            <Form.Group controlid="formWebsite">
              <Form.Label>Website</Form.Label>
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
