import React from 'react';

interface VideoTabProps {

}

export default class VideoTab extends React.Component<VideoTabProps> {
  private videos: string[];

  constructor(props: VideoTabProps) {
    super(props);
    this.videos = [
      process.env.PUBLIC_URL + "/videos/love_story.mp4",
      process.env.PUBLIC_URL + "/videos/megalovania_synth.mp4",
      process.env.PUBLIC_URL + "/videos/water.mp4",
      "https://www.w3schools.com/html/mov_bbb.mp4",
      "http://media.w3.org/2010/05/sintel/trailer.mp4",
      "https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4",
    ]
  }

  render() {
    return (
      <div className="content">
        <div className="gallery">
          {this.videos.map((videoUrl) =>
          <div key={videoUrl} className="gallery-item">
            <video>
              <source src={videoUrl} type="video/mp4"/>
              Your browser does not support the video tag.
            </video>
            <div className="gallery-overlay"/>
          </div>)
          }
        </div>
      </div>
    )
  }
}
