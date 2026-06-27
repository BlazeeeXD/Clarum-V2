import networkx as nx

class GraphBuilder:
    @staticmethod
    def build_graph(edges: list) -> dict:
        G = nx.DiGraph()
        
        for edge in edges:
            G.add_edge(edge["source"], edge["target"])

        nodes_list = [{"id": node, "label": node.split("/")[-1]} for node in G.nodes()]
        edges_list = [{"source": u, "target": v} for u, v in G.edges()]

        return {
            "nodes": nodes_list,
            "edges": edges_list
        }