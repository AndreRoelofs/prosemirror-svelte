# Svelte-ProseMirror Core Type System Diagrams

This document contains Mermaid diagrams that visualize the type system within the `packages/core` package.

## Core Types Hierarchy

```mermaid
classDiagram
    class Editor {
        +commands: Commands & EditorCommands
        +data: MutableData
        +editorView: EditorView
        +extensions: Extension[]
    }

    class EditorProps {
        +extensions?: Extension[]
        +doc?: PMDoc
        +topNode?: string
    }

    class MutableData {
        +state: EditorState
        +props: EditorProps
        +editable: boolean
        +extObj: ExtObject
    }

    class Extension {
        +name: string
        +opts?: any
        +commands?: Record~string, Function~
        +keymaps?: Record~string, Cmd | Array~
        +store?: Record~string, any~
        +marks?: Record~string, SveltePMMark~
        +nodes?: Record~string, SveltePMNode~
        +init?: Function
        +plugins?: Function
        +destroy?: Function
    }

    class SveltePMNode~T~ {
        +attrs?: T
        +selectors?: string[]
        +schema?: NodeSpec
        +toJSON?: Function
        +fromJSON?: Function
        +attrExtractor?: Function
        +nodeView?: Function
        +component?: SvelteComponent
    }

    class SveltePMMark {
        +schema?: MarkSpec
        +markView?: MarkViewConstructor
    }

    class SvelteNodeView~A~ {
        +node: PMNode
        +decorations: Decoration[]
        +innerDecorations: DecorationSource
        +selected: boolean
        +editor: Editor
        +component?: SvelteComponent
        +mounted?: SvelteComponent
    }

    class SvelteNodeViewProps~A~ {
        +node: PMNode
        +attrs: A
        +contentDOM: Function
        +selected: boolean
        +view: EditorView
        +getPos: Function
        +decorations: Decoration[]
        +innerDecorations: DecorationSource
        +editor: Editor
    }

    class Cmd {
        <<interface>>
        Function(state, dispatch, view): boolean
    }

    class Commands {
        <<interface>>
        Record~string, Function~
    }

    class EditorCommands {
        <<interface>>
        Extension-specific commands
    }

    class ExtObject {
        <<interface>>
        Record~string, Extension~
    }

    class ExtensionData {
        +commands: Record~string, Function~
        +marks: Record~string, MarkSpec~
        +markViews: Record~string, MarkViewConstructor~
        +nodes: Record~string, NodeSpec~
        +nodeViews: Record~string, NodeViewConstructor~
        +sortedKeymaps: Record~string, Array~
        +svelteNodes: Record~string, SveltePMNode~
    }

    class Initialized {
        +plugins: Plugin[]
        +schema: Schema
    }

    Editor o-- EditorProps
    Editor o-- MutableData
    Editor o-- Extension
    MutableData o-- EditorProps
    MutableData o-- ExtObject
    Extension o-- SveltePMNode
    Extension o-- SveltePMMark
    SveltePMNode o-- SvelteComponent
    SvelteNodeView o-- SvelteComponent
    SvelteNodeView o-- SvelteNodeViewProps
    ExtensionData --|> Initialized
    Initialized o-- Plugin
    Initialized o-- Schema
```

## Type Extensions and Augmentation

```mermaid
graph TD
    Extensions[Extensions Interface] --> ExtA[Extension A]
    Extensions --> ExtB[Extension B]
    Extensions --> ExtC[Extension C]

    EditorCommands[EditorCommands Interface] --> CmdA[Commands A]
    EditorCommands --> CmdB[Commands B]
    EditorCommands --> CmdC[Commands C]

    Nodes[Nodes Interface] --> NodeA[Node A]
    Nodes --> NodeB[Node B]
    Nodes --> NodeC[Node C]

    Marks[Marks Interface] --> MarkA[Mark A]
    Marks --> MarkB[Mark B]
    Marks --> MarkC[Mark C]

    ExtA --> CmdA
    ExtA --> NodeA
    ExtA --> MarkA

    ExtB --> CmdB
    ExtB --> NodeB
    ExtB --> MarkB

    ExtC --> CmdC
    ExtC --> NodeC
    ExtC --> MarkC
```

## ProseMirror Type Integration

```mermaid
graph TD
    PMNode[ProseMirror Node] --> SveltePMNode
    PMNode --> NodeSpec

    PMMarks[ProseMirror Mark] --> SveltePMMark
    PMMarks --> MarkSpec

    PMSchema[ProseMirror Schema] --> NodeSpec
    PMSchema --> MarkSpec

    PMEditorState[ProseMirror EditorState] --> PMSchema
    PMEditorState --> PMPlugin[ProseMirror Plugin]

    PMEditorView[ProseMirror EditorView] --> PMEditorState
    PMEditorView --> PMNodeView[ProseMirror NodeView]
    PMEditorView --> PMMarkView[ProseMirror MarkView]

    SvelteNodeView --> PMNodeView
    SveltePMNode --> PMNodeView
    SveltePMMark --> PMMarkView
```

## Command System Types

```mermaid
graph TD
    Cmd[Cmd Type] --> PMCommand[ProseMirror Command]

    Commands[Commands Interface] --> CommandFn[Command Functions]
    CommandFn --> Cmd

    EditorCommands[EditorCommands Interface] --> ExtCommands[Extension Commands]
    ExtCommands --> Cmd

    Editor --> Commands
    Editor --> EditorCommands

    CommandExecution[Command Execution] --> EditorState[EditorState]
    CommandExecution --> EditorView[EditorView]
    CommandExecution --> Transaction[Transaction]
```

## Type Utilities and Helpers

```mermaid
graph TD
    UpdateArgs[UpdateArgs Type] --> MutableData
    EditorEvents[EditorEvents Type] --> Editor

    NodeProps[NodeProps Interface] --> PMNode
    NodeAttrs[NodeAttrs Interface] --> GenericAttrs[Generic Attributes]

    DocJSON[DocJSON Type] --> PMDoc[PMDoc Type]
    EditorStateJSON[EditorStateJSON Interface] --> DocJSON

    PMDoc --> JSONObject[JSON Object]
    DocJSON --> JSONObject
