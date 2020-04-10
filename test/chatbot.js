const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const faker = require("faker");
const Conversation = require("../src/chatbot");
describe("Conversation", function() {
    const stubValue = {
        id: faker.random.uuid(),
        words: faker.random.words(2),
        name: faker.name.findName(),
        email: faker.internet.email(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past()
    };
    describe("reply", function() {
        context('with empty string', () => {
            it("should return the state: start", function() {
                const conv = new Conversation('./src/troubleshooting.json', test_mode=true);
                const reply = conv.reply('');
                expect(reply).to.equal('start');
            });
        });
        context('with empty string not as the first answer', () => {
            it("should return the state: start", function() {
                const conv = new Conversation('./src/troubleshooting.json', test_mode=true);
                conv.reply('My phone doesn\'t work');
                const reply = conv.reply('');
                expect(reply).to.equal('start');
            });
        });
        context('with empty input (not string)', () => {
            it("should return the state: 'start'", function() {
                const conv = new Conversation('./src/troubleshooting.json', test_mode=true);
                const reply = conv.reply();
                expect(reply).to.equal('start');
            });
        });
        context('with empty input (not string) not as the first answer', () => {
            it("should return the state: 'start'", function() {
                const conv = new Conversation('./src/troubleshooting.json', test_mode=true);
                conv.reply('My internet doesn\'t work');
                const reply = conv.reply();
                expect(reply).to.equal('start');
            });
        });
        context('with 3 replies', () => {
            it("should return the state: samsungServiceEnd", function() {
                const conv = new Conversation('./src/troubleshooting.json', test_mode=true);
                conv.reply('');
                conv.reply('My phone doesn\'t work');
                const reply = conv.reply('Samsung Galaxy S10');
                expect(reply).to.equal('samsungServiceEnd');
            });
        });
        context('with 4 replies', () => {
            it("should return the state: contactSupportEnd", function() {
                const conv = new Conversation('./src/troubleshooting.json', test_mode=true);
                conv.reply('');
                conv.reply('My internet doesn\'t work');
                conv.reply('Yes');
                const reply = conv.reply('Yes');
                expect(reply).to.equal('contactSupportEnd');
            });
        });
        context('with choosing wrong answer option', () => {
            it("should return the state: routerReset", function() {
                const conv = new Conversation('./src/troubleshooting.json', test_mode=true);
                conv.reply('');
                conv.reply('My internet doesn\'t work');
                const reply = conv.reply(stubValue.words);
                expect(reply).to.equal('routerReset');
            });
        });
        context('after reaching an end state', () => {
            it("should return the state: start", function() {
                const conv = new Conversation('./src/troubleshooting.json', test_mode=true);
                conv.reply('');
                conv.reply('My internet doesn\'t work');
                conv.reply('No');
                const reply = conv.reply(stubValue.words);
                console.log(reply)
                expect(reply).to.equal('start');
            });
        });
    })
});
