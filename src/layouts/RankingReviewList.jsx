//import './RankingList.css'; // 建立 CSS 檔案
import { useState } from "react";
import { Row, Col } from 'react-bootstrap'

let hue = -20
const RankingReviewerList = ({ data }) => {

  const maxCount = data.reduce((max, d) => { if (d.length > max) { max = d.length } return max }, 0);
  return (
    <div className="ranking-list-container">
      {data.sort((a, b) => b.length - a.length).map((item, i) => (
        <div className="ranking-item d-flex justify-content-center gap-3 mb-2 " key={item.id}>
          <div className='ranking-number d-flex my-auto'>{i + 1}</div>
          <div className='ranking-img'>
            <img src={item.image} />
          </div>
          <div className='ranking-main p-1'>
            <div><a href='#'>{item.name}</a></div>
            <div className="ranking-bar"
              style={{
                width: item.length / maxCount * 100 + '%',
                backgroundColor: `hsl(${hue += 8},70%,75%)`
              }}></div>
          </div>
          <div className='ranking-note d-flex align-items-end'>
            {item.length}篇
          </div>
        </div>
      ))}
    </div>
  );
};

export default RankingReviewerList