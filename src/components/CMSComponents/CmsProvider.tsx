import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";

type CmsContextState = Record<string, unknown>;

const CmsContext = createContext<CmsContextState>({});
const CmsDispatchContext = createContext<React.Dispatch<ActionsWithId>>(
  () => null
);

export function useCmsContent<T>(id: string) {
  const dispatch = useContext(CmsDispatchContext);
  const dispatchWithId: React.Dispatch<Actions<T | undefined>> = useCallback(
    (action) => {
      dispatch({ ...action, id });
    },
    [dispatch, id]
  );

  return [useContext(CmsContext)[id] as T | undefined, dispatchWithId] as const;
}

interface SetAction<T> {
  type: "set";
  state: T;
}

type Actions<T = unknown> = SetAction<T>;
type ActionsWithId = Actions & { id: string };

const cmsReducer = (cms: CmsContextState, action: ActionsWithId) => {
  switch (action.type) {
    case "set":
      return { ...cms, [action.id]: action.state };
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export const CmsProvider = ({ children }: { children: React.ReactNode }) => {
  const [cms, dispatch] = useReducer(cmsReducer, {});

  return (
    <CmsContext.Provider value={cms}>
      <CmsDispatchContext.Provider value={dispatch}>
        {children}
      </CmsDispatchContext.Provider>
    </CmsContext.Provider>
  );
};
