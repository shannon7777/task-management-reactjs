import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

import TeamMembers from "../../components/TeamMember";

import { Modal, Form, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStickyNote, faX } from "@fortawesome/free-solid-svg-icons";

const Notes = ({ editItem, projectItem, ownerIds }) => {
  const [showNotes, setShowNotes] = useState(false);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [formData, setFormData] = useState("");
  const [allNotes, setAllNotes] = useState(projectItem?.notes);
  const [hover, setHover] = useState(false);
  const {
    auth: { user },
  } = useAuth();

  let ableToView = ownerIds.includes(user._id);

  const createNote = async (e) => {
    e.preventDefault();
    const noteObj = { note: formData, user_id: user._id };
    try {
      const {
        data: { newNote, message },
      } = await axios.put(`projectItems/notes/${projectItem._id}`, noteObj);
      setAllNotes((prev) => [...prev, newNote]);
      setShowNoteForm((prev) => !prev);
      setFormData("");
    } catch (error) {}
  };

  const removeNote = async (id) => {
    try {
      const { data } = await axios.put(
        `projectItems/removeNote/${projectItem._id}`,
        { note_id: id }
      );
      console.log(data.message);
      return setAllNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      if (error.response) throw console.log(error.response.data.message);
      else {
        console.log(error.message);
      }
    }
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

  let owners = [...new Set(allNotes.map(({ user_id }) => user_id))];
  const itemNotes = owners.map((id) => (
    <Card key={`owner-${id}`}>
      <Card.Body>
        <span>
          <TeamMembers member_id={id} />
        </span>
        {allNotes
          .filter(({ user_id }) => user_id === id)
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
    <td>
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
    </td>
  );
};

export default Notes;
