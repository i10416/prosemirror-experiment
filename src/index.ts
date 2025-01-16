import { Schema, Node, Slice, Fragment } from "prosemirror-model"
import { EditorState } from "prosemirror-state"

const schema = new Schema(
    {
        nodes: {
            doc: {
                content: "inline*"
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

const nextTx = next.tr.replace(0, 5, new Slice(
    Fragment.empty, 0, 0
))
const nextX2 = next.apply(nextTx)
console.log(nextX2.doc.toJSON())
const setNodeAttr = nextX2.tr.setNodeAttribute(0,"foo","bar")
console.log(nextX2.apply(setNodeAttr))

