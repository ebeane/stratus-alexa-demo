/**
 *     Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *         Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
 *
 *                 http://aws.amazon.com/apache2.0/
 *
 *                     or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 *                     */

/**
 *  * This simple sample has no external dependencies or session management, and shows the most basic
 *   * example of how to create a Lambda function for handling Alexa Skill requests.
 *    *
 *     * Examples:
 *      * One-shot model:
 *       *  User: "Alexa, tell Greeter to say hello"
 *        *  Alexa: "Hello World!"
 *         */

/**
 *  * App ID for the skill
 *   */
var APP_ID = arn:aws:lambda:us-east-1:517218816149:function:EC2-Apply-SecurityGroup;

/**
 *  * The AlexaSkill prototype and helper functions
 *   */
var AlexaSkill = require('./AlexaSkill');

/**
 *  * SecurityGuard is a child of AlexaSkill.
 *   * To read more about inheritance in JavaScript, see the link below.
 *    *
 *     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 *      */
var SecurityGuard = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
SecurityGuard.prototype = Object.create(AlexaSkill.prototype);
SecurityGuard.prototype.constructor = SecurityGuard;

SecurityGuard.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("SecurityGuard onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

SecurityGuard.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("SecurityGuard onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Welcome to the Alexa Skills Kit, you can say hello";
    var repromptText = "You can say hello";
    response.ask(speechOutput, repromptText);
};

SecurityGuard.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("SecurityGuard onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

SecurityGuard.prototype.intentHandlers = {
    // register custom intent handlers
    "SecurityGuardIntent": function (intent, session, response) {
        response.tellWithCard("Hello World!", "Greeter", "Hello World!");
    },
    "QueryAlertIntent": function (intent, session, response) {
        response.ask("You can say hello to me!", "You can say hello to me!");
    },
    "DeployCountermeasuresIntent": function (intent, session, response) {
        response.ask("You can say hello to me!", "You can say hello to me!");
    },
    "HelpIntent": function (intent, session, response) {
        response.ask("You can say hello to me!", "You can say hello to me!");
    },
    "ProServIntent": function (intent, session, response) {
        response.ask("You can say hello to me!", "You can say hello to me!");
    },
    "ThankYoutIntent": function (intent, session, response) {
        response.ask("You can say hello to me!", "You can say hello to me!");
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SecurityGuard skill.
    var securityGuard = new SecurityGuard();
    securityGuard.execute(event, context);
};
