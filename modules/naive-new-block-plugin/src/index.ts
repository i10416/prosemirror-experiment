import { TextSelection, Plugin } from "prosemirror-state";

export const naiveNewBlockPlugin = new Plugin({
	props: {
		handleKeyDown: (view, event) => {
			if (event.key === "Enter") {
				const s = view.state;
				const nextNode = s.selection.$to.parent.type.createAndFill();
				if (!nextNode) return false;
				const to = s.selection.$to;
				const tr = s.tr.insert(to.pos, nextNode);
				const sel = TextSelection.create(tr.doc, to.pos + 1);
				tr.setSelection(sel);
				view.dispatch(tr);
				return false;
			}
		},
	},
});
