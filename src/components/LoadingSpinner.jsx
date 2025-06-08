
function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '30vh' }}>
      < div className="spinner-grow spinner-grow-sm mx-auto" role="status" >
        <span className="sr-only">Loading...</span>
      </div >
    </div>
  )
}
export default LoadingSpinner