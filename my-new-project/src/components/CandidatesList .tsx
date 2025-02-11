import { useEffect, useState } from "react";

const CandidatesList = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    // Check if data exists in localStorage
    const storedData = localStorage.getItem("candidates");

    if (storedData) {
      setCandidates(JSON.parse(storedData));
    } else {
      // Fetch data if not in localStorage
      fetch("https://dummyjson.com/users")
        .then((res) => res.json())
        .then((data) => {
          setCandidates(data.users); // Store data in state
          localStorage.setItem("candidates", JSON.stringify(data.users)); // Store data in localStorage
        })
        .catch((error) => console.error("Error fetching candidates:", error));
    }
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-primary">Candidates List</h2>
      <ul className="list-group">
        {candidates.map((candidate: any) => (
          <li key={candidate.id} className="list-group-item">
            <strong>{candidate.firstName} {candidate.lastName}</strong> - {candidate.age} years old
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidatesList;
