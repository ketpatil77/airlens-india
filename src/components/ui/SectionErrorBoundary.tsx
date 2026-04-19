import { Component, type ErrorInfo, type ReactNode } from "react";
import { GlassCard } from "./GlassCard";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children?: ReactNode;
  sectionName?: string;
}

interface State {
  hasError: boolean;
}

/**
 * U19 — Section Error Boundary
 * Prevents a single section failure (map, chart) from crashing the entire app.
 * Provides a graceful fallback with a retry mechanism.
 */
export class SectionErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Error in section ${this.props.sectionName}:`, error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto w-[min(1520px,100%-2rem)] py-12">
          <GlassCard intensity="medium" className="p-12 flex flex-col items-center text-center border-critical/20">
            <div className="h-16 w-16 rounded-full bg-critical/10 flex items-center justify-center text-critical mb-6">
              <AlertTriangle size={32} />
            </div>
            <h3 className="font-display text-2xl font-bold text-ivory">Section Unavailable</h3>
            <p className="mt-2 text-muted max-w-md">
              We encountered an issue rendering the <span className="text-ivory font-bold">{this.props.sectionName || "requested"}</span> section. This could be due to a data service interruption or a local rendering error.
            </p>
            <button
              onClick={this.handleRetry}
              className="mt-8 flex items-center gap-2 px-6 py-3 bg-surface2 rounded-xl border border-hazard/20 text-ivory hover:bg-surface2/80 transition-colors font-mono text-xs font-bold uppercase tracking-widest"
            >
              <RefreshCw size={14} />
              Attempt Reload
            </button>
          </GlassCard>
        </div>
      );
    }

    return this.props.children;
  }
}
