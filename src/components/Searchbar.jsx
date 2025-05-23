import { useState } from "react";
import { Form, Row, Col, Button } from 'react-bootstrap'

function Searchbar() {
  return (
    <>
      <Form className="mx-auto d-flex mb-3" style={{ maxWidth: '300px' }}>
        <Form.Control
          type="text"
          placeholder="搜尋電影"
          className="me-2"
        />
        <Button type="submit" className="search-btn" style={{ whiteSpace: 'nowrap' }}>搜尋</Button>
      </Form>
    </>
  )
}
export default Searchbar