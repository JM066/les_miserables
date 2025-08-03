## Les Misérables Character Network Visualization

A simple React-based network visualization of character relationships from Victor Hugo's *Les Misérables* *(work in progress)*. This project analyzes character importance through directional influence mapping using an influence-based graph layout that prioritizes how characters affect others.

### About

This visualization represents characters from *Les Misérables* as nodes in a network graph, where character importance is calculated through **directional influence analysis** rather than bidirectional connections. This visualization recognizes that influence flows in one direction: when a person affects someone's life, that person may influence others, creating a cascade effect that measures person's true reach and importance in the story.

- **Node size** reflects character importance 
- **Node color** represents different character groups/communities
- **Links** show directional relationships between characters (A influences B, not necessarily vice versa)

### Stack

- **Tailwind CSS** - Styling and responsive design
- **React Query** - Data fetching and caching
- **Vite** - Fast development and build tooling

### Installation

 Install dependencies:
```bash
npm install
```

 Start:
```bash
npm run dev
```


