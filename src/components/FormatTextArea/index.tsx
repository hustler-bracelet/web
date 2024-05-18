import BoldSVG from "../../assets/icons/Bold";
import ItalicSVG from "../../assets/icons/Italic";
import UnderlinedSVG from "../../assets/icons/Underlined";
import StrikethroughSVG from "../../assets/icons/StrikeThrough";
import LetterspacingSVG from "../../assets/icons/Letterspacing";
import SpoilerSVG from "../../assets/icons/Spoiler";

import { useState, useEffect } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import FormatButton from "../FormatButton";
import "./formatTextArea.css";

const FormatTextArea = ({ value, onChange, withItalic = false }: any) => {
  const [editorState, setEditorState] = useState(
    value
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(value)))
      : EditorState.createEmpty()
  );

  useEffect(() => {
    const contentState = editorState.getCurrentContent();
    onChange(JSON.stringify(convertToRaw(contentState)));
  }, [editorState, onChange]);

  const handleKeyCommand = (command: any, editorState: any) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const styleMap = {
    SPOILER: {
      backgroundColor: "gray",
    },
  };

  return (
    <div className="container">
      <div className="buttons">
        <div className="buttons_row">
          <FormatButton icon={<BoldSVG />} func={() => toggleStyle("BOLD")} />
          <FormatButton
            icon={<UnderlinedSVG />}
            func={() => toggleStyle("UNDERLINE")}
          />
          <FormatButton
            icon={<StrikethroughSVG />}
            func={() => toggleStyle("STRIKETHROUGH")}
          />
        </div>
        <div className="buttons_row">
          {withItalic && (
            <FormatButton
              icon={<ItalicSVG />}
              func={() => toggleStyle("ITALIC")}
            />
          )}
          <FormatButton
            icon={<LetterspacingSVG />}
            func={() => toggleStyle("CODE")}
          />
          <FormatButton
            icon={<SpoilerSVG />}
            func={() => toggleStyle("SPOILER")}
          />
        </div>
      </div>
      <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={setEditorState}
        placeholder={"Описание"}
        customStyleMap={styleMap}
      />
    </div>
  );
};

export default FormatTextArea;
