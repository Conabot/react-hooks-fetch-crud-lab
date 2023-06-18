import React from "react";
import QuestionItem from "./QuestionItem";
import url from "../constant";

function QuestionList({questions, setQuestions}) {
  
  const handleDeleteClick = async (id) => {
    // list of question
    //have an id 
    // need to change the list of question to match the deletion 
    const config={method : "DELETE"}

    const response = await fetch(`${url.questions}/${id}`, config)

    const filterQuestions = questions.filter(question => question.id !== id)
      setQuestions(filterQuestions)
  }

  const handleAnswerChange = async (selection, id) => {
    console.log (selection)
    const config = {method : "PATCH", 
    headers : { "Content-Type": "application/json"},
    body: JSON.stringify({correctIndex : selection})
  }

 /*  const response = await fetch(`${url}/questions/${id}`, config);
  const updatedQuestion = await response.json();
  const updatedQuestions = questions.map(question => {
    if (question.id === id) {
      return updatedQuestion;
    } else {
      return question;
    }
  }); */

    const response = await fetch(`${url.questions}/${id}`, config).then(r=>r.json())
    
    const updatedQuestions = questions.map(question => {
      if (question.id === id) {
        return response
      } else {
        return question
      }
    })
    setQuestions(updatedQuestions)
    // look for question in array
    // find the correct id
    // path the id 
    // change that in array
  }
  const questionMap = questions.map(question => 
  <QuestionItem key={question.id}  
                onAnswerChange={handleAnswerChange} 
                onDeleteClick={() => handleDeleteClick(question.id)}
                question={question}
  />
  )
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
          {questionMap}
      </ul>
      
    </section>
  );
}

export default QuestionList;
