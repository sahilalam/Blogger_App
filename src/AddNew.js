import React from "react";
import { Form, Row, Col, Nav, Modal, Spinner } from "react-bootstrap";
import Context from "./Context.js";

import createBody from "./creatBody.js";
export default function AddNew() {
  const context = React.useContext(Context);
  let [stitle, setStitle] = React.useState(true);
  let [ssummary, setSsummary] = React.useState(false);
  let [simage, setSimage] = React.useState(false);
  let [scategory, setScategory] = React.useState(false);
  let [sbody, setSbody] = React.useState(false);

  let [title, setTitle] = React.useState("");
  let [summary, setSummary] = React.useState("");
  let [image_url, setImage] = React.useState("");
  let [category, setCategory] = React.useState("");
  let [body, setBody] = React.useState("");
  let [public_id, setPublicId] = React.useState("");
  let [submit, setSubmit] = React.useState(false);
  let [spinner, setSpinner] = React.useState(false);
  let [data, setData] = React.useState("");
  let upload = async () => {
    if (public_id.length) {
      setPublicId("");
      let details = {
        token: public_id
      };
      let Body = JSON.stringify(details);
      const resp = await fetch(
        "https://api.cloudinary.com/v1_1/dohdwfkhg/delete_by_token",
        {
          method: "POST",
          body: Body,
          mode: "cors",
          responseType: "dataType",
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json"
          }
        }
      );
      console.log(resp);
    }

    window.cloudinary.openUploadWidget(
      {
        resourceType: "image",
        cloudName: "dohdwfkhg",
        uploadPreset: "kzvtq2sl",
        clientAllowedFormats: ["jpg", "png", "gif", "jpeg"],
        cropping: true,
        croppingAspectRatio: 2,
        return_delete_token: true
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          setImage(result.info.secure_url);
          setPublicId(result.info.delete_token);
        }
      }
    );
    console.log("hello");
  };
  let addBlog = async event => {
    event.preventDefault();
    setSubmit(true);
    setSpinner(true);
    try {
      let date = new Date();
      let details = {
        title,
        category,
        subject: summary,
        image_url,
        body,
        date
      };
      let Body = createBody(details);
      let resp = await fetch(
        "https://blogger-app-backend.herokuapp.com/add/blog",
        {
          method: "POST",
          body: Body,
          headers: {
            authorization: window.localStorage.access_token,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          }
        }
      );
      if (data.status == 500) {
        context.logout();
      }
      resp = await resp.json();
      setSubmit(true);
      setSpinner(false);
      setData(resp.message);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container-fluid p-0">
      <h3 className="heading text-center">New Blog</h3>
      <Form onSubmit={addBlog}>
        <Row className="justify-content-center box box-shadow-dark pt-5 pb-5 left-animation mb-2 bg-stars add-blog align-items-center">
          {stitle && (
            <Col xs="12">
              <Row className="justify-content-center ">
                <Col xs="12" className="heading p-2 top-animation">
                  Add The Title
                </Col>
                <Col xs="12" className="p-2 bottom-animation">
                  <Form.Control
                    onChange={event => {
                      setTitle(event.target.value);
                    }}
                    type="text"
                    placeholder="Enter Title for your new blog.."
                    required={true}
                    value={title}
                  />
                </Col>
                <Col xs="6" className="p-2 right-animation">
                  <Nav.Link
                    className="buton p-2"
                    onClick={() => {
                      setStitle(false);
                      setSsummary(true);
                    }}
                    disabled={title.length ? false : true}
                  >
                    Next
                  </Nav.Link>
                </Col>
              </Row>
            </Col>
          )}
          {ssummary && (
            <Col xs="12">
              <Row className="justify-content-center">
                <Col xs="12" className="heading p-2 top-animation">
                  Add Summary for your Blog..
                </Col>
                <Col xs="12" className="p-2 bottom-animation">
                  <Form.Control
                    onChange={event => {
                      setSummary(event.target.value);
                    }}
                    type="text"
                    placeholder="Enter short summary for your new blog.."
                    required={true}
                    value={summary}
                  />
                </Col>
                <Col xs="6" className="p-2 left-animation">
                  <Nav.Link
                    className="buton p-2"
                    onClick={() => {
                      setSsummary(false);
                      setStitle(true);
                    }}
                  >
                    Prev
                  </Nav.Link>
                </Col>
                <Col xs="6" className="p-2 right-animation">
                  <Nav.Link
                    className="buton p-2"
                    onClick={() => {
                      setSsummary(false);
                      setScategory(true);
                    }}
                    disabled={summary.length ? false : true}
                  >
                    Next
                  </Nav.Link>
                </Col>
              </Row>
            </Col>
          )}
          {scategory && (
            <Col xs="12">
              <Row className="justify-content-center">
                <Col xs="12" className="heading p-2 top-animation">
                  Add Category for your Blog..
                </Col>
                <Col xs="12" className="p-2 bottom-animation">
                  <select
                    onChange={event => {
                      setCategory(event.target.value);
                    }}
                    type="text"
                    placeholder="Choose category for your new blog.."
                    className="form-control"
                    required={true}
                    value={category}
                  >
                    <option value="Tech">Tech</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Movies and series">Movies And Series</option>
                    <option value="Cartoons and Anime">
                      Cartoons and Anime
                    </option>
                    <option value="Sports">Sports</option>
                    <option value="Fun">Fun</option>
                    <option value="Cars">Cars</option>
                    <option value="Mototbikes">MotorBikes</option>
                    <option value="Food and Drinks">Food and Drinks</option>
                    <option value="Programming">Programming</option>
                    <option value="Travelling">Travelling</option>
                    <option value="Personal">Personal</option>
                    <option value="Other">Other</option>
                  </select>
                </Col>
                <Col xs="6" className="p-2 left-animation">
                  <Nav.Link
                    className="buton p-2"
                    onClick={() => {
                      setSsummary(true);
                      setScategory(false);
                    }}
                  >
                    Prev
                  </Nav.Link>
                </Col>
                <Col xs="6" className="p-2 right-animation">
                  <Nav.Link
                    className="buton p-2"
                    onClick={() => {
                      setSbody(true);
                      setScategory(false);
                    }}
                    disabled={category.length ? false : true}
                  >
                    Next
                  </Nav.Link>
                </Col>
              </Row>
            </Col>
          )}
          {sbody && (
            <Col xs="12">
              <Row className="justify-content-center">
                <Col xs="12" className="heading p-2 top-animation">
                  Add your Blog..
                </Col>
                <Col xs="12" className="p-2 bottom-animation">
                  <textarea
                    onChange={event => {
                      setBody(event.target.value);
                    }}
                    placeholder="Enter your new blog.."
                    required={true}
                    value={body}
                    rows="10"
                    className="form-control"
                  />
                </Col>
                <Col xs="6" className="p-2 left-animation">
                  <Nav.Link
                    className="buton p-2"
                    onClick={() => {
                      setSbody(false);
                      setScategory(true);
                    }}
                  >
                    Prev
                  </Nav.Link>
                </Col>
                <Col xs="6" className="p-2 right-animation">
                  <Nav.Link
                    className="buton p-2"
                    onClick={() => {
                      setSbody(false);
                      setSimage(true);
                    }}
                    disabled={body.length ? false : true}
                  >
                    Next
                  </Nav.Link>
                </Col>
              </Row>
            </Col>
          )}
          {simage && (
            <Col xs="12">
              <Row className="justify-content-center">
                <Col xs="12" className="heading p-2 top-animation">
                  ALL SET !!!,Ready to create your blog...
                </Col>
                <Col xs="6" className="p-2 left-animation">
                  <Nav.Link
                    className="buton p-2"
                    onClick={() => {
                      setSbody(true);
                      setSimage(false);
                    }}
                  >
                    Prev
                  </Nav.Link>
                </Col>
                <Col xs="6" className="p-2">
                  <input
                    type="submit"
                    className="buton p-2 bottom-animation"
                    placeholder="Submit"
                  />
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      </Form>
      <button
        className="buton"
        onClick={() => {
          upload();
        }}
      >
        {public_id.length ? "Change Cover Image" : "Add Cover Image"}
      </button>
      <Modal
        show={submit}
        onHide={() => {
          setSubmit(false);
        }}
        backdrop="static"
        className={spinner ? "text text-dark" : "text text-dark bg-done"}
      >
        {spinner ? (
          <Modal.Header>
            Please Wait..
            <Spinner animation="border" />
          </Modal.Header>
        ) : (
          <Modal.Header
            closeButton
            onHide={() => {
              window.location.reload();
            }}
          >
            {data}
          </Modal.Header>
        )}
      </Modal>
    </div>
  );
}
