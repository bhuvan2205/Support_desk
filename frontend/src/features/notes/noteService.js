import axios from "axios";

const API_URL = "/api/tickets";

const createNote = async (noteText, ticketId, userToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  const url = `${API_URL}/${ticketId}/notes`;
  console.log({ url });
  const response = await axios.post(url, { text: noteText }, config);
  return response.data;
};

const getNotes = async (ticketId, userToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  const url = `${API_URL}/${ticketId}/notes`;
  const response = await axios.get(url, config);
  return response.data;
};

const noteService = { createNote, getNotes };

export default noteService;
