'use strict';

import {CartObj} from "./cart.js";


        let minsk = document.getElementById('minsk'),
            region = document.getElementsByClassName('region'),
            belBank = document.getElementById('bel_bank'),
            belBankPlus = document.getElementById('bel_bank_cart_plus'),
            selectTime = document.getElementById('select_time'),
            step2 = document.getElementById('step_2'),
            step3 = document.getElementById('step_3'),
            step4 = document.getElementById('step_4'),
            selectBtn = document.getElementsByClassName('select_btn'),
            selectSum = document.getElementById('select_sum'),
            carts = document.getElementsByClassName('cart'),
            totalSum = document.getElementById('total'),
            totalSumM = document.getElementById('total_m'),
            selectSumAlert = document.getElementById('select_sum_alert'),
            selectTest = document.getElementById('select_time_plus'),
            sborInfo = [];



        for (let i = 0; i < region.length; i++) { // создаём счётчик который накинет лисенеры
            let regions = region[i];
            regions.addEventListener('click', getRegion); // все регионы получают выбор
            regions.addEventListener('click', nextStep2); // все регионы открывают второй пункт
        }

        for (let i = 0; i < carts.length; i++) {
            carts[i].addEventListener('click', selectCart)
        }

        selectTime.addEventListener("input", testTime); // каждую секунду проверят выбран ли пункт у второго шага

        function nextStep2() { // открыывет второй пункт ввода
            selectTime.attributes.removeNamedItem('disabled'); // открываем селект убрав отребут дизейбл
            for (let i = 0; i < region.length; i++) { // снимаем лисенеры на отерытие второго пункта с регионов
                let regions = region[i];
                regions.removeEventListener('click', nextStep2)
            }
            mathSumNull();
        }

        function getRegion(event) { // функция определяющая какой из регионов был выбран
            console.log(event.target.id);// используем объект ивент и узнаем какой у него id
            sborInfo[0] = event.target.id;
            removeRegionTarget();
            event.target.classList.add('selected');
            let helpText = document.getElementById('cart_here');
            helpText.style = 'display: none';
            if (event.target.id == 'minsk') { // если регион минсе, то открываем все карточки
                for (let i = 0; i < carts.length; i++) { // проходимся по всем картам и меняем "none"  на "block"
                    let cart = carts[i];
                    cart.style = 'display: block';
                    selectTime[1].disabled = false; // при выборе регионов "не Минск" закрывает доступ к выбору 3 и 4 месяуа
                    selectTime[2].disabled = false;
                }
                selectTime.value = "select";
            } else { // иначе (если выбран не минск)
                // console.log(`выбран регион ${event.target.id}`); // проверяем правильность введения региона
                for (let i = 0; i < carts.length; i++) { // убираем все карты если они уже появились, если нет, то этот код ничего не делает
                    let cart = carts[i];
                    cart.style = 'display: none';
                }
                belBank.style = 'display: block'; // возвращаем "block"  оступной
                belBankPlus.style = "display: block";
                selectTime.value = "select";
                selectTime[1].disabled = true;
                selectTime[2].disabled = true;
            }
            step2.classList.remove('disable');  // снимаем ограничение с второго шага
            step3.classList.add('disable'); // вешаем ограничение на третий

            for (let i = 0; i < carts.length; i++) {
                selectBtn[i].disabled = true;
            }
            for (let i = 0; i < carts.length; i++) {
                carts[i].classList.remove('selected');
            }
            selectSum.classList.remove('selected');
            mathSumNullAndDisable();
            step4.classList.remove('step_4_plus');
        }

        function testTime() { // функция для проверки выбран ли пункт в селекте
            // if (selectTime.value !== 'select'){ // если выбрана не заплатка, то она останавливается и ...
                nextStep3(selectTime.value); // передаёт выбранное значение в виде строки в функцию для работы третьего шага
                sborInfo[1] = selectTime.value;
                console.log(sborInfo);
            }
            // else { // иначе она и дальше вызывает саму себя
            //     setTimeout(testTime, 1000); // самовызов происходит каждык 0.8 секундды
            // }
        // }

        function nextStep3(testTime1) { // функция отвественная  за вывод сбособов оплаты подходящих под критерии
            mathSumNullAndDisable(); // закрываем выбор суммы и сбрасываем его
            // testTime1 = parseInt(testTime1); // аргумент из предыдущей функции мы получаем в виде строки и преобразуем в число
            step3.classList.remove('disable'); // снимаем затемнение с третьего пункта
            let selectBtn = document.getElementsByClassName('select_btn'); // собираем все кнопки выбора способа оплаты
            for (let i = 0; i < carts.length; i++) { // отменяем атребут disabled
                selectBtn[i].disabled = false;
            }
            for (let i = 0; i < carts.length; i++) { // отменяем выделение выбранной карты
                carts[i].classList.remove('selected');
            }
            if (parseInt(testTime1) <= 4) { // начинаем проверку кольчества выбранных месяцуев (до 4-х)
                step4.classList.add('disable'); // хз
                if (parseInt(testTime1) >= 4) {
                    for (let i = 0; i < carts.length; i++) {
                        if ((carts[i].id == "funCart") || (carts[i].id == "tartoseCart")) {
                            carts[i].style = 'display: block';
                        } else {
                            carts[i].style = 'display: none';
                        }
                        belBankPlus.style = 'display: none';
                    }
                    step4.classList.remove('step_4_plus');
                } else {
                    for (let i = 0; i < carts.length; i++) { // заменить эту часть
                        if ((carts[i].id == "halvaCart") || (carts[i].id == "magnitCart") || (carts[i].id == "kpCart")) {
                            carts[i].style = 'display: block';
                        } else {
                            carts[i].style = 'display: none';
                        }
                    }
                    step4.classList.remove('step_4_plus');
                }
            } else if (parseInt(testTime1) >= 6) {
                for (let i = 0; i < carts.length; i++) { // проходимся по всем картам и меняем "none"  на "block"
                    let cart = carts[i];
                    cart.style = 'display: none';
                }
                belBank.style = "dispaly: block";
                step4.classList.remove('step_4_plus');
            } else if (testTime1 == "more") {
                for (let i = 0; i < carts.length; i++) { // проходимся по всем картам и меняем "none"  на "block"
                    let cart = carts[i];
                    cart.style = 'display: none';
                }
                belBankPlus.style = "display: block";
                step4.classList.add('step_4_plus');
            }
        }



        function selectCart() { // выбор карты, ей будет присвоен класс селектед
            step4.classList.remove('disable'); // убираем у всех
            for (let i = 0; i < carts.length; i++) {
                carts[i].classList.remove('selected');
            }
            sborInfo[2] = this.id;
            console.log(sborInfo);
            this.classList.add('selected'); // добавляем тому на который нажали
            mathSumNull(); // смотрите функцию
        }


        selectSum.addEventListener("input", mathSum); // при изменении в веденую сумму отрыбатывает (проверить)

        function mathSum() { // производит вычисления
            if (selectTime.value == "more") { // если выбранно больше 12 месяцев, то начинает проверки
                let start = 13, // стартовое 13 месяцев, затем это будет использоваться для вычисдения месяцев
                    max = 0; // просто 0, который потом будет принимать значения
                parseInt(start); // приводим старт к числу
                start=Math.abs(start-parseInt(selectTest.value)); // берём модуль разницы месяцев
                start*=0.7; // умножаем на кол-во шагов (месяцев), при шаге в 0.7
                start+=1.1; // добавляем 1.1 процент стартовый
                start/=100; // ??
                max = parseInt(selectSum.value); // парсим значение из инпута
                max*=start; // умножаем на процент
                totalSumM.innerText = (((parseInt(selectSum.value)+max) / (parseInt(selectTest.value)-1)).toFixed(2))+"руб."; // складываем сумму и процент, делим на кол=во месяцевв минус первый взнос
                totalSum.innerText = ((parseInt(selectSum.value)+max).toFixed(2))+"руб."; // общая сумма с перевлатой
                selectSumCheck(selectSum.value); // проверка валидности введёных чисел
            } else {
                totalSum.innerText = selectSum.value; // если считать проценты не нужно, то просто выводим
                totalSumM.innerText = (selectSum.value / parseInt(selectTime.value)).toFixed(2); // делим на кол-во месяцев
                selectSumCheck(selectSum.value); // проверяем валидность
            }
            // if ((selectSum.value !== '')) { // если не пусто, то запускаем пересчёт
            //     checkSum(); // смотрите у функции
            // }
        }


        function mathSumNull() { // сбрасываем значение карты и с все введённые варианты
            totalSum.innerText = "test";
            totalSumM.innerText = "test";
            selectSum.value = "";
            selectSum.classList.remove('false');
        }
        function mathSumNullAndDisable() {  // сбрасываем значения и блокируем окно ввода
            mathSumNull();
            step4.classList.add('disable');
            selectSumAlert.style = "display: none";
        }

        function selectSumCheck(sum) { // проверяем введёную сумму
            let summ_vall = parseInt(sum);
            if ((summ_vall <= 49) || (summ_vall >= 10001)) { // если меньше 50 или больше 10.000, то кидаем класс фолс
                selectSumAlert.style = "display: block"; // сообщение об ошибке
                selectSum.classList.add('false'); // класс не верно
                totalSum.innerText = "0";
                totalSumM.innerText = '0';
            } else {
                selectSumAlert.style = "display: none"; // убираем ошибку
                selectSum.classList.remove('false'); // снимаем класс
            }
        }

        function removeRegionTarget() { // убираем класс со всех регионов
            for (let i = 0; i < region.length; i++) {
                region[i].classList.remove('selected');
            }
        }


        let allReadyBtn = document.getElementById('all_ready');
        allReadyBtn.addEventListener("click", allReady);



        function allReady() {
            sborInfo.push(selectSum.value);
            console.log(sborInfo);
            let selectedInfo = new CartObj(...[sborInfo]);
            selectedInfo.getInfo();
            selectedInfo.fetchJSON();
        }





