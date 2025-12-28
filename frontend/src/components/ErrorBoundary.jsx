import React from 'react';
import { Button } from './ui/Button';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center bg-red-50 rounded-xl border border-red-100 m-4">
                    <h2 className="text-2xl font-bold text-red-700 mb-2">Something went wrong</h2>
                    <p className="text-slate-600 mb-6">
                        We encountered an unexpected error while rendering this component.
                    </p>
                    <div className="text-left w-full max-w-lg bg-white p-4 rounded-lg border border-red-200 overflow-auto text-xs font-mono text-red-800 mb-6">
                        {this.state.error?.toString()}
                    </div>
                    <Button
                        onClick={() => {
                            this.setState({ hasError: false });
                            window.location.reload();
                        }}
                        variant="destructive"
                    >
                        Reload Page
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
