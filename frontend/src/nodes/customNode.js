// customNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const CustomNode = ({ id, data }) => {
  const [custom, setCustom] = useState(data?.custom || '');
  return (
    <BaseNode
      title="Custom Node"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-output` }
      ]}
    >
      <label>
        Custom Field:
        <input type="text" value={custom} onChange={e => setCustom(e.target.value)} />
      </label>
    </BaseNode>
  );
};
