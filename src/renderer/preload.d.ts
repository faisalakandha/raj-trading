declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        DbChange(callback: (_event: any, value: any) => void): void;
        GetAuthToken(query: string): void;
        OpenAuthWindow(msg: string): void;
        myPing(): void;
        on(
          channel: string,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
      };
    };
  }
}

export {};
