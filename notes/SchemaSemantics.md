## Only non-generatable nodes (text) in a required position
The following schema does not work because it is impossible to generate
`note` element from empty state. It results in "Only non-generatable nodes (text) in a required position" error.


```js
const schema = new Schema({
	nodes: {
		doc: {
			content: "note*",
		},
		note: {
			content: "text+", // Any node with content is supposed to be Block(?)
			toDOM: () => [
				"https://example.com/dom/namespace/prefix name",// The tag name of element
				{kind: "note"}, // The second element is DOM attributes if it is JS object
				"DOMOutputSpec", // children is of type `DOMOutputSpec`
			]
		},
		text: {},
	},
});
```

## Simplest User-Defined Node

```js
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
```


It is serialized into the following JSON.

```json
{
    "type": "doc",
    "content": [
        {
            "type": "note",
            "content": [
                {
                    "type": "text",
                    "text": "...."
                }
            ]
        }
    ]
}
```

## dispatchTransaction API

dispatchTransaction API exposes each transaction to developers.

Developers can use a limited set of information here.
For example, it is difficult to find which keypress happens
for this transaction. It requires plugins API in order to get
original events.

```js
const view = new EditorView(document.getElementById("app"), {
	state: next,
	dispatchTransaction(transaction) {
		const newState = view.state.apply(transaction);
		view.updateState(newState);
	}
});
```

It seems new paragraph by `Enter` key is implemented by the following mechanism.

- Editor starts with empty paragraph and the paragraph consumes input characters until `Enter` key
- if keypress is `Enter`, it creates new paragraph node to the current one and moves selection(cursor) to the new paragraph node.


### Question

- Which data does ProseMirror Plugin have access to?
  - events from DOM
  - ???
- Where is ProseMirror Plugin API specification or docs
