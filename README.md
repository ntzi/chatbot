# Chatbot

#### Simple troubleshooting chat bot.

A single class implementing state management for a troubleshooting chat bot.

A basic operating principle is that the chat bot starts the conversation by asking a question about the user's problem and presents pre-defined options for the user to choose from. When the user chooses one of the presented options, the chat bot asks a new question with new options to find out more about the visitors problem.

## Deploy
### Prerequisites
 - Node.js

### Steps
  - Clone master branch

         $ git clone https://github.com/ntzi/chatbot.git

  - Install [NodeJS and npm](https://nodejs.org/en/)
  - Install  dependencies

         $ cd chatbot/
         $ npm install


## Usage

Class Conversation manages the state of a troubleshooting chat bot.\
The conversation structure is loaded through a .json file (eg: throubleshooting.json).\
For a given input answer it returns the id of the next state.

### Example Usage


    let conv = new Conversation('./troubleshooting.json');
    conv.reply('');  // Returns start state
    conv.reply('My phone doesn\'t work');  // Returns phoneModel state
    conv.reply('Samsung Galaxy S10');  // Returns samsungServiceEnd state



## Test

### Prerequisites

* mocha
* chai
* faker


### Run tests

    npm test



## Authors

* **Nikos Tziralis** - *Initial work* - [Chatbot](https://github.com/ntzi/chatbot)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
