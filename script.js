window.addEventListener('DOMContentLoaded', () => {
    // subinfo
    const subInfoBlocks = document.querySelectorAll('.subinfo-block');
    
    subInfoBlocks.forEach(block => {
        const subInfoBtn = block.querySelector('.subinfo-btn');
        const subInfoPanel = block.querySelector('.calc__subinfo');
        const closeBtn = subInfoPanel.querySelector('.close-btn');

        block.addEventListener('click', (e) => {
            if (e.target.closest('.subinfo-btn') == subInfoBtn) {
                subInfoPanel.classList.toggle('show');

                if (subInfoPanel.getBoundingClientRect().right > window.innerWidth) {
                    subInfoPanel.style.left = 'auto';
                    subInfoPanel.style.right = '5%';
                }
            } else {
                subInfoPanel.classList.remove('show');
            }
        });

        closeBtn.addEventListener('click', () => {
            subInfoPanel.classList.remove('show');
        })
    }); 

    // sliders
    const stepSlider = document.getElementById('calc-step__slider');
const stepSpan = document.getElementById('calc-step');
const widthSlider = document.getElementById('calc-width__slider');
const widthSpan = document.getElementById('calc-width');
const heightSlider = document.getElementById('calc-height__slider');
const heightSpan = document.getElementById('calc-height');
const outputValue = document.querySelector('.calc__output-value');

const calcSwitch = document.querySelector('.calc__switch');

let isLeft = true;
let isMetric = true;

function toggleSlider() {
    const container = document.querySelector('.calc__switch');
    const slider = document.querySelector('.calc__switch-slider');
    const bigMarks = document.querySelectorAll('.big-mark');
    
    const leftPosition = bigMarks[0].offsetLeft;
    const rightPosition = bigMarks[1].offsetLeft; 
    
    isLeft = !isLeft;
    slider.style.left = isLeft ? `${leftPosition}px` : `${rightPosition}px`;
}

toggleSlider();
toggleSlider();

calcSwitch.addEventListener('click', () => toggleSlider());

const stepValues = [2.5, 3, 3.077, 3.91, 4, 4.81, 5, 5.95, 6, 6.66, 6.67, 7.81, 8, 10, 10.41];
const minValues = [64, 19.2, 96, 50, 64, 100, 64, 50, 57.6, 64, 80, 100, 96, 96, 100];

function updateSliders() {
    const index = stepSlider.value;
    const stepValue = stepValues[index];
    const minValue = minValues[index];
    
    stepSpan.textContent = `${stepValue} мм`;

    const widthHeightMin = minValue;
    let widthHeightMax = stepValue * 600;

    if (widthHeightMax > 1500) {
        widthHeightMax = 1500;
    }

    const widthHeightStep = minValue;

    widthSlider.min = widthHeightMin;
    widthSlider.max = widthHeightMax;
    widthSlider.step = widthHeightStep;
    widthSlider.value = widthHeightMin;
    updateWidthSpan();

    heightSlider.min = widthHeightMin;
    heightSlider.max = widthHeightMax;
    heightSlider.step = widthHeightStep;
    heightSlider.value = widthHeightMin;
    updateHeightSpan();

    updateArea(); // Обновляем площадь
}

function updateWidthSpan() {
    const value = isMetric ? widthSlider.value : (widthSlider.value / 100).toFixed(2);
    widthSpan.textContent = `${value} ${isMetric ? 'см' : 'м'}`;
    updateArea();
}

function updateHeightSpan() {
    const value = isMetric ? heightSlider.value : (heightSlider.value / 100).toFixed(2);
    heightSpan.textContent = `${value} ${isMetric ? 'см' : 'м'}`;
    updateArea();
}

function updateArea() {
    const widthInMeters = isMetric ? widthSlider.value / 100 : widthSlider.value / 100;
    const heightInMeters = isMetric ? heightSlider.value / 100 : heightSlider.value / 100;
    const area = widthInMeters * heightInMeters; 
    outputValue.textContent = `${area.toFixed(2)} м²`;
}

stepSlider.addEventListener('input', updateSliders);
widthSlider.addEventListener('input', updateWidthSpan);
heightSlider.addEventListener('input', updateHeightSpan);

calcSwitch.addEventListener('click', function() {
    isMetric = !isMetric;

    updateWidthSpan();
    updateHeightSpan();
    updateArea();
});

updateSliders();
});