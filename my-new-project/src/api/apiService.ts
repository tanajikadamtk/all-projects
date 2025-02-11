
// By using fetch
const API_URL = "https://dummyjson.com/users";

export const getItems = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.users;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};