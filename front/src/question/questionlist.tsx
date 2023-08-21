import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AskButton, PageButton, SortBtn } from "../component/buttons";
import { fetchQuestionList } from "../util/fetchquestion";
import { QuestionData } from "../type/types"

const PostSum = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  flex-direction: column;
  width: 140px;
  padding: 2px 16px 4px 0;
  text-align: left;
  font-size: 13px;
  `
const AllQuestionPage = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 30px 24px 20px 0px;
    border-left: 1px solid hsl(210,8%,90%) ;

  .container {
    /* display: flex; */
  }

  .header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-bottom:10px;
}

  .question-count {
  display: flex;
  justify-content:space-between;
  margin-left: 24px;
}

h1 {
  font-weight: 500;
  font-size: 27px;
  margin-left:24px;
}

h4 {
    display: flex;
    align-items: center;
    font-size: 17px;
    padding: 10px 10px 10px 0;
}

.questions-container {
    display: flex;
    width: 100%;
    border-top: 1px solid hsl(210,8%,90%);
    padding: 16px;
}

.questions {
  width: calc(100% - 140px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

.question-title {
 color: hsl(206,100%,40%);
}
.question-contents {
  font-size: 13px;
}

.question-user-container {
  padding: 5px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}

.question-user-info-container{
    display: flex;
    font-size: 13px;
    justify-content: flex-end;
}

.user {
  color: hsl(206,100%,40%);
  padding: 4px;
}

.asked-date {
  padding: 4px;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
}

.border-right {
  border-radius: 6px 0 0 6px;
}
.border-left {
  border-radius: 0 6px 6px 0;
}
`;



function QuestionList() {
  const currentDate = new Date().toLocaleDateString();
  const [page, setPage] = useState<number>(1);
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const filter = "newest";
  const searchText = null;
  const totalPages = Math.ceil(questions.length / 10);
  const pageButtons = Array.from({ length: totalPages }, (_, index) => index + 1);

  const pageHandle = (pageValue: number | 'Prev' | 'Next'): void => {
    if (pageValue === 'Next') {
      if (questions.length < 10) {
        return;
      }
      setPage(page + 1);
    } else if (pageValue === 'Prev') {
      if (page <= 1) {
        return;
      }
      setPage(page - 1);
    } else {
      setPage(pageValue);
    }
  };

  const fetchQuestions = async () => {
    try {
      const data = await fetchQuestionList(page, filter, searchText);
      setQuestions(data);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [page, filter, searchText]);

  return (
    <AllQuestionPage>
      <div className="container">
        <div className="header">
          <h1>All Questions</h1>
          <Link to="/ask">
            <AskButton>Ask Question</AskButton>
          </Link>
        </div>
        <div className="question-count">
          <h4>{questions.length} questions</h4>
          <div>
            <SortBtn className="border-right">newest</SortBtn>
            <SortBtn className="border-left">voted</SortBtn>
          </div>
        </div>
        <ul>
        {questions.map((question) => (
          <li className="questions-container" key={question.questionId}>
        <PostSum>
            <span>{question.vote} votes</span>
            <span> answers</span>
            <span>{question.view} views</span>
        </PostSum>
            <div className="questions">
              <Link to={`/question/${question.questionId}`}>
                <div className="question-title">{question.title}</div>
              </Link>
              <div className="question-contents">{question.body}</div>
              <div className="question-user-info-container">
                          <Link to={'/mypage'}><div className="user">질문유저 이름</div></Link>
                          <div className="asked-date">asked {currentDate}</div>
                        </div>
            </div>
          </li>
        ))}
      </ul>
        <div className="button">
        <PageButton
  onClick={() => {
    pageHandle('Prev');
  }}
  style={{ display: page === 1 ? 'none' : 'block' }} // 페이지가 1일 때 숨김
>
  Prev
</PageButton>
{pageButtons.map((btnPage) => (
  <PageButton
    color={page === btnPage ? 'orange' : 'white'}
    onClick={() => {
      pageHandle(btnPage);
    }}
    key={btnPage}
  >
    {btnPage}
  </PageButton>
))}
<PageButton
  onClick={() => {
    pageHandle('Next');
  }}
  style={{ display: page === totalPages ? 'none' : 'block' }} // 페이지가 마지막일 때 숨김
>
  Next
</PageButton>
        </div>
      </div>
    </AllQuestionPage>
  );
}

export default QuestionList;