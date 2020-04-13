import { expect } from 'chai';
const faker = require("faker");
const Conversation = require("../src/chatbot");


describe("Conversation", () => {
    // Test the class Conversation for different input answers.

    const stubValue = {
        words: faker.random.words(2),
    };

    describe("reply", () => {
        context('with empty string', () => {
            it("should return the state: start", () => {
                const conv = new Conversation('./src/troubleshooting.json');
                const reply = conv.reply('');
                expect(reply).to.equal('start');
            });
        });
        context('with empty string not as the first answer', () => {
            it("should return the state: start", () => {
                const conv = new Conversation('./src/troubleshooting.json');
                conv.reply('My phone doesn\'t work');
                const reply = conv.reply('');
                expect(reply).to.equal('start');
            });
        });
        context('with empty input (not string)', () => {
            it("should return the state: 'start'", () => {
                const conv = new Conversation('./src/troubleshooting.json');
                const reply = conv.reply();
                expect(reply).to.equal('start');
            });
        });
        context('with empty input (not string) not as the first answer', () => {
            it("should return the state: 'start'", () => {
                const conv = new Conversation('./src/troubleshooting.json');
                conv.reply('My internet doesn\'t work');
                const reply = conv.reply();
                expect(reply).to.equal('start');
            });
        });
        context('with 3 correct replies', () => {
            it("should return the state: samsungServiceEnd", () => {
                const conv = new Conversation('./src/troubleshooting.json');
                conv.reply('');
                conv.reply('My phone doesn\'t work');
                const reply = conv.reply('Samsung Galaxy S10');
                expect(reply).to.equal('samsungServiceEnd');
            });
        });
        context('with 4 correct replies', () => {
            it("should return the state: contactSupportEnd", () => {
                const conv = new Conversation('./src/troubleshooting.json');
                conv.reply('');
                conv.reply('My internet doesn\'t work');
                conv.reply('Yes');
                const reply = conv.reply('Yes');
                expect(reply).to.equal('contactSupportEnd');
            });
        });
        context('with choosing wrong answer option', () => {
            it("should return the state: routerReset", () => {
                const conv = new Conversation('./src/troubleshooting.json');
                conv.reply('');
                conv.reply('My internet doesn\'t work');
                const reply = conv.reply(stubValue.words);
                expect(reply).to.equal('routerReset');
            });
        });
        context('after reaching an end state', () => {
            it("should return the state: start", () => {
                const conv = new Conversation('./src/troubleshooting.json');
                conv.reply('');
                conv.reply('My internet doesn\'t work');
                conv.reply('No');
                const reply = conv.reply(stubValue.words);
                expect(reply).to.equal('start');
            });
        });
    })
});
