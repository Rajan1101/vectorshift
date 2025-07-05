// submit.js

import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { useState } from 'react';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const pipelineData = {
                nodes: nodes.map(node => ({
                    id: node.id,
                    type: node.type,
                    position: node.position,
                    data: node.data
                })),
                edges: edges.map(edge => ({
                    id: edge.id,
                    source: edge.source,
                    target: edge.target,
                    sourceHandle: edge.sourceHandle,
                    targetHandle: edge.targetHandle
                }))
            };

            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pipelineData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '20px',
            gap: '15px'
        }}>
            <button 
                type="submit" 
                onClick={handleSubmit}
                disabled={isLoading}
                style={{
                    padding: '12px 24px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    backgroundColor: isLoading ? '#6b7280' : '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.2s',
                }}
            >
                {isLoading ? 'Analyzing Pipeline...' : 'Submit Pipeline'}
            </button>

            {result && (
                <div style={{
                    padding: '16px',
                    backgroundColor: '#f0f9ff',
                    border: '1px solid #0ea5e9',
                    borderRadius: '8px',
                    minWidth: '300px',
                    textAlign: 'center'
                }}>
                    <h3 style={{ margin: '0 0 12px 0', color: '#0c4a6e' }}>Pipeline Analysis</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span><strong>Nodes:</strong></span>
                        <span>{result.num_nodes}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span><strong>Edges:</strong></span>
                        <span>{result.num_edges}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span><strong>Is DAG:</strong></span>
                        <span style={{ 
                            color: result.is_dag ? '#16a34a' : '#dc2626',
                            fontWeight: 'bold'
                        }}>
                            {result.is_dag ? '✅ Yes' : '❌ No'}
                        </span>
                    </div>
                </div>
            )}

            {error && (
                <div style={{
                    padding: '16px',
                    backgroundColor: '#fef2f2',
                    border: '1px solid #f87171',
                    borderRadius: '8px',
                    minWidth: '300px',
                    textAlign: 'center',
                    color: '#dc2626'
                }}>
                    <h3 style={{ margin: '0 0 8px 0' }}>Error</h3>
                    <p style={{ margin: 0 }}>{error}</p>
                </div>
            )}
        </div>
    );
}
