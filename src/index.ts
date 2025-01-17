import { Schema } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
const schema = new Schema({
	nodes: {
		doc: {
			content: "text*",
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
