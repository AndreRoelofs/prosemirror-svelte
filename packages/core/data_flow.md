# New Core Package - Data Flow Diagrams

This document visualizes key data flows within the new `packages/core` architecture.

## Editor Initialization Flow (Svelte 5)

```mermaid
sequenceDiagram
    participant App as Application
    participant SvelteEditorComponent as ProsemirrorEditor.svelte
    participant ExtensionManager
    participant ProseMirrorSchema as ProseMirror Schema
    participant ProseMirrorPlugins as ProseMirror Plugins
    participant Svelte5NodeViewFactory
    participant ProseMirrorEditorState as EditorState
    participant ProseMirrorEditorView as EditorView

    App->>SvelteEditorComponent: Mounts with props (doc, extensions)
    SvelteEditorComponent->>ExtensionManager: processExtensions(props.extensions)
    ExtensionManager->>ProseMirrorSchema: Build schema (nodes, marks)
    ExtensionManager->>ProseMirrorPlugins: Collect plugins
    ExtensionManager->>Svelte5NodeViewFactory: Register Svelte 5 components for NodeViews
    ExtensionManager-->>SvelteEditorComponent: Return schema, plugins, nodeView constructors

    SvelteEditorComponent->>ProseMirrorEditorState: EditorState.create({ schema, doc, plugins })
    SvelteEditorComponent->>ProseMirrorEditorView: new EditorView({ mount: domNode }, { state, nodeViews: (from Svelte5NodeViewFactory) })
    ProseMirrorEditorView-->>SvelteEditorComponent: EditorView instance created

    SvelteEditorComponent->>App: Editor is ready (e.g., via onMount, events)
```

## Transaction Processing and Svelte 5 Component Update Flow

```mermaid
sequenceDiagram
    participant User
    participant ProseMirrorEditorView as EditorView
    participant ProseMirrorEditorState as EditorState
    participant SvelteEditorComponent as ProsemirrorEditor.svelte
    participant Svelte5NodeViewInstance as Svelte5NodeView

    User->>ProseMirrorEditorView: Interaction (e.g., typing, command)
    ProseMirrorEditorView->>ProseMirrorEditorState: dispatchTransaction(transaction)
    ProseMirrorEditorState-->>ProseMirrorEditorView: new State applied
    ProseMirrorEditorView-->>SvelteEditorComponent: Notifies of state update (e.g. via prop binding or event)

    alt Node content/attributes changed
        ProseMirrorEditorView->>Svelte5NodeViewInstance: update(newNode, decorations)
        Svelte5NodeViewInstance->>Svelte5NodeViewInstance: Updates its Svelte 5 component props (runes will trigger re-render)
    end

    SvelteEditorComponent->>SvelteEditorComponent: Updates its own reactive state if necessary (e.g. bound content prop)
```

## Command Execution Flow

```mermaid
sequenceDiagram
    participant AppOrComponent as Initiator (App or SvelteEditorComponent method)
    participant SvelteEditorComponent as ProsemirrorEditor.svelte
    participant CommandFunction as ProseMirror Command
    participant ProseMirrorEditorView as EditorView
    participant ProseMirrorEditorState as EditorState

    AppOrComponent->>SvelteEditorComponent: Calls command (e.g., editor.commands.toggleBold())
    SvelteEditorComponent->>CommandFunction: locateAndExecute(commandName, view.state, view.dispatch)
    CommandFunction->>ProseMirrorEditorState: Read current state
    CommandFunction->>ProseMirrorEditorView: dispatch(transaction)
    ProseMirrorEditorView->>ProseMirrorEditorState: Apply transaction, new state created
    ProseMirrorEditorState-->>ProseMirrorEditorView: Update view with new state
    ProseMirrorEditorView-->>SvelteEditorComponent: (State update notification as above)
```

## Key Considerations for Data Flow:

*   **Svelte 5 Reactivity**: Leverage Svelte 5's runes for reactive updates within `SvelteEditorComponent` and `Svelte5NodeViewInstance` components. When props change in a `Svelte5NodeViewInstance`, its Svelte 5 component should reactively update.
*   **State Management**: The primary source of truth for editor content and selection is the ProseMirror `EditorState`. The Svelte layer reacts to changes in this state.
*   **NodeView Updates**: The `update` method of `Svelte5NodeViewInstance` will be critical. It receives a new ProseMirror node and must efficiently update the props of its managed Svelte 5 component.
