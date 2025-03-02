let couter = 0;

function generateKey() {
  return couter++;
}

interface Page {
  key: number;
  type:
    | 'initial_page'
    | 'pushed_page'
    | 'push_page'
    | 'clear_removed_pages'
    | 'pop_page';
  component?: React.ComponentType;
  direction?: string;
  pageKey?: string | null;
  removed?: boolean;
}

interface Action {
  type: 'push_page' | 'clear_removed_pages' | 'pop_page';
  component?: React.ComponentType;
  direction?: string;
  pageKey?: string | null;
  index?: number;
}

export const initialState: Page[] = [
  {
    key: generateKey(),
    type: 'initial_page',
  },
];

export function reducer(state: Page[], action: Action): Page[] {
  const filteredPages = state.filter(
    page => page.type !== 'push_page' || !page.removed
  );

  switch (action.type) {
    case 'push_page': {
      const existingPage =
        action.pageKey != null
          ? filteredPages.find(page => page.pageKey === action.pageKey)
          : null;

      if (existingPage != null) {
        throw new Error('Tried to push page with duplicate key.');
      }

      return [
        ...filteredPages,
        {
          component: action.component,
          direction: action.direction,
          key: generateKey(),
          pageKey: action.pageKey,
          removed: false,
          type: 'pushed_page',
        },
      ];
    }
    case 'clear_removed_pages':
      return filteredPages;
    case 'pop_page': {
      const lastIndex = filteredPages.length - 1;
      const lastPage = filteredPages[lastIndex];

      if (lastPage.type === 'pushed_page') {
        let popIndex = action.index;

        if (action.pageKey != null) {
          const foundIndex = filteredPages.findIndex(
            page => page.pageKey === action.pageKey
          );
          popIndex = foundIndex > -1 ? foundIndex : popIndex;
        }

        return [
          ...filteredPages.slice(
            0,
            popIndex != null ? Math.max(popIndex + 1, 1) : -1
          ),
          { ...lastPage, removed: true },
        ];
      }

      break;
    }
  }
  return state;
}
