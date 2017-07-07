/**
 * Created by elip on 07/07/2017.
 */

//cur step = welcome
export function WelcomeOpen() {
  let answer = {};
  answer.mes = `Congratulations! You’ve just unlocked the best kept secret for parents, your personal parenting assistant. 
  I’m Merry Poppins. You can ask me parenting questions and I will help you find relevant information. 
  Would you like me to tell you what I can do?`;
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
      answer.step = 'GuideOpen';
      break;
  }
  return answer;
}

export function Answer(input, step) {

  console.log('Answer: ', input, step);
  let answer = {};

  if (input == '') {
    answer.mes = 'Oops, I could\'nt understand your answer.';
    answer.step = 'Welcome';
    return answer;
  }
  if (input == 'any other tip' || input == 'need another tip' || input == 'any other tips' ||
    input == 'give me an inspiration' || input == 'give me some inspiration' ||
    input == 'give me inspiration' || input.includes(' tip') || input.includes(' inspiration')) {

    console.log('Answer >> ', input, ' << caused: MUSIC');

    answer.mes = 'https://s3-us-west-2.amazonaws.com/steinadi.com/spoon_full_of_sugar_Trimmed_compressed.mp3';
    answer.step = 'music';
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
    answer.mes = 'Oops, I couldn\'t understand your question.';
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
      answer.mes = 'If you ever want to hear this tutorial again, just ask “what can you do?”' +
        '\nAlright, let’s get started. How can I help you?';
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


function welcomeTestAllYes(req, res) {
  console.log('\nStart All Yes Test:');
  let ans = WelcomeOpen();
  step = ans.step;
  console.log('Mary: ', ans.mes);
  ans = Answer('yes', ans.step);
  console.log('Mary: ', ans.mes);
  ans = Answer('yes', ans.step);
  console.log('Mary: ', ans.mes);

  ans = Query('dogs');
  console.log('Ans: ', ans.mes);

}

function welcomeTestNoGuide(req, res) {
  console.log('\nStart No Guide Test:');
  let ans = WelcomeOpen();
  step = ans.step;
  console.log('Mary: ', ans.mes);
  ans = Answer('yes', ans.step);
  console.log('Mary: ', ans.mes);
  ans = Answer('no', ans.step);
  console.log('Mary: ', ans.mes);
  ans = Query('dogs');
  console.log('Ans: ', ans.mes);

}

function welcomeTestRepeatGuide(req, res) {
  console.log('\nStart Repeat Guide Test:');
  let ans = WelcomeOpen();
  step = ans.step;
  console.log('Mary: ', ans.mes);
  ans = Answer('yes', ans.step);
  console.log('Mary: ', ans.mes);
  ans = Answer('no', ans.step);
  console.log('Mary: ', ans.mes);
  ans = Answer('yes', ans.step);
  console.log('Mary: ', ans.mes);
  ans = Query('dogs');
  console.log('Ans: ', ans.mes);

}

function welcomeTestDefaultAns(req, res) {
  console.log('\nStart Default Ans Test:');
  let ans = WelcomeOpen();
  step = ans.step;
  console.log('Mary: ', ans.mes);
  ans = Answer('', ans.step);
  console.log('Mary: ', ans.mes);
  ans = Answer('no', ans.step);
  console.log('Mary: ', ans.mes);
  ans = Answer('yes', ans.step);
  console.log('Mary: ', ans.mes);
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
  welcomeTestAllYes();
  welcomeTestNoGuide();
  welcomeTestRepeatGuide();


}

test();

const allFuncs = {
  WelcomeOpen,
  buildWaitForQueryResponse,
};
// export default allFuncs;