import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './Image.scss';

class Image extends React.Component {
  static propTypes = {
    dto: PropTypes.object,
    size: PropTypes.number,
    onDelete: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      rotation: 0
    };
  }

  urlFromDto(dto) {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }

  onDelete() {
    this.props.onDelete(this.props.dto);
  }

  onRotate() {
    this.setState({
      rotation: (this.state.rotation + 90) % 360
    });
  }

  onExpand() {
    this.props.onExpand({
      title: this.props.dto.title,
      link: this.urlFromDto(this.props.dto),
      rotation: this.state.rotation
    });
  }

  render() {
    return (
      <div className="image-root" style={{
        width: this.props.size + 'px',
        height: this.props.size + 'px'
      }}>
        <img src={this.urlFromDto(this.props.dto)} width="100%" height="100%"
             style={{
               transform: `rotate(${this.state.rotation}deg)`
             }}/>
        <div>
          <FontAwesome className="image-icon" name="sync-alt" title="rotate" onClick={::this.onRotate}/>
          <FontAwesome className="image-icon" name="trash-alt" title="delete" onClick={::this.onDelete}/>
          <FontAwesome className="image-icon" name="expand" title="expand" onClick={::this.onExpand}/>
        </div>
      </div>
    );
  }
}

export default Image;
