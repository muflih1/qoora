import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { formatBulletList, formatHeading } from './plugins/ToolbarPlugin/utils';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export default function Editor() {
  const [editor] = useLexicalComposerContext()
  return (
    <>
      <button onClick={() => formatHeading(editor)}>H1</button>
      <button onClick={() => formatBulletList(editor, '')}>UL</button>
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            style={{
              padding: '10px',
              minHeight: '150px',
              border: '1px solid #ddd',
            }}
          />
        }
        placeholder={
          <div style={{ color: '#aaa', padding: '10px' }}>Start typing...</div>
        }
        ErrorBoundary={err => <div>{err.children}</div>}
      />
      <HistoryPlugin />
      <ListPlugin />
    </>
  );
}