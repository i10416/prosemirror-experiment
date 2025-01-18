import { initialState } from "../../core/src";
import { naiveNewBlockPlugin } from "../../naive-new-block-plugin/src";
import { EditorView } from "prosemirror-view";

const view = new EditorView(document.getElementById("app"), {
	state: initialState,
	plugins: [naiveNewBlockPlugin],
	dispatchTransaction(transaction) {
		const newState = view.state.apply(transaction);
		view.updateState(newState);
	},
});
