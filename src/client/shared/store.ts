import { useMemo } from 'react';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

let store;

const initialState = {
  hospitalName: '',
  filters: {
    locations: [],
    types: [],
    skills: [],
    titles: [],
    companies: [],
    perks: [],
    experience: [],
    page: 1,
    limit: 10,
    filterApplied: false,
    query: '',
    includeProfileSkills: true,
  },
  sortBy: 'datePosted',
  sortOrder: 'desc',
  jobTitle: '',
  jobs: [],
  filtersWithCount: [],
  clearAllFilters: true,
  isSubscribePopupOpen: false,
  isSharePopupOpen: false,
  loadJobs: false,
  totalJobs: 0,
  isStickySearchbar: false,
  snackbar: {
    open: false,
    message: '',
    error: false,
  },
  screen: '',
  isUserLoggedin: false,
  profilePic: '',
  loginEmail: '',
  openJobContentDrawer: false,
  sideScroll: {
    scroll: false,
    direction: 'right',
    step: 0,
    showLeftArrow: false,
    showRightArrow: true,
  },
  showForceSignupAlert: false,
  user: {},
  stats: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_HOSPITAL_NAME':
      return { ...state, hospitalName: action.payload };
    default:
      return state;
  }
};

function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware()),
  );
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
