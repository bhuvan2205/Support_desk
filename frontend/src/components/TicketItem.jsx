import React from "react";
import { Link } from "react-router-dom";

const TicketItem = ({ ticket }) => {
  return (
      <div className="ticket">
        <div>{new Date(ticket.createdAt).toLocaleString("en-IN")}</div>
        <div>{ticket.product}</div>
        <div className={`status status-${ticket.status}`}>{ticket.status}</div>
        <Link to={`/ticket/${ticket._id}`} className="btn btn-sm btn-reverse">
          View
        </Link>
      </div>
  );
};

export default TicketItem;
