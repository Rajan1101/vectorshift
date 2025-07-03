// booleanNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const BooleanNode = ({ id, data }) => {
  const [value, setValue] = useState(data?.value || false);
  return (
    <BaseNode
      title="Boolean Node"
      handles={[
        { type: 'source', position: Position.Right, id: `${id}-bool` }
      ]}
    >
      <label>
        Value:
        <input type="checkbox" checked={value} onChange={e => setValue(e.target.checked)} />
      </label>
    </BaseNode>
  );
};
