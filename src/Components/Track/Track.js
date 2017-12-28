import React, {Component} from "react";
import "./Track.css";

class Track extends Component {

  addTrack() {
    this.props.track = this.props.onAdd;
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>
            {this.props.track.name}
          </h3>
          <p>
            {this.props.track.artist}, 
            {this.props.track.album}
          </p>
        </div>
        <a className="Track-action">
        </a>
      </div>
    );
  }
}

export default Track;