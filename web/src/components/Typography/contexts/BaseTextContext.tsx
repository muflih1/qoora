import { createContext, useContext, useMemo } from "react";

const BaseTextConrext = createContext<{nested: boolean} | null>(null)

export function BaseTextContextProvider({children, nested}: {children: React.ReactNode; nested: boolean}) {
  const contextValue = useMemo(() => ({
    nested
  }), [nested])

  return <BaseTextConrext.Provider value={contextValue}>{children}</BaseTextConrext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBaseTextContext() {
  return useContext(BaseTextConrext)
}