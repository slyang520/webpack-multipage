/**
 * Created by slyang on 17/10/7.
 */
import _ from "lodash";
import "./assest/css/app01.css";
import icon from "./assest/img/logo.png";
import Data from "./data.xml";
import printMe from "./print.js";

import 'babel-polyfill';

function clicktest(){
    alert('test');
}

function component() {
    var element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack', '汉字我是汉字'], ' ');
    element.classList.add('hello');
    var myIcon = new Image();
    myIcon.src = icon;
    element.appendChild(myIcon);
    console.log(Data);
    return element;
}

function component2() {
    var element = document.createElement('div');
    var btn = document.createElement('button');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
    element.appendChild(btn);
    return element;
}

let test = 'test';
console.log(`${test}  es6->es5 success`);

window.clicktest = clicktest;
document.body.appendChild(component());
document.body.appendChild(component2());