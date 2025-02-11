import axios from "axios";

const API_URL = "https://dummyjson.com/users";

// GET Request - Fetch all students
export const getStudents = async () => {
  try {
    const { data } = await axios.get(API_URL);
    return data.users;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

// POST Request - Add a new student
export const addStudent = async (student: { firstName: string; maidenName: string; age: number }) => {
  try {
    const { data } = await axios.post(API_URL, student);
    return data;
  } catch (error) {
    console.error("Error adding student:", error);
    throw error;
  }
};

// PUT Request - Update a student
export const updateStudent = async (id: number, updatedData: { firstName: string; maidenName: string; age: number }) => {
  try {
    const { data } = await axios.put(`${API_URL}/${id}`, updatedData);
    return data;
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};

// DELETE Request - Remove a student
export const deleteStudent = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting student:", error);
    throw error;
  }
};
