import MonacoEditor from '@monaco-editor/react';
const EditorMonaco = ({ code, setCode, language }) => {

  return (
    <div className="h-full w-full">
      <MonacoEditor
        width="100%"
        height="50rem"
        language={language}
        theme='vs-dark'
        value={code}
        onChange={setCode}
        options={{
          automaticLayout: true,
          fontSize: 16,
        }}
      />
    </div>
  )
}

export default EditorMonaco