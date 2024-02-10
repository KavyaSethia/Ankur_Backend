import { useEffect, useState } from 'react';
import axios from 'axios';
import './PreviousAcademicResults.css';

const PreviousAcademicResults = ({ student }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.post('https://ankurproject.onrender.com/api/user/prevacademicresult', { studentId: student._id });
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching results:', error.message);
      }
    };

    fetchResults();
  }, [student._id]);

  const handleBlockClick = (index) => {
    setResults((prevResults) => {
      const updatedResults = [...prevResults];
      updatedResults[index].expanded = !updatedResults[index].expanded;
      return updatedResults;
    });
  };

  return (
    <div className="previous-academic-results-container">
      <h3>Previous Academic Results</h3>
      {results.map((result, index) => (
        <div key={result._id} className="result-block">
          <div className="result-header" onClick={() => handleBlockClick(index)}>
            <span>Exam Type: {result.examType}</span>
            <span>Total Marks: {result.totalmarks}</span>
          </div>
          {result.expanded && (
            <div className="result-details">
              <p>Subject 1: {result.academics.subject1}</p>
              <p>Subject 2: {result.academics.subject2}</p>
              <p>Subject 3: {result.academics.subject3}</p>
              <p>Subject 4: {result.academics.subject4}</p>
              <p>Subject 5: {result.academics.subject5}</p>
              <p>Acquired Marks: {result.aquiredmarks}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PreviousAcademicResults;

