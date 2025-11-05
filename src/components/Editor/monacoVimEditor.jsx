import { getMonaco } from '../../utils/monacoLoader.js'
import { useEffect, useRef } from 'react';

const MonacoVimEditor= ({ code, setCode, language }) => {
  const editorRef = useRef(null);
  const StatusRef = useRef(null);
  const monacoEditor = useRef(null);

  useEffect(() => {
  async function initEditor(params) {
   await getMonaco();

    const editor = window.monaco.editor.create(editorRef.current, {
      value: code,
      language,
      theme: "vs-dark",
      automaticLayout: true,
      fontSize: 15,
      minimap: { enabled: false },
    });
    monacoEditor.current = editor;

    // import("vim-monaco").then(({ initVimMode }) => {
    //
    //   const vim = initVimMode(editor, vimStatusRef.current || undefined);
    //   console.log('Vim mode loaded',vim);
    // })

    // const subscription = editor.onDidChangeModelContent(() => {
    //   setCode(editor.getValue())
    // });
    const statusbar = window.vim.makeDomStatusBar(StatusRef.current, ()=> editor.focus());

    const vimMode = new window.vim.VimMode(editor,statusbar);
    statusbar.toggleVisibility(true);
    vimMode.enable();
  
    editor.onDidChangeModelContent(()=> {
      const newValue = editor.getValue();
      setCode(newValue);
    })

    return () => {
      editor.dispose();
      vimMode.disable();
    };
    
  }
    initEditor()

  }, []);

  // useEffect(() => {
  //   const editor = monacoEditor.current;
  //   if (editor && editor.getValue() !== code) {
  //     editor.setValue(code);
  //   }
  // }, [code])
  //
  // useEffect(() => {
  //   const editor = monacoEditor.current;
  //   if (editor) monaco.editor.setModelLanguage(editor.getModel(), language)
  // }, [language])
  //

  useEffect(() => {
    if(monacoEditor.current && code !== monacoEditor.current.getValue()){
      monacoEditor.current.setValue(code);
    }

  }, [code]);
  


  return (

    <div className="flex flex-col h-full">
      <div ref={editorRef} className="flex-1 min-h-[500px]" />
      <div ref={StatusRef} className="bg-gray-800 text-white text-sm px-2 py-1 font-mono" />
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

export default MonacoVimEditor
