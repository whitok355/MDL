"use strict";

const inputs = document.querySelectorAll(`.form-el__input`);
const form = document.querySelector(`.form`);
const days = document.querySelectorAll(`.hidden-list__day`);
const width = document.querySelectorAll(`.hidden-list__width`);
const page = document.querySelectorAll(`.hidden-list__page`);
const radionTheme = document.querySelectorAll(`.radio-box__theme`);



const getInput = (cl) =>{
    const el = document.querySelector(`${cl}`)
    if(el) return el.value
}
const getRadio = (cl) =>{
    const el = document.querySelector(`${cl}:checked`);
    if(el) return el.value
}
const getCode = (cl) =>{
    const inputs = document.querySelectorAll(cl);
    const code = {};
    inputs.forEach(el => {
        code[el.id] = el.value
    })
    return code
}
const changeTheme = () =>{
    const data = JSON.parse(localStorage.obj);
    const css= document.getElementById('theme-css')
    css.href = `file:///C:/Users/31391/Desktop/MDL/style/${data.theme}-theme.css`
}



const putData = (e) =>{
    e.preventDefault();
    localStorage.obj = JSON.stringify({
        title: getInput('.form-el__title'),
        day: getRadio(`.hidden-list__day`),
        width: getRadio(`.hidden-list__width`),
        page: getRadio(`.hidden-list__page`),
        size: getInput('.form-el__size'),
        code: getCode(`.form-code__input`),
        theme: getRadio(`.radio-box__theme`)
    })
    changeTheme()
}


const enterValue = (e) =>{
    document.getElementById(`${e.target.name}`).innerHTML = e.target.value
}

form.addEventListener('submit', putData);
days.forEach(el => el.addEventListener('input', enterValue));
width.forEach(el => el.addEventListener('input', enterValue));
page.forEach(el => el.addEventListener('input', enterValue));




const innerValue = (name, data) =>{
    document.querySelector(`.form-el__${name}`).innerHTML = data[name]? data[name] : '';
}
const changeValue = (name, data) =>{
    document.querySelector(`.form-el__${name}`).value = data[name]? data[name]: '';
}
const checkLocal = () =>{
    if(localStorage.obj){
        const data = JSON.parse(localStorage.obj);
        innerValue(`day`, data)
        innerValue(`width`, data)
        innerValue(`page`, data)
        changeValue('title', data)
        changeValue('size', data)
        document.querySelectorAll(`.form-code__input`).forEach(el =>{
            el.value = data.code[el.id]
        })
        document.getElementById(data.theme).checked = true
        changeTheme()
    }
}

window.onload = checkLocal
