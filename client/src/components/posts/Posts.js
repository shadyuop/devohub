import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import Spinner from "../common/Spinner";
import { getPosts } from "../../actions/postActions";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }
  componentDidMount() {
    this.props.getPosts();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.post.posts) {
      this.setState({ posts: newProps.post.posts });
    }
  }
  render() {
    const { loading } = this.props.post;
    const { posts } = this.state;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
      // postContent = <h1 className="h">Hello</h1>;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  post: state.post
});

export default connect(
  mapStatetoProps,
  { getPosts }
)(Posts);
