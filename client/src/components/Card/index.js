import React from "react";

function Card(props) {
  return (
    <div className="card" onClick={props.onClick}>
      <img src={props.image} className="card-img-top" alt="Small Thumbnail" />
      <div className="card-body">
        <a href={props.link} className="card-title">
          {props.title} by {props.authors}
        </a>
        <p className="card-text">{props.description}</p>
      </div>
    </div>
  );
}

export default Card;
