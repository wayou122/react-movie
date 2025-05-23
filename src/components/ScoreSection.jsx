
function ScoreSection(props) {
  return (
    <div className="d-flex align-items-center">
      <span className="filled-icon me-2 stockpot-icon">stockpot</span>
      <span className="stockpo-text me-2">{props.score}</span>
      <span className='comment-text'>{'( ' + props.reviewCount + ' )'}</span>
    </div>
  )
}
export default ScoreSection