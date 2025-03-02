import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND, TextFormatType } from "lexical";

export default function Toolbar() {
  const [editor] = useLexicalComposerContext();

  const toggleFormat = (format: TextFormatType) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };


  return (
    <div style={{ display: "flex", gap: "10px", padding: "10px", borderBottom: "1px solid #ddd" }}>
      <button onClick={() => toggleFormat("bold")}>Bold</button>
      <button onClick={() => toggleFormat("italic")}>Italic</button>
      <button onClick={() => toggleFormat("underline")}>Underline</button>
      <button onClick={() => toggleFormat("strikethrough")}>Strikethrough</button>
      {/* <button onClick={() => toggleFormat("")}>List</button> */}
    </div>
  );
};