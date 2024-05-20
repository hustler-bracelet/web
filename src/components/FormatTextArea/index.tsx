import BoldSVG from "../../assets/icons/Bold";
import ItalicSVG from "../../assets/icons/Italic";
import UnderlinedSVG from "../../assets/icons/Underlined";
import StrikethroughSVG from "../../assets/icons/StrikeThrough";
import LetterspacingSVG from "../../assets/icons/Letterspacing";
import SpoilerSVG from "../../assets/icons/Spoiler";

import { useState, useEffect, useRef } from "react";
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
import { TELEGRAM } from "../../utils/constants";
import { FieldErrors } from "react-hook-form";
import { ActivityFormType } from "../../utils/types";
import { handleFocus } from "../../utils/tools";
type FormatTextAreaProps = {
  value: string;
  onChange: (value: string) => void;
  withItalic?: boolean;
  errors: FieldErrors<ActivityFormType>;
  name: string;
};
const FormatTextArea: React.FC<FormatTextAreaProps> = ({
  value,
  onChange,
  withItalic = false,
  errors,
  name,
}) => {
  const [editorState, setEditorState] = useState(
    value
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(value)))
      : EditorState.createEmpty()
  );
  const [focus, setFocus] = useState<boolean>(false);
  const editor = useRef(null);

  function focusEditor() {
    if (editor.current) {
      //@ts-ignore
      editor.current.focus();
    }
  }

  useEffect(() => {
    const element = handleFocus(errors);
    const nameArr = name.split(".");

    if (nameArr.length === 3) {
      if (`${nameArr[0]}.${nameArr[1]}.${element}` === name) focusEditor();
    }
    if (nameArr.length === 1) {
      if (element === name) focusEditor();
    }
  }, [errors, name]);

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
    TELEGRAM.HapticFeedback.impactOccurred("light");
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const styleMap = {
    SPOILER: {
      backgroundColor: "var(--tg-theme-hint-color, gray)",
      color: "var(--tg-theme-text-color, #000)",
    },
  };

  return (
    <div className="text-area_container">
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
            func={() => {
              toggleStyle("SPOILER");
            }}
          />
        </div>
      </div>
      <div className={focus ? "withBorder" : "withoutBorder"}>
        <Editor
          ref={editor}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={setEditorState}
          placeholder={"Описание"}
          customStyleMap={styleMap}
        />
      </div>
    </div>
  );
};

export default FormatTextArea;
