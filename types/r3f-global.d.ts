import { ThreeElements } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

// ✅ Diagnostic check: if this line fails, TS is *not* loading this file
type TestR3FMesh = JSX.IntrinsicElements["mesh"];

export {}; // 👈 Ensures file is treated as a module
