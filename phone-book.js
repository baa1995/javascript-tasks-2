'use strict';

var phoneBook=[]; // Здесь вы храните записи как хотите

/*
 Функция добавления записи в телефонную книгу.
 */
module.exports.add = function add(name, phone, email) {

    if(isValidPhone(phone) && isValidEmail(email)) {
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

function isValidPhone(phone) {
    var testPhone= /^(\+?\d?\d?)\s?((\d\d\d)|(\(\d\d\d\)))\s?(\d\d\d)\s?\-?\d\s?\-?(\d\d\d)$/;
    return testPhone.test(phone);
}

function isValidEmail (email) {
    var testEmail= /^[A-Za-zА-Яа-я0-9_]+@[A-Za-zА-Яа-я0-9_\-]+\.[A-Za-zА-Яа-я0-9_]+\.?[A-Za-zА-Яа-я0-9_]+?$/;
    return testEmail.test(email);
}

/*
 Функция поиска записи в телефонную книгу.
 Поиск ведется по всем полям.
 */
module.exports.find = function find(query) {
    var finded=findQuery(query);
    for (var i=0;i<finded.length;i++) {
        console.log(finded[i].name + ', ' + finded[i].phone + ', ' + finded[i].email);
    }
};

function findQuery (query) {
    var findedContacts=[];
    if (!query) {
        findedContacts=phoneBook;
    }
    else {
        query = query.toLowerCase();
        for (var j = 0; j < phoneBook.length; j++) {
            if (phoneBook[j].name.toLowerCase().indexOf(query) != -1 ||
                phoneBook[j].phone.indexOf(query) != -1 ||
                phoneBook[j].email.toLowerCase().indexOf(query) != -1) {
                findedContacts.push(phoneBook[j]);
            }
        }
    }
    return findedContacts;
}
/*
 Функция удаления записи в телефонной книге.
 */
module.exports.remove = function remove(query) {
    var isDelete=0;
    var finded=findQuery(query);
    for(var j=0;j<finded.length;j++) {
        phoneBook.splice(phoneBook.indexOf(finded[j]), 1);
        isDelete++;
        }
   // isDelete=finded.length;
    console.log('Удалено '+ isDelete +' контактов');
};
