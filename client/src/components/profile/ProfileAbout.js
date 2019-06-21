import React, { Component } from "react";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEmpty from "../../validation/is-empty";
// import { withRouter } from "react-router-dom";
// import Spinner from "../common/Spinner";
// import ProfileItem from "./ProfileItem";
// import { getProfiles } from "../../actions/profileActions";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    // Get first name
    const firstName = profile.user.name.trim().split(" ")[0];

    // Skill List
    const skills = profile.skills.map((skill, index) => (
      <div className="p-3" key={index}>
        <i className="fa fa-check" />
        {skill}
      </div>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstName}</h3>
            <p className="lead">
              {isEmpty(profile.bio) ? (
                <span>{firstName} does nnot have a bio.</span>
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
            <hr />

            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null)(ProfileAbout);
