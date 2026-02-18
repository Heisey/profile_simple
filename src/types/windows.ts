export interface FeatureWindowConfg {
    isOpen: boolean,
    zIndex: number,
    data: any
}

export interface FeatureWindows {
    appStore: FeatureWindowConfg
    books: FeatureWindowConfg
    contact: FeatureWindowConfg
    files: FeatureWindowConfg
    finder: FeatureWindowConfg
    imgfile: FeatureWindowConfg
    pdfReader: FeatureWindowConfg
    photos: FeatureWindowConfg
    resume: FeatureWindowConfg
    safari: FeatureWindowConfg
    settings: FeatureWindowConfg
    stocks: FeatureWindowConfg
    terminal: FeatureWindowConfg
    txtfile: FeatureWindowConfg
}

export type FeatureWindowKey = keyof FeatureWindows

export interface DockApp {
    id: FeatureWindowKey
    name: string
    icon: string
    canOpen: boolean
}