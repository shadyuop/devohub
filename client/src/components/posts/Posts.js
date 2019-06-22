import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
import PostForm from "./PostForm";
import Spinner from "../common/Spinner";

class Posts extends Component {
  render() {
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  // getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  profile: state.profile
});

export default connect(
  mapStatetoProps,
  {}
)(Posts);
