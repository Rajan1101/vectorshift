// textNode.js

import { useState, useRef, useEffect } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Extract variables in double curly brackets
  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g;
    const found = [];
    let match;
    while ((match = regex.exec(currText)) !== null) {
      found.push(match[1]);
    }
    setVariables(Array.from(new Set(found)));
  }, [currText]);

  const NODE_WIDTH = 240;
  const TEXTAREA_WIDTH = NODE_WIDTH - 32; // account for padding/borders

  // Handle textarea auto-resize on every change
  const handleChange = (e) => {
    setCurrText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  // Ensure height is correct on mount and when value changes (e.g. programmatically)
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [currText]);

  // Handles for variables (left) and output (right)
  const handles = [
    ...variables.map((v, i) => ({
      type: "target",
      position: Position.Left,
      id: `${id}-${v}`,
      style: { top: 50 + i * 24 },
    })),
    {
      type: "source",
      position: Position.Right,
      id: `${id}-output`,
    },
  ];

  return (
    <BaseNode
      title="Text"
      handles={handles}
      style={{ minHeight: 110 + variables.length * 24, width: NODE_WIDTH }}
    >
      <label>
        Text:
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleChange}
          rows={1}
          style={{
            resize: "none",
            overflow: "hidden",
            minHeight: 32,
            width: TEXTAREA_WIDTH,
            lineHeight: "1.4",
            wordWrap: "break-word",
          }}
          placeholder="Type here, use {{variable}} for inputs"
        />
      </label>
      {variables.length > 0 && (
        <div style={{ fontSize: 12, color: "#666" }}>
          Variables: {variables.map((v) => `{{${v}}}`).join(", ")}
        </div>
      )}
    </BaseNode>
  );
};
