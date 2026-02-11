
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

import { createWindowSlice, type WindowSlice } from "./window"

export type GlobalState = WindowSlice 

export const useGlobalStore = create<GlobalState>()(
  immer((...a) => ({
    ...createWindowSlice(...a)
  }))
)
