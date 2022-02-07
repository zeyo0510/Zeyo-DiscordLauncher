var inlineScript = document.createElement("script");
inlineScript.innerHTML +=
`
Storage.prototype._setItem = Storage.prototype.setItem;
Storage.prototype.setItem = function(key, value)
{
  self.chrome.runtime.sendMessage(config.application.app_id,
  {
    command: 'storage',
    data:
    {
      key: key,
      value: value
    }
  }),
  this._setItem.apply(this, arguments);
}
`;
document.documentElement.append(inlineScript);
