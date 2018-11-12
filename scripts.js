// const API_URL = '/example.json?domain=';
const API_URL = 'http://apis.is/isnic?domain=hi.i';

/**
 * Leit að lénum á Íslandi gegnum apis.is
 */
const program = (() => {
  let input;
  let results;
  function init(domains) {//setja upp allt sem við þurfum þegar forritið byrjar að keyra

    const form = domains.querySelector('form');
    input = form.querySelector('input');
    results = domains.querySelector('.results');

    form.addEventListener('submit', onSubmit);
  }

  function onSubmit(e){
    e.preventDefault();

    const plate = input.value;   
    console.log(plate);   //það sem við skrifum kemur í console.log

    fetchResults(plate);
  // showLoading();
  }

  function showLoading(){
    const img = el('img');
    img.setAttribute('alt','loading gif');
    img.setAttribute('src', 'loading.gif');

    const imageDiv= el('div');
    imageDiv.classList.add('loading');
    imageDiv.appendChild(img);

    results.appendChild(imageDiv);
  }

  function showMessage(message){
    //setha skilaboð í reluts hlut í html
  }

  function showResults(data){
    erase(results);
    //let {type, number, color} = data[0];
    let dataObj = data[0];

    //console.log(type, number, color); // buið að taka uppl/gildi úr hlutnum

    let dlElement = document.createElement('dl');

   // let dt = el('dt','Type');
    //document.createElement('dt');
    //dt.appendChild(document.createTextNode('Type'));

    //let dd = el('dd', type);
    // document.createElement('dd');
    //dd.appendChild(document.createTextNode(type));

    //let div = el('div'); //ef við viljum búa til tómt div

   // dlElement.appendChild(dt);
   // dlElement.appendChild(dd); //copyaði niður
   let dd;
   let dt;

   for(let key in dataObj){
    dd = el('dd', key);
    dt = el('dt', dataObj[key]); //það sem er bakvið þessu gildi
    dlElement.appendChild(dd);
    dlElement.appendChild(dt);
   }
  
    results.appendChild(dlElement);

  }

  function erase(container){
    while (container.firstChild){
      container.removeChild(container.firstChild);
    }
  }

  function el(type, text){
    let el = document.createElement(type);
    if (text){
      el.appendChild(document.createTextNode(text));
    }
    return el;
  }


  function fetchResults(plate){
    fetch(`${API_URL}${plate}`)
    .then( (data) => {
      if (!data.ok){
        throw new Error('Non 200 status');
      }
      return data.json();
    } ) //taka á móti því þegar það kemur
    .then ( (data => showResults(data.results))) //þetta keyrist ef allt gengur upp
    .catch( (error)=> {
     // console.error('ERROR', error);
      showMessage('Villa kom upp');
    });
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => { //
  const domains= document.querySelector('.domains')
  console.log(domains);
  program.init(domains);
  
 // program.init(domains);
});

/*
moduls





*/