import { useState } from "react";
import useAuth from "../../hooks/useAuth";

import TeamMembers from "../../components/TeamMember";
import { addNote, deleteNote } from "../../services/projectItem";

import { Modal, Form, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStickyNote, faX } from "@fortawesome/free-solid-svg-icons";

const Notes = ({ editItem, projectItem, owners }) => {
  const [showNotes, setShowNotes] = useState(false);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [formData, setFormData] = useState("");
  const [allNotes, setAllNotes] = useState(projectItem?.notes);
  const [hover, setHover] = useState(false);
  const {
    auth: { user },
  } = useAuth();

  let ableToView = owners.map((owner) => owner._id).includes(user._id);

  const createNote = async (e) => {
    e.preventDefault();
    addNote(
      formData,
      setFormData,
      user,
      projectItem,
      setAllNotes,
      setShowNoteForm
    );
  };

  const removeNote = async (id) => {
    deleteNote(id, projectItem, setAllNotes);
  };

  const noteForm = (
    <Form className="d-flex">
      <Form.Control
        className=""
        value={formData}
        type="text"
        name="note"
        onChange={(e) => setFormData(e.target.value)}
      />
      <Button className="mx-3" onClick={createNote} type="submit">
        add
      </Button>
    </Form>
  );

  let ownerNoteIds = allNotes.map(({ user_id }) => user_id);
  let ownerNotes = owners.filter((owner) => ownerNoteIds.includes(owner._id));
  const itemNotes = ownerNotes.map((owner) => (
    <Card key={`owner-${owner._id}`}>
      <Card.Body>
        <span>
          <TeamMembers member={owner} className="teamMemberpic" />
        </span>
        {allNotes
          .filter(({ user_id }) => user_id === owner._id)
          .map(({ note, _id, user_id }) => (
            <p
              key={`note-${_id}`}
              onMouseOver={() => setHover(_id)}
              onMouseOut={() => setHover(null)}
            >
              {note}
              {user._id === user_id && hover === _id && (
                <FontAwesomeIcon
                  className="mx-2"
                  style={{ cursor: "pointer" }}
                  size="sm"
                  icon={faX}
                  onClick={() => removeNote(_id)}
                />
              )}
            </p>
          ))}
      </Card.Body>
    </Card>
  ));

  return (
    <div>
      {ableToView && (
        <FontAwesomeIcon
          icon={faStickyNote}
          style={{ cursor: "pointer" }}
          onClick={() => setShowNotes((prev) => !prev)}
          size="lg"
        />
      )}
      <Modal
        centered
        show={showNotes}
        onHide={() => setShowNotes((prev) => !prev)}
      >
        <Modal.Header>
          <Modal.Title>Notes</Modal.Title>
          <Button
            variant={showNoteForm ? "danger" : "success"}
            onClick={() => setShowNoteForm((prev) => !prev)}
          >
            {showNoteForm ? "Cancel" : "Add Note"}
          </Button>
        </Modal.Header>
        <Modal.Body className="">
          {itemNotes}
          {showNoteForm && noteForm}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Notes;
