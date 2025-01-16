
# Explore ProseMirror

## About
ProseMirror の UI に依存しないコア部分の挙動を理解するためのレポジトリ

以下のコマンドでエントリーポイントとなるスクリプトを実行できる.

```sh
npx vite build && node dist/index.js
```

## References

- Schemas from scratch
: https://prosemirror.net/examples/schema/
- What makes a node generatable?: https://discuss.prosemirror.net/t/what-makes-a-node-generatable/4734
- Discussion: What are marks: https://discuss.prosemirror.net/t/discussion-what-are-marks/862
- Transforming ProseMirror data model to AST-like structure
  - Pandoc export: https://discuss.prosemirror.net/t/pandoc-export/6452/2
  - > At first glance Pandoc's Blocks match Prosemirror's Nodes and Inlines match Marks, but it's not that simple, because the tree-like nature of Inlines does not perfectly match the flat, label-like nature of Marks in Prosemirror.
    -  https://github.com/massifrg/pundok-editor?tab=readme-ov-file#how-it-works
