
import React, { useRef } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import plugins from "suneditor/src/plugins";
import './editor.css'

const CustomSunEditor = ({ value, getText, onChange }) => {
  const editorRef = useRef(null);

  return (
    <SunEditor
      getSunEditorInstance={(editor) => {
        editorRef.current = editor;
      }}
      setOptions={{
        height: 500,
        plugins: plugins,
        buttonList: [
          // default
          ['undo', 'redo'],
          ['font', 'fontSize', 'formatBlock'],
          ['paragraphStyle', 'blockquote'],
          ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
          ['fontColor', 'hiliteColor', 'textStyle'],
          ['removeFormat'],
          ['outdent', 'indent'],
          ['align', 'horizontalRule', 'list', 'lineHeight'],
          ['table', 'link', 'image', 'video'],
          ['fullScreen', 'showBlocks', 'codeView'],
          ['preview'],
          ['save'],
          // responsive
          ['%1161', [
              ['undo', 'redo'],
              [':p-Formats-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
              ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
              ['fontColor', 'hiliteColor', 'textStyle'],
              ['removeFormat'],
              ['outdent', 'indent'],
              ['align', 'horizontalRule', 'list', 'lineHeight'],
              ['-right', 'save'],
              ['-right', ':i-Etc-default.more_vertical', 'fullScreen', 'showBlocks',  'preview'],
              ['-right', ':r-Table&Media-default.more_plus', 'table', 'link', 'image'],
          ]],
          ['%893', [
              ['undo', 'redo'],
              [':p-Formats-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
              ['bold', 'underline', 'italic', 'strike'],
              [':t-Fonts-default.more_text', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle'],
              ['removeFormat'],
              ['outdent', 'indent'],
              ['align', 'horizontalRule', 'list', 'lineHeight'],
              ['-right', 'save'],
              ['-right', ':i-Etc-default.more_vertical', 'fullScreen', 'showBlocks',  'preview'],
              ['-right', ':r-Table&Media-default.more_plus', 'table', 'link', 'image'],
          ]],
          ['%855', [
              ['undo', 'redo'],
              [':p-Formats-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
              [':t-Fonts-default.more_text', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle'],
              ['removeFormat'],
              ['outdent', 'indent'],
              ['align', 'horizontalRule', 'list', 'lineHeight'],
              [':r-Table&Media-default.more_plus', 'table', 'link', 'image'],
              ['-right', 'save'],
              ['-right', ':i-Etc-default.more_vertical', 'fullScreen', 'showBlocks',  'preview'],
          ]],
          ['%563', [
              ['undo', 'redo'],
              [':p-Formats-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
              [':t-Fonts-default.more_text', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle'],
              ['removeFormat'],
              ['outdent', 'indent'],
              [':e-List&Line-default.more_horizontal', 'align', 'horizontalRule', 'list', 'lineHeight'],
              [':r-Table&Media-default.more_plus', 'table', 'link', 'image'],
              ['-right', 'save'],
              ['-right', ':i-Etc-default.more_vertical', 'fullScreen', 'showBlocks',  'preview'],
          ]],
          ['%458', [
              ['undo', 'redo'],
              [':p-Formats-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
              [':t-Fonts-default.more_text', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle', 'removeFormat'],
              [':e-List&Line-default.more_horizontal', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'lineHeight'],
              [':r-Table&Media-default.more_plus', 'table', 'link', 'image'],
              ['-right', 'save'],
              ['-right', ':i-Etc-default.more_vertical', 'fullScreen', 'showBlocks',  'preview'],
          ]]
      ],
        defaultTag: "div",
        minHeight: "200px",
      }}
      defaultValue="<div style='text-align: center;'>
      <p style='font-size: 24px; font-weight: bold; margin-bottom: 10px;' >About Us</p>
      </div>"	
      setContents={value}
      
      onChange={()=>{
        onChange(editorRef.current.getContents());
      }}

    />
  );
};

export default CustomSunEditor;