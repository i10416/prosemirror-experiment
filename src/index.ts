import { Schema } from "prosemirror-model";
import { EditorState, TextSelection } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
const schema = new Schema({
	nodes: {
		doc: {
			content: "note+", // The grammar ProseMirror follows to "parse"s inputs
		},
		note: {
			content: "text*", // Any node with content is supposed to be Block(?)
			toDOM: (_) => [
				"https://example.com/dom/namespace/prefix name", // The tag name of element
				{ kind: "note" }, // The second element is DOM attributes if it is JS object
				0, // The placeholder indicating that it has children inside this node
			],
		},
		text: {},
	},
});
const state = EditorState.create({
	schema: schema,
});
const tx = state.tr.insertText(
	"This is a ProseMirror editor without plugins " +
		"built mainly for understanding its data flow. " +
		"I'm not sure why, but you need to hit `Enter` twice " +
		"and move a cursor down when you are at the end of paragraph.",
);
const next = state.apply(tx);

const view = new EditorView(document.getElementById("app"), {
	state: next,
	plugins: [
		{
			spec: {},
			props: {
				handleKeyDown: (view, event) => {
					if (event.key == "Enter") {
						const s = view.state;
						const nextNode = s.selection.$to.parent.type.createAndFill()!;
						const to = s.selection.$to;
						const tr = s.tr.insert(to.pos, nextNode);
						const sel = TextSelection.create(tr.doc, to.pos + 1);
						tr.setSelection(sel);
						view.dispatch(tr);
						return false;
					}
				},
			},
			getState: (_) => {},
		},
	],
	dispatchTransaction(transaction) {
		const newState = view.state.apply(transaction);
		view.updateState(newState);
	},
});
