// imageNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ImageNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || '');
  return (
    <BaseNode
      title="Image Node"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-output` }
      ]}
    >
      <label>
        Image URL:
        <input type="text" value={url} onChange={e => setUrl(e.target.value)} />
      </label>
      {url && <img src={url} alt="Preview" style={{ width: '100%', marginTop: 8 }} />}
    </BaseNode>
  );
};
