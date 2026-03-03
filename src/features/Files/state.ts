
export type ViewState =
  | { view: "home" }
  | { view: "folder"; folderId: string; folderName: string }