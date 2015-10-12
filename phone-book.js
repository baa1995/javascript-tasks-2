'use strict';

var phoneBook=[]; // Здесь вы храните записи как хотите

/*
 Функция добавления записи в телефонную книгу.
 */
module.exports.add = function add(name, phone, email) {

    if(isValidPhone(phone) && isValidEmail(email)) {
        phone=makeCorrectPhone(phone);
        var contact={
            name:name,
            phone:phone,
            email:email
        }
        phoneBook.push(contact);
    }
    else {
        console.log('Контакт введен некорректно!');
    }
};

function makeCorrectPhone (phone) {
    var correctPhone='+';

    phone=phone.replace(/[\+?\s?\(?\)?]/,'');

    if (phone.length-10===0) {
        correctPhone+='7';
    }
    for(var i=0; i<(phone.length-10);i++) {
        correctPhone+=phone[i];
    }
    correctPhone[i+1]='(';
    for (var j=0;j<3;j++) {
        correctPhone+=phone[i];
        i++;
    }
    correctPhone+=')';
    for (j=0;j<3;j++) {
        correctPhone+=phone[i];
        i++;
    }
    correctPhone+='-';
    correctPhone+=phone[i];
    i++;
    correctPhone+='-';
    for (j=0;j<3;j++) {
        correctPhone+=phone[i];
        i++;
    }
    return correctPhone;
}



function isValidPhone(phone) {
    var testPhone= /^(\+?\d?\d?)\s?((\d\d\d)|(\(\d\d\d\)))\s?(\d\d\d)\s?\-?\d\s?\-?(\d\d\d)$/;
    return testPhone.test(phone);
}


function isValidEmail (email) {
    var testEmail= /^[A-Za-zА-Яа-я0-9_]+@[A-Za-zА-Яа-я0-9_\-]+\.[A-Za-zА-Яа-я0-9_]+\.?[A-Za-zА-Яа-я0-9_]+?$/;
    return testEmail.test(email)
}

/*
 Функция поиска записи в телефонную книгу.
 Поиск ведется по всем полям.
 */
module.exports.find = function find(query) {
        if (!query){
            for( var a=0;a<phoneBook.length;a++){
                console.log(phoneBook[a].name + ', ' + phoneBook[a].phone + ', ' + phoneBook[a].email)
            }
        }
        else {
            for (var i=0; i<phoneBook.length;i++){
                var queryName = phoneBook[i].name.substr(0, query.length);
                var queryPhone = phoneBook[i].phone.substr(0, query.length);
                var queryEmail = phoneBook[i].email.substr(0, query.length);
                if (queryName != '' || queryPhone != '' || queryEmail != '') {
                    console.log(phoneBook[i].name + ', ' + phoneBook[i].phone + ', ' + phoneBook[i].email);
            }
        }
    }
};

/*
 Функция удаления записи в телефонной книге.
 */
module.exports.remove = function remove(query) {
    var isDelete=0;
    for(var j=0;j<phoneBook.length;j++) {
        if (phoneBook[j].name.toLowerCase().indexOf(query.toLowerCase())!=-1 || phoneBook[j].phone.indexOf(query!=-1) ||
            phoneBook[j].email.toLowerCase().indexOf(query.toLowerCase())!=-1) {
            phoneBook.splice(j, 1);
            isDelete++;
        }
    }
    console.log('Удалено '+isDelete+' контактов')
};
