# Svelte-ProseMirror Core Package Diagrams

This document contains Mermaid diagrams that visualize the structure and relationships within the `packages/core` directory.

## Directory Structure

```mermaid
graph TD
    core[packages/core]
    core --> package.json
    core --> tsconfig.json
    core --> vite.config.ts
    core --> src

    src[src/]
    src --> commands.ts
    src --> createExtensions.ts
    src --> Editor.ts
    src --> index.ts
    src --> Observable.ts
    src --> SvelteNodeView.ts
    src --> extensions
    src --> typings

    extensions[extensions/]
    extensions --> createNodeSpec.ts
    extensions --> getAttrsWithOutputSpec.spec.ts
    extensions --> getAttrsWithOutputSpec.ts
    extensions --> htmlToDOMOutputSpec.spec.ts
    extensions --> htmlToDOMOutputSpec.ts

    typings[typings/]
    typings --> editor.ts
    typings --> extension.ts
    typings --> index.ts
    typings --> pm.ts
```

## Core Classes and Interfaces

```mermaid
classDiagram
    class Observable {
        -observers: Map
        +on(key, callback)
        +once(key, callback)
        +off(key, callback)
        +emit(key, ...args)
        +destroy()
    }

    class Editor {
        -_editorView: EditorView
        +commands: Commands
        +data: MutableData
        +editorView: EditorView
        +extensions: Extension[]
        +cmds: Record~string, Function~
        +docFromJSON(json)
        +stateFromJSON(json)
        +docToJSON()
        +stateToJSON()
        +createNode(name, attrs, content, marks)
        +cmd(cmd)
        +setProps(props)
        +setState(stateOrJSON)
        +getExtension(name)
        +maybeGetExtension(name)
        +config(cb)
        +run(dom, props)
        +rerun(props)
        +destroy()
        +static create(dom, props)
    }

    class SvelteNodeView {
        -_dom: HTMLElement
        +contentDOM: HTMLElement
        +node: PMNode
        +decorations: Decoration[]
        +innerDecorations: DecorationSource
        +selected: boolean
        +editor: Editor
        +component: SvelteComponent
        +mounted: SvelteComponent
        +dom: HTMLElement
        +props: SvelteNodeViewProps
        +init()
        +render()
        +shouldUpdate(node)
        +update(node, decorations, innerDecorations)
        +selectNode()
        +deselectNode()
        +destroy()
        +ignoreMutation(mutation)
        +static fromComponent(editor, component)
    }

    Observable <|-- Editor
    Editor --> SvelteNodeView : uses
```

## Module Dependencies

```mermaid
graph TD
    index[index.ts] --> Editor
    index --> createExtensions
    index --> Observable
    index --> SvelteNodeView
    index --> typings

    Editor[Editor.ts] --> createExtensions
    Editor --> commands
    Editor --> Observable
    Editor --> typings

    createExtensions[createExtensions.ts] --> SvelteNodeView
    createExtensions --> createNodeSpec
    createExtensions --> typings

    SvelteNodeView[SvelteNodeView.ts] --> typings

    createNodeSpec[extensions/createNodeSpec.ts] --> getAttrsWithOutputSpec
    createNodeSpec --> htmlToDOMOutputSpec
    createNodeSpec --> typings

    typings_index[typings/index.ts] --> typings_editor
    typings_index --> typings_extension
    typings_index --> typings_pm

    typings_editor[typings/editor.ts] --> typings_extension
    typings_editor --> typings_pm

    typings_extension[typings/extension.ts] --> typings_editor
    typings_extension --> typings_pm
```

## Extension System

```mermaid
graph TD
    Editor --> createExtensions
    createExtensions --> Extension

    Extension --> Nodes
    Extension --> Marks
    Extension --> Plugins
    Extension --> Commands

    Nodes --> SveltePMNode
    SveltePMNode --> NodeSpec
    SveltePMNode --> SvelteComponent

    Marks --> SveltePMMark
    SveltePMMark --> MarkSpec

    createNodeSpec --> SveltePMNode
    createNodeSpec --> NodeSpec

    SvelteNodeView --> SvelteComponent
```

## ProseMirror Integration

```mermaid
graph TD
    Editor --> EditorView[ProseMirror EditorView]
    Editor --> EditorState[ProseMirror EditorState]
    Editor --> Schema[ProseMirror Schema]

    createExtensions --> Schema
    createExtensions --> Plugin[ProseMirror Plugin]

    SvelteNodeView --> NodeView[ProseMirror NodeView]

    commands --> Command[ProseMirror Command]
```

## Package Dependencies

```mermaid
graph TD
    core[packages/core] --> prosemirror-model
    core --> prosemirror-state
    core --> prosemirror-view
    core --> prosemirror-commands
    core --> prosemirror-keymap
    core --> prosemirror-transform
    core --> svelte
