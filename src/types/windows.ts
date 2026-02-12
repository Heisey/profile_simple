export interface FeatureWindowConfg {
    isOpen: boolean,
    zIndex: number,
    data: any
}

export interface FeatureWindows {
    finder: FeatureWindowConfg
    contact: FeatureWindowConfg
    resume: FeatureWindowConfg
    safari: FeatureWindowConfg
    photos: FeatureWindowConfg
    terminal: FeatureWindowConfg
    txtfile: FeatureWindowConfg
    imgfile: FeatureWindowConfg
    pdfReader: FeatureWindowConfg
    appStore: FeatureWindowConfg
    settings: FeatureWindowConfg
}

export type FeatureWindowKey = keyof FeatureWindows

export interface DockApp {
    id: FeatureWindowKey
    name: string
    icon: string
    canOpen: boolean
}