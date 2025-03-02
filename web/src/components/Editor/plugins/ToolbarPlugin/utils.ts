import { $createCodeNode } from "@lexical/code";
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from "@lexical/list";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import { $createParagraphNode, $getSelection, $isRangeSelection, LexicalEditor } from "lexical";

export const formatParagraph = (editor: LexicalEditor) => {
  editor.update(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      $setBlocksType(selection, () => $createParagraphNode())
    }
  })  
}

export const formatHeading = (editor: LexicalEditor) => {
  editor.update(() => {
    const selection = $getSelection()
    $setBlocksType(selection, () => $createHeadingNode('h1'))
  })
}

export const formatBulletList = (
  editor: LexicalEditor,
  blockType: string
) => {
  if (blockType !== 'bullet') {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
  } else {
    formatParagraph(editor)
  }
}

export const formatNumberedList = (
  editor: LexicalEditor,
  blockType: string,
) => {
  if (blockType !== 'number') {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
  } else {
    formatParagraph(editor);
  }
};

export const formatQuote = (editor: LexicalEditor, blockType: string) => {
  if (blockType !== 'quote') {
    editor.update(() => {
      const selection = $getSelection();
      $setBlocksType(selection, () => $createQuoteNode());
    });
  }
};

export const formatCode = (editor: LexicalEditor, blockType: string) => {
  if (blockType !== 'code') {
    editor.update(() => {
      let selection = $getSelection();

      if (selection !== null) {
        if (selection.isCollapsed()) {
          $setBlocksType(selection, () => $createCodeNode());
        } else {
          const textContent = selection.getTextContent();
          const codeNode = $createCodeNode();
          selection.insertNodes([codeNode]);
          selection = $getSelection();
          if ($isRangeSelection(selection)) {
            selection.insertRawText(textContent);
          }
        }
      }
    });
  }
};