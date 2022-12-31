const webpush = require("web-push");

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails(
  "mailto:nk17oct@gmail.com",
  publicVapidKey,
  privateVapidKey
);

module.exports = function(subscribers) {
    console.log("ok")
    const payload = JSON.stringify({ title: "New Assignment!", body: "Check assignment" });

    subscribers.forEach((sub)=>{
        webpush
        .sendNotification(sub, payload)
        .catch(err => console.error(err));
    })
}