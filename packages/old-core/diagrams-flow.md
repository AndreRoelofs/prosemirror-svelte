# Svelte-ProseMirror Core Flow Diagrams

This document contains Mermaid diagrams that visualize the flow of data and operations within the `packages/core` package.

## Editor Initialization Flow

```mermaid
sequenceDiagram
    participant App as Application
    participant Editor
    participant createExtensions
    participant Schema
    participant EditorView
    participant Extensions

    App->>Editor: Editor.create(dom, props)
    Editor->>Editor: new Editor()
    Editor->>Editor: run(dom, props)
    Editor->>createExtensions: createExtensions(editor, props)
    createExtensions->>Extensions: Process extensions
    createExtensions->>Schema: Create schema
    createExtensions->>Editor: Return initialized data
    Editor->>EditorView: Create EditorView
    Editor->>Extensions: Call init() on each extension
    Editor->>Editor: Emit 'ready' event
    Editor->>App: Return editor instance
```

## Transaction Flow

```mermaid
sequenceDiagram
    participant User
    participant EditorView
    participant Transaction
    participant Editor
    participant Extensions

    User->>EditorView: Interaction (type, click, etc.)
    EditorView->>Transaction: Create transaction
    Transaction->>EditorView: Apply changes
    EditorView->>Editor: dispatchTransaction(tr)
    Editor->>Editor: setState(newState)
    Editor->>Editor: Emit 'update' event
    Editor->>Extensions: Update extensions if needed
```

## Command Execution Flow

```mermaid
sequenceDiagram
    participant App as Application
    participant Editor
    participant Commands
    participant EditorView
    participant EditorState

    App->>Editor: editor.cmd(someCommand)
    Editor->>Commands: Execute command
    Commands->>EditorState: Read state
    Commands->>EditorView: Dispatch transaction
    EditorView->>Editor: Update state
    Editor->>App: Return editor instance (for chaining)
```

## Extension System Flow

```mermaid
flowchart TD
    A[Extension Definition] --> B[Register Extension]
    B --> C{Extension Type}
    C -->|Node| D[Register Node]
    C -->|Mark| E[Register Mark]
    C -->|Plugin| F[Register Plugin]
    C -->|Command| G[Register Command]

    D --> H[Create NodeSpec]
    D --> I[Create NodeView]
    E --> J[Create MarkSpec]
    E --> K[Create MarkView]

    H --> L[Add to Schema]
    I --> M[Add to NodeViews]
    J --> L
    K --> N[Add to MarkViews]
    F --> O[Add to Plugins]
    G --> P[Add to Commands]

    L --> Q[Create EditorState]
    M --> R[Create EditorView]
    N --> R
    O --> Q
    P --> S[Make available via editor.commands]

    Q --> R
    R --> T[Editor Ready]
```

## Svelte Component Integration

```mermaid
flowchart TD
    A[Svelte Component] --> B[SveltePMNode]
    B --> C[createNodeSpec]
    C --> D[Generate toDOM]
    C --> E[Generate parseDOM]

    D --> F[Create temporary component instance]
    F --> G[Extract HTML structure]
    G --> H[Convert to DOMOutputSpec]

    E --> I[Create parser rule]
    I --> J[Extract attributes from DOM]

    H --> K[NodeSpec]
    J --> K

    K --> L[Schema]
    L --> M[EditorState]

    A --> N[SvelteNodeView]
    N --> O[Mount component in editor]
    O --> P[Handle updates]
    P --> Q[Sync component with ProseMirror]
```

## Observable Pattern Implementation

```mermaid
flowchart TD
    A[Observable] --> B[Editor extends Observable]
    A --> C[Event Registration]
    C --> D[on - Register event handler]
    C --> E[once - Register one-time handler]
    C --> F[off - Remove handler]

    G[Editor Events] --> H[ready - Editor initialized]
    G --> I[update - State/props updated]
    G --> J[destroy - Editor destroyed]

    B --> K[Editor emits events]
    K --> L[Extensions listen for events]
    K --> M[Application listens for events]
