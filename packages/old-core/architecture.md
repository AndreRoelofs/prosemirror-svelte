# Svelte-ProseMirror Core Architecture

This document provides an overview of the architecture of the `packages/core` package, which serves as the foundation for integrating Svelte with ProseMirror.

## Overview

The core package provides a bridge between Svelte components and the ProseMirror editor framework. It allows developers to:

1. Create rich text editors with Svelte components as custom nodes and marks
2. Define extensions that add functionality to the editor
3. Manage the editor state and view
4. Execute commands to modify the editor content

## Key Components

### Editor

The `Editor` class is the central component of the package. It:

- Manages the ProseMirror EditorView and EditorState
- Processes extensions to build the editor schema
- Provides methods for manipulating the editor content
- Emits events when the editor state changes
- Handles the lifecycle of the editor (initialization, updates, destruction)

### Observable

The `Observable` class provides an event system that allows components to subscribe to and emit events. The `Editor` class extends `Observable` to provide events like 'ready', 'update', and 'destroy'.

### SvelteNodeView

The `SvelteNodeView` class integrates Svelte components with ProseMirror's node view system. It:

- Mounts Svelte components in the editor
- Syncs component props with ProseMirror node attributes
- Handles updates when the node changes
- Manages the lifecycle of the component

### Extensions

Extensions are objects that add functionality to the editor. They can:

- Define custom nodes and marks
- Add commands to manipulate the editor
- Register keyboard shortcuts
- Add plugins to extend the editor's behavior
- Initialize and clean up resources

### Commands

Commands are functions that modify the editor state. They:

- Take the current state and dispatch function as arguments
- Return a boolean indicating whether the command was executed
- Can be chained together for complex operations

## Architecture Diagrams

The architecture is documented in three sets of diagrams:

1. **[Basic Structure Diagrams](diagrams.md)** - Shows the directory structure, class relationships, and module dependencies
2. **[Flow Diagrams](diagrams-flow.md)** - Illustrates the flow of data and operations within the package
3. **[Type System Diagrams](diagrams-types.md)** - Visualizes the type hierarchy and relationships

## Key Workflows

### Editor Initialization

1. The application creates an Editor instance with `Editor.create(dom, props)`
2. The Editor processes the extensions to build the schema
3. The Editor creates a ProseMirror EditorView and EditorState
4. The Editor initializes each extension
5. The Editor emits the 'ready' event

### Transaction Processing

1. User interaction triggers a transaction in the EditorView
2. The transaction is applied to the EditorState
3. The Editor updates its internal state
4. The Editor emits the 'update' event
5. Extensions can react to the state change

### Command Execution

1. The application calls a command method on the Editor
2. The command creates a transaction
3. The transaction is applied to the EditorState
4. The Editor updates its internal state
5. The Editor returns itself for method chaining

### Svelte Component Integration

1. An extension defines a node with a Svelte component
2. The Editor creates a NodeSpec from the component
3. The NodeSpec is added to the schema
4. When the node is rendered, a SvelteNodeView is created
5. The SvelteNodeView mounts the component and syncs it with the node

## Extension Points

The core package provides several extension points:

1. **Custom Nodes** - Define new node types with Svelte components
2. **Custom Marks** - Define new mark types with optional Svelte components
3. **Commands** - Add new commands to manipulate the editor
4. **Plugins** - Add ProseMirror plugins to extend the editor's behavior
5. **Keyboard Shortcuts** - Register keyboard shortcuts for commands

## Design Principles

1. **Composability** - Extensions can be combined to create complex editors
2. **Type Safety** - TypeScript is used throughout to ensure type safety
3. **Reactivity** - Changes to the editor state trigger updates to components
4. **Extensibility** - The architecture is designed to be extended with new functionality
5. **Svelte Integration** - Svelte components are first-class citizens in the editor

## Relationship with ProseMirror

The core package builds on top of ProseMirror, providing:

1. A more Svelte-friendly API
2. Integration with Svelte components
3. An extension system for adding functionality
4. Utilities for common operations

ProseMirror concepts like Schema, Node, Mark, and EditorState are still central to the architecture, but they are wrapped in a more Svelte-friendly API.
