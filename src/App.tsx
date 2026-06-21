import { Editor } from './components/editor/Editor';
import { PreviewArea } from './components/preview/PreviewArea';
import { Sidebar } from './components/sidebar/Sidebar';
import { Statusbar } from './components/ui/Statusbar';
import { Topbar } from './components/ui/Topbar';

function App() {
  return (
    // Main application shell that pins the editor layout to the viewport.
    <div className="flex flex-col h-screen w-screen bg-bg-primary text-text-primary overflow-hidden">
      {/* Integrated topbar with mode controls and document counters. */}
      <Topbar />

      {/* Full-width editor area with a fixed share of the vertical space. */}
      <div className="h-[35%] min-height-[180px] border-b-2 border-border shrink-0">
        <Editor />
      </div>

      {/* Lower workspace that pairs the shortcut sidebar with the live preview. */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar for inserting reusable LaTeX snippets. */}
        <Sidebar />

        {/* Preview fills the remaining horizontal space. */}
        <PreviewArea />
      </div>

      {/* Statusbar keeps persistent application state visible at the bottom. */}
      <Statusbar />
    </div>
  );
}

export default App;
