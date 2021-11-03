import React from "react";
import "./Card.sass";
import { Vehicle } from "../features/search/searchAPI";

export interface CardProps {
  vehicle?: Vehicle;
}

class Card extends React.Component<CardProps> {
  render() {
    const { vehicle } = this.props;
    return (
      <div className="card">
        <div
          className="card-logo"
          style={{
            backgroundImage: `url(./manufacturers/${vehicle?.manufacturerLogo}.svg)`,
          }}
        >
          &nbsp;
        </div>
        <div className="card-details">
          <div>{vehicle?.manufacturer}</div>
          <div className="card-details-name">{vehicle?.name}</div>
          <div className="card-details-type">{`${vehicle?.body} • ${vehicle?.fuel}`}</div>
          <div className="card-details-power">{`${vehicle?.enginePowerInKW} KW / ${vehicle?.enginePowerInHP} PS`}</div>
          <div className="card-details-hsn-tsn">{`HSN/TSN: ${vehicle?.hsn}/${vehicle?.tsn}`}</div>
        </div>
      </div>
    );
  }
}

export default Card;
