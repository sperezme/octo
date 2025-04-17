import React from "react";

  export class ErrorBoundary extends React.Component<{ children: React.ReactNode }> {
    state = { hasError: false };

    static getDerivedStateFromError() {
      return { hasError: true };
    }

    render() {
      if (this.state.hasError) {
        return <h2>Something went wrong.</h2>;
      }

      return this.props.children;
    }
  }