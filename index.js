/**
 * This simple sample of creating an EC2 Security Group via the Echo platform.
 */
var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';

var APP_ID = "";

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

var demo = new AWS.EC2();

var demoParams = {
//  CidrIp: 'STRING_VALUE',
//  DryRun: true || false,
//  FromPort: 0,
//  GroupId: 'STRING_VALUE',
//  GroupName: 'STRING_VALUE',
  IpPermissions: [
    {
      FromPort: 22,
      IpProtocol: 'tcp',
      //IpRanges: [
      //  {
      //    CidrIp: 'STRING_VALUE'
      //  },
        /* more items */
      //],
      //PrefixListIds: [
      //  {
      //    PrefixListId: 'STRING_VALUE'
      //  },
        /* more items */
      //],
      ToPort: 22,
      UserIdGroupPairs: [
        {
          GroupId: 'sg-059c807d',
          //GroupName: 'STRING_VALUE',
          //PeeringStatus: 'STRING_VALUE',
          UserId: '517218816149',
          VpcId: 'vpc-a47b94c3',
          //VpcPeeringConnectionId: 'STRING_VALUE'
        },
        /* more items */
      ]
    },
    /* more items */
  ],
  //IpProtocol: 'STRING_VALUE',
  //SourceSecurityGroupName: 'STRING_VALUE',
  //SourceSecurityGroupOwnerId: 'STRING_VALUE',
  //ToPort: 0
};
ec2.revokeSecurityGroupIngress(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});

// Extend AlexaSkill
SecurityGuard.prototype = Object.create(AlexaSkill.prototype);
SecurityGuard.prototype.constructor = SecurityGuard;

SecurityGuard.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("SecurityGuard onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
};

SecurityGuard.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("SecurityGuard onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);    var speechOutput = "Hello everyone, thank you for launching the Stratus Solutions Security Guard. I can help secure Amazon EC2 instances by applying a Security Group. How may I be of assistance today? ";
    response.ask(speechOutput);
};

SecurityGuard.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("SecurityGuard onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
};

//Modify the Intent Handlers for interacting with SecurityGuard via Alexa
SecurityGuard.prototype.intentHandlers = {
    "SecurityGuardDrillIntent": function (intent, session, response) {
        response.ask("This is just a drill. If this were an actual emergency, you could ask me to apply an EC2 Security Group to project your EC2 instances from the bad guys.", "");
    }
    "QueryAlertIntent": function (intent, session, response) {
	response.ask("Alert! Incoming SSH brute force attack!", "")
    }
    "DeployCountermeasuresIntent": function (intent, session, response) {
	demo.revokeSecurityGroupIngress(demoParams, function(err, data) {
  	if (err) console.log(err, err.stack); // an error occurred
  	else     console.log(data);           // successful response
	response.tell("Applying security counter measures now.");
    });
    }
    "HelpIntent": function (intent, session, response) {
        response.ask("If you're having trouble, please see the documentation for this Skill for a list of things that you can say to me. If you require more direct assistance, please say, I need professional services", "");
    }
    "ProServIntent": function (intent, session, response) {
        response.tell("If you require assistance automating your AWS environment, Stratus engineers are available to provide expertise for a wide range of cloud services and technologies. Please contact Stratus Solutions for more details.");
    }
    "ThankYouIntent": function (intent, session, response) {
        response.tell("You are quite welcome. Have a great day everyone and thank you for attending our demo.");
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SecurityGuard skill.
    var securityGuard = new SecurityGuard();
    securityGuard.execute(event, context);
};
