import React from "react";
import { Row, Col, Navbar, Nav } from "react-bootstrap";
import { NavLink, BrowserRouter, Route, Redirect } from "react-router-dom";
import Trending from "./Trending.js";
import AddNew from "./AddNew.js";
import SingleBlog from "./SingleBlog.js";
import MyBlogs from "./MyBlogs.js";
export default function Content() {
  return window.localStorage.access_token ? (
    <div>
      <BrowserRouter>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">Menu</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavLink to="/blogs/all" className="nav-link">
                Trending
              </NavLink>
              <NavLink to="/blogs/my" className="nav-link">
                My Blogs
              </NavLink>
              <NavLink to="/blogs/new" className="nav-link">
                Add New Blog
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Route exact path="/home">
          <Redirect to="/blogs/all" />
        </Route>
        <Route exact path="/blogs/all" component={Trending} />
        <Route exact path="/blogs/new" component={AddNew} />
        <Route exact path="/blogs/my" component={MyBlogs} />
        <Route exact path="/blogs/single/:id" component={SingleBlog} />
      </BrowserRouter>
    </div>
  ) : (
    <Redirect to="/" />
  );
}
