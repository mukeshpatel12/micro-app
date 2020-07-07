import React from 'react';
import { Table } from 'reactstrap';
import InfiniteScroll from 'react-infinite-scroller';

const getDate = (dateString: any) => {
  const dateObj = new Date(dateString)
  return dateObj.toDateString()
}

interface Props {
  onRowClick: Function;
  loadMore: Function;
  hasMore: boolean;
  questionsList: {
    owner: { display_name: string };
    title: string;
    creation_date: number,
    question_id: number
  }[];
}

const QuestionsListBlock = ({ questionsList, onRowClick, loadMore, hasMore }: Props) => {
return (
  <InfiniteScroll
    pageStart={0}
    loadMore={() => loadMore()}
    hasMore={hasMore}
    loader={<div className="text-center" key={0}><b>Fetching ...</b></div>}
  >
    <Table striped className='question-table'>
      <thead>
        <tr>
          <th>Author</th>
          <th style={{ width: '70%' }}>Title</th>
          <th>Creation Date</th>
        </tr>
      </thead>
      <tbody>
        {questionsList.map((item, i) => (
         <tr
          key={i}
          style={{ cursor: 'pointer' }}
          onClick={() => { onRowClick(item.question_id) }}
        >
          <td>{item.owner.display_name}</td>
          <td style={{ width: '70%' }}>{item.title}</td>
          <td>{getDate(item.creation_date)}</td>
        </tr>
        ))}
      </tbody>
    </Table>
    </InfiniteScroll>
  );
}

export default QuestionsListBlock;