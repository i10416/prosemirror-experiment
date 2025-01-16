import { Schema, Node } from "prosemirror-model"
import { EditorState } from "prosemirror-state"

const schema = new Schema(
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
const state = EditorState.create(
    {
        schema: schema
    }
)
console.log(state.doc.content)
const tx = state.tr.insertText("Hello, ProseMirror!")
const next = state.apply(tx)
console.log(next.doc.textContent)
const forward = next.doc.toJSON()
const back = Node.fromJSON(schema, forward)
console.log(forward)
console.log(back.toJSON())
