import axios from "axios";

const API_URL = "/api/tickets";

const createTicket = async (ticket, userToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  const response = await axios.post(API_URL, ticket, config);
  return response.data;
};

const getTickets = async (userToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const getTicket = async (id, userToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  const response = await axios.get(`${API_URL}/${id}`, config);
  return response.data;
};

const closeTicket = async (id, userToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  const response = await axios.put(
    `${API_URL}/${id}`,
    { status: "closed" },
    config
  );
  return response.data;
};

const ticketService = { createTicket, getTickets, getTicket, closeTicket };

export default ticketService;
