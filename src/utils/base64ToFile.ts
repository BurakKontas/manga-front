const base64ToFile = (base64String: string, fileName: string): File => {
    if (!base64String.startsWith("data")) base64String = "data:image/png;base64," + base64String;
    const byteString = atob(base64String.split(',')[1]);
    const mimeString = base64String.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new File([ab], fileName, { type: mimeString });
};

export default base64ToFile;