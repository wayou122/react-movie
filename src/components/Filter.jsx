import { useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap'

function ReviewsFilter({ filterGroups, handleFilterChange }) {
  return (
    <>
      <Row className='m-1'>
        {
          Object.entries(filterGroups).map(([category, options]) => (
            <Col className='p-1' key={category}>
              <Form.Select className='mb-2'
                name={category}
                onChange={(e) => handleFilterChange(e)}
              >
                {options.map(opt => (
                  <option key={opt} value={opt}>
                    {opt}</option>
                ))}
              </Form.Select>
            </Col>
          ))
        }
      </Row>
      {/* {
        Object.entries(filterGroups).map(([category, options]) => {
          console.log(category)
          console.log(options)
        })
        } */}

      {/* <Form.Select className='mb-3'>
          <option>最新影評</option>
          <option>熱門影評</option>
        </Form.Select>
        <Form.Select className='mb-3'>
          <option>最新影評</option>
          <option>熱門影評</option>
          <option>超讚</option>
        </Form.Select>
        <Form.Select className='mb-3'>
          <option>最新影評</option>
          <option>熱門影評</option>
          <optgroup label="評分篩選">
            <option>超讚</option>
            <option>好看</option>
            <option>普普</option>
            <option>難看</option>
            <option>爛透</option>
          </optgroup>
        </Form.Select> */}

    </>
  )
}
export default ReviewsFilter