const fs = require('fs');


class Conversation {
    // Class Conversation manages the state of a troubleshooting chat bot.
    // The conversation structure is loaded through a .json file (eg: throubleshooting.json).
    // For a given input answer it returns the id of the next state.
    // 
    // Example usage:
    // let conv = new Conversation('./troubleshooting.json');
    // conv.reply('');  // Returns start state
    // conv.reply('My phone doesn\'t work');  // Returns phoneModel state
    // conv.reply('Samsung Galaxy S10');  // Returns samsungServiceEnd state


    constructor(json_path){
        let rawdata = fs.readFileSync(json_path)
        this.json_file = JSON.parse(rawdata)
        this.state = ''
    }

    reply(userAnswer){
        // Finds and returns the next state. Eg: conv.reply('') = 'start'
        //
        // There are 5 cases.
        // 1: Empty input string --> begin from start state
        // 2: Last state was an ending state --> begin from start state
        // 3: The class is just initialized --> begin from start state
        // 4: Wrong input string --> repeat the last state.
        // 5: Input string is one of the given answer options --> move to the next state

        let next_state = ''
        if (userAnswer == '' || this.state.substring(this.state.length - 3) == 'End' || this.state == ''){
            // Begin from start state ('id': 'start')
            next_state = 'start'
        } else {
            // Find the answers of the current state in the troubleshooting file and check if there is a
            // match with the input answer.
            let state_data = this.json_file.find(item => item.id === this.state)
            for (let i=0; i<state_data.answerOptions.length; i++){
                if (state_data.answerOptions[i].answer == userAnswer){
                    next_state = state_data.answerOptions[i].nextState
                }
            }
            if (next_state == ''){
                // If the input answer does not match any answer of the current state, the user entered
                // a wrong answer, so the next state will be the same as the current one.
                next_state = this.state
            }
        }
        // Save the state of the conversation.
        this.state = next_state
        return this.state
    }
}


module.exports = Conversation;
