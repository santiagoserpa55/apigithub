const apiUrl = 'https://api.github.com/users/';
const toggleSwitch = document.querySelector('.theme__container');

const button = document.querySelector('button');
const inputSearch = document.querySelector('#search');
const noResults = document.querySelector('.error');
toggleSwitch.addEventListener('click', () =>{
 let body = document.querySelector('body');

  if(window.matchMedia('(prefers-color-scheme:dark)').matches){
    body.classList.remove('dark__mode');
    body.classList.toggle('light__mode');
  }else if(window.matchMedia('(prefers-color-scheme:light)').matches){
    body.classList.remove('light__mode');
    body.classList.toggle('dark__mode');
  }else{
    body.classList.toggle('dark__mode');
  } 
 
}); 
const getUser = async(input) =>{
  noResults.style.display ='none';
  const endPoint = `${apiUrl}${input}`;
  const response = await fetch(endPoint);
  const jsonResponse = await response.json();
  if (response.ok) {
    let name = document.querySelector('.name');
    if(jsonResponse.name === "" || jsonResponse.name === null){
      name.innerText = jsonResponse.login.replace(/\@/g, '');
    }else{
      name.innerText = jsonResponse.name;
    }
    let userName = (document.querySelector('.username').innerText = `@${jsonResponse.login}`);

    let dateJoined = document.querySelector('.joined');
    let date = new Date(jsonResponse.created_at);
    let dateFormat = new Intl.DateTimeFormat('en-GB',{
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    let newDate = dateFormat.format(date);
    dateJoined.innerText = `Joined ${newDate}`;

    let icon = (document.querySelector('#icon').src = jsonResponse.avatar_url);
  } else {
    
  }
};
button.addEventListener('click', () => {
  let newInput = inputSearch.value;
  if(!newInput == ''){
    return getUser(newInput);
  }
});
