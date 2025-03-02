// import { Component, ErrorInfo, ReactNode } from 'react';

// type Props = {
//   children: React.ReactNode;
// };

// interface State {
//   hasError: boolean;
//   error: Error | null;
// }

// export default class ErrorBoundary extends Component<Props, State> {
//   constructor(props: Props) {
//     super(props);
//     this.state = {
//       hasError: false,
//       error: null,
//     };
//   }

//   static getDerivedStateFromError(error: Error): State {
//     return { hasError: true, error };
//   }

//   componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
//     console.error('Error in component:', error, errorInfo);
//   }

//   render(): ReactNode {
//     const { hasError, error } = this.state;
//     if (hasError) {
//       return (
//         <div>
//           <h2>Somthing went wrong.</h2>
//           <p>{error.message || 'An unkown error occured.'}</p>
//         </div>
//       );
//     }
//   }
// }
