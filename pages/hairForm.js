import { prisma } from '/server/db/client';
import { useState } from 'react';
import Link from 'next/link';
import Router from "next/router";
import axios from 'axios';

export default function Home({ questions }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleAnswerChange = (questionId, answerId) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionId]: answerId,
    }));
  };

  const handleEvaluate = async (e) => {
    e.preventDefault();
    let totalPoints = 0;

    for (const [questionId, answerId] of Object.entries(selectedAnswers)) {
      const question = questions.find(
        (pytanie) => pytanie.id_pytania === parseInt(questionId)
      );
  
      if (!question) {
        continue;
      }
  
      if (answerId%4==1) {
        totalPoints += 3;
      }
      else if (answerId%4==2) {
        totalPoints += 2;
      }
      else if (answerId%4==3) {
        totalPoints += 1;
      }
    }
  
    let result = "1";
  
    if (totalPoints >= 16) {
      result = "3";
    } else if (totalPoints >= 8) {
      result = "2";
    }
    let params = new URLSearchParams(location.search);
    const id_k = params.get('id');
    const res = await axios.post('./api/db/updateHairData', {id_k, result} )
    console.log(res.data)
    window.location = '/account'
  };

  return (
    <div className="bodyLog">
      <div className="mainLog">
        <div className="sectionLog">
          <div className="boxQuiz">
            <table>
              <tbody>
                {questions.map((pytanie) => (
                  <tr key={pytanie.id_pytania}>
                    <td>
                      <h2>{pytanie.pytanie}</h2>
                      {pytanie.odpowiedzi.map((odpowiedz) => (
                        <label key={odpowiedz.id_odpowiedzi}>
                          <input
                            type="radio"
                            name={`quiz_${pytanie.id_pytania}`}
                            value={odpowiedz.id_odpowiedzi}
                            onChange={() =>
                              handleAnswerChange(
                                pytanie.id_pytania,
                                odpowiedz.id_odpowiedzi
                              )
                            }
                          />
                          {odpowiedz.odpowiedz}
                          <br />
                        </label>
                      ))}
                    </td>
                  </tr>
                ))}
                <tr>
                    <td>
                    <form onSubmit={handleEvaluate} method='post'> 
                      <input type="submit" class="sbutton" value="OCEŃ"></input>
                    </form>
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  
  const questions = await prisma.pytania.findMany({
    where: {
      id_ankiety: 1,
    },
    include: {
      odpowiedzi: true,
    },
  });

  return {
    props: {
      questions: JSON.parse(JSON.stringify(questions)),
    },
  };
}

