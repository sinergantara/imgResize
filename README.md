## Resize image before upload

**example**

```
resizeImage(file).then((res) => {
    img.src = res.url;
    label.innerText = "Resized file size = " + res.size.toLocaleString('en-US') + " bytes";
    resizedImage = res.file();
});
```