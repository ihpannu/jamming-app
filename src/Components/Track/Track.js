import React, {Component} from "react";
import "./Track.css";

class Track extends Component {
  constructor(props) {
      super(props);
      this.addTrack = this.addTrack.bind(this);
  }


  addTrack() {
    this.props.onAdd(this.track.onAdd);
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
          {this.props.shouldAdd && 
          <a className="Track-action" 
          onClick={this.addTrack}>+</a>}
      </div>
    );
  }
}

export default Track;