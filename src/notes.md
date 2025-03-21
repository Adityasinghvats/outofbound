we always mutate the new state , not the new state , this is made easier by Immer middleware.
we use persistent lib stores all the states in the localstorage.
Steps
- imports
- interface definition
- zustand store
  - immer & persist setup
- store state and methods
- Rehydration