# VectorShift Pipeline Builder

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

## Backend Integration Features

The backend now provides:

### POST /pipelines/parse
- **Purpose**: Analyzes pipeline structure and validates DAG properties
- **Input**: JSON payload with nodes and edges
- **Output**: 
  - `num_nodes`: Total number of nodes in the pipeline
  - `num_edges`: Total number of connections between nodes
  - `is_dag`: Boolean indicating if the graph is a Directed Acyclic Graph
  - `status`: Request status

### DAG Validation
The backend implements cycle detection using Depth-First Search (DFS) to determine if the pipeline forms a valid DAG:
- **True**: Pipeline is a valid DAG (no cycles)
- **False**: Pipeline contains cycles (invalid for most workflow systems)

## Frontend Integration Features

The submit button now:
1. **Collects Pipeline Data**: Gathers all nodes and edges from the ReactFlow canvas
2. **Sends to Backend**: Makes POST request to `/pipelines/parse` endpoint
3. **Displays Results**: Shows analysis results including:
   - Node count
   - Edge count 
   - DAG validation status
4. **Error Handling**: Displays errors if backend is unavailable or request fails

## Usage
1. Drag nodes from the toolbar to the canvas
2. Connect nodes by dragging from output handles to input handles
3. Click "Submit Pipeline" to analyze the pipeline structure
4. View the results showing node count, edge count, and DAG validation

The system will highlight whether your pipeline is a valid DAG (✅) or contains cycles (❌), which is important for workflow execution systems.
