var inlineScript = document.createElement("script");
inlineScript.innerHTML +=
`
window.Notification = function(title, options) {
  let xhr = new XMLHttpRequest();
  /************************************************/
  xhr.responseType = "blob",
  xhr.onload = () =>
  {
    let reader = new FileReader();
    /************************************************/
    reader.onloadend = () =>
    {
      self.chrome.runtime.sendMessage(config.application.app_id,
      {
        command: "notification",
        data:
        {
          caption: title,
          id: options.tag,
          text: options.body,
          image: (xhr.status == 200) ? reader.result : undefined
        }
      });
    };
    /************************************************/
    reader.readAsDataURL(xhr.response);
  };
  /************************************************/
  xhr.open("GET", options.icon),
  xhr.send();
}

Object.defineProperty(Notification, 'permission',
{
  get()
  {
    return 'granted';
  }
});

Notification.requestPermission = function(callback)
{
  typeof(callback) == 'function' && callback();
  return Promise.resolve(Notification.permission);
};
`;
document.documentElement.append(inlineScript);
