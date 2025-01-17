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
