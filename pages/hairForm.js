import { prisma } from '/server/db/client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getSession } from '@/server/auth';
import { useRouter } from 'next/dist/client/router';
import EditQuestion from '@/components/editquestion';
import EditAnswer from '@/components/editanswer';

export default function Home({ questions, session }) {
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, [session]);
  if (!session) {
    return null;
  }
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
    let answersCount = 0;
    for (const [questionId, answerId] of Object.entries(selectedAnswers)) {
      answersCount++
      const question = questions.find(
        (pytanie) => pytanie.id_pytania === parseInt(questionId)
      );

      if (!question) {
        continue;
      }

      if (answerId % 4 == 1) {
        totalPoints += 3;
      }
      else if (answerId % 4 == 2) {
        totalPoints += 2;
      }
      else if (answerId % 4 == 3) {
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
    if (answersCount == 8) {
      const res = await axios.post('./api/db/updateHairData', { id_k, result })
      console.log(res.data)
    }
    console.log(answersCount)
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
                      {session && session.user.email == "admin@haircare.pl" &&
                        <>
                          <><EditQuestion data={{
                            questionId: pytanie.id_pytania,
                            question1: pytanie.pytanie,
                          }} /><br /></>
                        </>
                      }
                      {pytanie.odpowiedzi.map((odpowiedz) => (
                        <label key={odpowiedz.id_odpowiedzi}>
                          {session && session.user.email != "admin@haircare.pl" &&
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
                            />}
                          {odpowiedz.odpowiedz}
                          {session && session.user.email == "admin@haircare.pl" &&
                            <EditAnswer data={{
                              answerId: odpowiedz.id_odpowiedzi,
                              answer1: odpowiedz.odpowiedz,
                            }} />
                          }
                          <br />
                        </label>
                      ))}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td>
                    {session && session.user.email != "admin@haircare.pl" &&
                      <form onSubmit={handleEvaluate} method='post'>
                        <input type="submit" class="sbutton" value="OCEŃ"></input>
                      </form>}
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

export async function getServerSideProps({ req }) {
  const session = getSession(req);
  const questions = await prisma.pytania.findMany({
    where: {
      id_ankiety: 1,
    },
    include: {
      odpowiedzi: {
        orderBy: {
          id_odpowiedzi: 'asc',
        }
      }
    },
    orderBy: {
      id_pytania: 'asc',
    }
  });

  return {
    props: {
      questions: JSON.parse(JSON.stringify(questions)),
      session
    },
  };
}

