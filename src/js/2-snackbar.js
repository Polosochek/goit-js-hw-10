// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');


    form.addEventListener('submit', event => {
        event.preventDefault();

        const delayValue = form.elements.delay?.value;
        const stateValue = form.elements.state?.value;

        const delay = Number(delayValue);
        const state = String(stateValue);

        if (Number.isNaN(delay) || delay < 0) {
            iziToast.error({ title: 'Error', message: 'Введіть невідємні значення ' });
            return;
        }

        if (!state || (state !== 'fulfilled' && state !== 'rejected')) {
            iziToast.error({ title: 'Error', message: 'Виберіть стан' });
            return;
        }

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (state === 'fulfilled') {
                    resolve({ delay });
                } else {
                    reject({ delay });
                }
            }, delay);
        });

        promise
            .then(({ delay }) => {
                iziToast.show({
                    title: `✅ Fulfilled promise in ${delay}ms`,
                    timeout: 4000
                });
            })
            .catch(({ delay }) => {
                iziToast.show({
                    title: `❌ Rejected promise in ${delay}ms`,
                    timeout: 4000
                });
            });
    });
