const API_URL = "http://localhost:2005/events";

export const getAllEvents = async () => {

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const data = await response.json();

  return data;
};