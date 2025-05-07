import { EditorState } from 'prosemirror-state';
import { Mark, NodeType, ResolvedPos } from 'prosemirror-model';

const mapFromMarks = (marks: Mark[] | null) => {
	if (!marks) return null;

	const map: Record<string, Mark> = {};
	for (const mark of marks) {
		map[mark.type.name] = mark;
	}
	return map;
};

const getMarksForResolvedPosition = (resolvedPosition: ResolvedPos) => {
	const marks = resolvedPosition.marks();
	return mapFromMarks(Array.from(marks));
};

/**
 * Get an array of the current active marks
 * @param editorState {EditorState}
 * @return {{activeMarks: Object<string,Mark>, marksInSelection: Object<string,Mark>,, marksAtHead: Object<string,Mark>, storedMarks: Object}}
 */
export const getCurrentMarks = (editorState: EditorState) => {
	const { $head, empty, from, to } = editorState.selection;

	const marksInSelection: Record<string, Mark> = {};

	const storedMarks = mapFromMarks(Array.from(editorState.storedMarks ?? []));
	const marksAtHead = getMarksForResolvedPosition($head);

	if (!empty) {
		editorState.doc.nodesBetween(from, to, (node) => {
			node.marks.forEach((mark) => {
				marksInSelection[mark.type.name] = mark;
			});
		});
	}

	const activeMarks = storedMarks ?? { ...marksInSelection, ...marksAtHead };

	return {
		activeMarks,
		marksInSelection,
		marksAtHead,
		storedMarks
	};
};

/**
 * Get the type of node at the selection head
 * @param editorState {EditorState}
 * @returns {{type: NodeType, attrs: Object}}
 */
export const getNodeTypeAtSelectionHead = (editorState: EditorState) => {
	const { $head } = editorState.selection;
	const node = $head.node();

	return {
		type: node.type,
		attrs: node.attrs
	};
};
