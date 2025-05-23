import { Card, Row, Col, ToggleButton } from 'react-bootstrap'
import { useState } from 'react';

function SortButton() {
  const option1 = '評價最高 ▲'
  const option2 = '評價最低 ▼'
  const [checked, setChecked] = useState(false);
  return (
    <>
      <ToggleButton
        className="mb-2 p-1 sort-btn"
        id="toggle-check"
        type="checkbox"
        checked={checked}
        value="1"
        onChange={(e) => setChecked(e.currentTarget.checked)}
        style={{ background: "#ddd", color: '#333', border: 'none' }}
      >
        {checked ? option1 : option2}
      </ToggleButton>
    </>
  )
}
export default SortButton