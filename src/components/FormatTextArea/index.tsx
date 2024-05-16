// import {
//   Editor,
//   EditorState,
//   RichUtils,
//   DraftHandleValue,
//   convertToRaw,
//   ContentBlock,
// } from "draft-js";
// import React, { useState } from "react";
// import "draft-js/dist/Draft.css";
// import FormatButton from "../FormatButton";
// import { draftToMarkdown, markdownToDraft } from "markdown-draft-js";
// import "./formatTextArea.css";
import BoldSVG from "../../assets/icons/Bold";
import ItalicSVG from "../../assets/icons/Italic";
import UnderlinedSVG from "../../assets/icons/Underlined";
import StrikethroughSVG from "../../assets/icons/StrikeThrough";
import LetterspacingSVG from "../../assets/icons/Letterspacing";
// import { stateToHTML } from "draft-js-export-html";
import SpoilerSVG from "../../assets/icons/Spoiler";

// type Props = {};

// const FormatTextArea: React.FC<Props> = () => {
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());

//   const handleKeyCommand = (
//     command: string,
//     editorState: EditorState
//   ): DraftHandleValue => {
//     const newState = RichUtils.handleKeyCommand(editorState, command);
//     if (newState) {
//       setEditorState(newState);
//       return "handled";
//     }
//     return "not-handled";
//   };

//   const toggleStyle = (style: string): void => {
//     setEditorState(RichUtils.toggleInlineStyle(editorState, style));
//   };

//   let options = {
//     inlineStyles: {
//       SPOILER: {
//         element: "span",
//         attributes: { class: "tg-spoiler" },
//       },
//     },
//   };
//   const styleMap = {
//     SPOILER: {
//       backgroundColor: "gray",
//     },
//   };

//   const sendData = () => {
//     console.log(stateToHTML(editorState.getCurrentContent(), options));
//   };
//   return (
//     <div className="container">
//       <div className="buttons">
//         <div className="buttons_row">
//           <FormatButton icon={<BoldSVG />} func={() => toggleStyle("BOLD")} />
//           <FormatButton
//             icon={<UnderlinedSVG />}
//             func={() => toggleStyle("UNDERLINE")}
//           />
//           <FormatButton
//             icon={<StrikethroughSVG />}
//             func={() => toggleStyle("STRIKETHROUGH")}
//           />
//         </div>
//         <div className="buttons_row">
//           <FormatButton
//             icon={<ItalicSVG />}
//             func={() => toggleStyle("ITALIC")}
//           />
//           <FormatButton
//             icon={<LetterspacingSVG />}
//             func={() => toggleStyle("CODE")}
//           />
//           <FormatButton
//             icon={<SpoilerSVG />}
//             func={() => toggleStyle("SPOILER")}
//           />
//         </div>
//       </div>
//       <Editor
//         editorState={editorState}
//         handleKeyCommand={handleKeyCommand}
//         onChange={setEditorState}
//         placeholder={"Напиши здесь крутой текст"}
//         customStyleMap={styleMap}
//       />
//       {/* <button onClick={() => sendData()}>Send</button> */}
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import FormatButton from "../FormatButton";
import { stateToHTML } from "draft-js-export-html";
import "./formatTextArea.css";

const FormatTextArea = ({ value, onChange }: any) => {
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
          <FormatButton
            icon={<ItalicSVG />}
            func={() => toggleStyle("ITALIC")}
          />
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
        placeholder={"Напиши здесь крутой текст"}
        customStyleMap={styleMap}
      />
    </div>
  );
};

export default FormatTextArea;
