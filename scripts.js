const API_URL = 'https://apis.is/isnic?domain=';
const program = (() => {
  let input;
  let results;
  function el(type, text) {
    const eli = document.createElement(type);
    if (text) {
      eli.appendChild(document.createTextNode(text));
    }
    return eli;
  }
  function erase(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }
  function showMessage(message) {
    erase(results);
    const thing = el('p', message);
    results.appendChild(thing);
  }
  function showLoading() {
    erase(results);
    const img = el('img');
    img.setAttribute('alt', 'loading gif');
    img.setAttribute('src', 'loading.gif');

    const imageDiv = el('div');
    imageDiv.classList.add('loading');
    imageDiv.appendChild(img);

    const load = el('p', 'Leita að léni ...');
    imageDiv.appendChild(load);
    results.appendChild(imageDiv);
  }
  function changeDate(dags) {
    const dag = new Date(dags);
    const dagur = dag.getDate();
    const man = parseInt(dag.getMonth(), 10) + 1;
    const ar = dag.getFullYear();
    dags = ar + "-" + man + "-" + dagur; // eslint-disable-line
    return dags;
  }
  function birta(dataObj, list, key) {
    const dlElement = document.createElement('dl');
    const newDataObj = dataObj;
    if (key === 'registered') {
      newDataObj[key] = changeDate(dataObj[key]);
    }
    if (key === 'expires') {
      newDataObj[key] = changeDate(dataObj[key]);
    }
    if (key === 'lastChange') {
      newDataObj[key] = changeDate(dataObj[key]);
    }
    const dt = el('dt', list[key]);
    const dd = el('dd', dataObj[key]);
    dlElement.appendChild(dt);
    dlElement.appendChild(dd);
    results.appendChild(dlElement);
  }

  function showResults(data) {
    erase(results);
    const dataObj = data[0];
    const translate = {
      domain: 'Lén',
      registrantname: 'Skráningaraðili',
      address: 'Heimilisfang',
      country: 'Land',
      email: 'Netfang',
      registered: 'Skráð',
      expires: 'Rennur út',
      lastChange: 'Seinast breytt',
    };
    const fast = JSON.parse(JSON.stringify(translate, ['domain', 'registered', 'expires', 'lastChange'], 4));
    const auka = JSON.parse(JSON.stringify(translate, ['registrantname', 'email', 'address', 'country'], 4));

    for (const key in fast) {
      birta(dataObj, fast, key);
    }
    for (const key in auka) {
      if (dataObj[key]) {
        birta(dataObj, auka, key);
      }
    }
  }
  function fetchResults(web) {
    if (web === '') showMessage('Lén verður að vera strengur');
    else {
      fetch(`${API_URL}${web}`)
        .then((data) => {
          if (!data.ok) {
            throw new Error('Villa við að sækja gögn');
          }
          return data.json();
        })
        .then((data => showResults(data.results)))
        .catch((error) => {
          showMessage('Lén er ekki skráð');
        });
    }
  }
  function onSubmit(e) {
    e.preventDefault();
    const web = input.value;
    showLoading();
    fetchResults(web);
  }
  function init(domains) { // setja upp allt sem við þurfum þegar forritið byrjar að keyra
    const form = domains.querySelector('form');
    input = form.querySelector('input');
    results = domains.querySelector('.results');
    form.addEventListener('submit', onSubmit);
  }
  return {
    init,
  };
})();
document.addEventListener('DOMContentLoaded', () => {
  const domains = document.querySelector('.domains');
  program.init(domains);
});
