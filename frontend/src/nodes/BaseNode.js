// BaseNode.js
import { Handle } from 'reactflow';

/**
 * BaseNode abstraction for all node types.
 * @param {string} title - The node's title/label.
 * @param {Array} handles - Array of handle configs: { type, position, id, style }
 * @param {React.ReactNode} children - Node content (inputs, selects, etc.)
 * @param {object} style - Optional style overrides
 */
export const BaseNode = ({ title, handles = [], children, style = {} }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: 240,
        minHeight: 110,
        border: '1.5px solid #2563eb',
        borderRadius: 14,
        boxShadow: '0 4px 16px rgba(37,99,235,0.10)',
        padding: 18,
        background: 'linear-gradient(135deg, #f0f6ff 80%, #e3eaff 100%)',
        transition: 'box-shadow 0.2s, border 0.2s',
        ...style
      }}
    >
      {handles.map((h, i) => (
        <Handle key={i} {...h} />
      ))}
      <div style={{ fontWeight: 700, fontSize: 18, color: '#1e293b', marginBottom: 14, letterSpacing: 0.5 }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{children}</div>
    </div>
  );
};
