// TODO: background script
chrome.runtime.onInstalled.addListener(() => {
  // TODO: on installed function
  console.log("onInstalled...");

  chrome.storage.sync.set({
    companyName: "",
    emailAddress: "",
    phoneNumber: "",
    website: "",
    visable: true,
    country: "For Example:Egypt ",
  });

  chrome.contextMenus.create({
    id: "0",
    title: "easySales",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    id: "1",
    title: "Set Company Name 🏦",
    contexts: ["selection"],
    parentId: "0",
  });

  chrome.contextMenus.create({
    id: "4",
    title: "Set Website 🌍",
    contexts: ["selection"],
    parentId: "0",
  });

  chrome.contextMenus.create({
    id: "3",
    title: "Set Phone Number 📞",
    contexts: ["selection"],
    parentId: "0",
  });

  chrome.contextMenus.create({
    id: "2",
    title: "Set Email Address 📧",
    contexts: ["selection"],
    parentId: "0",
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log(info);

  switch (info.menuItemId) {
    case "1":
      chrome.storage.sync.set({ companyName: info.selectionText }, () => {

      });
      break;
    case "2":
      chrome.storage.sync.set({ emailAddress: info.selectionText }, () => {
      });
      break;

    case "3":
      chrome.storage.sync.set({ phoneNumber: info.selectionText }, () => {
      });
      break;

    case "4":
      chrome.storage.sync.set({ website: info.selectionText }, () => {
      });

      break;
    default:
      "nothing";
  }
});
