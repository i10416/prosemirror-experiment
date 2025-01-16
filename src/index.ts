import { Schema } from "prosemirror-model"
import { EditorState } from "prosemirror-state"


const state = EditorState.create(
    {
        schema: new Schema(
            {
                nodes: {
                    doc: {
                        content: "block+"
                    },
                    paragraph: {
                        content: "inline*",
                        group: "block"
                    },
                    text: {
                        group: "inline"
                    }
                }
            }
        )
    }
)
console.log(state.doc.content)
const tx = state.tr.insertText("Hello, ProseMirror!")
const next = state.apply(tx)
console.log(next.doc.textContent)
