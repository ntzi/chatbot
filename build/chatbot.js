"use strict";
var fs = require('fs');
var Conversation = /** @class */ (function () {
    function Conversation(json_path) {
        var _this = this;
        this.should_go_to_start_state = function (userAnswer) {
            // There are 3 reasons to go to the start state:
            // 1: Empty input string
            // 2: Last state was an ending state
            // 3: The class is just initialized
            if (userAnswer == '' || _this.last_state.substring(_this.last_state.length - 3) == 'End' || _this.last_state == '') {
                // Save the state of the conversation.
                _this.last_state = _this.start_state;
                return true;
            }
            return false;
        };
        this.should_go_to_next_state = function (userAnswer) {
            // Input string is one of the given answer options
            // // Find the answers of the current state in the troubleshooting file.
            var state_data = _this.json_file.filter(function (item) { return item.id === _this.last_state; })[0];
            var matching_answer = state_data.answerOptions.filter(function (item) { return item.answer === userAnswer; })[0];
            // Check if there is a match with the input answer.
            if (!matching_answer) {
                return false;
            }
            _this.next_state = matching_answer.nextState;
            // Save the state of the conversation.
            _this.last_state = _this.next_state;
            return true;
        };
        this.reply = function (userAnswer) {
            // Finds and returns the next state. Eg: conv.reply('') = 'start'
            //
            // There are 3 cases.
            // 1: Begin from start state
            // 2: Move to the next state
            // 3: Repeat the last state
            if (_this.should_go_to_start_state(userAnswer)) {
                return _this.start_state;
            }
            else if (_this.should_go_to_next_state(userAnswer)) {
                return _this.next_state;
            }
            else {
                // Wrong input answer option --> repeat the last state
                return _this.last_state;
            }
        };
        var rawdata = fs.readFileSync(json_path);
        this.json_file = JSON.parse(rawdata);
        this.start_state = 'start';
        this.last_state = '';
        this.next_state = '';
    }
    return Conversation;
}());
module.exports = Conversation;
