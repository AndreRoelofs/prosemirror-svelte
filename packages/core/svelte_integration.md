# New Core Package - Svelte 5 Component Integration for NodeViews

This document details how Svelte 5 components are integrated as ProseMirror NodeViews in the new `packages/core`.

## Svelte 5 NodeView Definition and Rendering Flow

```mermaid
flowchart TD
    subgraph ExtensionDefinition [Extension Definition Phase]
        DevSvelteComponent[Developer creates Svelte 5 Component (e.g., MyCustomNode.svelte)]
        NodeExtension[Extension defines a Node (e.g., 'customImage')]
        NodeExtension -- associates --> DevSvelteComponent
        NodeExtension -- specifies --> NodeSpecProps[ProseMirror NodeSpec properties (attrs, toDOM, parseDOM)]
    end

    subgraph EditorInitialization [Editor Initialization Phase]
        direction LR
        ExtensionManager -->|processes| NodeExtension
        ExtensionManager -->|extracts Svelte component & NodeSpec info| Svelte5NodeViewFactory[Svelte5NodeViewFactory]
        Svelte5NodeViewFactory -->|registers| NodeViewConstructor[Generates PM NodeViewConstructor for 'customImage']
        NodeViewConstructor -->|uses| DevSvelteComponent
        ProseMirrorEditorState[EditorState] -->|gets nodeViews map from| Svelte5NodeViewFactory
    end

    subgraph RenderingPhase [Node Rendering Phase in EditorView]
        direction LR
        ProseMirrorEditorView[EditorView] -->|needs to render 'customImage' node| NodeViewConstructor
        NodeViewConstructor -->|instantiates| Svelte5NodeViewInstance[Svelte5NodeView Instance]
        Svelte5NodeViewInstance -->|creates DOM container| DOMContainer[DOM Element for Svelte Component]
        Svelte5NodeViewInstance -->|mounts Svelte component into container| SvelteComponentInst[Svelte 5 Component Instance (MyCustomNode.svelte)]
        SvelteComponentInst -->|receives props from| Svelte5NodeViewInstance (node attributes, editor state, etc.)
        DOMContainer -->|becomes the .dom property of| Svelte5NodeViewInstance
        ProseMirrorEditorView -- displays --> DOMContainer
    end

    subgraph UpdatePhase [Node Update Phase]
        direction LR
        ProseMirrorEditorView -->|node changes| Svelte5NodeViewInstance
        Svelte5NodeViewInstance -->|receives new PM Node & decorations via .update()| Svelte5NodeViewInstance
        Svelte5NodeViewInstance -->|updates props of| SvelteComponentInst
        SvelteComponentInst -->|reactively re-renders due to Svelte 5 runes| SvelteComponentInst
    end

    subgraph DestructionPhase [Node Destruction Phase]
        direction LR
        ProseMirrorEditorView -->|node removed| Svelte5NodeViewInstance
        Svelte5NodeViewInstance -->|calls .destroy() on| SvelteComponentInst
        Svelte5NodeViewInstance -->|cleans up DOM| DOMContainer
    end
```

## Key Aspects of Svelte 5 NodeView Integration:

1.  **Extension Definition**:
    *   Developers define a ProseMirror node within an extension.
    *   They associate a Svelte 5 component with this node type.
    *   The extension might provide a way to map ProseMirror node attributes to Svelte component props.
    *   A `toDOM` function might still be needed for initial SSR or non-JS environments, or it could be derived by a utility that shallow-renders the Svelte component to get a DOM structure.
    *   `parseDOM` rules remain standard ProseMirror.

2.  **Svelte5NodeViewFactory**:
    *   This factory takes a Svelte 5 component and relevant ProseMirror node information.
    *   It generates a ProseMirror `NodeView` constructor.
    *   This constructor, when instantiated, will manage the lifecycle of the Svelte 5 component.

3.  **Svelte5NodeView Instance**:
    *   **`dom`**: A DOM element that serves as the mount point for the Svelte component.
    *   **`contentDOM`** (optional): If the node has content, this points to where ProseMirror should render child nodes.
    *   **Constructor**: Initializes the Svelte component, passing initial props (derived from the ProseMirror node attributes, editor view, getPos function, etc.). Svelte 5's `$props()` or similar mechanisms would be used within the Svelte component.
    *   **`update(node, decorations)`**: This method is called by ProseMirror when the node or its decorations change.
        *   It must return `true` if it handled the update, `false` otherwise.
        *   It should update the props of the managed Svelte component. Svelte 5's reactivity (runes) will then handle the re-rendering of the component.
        *   It needs to carefully compare the old and new node to determine if a full re-render or just a prop update is necessary.
    *   **`selectNode()` / `deselectNode()`**: Methods to handle node selection visuals if needed (e.g., adding/removing a CSS class). The Svelte component can have a `selected` prop.
    *   **`destroy()`**: Unmounts the Svelte component and cleans up any resources.
    *   **`ignoreMutation()`**: Logic to tell ProseMirror if it should handle DOM mutations within the Svelte component's rendered output. Generally, mutations within the Svelte component should be ignored by ProseMirror if the Svelte component manages its own DOM.

4.  **Svelte 5 Component (`MyCustomNode.svelte`)**:
    *   Receives props from the `Svelte5NodeView` instance (e.g., `node`, `view`, `getPos`, `selected`, `attrs`).
    *   Uses Svelte 5 runes (`$state`, `$derived`, `$effect`) for its internal logic and reactivity.
    *   Can dispatch events or call methods on the editor view via props if necessary.

This approach aims to make Svelte 5 components first-class citizens for rendering nodes, similar to `old-core`'s `SvelteNodeView`, but fully embracing Svelte 5's architecture.
