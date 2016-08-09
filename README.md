# QuarterNote

This will be a messenger application, where users send each other musical messages that 'sing' a song based on the length of the message.

#### Features:
* User authentication
* Profiles featuring favorite messages
* Friend list/search
* Messaging
 - Restricted to between friends
 - Can send to one friend or multiples
 - User types a short message (30 characters or less) and picks a message theme
 - User previews message which has a song/animation created based on the syllable count of the message
 - Users can receive, save, display and delete messages

#### Reach Goals:
* Messages can be an overlay on top of an image or video
* Emoji support
* Utilizing web-based sound manipulation packages to avoid importing hard-written sound files
* Advanced syllable algorithm to avoid awkward melody pairings
* Exclusive message themes based on location, timing, or other arbitrary qualifiers

#### API/External Support
* baas.kinvey for user data
* web-hosting for utilizing sound files quickly

#### Models
* Session
```js
{ id: 20397020367220,
  name: "admin",
  password: "",
  authtoken: "3Dvw90B" }
```
* Message
```js
{ sender: "user1",
  receiver: "user2",
  content: "some message",
  theme: "zarathustra",
  viewed: false,
  saved: false,
  timestamp: "Tue Aug 09 2016 18:23:23 GMT-0500 (CDT)" }
```
* Friend
```js
{ id: 23593805029353,
  name: "buzzer",
  shared_messages: 6
```

#### Collections
* Sent Messages   {model: "Message"}
* New Messages    {model: "Message"}
* Saved Messages  {model: "Message"}
* Friends         {model: "Friend"}
* Recipients      {model: "Friend"}

#### Routes
* Navigation
 - Log-in/ Log-out button
 - Shows alerts for new messages
 - Links to profile page
 - Button for sending a new message
* Main page
 - Prompts user to sign up if not a member
 - Shows featured messages
 - Has an explanatory splash for how messaging works
* Profile page
 - Shows user data
 - Shows friends list
* Message page
 - Field for message
 - Field for recipient
 - Field for theme type
* Confirmation page
 - Shows how message will render
 - Button to cancel/edit message
 
#### Other Stuff
* Sound files will be created by me and compressed using Ableton 9/Komplete 9/miscellaneous audio software
* Animations will be rendered client-side using CSS
* Theme of website will imply that messages are intended to be sarcastic
* Idea/execution may be purchased by Snapchat/Facebook for no less than forty million American dollars
