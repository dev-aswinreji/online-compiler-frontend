export async function getMonaco(params) {
 if(!window.monaco) {
   const monaco = await import("@monaco-editor/react");
   window.monaco = monaco;
 }

  if(!window.vim){
    const vim = await import("vim-monaco");
    window.vim = vim;
  }
}
