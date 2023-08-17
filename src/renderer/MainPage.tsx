import { useCallback, useState } from 'react';
import './MainPage.css';

const { ipcRenderer } = window.electron;

export function MainPage() {
  const [logs, setLogs] = useState<string[]>(['item']);

  const addLogMessage = useCallback((message: string) => {
    setLogs((r) => [...r, message]);
  }, []);

  useState(() => {
    const listenerCleanUpFn = ipcRenderer.on('logging', addLogMessage);
    ipcRenderer.sendMessage('mainWindownInitialized');
    return listenerCleanUpFn;
  });

  return (
    <div className="main-page">
      <button type="button">
        <span role="img" aria-label="books">
          📚
        </span>
        Get speedcams
      </button>
      <div className="main-page__body">
        {logs.map((r) => (
          <div className="logItem"> {r} </div>
        ))}
      </div>
    </div>
  );
}
