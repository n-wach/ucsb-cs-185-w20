import React from 'react';

interface ImageTabProps {
  showModal(content: any): void;
}

export default class ImageTab extends React.Component<ImageTabProps> {
  private images: [string, string][];

  constructor(props: ImageTabProps) {
    super(props);
    this.images = [
      [process.env.PUBLIC_URL + "/images/inspiration.jpg", "On the way to Inspiration Point in Santa Barbara"],
      [process.env.PUBLIC_URL + "/images/mammoth_hot_tub.jpg", "By a natural hot spring near Mammoth Lakes"],
      [process.env.PUBLIC_URL + "/images/hot_creek.jpg", "Hot Creek near Mammoth Lakes"],
      [process.env.PUBLIC_URL + "/images/nyc.jpg", "Crossing the Brooklyn Bridge looking towards Manhattan"],
      [process.env.PUBLIC_URL + "/images/central_park.jpg", "A picture from Central Park in NYC"],
      [process.env.PUBLIC_URL + "/images/hawaii.jpg", "Sunset in Hawaii"],
    ];
  }

  showImage(image: [string, string]) {
    this.props.showModal(
      <img src={image[0]} alt={image[1]} onClick={(event) => {event.stopPropagation()}}/>
      );
  }

  render() {
    return (
      <div className="content">
        <div className="gallery">
          {this.images.map((value) =>
            <div className="gallery-item" onClick={this.showImage.bind(this, value)}>
              <img src={value[0]} alt={value[1]}/>
            </div>
          )}
        </div>
      </div>
    )
  }
}
