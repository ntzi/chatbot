const fs = require('fs');


class Conversation {
    // Class Conversation manages the state of a troubleshooting chat bot.
    // The conversation structure is loaded through a .json file (eg: throubleshooting.json).
    //
    // Example usage:
    // let conv = new Conversation('./troubleshooting.json');
    // conv.reply('');  // Returns start state
    // conv.reply('My phone doesn\'t work');  // Returns phoneModel state
    // conv.reply('Samsung Galaxy S10');  // Returns samsungServiceEnd state


    constructor(json_path, test_mode=false){
        let rawdata = fs.readFileSync(json_path);
        this.json_file = JSON.parse(rawdata);
        this.test_mode = test_mode
        this.state = ''
        this.results = ''
    }

    get_next_state(userAnswer){
        // Find the next state.
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
                this.results = 'Wrong answer option. Please try again.\n'
            }
        }
        return next_state
    }

    get_question_and_answers(next_state) {
        // Find the question and the answer options to return to the users.


        let state_data = this.json_file.find(item => item.id === next_state)
        if (state_data == null){
            return ''
        } else {
            var result = state_data.question
            if (state_data.answerOptions){
                // If the next state is not an ending state, therefore there are answer options to return.
                for (let i=0; i<state_data.answerOptions.length; i++){
                    result = result + '\n' + (i+1) + ') '+ state_data.answerOptions[i].answer
                }
                return result
            } else {
                return result
            }
        }
    }

    reply(userAnswer){
        // Return the next question and its answer options of the given user answer.
        // On Test mode returns only the next state. Eg: conv.reply('') = 'start'

        this.results = ''
        let next_state = this.get_next_state(userAnswer)
        this.results = this.results + this.get_question_and_answers(next_state)
        this.state = next_state

        if (this.test_mode) {
            // Return only the next state. Eg: conv.reply('') = 'start'
            return this.state
        } else {
            // Return the question and the answer options for the user.
            return this.results
        }
    }
}

module.exports = Conversation;



// let conv = new Conversation('./src/troubleshooting.json', test_mode=false);
// res = conv.reply('');  // Returns start state
// console.log(res)
// res = conv.reply('My phone doesn\'t work');  // Returns phoneModel state
// console.log(res)
// res = conv.reply('My phone doesn\'t work');  // Returns phoneModel state
// console.log(res)
// res = conv.reply('My phone doesn\'t work');  // Returns phoneModel state
// console.log(res)
// res = conv.reply('Samsung Galaxy S10');  // Returns samsungServiceEnd state
// console.log(res)
// res = conv.reply('Samsung Galaxy S10');  // Returns samsungServiceEnd state
// console.log(res)
// res = conv.reply('Samsung Galaxy S10');  // Returns samsungServiceEnd state
// console.log(res)
