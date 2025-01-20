## Minimal Data Flow

### States
- Input State
  - Composition
    - Some inputs must be composed with upcoming input(s). See https://www.stum.de/2016/06/24/handling-ime-events-in-javascript/
- DOM
- prosemirror-state State

### Render Plain Text

1. handle keypress event here https://github.com/ProseMirror/prosemirror-view/blob/f37ebb29befdbde3cd194fe13fe17b78e743d2f2/src/input.ts#L141
   1. It updates the model state, but not update view state(DOM)
   2. It delegates effect-ful operation to dispatch
2. `dispatch` performs all the side-effects here https://github.com/ProseMirror/prosemirror-view/blob/f37ebb29befdbde3cd194fe13fe17b78e743d2f2/src/index.ts#L483
   1. call dispatchTransaction
   2. update view
3. https://github.com/ProseMirror/prosemirror-view/blob/f37ebb29befdbde3cd194fe13fe17b78e743d2f2/test/webtest-draw.ts#L7
4. ViewDesc represents mapping between editor content and DOM https://github.com/ProseMirror/prosemirror-view/blob/f37ebb29befdbde3cd194fe13fe17b78e743d2f2/src/viewdesc.ts#L116

```js
it("updates the DOM", () => {
    let view = tempEditor({doc: doc(p("foo"))})
    view.dispatch(view.state.tr.insertText("bar"))
    ist(view.dom.textContent, "barfoo")
})
```

## Details

### Scenario A: Insert Text At the End In minimal ProseMirror editor

- prosemirror-view
  - DomObserver#flush() when user sets focus on input area(for some reason, it is invoked twice?)
  - DomObserver#handleDOMChange(...) when user inputs a character in input area
  - readDOMChange
  - State#apply(tr)
  - EditorView#dispatch
  - EditorView#updateStateInner > if(updateSel) clause
  - EditorView#updateStateInner > if(updateDoc) clause
  - `redraw = false`  in `if (redraw || !this.docView.update)`
  - EditorView#updateStateInner > work around clause > selectionToDOM
  - NodeViewDesc#update
  - `renderDescs(...)` mutates DOM

### Selection

- bootstrap phase
  - connectSelection -> register DOMObserver#onSelectionChange
- on focus
  - connectSelection
  - onSelectionChange
  - flush
      - readDOMChange
      - selectionFromDOM
      - selection2dom
      - setCurSelection
      - connectSelection
- DOMObserver#start
  - connectSelection
- right/left allow
  - selectHorizontally
    - check endOfTextBlock
