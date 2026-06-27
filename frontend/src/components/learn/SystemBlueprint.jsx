import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

export default function SystemBlueprint({ report }) {
  const { nodes, edges } = useMemo(() => {
    const rawNodes = report?.dependency_graph?.nodes || [];
    const rawEdges = report?.dependency_graph?.edges || [];

    const vibrantColors = [
      '#FF3B30', // Red
      '#007AFF', // Blue
      '#34C759', // Green
      '#FFCC00', // Yellow
      '#AF52DE', // Purple
      '#FF9500', // Orange
      '#FF2D55'  // Pink
    ];

    const targets = new Set(rawEdges.map(e => e.target));
    const topRowNodes = rawNodes.filter(n => !targets.has(n.id));
    const bottomRowNodes = rawNodes.filter(n => targets.has(n.id));

    const formattedNodes = rawNodes.map((node) => {
      const isTopRow = !targets.has(node.id);
      const rowNodes = isTopRow ? topRowNodes : bottomRowNodes;
      const indexInRow = rowNodes.findIndex(n => n.id === node.id);
      

      const horizontalSpacing = 280;
      const startX = -((rowNodes.length - 1) * horizontalSpacing) / 2;
      const x = startX + (indexInRow * horizontalSpacing);
      const y = isTopRow ? 0 : 200; 

      return {
        id: node.id,
        position: { x, y },
        data: { label: node.label || node.id },
        style: { 
          background: '#FFFFFF', 
          color: '#1D1D1F', 
          border: '1px solid #E5E5EA', 
          borderRadius: '12px', 
          padding: '12px 24px', 
          fontSize: '14px',
          fontWeight: '600', 
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
          minWidth: '150px',
          textAlign: 'center'
        }
      };
    });

    const formattedEdges = rawEdges.map((edge, index) => ({
      id: `e-${index}`,
      source: edge.source,
      target: edge.target,
      animated: true, 
      type: 'bezier',
      style: { 
        stroke: vibrantColors[index % vibrantColors.length], 
        strokeWidth: 2.5, 
        opacity: 0.9 
      }
    }));

    return { nodes: formattedNodes, edges: formattedEdges };
  }, [report]);

  return (
    <section className="h-screen w-full snap-start flex flex-col justify-center px-10 relative">
      
      {/* Top Left Brand Tag strictly locked to the corner */}
      <div className="absolute top-8 left-10 font-bold text-lg text-[#0F172A] tracking-tight">
        Clarum
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl w-full mx-auto space-y-6"
      >
        {/* Left Aligned Header Block */}
        <div className="text-left w-full">
          <h2 className="text-[3.5rem] font-bold tracking-tight text-[#0F172A]">
            System Blueprint.
          </h2>
          <p className="text-xl text-[#64748B] mt-2 font-medium">
            Data flow and dependency mapping.
          </p>
        </div>
        
        {/* Graph Container */}
        <div className="h-[65vh] w-full bg-white rounded-3xl shadow-apple border border-[#E5E5EA] overflow-hidden relative">
          {nodes.length > 0 ? (
            <ReactFlow 
              nodes={nodes} 
              edges={edges} 
              fitView 
              fitViewOptions={{ padding: 0.2 }} 
            >
              <Background color="#1D1D1F" gap={24} size={1} opacity={0.04} />
              <Controls className="fill-[#64748B] border-none shadow-apple" />
            </ReactFlow>
          ) : (
             <div className="flex h-full items-center justify-center text-[#64748B] font-medium">
               Awaiting graph architecture parsing...
             </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}