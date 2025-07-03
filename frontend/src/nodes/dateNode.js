// dateNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const DateNode = ({ id, data }) => {
  const [date, setDate] = useState(data?.date || '');
  return (
    <BaseNode
      title="Date Node"
      handles={[
        { type: 'source', position: Position.Right, id: `${id}-date` }
      ]}
    >
      <label>
        Date:
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      </label>
    </BaseNode>
  );
};
