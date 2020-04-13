const fs = require('fs');



class Conversation {
    // Class Conversation manages the state of a troubleshooting chat bot.
    // The conversation structure is loaded through a .json file (eg: throubleshooting.json).
    // For a given input answer it returns the id of the next state.
    //
    // Example usage:
    // let conv = new Conversation('./src/troubleshooting.json');
    // conv.reply('');  // Returns start state
    // conv.reply('My phone doesn\'t work');  // Returns phoneModel state
    // conv.reply('Samsung Galaxy S10');  // Returns samsungServiceEnd state

    json_file: Array<any>
    start_state: string
    last_state: string
    next_state: string
    constructor(json_path: string){
        let rawdata: any = fs.readFileSync(json_path)
        this.json_file = JSON.parse(rawdata)
        this.start_state = 'start'
        this.last_state = ''
        this.next_state = ''
    }

    should_go_to_start_state = (userAnswer: string) : boolean => {
        // There are 3 reasons to go to the start state:
        // 1: Empty input string
        // 2: Last state was an ending state
        // 3: The class is just initialized

        if (userAnswer == '' || this.last_state.substring(this.last_state.length - 3) == 'End' || this.last_state == ''){
            // Save the state of the conversation.
            this.last_state = this.start_state
            return true
        }
        return false
    }

    should_go_to_next_state = (userAnswer: string): boolean => {
        // Input string is one of the given answer options

        // // Find the answers of the current state in the troubleshooting file.
        let state_data: any = this.json_file.filter(item => item.id === this.last_state)[0]
        let matching_answer: any = state_data.answerOptions.filter(item => item.answer === userAnswer)[0]
        // Check if there is a match with the input answer.
        if (!matching_answer){
            return false
        }
        this.next_state = matching_answer.nextState
        // Save the state of the conversation.
        this.last_state = this.next_state
        return true
    }

    reply = (userAnswer: string): string => {
        // Finds and returns the next state. Eg: conv.reply('') = 'start'
        //
        // There are 3 cases.
        // 1: Begin from start state
        // 2: Move to the next state
        // 3: Repeat the last state

        if (this.should_go_to_start_state(userAnswer)){
            return this.start_state
        } else if (this.should_go_to_next_state(userAnswer)){
            return this.next_state
        } else {
            // Wrong input answer option --> repeat the last state
            return this.last_state
        }
    }
}


module.exports = Conversation;
