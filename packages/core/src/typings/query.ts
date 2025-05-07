import { EurNode } from './extension.js';

export interface Query {
	text: string;
	eurNodes: EurNode<any>[];
}
