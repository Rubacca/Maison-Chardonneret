// Type declarations for Recranet custom elements
declare namespace JSX {
  interface IntrinsicElements {
    'recranet-accommodations': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        class?: string;
      },
      HTMLElement
    >;
    'recranet-search-bar': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        class?: string;
      },
      HTMLElement
    >;
  }
}
