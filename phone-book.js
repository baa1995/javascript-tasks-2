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
    var badPhone='';

    for (var b=0;b<phone.length;b++) {
        if (phone[b]!='+' && phone[b]!=' ' && phone[b]!='(' && phone[b]!=')' && phone[b]!='-') {
            badPhone+=phone[b];
        }
    }

    if (badPhone.length-10===0) {
        correctPhone+='7';
    }
    for(var i=0; i<(badPhone.length-10);i++) {
        correctPhone+=badPhone[i];
    }
    correctPhone+='(';
    for (var j=0;j<3;j++) {
        correctPhone+=badPhone[i];
        i++;
    }
    correctPhone+=')';
    for (j=0;j<7;j++) {
        correctPhone+=badPhone[i];
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
                var queryName = phoneBook[i].name.indexOf(query.toLowerCase());
                var queryPhone = phoneBook[i].phone.indexOf(query.toLowerCase());
                var queryEmail = phoneBook[i].email.indexOf(query.toLowerCase());
                if (queryName != -1 || queryPhone != -1 || queryEmail != -1) {
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
