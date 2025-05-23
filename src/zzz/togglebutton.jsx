<Row className='justify-content-center mt-3'>
  <Col xs={12} sm={9} lg={6}>
    <div className="btn-group btn-group-sm" role="group" aria-label="Basic checkbox toggle button group">
      <div className="btn-group btn-group-sm" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" className="btn-check" name="btn-sort-date" id="btn-popular"
          onClick={() => setSortByDate('popular')} />
        <label className="btn btn-outline-primary" for="btn-popular">熱門影評</label>
        <input type="radio" className="btn-check" name="btn-sort-date" id="btn-new"
          onClick={() => setSortByDate('new')} />
        <label className="btn btn-outline-primary" for="btn-new">最新影評</label>
      </div>
    </div>

    <div className="btn-group btn-group-sm ms-2" role="group" aria-label="Basic checkbox toggle button group">
      <div className="btn-group btn-group-sm" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" className="btn-check" name="btn-sort-score" id="btn-high"
          onClick={() => setSortByScore('high')} />
        <label className="btn btn-outline-primary" for="btn-high">評分高</label>
        <input type="radio" className="btn-check" name="btn-sort-score" id="btn-low"
          onClick={() => setSortByScore('low')} />
        <label className="btn btn-outline-primary" for="btn-low">評分低</label>
      </div>
    </div>
  </Col>
</Row> 