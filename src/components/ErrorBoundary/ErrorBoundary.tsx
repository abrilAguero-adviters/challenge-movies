import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  private readonly handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-dark-primary text-white flex items-center justify-center">
          <div className="max-w-md p-8 bg-gray-900 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold mb-4">¡Oops! Algo salió mal</h2>
            <p className="text-gray-400 mb-6">
              Ha ocurrido un error inesperado en la aplicación.
            </p>
            {this.state.error && (
              <details className="mt-4">
                <summary className="text-gray-400">Detalles del error</summary>
                <pre className="mt-2 text-sm text-gray-300 bg-gray-800 p-4 rounded-lg">
                  {this.state.error.message}
                </pre>
              </details>
            )}
            <div className="mt-6">
              <button
                className="bg-white text-dark-primary px-4 py-2 rounded-md flex items-center gap-2"
                onClick={this.handleReload}>
                Recargar página
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
