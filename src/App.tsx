import React from 'react';

import QuestionsListBlock from './components/QuestionsListBlock'
import TitleModal from './components/TitleModal'

const apiUrl = 'http://api.stackexchange.com'

interface Props {}

interface State {
  openModal: boolean,
  hasMore: boolean,
  page: number,
  pageSize: number,
  questionsList: {
    owner: { display_name: string };
    title: string;
    creation_date: number,
    question_id: number,
    link: string,
  }[];
  currentQuestion: QueInterface,
  requestDispatched: boolean
}

interface QueInterface {
  title: string; 
  link: string
}

export default class App extends React.Component<Props, State> {
  state: State = {
    openModal: false,
    hasMore: true,
    questionsList: [],
    page: 1,
    pageSize: 15,
    currentQuestion: { title: '', link: '' },
    requestDispatched: false,
  }

  componentDidMount = () => {  
    const { page, pageSize } = this.state
    fetch(`${apiUrl}/questions?site=stackoverflow&page=${page}&pagesize=${pageSize}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.items) {
          this.setState({ questionsList: data.items, hasMore: data.has_more })
        }
      });
  }

  toggleModal = () => {
    this.setState(state => ({ openModal: !state.openModal }))
  }

  onRowClick = (qid: number) => {
    const listRef = [...this.state.questionsList]
    const currentItem = listRef.find(item => item.question_id === qid)
    if (currentItem) {
      this.setState(state => ({
        currentQuestion: {
          ...state.currentQuestion,
          title: currentItem.title,
          link: currentItem.link
        }
      }))
    }
    this.toggleModal()
  }

  loadMore = () => {
    const { pageSize, page, requestDispatched } = this.state;
    if (!requestDispatched) {
      this.setState({ requestDispatched: true, page: page + 1 })

      fetch(`${apiUrl}/questions?site=stackoverflow&page=${page + 1}&pagesize=${pageSize}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.items && data.items.length > 0) {
          this.setState(state => ({
            questionsList: [...state.questionsList, ...data.items],
            hasMore: data.has_more,
            requestDispatched: false,
          }))
        }
      })
    }
  }

  render() {
    const { openModal, questionsList, currentQuestion, hasMore } = this.state

    return (
      <div className="container">
        <div className='row'>
          <div className='col-12 question-block'>
            <QuestionsListBlock
              questionsList={questionsList}
              onRowClick={this.onRowClick}
              loadMore={this.loadMore}
              hasMore={hasMore}
            />
            <TitleModal
              currentQuestion={currentQuestion}
              openModal={openModal}
              toggle={this.toggleModal}
            />
          </div>
        </div>
      </div>
    )
  }
}