import { createContext, useContext } from 'react';

export type Viewer = {
  id: string;
  given_name: string;
  family_name?: string | null;
  picture_url: string;
};

const ViewerContext = createContext<Viewer | null>(null);

export default function ViewerProvider({
  children,
  viewer,
}: {
  children: React.ReactNode;
  viewer: Viewer | null;
}) {
  return (
    <ViewerContext.Provider value={viewer}>{children}</ViewerContext.Provider>
  );
}

export function useViewer() {
  return useContext(ViewerContext)
}