import { useState } from "react";
import useAuth from "../../hooks/useAuth";

import TeamMembers from "../../components/TeamMember";

import { Modal, Form, Button, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStickyNote, faX } from "@fortawesome/free-solid-svg-icons";

const Notes = ({ notes, item_id }) => {
  const [showNotes, setShowNotes] = useState(false);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [formData, setFormData] = useState("");
  const [allNotes, setAllNotes] = useState(notes);
  const {
    auth: { user, accessToken },
  } = useAuth();

  const createNote = async (note) => {
    const noteObj = { note, user_id: user._id };
    try {
      const res = await fetch(
        `http://localhost:5000/api/projectItems/notes/${item_id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(noteObj),
          credentials: "include",
        }
      );
      if (res.status === 200) setAllNotes((prev) => [...prev, noteObj]);
    } catch (error) {}
  };

  const removeNote = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/projectItems/removeNote/${item_id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ note_id: id }),
        }
      );
      if (res.status === 200)
        return setAllNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {}
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    createNote(formData);
    setShowNoteForm((prev) => !prev);
    setFormData("");
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
      <Button className="mx-3" onClick={onSubmit} type="submit">
        add
      </Button>
    </Form>
  );

  let projectOwners = [...new Set(allNotes.map(({ user_id }) => user_id))];

  const itemNotes = projectOwners.map((id) => (
    <Card key={`owner-${id}`}>
      <Card.Body>
        <span>
          <TeamMembers member_id={id} />
        </span>
        {allNotes
          .filter(({ user_id }) => user_id === id)
          .map(({ note, _id, user_id }, index) => (
            <p key={index}>
              {note}
              {user._id === user_id && (
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
    <td>
      <FontAwesomeIcon
        icon={faStickyNote}
        style={{ cursor: "pointer" }}
        onClick={() => setShowNotes((prev) => !prev)}
        size="lg"
      />{" "}
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
    </td>
  );
};

export default Notes;
