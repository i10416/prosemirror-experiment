import { Schema } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
const schema = new Schema({
	nodes: {
		doc: {
			content: "note+", // The grammar ProseMirror follows to "parse"s inputs
		},
		note: {
			content: "text*", // Any node with content is supposed to be Block(?)
			toDOM: (_) => [
				"https://example.com/dom/namespace/prefix name",// The tag name of element
				{kind: "note"}, // The second element is DOM attributes if it is JS object
				0 // The placeholder indicating that it has children inside this node
			]
		},
		text: {},
	},
});
const state = EditorState.create({
	schema: schema,
});
const tx = state.tr.insertText("Hello, ProseMirror!");
const next = state.apply(tx);

new EditorView(document.getElementById("app"), {
	state: next,
});
