import MonacoEditor from '@monaco-editor/react';
const Editor = ({ code, setCode, language }) => {

  return (
    <div className="h-full w-full">
      <MonacoEditor
        width={"100%"}
        height={"100%"}
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

export default Editor