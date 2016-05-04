"use strict";

export function base64ToBlob(base64) {
  const [input, mimeType, base64Data] = base64.match(/^data:(.+?);base64,(.+)$/);
  const data = window.atob(base64Data);
  const buffer = new ArrayBuffer(data.length);
  const array = new Uint8Array(buffer);

  for (let i = 0; i < data.length; i++) {
    array[i] = data.charCodeAt(i);
  }

  return new Blob([array], {type: mimeType});
}

export function imageToBlob(imageElement) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      resolve(base64ToBlob(canvas.toDataURL()));
    };

    img.onerror = (e) => {
      reject(e);
    };

    img.src = imageElement.src;
  });
}
