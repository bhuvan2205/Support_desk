import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { closeTicket, getTicket } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import { createNote, getNotes } from "../features/notes/noteSlice";
import NoteItem from "../components/NoteItem";
import Modal from "react-modal";
import { FaPlus, FaWindowClose } from "react-icons/fa";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const Ticket = () => {
  const dispatch = useDispatch();
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.ticket
  );

  const { notes, isLoading: isNotesLoading } = useSelector(
    (state) => state.notes
  );
  const params = useParams();
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    dispatch(getTicket(params.id));
    dispatch(getNotes(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [dispatch, isError, isSuccess, message]);

  // Ticket close
  const handleClick = () => {
    dispatch(closeTicket(params.id));
    toast.success("Ticket closed");
    navigate("/tickets");
  };

  // Open Modal
  const openModal = () => {
    setIsOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // Submit the note form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!noteText) {
      return toast.error("Text field cannot be empty!");
    }
    dispatch(createNote({ noteText, ticketId: params.id }));
    closeModal();
  };

  if (isLoading || isNotesLoading) <Spinner />;
  if (isError) <p>Something went wrong!</p>;

  return (
    <div className="wrapper">
      <div className="ticket-page">
        <header className="ticket-header">
          <BackButton />
          <h2>
            Ticket Id: {ticket._id}
            <span className={`status status-${ticket.status}`}>
              {ticket.status}
            </span>
          </h2>
          <h3>
            Date submitted: {new Date(ticket.createdAt).toLocaleString("en-IN")}
          </h3>
          <h3>Product: {ticket.product}</h3>
          <hr />
          <div className="ticket-desc">
            <h3>Description of issue</h3>
            <p>{ticket.description}</p>
          </div>
        </header>
        {ticket.status !== "closed" && (
          <>
            <h2>Notes</h2>
            <button onClick={openModal} className="btn">
              <FaPlus /> Add Note
            </button>
          </>
        )}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Add Note"
        >
          <h2>Add Note</h2>
          <button className="btn-close" onClick={closeModal}>
            <FaWindowClose style={{ fontSize: "25px" }} />
          </button>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <textarea
                name="noteText"
                id="noteText"
                cols="30"
                rows="6"
                placeholder="Add note text..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        {notes.map((note, index) => (
          <NoteItem key={index} note={note} />
        ))}
        {ticket.status !== "closed" && (
          <button className="btn btn-block btn-danger" onClick={handleClick}>
            Close Ticket
          </button>
        )}
      </div>
    </div>
  );
};

export default Ticket;
