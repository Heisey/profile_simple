
import type { FeatureWindowConfg, FeatureWindowKey, FeatureWindows } from "types";
import type { StateCreator } from "zustand"

const INITIAL_Z_INDEX = 1000;

const makeDefault = (): FeatureWindowConfg => ({
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
})

const defaultWindowConfig: FeatureWindows = {
    appStore: makeDefault(),
    books: makeDefault(),
    contact: makeDefault(),
    files: makeDefault(),
    finder: makeDefault(),
    imgfile: makeDefault(),
    pdfReader: makeDefault(),
    photos: makeDefault(),
    resume: makeDefault(),
    safari: makeDefault(),
    settings: makeDefault(),
    stocks: makeDefault(),
    terminal: makeDefault(),
    txtfile: makeDefault(),
};

interface WindowState {
    featureWindows: FeatureWindows
    nextZInex: number
    launchPadOpen: boolean
}

interface WindowActions {
    openWindow: (window: FeatureWindowKey, data: any) => void
    closeWindow: (window: FeatureWindowKey) => void
    focusWindow: (window: FeatureWindowKey) => void
    openLaunchPad: () => void
    closeLauncPad: () => void
}

export interface WindowSlice extends WindowActions, WindowState { }

export const createWindowSlice: StateCreator<
    WindowSlice,
    [["zustand/immer", never]],
    [],
    WindowSlice
> = (set) => ({
    featureWindows: defaultWindowConfig,
    nextZInex: INITIAL_Z_INDEX + 1,
    launchPadOpen: false,

    openWindow: (window, data) => {
        set(state => {
            const cur = state.featureWindows[window]
            cur.isOpen = true
            cur.zIndex = state.nextZInex
            cur.data = data ?? cur.data
            state.nextZInex++
        })
    },

    closeWindow: (window) => {
        set(state => {
            const cur = state.featureWindows[window]
            cur.isOpen = false
            cur.zIndex = INITIAL_Z_INDEX
            cur.data = null
        })

    },

    focusWindow: (window) => {
        set(state => {
            const cur = state.featureWindows[window]
            cur.zIndex = state.nextZInex
            state.nextZInex++
        })
    },

    openLaunchPad: () => set(state => {
        state.launchPadOpen = true
    }),

    closeLauncPad: () => set(state => {
        state.launchPadOpen = false
    })
})
