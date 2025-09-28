import '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any; // allow all Three.js JSX primitives
    }
  }
}
