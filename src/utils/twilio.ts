"use server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const testNumber = process.env.TWILIO_TEST_NUMBER;
const testRecipient = process.env.TWILIO_TEST_RECIPIENT;

const client = twilio(accountSid, authToken);

export async function createMessage() {
	try {
		const message = await client.messages.create({
			body: "This will be the body of the new message!",
			from: testNumber,
			to: testRecipient || " " 
		});
		console.log(message.body);
	} catch (error) {
    console.error("Error using Twilio", error);
  }
}
