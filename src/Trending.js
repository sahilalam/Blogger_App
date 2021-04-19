import React from "react";
import Context from "./Context.js";
import { Row, Col, Spinner, Modal, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
export default function Trending() {
  const context = React.useContext(Context);
  let [data, setData] = React.useState([]);
  let [next, setNext] = React.useState(false);
  let [prev, setPrev] = React.useState(false);
  let [offset, setOffset] = React.useState(0);
  let [loading, setLoading] = React.useState(true);
  let [loadingB, setLoadingB] = React.useState(false);
  let [filters, setFilters] = React.useState(false);
  let [from, setFrom] = React.useState("");
  let [to, setTo] = React.useState("");
  let [category, setCategory] = React.useState("");
  let getData = async offset => {
    let data = await fetch(
      `https://blogger-app-backend.herokuapp.com/get/blogs/${offset}/${
        category.length ? category : 0
      }/${from.length ? new Date(from) : 0}/${to.length ? new Date(to) : 0}/0`,
      {
        method: "GET",
        headers: {
          authorization: window.localStorage.access_token
        }
      }
    );
    if (data.status == 500) {
      context.logout();
    }
    data = await data.json();
    return data;
  };
  React.useEffect(async () => {
    setLoading(true);
    let data = await getData(0);
    setData(data.data);
    setPrev(data.prev);
    setNext(data.next);
    setLoading(false);
  }, []);
  let filter = async () => {
    setLoading(true);
    setFilters(false);
    let data = await getData(0);
    setData(data.data);
    setPrev(data.prev);
    setNext(data.next);
    setLoading(false);
  };
  let NEXT = async () => {
    setLoadingB(true);
    let data = await getData(offset + 10);
    setData(data.data);
    setPrev(data.prev);
    setNext(data.next);
    setOffset(offset + 10);
    setLoadingB(false);
  };
  let PREV = async () => {
    setLoadingB(true);
    let data = await getData(offset - 10);
    setData(data.data);
    setPrev(data.prev);
    setNext(data.next);
    setOffset(offset - 10);
    setLoadingB(false);
  };
  return (
    <div className="container-fluid">
      <h3 className="heading text-center mb-5">Trending Blogs</h3>
      <Row className="justify-content-center heading">
        {loading ? (
          <Col xs="12" className="text-center">
            <Spinner animation="border" />
          </Col>
        ) : (
          <Col xs="12" md="7">
            <button
              className="buton"
              onClick={() => {
                setFilters(true);
              }}
            >
              Filters
            </button>
          </Col>
        )}

        {data && data.length ? (
          data.map(d => {
            let date = new Date(d.date);
            return (
              <Col
                xs="12"
                md="7"
                key={d._id}
                className="box box-shadow-dark m-4 bg-stars"
              >
                <Col xs="12" className="header heading text-center p-2 mb-2">
                  <h4 className="blog-title">{d.title}</h4>
                </Col>
                {d.image_url.length ? (
                  <Col xs="12" className="mb-2">
                    <img src={d.image_url} className="trending-image" />
                  </Col>
                ) : (
                  <></>
                )}

                <Col xs="12" className="box box-shadow-dark mb-2">
                  <Row className="justify-content-center mb-2">
                    <Col xs="6">
                      <img
                        src="https://raw.githubusercontent.com/sahilalam/SocialMediaProjectNodejs/master/src/public/Components/ICONS/likes.png"
                        className="image-sm"
                      />{" "}
                      {d.likes}
                    </Col>
                    <Col xs="6" className="text-align-right">
                      {date.toLocaleString()}
                    </Col>
                    <Col xs="12" className="pt-2">
                      By : {d.name}
                    </Col>
                  </Row>
                  <Col xs="12" className="box box-shadow-dark blog-summary">
                    {d.subject}
                  </Col>
                </Col>
                <Col className="width-fit">
                  <NavLink
                    to={`/blogs/single/${d._id}`}
                    className="nav-link text-light"
                  >
                    SHOW MORE..
                  </NavLink>
                </Col>
              </Col>
            );
          })
        ) : loading ? (
          <></>
        ) : (
          <Col xs="12" className="text-center box box-shadow-dark bg-stars m-4">
            No Blogs Found
          </Col>
        )}
        <Col xs="7" className="m-4">
          <Row>
            <Col xs="6">
              <button className="buton" hidden={!prev} onClick={PREV}>
                {loadingB ? <Spinner animation="border" /> : "Prev"}
              </button>
            </Col>
            <Col xs="6">
              <button className="buton" hidden={!next} onClick={NEXT}>
                {loadingB ? <Spinner animation="border" /> : "Next"}
              </button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal
        show={filters}
        onHide={() => {
          setFilters(false);
        }}
        backdrop="static"
        className="text text-dark"
      >
        <Modal.Header closeButton>Filter</Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={event => {
              event.preventDefault();
              filter();
            }}
          >
            From
            <input
              type="datetime-local"
              className="form-control mb-2"
              required={true}
              onChange={e => {
                setFrom(e.target.value);
              }}
            />
            To
            <input
              type="datetime-local"
              className="form-control mb-2"
              required={true}
              onChange={e => {
                setTo(e.target.value);
              }}
            />
            Category
            <select
              className="form-control mb-2"
              required={true}
              onChange={e => {
                setCategory(e.target.value);
              }}
            >
              <option value={null} />
              <option value="0">All</option>
              <option value="Tech">Tech</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Movies and series">Movies And Series</option>
              <option value="Cartoons and Anime">Cartoons and Anime</option>
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
            <button type="submit" className="btn btn-info buton header mb-2">
              Submit
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
