// mathNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const MathNode = ({ id, data }) => {
  const [expression, setExpression] = useState(data?.expression || 'a + b');
  return (
    <BaseNode
      title="Math Node"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-a` },
        { type: 'target', position: Position.Left, id: `${id}-b`, style: { top: '40%' } },
        { type: 'source', position: Position.Right, id: `${id}-result` }
      ]}
    >
      <label>
        Expression:
        <input type="text" value={expression} onChange={e => setExpression(e.target.value)} />
      </label>
    </BaseNode>
  );
};
