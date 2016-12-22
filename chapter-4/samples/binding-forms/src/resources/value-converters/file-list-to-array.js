export class FileListToArrayValueConverter {  
  toView(fileList) {
    if (!fileList) {
      return [];
    }
    return Array.from(fileList);
  }
}
