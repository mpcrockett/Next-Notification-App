"use server";
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const testNumber = process.env.TWILIO_TEST_NUMBER;

const client = twilio(accountSid, authToken);

export async function createMessage() {
  const message = await client.messages.create({
    body: "This will be the body of the new message!",
    from: testNumber,
    to: testNumber || '',
  });

  console.log(message.body);
};