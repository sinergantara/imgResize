## Resize image before upload

By processing the image resizing on the client browser, the server’s tasks and load are reduced.

**example**

```
resizeImage(file).then((res) => {
    img.src = res.url;
    label.innerText = "Resized file size = " + res.size.toLocaleString('en-US') + " bytes";
    resizedImage = res.file();
});
```
