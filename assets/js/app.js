document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems,{
        edge: "left"
    });

    fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.json())
  .then((json) => console.log(json));


  
});



