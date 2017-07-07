import * as Messages from "./Messages";
/**
 * Created by elip on 07/07/2017.
 */


let step;

welcome();

function welcome(req, res) {
    let ans = WelcomeOpen();
    step = ans.step;

}

function answer(req, res) {
    const queryValue = "Yes";

    let ans = Answer(step, queryValue);
    step = ans.step;
}