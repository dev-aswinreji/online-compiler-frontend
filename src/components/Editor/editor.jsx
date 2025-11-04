import * as monaco from '@monaco-editor/react';
import { initVimMode } from 'monaco-vim';
import { useEffect, useRef } from 'react';
const EditorMonaco = ({ code, setCode, language }) => {
  const editorRef = useRef(null);
  const vimStatusRef = useRef(null);
  const monacoEditor = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;
    const editor = monaco.editor.create(editorRef.current, {
      value: code,
      language,
      theme: "vs-dark",
      automaticLayout: true,
      fontSize: 15,
      minimap: { enabled: false },
    });
    monacoEditor.current = editor;

    import("monaco-vim").then(({ initVimMode }) => {

      const vim = initVimMode(editor, vimStatusRef.current || undefined);
      console.log('Vim mode loaded',vim);
    })

    const subscription = editor.onDidChangeModelContent(() => {
      setCode(editor.getValue())
    });

    return () => {
      subscription.dispose();
      vim.dispose();
      editor.dispose();
    };

  }, []);

  useEffect(() => {
    const editor = monacoEditor.current;
    if (editor && editor.getValue() !== code) {
      editor.setValue(code);
    }
  }, [code])

  useEffect(() => {
    const editor = monacoEditor.current;
    if (editor) monaco.editor.setModelLanguage(editor.getModel(), language)
  }, [language])




  return (

    <div className="flex flex-col h-full">
      <div ref={editorRef} className="flex-1 border rounded" />
      <div ref={vimStatusRef} className='text-sm text-gray-400 mt-1 p-1 bg-gray-800 rounded' />
    </div>
    // <div className="h-full w-full">
    //   <monacoEditor
    //     width="100%"
    //     height="50rem"
    //     language={language}
    //     theme='vs-dark'
    //     value={code}
    //     onChange={setCode}
    //     options={{
    //       automaticLayout: true,
    //       fontSize: 16,
    //     }}
    //   />
    // </div>
  )
}

export default EditorMonaco