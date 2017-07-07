/**
 * Created by elip on 07/07/2017.
 */

//cur step = welcome
export function WelcomeOpen() {
  let answer = {};
  answer.mes = `Congratulations! You’ve just unlocked the greatest kept secret for parents, your personal parenting assistant. 
  I’m Mary Poppins. You can ask me parenting questions and I will help you find relevant information. 
  Would you like me to take you through what I can do?`;
  answer.step = 'welcomeEnd';

  return answer;
}


export function welcomeEnd(shouldActivateGuide) {
  let answer = {};
  switch (shouldActivateGuide) {
    case 'yes':
      answer.mes = 'Once I’m activated, you can ask me parenting questions, ' +
        'by saying “I need your help” and then saying your problem. ' +
        'Got it?';
      answer.step = 'GuideOpen';
      break;
    case 'no':
      return buildWaitForQueryResponse();
    default:
      answer.mes = 'Once I’m activated, you can ask me parenting questions, by saying “I need your help” and then saying your problem. ' +
        'Got it?';
      answer.step = 'WelcomeOpen';
      break;
  }
  return answer;
}

export function Answer(input, step) {

  console.log('Answer: ', input, step);
  let answer = {};

  if (input == '') {
    answer.mes = 'Oops, I, Merry Poppins, could not hear your answer.';
    answer.step = 'Welcome';
    return answer;
  }

  switch (step) {
    case 'welcomeEnd':
      return welcomeEnd(input);
    case
    'GuideOpen':
      return buildAnsGuideOpenResponse(input);
    case
    'GuideEnd':
      answer.mes = 'How can I help you?';
      answer.step = 'waitForQuery';
      break;
    default:
      return welcomeEnd(input);
  }
  return answer;
}

export function Query(input) {
  let answer = {};
  if (input == '') {
    answer.mes = 'Oops, I couldn\'t hear your query.';
  } else {
    answer.mes = 'Got it. Let me track that down for you';
  }
  return answer;
}

function buildAnsGuideOpenResponse(input) {
  switch (input) {
    case 'yes': //continue to Guide end
      return buildAnsGuideEndResponse(input);
    case 'no': // return to welcomEnd
      return welcomeEnd('yes');
    // TODO: Make sure of this
    default:
      return welcomeEnd('yes');
  }
}

export function buildAnsGuideResponse(input) {
  let answer = {};
  switch (input) {
    case 'yes':
      answer.mes = 'Once I’m activated, you can ask me parenting questions, ' +
        'by saying “I need your help” and then saying your problem. Got it?';
      answer.step = 'GuideEnd';
      break;
    case 'no':
      answer.mes = 'How can I help you?';
      answer.step = 'waitForQuery';
      break;
    // TODO: Make sure of this
    default:
      answer.mes = 'Once I’m activated, you can ask me parenting questions, ' +
        'by saying “I need your help” and then saying your problem. Got it?';
      answer.step = 'GuideEnd';
      break;
  }
  return answer;
}

// Got it?
export function buildAnsGuideEndResponse(input) {
  let answer = {};
  switch (input) {
    case 'yes':
      answer.mes = 'If you ever want to hear this tutorial again, just ask “Mary, what can you do?”' +
        ' Or say "help".\nAlright, let’s get started. How can I help you? For example: Alexa, help me with eating vegetables.';
      answer.step = 'waitForQuery';
      break;
    case 'no':
      return buildAnsGuideResponse('yes');
    // TODO: Make sure of this
    default:
      return buildAnsGuideResponse('yes');
  }
  return answer;
}

export function buildWaitForQueryResponse() {
  let answer = {};

  answer.mes = 'How can I help you?';
  answer.step = 'waitForQuery';
  return answer;
}


function welcomeTest(req, res) {
  let ans = WelcomeOpen();
  step = ans.step;
  console.log('Ans: ', ans.mes);
  ans = Answer('yes', ans.step);
  console.log('Ans: ', ans.mes);
  ans = Answer('no', ans.step);
  console.log('Ans: ', ans.mes);
  ans = Answer('no', ans.step);
  console.log('Ans: ', ans.mes);
  ans = Answer('no', ans.step);
  console.log('Ans: ', ans.mes);
  ans = Answer('no', ans.step);
  console.log('Ans: ', ans.mes);
  ans = Answer('no', ans.step);
  console.log('Ans: ', ans.mes);
  ans = Answer('no', ans.step);
  console.log('Ans: ', ans.mes);
  ans = Answer('yes', ans.step);
  console.log('Ans: ', ans.mes);
  ans = Query('dogs');
  console.log('Ans: ', ans.mes);

}

function welcomeTest2(req, res) {
  let ans = WelcomeOpen();
  step = ans.step;
  console.log('Ans: ', ans.mes);
  ans = Answer('no', ans.step);
  console.log('Ans: ', ans.mes);
  ans = Query('dogs');
  console.log('Ans: ', ans.mes);

}


function answer(req, res) {
  const queryValue = 'yes';

  let ans = Answer(step, queryValue);
  step = ans.step;
}

let step;

function test() {

  welcomeTest2();
}

test();

// const allFuncs = {
//     WelcomeOpen,
//     buildWaitForQueryResponse,
// };
// export default allFuncs;