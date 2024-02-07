document.addEventListener('alpine:init', () => {
    Alpine.data('userData', function(){
        return {
            users: [],
            isloading: false,
            getUsers(){
                this.isloading = true
                axios.get("https://jsonplaceholder.typicode.com/users").then((res)=>{
                    this.users = res.data
                }).finally(()=>{
                    this.isloading = false

                }) 
               
                    
                     
                
            }
        }
    })
})


