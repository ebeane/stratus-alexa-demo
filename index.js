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
//var APP_ID = amzn1.echo-sdk-ams.app.02dfa27b-5eef-4858-9efd-eaade5795448;
var APP_ID = undefined;

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
    var speechOutput = "Hello, thank you for launching the Stratus Solutions Security Guard. I can help secure Amazon EC2 instances by applying a Security Group. How may I be of assistance today?";
    var repromptText = "Thank you for launching Security Guard";
    response.ask(speechOutput, repromptText);
};

SecurityGuard.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("SecurityGuard onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

SecurityGuard.prototype.intentHandlers = {
    // register custom intent handlers
    "SecurityGuardDrillIntent": function (intent, session, response) {
        response.tellWithCard("This is just a drill. If this were an actual emergency, you could ask me to apply an EC2 Security Group to project your EC2 instances from the bad guys.", "Security Guard", "Security Drill");
    },
    "QueryAlertIntent": function (intent, session, response) {
        response.ask("Alert! Incoming SSH brute force attack!", "Alert! Incoming SSH brute force attack!");
    },
    "DeployCountermeasuresIntent": function (intent, session, response) {
        response.ask("Applying security counter measures now.", "Applying security counter measures now.");
    },
    "HelpIntent": function (intent, session, response) {
        response.ask("If you're having trouble, please see the documentation for this Skill for a list of things that you can say to me. If you require more direct assistance, please say, I need professional services", "If you're having trouble, please see the documentation for this Skill for a list of things that you can say to me. If you require more direct assistance, please say, I need professional services");
    },
    "ProServIntent": function (intent, session, response) {
        response.ask("If you require assistance automating your AWS environment, Stratus engineers are available to provide expertise for a wide range of cloud services and technologies. Please contact Stratus Solutions for more details.", "If you require assistance automating your AWS environment, Stratus engineers are available to provide expertise for a wide range of cloud services and technologies. Please contact Stratus Solutions for more details.");
    },
    "ThankYoutIntent": function (intent, session, response) {
        response.ask("You are quite welcome. Have a great day everyone and thank you for attending our demo.", "You are quite welcome. Have a great day everyone and thank you for attending our demo.");
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SecurityGuard skill.
    var securityGuard = new SecurityGuard();
    securityGuard.execute(event, context);
};
