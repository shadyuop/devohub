import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
import { getProfileByHandle } from "../../actions/profileActions";

import ProfileHeader from "./ProfileHeader";
import ProfileGithub from "./ProfileGithub";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import Spinner from "../common/Spinner";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      console.log(this.props.match.params.handle);
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }
  render() {
    return (
      <div>
        <ProfileHeader />
        <ProfileAbout />
        <ProfileCreds />
        <ProfileGithub />
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  profile: state.profile
});

export default connect(
  mapStatetoProps,
  { getProfileByHandle }
)(Profile);
