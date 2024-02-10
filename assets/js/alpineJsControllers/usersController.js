document.addEventListener('alpine:init', () => {
    Alpine.data('userData', function(){
        return {
            mainUsers: [],
            users: [],
            pageUsers: [],
            isloading: false,
            showAddModal: false,
            pageCount: 1,
            itemsCount: 4,
            currentPage: 1,
            searchChar:"",
            newUserInfo:{
                name:"",
                username:"",
                email:"",
            },
            userIdToEdit:null,
            getUsers(){
                this.isloading = true
                axios.get("https://jsonplaceholder.typicode.com/users").then((res)=>{
                    this.mainUsers = res.data
                    this.users = res.data
                    this.pagination()
                }).finally(()=>{
                    this.isloading = false

                }) 
               
                    
                     
                
            },
            pagination(){
                this.pageCount = Math.ceil(this.users.length / this.itemsCount) //10 / 4 = 3
                const start = (this.currentPage * this.itemsCount) - this.itemsCount
                const end = this.currentPage * this.itemsCount
                this.pageUsers = this.users.slice(start,end)
                
            },
            nextPage(){
                this.currentPage++
                if (this.currentPage > this.pageCount) this.currentPage = this.pageCount
                
                this.pagination()
            },
            prevPage(){
                this.currentPage--
                if (this.currentPage < 1) this.currentPage = 1
                this.pagination()
            },
            handleChangeItemsCount(value){
                this.currentPage = 1
                if (value < 1) this.itemsCount = 1
                if (value > this.users.length) this.itemsCount = this.users.length
                
                
            },
            handleSearch(value){
                this.users = this.mainUsers.filter(user=>(user.name.includes("value") || user.
                username.includes(value) || user.email.includes(value)))
                this.currentPage = 1
                this.pagination()

            },
            handleSubmitAdduserFrom(){
                this.isloading = true
                axios.post("https://jsonplaceholder.typicode.com/users", this.newUserInfo).then
                ((res)=>{
                    if (res.status == 201) {
                        this.mainUsers.push(res.data)
                        this.showAddModal= false
                        this.handleResetform()
                        this.pagination()
                        M.toast({html: 'User created successfully...', classes: 'rounded green'})
                    }
                    
                }).finally(()=>{
                    this.isloading = false

                }) 
                
                
            },
            handleResetform(){
                this.newUserInfo = {
                    name:"",
                    username:"",
                    email:"",
                }
            },
            handleDeleteUser(userId){
                var toastHTML = '<span>Are you sure? ('+userId+')</span><button class="btn-flat toast-action" x-on:click="handleConfirmDeleteUser('+userId+')">Delete</buttom>';
                M.toast({html: toastHTML});
            },
            handleConfirmDeleteUser(userId){
                this.isloading = true
                axios.delete("https://jsonplaceholder.typicode.com/users/"+userId).then((res)=>{
                    if (res.status == 200) {
                        this.mainUsers = this.mainUsers.filter(user=>user.id != userId)
                        this.users = this.users.filter(user=>user.id != userId)
                        this.pagination()
                        M.toast({html: 'User delete successfully ...', classes: 'green'})
                       
                    }
                    
                }).finally(()=>{
                    this.isloading = false

                }) 
            },
            handleupdateUser(user){
                axios.get("https://jsonplaceholder.typicode.com/users/"+user.id).then(res=>{
                    if (res.status == 200) {
                        this.newUserInfo={
                            name:res.data.name,
                            username:res.data.username,
                            email:res.data.email,
                        }
                        this.userIdToEdit = res.data.id
                    }
                })
                
                this.showAddModal = true
            },
            handleConfirmEditUser(){
                this.isloading = true
                axios.put("https://jsonplaceholder.typicode.com/users/"+this.userIdToEdit, this.newUserInfo).then
                ((res)=>{
                    if (res.status == 200) {
                        const userIndex = this.mainUsers.findIndex(user=>user.id == this.userIdToEdit)
                        this.mainUsers[userIndex] = res.data
                        this.showAddModal= false
                        this.handleResetform()
                        this.userIdToEdit = null
                        this.pagination()
                        M.toast({html: 'User updated successfully...', classes: 'green'})
                    }
                    
                }).finally(()=>{
                    this.isloading = false

                }) 
            }
            


        }
    })
})


