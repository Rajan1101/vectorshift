from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import json

app = FastAPI()

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NodeData(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]

class EdgeData(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: str = None
    targetHandle: str = None

class PipelineData(BaseModel):
    nodes: List[NodeData]
    edges: List[EdgeData]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    try:
        # Count nodes and edges
        num_nodes = len(pipeline.nodes)
        num_edges = len(pipeline.edges)
        
        # Check if graph is a DAG (Directed Acyclic Graph)
        is_dag = check_dag(pipeline.nodes, pipeline.edges)
        
        return {
            'num_nodes': num_nodes,
            'num_edges': num_edges,
            'is_dag': is_dag
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

def check_dag(nodes: List[NodeData], edges: List[EdgeData]) -> bool:
    """
    Check if the graph is a Directed Acyclic Graph (DAG) using DFS
    """
    if not nodes or not edges:
        return True
    
    # Create adjacency list
    graph = {node.id: [] for node in nodes}
    for edge in edges:
        if edge.source in graph:
            graph[edge.source].append(edge.target)
    
    # Track visited nodes and recursion stack
    visited = set()
    rec_stack = set()
    
    def has_cycle(node_id: str) -> bool:
        """DFS to detect cycle"""
        if node_id in rec_stack:
            return True  # Back edge found, cycle detected
        if node_id in visited:
            return False
        
        visited.add(node_id)
        rec_stack.add(node_id)
        
        # Visit all neighbors
        for neighbor in graph.get(node_id, []):
            if has_cycle(neighbor):
                return True
        
        rec_stack.remove(node_id)
        return False
    
    # Check for cycles starting from each unvisited node
    for node in nodes:
        if node.id not in visited:
            if has_cycle(node.id):
                return False
    
    return True
