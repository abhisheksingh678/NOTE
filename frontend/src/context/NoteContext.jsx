import { createContext, useState, useEffect } from "react";
import BACKEND_URL from "../utils/backend"; // your Axios file

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNotes = async () => {
    try {
      const { data } = await BACKEND_URL.get("/");
      setNotes(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const createNote = async (note) => {
    try {
      const { data } = await BACKEND_URL.post("/", note);
      setNotes([...notes, data]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateNote = async (id, note) => {
    try {
      const { data } = await BACKEND_URL.put(`/${id}`, note);
      setNotes(notes.map((n) => (n._id === id ? data : n)));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await BACKEND_URL.delete(`/${id}`);
      setNotes(notes.filter((n) => n._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <NoteContext.Provider
      value={{ notes, loading, createNote, updateNote, deleteNote }}
    >
      {children}
    </NoteContext.Provider>
  );
};
